importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js");

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

self.addEventListener("message", function (event) {

    let data = event.data.data;

    let log = data.log;
    let solutions = data.solutions;
    let course = event.data.course;
    let lessons = course.lessons;

    if (!lessons) {
        console.error("No Units available / defined");
        self.postMessage({});
        return;
    }
    
    if (log.length < 1 || solutions.length < 1)
        return;

    let processed = Object.keys(lessons).map(lesson => {
        lessons[lesson].values = [];
        lessons[lesson].learners = { submit: { obj: {}, events: 0 }, online: { obj: {}, events: 0 } };
        lessons[lesson].max = {
            lesson: Object.values(lessons[lesson].exercises).reduce((p, c) => p + c.points, 0),
            learners: {
                possible: 0,
                effective: 0,
                percentage: 0
            }
        };

        log = log.reduce((prev, curr) => {
            if (!lessons[lesson].content[curr.parent.descr] && !lessons[lesson].content[curr.parent.id] && curr.event !== "login")
                prev.push(curr);
            else {
                if (curr.parent.name === "submit" && !lessons[lesson].learners.submit[curr.user.user]) {
                    lessons[lesson].learners.submit.obj[curr.user.user] = true;
                    lessons[lesson].learners.submit.events += 1;
                } else if (curr.parent.name === "submit")
                    lessons[lesson].learners.submit.events += 1;

                if (!lessons[lesson].learners.online.obj[curr.user.user])
                    lessons[lesson].learners.online.obj[curr.user.user] = true;
                lessons[lesson].learners.online.events += 1;
            }
            return prev;
        }, []);

        lessons[lesson].learners.submit.obj = Object.keys(lessons[lesson].learners.submit.obj).length;
        lessons[lesson].learners.online.obj = Object.keys(lessons[lesson].learners.online.obj).length;
        lessons[lesson].max.learners.possible = lessons[lesson].max.lesson * lessons[lesson].learners.submit.obj;

        solutions = solutions.reduce((prev, curr) => {
            if (!lessons[lesson].exercises[curr.key[0].replace(lessons[lesson].prefix,"")])
                prev.push(curr);
            else
                lessons[lesson].max.learners.effective +=
                    !lessons[lesson].deadline || moment( lessons[lesson].deadline ).isAfter( curr.created_at ) ?
                        lessons[lesson].exercises[ curr.key[0].replace(lessons[lesson].prefix,"") ].points : 0;
            return prev;
        }, []);
        
    });

    let categories = Object.entries(lessons).map(lesson => [lesson[0], lesson[1].label]);

    let settings = {
        "xAxis.categories": categories.map(lesson => lesson[1]),
        series: [],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: "#000"
                }
            },
            title: {
                text: 'Learners',
                style: {
                    color: "#000"
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Lesson succeeded',
                style: {
                    color: "#ff0000"
                }
            },
            max: 100,
            labels: {
                format: '{value} %',
                style: {
                    color: "#ff0000"
                }
            },
            opposite: true
        }],
        "tooltip.shared": true,
        //"subtitle.text": "Logging incomplete! Started at 22. May 2019 (~Unit 7)"
    };

    settings.series.push({
        type: "column",
        name: "Learners online",
        tooltip: { valueDecimals: 0 },
        data: categories.map(lesson => lessons[lesson[0]].learners.online.obj)
    });
    settings.series.push({
        type: "column",
        name: "Learners submitted",
        tooltip: { valueDecimals: 0 },
        data: categories.map(lesson => lessons[lesson[0]].learners.submit.obj)
    });
    settings.series.push({
        type: 'line',
        name: 'Lesson succeeded',
        yAxis: 1,
        color: "#ff0000",
        tooltip: { valueSuffix: " %" },
        data: Object.values(lessons).map(lesson => {
            if (event.data.incompleteLog)
                return (lesson.max.learners.effective / lesson.max.learners.possible * 100) <= 100 ?
                    (lesson.max.learners.effective / lesson.max.learners.possible * 100) : 0;
            else
                return lesson.max.learners.effective / lesson.max.learners.possible * 100;
        }),
        marker: {
            enabled: false
        }
    });
    
    // send processed to main thread
    self.postMessage(settings);
}, false);