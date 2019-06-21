ccm.files["monitor.heatmap.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign solutions data
    data = data.solutions;

    if (data.length < 1)
        return;

    data = data.reduce((prev, curr) => {
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
                                        ({ tag: "th", style: "border-left: 1px solid #ddd; position: sticky; top: 0; z-index: 10; padding: 8px 8px 0; text-align: center;", inner: exercise[0] }) ))
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