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

    let aggregated = data.reduce((prev, curr) => { // @TODO make it subject ready
        if(!prev[$.deepValue(curr, instance.subject.key)])
            prev[$.deepValue(curr, instance.subject.key)] = [{...curr}];
        else
            prev[$.deepValue(curr, instance.subject.key)].push({...curr});
        return prev;
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
    let classificationLegend = "Q1: hervorragend | Q2: absteigend | Q3: zu wenig | Q4: aufstrebend";

    let series = subjects.map(subject => ({
        name: checkName(subject.key) ? instance.teams ? "Dein Team" : "Du" : subject.key,
        color: checkSubject(subject.key) ? helper.colors[6] : "#000",
        marker: checkSubject(subject.key) ? { radius: 4 } : {},
        zIndex: checkName(subject.key) ? instance.teams ? 9999 : 9999 : undefined,
        data: [[subject.histograms[weekSelector].length, subject.histograms.slice(0,weekSelector+1).reduce((prev, curr) => curr.length + prev, 0)/weekSelector+1]]
    }));

    let maxY = Math.max(...series.map(point => point.data[0][1]));
    let maxX = Math.max(...series.map(point => point.data[0][0]));

    let weekLabel = instance.range.current ?
        "KW " + moment(instance.range.current.x0).isoWeek() + " - " + moment(instance.range.current.x0).format('YYYY') :
        "KW " + moment(instance.range.values[weekSelector].x0).isoWeek() + " - " + moment(instance.range.values[weekSelector].x0).format('YYYY');

    return {
        "chart.type": "scatter",
        "subtitle.text": "<b>" + weekLabel + "</b><br/>" + classificationLegend,
        xAxis: {
            gridLineWidth: 0,
            title: { enabled: true, text: 'Activities - last week', offset: 25 },
            //min: 0, startOnTick: true, endOnTick: true, showLastLabel: true, max: null,
            plotLines: [ { color: "#ccc", value: maxX/2, width: 1 } ],
        },
        yAxis: {
            title: { text: 'Activities - week-avg', offset: 40 },
            //min: 0, startOnTick: true, endOnTick: true, maxPadding: 0,
            max: null,
            endOnTick: false,
            gridLineWidth: 0,
            plotLines: [
                { color: "#ccc", value: maxY/2, width: 1 },
                { value: 0, label: { text: "<b>Q4</b>", useHTML: true, align: 'right', x: -5, y: -10 } },
                { value: maxY, label: { text: "<b>Q1</b>", useHTML: true, align: 'right', x: -5, y: -10 } },
                { value: maxY, label: { text: "<b>Q2</b>", useHTML: true, x: -5, y: -10 } },
                { value: 0, label: { text: "<b>Q3</b>", useHTML: true, x: -5, y: -10 } }
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

    function checkSubject (val) {
        if (instance.subject.values && instance.subject.values.includes(val))
            return true;
        else if (!instance.profile)
            return false;
        else if (instance.profile.user !== val)
            return false;
        else
            return true;
    }

    function checkName (val) {
        if (instance.subject.values && instance.subject.values.includes(val))
            return true;
        if (!instance.profile)
            return false;
        else return !(instance.profile.name.length < 1 || instance.profile.user !== val);
    }
};