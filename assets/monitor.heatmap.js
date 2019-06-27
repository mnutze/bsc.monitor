ccm.files["monitor.heatmap.js"] = function (data, instance) {
    
    // assign solutions data
    data = data.solutions;

    if (data.length < 1)
        return;

    let DATA = data.reduce((prev, curr) => {
        // ;
        if (!prev[curr.key[1]] && instance.pointMapping[curr.key[0]])
            prev[curr.key[1]] = { [curr.key[0]]: !instance.pointMapping[ curr.key[0] ].deadline || moment( instance.pointMapping[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? instance.pointMapping[ curr.key[0] ].points : 0 };
        else if (instance.pointMapping[curr.key[0]])
            prev[curr.key[1]][curr.key[0]] = !instance.pointMapping[ curr.key[0] ].deadline || moment( instance.pointMapping[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? instance.pointMapping[ curr.key[0] ].points : 0;
        return prev;
    }, {});

    let heatmap = {
        head: Object.entries(instance.pointMapping).map(exercise => [exercise[0], exercise[1].points])
    };

    let exercises = Object.values(instance.course.lessons).reduce((prev, lesson) =>
        Object.assign(prev, Object.entries(lesson.exercises).reduce((_prev, exercise) => {
            _prev[lesson.prefix + exercise[0]] = {};
            _prev[lesson.prefix + exercise[0]].label = lesson.prefix + exercise[0];
            if (exercise[1].start)
                _prev[lesson.prefix + exercise[0]].start = exercise[1].start;
            else
                _prev[lesson.prefix + exercise[0]].start = lesson.start;
            if (exercise[1].deadline)
                _prev[lesson.prefix + exercise[0]].deadline = exercise[1].deadline;
            else
                _prev[lesson.prefix + exercise[0]].deadline = lesson.deadline;
            _prev[lesson.prefix + exercise[0]].points = exercise[1].points;
            return _prev;
        }, {} ) ), {} );
    let sorted = Object.keys(exercises).sort((a, b) => a[0] - b[0]);
    let learners = { _index: 0 };
    data = data.reduce((prev, curr) => {
        // [x, y, value]
        if (!learners[curr.key[1]] && exercises[curr.key[0]]) {
            learners[curr.key[1]] = learners._index;
            learners._index++;
        }
        if (!exercises[curr.key[0]])
            return prev;
        return prev.concat([[
            learners[curr.key[1]],
            sorted.indexOf(curr.key[0]),
            //!exercises[ curr.key[0] ].deadline || moment( exercises[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? exercises[ curr.key[0] ].points : 0
            !exercises[ curr.key[0] ].deadline || moment( exercises[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? 1 : 0
        ]]);
    }, []);
    delete learners._index;
    console.log(data)
    return {
        "chart.type": "heatmap",
        "chart.marginLeft": 100,
        "chart.marginRight": 50,
        "chart.spacingLeft": 10,"chart.spacingRight": 10,

        "chart.plotBackgroundColor": cmMonitorHelper.colors[6],
        "yAxis.categories": sorted,
        "xAxis.gridLineWidth": 1,
        "xAxis.gridZIndex": 7,
        "yAxis.gridLineWidth": 1,
        "yAxis.gridZIndex": 7,
        "yAxis.tickInterval": 1,
        "yAxis.title.text": "",
        "xAxis.categories": Object.keys(learners).sort((a, b) => learners[a] - learners[b])
            .map(learner => instance.course.humanReadable.learners[learner] ? instance.course.humanReadable.learners[learner] : learner ),
        "colorAxis.min": 0,
        "colorAxis.max": 1,
        "colorAxis.minColor": cmMonitorHelper.colors[6],
        "colorAxis.maxColor": cmMonitorHelper.colors[1],
        "legend.enabled": true,
        "legend.align": "right",
        //"legend.layout": "vertical",
        "legend.margin": 0,
        "legend.verticalAlign": "bottom",
        "legend.y": 0,
        "legend.symbolHeight": 10,
        "tooltip.formatter": function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> got <b>' +
                (100* this.point.value) + '</b>% on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        },
        "series": [{
            "name": "Points per Exercise",
            "dataLabels.enabled": false,
            "data": data,
        }]
    };
    return
    Object.keys(data).forEach(learner => {
        heatmap[learner] = Object.keys(instance.pointMapping)
            .map(exercise => data[learner][exercise] ? data[learner][exercise] : 0);
    });

    let color = d3.scaleLinear()
        .domain([0, 1])
        .range(['#d73027', '#6DAD53'])
        .interpolate(d3.interpolateHcl);

    data = Object.entries(heatmap).filter(entry => entry[0] !== "head")
        .map(learner => ({ tag: "tr", inner: [ { tag: "td", class: "sm-cell", inner: learner[0].substr(0, 12) + "..." } ].concat(learner[1].map((exercise, id) =>
            ({ tag: "td", class: "sm-cell", style: "background-color: " + color(exercise / heatmap.head[id][1]) + "; border-left: 1px solid #ddd;  color: #fff; text-align: center;", inner: exercise }) )
                .concat( { tag: "td", inner: learner[1].reduce((prev, curr) => prev + curr, 0), style: "border-left: 1px solid #ddd; text-align: center;", } ) ) }) );

    let hcHeatmap = {
        chart: {
            type: "heatmap",
            marginTop: 40,
            marginBottom: 40,
            plotBorderWidth: .5
        },
        xAxis: {
            categories: heatmap.head.map(exercise => exercise[0])
        },
        yAxis: {
            categories: Object.entries(heatmap).filter(entry => entry[0] !== "head").map(learner => learner[0]),
            title: ""
        },
        
        colorAxis: {
            min: 0,
            maxColor: "#6ea03c",
            minColor: "#d62728"
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 15,
            symbolHeight: 280
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
                this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
        
        series: [{
            name: "Points",
            borderWith: .5,
            data: [],
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]
    };

    Object.entries(heatmap).filter(entry => entry[0] !== "head").forEach((learner, y) => {
        hcHeatmap.yAxis.categories.push(learner[0]);
        learner[1].forEach((exercise, x) => hcHeatmap.series[0].data.push([x, y, exercise]) );
    } );
    
    return {
        inner: [
            { class: "small", style: "float: right; margin-bottom: 1em;", inner: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(el => ({ style: "background-color: " + color(el) + "; font-size: smaller; color: #fff; width: 60px; height: 25px; line-height: 25px; text-align: center; float: left;", inner: el*100 + "%"}) )},
            { style: "clear: both;"},
            {
                class: "table-responsive",
                style: "overflow-y: scroll; height: %height%px;",
                inner: {
                    tag: "table",
                    class: "table table-striped fullwidth",
                    inner: [
                        {
                            tag: "thead",
                            inner: {
                                tag: "tr",
                                inner: [ { tag: "th", style: "position: sticky; top: 0; z-index: 10;", inner: "" } ]
                                    .concat(heatmap.head.map(exercise =>
                                        ({ tag: "th", style: "border-left: 1px solid #ddd; position: sticky; top: 0; z-index: 10; padding: 8px 8px 0; text-align: center;", inner: "<span style='writing-mode: vertical-lr; text-orientation: mixed'>" + exercise[0] + "</span>" }) ))
                                    .concat({ tag: "th", inner: "sum", style: "border-left: 1px solid #ddd; position: sticky; top: 0; z-index: 10; padding: 8px 8px 0; text-align: center;", })
                            }
                        },
                        {
                            tag: "tbody",
                            inner: data
                        }
                    ]
                }
            }
        ]
    };
};