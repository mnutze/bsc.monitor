ccm.files["monitor.teams.js"] = function (data, instance) {
    
    let subject = instance.subject;
    let teams = instance.course.teams;
    // assign log data
    data = data.log;

    if (data.length < 1)
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

    let domain = d3.extent(data, datum => new Date(datum.created_at));
    
    data = data.reduce((prev, curr) => {
        if (!teams[cmMonitorHelper.deepValue(curr, subject.key)])
            return prev;
        if (!prev[cmMonitorHelper.deepValue(curr, subject.key)])
            prev[cmMonitorHelper.deepValue(curr, subject.key)] = {
                key: cmMonitorHelper.deepValue(curr, subject.key),
                last: {
                    online: curr.created_at,
                    action: jsonLogic.apply(rules.action, curr) ? curr.created_at : 0
                },
                sum: {
                    online: 1,
                    action: jsonLogic.apply(rules.action, curr) ? 1 : 0
                },
                profile: {
                    online: [ { created_at: curr.created_at } ],
                    action: jsonLogic.apply(rules.action, curr) ? [ { created_at: curr.created_at } ] : []
                },
                members: [curr.user.user],
                label: teams[cmMonitorHelper.deepValue(curr, subject.key)].name
            };
        else {
            prev[cmMonitorHelper.deepValue(curr, subject.key)].profile.online =
                prev[cmMonitorHelper.deepValue(curr, subject.key)].profile.online.concat({ created_at: curr.created_at });

            prev[cmMonitorHelper.deepValue(curr, subject.key)].sum.online += 1;

            // already member?
            if (!prev[cmMonitorHelper.deepValue(curr, subject.key)].members.includes(curr.user.user))
                prev[cmMonitorHelper.deepValue(curr, subject.key)].members =
                    prev[cmMonitorHelper.deepValue(curr, subject.key)].members.concat(curr.user.user);

            // online activity
            if (Date.parse(prev[cmMonitorHelper.deepValue(curr, subject.key)].last.online) < Date.parse(curr.created_at))
                prev[cmMonitorHelper.deepValue(curr, subject.key)].last.online = curr.created_at;

            // real action
            if (jsonLogic.apply(rules.action, curr)) {
                if (Date.parse(prev[cmMonitorHelper.deepValue(curr, subject.key)].last.action) < Date.parse(curr.created_at)) {
                    prev[cmMonitorHelper.deepValue(curr, subject.key)].last.action = curr.created_at;
                    prev[cmMonitorHelper.deepValue(curr, subject.key)].sum.action += 1;
                }
                prev[cmMonitorHelper.deepValue(curr, subject.key)].profile.action =
                    prev[cmMonitorHelper.deepValue(curr, subject.key)].profile.action.concat({ created_at: curr.created_at });
            }
        }
        return prev;
    },{});

    let interval = cmMonitorHelper.time.interval.get("1h");
    Object.entries(data).forEach(dataset => {
        data[dataset[0]].profile.online = cmMonitorHelper.time.histogram(dataset[1].profile.online, domain, ...interval);
        data[dataset[0]].profile.action = cmMonitorHelper.time.histogram(dataset[1].profile.action, domain, ...interval);
        data[dataset[0]].last.online = data[dataset[0]].last.online !== 0 ? data[dataset[0]].last.online.replace("T", " ").split("+")[0] : "---";
        data[dataset[0]].last.action = data[dataset[0]].last.action !== 0 ? data[dataset[0]].last.action.replace("T", " ").split("+")[0] : "---";
    });

    return { aggregated: data, domain: domain, x: d3.scaleTime().domain(domain) };
};