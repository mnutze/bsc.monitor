ccm.files["monitor.subject_classification.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

    let domain = [ new Date(data[0].created_at), new Date(data[data.length-1].created_at)];

    let emptyHistogram = helper.datetime.histogram([], domain, helper.datetime.mondayWeek(), 1);

    if (instance.range && instance.range.range === "weeks")
        instance.range.values = emptyHistogram;

    let aggregated = data.reduce(function(m, d){ // @TODO make it subject ready
        if(!m[d.user.user])
            m[d.user.user] = [{...d}];
        else
            m[d.user.user].push({...d});
        return m;
    },{});

    let subjects = Object.entries(aggregated).map(subject => ({
        key: subject[0],
        histograms: helper.datetime.histogram(subject[1], domain, helper.datetime.mondayWeek(), 1)
    }));

    let weekSelector = 0;
    if (!instance.range.current)
        emptyHistogram.forEach((histogram, id) => {
            if (moment(new Date()).subtract(7, "day") > histogram.x0 &&
                moment(new Date()).subtract(7, "day") < histogram.x1)
                weekSelector = id;
        });
    else
        emptyHistogram.forEach((histogram, id) => {
            if (instance.range.current[0] >= histogram.x0 &&
                instance.range.current[1] <= histogram.x1)
                weekSelector = id;
        });
    let selfMarker = {};

    let series = subjects.map(subject => ({
        name: checkName(subject.key) ? "You" : subject.key.substr(0, 16) + "...",
        color: checkUser(subject.key) ? "#ff0000" : "#000",
        marker: checkUser(subject.key) ? { radius: 8 } : {},
        data: [[subject.histograms[weekSelector].length, subject.histograms.slice(0,weekSelector+1).reduce((prev, curr) => curr.length + prev, 0)/weekSelector+1]]
    }));

    return {
        "chart.type": "scatter",
        xAxis: {
            title: { enabled: true, text: 'Student-Activity - last week', offset: 25 },
            min: 0, startOnTick: true, endOnTick: true, showLastLabel: true,
            plotLines: [ { color: "#000", value: d3.max(series, point => point.data[0][0])/2, width: 1 } ],
        },
        yAxis: {
            title: { text: 'Student-Activity - week avg', offset: 40 }, min: 0,
            plotLines: [
                { color: "#000", value: Math.max(...series.map(point => point.data[0][1]))/2, width: 1 },
                { value: 0, label: { text: 'Q4 - Improving', align: 'right', x: -5, y: -10 } },
                { value: Math.max(...series.map(point => point.data[0][1])), label: { text: 'Q1 - Heading', align: 'right', x: -5, y: -10 } },
                { value: Math.max(...series.map(point => point.data[0][1])), label: { text: 'Q2 - Lowering', x: -5, y: -10 } },
                { value: 0, label: { text: 'Q3 - At Risk', x: -5, y: -10 } }
            ],
        },
        legend: { enabled: false },
        plotOptions: {
            scatter: {
                marker: { symbol: "circle", radius: 2 },
                tooltip: { headerFormat: '<b>{series.name}</b><br>', pointFormat: '{point.x} activities last week | {point.y} avg activities per week' }
            }
        },
        series: series
    };

    function checkUser (val) {
        if (!instance.profile)
            return false;
        else if (instance.profile.user !== val)
            return false;
        else
            return true;
    }

    function checkName (val) {
        if (!instance.profile)
            return false;
        else if (instance.profile.name.length < 1 || instance.profile.user !== val)
            return false;
        else
            return true;
    }
};