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
    switch (instance.options) {
        case "cfd":
            let log = data.log;
            log = log.filter(dataset => jsonLogic.apply({ and: [
                {"===" : [ { var : "parent.name" }, "kanban_board" ] },
                {"!==" : [ { var : "event" }, "drag" ] },
                {"!==" : [ { var : "event" }, "change" ] }
                ] }, dataset));

            log = log.sort(function(a,b){
                return new Date(b.created_at) - new Date(a.created_at);
            });
            log = log.reverse();

            let interval = cmMonitorHelper.time.interval.get("1d");
            let domain = cmMonitorHelper.time.domain(log);

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

            histogram = Object.keys(lanes).reverse().map(lane => {
                return { name: lane, data: histogram.reduce((prev, curr) => prev.concat([[curr[0],curr[1][lane]]]), []) }
            });
            //console.log(cfd, histogram);



            settings.series = Object.keys(lanes).reverse().map(lane => {
                return { name: lane, data: cfd.reduce((prev, curr) => prev.concat([[Date.parse(curr.date),curr.lanes[lane]]]), [])}
            });
            settings.series = histogram;
            break;
        case "overview":

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
    
    let logs = data.log;
    let lanesCount = logs.filter(curr => curr.event === "drop").reduce((p,c) => c.data.to[0] > p ? c.data.to[0] : p, 0);
    let board = {};
    for (let i = 0; i <= lanesCount; i++)
        board["lane-"+i] = [];
    let accumulatedLogs = logs.reduce((prev, curr) => {


        prev.push({created_at: curr.created_at, board: Object.assign({}, board)});

        return prev;
    }, []);
    /*
    let interval = helper.timeSlices.get("1d");
    let domain = helper.datetime.range(logs);
    let lanesCount = logs.filter(curr => curr.event === "drop").reduce((p,c) => c.data.to[0] > p ? c.data.to[0] : p, 0);
    let board = {};
    for (let i = 0; i <= lanesCount; i++)
        board["lane-"+i] = [];
    let histogram = helper.datetime.histogram(logs, domain, ...interval);

    let cards = logs.reduce((prev, curr) => {
        if (curr.event === "add")
            prev.unassigned.push(curr);
        else if (curr.event === "drop" || curr.event === "del") {
            if (!prev.hasOwnProperty(curr.data.data[2].data.key)) {
                // wenn card key noch nicht bekannt -> entnehme 1 unassigned
                prev[curr.data.data[2].data.key] = [curr];
                // ältestes
                prev[curr.data.data[2].data.key].splice(0, 0, prev.unassigned.shift())
            }
            else
                prev[curr.data.data[2].data.key].push(curr);
        } else if (curr.parent.name === "kanban_card") {
            if (!prev.hasOwnProperty(curr.parent.descr)) {
                // wenn card key noch nicht bekannt -> entnehme 1 unassigned
                prev[curr.parent.descr] = [curr];
                // ältestes
                prev[curr.parent.descr].splice(0, 0, prev.unassigned.shift())
            }
            else
                prev[curr.parent.descr].push(curr);
        }
        return prev;
    }, { unassigned: [] });

    let unassigned = helper.datetime.histogram(cards.unassigned, domain, ...interval);
    delete cards.unassigned;

    unassigned = unassigned.reduce((p,c) => {
        let b = $.clone(board);
        b
        p.push()
    }, []);
    console.log(unassigned)

    */

    //console.log(settings)
    return settings;

};