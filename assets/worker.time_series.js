importScripts("https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js");
importScripts("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js");
importScripts("https://mnutze.github.io/bsc.monitor/assets/cmMonitorHelper.js");

self.addEventListener("message", function (event) {

    let data = event.data.data;
    let range = event.data.range;
    let render = event.data.render;
    let subject = event.data.subject;
    let teams = event.data.course.teams;

    // assign log data
    data = data.log;

    if (!data || data.length < 1)
        return;

    if (render.type && render.type === "hours") {
        // no interval selection
        event.data.interval = undefined;

        if (range && range.range !== null)
            data = cmMonitorHelper.data.filter(data, { range: cmMonitorHelper.time.range.get(range.range)(new Date) } );
        else {
            range.range = "last 7d";
            data = cmMonitorHelper.data.filter(data, { range: cmMonitorHelper.time.range.get(range.range)(new Date) } );
        }

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
            color: cmMonitorHelper.colors[i % cmMonitorHelper.colors.length],
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

        self.postMessage({
            "xAxis.labels.format": "{value}:00",
            "subtitle.text": range.range,
            "subtitle.style": { fontWeight: "bold" },
            yAxis: [
                { title: { text: "total-activity/h at weekday" } },
                //{ title: { text: "Events per h at week" }, opposite: true }
            ],
            series: [
                //{type: "column", dashStyle: 'shortdot', yAxis: 1, color: "#ccc", name: "week", data: week},
                ...aggregated
            ], "plotOptions.series.marker.enabled": false,
            "tooltip.headerFormat": "<span style=\"font-size:11px; font-weight: bold;\">{point.key}:00</span><br>",
            tooltip: { enabled: true, shared: true}
        });
    }
    else {
        if (range.range === null) {
            data = cmMonitorHelper.data.filter(data, { range: cmMonitorHelper.time.range.get("last 7d")(new Date) } );
            range.range = "last 7d";
        } else
            data = cmMonitorHelper.data.filter(data, { range: cmMonitorHelper.time.range.get(range.range)(new Date) } );

        let interval = cmMonitorHelper.time.interval.get(event.data.interval.current);
        let domain = cmMonitorHelper.time.domain(data);

        // total count
        let total = cmMonitorHelper.time.histogram(data, domain, ...interval).map(range => [Date.parse(range.x1), range.length]);

        // custom-lines
        let wanted = subject.values.map(key => data.filter(dataset => cmMonitorHelper.deepValue(dataset, subject.key) === key));

        let selected = wanted.map((filtered, i) => ({
            name: subject.key !== "team" ? subject.values[i] : teams[subject.values[i]].name,
            color: cmMonitorHelper.colors[i % cmMonitorHelper.colors.length],
            data: cmMonitorHelper.time.histogram(filtered, domain, ...interval).map(range => [Date.parse(range.x1), range.length]),
            type: "spline",
            yAxis: 1,
        }));

        let distinct = [];
        let distinctCount = {
            name: "distinct Learner",
            type: "column",
            color: "#ff0000",
            data: cmMonitorHelper.time.histogram(data, domain, ...interval).map(range => {
                distinct = [];
                return [Date.parse(range.x1), range
                    .reduce((prev, curr) => {
                        if(!distinct.includes(cmMonitorHelper.deepValue(curr, subject.key))) {
                            distinct.push(cmMonitorHelper.deepValue(curr, subject.key));
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
            data: cmMonitorHelper.time.histogram(data, domain, ...interval).map(range => [Date.parse(range.x1),
                (range.length < 1 ? 0 : (range.length / range.reduce((prev, curr) =>
                    !prev.includes(cmMonitorHelper.deepValue(curr, subject.key)) ?
                        prev.concat(cmMonitorHelper.deepValue(curr, subject.key)) : prev, []).length))])
        };
        self.postMessage({
            "tooltip.enabled": true,
            "tooltip.shared": true,
            series: [].concat(avg, distinctCount, selected),
            "plotOptions.series.marker.enabled": false,
            "subtitle.text": range.range,
            "subtitle.style": { fontWeight: "bold" },
            "xAxis.type": "datetime",
            yAxis: [
                { title: { text: 'avg count \\ ' + event.data.interval.current } },
                { title: { text: "total count \\ " + event.data.interval.current }, opposite: true }
            ]
        });
    }
}, false);