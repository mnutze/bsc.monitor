ccm.files["widget.course_statistics.js"] = function (data, instance) {

    let $ = instance.ccm.helper,
        helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

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

    /*
    data.forEach(dataset => {
        if (!Learners.list.includes(dataset.user.user))
            Learners.list.push(dataset.user.user);

        if (!Teams.list.includes(dataset.team))
            Teams.list.push(dataset.team);
    });
    */

    return { aggregated: Learners };
};