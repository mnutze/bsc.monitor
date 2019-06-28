importScripts("https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js");
importScripts("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js");
importScripts("https://mnutze.github.io/bsc.monitor/assets/cmMonitorHelper.js");

self.addEventListener("message", function (event) {

    let course = event.data.course;
    let data = event.data.data;
    let subject = event.data.subject;
    let highcharts = {
        "chart.type": "networkgraph",
        "title.text": "",
        "subtitle.text": "",
        "plotOptions": {
            "networkgraph": {
                "keys": [ "from", "to" ],
                "layoutAlgorithm": {
                    "enableSimulation": true,
                    "friction": -0.9,
                    "linkLength": 30
                }
            }
        },
        "series": [{
            turboThreshold: 1000,
            marker: {
                radius: 10
            },
            "dataLabels.enabled": true,
            "dataLabels.linkFormat": "",
            "data": []
        }]
    };
    // assign log data
    data = data.communication_log;

    if (!data || data.length < 1)
        return;

    if (subject && subject.values && subject.values.length > 0) {
        let subjects = data.filter(dataset => jsonLogic.apply({
            "or": subject.values.map(value =>({ "===" : [ { "var" : subject.key }, value ] }))
        },dataset));
        let chats = subjects.reduce((prev, curr) => {
            if (!prev[curr.parent.id])
                prev[curr.parent.id] = true;
            return prev;
        }, {});
        data = data.filter(dataset => jsonLogic.apply({
            "or": Object.keys(chats).map(value =>({ "===" : [ { "var" : "parent.id" }, value ] }))
        }, dataset));
    }

    let nodes = {};
    let statistics = data.filter(d => d.parent.id && d.user.user).reduce((prev, curr) => {
        if (!nodes[curr.user.user])
            nodes[curr.user.user] = { id: course.humanReadable.learners[curr.user.user], group: course.learners[curr.user.user] };
        if (!prev[curr.parent.id])
            prev[curr.parent.id] = { posts: 1, members:{ [curr.user.user]: 1 }};
        else if (!prev[curr.parent.id].members[curr.user.user]) {
            prev[curr.parent.id].members[curr.user.user] = 1;
            prev[curr.parent.id].posts += 1;
        }
        else {
            prev[curr.parent.id].members[curr.user.user] += 1;
            prev[curr.parent.id].posts += 1;
        }
        return prev;
    },{});

    let fromTo = []
    let links = []
    Object.keys(statistics)
        .map(chat => Object.keys(statistics[chat].members).map(member =>
            Object.keys(statistics[chat].members)
                .filter(_member => _member !== member)
                .forEach(_member =>  {
                    if (fromTo.indexOf(course.humanReadable.learners[member] + "," + course.humanReadable.learners[_member]) < 0
                        && fromTo.indexOf(course.humanReadable.learners[_member] + "," + course.humanReadable.learners[member]) < 0) {
                        links.push({
                            link: course.humanReadable.learners[_member] + "," + course.humanReadable.learners[member],
                            chat: chat
                        });
                        fromTo.push(course.humanReadable.learners[_member] + "," + course.humanReadable.learners[member]);
                    }
                } )));

    let seriesData = []
    let network = links.reduce((prev, curr) => {
        seriesData.push({from: curr.link.split(",")[0], to: curr.link.split(",")[1]})
        prev.links.push({source: curr.link.split(",")[0], target: curr.link.split(",")[1], chat: curr.chat, value: 1});
        return prev;
    }, { links: [], nodes: Object.values(nodes)});

    highcharts.series[0].data = seriesData;
    self.postMessage(network);
}, false);
