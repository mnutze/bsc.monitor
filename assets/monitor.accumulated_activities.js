ccm.files["monitor.accumulated_activities.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

    if (Object.keys(instance.filter).length === 0 )
        instance.filter = { and: [ {} ] };

    let subjectFilter;
    if (instance.subject && instance.subject.values.length > 0)
        subjectFilter = instance.subject.values.map(subject => ({ "===" : [ { var : instance.subject.key }, subject ] }) );

    if (subjectFilter)
        subjectFilter.forEach(filter => {
            if (!instance.filter.and.includes(filter))
                instance.filter.and.push(filter);
        });

    let interval = helper.timeSlices().get("1w");
    let domain = helper.datetime.range(data);

    // filter data against rules
    data = helper.filterData(data, instance.filter);
    // total histogram
    let total = helper.datetime.histogram(data, domain, ...interval);

    data = data.reduce((prev, curr)=> {
        if (!prev[curr.user.user])
            prev[curr.user.user] = [curr];
        else
            prev[curr.user.user].push(curr);
        return prev;
    }, {});

    data = Object.keys(data).map(subject => ({key: subject, data: helper.datetime.histogram(data[subject], domain, ...interval)}) );

    data = data.map((subject, i) => {
        return {
            name: subject.key,
            color: helper.colors[i % helper.colors.length],
            data: subject.data.map((slice, j) => [Date.parse(moment(slice.x1).startOf("isoWeek")), slice.length !== 0 ? (slice.length / total[j].length * 100) : 0]),
            type: "line"
        }
    });


    return {
        "tooltip.enabled": true,
        "tooltip.shared": true,
        "tooltip.headerFormat": "",
        series: data,
        "plotOptions.series.marker.enabled": false,
        xAxis: { type: "datetime", labels: { format: 'KW-{value:%W}' } },
        yAxis: { title: { text: "Percentage of Accumulated Events" }, max: 100, labels: { format: "{value} %" }, maxPadding: 0, startOnTick: true }
    };
};
