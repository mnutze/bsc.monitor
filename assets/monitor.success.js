ccm.files["monitor.success.js"] = function (data, instance) {

    let monitor = instance.monitor,
        $ = instance.ccm.helper,
        helper = instance.helper;

    let subjects = [];
    data = data.reduce((prev, curr) => {
        if(!subjects.includes(curr.key[1]))
            subjects.push(curr.key[1]);

        if (!prev[curr.key[0]] && monitor.pointMapping[curr.key[0]]){
            prev[curr.key[0]] = {
                points: monitor.pointMapping[curr.key[0]].points,
                deadline: monitor.pointMapping[curr.key[0]].deadline,
                total: !monitor.pointMapping[ curr.key[0] ].deadline || moment( monitor.pointMapping[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? monitor.pointMapping[ curr.key[0] ].points : 0,
                subjects: 1
            };
        }
        else if (monitor.pointMapping[curr.key[0]]) {
            prev[curr.key[0]].subjects += 1;
            prev[curr.key[0]].total += !prev[curr.key[0]].deadline || moment( prev[curr.key[0]].deadline ).isAfter( curr.created_at ) ? prev[curr.key[0]].points : 0;
        }
        return prev;
    }, {});

    Object.keys(data).forEach(key => data[key].avg = {
        total: data[key].total / subjects.length,
        percentage: data[key].total / subjects.length / data[key].points
    });

    return {
        "chart.type": "column",
        "xAxis.categories": Object.keys(data),
        "yAxis.title.text": "Percentage",
        "plotOptions.area.marker.enabled": false,
        series: [
            {
                name: "",
                data: Object.values(data).map(exercise => exercise.avg.percentage )
            }
        ]
    };
};