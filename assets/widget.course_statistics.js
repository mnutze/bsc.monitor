ccm.files["widget.course_statistics.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    if((data.log && !data.log.length > 0) || (data.solutions && !data.solutions.length > 0))
        return;

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
        }
    };

    let domain = helper.datetime.range(log);
    let histogram = helper.datetime.histogram(log, domain, helper.datetime.mondayWeek(), 1);
    histogram.forEach((week, index) => {
        let list = week.reduce((prev, curr) => {
            /*
            // learners
            if (!stats.online.sum.includes(curr.user.user))
                stats.online.sum.push(curr.user.user);

            if (moment(curr.created_at) > lastWeek[0] && moment(curr.created_at) < lastWeek[1] && !stats.online.weekly.last.includes(curr.user.user))
                stats.online.weekly.last.push(curr.user.user);

            if (moment(curr.created_at) > currentWeek[0] && moment(curr.created_at) < currentWeek[1] && !stats.online.weekly.current.includes(curr.user.user))
                stats.online.weekly.current.push(curr.user.user);
            */

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

            return prev;
        }, { learners: { weekly: { last: [], current: [] } } });
    });

    stats.online.weekAvg = stats.online.weekAvg / histogram.length;
    stats.activities.avg = stats.activities.sum / histogram.length;
    stats.exercises.avg = stats.exercises.sum / histogram.length;

    console.log(stats)

    /*
    data.forEach(dataset => {
        if (!Learners.list.includes(dataset.user.user))
            Learners.list.push(dataset.user.user);

        if (!Teams.list.includes(dataset.team))
            Teams.list.push(dataset.team);
    });
    */

    return { aggregated: stats };
};