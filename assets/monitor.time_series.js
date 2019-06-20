ccm.files["monitor.time_series.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

    if (instance.render.type && instance.render.type === "hours") {
        // no interval selection
        instance.interval = undefined;

        if (instance.range && instance.range.range !== null)
            data = helper.filterData(data, { range: helper.timeRanges.get(instance.range.range)(new Date) } );

        let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let aggregated = data.reduce(function(m, d){
            if(!m[day_names[new Date(d.created_at).getDay()]]){
                m[day_names[new Date(d.created_at).getDay()]] = [{...d}];
                return m;
            }
            m[day_names[new Date(d.created_at).getDay()]].push({...d});
            return m;
        },{});

        aggregated = Object.entries(aggregated).map((day, i) => ({
            type: "spline", name: day[0], yAxis: 0,
            color: helper.colors[i % helper.colors.length],
            data: Object.assign({},...d3.nest().key(datum => new Date(datum.created_at).getHours())
                .entries(day[1]).map(hour => ({[hour.key]: hour.values.length})))

        }));
        let week = [];

        for (let i = 0; i < 24; i++) {
            let sum = 0;
            aggregated.forEach(day => {
                if (!day.data.hasOwnProperty(i))
                    day.data[i] = 0;
                sum += day.data[i];
            });
            week.push([i, sum]);
        }
        aggregated.forEach(day => day.data = Object.entries(day.data));

        return {
            "xAxis.labels.format": "{value}:00",
            yAxis: [
                { title: { text: "total-activity/h at weekday" }},
                //{ title: { text: "Events per h at week" }, opposite: true }
            ],
            series: [
                //{type: "column", dashStyle: 'shortdot', yAxis: 1, color: "#ccc", name: "week", data: week},
                ...aggregated
            ], "plotOptions.series.marker.enabled": false,
            tooltip: { enabled: true, shared: true}
        };
    }
    else {
        if (instance.range.range === null) {
            data = helper.filterData(data, { range: helper.timeRanges.get("last 7d")(new Date) } );
            instance.range.range = "last 7d";
        } else
            data = helper.filterData(data, { range: helper.timeRanges.get(instance.range.range)(new Date) } );

        let interval = [helper.timeSlices().get(instance.interval.current)[0], helper.timeSlices().get(instance.interval.current)[1]];
        let subject = instance.subject.key;
        let viewOptions = instance.subject.values;
        let domain = helper.datetime.range(data);

        // total count
        let total = helper.datetime.histogram(data, domain, ...interval).map(range => [Date.parse(range.x1), range.length]);

        // custom-lines
        let wanted = viewOptions.map(key => data.filter(dataset => $.deepValue(dataset, subject) === key));

        let selected = wanted.map((filtered, i) => ({
            name: subject !== "team" ? viewOptions[i] : instance.teams.teams[viewOptions[i]].name,
            color: helper.colors[i % helper.colors.length],
            data: helper.datetime.histogram(filtered, domain, ...interval).map(range => [Date.parse(range.x1), range.length]),
            type: "spline",
            yAxis: 1,
        }));

        let distinct = [];
        let distinctCount = {
            name: "distinct Learner",
            type: "column",
            color: "#ff0000",
            data: helper.datetime.histogram(data, domain, ...interval).map(range => {
                distinct = [];
                return [Date.parse(range.x1), range
                    .reduce((prev, curr) => {
                        if(!distinct.includes($.deepValue(curr, subject))) {
                            distinct.push($.deepValue(curr, subject));
                            return prev + 1;
                        }
                        return prev;
                },0)];
            })
        };

        let avg = {
            name: "avg per Learner",
            type: "areaspline",
            color: "#000",
            fillColor: "#ccc",
            fillOpacity: 0.7,
            lineWidth: .5,
            dashStyle: "LongDash",
            states: { hover: { lineWidth: .5}},
            data: helper.datetime.histogram(data, domain, ...interval).map(range => [Date.parse(range.x1),
                (range.length < 1 ? 0 : (range.length / range.reduce((prev, curr) =>
                    !prev.includes($.deepValue(curr, subject)) ?
                        prev.concat($.deepValue(curr, subject)) : prev, []).length))])
        };
        return {
            "tooltip.enabled": true,
            "tooltip.shared": true,
            series: [].concat(avg, distinctCount, selected),
            "plotOptions.series.marker.enabled": false,
            "xAxis.type": "datetime",
            yAxis: [
                {
                    title: { text: 'avg count \\ ' + instance.interval.current },
                    plotLines: [
                        {
                            value: 0,
                            label: { style: { fontWeight: "bold" },
                                text: instance.range.range,
                                align: 'right', x: -5, y: -(instance.size.height*0.70) }
                        }
                    ]
                },
                { title: { text: "total count \\ " + instance.interval.current }, opposite: true }
            ]
        };
    }
};