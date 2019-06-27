ccm.files["monitor.solutions_point_map.js"] = function (data, instance) {
    
    data = data.solutions;
    let course = instance.course;

    if (!data || data.length < 1)
        return;

    let exercises = Object.values(course.lessons).reduce((prev, lesson) =>
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
            .map(learner => course.humanReadable.learners[learner] ? course.humanReadable.learners[learner] : learner ),
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
                (100* this.point.value) + '%</b> on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        },
        "series": [{
            "name": "Points per Exercise",
            "dataLabels.enabled": false,
            "data": data,
        }]
    };
};