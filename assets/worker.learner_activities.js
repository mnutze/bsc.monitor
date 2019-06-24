importScripts("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");

self.addEventListener("message", function (event) {

    let data = event.data.data;

    let log = data.log;
    let subject = event.data.subject;
    let processing = event.data.processing;

    if (!log) {
        console.error("No Log available / defined");
        self.postMessage({});
        return;
    }

    if (!log || (log && log.length < 1))
        return;

    let subjects = subject.values.reduce((prev, curr) => {
        prev[curr] = true;
        return prev;
    }, {});
    let learners = {};

    let ohterActivities = { subjects: {}, learners: 0, distinct: {} };
    let exercise_submits = { subjects: {}, learners: 0, distinct: {} };
    log.reduce((prev, curr) => {
        if (!learners[curr.user.user])
            learners[curr.user.user] = true;
        if (jsonLogic.apply(processing.filter.exercise, curr)) {
            if (!exercise_submits.distinct[curr.user.user])
                exercise_submits.distinct[curr.user.user] = true;
            if (subjects[curr.user.user])
                exercise_submits.subjects[curr.user.user] = exercise_submits.subjects[curr.user.user] ? exercise_submits.subjects[curr.user.user] + 1 : 1;
            else
                exercise_submits.learners++;
        }
        else {
            prev.push(curr);
            if (!ohterActivities.distinct[curr.user.user])
                ohterActivities.distinct[curr.user.user] = true;
            if (subjects[curr.user.user])
                ohterActivities.subjects[curr.user.user] = ohterActivities.subjects[curr.user.user] ? ohterActivities.subjects[curr.user.user] + 1 : 1;
            else
                ohterActivities.learners++;
        }
        return prev;
    }, []);
    exercise_submits.distinct = Object.keys(exercise_submits.distinct).length;
    exercise_submits.learners = exercise_submits.distinct === 0 ? 0 : exercise_submits.learners / exercise_submits.distinct;

    ohterActivities.distinct = Object.keys(ohterActivities.distinct).length;
    ohterActivities.learners = ohterActivities.distinct === 0 ? 0 : ohterActivities.learners / ohterActivities.distinct;

    let chart = {
        "chart.marginTop": 0,
        "chart.type": "bar",
        "tooltip.enabled": true,
        "tooltip.valueDecimals": 0,
        "xAxis.categories": [ "Übungen<br>bearbeitet", "Sonstige<br>Aktivitäten" ],
        "yAxis": {
            "title": { "text": ""},
            "min": 0,
            "endOnTick": false,
            "gridLineWidth": 0,
            "labels": {
              "enabled": false
            }
        },
        "plotOptions.bar.dataLabels.enabled": true,
        "credits.enabled": false,
        "series": [...Object.keys(subjects).map(subj => ({
            "name": "Du",
            "data": [{name: "In Summe", y: exercise_submits.subjects[subj]}, {name: "In Summe", y: ohterActivities.subjects[subj]}]
        })),
        {
            "name": "Kurs",
            "data": [
                {name: "Im Durchschnitt", dataLabels: { format: "{y:.2f}"}, y: exercise_submits.learners},
                {name: "Im Durchschnitt", dataLabels: { format: "{y:.2f}"}, y: ohterActivities.learners}
            ]
        }]
    };
    // send processed to main thread
    self.postMessage(chart);
}, false);