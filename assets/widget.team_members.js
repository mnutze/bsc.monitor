ccm.files["widget.team_members.js"] = function (data, instance) {
    /*
    onclick: function () {
        if (self.parent && self.parent.createBoardPanel)
            self.parent.createBoardPanel(dataset.key, self.subject, !!self.teams);
    }
     */
    return {
        class: "cm-team-members",
        inner: Object.keys(instance.course.teams[instance.subject.values[0]].members)
            .map(member => instance.course.humanReadable.learners[member] ?
                instance.course.humanReadable.learners[member] : member)
        .map(subject => ({
            tag: "p",
            class: "small",
            style: "font-size: 80%;",
            inner: {
                tag: "a",
                inner: subject,
            }
        }))
    };
};