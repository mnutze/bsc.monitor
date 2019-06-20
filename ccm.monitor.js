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
                    { url: "./resources/cm-highcharts.css" }
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
                        { id: "main", style: "" }
                    ]
                }
            },

            debug: true,

            stores: {
                // log: undefined, // level-3 store
                // local: undefined, // level-2 store
            },

            templates: [ "ccm.load", { url: "resources/templates.js" } ],

            js : [ "ccm.load", [
                { url: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js" },
            ] ],

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

                // make sure that "highstock.js" library is executed only once
                //!window.Highcharts && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/highcharts/7.1.1/highstock.js" );

                !window.Highcharts && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/highcharts/7.1.2/highcharts.js" );
                await self.ccm.load( "https://cdnjs.cloudflare.com/ajax/libs/highstock/6.0.3/js/modules/exporting.js" );

                Highcharts.dateFormats = {
                    W: function (timestamp) {
                        return moment(timestamp).isoWeek();
                    }
                };

                // load jsonLogic only once
                !window.jsonLogic && await self.ccm.load("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");

                // make sure that "d3.js" library is executed only once
                !window.d3 && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js" );

                // make sure that "pako.js" library is executed only once
                !window.pako && await self.ccm.load( this.ccm.components[ component.index ].lib || "https://cdnjs.cloudflare.com/ajax/libs/pako/1.0.10/pako.min.js" );

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
                $.setContent( self.element, $.html( self.html.main ) );

                self.element.style = "height: 100vh;";
                if (!self.size)
                    self.size = self.element.getBoundingClientRect();

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
                                name: key, filter: self.stores[key].onchangeFilter
                            });
                }

                return;
                if (self.monitor.options) {
                    $.setContent(self.element.querySelector("#optionsControl"), $.html(self.templates.nav.wrapper));
                    navContainer = {
                        options: self.element.querySelector(".monitorOptions"),
                        filter: self.element.querySelector(".monitorFilter")
                    };
                    if (self.monitor.options.range && self.monitor.options.range.enabled)
                        navContainer.options.appendChild($.html(self.templates.nav.filter.range));

                    self.element.querySelector("#optionsControl").querySelector("#apply-options").addEventListener("click", ev => {
                        self.element.querySelector("#toggle-sidebar").checked = false;
                        self.rerender();
                    });
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

                if (self.process)
                    data = self.process(data, self);
                else if (self.monitor.process.agg.length > 0)
                    self.monitor.process.agg.forEach(func => data = $.deepValue(aggregate(data), func)());

                rerender = true;

                if (data)
                    render()[self.render.key](data);
            };

            this.resize = async size => {
                self.monitor.size = size;
                await self.rerender();
            };

            this.update = async (dataset, source, flag) => await update(dataset, self.sources[source]);

            async function update (dataset, source) {
                //console.log(dataset, source);
                if (dataset && $.isObject(dataset)) {
                    if ($.isObject(source))
                        dataset = self.helper.filterData([dataset], source.filter)[0];
                    else
                        dataset = self.helper.filterData([dataset])[0];

                    if (!dataset)
                        return;

                    if (self.teams) // extend log entries with a property team and the user corresponding team-value
                        dataset = self.helper.teams([dataset])[0];

                    if ($.isObject(source)) {
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
                    }
                }
                else if (Array.isArray(dataset)) {
                    self.data[source.name] = self.data[source.name].concat(self.helper.filterData(dataset, source.filter));
                    if (self.teams) // extend log entries with a property team and the user corresponding team-value
                        self.data[source.name] = self.helper.teams(self.data[source.name]);
                }

                let data = self.data;

                if (self.process)
                    data = self.process(data, self);

                if (self["no-rlt"] && !rerender)
                        return;

                if (data)
                    render()[self.render.key](data);
            }

            function aggregate(data) {
                return {
                    activity: {
                        classification: () => {

                            let domain = [ new Date(data[0].created_at), new Date(data[data.length-1].created_at)];
                            let slices = d3.scaleTime().domain(domain);
                            let histogramGen = d3.histogram()
                                .value(d => new Date(d.created_at))
                                .domain(slices.domain())
                                .thresholds(slices.ticks(d3.timeMonday));

                            let emptyHistogram = histogramGen([]);

                            if (self.monitor && self.monitor.range && self.monitor.range.range === "weeks")
                                self.monitor.range.values = emptyHistogram;

                            let aggregated = data.reduce(function(m, d){
                                if(!m[d.user.user])
                                    m[d.user.user] = [{...d}];
                                else
                                    m[d.user.user].push({...d});
                                return m;
                            },{});

                            let subjects = Object.entries(aggregated).map(subject => ({
                                key: subject[0],
                                histograms: histogramGen(subject[1])
                            }));

                            let weekSelector = 0;
                            if (!self.monitor.range.current)
                                emptyHistogram.forEach((histogram, id) => {
                                    if (moment(new Date()).subtract(7, "day") > histogram.x0 &&
                                        moment(new Date()).subtract(7, "day") < histogram.x1)
                                        weekSelector = id;
                                });
                            else
                                emptyHistogram.forEach((histogram, id) => {
                                    if (self.monitor.range.current[0] >= histogram.x0 &&
                                        self.monitor.range.current[1] <= histogram.x1)
                                        weekSelector = id;
                                });
                            let selfMarker = {};
                            let series = subjects.map(subject => ({
                                name: utils.checkProfile.name(subject.key) ? "You" : subject.key.substr(0, 16) + "...",
                                color: utils.checkProfile.user(subject.key) ? "#ff0000" : "#000",
                                marker: utils.checkProfile.user(subject.key) ? { radius: 8 } : {},
                                data: [[subject.histograms[weekSelector].length, (d3.mean(subject.histograms.slice(0,weekSelector+1), bin => bin.length))]]
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
                                        { color: "#000", value: d3.max(series, point => point.data[0][1])/2, width: 1 },
                                        { value: 0, label: { text: 'Q4 - Improving', align: 'right', x: -5, y: -10 } },
                                        { value: d3.max(series, point => point.data[0][1]), label: { text: 'Q1 - Heading', align: 'right', x: -5, y: -10 } },
                                        { value: d3.max(series, point => point.data[0][1]), label: { text: 'Q2 - Lowering', x: -5, y: -10 } },
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
                        },
                        over_range: () => {
                            let interval = [timeSlices.get(self.monitor.options.inChart.interval.current)[0],
                                timeSlices.get(self.monitor.options.inChart.interval.current)[1]];
                            let subject = "";

                            let total = aggregate(data).histogram.datetime(...interval);

                            let wanted = [1,2,3].map(key => data.filter(dataset => $.deepValue(dataset, subject) === key));

                            let selected = aggregate(data.filter(datum => datum.user.user === self.monitor.profile.user))
                                .histogram.datetime(...interval);
                            selected = selected.map(range => [Date.parse(range.x1), range.length]);
                            let mean = total.slice(0);
                            total = total.map(range => [Date.parse(range.x1), range.length]);
                            mean = mean.map(range => [Date.parse(range.x1), (range.length < 1 ?
                                0 : (range.length / d3.nest().key(datum => datum.user.user).entries(range).length))]);

                            return {
                                series: [
                                    {type: "column", yAxis: 1, name: 'total', plotOptions: {area: {color: "2ecc70"}},data: total},
                                    {type: "column", yAxis: 1, name: 'you',data: selected},
                                    {type: "spline", name: 'avg', data: mean}
                                ],
                                "plotOptions.series.marker.enabled": false,
                                yAxis: [
                                    { title: { text: 'avg count \\ ' + self.monitor.options.inChart.interval.current }},
                                    { title: { text: "total count \\ " + self.monitor.options.inChart.interval.current }, opposite: true }
                                ],
                                tooltip: { enabled: true, shared: true}
                            };
                        },
                        day_and_time: () => {
                            let day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                            let aggregated = data.reduce(function(m, d){
                                if(!m[day_names[new Date(d.created_at).getDay()]]){
                                    m[day_names[new Date(d.created_at).getDay()]] = [{...d}];
                                    return m;
                                }
                                m[day_names[new Date(d.created_at).getDay()]].push({...d});
                                return m;
                            },{});

                            aggregated = Object.entries(aggregated).map(day => ({
                                type: "spline", name: day[0], yAxis: 0,
                                data: Object.assign({},...d3.nest().key(datum => new Date(datum.created_at).getHours())
                                    .entries(day[1]).map(hour => ({[hour.key]: hour.values.length})))

                            }));
                            let week = [];

                            for (let i = 0; i < 24; i++) {
                                let sum = 0;
                                aggregated.forEach(day => {
                                    if (!day.data.hasOwnProperty(i))
                                        day.data[i] = 0;
                                    sum += day.data[i];
                                });
                                week.push([i, sum]);
                            }
                            aggregated.forEach(day => day.data = Object.entries(day.data));

                            //return [{type: "column", dashStyle: 'shortdot', yAxis: 1, name: "week", data: week}, ...aggregated] // @TODO deprectated

                            return {
                                series: [
                                    {type: "column", dashStyle: 'shortdot', yAxis: 1, name: "week", data: week},
                                    ...aggregated
                                ], "plotOptions.series.marker.enabled": false,
                                tooltip: { enabled: true, shared: true}
                            };
                        },
                    },
                    groupBy: () => {
                        data = data.reduce((prev, curr) => {
                            if (!prev[$.deepValue(curr, key)])
                                prev[$.deepValue(curr, key)] = [...curr];
                            else
                                prev[$.deepValue(curr, key)].push(...curr);
                            return prev;
                        }, {});
                    },
                    statistics: {
                        mini: {
                            distinct: () => {
                                let subject = self.monitor.options.subject;
                                // past week
                                let last7day  = [new Date(moment(new Date()).subtract(7, "day")), new Date()];
                                let last48h = [new Date(moment(new Date()).subtract(48, "hour")), new Date()];
                                let domain = [ new Date(data[0].created_at), new Date(data[data.length-1].created_at)];
                                let slices = d3.scaleTime().domain(domain);
                                let histogram = d3.histogram().domain(slices.domain()).thresholds(slices.ticks(d3.timeMonday))([]);
                                histogram.forEach(d => d.count = []);

                                let aggregated = data.reduce(function(prev, curr){
                                    let currSubject = $.deepValue(curr, subject);
                                    if (!prev.get("all").has(currSubject))
                                        prev.get("all").set(currSubject);
                                    if (!prev.get("last48h").has(currSubject) &&
                                        new Date(curr.created_at) > last48h[0] && new Date(curr.created_at) < last48h[1] )
                                        prev.get("last48h").set(currSubject);
                                    if (!prev.get("last7d").has(currSubject) &&
                                        new Date(curr.created_at) > last7day[0] && new Date(curr.created_at) < last7day[1] )
                                        prev.get("last7d").set(currSubject);
                                    if (prev.get("oldest") === null)
                                        prev.set("oldest", curr.created_at);

                                    histogram.every(function (d) {
                                        if (new Date(curr.created_at) > d.x0 && new Date(curr.created_at) < d.x1 && !d.count.includes(currSubject)) {
                                            d.count.push(currSubject);
                                            return false
                                        }
                                        else
                                            return true;
                                    });

                                    prev.set("newest", curr.created_at);
                                    return prev;
                                },new Map([["last48h", new Map()], ["last7d", new Map()], ["all", new Map()],
                                    ["oldest", null], ["newest", null]]));

                                histogram.forEach(d => {
                                    d.count = d.count.length;
                                });

                                aggregated.set("histogram", histogram);

                                return aggregated;
                            },
                            overall: () => {
                                let subject = self.monitor.options.subject;
                                // past week
                                let last7day  = [new Date(moment(new Date()).subtract(7, "day")), new Date()];
                                let last48h = [new Date(moment(new Date()).subtract(48, "hour")), new Date()];
                                let domain = [ new Date(data[0].created_at), new Date(data[data.length-1].created_at)];
                                let slices = d3.scaleTime().domain(domain);
                                let histogram = d3.histogram().domain(slices.domain()).thresholds(slices.ticks(d3.timeMonday))([]);
                                histogram.forEach(d => d.count = 0);

                                let aggregated = data.reduce(function(prev, curr){
                                    let currSubject = $.deepValue(curr, subject);

                                    if (new Date(curr.created_at) > last48h[0] && new Date(curr.created_at) < last48h[1] )
                                        prev.set("last48h", prev.get("last48h") + 1 );

                                    if (new Date(curr.created_at) > last7day[0] && new Date(curr.created_at) < last7day[1] )
                                        prev.set("last7d", prev.get("last7d") + 1 );

                                    if (prev.get("oldest") === null)
                                        prev.set("oldest", curr.created_at);

                                    prev.set("all", prev.get("all") + 1 );
                                    prev.set("newest", curr.created_at);

                                    histogram.every(function (d) {
                                        if (new Date(curr.created_at) > d.x0 && new Date(curr.created_at) < d.x1) {
                                            d.count++;
                                            return false
                                        }
                                        else
                                            return true;
                                    });
                                    return prev;
                                },new Map([["last48h", 0], ["last7d", 0], ["all", 0],
                                    ["oldest", null], ["newest", null]]));

                                aggregated.set("histogram", histogram);

                                return aggregated;
                            },
                        },
                    },
                    lessons: {
                        overview: () => {
                            let lessons = d3.nest().key(d => d.parent.descr.substr(0,d.parent.descr.indexOf("_"))).entries(data);
                            lessons = lessons.map(lesson => ({
                                key: lesson.key,
                                count: lesson.values.length,
                                min: d3.min(lesson.values, d => new Date(d.created_at)),
                                max: d3.max(lesson.values, d => new Date(d.created_at)),
                                tasks: d3.nest().key(d => d.parent.descr).entries(lesson.values).map(task => ({
                                    key: task.key,
                                    count: task.values.length,
                                    min: d3.min(task.values, d => new Date(d.created_at)),
                                    max: d3.max(task.values, d => new Date(d.created_at)),
                                    students: (d3.nest().key(d => d.user.user).entries(task.values)).length
                                })),
                                students: {
                                    count: (d3.nest().key(d => d.user.user).entries(lesson.values)).length,
                                    most: d3.nest().key(d => d.user.user).entries(lesson.values)[d3.nest().key(d => d.user.user).entries(lesson.values).map(d => d.values.length)
                                        .indexOf(Math.max(...d3.nest().key(d => d.user.user).entries(lesson.values).map(d => d.values.length)))].key,
                                },
                                values: lesson.values
                            }));
                            return {data: data, key: "Lessons", aggregated: lessons};
                        },
                        solutions: () => {
                            /**
                             * @TODO HEATMAP!!!
                             */
                            // Labels of row and columns
                            let columns = d3.nest().key(d => d.key[0]).entries(data);
                            let rows = d3.nest().key(d => d.key[1]).entries(data);

                        }
                    },
                }
            }

            function render() {
                return {
                    custom: data => {
                        console.log(data);
                        $.setContent( self.element.querySelector( "#main" ), $.html(data, {
                            height: self.size.height - 60
                        } ) );
                    },
                    highcharts: data => {
                        if (self["no-rlt"] && !rerender)
                            return;

                        let buttonsSettings = {
                            x: [76, 20],
                            y: [0, 0],
                            theme: {
                                'stroke-width': 1,
                                stroke: "#dadade",
                                r: 0,
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
                                    text: "Range",
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
                                marginTop: 50
                            },
                            colors: self.helper.colors,
                            title: { text: "" },
                            xAxis: { maxPadding: 0.02 },
                            plotOptions: { series: { states: { inactive: { opacity: 1 } } } },
                            legend: {
                                enabled: false,
                                align: 'right',
                                verticalAlign: 'top',
                                borderWidth: 0,
                                /*
                                    useHTML: true,
                                labelFormatter: function () {
                                    return '<h3 title="' + this.name + '">' + this.name + '</h3>';
                                },*/
                                symbolHeight: 0,
                                symbolPadding: 0,
                                symbolRadius: 0,
                                x: -25
                            },
                            navigator: { enabled: false, },
                            scrollbar: { enabled: false, },
                            rangeSelector: { enabled: false },
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            layout: 'horizontal'
                                        },
                                        xAxis: {
                                            "labels.step": 5,
                                        },
                                        yAxis: {
                                            labels: {
                                                align: 'left',
                                                x: -20,
                                                y: -5
                                            },
                                            title: {
                                                x: -15
                                            }
                                        },
                                        subtitle: {
                                            text: null
                                        },
                                        credits: {
                                            enabled: false
                                        }
                                    }
                                }]
                            },
                            "tooltip.valueDecimals": 2
                        };

                        settings = $.convertObjectKeys(Object.assign(settings, intervalButton, rangeButton));

                        settings = $.convertObjectKeys(Object.assign(settings, data));

                        if ($.isObject(self.render.highcharts))
                            settings = $.convertObjectKeys(Object.assign(settings, self.render.highcharts));

                        console.log(settings)
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
                                    tdInner: setCell(subject, columns[td].key, td)
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
                    }
                };
            }

            utils = {
                checkProfile: {
                    user: val => {
                        if (!self.monitor.profile)
                            return false;
                        else if (self.monitor.profile.user !== val)
                            return false;
                        else
                            return true;
                    },
                    name: val => {
                        if (!self.monitor.profile)
                            return false;
                        else if (self.monitor.profile.name.length < 1 || self.monitor.profile.user !== val)
                            return false;
                        else
                            return true;
                    }
                },
                query: {
                    date: {
                        last: query => {
                            let now = new Date();
                            now.setMinutes(now.getMinutes() - self.monitor.range.value - now.getTimezoneOffset());
                            return Object.assign(query, {created_at: {$gt: now.toISOString()}})
                        }
                    }
                },
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
                        add: (value, path, boolean) => {
                            if(!self.monitor.filter)
                                self.monitor.filter = [ {key: [path.key], filter: [boolean, {[path.path]: value}]} ];
                            else
                                self.monitor.filter.push({key: [path.key], filter: [boolean, {[path.path]: value}]});
                            config().filter.render();
                        },
                        range: () => {},
                        remove: filter => {
                            self.monitor.filter = self.monitor.filter.filter(arr => JSON.stringify(arr) !== JSON.stringify(filter));
                            config().filter.render();
                        },
                        render: () => {
                            let content = [
                                { tag: "span", style: "font-size: smaller; display: block; font-weight: bold;", inner: "Filter" },
                            ];
                            self.monitor.filter.forEach(filter => {
                                let subj = Object.values(filter.filter[1])[0];
                                content.push($.format({
                                    tag: "span",
                                    class: filter.filter[0] ? "btn-default badge" : "btn-danger badge",
                                    style: "position: unset; margin-left: 7px",
                                    inner: filter.key + ": " +  subj ,
                                    onclick: "%click%"
                                }, { click: ev => config().filter.remove(filter)}));
                            });
                            $.setContent( navContainer.filter, $.html(content));
                            self.rerender();
                        }
                    }
                }
            }

            /** @HOWTO compress and uncompress strings with pako */
            function compress_data (json_object) {
                let uncompressed_string = JSON.stringify(json_object); // pako gets a string
                let compressed_string = pako.gzip(uncompressed_string, { to: 'string' });
                uncompressed_string = pako.ungzip(compressed_string, { to: 'string' });
                json_object = JSON.parse(uncompressed_string);
                return json_object;
            }

        }

    };

    let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();