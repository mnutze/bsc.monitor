importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js");

self.addEventListener("message", function (event) {

    let data = event.data.data;

    let solutions = data.solutions;
    let course = event.data.course;
    let lessons = course.lessons;
    let colors = event.data.colors;
    let subject = event.data.subject;
    let profile = event.data.profile;

    if (!lessons) {
        console.error("No Units available / defined");
        self.postMessage({});
        return;
    }

    if (!subject) {
        console.error("No Subject(Learner/Team) available / defined");
        self.postMessage({});
        return;
    }

    if (!solutions || (solutions && solutions.length < 1))
        return;

    let processed = { course: { learners: { } }, subject: { } };
    Object.keys(course.learners).forEach(learner => {
        solutions = solutions.reduce((prev, curr) => {
            if (curr.key[1] !== learner)
                prev.push(curr);
            else if (!processed.course.learners[learner])
                processed.course.learners[learner] = calculatePoints(curr);
            else
                processed.course.learners[learner] += calculatePoints(curr);
            return prev
        }, []);
    });

    subject.values.forEach(subj => {
        processed.subject[subj] = processed.course.learners[subj];
        delete processed.course.learners[subj];
    });
    processed.course = Object.values(processed.course.learners).reduce((p, c) => p + c, 0) / Object.keys(course.learners).length;

    function calculatePoints (solution) {
        let key = solution.key[0];
        let lesson = Object.values(lessons).filter(_lesson => key.startsWith(_lesson.prefix))[0];
        if (!lesson)
            return 0;
        let exercise = Object.entries(lesson.exercises).filter(_exercise => key.endsWith(_exercise[0]))[0];
        return !lesson.deadline || moment( lesson.deadline ).isAfter( solution.created_at ) ? exercise[1].points : 0;
    }

    let colorCount = 0;

    let chart = {
        "chart.marginTop": 0,
        "chart.type": "bar",
        "tooltip.enabled": true,
        "tooltip.valueDecimals": 0,
        "xAxis.categories": [
            ...Object.keys(processed.subject).map(subj => {
                if (subj === profile.user)
                    return "You";
                return course.humanReadable.learners[subj] ? course.humanReadable.learners[subj] : subj;
            }), "Course" ],
        "yAxis": {
            "title": { "text": ""},
            "min": 0,
            "max": 140,
            "endOnTick": false,
            "gridLineWidth": 0,
            "labels": {
              "enabled": false
            },
            "plotLines": [
                {
                    "value": 98,
                    "width": 1,
                    "color": "green",
                    "dashStyle": "LongDash",
                    "label": {
                        "rotation": 0,
                        "text": course.min + " Points needed<br>for exam admission",
                        "y": event.data.size ? (event.data.size.height - 50) / 2 : undefined,
                        "x": -10,
                        "align": "right"
                    }
                }
            ],
        },
        "plotOptions.bar.dataLabels.enabled": true,
        "credits.enabled": false,
        "series": [{
            "name": "Exercise Points",
            "data": [
                ...Object.entries(processed.subject).map(subj =>{
                    if (subj[0] === profile.user)
                        return {name: "Your Total", y: subj[1], color: colors[colorCount++]};
                    return {
                        name: course.humanReadable.learners[subj[0]] ?
                            (course.humanReadable.learners[subj[0]] + " Total") : (subj[0] + " Total"),
                        y: subj[1],
                        color: colors[colorCount++]
                    };
                }),
                {name: "Learners \u00D8", y: processed.course, dataLabels: { format: "{y:.2f}"}, color: colors[colorCount]}]
        }]
    };
    // send processed to main thread
    self.postMessage(chart);
}, false);