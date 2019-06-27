ccm.files["monitor.course_activities.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

    if (instance.subject && instance.subject.teams) {
        data = helper.setTeamId(data);
    }

    if (instance.range.range === null) {
        data = cmMonitorHelper.data.filter(data, { range: helper.timeRanges.get("last 7d")(new Date) } );
        instance.range.range = "last 7d";
    } else
        data = cmMonitorHelper.data.filter(data, { range: helper.timeRanges.get(instance.range.range)(new Date) } );

    if (instance.subject && instance.subject.values && instance.subject.values.length > 0 && Array.isArray(instance.subject.values))
        data = cmMonitorHelper.data.filter(data, {
            or: instance.subject.values.map(value => ({
                "===" : [
                    { var : instance.subject.key }, instance.subject.teams ? instance.teams.get().teams.filter(team => team.name === value)[0].key : value
                ]
            }) )
        } );

    let groupByPrimary = instance.groupBy.key,
        groupBySecondary = instance.groupBy.groupBy ? instance.groupBy.groupBy.key : undefined,
        limit = instance.limit,
        sort = instance.sort === "Highest" ? d3.descending : d3.ascending,
        chart = instance.render.graph;

    if (groupByPrimary === "user.user" && instance.subject.teams)
        groupByPrimary = instance.subject.key;
    if (groupBySecondary === "user.user" && instance.subject.teams)
        groupBySecondary = instance.subject.key;


    data = data.reduce((prev, curr) => {
        if (!prev[$.deepValue(curr, groupByPrimary)])
            prev[$.deepValue(curr, groupByPrimary)] = [curr];
        else
            prev[$.deepValue(curr, groupByPrimary)].push(curr);
        return prev;
    }, {});

    // sort
    data = new Map([
        ...(Object.entries(data)
            .sort((x,y) => sort(x[1].length, y[1].length))
            .slice(0, limit))
    ]);

    let y = [];

    if (groupBySecondary)
        data.forEach((value, key) => {
            value = value.reduce((prev, curr) => {
                if (!y.includes($.deepValue(curr, groupBySecondary)))
                    y.push($.deepValue(curr, groupBySecondary));
                if (!prev.has($.deepValue(curr, groupBySecondary)))
                    prev.set($.deepValue(curr, groupBySecondary), [curr]);
                else
                    prev.set($.deepValue(curr, groupBySecondary), prev.get($.deepValue(curr, groupBySecondary)).concat(curr));
                return prev;
            }, new Map());
            data.set(key, value);
        });

    let x;

    if (!instance.subject.teams)
         x = [...data.keys()];
    else
        x = Array.from(data.keys()).map(key => instance.teams.get().teams.filter(team => team.key === key)[0].name);

    let settings = {
        "xAxis.categories": x,
        "legend.reversed": true,
        "plotOptions.series.stacking": "normal",
        "yAxis.min": 0,
        "tooltip.shared": true,
        "chart.type": chart,
        series: []
    };

    switch(chart) {
        case "bar":
            if (!groupBySecondary) {
                settings.series[0] = {name: "Actions", color: cmMonitorHelper.colors[0], data: []};
                data.forEach((value, key)=>settings.series[0].data.push(value.length));
            } else {
                settings.series = y.map((second, i) => ( {
                    name: second,
                    color: cmMonitorHelper.colors[i % cmMonitorHelper.colors.length],
                    data: Array.from(data).map(primary =>
                        primary[1].has(second) ? primary[1].get(second).length : 0 )
                } ) )
            }
            return settings;
        case "column":
            if (!groupBySecondary) {
                settings.series[0] = {name: "Actions", color: cmMonitorHelper.colors[0], data: []};
                data.forEach((value, key)=>settings.series[0].data.push(value.length));
            } else {
                settings.series = y.map((second, i) => ( {
                    name: second,
                    color: cmMonitorHelper.colors[i % cmMonitorHelper.colors.length],
                    data: Array.from(data).map(primary =>
                        primary[1].has(second) ? primary[1].get(second).length : 0 )
                } ) )
            }
            return settings;
        default: break;
    }
};