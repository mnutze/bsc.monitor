/**
 * @overview ccm template component
 * @author Michael Nutzenberger <michael.nutzenberger@smail.inf.h-brs.de> 2019
 * @license
 * Creative Commons Attribution-NonCommercial 3.0: https://creativecommons.org/licenses/by-nc/3.0/
 * Only for not-for-profit educational use.
 *
 * This ccm component uses „Highstock JS“: https://www.highcharts.com
 * Make sure that you have a valid license of „Highstock JS“ before using this ccm component.
 *
 * The developer Michael Nutzenberger of this component has a valid license of „Highstock JS“ for
 * Personal/Student Use|Not-for-Profit Educational Institution use for the following product(s): Highcharts, Highstock
 * @version latest (1.0.0)
 */

( function () {
    const component = {

        name: "monitor",

        ccm: "https://ccmjs.github.io/ccm/ccm.js",

        config: {

            css: {
                default: [ "ccm.load", [
                    { url: "https://mnutze.github.io/bsc.monitor/resources/default.css" },
                    { url: "https://mnutze.github.io/bsc.monitor/resources/cm-highcharts.css" }
                ] ],
                extern: [ "ccm.load", [
                    { url: "https://mnutze.github.io/bsc.monitoring-courses/libs/css/delos.css" },
                    { url: "https://mnutze.github.io/bsc.monitoring-courses/libs/css/delos_cont.css" },
                    { url: "https://mnutze.github.io/bsc.monitoring-courses/libs/css/fonts.css" },

                ] ]
            },

            html: {
                main: {
                    tag: "body", style: "position: relative;",
                    inner: [
                        {
                            tag: "nav",
                            id: "optionsControl"
                        },
                        {
                            id: "main",
                            inner: {
                                id: "ccm_keyframe",
                                inner: "%loading%"
                            }
                        }
                    ]
                }
            },

            debug: true,

            stores: {
                // log: undefined, // level-3 store
                // local: undefined, // level-2 store
            },

            templates: [ "ccm.load", { url: "https://mnutze.github.io/bsc.monitor/resources/templates.js" } ],

            user: [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.0.1.js", {
                realm: "hbrsinfpseudo",
                logged_in: true
            } ],
        },

        Instance: function () {

            const self = this;
            let $, navContainer, utils, rerender = true;

            // global variables
            let timeSlices, timeRanges, colorList;

            this.init = async () => {
                
                if (self.worker) {
                    self.worker = new Worker(self.worker);
                    self.worker.addEventListener('message', function(event) {
                        let data = event.data;
                        if (self["no-rlt"] && !rerender)
                            return;

                        if (data)
                            render()[self.render.key](data);
                    }, false);
                }

                // make sure that "highcharts.js" library is executed only once
                !window.Highcharts && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/highcharts/7.1.2/highcharts.js" );
                await self.ccm.load( "https://cdnjs.cloudflare.com/ajax/libs/highstock/6.0.3/js/modules/exporting.js" );
                await self.ccm.load( "https://code.highcharts.com/modules/data.js" );
                await self.ccm.load( "https://code.highcharts.com/modules/drilldown.js" );
                //await self.ccm.load( "https://code.highcharts.com/modules/series-label.js" );
                //await self.ccm.load( "https://cdnjs.cloudflare.com/ajax/libs/highcharts/7.1.2/modules/heatmap.js" );

                // load jsonLogic only once
                !window.jsonLogic && await self.ccm.load("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");

                // make sure that "d3.js" library is executed only once
                !window.d3 && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js" );

                // make sure that "d3.js" library is executed only once
                !window.moment && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js" );
                await self.ccm.load("https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.13/moment-timezone-with-data-2012-2022.min.js");

                Highcharts.dateFormats = {
                    W: function (timestamp) {
                        return moment(timestamp).isoWeek();
                    }
                };

                Highcharts.setOptions( { time: { timezone: 'Europe/Berlin' } } );

                let has = function(key) {
                    return !!$.deepValue(this, key);
                };

                let range = function(start, end) {
                    return (new Date(this.created_at) > start && new Date(this.created_at) < end)
                };
                jsonLogic.add_operation("has", has);
                jsonLogic.add_operation("range", range);

                timeSlices = new Map([
                    ["1m", [d3.timeMinute, 1]], ["5m", [d3.timeMinute, 5]], ["10m", [d3.timeMinute, 10]],
                    ["15m", [d3.timeMinute, 15]], ["30m", [d3.timeMinute, 30]], ["1h", [d3.timeHour, 1]],
                    ["2h", [d3.timeHour, 2]], ["6h", [d3.timeHour, 6]], ["12h", [d3.timeHour, 12]], ["1d", [d3.timeDay, 1]],
                    ["2d", [d3.timeDay, 2]], ["1w", [d3.timeWeek, 1]], ["1month", [d3.timeMonth, 1]]
                ]);

                timeRanges = new Map([
                    ["today", now => [utils.date.midnight(now), now]],
                    ["yesterday", now => [utils.date.midnight(moment(now).subtract(1, "day")), utils.date.midnight(now)]],
                    ["last 24h", now => [new Date(moment(now).subtract(1, "day")), now]],
                    ["last 48h", now => [new Date(moment(now).subtract(2, "day")), now]],
                    ["last 7d", now => [new Date(moment(now).subtract(1, "week")), now]],
                    ["last 14d", now => [new Date(moment(now).subtract(2, "week")), now]],
                    ["last month", now => [new Date(moment(now).subtract(1, "month")), now]],
                    ["last 2 month", now => [new Date(moment(now).subtract(2, "month")), now]]
                ]);

                colorList = ["#00698B", "#6ea03c", "#7c7c7c", "#E46C16",
                    "#9A4483","#F0BD00", "#d62728",  "#8c564b",
                    "#17becf", "#2ca02c", "#ff7f0e", "#9467bd",
                    "#1f77b4", "#bcbd22"];
            };

            this.ready = async () => {
                // set shortcut to help functions
                $ = self.ccm.helper;

                // if monitor got no uid from config -> call helper.generateKey()
                if (!self.widget)
                    self.widget = "m" + $.generateKey();

                if (!self.data)
                    self.data = {};

                if (!self.filter)
                    self.filter = {};

                if ($.isObject(self.stores) && Object.keys(self.stores).length > 0) {
                    let keys = Object.keys(self.stores);
                    for (let key of keys) {
                        if ($.isDatastore(self.stores[key].store))
                            self.data[key] = await self.stores[key].store.get(self.stores[key].key);
                    }
                }

            };

            this.start = async () => {

                // put main HTML structure into frontend
                $.setContent( self.element, $.html( self.html.main, {
                    loading: $.loading()
                } ) );

                self.element.style = "height: inherit;";
                if (!self.size) {
                    self.element.style = "height: 100vh;";
                    self.size = self.element.getBoundingClientRect();
                } else {
                    self.element.style = $.format("height: %height%px; width: %width%px", {
                        height: self.size.height - 50,
                        width: self.size.width - 30
                    });
                }

                // if dashboard widget -> validate initial monitor data if
                if (self.sources) {
                    let __sources = Object.keys(self.sources);
                    __sources.forEach(src => {
                        if (!self.data[self.sources[src].name])
                            self.data[self.sources[src].name] = [];
                        self.data[self.sources[src].name] = self.helper.filterData(self.data[self.sources[src].name], self.sources[src].filter)
                    });
                }

                // render
                await update();

                // register store onchange listener
                if ($.isObject(self.stores) && Object.keys(self.stores).length > 0) {
                    let keys = Object.keys(self.stores);
                    for (let key of keys)
                        if ($.isDatastore(self.stores[key].store))
                            self.stores[key].store.onchange = async dataset => await update(dataset, {
                                name: key, filter: self.stores[key].onchangeFilter});
                }

                if (self.runtimeOptions) {
                    $.setContent(self.element.querySelector("#optionsControl"), $.html(self.templates.nav.wrapper));

                    navContainer = {
                        options: self.element.querySelector(".monitorOptions"),
                        filter: self.element.querySelector(".monitorFilter")
                    };

                    self.element.querySelector("#optionsControl").querySelector("#close-options").addEventListener("click", ev => {
                        self.element.querySelector("#toggle-sidebar").checked = false;
                    });
                }
            };

            this.helper = {
                colors: ["#00698B", "#6ea03c", "#7c7c7c", "#E46C16", "#9A4483","#F0BD00", "#d62728",  "#8c564b",
                    "#17becf", "#2ca02c", "#ff7f0e", "#9467bd", "#1f77b4", "#bcbd22"],
                filterData: (data, rules) => {
                    if (!data)
                        return data;
                    if (!rules)
                        return;
                    return data.filter(dataset => jsonLogic.apply(rules, dataset));
                },
                solveTeams: () => {},
                timeRanges: new Map([
                    ["today", now => [utils.date.midnight(now), now]],
                    ["yesterday", now => [utils.date.midnight(moment(now).subtract(1, "day")), utils.date.midnight(now)]],
                    ["last 24h", now => [new Date(moment(now).subtract(1, "day")), now]],
                    ["last 48h", now => [new Date(moment(now).subtract(2, "day")), now]],
                    ["last 7d", now => [new Date(moment(now).subtract(1, "week")), now]],
                    ["last 14d", now => [new Date(moment(now).subtract(2, "week")), now]],
                    ["last month", now => [new Date(moment(now).subtract(1, "month")), now]],
                    ["last 2 month", now => [new Date(moment(now).subtract(2, "month")), now]]
                ]),
                timeSlices: () => timeSlices,
                datetime: {
                    gt: (data, value) => {
                        let now = new Date();
                        now.setMinutes(now.getMinutes() - value);
                        data= data.filter(dataset => (new Date(dataset.created_at) > now));
                        return data;
                    },
                    mondayWeek: () => d3.timeMonday,
                    range: data => d3.extent(data, dataset => new Date(dataset.created_at)),
                    histogram: (data, domain, unit, value) => {
                        if (!domain)
                            domain = d3.extent(data, dataset => new Date(dataset.created_at));
                        let x = d3.scaleTime().domain(domain);

                        // create histogram function
                        let histogram = d3.histogram()
                            .value(dataset => new Date(dataset.created_at))
                            .domain(domain)
                            .thresholds(x.ticks(unit, value));

                        return histogram(data);
                    }
                },
                teams: data => { // connect log-data of user with their team
                    return data.map(dataset => {
                        if (dataset.user && dataset.user.user)
                            dataset.team = self.teams.learners[dataset.user.user] ?
                                self.teams.learners[dataset.user.user] : undefined;
                        return dataset
                    });
                }
            };

            this.rerender = () => {

                let data = self.data;

                if (self.worker)
                    self.worker.postMessage({
                        colors: self.helper.colors,
                        course: self.course ? self.course : undefined,
                        data: data,
                        incompleteLog: self.incompleteLog ? self.incompleteLog : false,
                        interval: self.interval ? self.interval : undefined,
                        range: self.range ? self.range : undefined,
                        subject: self.subject ? self.subject : undefined,
                    });
                else {
                    if (self.process)
                        data = self.process(data, self);

                    rerender = true;

                    if (data)
                        render()[self.render.key](data);
                }

            };

            this.update = async (dataset, source, flag) => await update(dataset, self.sources[source]);

            async function update (dataset, source) {
                //console.log(dataset, source);
                if (dataset && $.isObject(dataset)) {
                    if ($.isObject(source))
                        dataset = self.helper.filterData([dataset], source.filter)[0];
                    else
                        dataset = self.helper.filterData([dataset])[0];

                    //console.log(self.widget, dataset);
                    if (!dataset)
                        return;

                    if (self.teams) // extend log entries with a property team and the user corresponding team-value
                        dataset = self.helper.teams([dataset])[0];

                    /**
                     * @info source.name === "log" -> log-entries must not be checked, if these are an update for
                     * an existing dataset. Log-entries are stacked (old->new) and may not modified. So skip the modify-check
                     */
                    if ($.isObject(source) && source.name !== "log") { //
                        let __replaced = false;
                        self.data[source.name] = self.data[source.name].reduce((prev, curr) => {
                            if (curr.key === dataset.key) {
                                curr = dataset;
                                __replaced = true;
                            }
                            return prev.concat(curr);
                        }, []);
                        if (!__replaced)
                           self.data[source.name].push(dataset);
                    } else
                        self.data[source.name].push(dataset);
                }
                else if (Array.isArray(dataset)) {
                    //console.log(self.widget, dataset);
                    self.data[source.name] = self.data[source.name].concat(self.helper.filterData(dataset, source.filter));
                    if (self.teams) // extend log entries with a property team and the user corresponding team-value
                        self.data[source.name] = self.helper.teams(self.data[source.name]);
                }

                let data = self.data;

                if (self.worker)
                    self.worker.postMessage({
                        colors: self.helper.colors,
                        course: self.course ? self.course : undefined,
                        data: data,
                        incompleteLog: self.incompleteLog ? self.incompleteLog : false,
                        interval: self.interval ? self.interval : undefined,
                        range: self.range ? self.range : undefined,
                        subject: self.subject ? self.subject : undefined,
                    });
                else {
                    if (self.process)
                        data = self.process(data, self);

                    if (self["no-rlt"] && !rerender)
                        return;

                    if (data)
                        render()[self.render.key](data);
                }
            }

            function render() {
                return {
                    custom: data => {
                        $.setContent( self.element.querySelector( "#main" ), $.html(data, {
                            height: self.size.height - 50
                        } ) );
                    },
                    highcharts: async data => {
                        if (self["no-rlt"] && !rerender)
                            return;

                        let buttonsSettings = {
                            x: [76, 20],
                            y: [0, 0],
                            theme: {
                                'stroke-width': 1,
                                stroke: "#dadade",
                                r: 0,
                                padding: 5,
                                height: 12,
                                "font-size": "10px"
                            },
                        }, intervalButton = {}, rangeButton = {};

                        if (self.interval && self.interval.enabled)
                            intervalButton = {
                                "exporting.buttons.interval" : {
                                    align: 'left',
                                    x: buttonsSettings.x.pop(),
                                    y: buttonsSettings.y.pop(),
                                    theme: buttonsSettings.theme,
                                    text: "Interval",
                                    menuItems: function () {
                                        let bc = [];
                                        timeSlices.forEach((value, key) => {
                                            if (!self.interval.exclude.includes(key))
                                                bc.push({
                                                    text: key,
                                                    theme: {"font-size": "8px"},
                                                    onclick: (ev) => {
                                                        self.interval.current = key;
                                                        self.rerender();
                                                    }});
                                        });
                                        return bc;
                                    }()
                                }
                            };

                        if (self.range && self.range.enabled)
                            rangeButton = {
                                "exporting.buttons.range": {
                                    align: 'left',
                                    height: 14,
                                    x: buttonsSettings.x.pop(),
                                    y: buttonsSettings.y.pop(),
                                    className: "cm-hc-custom-range",
                                    theme: buttonsSettings.theme,
                                    text: self.range.range === "lessons" && self.course && self.course.lessons ? "Lesson" : "Range",
                                    menuItems: function () {
                                        // Calendar weeks
                                        if (self.range.range === "weeks") {
                                            return self.range.values.map(range => ({
                                                text: "KW-" + moment(range.x0).isoWeek(),
                                                theme: {"font-size": "8px"},
                                                onclick: (ev) => {
                                                    self.range.current = [range.x0, range.x1];
                                                    self.rerender()
                                                }
                                            }));
                                        }
                                        if (self.range.range === "lessons" && self.course && self.course.lessons) {
                                            return Object.keys(self.course.lessons).map((lesson, id) => ({
                                                text: "" + (id+1),
                                                theme: { "font-size": "8px" },
                                                onclick: (ev) => {
                                                    self.range.current = { [lesson]: self.course.lessons[lesson] };
                                                    self.rerender()
                                                }
                                            }));
                                        }

                                        let ranges = [];
                                        timeRanges.forEach((value, key) => {
                                            ranges.push({
                                                text: key,
                                                theme: {"font-size": "8px"},
                                                onclick: (ev) => {
                                                    //self.monitor.filter = self.monitor.filter.concat([value(new Date)]);
                                                    self.range.range = key;
                                                    self.rerender();
                                                }
                                            });
                                        });
                                        return ranges;
                                    }()
                                }
                            };

                        let settings = {
                            chart: {
                                styledMode: false,
                                zoomType: 'x',
                                backgroundColor: "#ffffff",
                                width: self.size.width - 50,
                                height: self.size.height - 50,
                                marginTop: 50,
                                resetZoomButton:{
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
                                        "font-size": "10px",
                                        "zIndex": 6
                                    }
                                }
                            },
                            colors: self.helper.colors,
                            "exporting.buttons.contextButton.enabled": false,
                            legend: {
                                enabled: false,
                                align: 'right',
                                verticalAlign: 'top',
                                borderWidth: 0,
                                symbolHeight: 0,
                                symbolPadding: 0,
                                symbolRadius: 0,
                                x: -25
                            },
                            navigator: { enabled: false, },
                            plotOptions: { series: { states: { inactive: { opacity: 1 } } } },
                            rangeSelector: { enabled: false },
                            responsive: {
                                rules: [{
                                    condition: { maxWidth: 500 },
                                    chartOptions: {
                                        legend: {
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            layout: 'horizontal'
                                        },
                                        xAxis: { "labels.step": 5 },
                                        credits: { enabled: false }
                                    }
                                }]
                            },
                            scrollbar: { enabled: false, },
                            title: { text: "" },
                            "tooltip.valueDecimals": 2,
                            xAxis: { maxPadding: 0.02 },
                        };

                        settings = $.convertObjectKeys(Object.assign(settings, intervalButton, rangeButton));

                        settings = $.convertObjectKeys(Object.assign(settings, data));

                        if ($.isObject(self.render.highcharts))
                            settings = $.convertObjectKeys(Object.assign(settings, self.render.highcharts));
                        
                        //console.log(settings); // @TODO remove debug print before live
                        if (!self.visualization) {
                            rerender = false;
                            const div = document.createElement( 'div' );
                            self.visualization = Highcharts.chart(div, settings);
                            $.setContent( self.element.querySelector( "#main" ), div );
                        } else if (rerender) {
                            //console.debug("monitor-" + self.monitor.uid + ": Rerender Chart");
                            rerender = false;
                            const div = document.createElement( 'div' );
                            self.visualization = Highcharts.chart(div, settings);
                            $.setContent( self.element.querySelector( "#main" ), div );
                        }
                        else
                            self.visualization.series.forEach((series, i) => series ?
                                series.setData(data.series[i].data): null);
                    },
                    none: data => {
                        //console.log(data);
                    },
                    multiple_tables: data => {
                        //console.log(data);
                        $.setContent( self.element.querySelector( "#main" ), "" );
                    },
                    table: data => {
                        if (!data)
                            return;

                        function setCell (dataset, key, link) {
                            if (!Array.isArray($.deepValue(dataset, key))) {
                                if (link === "subject")
                                    return {
                                        tag: "a",
                                        id: $.deepValue(dataset, key),
                                        inner: $.deepValue(dataset, key) ,
                                        onclick: function (event) {
                                            self.parent.fromChild.panel(dataset.key, self.subject, !!self.teams);
                                        }
                                };
                                if (key === "created_at" || key === "updated_at")
                                    return $.deepValue(dataset, key).replace("T", " ").slice(0,19);
                                if (key.indexOf(",") > 1)
                                    return $.deepValue(dataset, key.split(",")[0]) ?
                                        $.deepValue(dataset, key.split(",")[0]) : $.deepValue(dataset, key.split(",")[1]);
                                return $.deepValue(dataset, key);
                            }
                            else if (Array.isArray($.deepValue(dataset, key)) && key.indexOf("profile") !== -1 ) {
                                let width = 100,
                                    height = 30;
                                const div = document.createElement( 'div' );
                                let svg = d3.select(div).append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

                                svg.append("g").classed("line", true);

                                let x = data.x;
                                x.rangeRound([0, width]);

                                let y = d3.scaleLinear()
                                    .domain([0, 1.05*d3.max($.deepValue(dataset, key), el => el.length)])
                                    .range([height, 0]);
                                let line = d3.line().x(d => x(d.x1)).y(d => y(d.length));

                                // Add the valueline path.
                                svg.select(".line")
                                    .append("path") // mean-line
                                    .data([$.deepValue(dataset, key)])
                                    .attr("class", "line")
                                    .attr("style", "fill: none; stroke-width: 1px;")
                                    .attr("stroke", self.helper.colors[0])
                                    .attr("d", line);

                                return div;
                            }
                        }

                        let columns = self.render.columns;

                        // @Todo Up&Down icons for sorting
                        let rows = Object.values(data.aggregated).reduce((prev, subject) => {
                            prev = prev.concat(
                                { tag: "tr", inner: columns.order.map(td => $.format(self.templates.tables.td, {
                                    //tdInner: setCell(subject, columns[td].key, td) // without filterAbility @TODO remove before live
                                        tdInner: function () {
                                            if (!columns[td].filter)
                                                return setCell(subject, columns[td].key, td);
                                            let value, __path = columns[td].key;
                                            if (columns[td].key.indexOf(",") > 1) {
                                                if ($.deepValue(subject, columns[td].key.split(",")[0])) {
                                                    value = $.deepValue(subject, columns[td].key.split(",")[0]);
                                                    __path = columns[td].key.split(",")[0];
                                                } else {
                                                    value = $.deepValue(subject, columns[td].key.split(",")[1]);
                                                    __path = columns[td].key.split(",")[1]
                                                }
                                            }
                                            else
                                                value = $.deepValue(subject, columns[td].key);
                                            return [
                                                {
                                                    tag: "span",
                                                    class: "cm_table_cell",
                                                    inner: setCell(subject, columns[td].key, td)
                                                },
                                                {
                                                    tag: "span",
                                                    class: "cm_table_cell_filter",
                                                    inner: [
                                                        {
                                                            tag: "span",
                                                            class: "glyphicon glyphicon-zoom-in",
                                                            onclick: () => config().filter.add(__path, value, true, columns[td].label)
                                                        },
                                                        {
                                                            tag: "span",
                                                            class: "glyphicon glyphicon-zoom-out",
                                                            onclick: () => config().filter.add(__path, value, false, columns[td].label)
                                                        }
                                                    ]
                                                }
                                            ]
                                        } ()
                                    }))},
                            );
                            return prev;
                        }, [] ) ;

                        let table = $.html(self.templates.tables.table, {
                            height: self.size.height - 60,
                            thead: columns.order.map(th => ( { tag: "th", style: "position: sticky; top: 0; z-index: 10;", inner: columns[th].label } ) ),
                            tbody: rows
                        });
                        $.setContent( self.element.querySelector( "#main" ), table );

                        /**@THX to Nick Grealy (https://stackoverflow.com/users/782034/nick-grealy)
                         * by contributing his table sort algorithm
                         * https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript?answertab=votes#tab-top
                         */
                        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

                        const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
                            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
                            )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

                        // do the work...
                        self.element.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
                            const table = th.closest('table');
                            const tbody = table.querySelector("tbody");
                            Array.from(tbody.querySelectorAll('tr:nth-child(n+1)'))
                                .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                                .forEach(tr => tbody.appendChild(tr) );
                        })));
                    },
                };
            }

            utils = {
                date: {
                    midnight: date => {
                        date = new Date(date);
                        date.setHours(0,0,0,0);
                        return date;
                    }
                }
            };

            function config() {
                return {
                    filter: {
                        add: (path, value, boolean, label) => {
                            if(!self.filter)
                                self.filter = { and: [ ] };

                            let filter;
                            if (boolean)
                                filter = { "===" : [ { var : path }, value ] };
                            else
                                filter = { "!==" : [ { var : path }, value ] };
                            self.filter.and.push(filter);

                            if (!self.filterGUI)
                                self.filterGUI = [{label: label, filter: filter}];
                            else
                                self.filterGUI.push({label: label, filter: filter});

                            config().filter.render();
                        },
                        remove: filter => {
                            self.filter.and = self.filter.and.filter(arr => JSON.stringify(arr) !== JSON.stringify(filter.filter));
                            self.filterGUI = self.filterGUI.filter(arr => JSON.stringify(arr) !== JSON.stringify(filter));
                            config().filter.render();
                        },
                        render: () => {
                            let boolean = {
                                "===": true,
                                "!==": false
                            };
                            let content = [ ];

                            self.filterGUI.forEach(filter => {
                                content.push($.format({
                                    tag: "span",
                                    class: boolean[Object.keys(filter.filter)[0]] ? "btn-default badge" : "btn-danger badge",
                                    style: "position: unset; margin-left: 7px",
                                    inner: filter.label + ": " +  Object.values(filter.filter)[0][1] ,
                                    onclick: "%click%"
                                }, { click: ev => config().filter.remove(filter)}));
                            });

                            $.setContent( navContainer.filter.querySelector("#monitorFilterList"), $.html(content));

                            self.rerender();
                        }
                    }
                }
            }
        }

    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();