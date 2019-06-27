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

    let rules = {
        // (youtube && onStateChange) || (quiz && finish) ||
        action: {
            "or": [
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
            ]
        },
    };

    let log = data.log;

    if (log.length < 1 || data.solutions.length < 1)
        return;

    let lastWeek = [moment(new Date()).subtract(1, 'weeks').startOf('isoWeek'), moment(new Date()).subtract(1, 'weeks').endOf('isoWeek')],
    currentWeek = [moment(new Date()).startOf('isoWeek'), moment(new Date()).endOf('isoWeek')];

    let stats = {
        online: {
            sum: [],
            weekly: {
                current: [],
                last: []
            },
            avg: 0
        },
        activities: {
            sum: 0,
            weekly: {
                current: 0,
                last: 0
            },
            avg: 0
        },
        exercises: {
            sum: 0,
            weekly: {
                current: 0,
                last: 0
            },
            avg: 0
        },
        mostFrequent: {
            component: {}
        },
    };

    let domain = rangeFunc(log);
    let histogram = histogramFunc(log, domain, d3.timeMonday, 1);
    histogram.forEach((week, index) => {
        let list = week.reduce((prev, curr) => {

            // learners
            if (!stats.online.sum.includes(curr.user.user))
                stats.online.sum.push(curr.user.user);

            if (moment(curr.created_at) > lastWeek[0] && moment(curr.created_at) < lastWeek[1] && !stats.online.weekly.last.includes(curr.user.user))
                stats.online.weekly.last.push(curr.user.user);

            if (moment(curr.created_at) > currentWeek[0] && moment(curr.created_at) < currentWeek[1] && !stats.online.weekly.current.includes(curr.user.user))
                stats.online.weekly.current.push(curr.user.user);

            // general activities
            if (jsonLogic.apply(rules.action, curr))
                stats.activities.sum += 1;

            if (moment(curr.created_at) > lastWeek[0] && moment(curr.created_at) < lastWeek[1] && jsonLogic.apply(rules.action, curr))
                stats.activities.weekly.last += 1;

            if (moment(curr.created_at) > currentWeek[0] && moment(curr.created_at) < currentWeek[1] && jsonLogic.apply(rules.action, curr))
                stats.activities.weekly.current += 1;

            // exercises
            if (curr.parent.name === "submit")
                stats.exercises.sum += 1;

            if (moment(curr.created_at) > lastWeek[0] && moment(curr.created_at) < lastWeek[1] && curr.parent.name === "submit")
                stats.exercises.weekly.last += 1;

            if (moment(curr.created_at) > currentWeek[0] && moment(curr.created_at) < currentWeek[1] && curr.parent.name === "submit")
                stats.exercises.weekly.current += 1;

            // most frequent
            if (!stats.mostFrequent.component[curr.parent.name] && jsonLogic.apply(rules.action, curr))
                stats.mostFrequent.component[curr.parent.name] = 1;
            else if (jsonLogic.apply(rules.action, curr))
                stats.mostFrequent.component[curr.parent.name] += 1;

            return prev;
        }, { learners: { weekly: { last: [], current: [] } } });
    });

    stats.online.weekAvg = stats.online.weekAvg / histogram.length;
    stats.activities.avg = stats.activities.sum / histogram.length;
    stats.exercises.avg = stats.exercises.sum / histogram.length;

    let content = {
        style: "height: %height%px;",
        inner: [
            {
                tag: "h3",
                class: "ilBlockHeader show",
                inner: "Learners"
            },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "&#8721;"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.online.sum.length
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "This Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.online.weekly.current.length
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Past Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.online.weekly.last.length
            },
            { style: "clear: both;" },
            {
                tag: "h3",
                class: "ilBlockHeader show",
                inner: "Activities "
            },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "&#8721;"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.activities.sum
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "This Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.activities.weekly.current
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Past Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.activities.weekly.last
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Average/Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: "&Oslash; " + stats.activities.avg.toFixed(2)
            },
            { style: "clear: both;" },
            {
                tag: "h3",
                class: "ilBlockHeader show",
                inner: "Exercises Submitted"
            },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "&#8721; of Submits"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.exercises.sum
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "This Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.exercises.weekly.current
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Past Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: stats.exercises.weekly.last
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Average/Week"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: "&Oslash; " + stats.exercises.avg.toFixed(2)
            },
            { style: "clear: both;" },
            {
                tag: "h3",
                class: "ilBlockHeader show",
                inner: "Most ..."
            },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Activity"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: "submit XY"
            },
            { style: "clear: both;" },
            {
                tag: "span",
                class: "cm-small ilFloatLeft",
                inner: "Resource-Type"
            },
            {
                tag: "span",
                class: "cm-small ilFloatRight",
                inner: Object.entries(stats.mostFrequent.component).reduce((prev, curr) => {
                    if (curr[1] > prev[1])
                        prev = [curr[0], curr[1]];
                    return prev;
                }, ["", 0])[0]
            },
            { style: "clear: both;" },
        ]
    };

    self.postMessage(content);
}, false);