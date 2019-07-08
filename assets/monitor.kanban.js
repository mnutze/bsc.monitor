ccm.files["monitor.kanban.js"] = function (data, instance) {

    let $ = instance.ccm.helper;

    instance.options = "cfd";

    // check Thesis Mock
    if (instance.render.mock)
        data.log = data.kanban_log;

    if (!data.log || (data.log && data.log.length < 1))
        return;

    let settings = {
        "chart.type": "area",
        xAxis: {
            type: "datetime",
            title: {
                enabled: false
            }
        },
        "yAxis.title.text": "Cards",
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 0.2,
                marker: {
                    enabled: false,
                    lineWidth: 0.2,
                    lineColor: '#666666'
                }
            }
        },
        "tooltip.enabled": true,
        "tooltip.shared": true,
        series: []
    };
    let log, interval, domain;
    switch (instance.options) {
        case "cfd":
            log = data.log;
            log = log.filter(dataset => jsonLogic.apply({ and: [
                {"===" : [ { var : "parent.name" }, "kanban_board" ] },
                {"!==" : [ { var : "event" }, "drag" ] },
                {"!==" : [ { var : "event" }, "change" ] }
                ] }, dataset));

            log = log.sort(function(a,b){
                return new Date(b.created_at) - new Date(a.created_at);
            });
            log = log.reverse();

            interval = cmMonitorHelper.time.interval.get("1d");
            domain = cmMonitorHelper.time.domain(log);

            let lanes = {};
            let cfd = log.reduce((prev, curr) => {
                if (curr.event === "add") {
                    lanes["Lane-0"] = lanes["Lane-0"] ? lanes["Lane-0"] + 1 : 1;
                    prev.push({date: curr.created_at, created_at: curr.created_at, lanes: $.clone(lanes)});
                } else if (curr.event === "drop") {
                    lanes["Lane-" + curr.data.from[0]] -= 1;
                    lanes["Lane-" + curr.data.to[0]] = lanes["Lane-" + curr.data.to[0]] ? lanes["Lane-" + curr.data.to[0]] + 1 : 1;
                    prev.push({date: curr.created_at, created_at: curr.created_at, lanes: $.clone(lanes)});
                }
                else if (curr.event === "del"){
                    lanes["Lane-" + curr.data.lane] -= 1;
                    prev.push({date: curr.created_at, created_at: curr.created_at, lanes: $.clone(lanes)});
                }
                return prev;

            }, []);

            cfd = cfd.map(event => {
                Object.keys(lanes).forEach(lane => !event.lanes[lane] ? event.lanes[lane] = 0 : undefined );
                return event;
            });

            let histogram = cmMonitorHelper.time.histogram(cfd, domain, ...interval);

            histogram.forEach((slot, id) => slot.length === 0 ?
                histogram[id] = [Date.parse(slot.x0), histogram[id-1][1]] : histogram[id] = [Date.parse(slot.x0), slot[slot.length-1].lanes]);

            histogram = Object.keys(lanes).map((lane, index) => {
                return { name: instance.course.kanban.lanes[index], data: histogram.reduce((prev, curr) => prev.concat([[curr[0],curr[1][lane]]]), []) }
            });
            //console.log(cfd, histogram);

            //settings["yAxis.categories"] = Object.keys(lanes);

            settings.series = Object.keys(lanes).reverse().map(lane => {
                return { name: lane, data: cfd.reduce((prev, curr) => prev.concat([[Date.parse(curr.date),curr.lanes[lane]]]), [])}
            });
            settings.series = histogram;
            break;
        case "overview":

            break;
        case "distribution":
            log = data.log;
            log = log.filter(dataset => jsonLogic.apply({ or: [
                {"===" : [ { var : "parent.name" }, "kanban_board" ] },
                {"===" : [ { var : "parent.name" }, "kanban_card" ] }
                ] }, dataset));

            log = log.sort(function(a,b){
                return new Date(b.created_at) - new Date(a.created_at);
            });
            log = log.reverse();

            interval = cmMonitorHelper.time.interval.get("1d");
            domain = cmMonitorHelper.time.domain(log);
            let reduced = log.reduce((prev, card) => {
                if (card.parent.name === "kanban_board" && card.event === "add")
                    if (card.data && card.data.data[2].data.key)
                        prev.added.cards[card.data.data[2].data.key] = [card];
                    else
                        prev.added.undefined.push(card);
                else if (card.parent.name === "kanban_board" && card.data && card.data.data[2].data.key && !prev.cards[card.data.data[2].data.key]) {
                    if (prev.added.cards[card.data.data[2].data.key]) {
                        prev.cards[card.data.data[2].data.key] = [prev.added.cards[card.data.data[2].data.key], card];
                        delete prev.added.cards[card.data.data[2].data.key];
                    } else
                        prev.cards[card.data.data[2].data.key] = [prev.added.undefined.shift(), card];
                }
                else if (card.parent.name === "kanban_board" && card.data && card.data.data[2].data.key && prev.cards[card.data.data[2].data.key])
                    prev.cards[card.data.data[2].data.key].push(card);
                else if (card.parent.name === "kanban_card" && card.parent && card.parent.id && !prev.cards[card.parent.id])
                    if (prev.added.cards[card.parent.id]) {
                        prev.cards[card.parent.id] = [prev.added.cards[card.parent.id], card];
                        delete prev.added.cards[card.parent.id];
                    } else
                        prev.cards[card.parent.id] = [prev.added.undefined.shift(), card];
                else if (card.parent.name === "kanban_card" && card.parent && card.parent.id && prev.cards[card.parent.id])
                    prev.cards[card.parent.id].push(card);
                return prev;
            }, {
                added: { undefined: [], cards: {} }, cards: {}
            });
            break;
        case "progress":
            let sessions = data.log.reduce((prev, curr) => {
                if (!prev[curr.parent.name])
                    prev[curr.parent.name] = { [curr.session]: [curr] };
                else if (!prev[curr.parent.name][curr.session])
                    prev[curr.parent.name][curr.session] = [curr];
                else
                    prev[curr.parent.name][curr.session].push(curr);
                return prev;
            }, {});
            break;
        default: break;
    }

    /*
    reduce mock backlog
    let count = 0
    log = log.reduce((prev, curr) => {
        if (curr.event === "add") {
            if (count < 85)
                prev.push(curr);
            count++
        }
        else
            prev.push(curr)
        return prev;
    }, []);
     */

    return settings;

};