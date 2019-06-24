ccm.files["monitor.kanban.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    instance.options = "cfd";

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
            data.log = data.log.filter(dataset => jsonLogic.apply({ and: [
                {"===" : [ { var : "parent.name" }, "kanban_board" ] },
                {"!==" : [ { var : "event" }, "drag" ] }
                ] }, dataset));

            let interval = helper.timeSlices.get("1h");
            let domain = helper.datetime.range(data.log);

            let lanes = {};
            let cfd = data.log.reduce((prev, curr) => {
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

            let histogram = helper.datetime.histogram(cfd, domain, ...interval);

            histogram.forEach((slot, id) => slot.length === 0 ?
                histogram[id] = [Date.parse(slot.x0), histogram[id-1][1]] : histogram[id] = [Date.parse(slot.x0), slot[slot.length-1].lanes]);

            histogram = Object.keys(lanes).reverse().map(lane => {
                return { name: lane, data: histogram.reduce((prev, curr) => prev.concat([[curr[0],curr[1][lane]]]), []) }
            });
            console.log(cfd, histogram);
            settings.series = Object.keys(lanes).reverse().map(lane => {
                return { name: lane, data: cfd.reduce((prev, curr) => prev.concat([[Date.parse(curr.date),curr.lanes[lane]]]), [])}
            });
            settings.series = histogram;
            break;
        case "overview": break;
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



    //console.log(settings)
    return settings;

};