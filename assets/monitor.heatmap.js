ccm.files["monitor.heatmap.js"] = function (data, instance) {

    let monitor = instance.monitor,
        $ = instance.ccm.helper,
        helper = instance.helper;

    data = data.reduce((prev, curr) => {
        // ;
        if (!prev[curr.key[1]] && monitor.pointMapping[curr.key[0]])
            prev[curr.key[1]] = { [curr.key[0]]: !monitor.pointMapping[ curr.key[0] ].deadline || moment( monitor.pointMapping[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? monitor.pointMapping[ curr.key[0] ].points : 0 };
        else if (monitor.pointMapping[curr.key[0]])
            prev[curr.key[1]][curr.key[0]] = !monitor.pointMapping[ curr.key[0] ].deadline || moment( monitor.pointMapping[ curr.key[0] ].deadline ).isAfter( curr.created_at ) ? monitor.pointMapping[ curr.key[0] ].points : 0;
        return prev;
    }, {});

    let heatmap = {
        head: Object.entries(monitor.pointMapping).map(exercise => [exercise[0], exercise[1].points])
    };

    Object.keys(data).forEach(learner => {
        heatmap[learner] = Object.keys(monitor.pointMapping)
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