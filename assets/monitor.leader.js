ccm.files["monitor.leader.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign log data
    data = data.log;

    if (!data || data.length < 1)
        return;

    if (instance.subject && instance.subject.teams) {
        data = helper.teams(data);
    }

    if (instance.range.range === "lessons") {
        let lessons = instance.course.lessons
        if (!instance.range.current) {
            let today = new Date();
            instance.range.current = Object.entries(lessons)
                .filter(lesson => (today > new Date(lesson[1].start) && (today < new Date(lesson[1].deadline))))[0];
            if (instance.range.current.length < 1)
                instance.range.current = lessons[Object.keys(lessons)[Object.keys(lessons).length-1]];
            if (Array.isArray(instance.range.current))
                instance.range.current = { [instance.range.current[0]]: instance.range.current[1] };
        }
        let filter = Object.keys(instance.range.current[Object.keys(instance.range.current)[0]].content).reduce((prev, curr) => {
            prev.push({ "===": [ { var : "parent.descr" }, curr ] });
            prev.push({ "===": [ { var : "parent.id" }, curr ] });
            return prev;
        }, []);
        filter = { or: filter };
        data = data.filter(entry => jsonLogic.apply(filter, entry));
    }
    else if (instance.range.range === null) {
        data = helper.filterData(data, { range: helper.timeRanges.get("last 7d")(new Date) } );
        instance.range.range = "last 7d";
    } else
        data = helper.filterData(data, { range: helper.timeRanges.get(instance.range.range)(new Date) } );

    let subtitle;

    if (instance.subject && instance.subject.values && instance.subject.values.length > 0 && Array.isArray(instance.subject.values))
        data = helper.filterData(data, {
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
        let key;
        if (groupByPrimary.indexOf(",") > 1)
            key = $.deepValue(curr, groupByPrimary.split(",")[0]) ?
                $.deepValue(curr, groupByPrimary.split(",")[0]) : $.deepValue(curr, groupByPrimary.split(",")[1]);
        else
            key =  $.deepValue(curr, groupByPrimary)
        if (!prev[key])
            prev[key] = [curr];
        else
            prev[key].push(curr);
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
                let _secKey;
                if (groupBySecondary.indexOf(",") > 1)
                    _secKey = $.deepValue(curr, groupBySecondary.split(",")[0]) ?
                        $.deepValue(curr, groupBySecondary.split(",")[0]) :
                        $.deepValue(curr, groupBySecondary.split(",")[1]);
                else
                    _secKey =  $.deepValue(curr, groupBySecondary);
                if (!y.includes(_secKey))
                    y.push(_secKey);
                if (!prev.has(_secKey))
                    prev.set(_secKey, [curr]);
                else
                    prev.set(_secKey, prev.get(_secKey).concat(curr));
                return prev;
            }, new Map());
            data.set(key, value);
        });

    let x;

    if (!instance.subject.teams)
         x = [...data.keys()];
    else
        x = Array.from(data.keys()).map(key => instance.teams.get().teams.filter(team => team.key === key)[0].name);

    if (instance.range.range === "lessons")
        subtitle = instance.range.current[Object.keys(instance.range.current)[0]].label;
    else
        subtitle = instance.range.range;

    let settings = {
        "xAxis.categories": x,
        "legend.reversed": true,
        "plotOptions.series.stacking": "normal",
        "yAxis.min": 0,
        "subtitle.text": subtitle,
        "subtitle.style": { fontWeight: "bold" },
        "tooltip.shared": true,
        "chart.type": chart,
        series: []
    };

    switch(chart) {
        case "bar":
            if (!groupBySecondary) {
                settings.series[0] = {name: "Actions", color: helper.colors[0], data: []};
                data.forEach((value, key)=>settings.series[0].data.push(value.length));
            } else {
                settings.series = y.map((second, i) => ( {
                    name: second,
                    color: helper.colors[i % helper.colors.length],
                    data: Array.from(data).map(primary =>
                        primary[1].has(second) ? primary[1].get(second).length : 0 )
                } ) )
            }
            return settings;
        case "column":
            if (!groupBySecondary) {
                settings.series[0] = {name: "Actions", color: helper.colors[0], data: []};
                data.forEach((value, key)=>settings.series[0].data.push(value.length));
            } else {
                settings.series = y.map((second, i) => ( {
                    name: second,
                    color: helper.colors[i % helper.colors.length],
                    data: Array.from(data).map(primary =>
                        primary[1].has(second) ? primary[1].get(second).length : 0 )
                } ) )
            }
            return settings;
        case "pie":
            if (!groupBySecondary) {
                /*
                settings.series[0] = {name: "Actions", color: helper.colors[0], data: []};
                data.forEach((value, key)=>settings.series[0].data.push(value.length));
                */
            } else {
                function sum (prev, curr) {
                    return prev + Array.from(curr[1]).reduce((p,c)=> p + c[1].length, 0);
                }
                settings = {
                    "chart.type": "pie",
                    "subtitle.text": subtitle,
                    "subtitle.style": { fontWeight: "bold" },
                    "legend.enabled": true,
                    plotOptions: {
                        //series: { dataLabels: { enabled: true, format: '{point.name}: {point.y}x' } },
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: -50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'white'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['52%', '100%'],
                            size: '200%'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} %<br/>'
                    },
                };
                settings.series = [{
                    name: "Events",
                    colorByPoint: true,
                    data: Array.from(data).map(element => ({
                        name: element[0],
                        type: 'pie',
                        innerSize: '50%',
                        tooltip: { valueDecimals: 2 },
                        drilldown: element[0],
                        y: Array.from(element[1])
                            .reduce((prev, curr) => prev + curr[1].length, 0) / Array.from(data).reduce(sum, 0) * 100
                    }))
                }];
                settings.drilldown = {
                    drillUpButton:{
                        position:{
                            x:-10,
                            y: -40,
                        },
                        theme: {
                            'stroke-width': 1,
                            stroke: "#dadade",
                            r: 0,
                            padding: 5,
                            height: 12,
                            "font-size": "10px"
                        }
                    },
                    series: Array.from(data).map(element => ({
                        name: element[0],
                        id: element[0],
                        type: 'pie',
                        innerSize: '50%',
                        tooltip: { valueDecimals: 2 },
                        data: Array.from(element[1]).map(drilled => [
                            drilled[0],
                            drilled[1].length / Array.from(element[1]).reduce((p,c)=> p + c[1].length, 0) * 100
                        ])
                    }))
                };
                return settings;
            }
        default: break;
    }

};