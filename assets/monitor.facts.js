ccm.files["monitor.facts.js"] = function (data, instance) {

    let monitor = instance.monitor,
        $ = instance.ccm.helper,
        helper = instance.helper;

    let Learners = {
        list: [],
        lastWeek: []
    };

    let Teams = {
        list: [],
        lastWeek: []
    };

    let Actions = {};

    let Exercises = {};

    data.forEach(dataset => {
        if (!Learners.list.includes(dataset.user.user))
            Learners.list.push(dataset.user.user);

        if (!Teams.list.includes(dataset.team))
            Teams.list.push(dataset.team);
    });

    return { aggregated: data };
};