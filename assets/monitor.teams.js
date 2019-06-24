ccm.files["monitor.teams.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

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

    let teams = instance.teams.teams;

    data = data.reduce((prev, curr) => {
        if (!teams[$.deepValue(curr, instance.subject.key)])
            return prev;
        if (!prev[$.deepValue(curr, instance.subject.key)])
            prev[$.deepValue(curr, instance.subject.key)] = {
                key: $.deepValue(curr, instance.subject.key),
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
                label: teams[$.deepValue(curr, instance.subject.key)].name
            };
        else {
            prev[$.deepValue(curr, instance.subject.key)].profile.online =
                prev[$.deepValue(curr, instance.subject.key)].profile.online.concat({ created_at: curr.created_at });

            prev[$.deepValue(curr, instance.subject.key)].sum.online += 1;

            // already member?
            if (!prev[$.deepValue(curr, instance.subject.key)].members.includes(curr.user.user))
                prev[$.deepValue(curr, instance.subject.key)].members =
                    prev[$.deepValue(curr, instance.subject.key)].members.concat(curr.user.user);

            // online activity
            if (Date.parse(prev[$.deepValue(curr, instance.subject.key)].last.online) < Date.parse(curr.created_at))
                prev[$.deepValue(curr, instance.subject.key)].last.online = curr.created_at;

            // real action
            if (jsonLogic.apply(rules.action, curr)) {
                if (Date.parse(prev[$.deepValue(curr, instance.subject.key)].last.action) < Date.parse(curr.created_at)) {
                    prev[$.deepValue(curr, instance.subject.key)].last.action = curr.created_at;
                    prev[$.deepValue(curr, instance.subject.key)].sum.action += 1;
                }
                prev[$.deepValue(curr, instance.subject.key)].profile.action =
                    prev[$.deepValue(curr, instance.subject.key)].profile.action.concat({ created_at: curr.created_at });
            }
        }
        return prev;
    },{});

    let interval = helper.timeSlices.get("1h");
    Object.entries(data).forEach(dataset => {
        data[dataset[0]].profile.online = helper.datetime.histogram(dataset[1].profile.online, domain, ...interval);
        data[dataset[0]].profile.action = helper.datetime.histogram(dataset[1].profile.action, domain, ...interval);
        data[dataset[0]].last.online = data[dataset[0]].last.online !== 0 ? data[dataset[0]].last.online.replace("T", " ").split("+")[0] : "---";
        data[dataset[0]].last.action = data[dataset[0]].last.action !== 0 ? data[dataset[0]].last.action.replace("T", " ").split("+")[0] : "---";
    });

    return { aggregated: data, domain: domain, x: d3.scaleTime().domain(domain) };
};