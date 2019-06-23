importScripts("https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js");
importScripts("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");

/** @from ccm.js
 * @summary get or set the value of a deeper object property
 * @param {Object} obj - object that contains the deeper property
 * @param {string} key - key path to the deeper property in dot notation
 * @param {*} [value] - value that should be set for the deeper property
 * @returns {*} value of the deeper property
 * @example
 * var obj = {
 *   test: 123,
 *   foo: {
 *     bar: 'abc',
 *     baz: 'xyz'
 *   }
 * };
 * var result = ccm.helper.deepValue( obj, 'foo.bar' );
 * console.log( result ); // => 'abc'
 * @example
 * var obj = {};
 * var result = ccm.helper.deepValue( obj, 'foo.bar', 'abc' );
 * console.log( obj );    // => { foo: { bar: 'abc' } }
 * console.log( result ); // => 'abc'
 */
function deepValue ( obj, key, value ) {
    return recursive( obj, key.split( '.' ), value );
    /**
     * recursive helper function, key path is given as array
     */
    function recursive( obj, key, value ) {
        if ( !obj ) return;
        var next = key.shift();
        if ( key.length === 0 )
            return value !== undefined ? obj[ next ] = value : obj[ next ];
        if ( !obj[ next ] && value !== undefined ) obj[ next ] = isNaN( key[ 0 ] ) ? {} : [];
        return recursive( obj[ next ], key, value );  // recursive call
    }
}

function rangeFunc (data) {
    return d3.extent(data, dataset => new Date(dataset.created_at));
}

function histogramFunc (data, domain, unit, value) {
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

self.addEventListener("message", function (event) {

    let data = event.data.data;
    let colors = event.data.colors;
    let log = data.log;
    let course = event.data.course;
    let lessons = course.lessons;
    let range = event.data.range;
    let interval = event.data.interval;

    if (!lessons) {
        console.error("No Lessons available / defined");
        self.postMessage({});
        return;
    }

    if (log.length < 1)
        return;

    if (!range)
        return;

    if (!range.current) {
        let today = new Date();
        range.current = Object.entries(lessons)
            .filter(lesson => (today > new Date(lesson[1].start) && (today < new Date(lesson[1].deadline))))[0];
        if (range.current.length < 1)
            range.current = lessons[Object.keys(lessons)[Object.keys(lessons).length-1]];
        if (Array.isArray(range.current))
            range.current = { [range.current[0]]: range.current[1] };
    }

    let filter = Object.keys(range.current[Object.keys(range.current)[0]].content).reduce((prev, curr) => {
        prev.push({ "===": [ { var : "parent.descr" }, curr ] });
        prev.push({ "===": [ { var : "parent.id" }, curr ] });
        return prev;
    }, []);

    filter = { or: filter };
    let activities = {
        and: [
            { or: [
                { and: [ { "===" : [ { var : "parent.name" }, "youtube" ] }, { "===" : [ { var : "event" }, "onStateChange" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "quiz" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "live_poll" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "feedback" ] }, { "===" : [ { var : "event" }, "create" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "comment" ] }, { "===" : [ { var : "event" }, "create" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "submit" ] }, { "===" : [ { var : "event" }, "submit" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "cloze" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                //{ and: [ { "===" : [ { var : "parent.name" }, "regex" ] }, { "===" : [ { var : "event" }, "regex" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "regex" ] }, { "===" : [ { var : "event" }, "plus" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "regex" ] }, { "===" : [ { var : "event" }, "eval" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "quick_decide" ] }, { "===" : [ { var : "event" }, "click" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "quick_decide" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "fast_poll" ] }, { "===" : [ { var : "event" }, "click" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "fast_poll" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "pdf_viewer" ] }, { "===" : [ { var : "event" }, "goto" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "pdf_viewer" ] }, { "===" : [ { var : "event" }, "next" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "pdf_viewer" ] }, { "===" : [ { var : "event" }, "prev" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "kanban_board" ] }, { "===" : [ { var : "event" }, "add" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "kanban_board" ] }, { "===" : [ { var : "event" }, "drop" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "kanban_board" ] }, { "===" : [ { var : "event" }, "del" ] } ] },
                { and: [ { "===" : [ { var : "parent.name" }, "kanban_card" ] }, { "===" : [ { var : "event" }, "change" ] } ] },
            ] }
        ]
    };

    log = log.filter(entry => jsonLogic.apply(filter, entry));
    let histogram = histogramFunc(log, rangeFunc(log), d3.timeHour, 2);

    let processed = {
        activities: {
            name: "all Activities",
            type: "column",
            color: colors[0],
            data: []
        },
        submits: {
            name: "Submits",
            type: "column",
            color: colors[6],
            data: []
        },
        learners_online: {
            name: "Learners online",
            type: "areaspline",
            color: "#000",
            fillColor: "#ccc",
            fillOpacity: 0.7,
            lineWidth: .5,
            dashStyle: "LongDash",
            yAxis: 1,
            states: { hover: { lineWidth: .5}},
            data: []
        }
    };
    histogram.forEach(slice => {
        let values = slice.reduce((prev, curr) => {
            if (jsonLogic.apply(activities, curr))
                prev.activities += 1;
            if (curr.event === "submit" && curr.parent.name === "submit")
                prev.submits += 1;
            if (!prev.learners[curr.user.user])
                prev.learners[curr.user.user] = true;
            return prev;
        }, { submits: 0, activities: 0, learners: {} });
        values.learners = Object.keys(values.learners).length;
        processed.activities.data.push([Date.parse(slice.x1), values.activities]);
        processed.submits.data.push([Date.parse(slice.x1), values.submits]);
        processed.learners_online.data.push([Date.parse(slice.x1), values.learners]);
    });

    self.postMessage({
            "tooltip.enabled": true,
            "tooltip.shared": true,
            series: [ processed.learners_online, processed.activities, processed.submits ],
            "plotOptions.series.marker.enabled": false,
            "subtitle.text": range.current[Object.keys(range.current)[0]].label,
            "subtitle.style": { fontWeight: "bold" },
            "xAxis.type": "datetime",
            yAxis: [
                { title: { text: 'activities \\ ' + interval.current } },
                { title: { text: "learners online \\ " + interval.current }, opposite: true }
            ]
        });
}, false);