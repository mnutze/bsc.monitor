ccm.files["widget.team_members.js"] = function (data, instance) {
    return "<div class='cm-team-members'>" +
        Object.keys(instance.teams.teams[instance.subject.values[0]].members)
        .reduce((prev, curr) => prev + "<p class='small' stlye='font-size: 80%'><a>" + curr + "</a></p>", "")
        + "</div>";
};