importScripts("https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js");
importScripts("https://mnutze.github.io/bsc.monitoring-courses/libs/js/logic.js");
importScripts("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js");
importScripts("https://mnutze.github.io/bsc.monitor/assets/cmMonitorHelper.js");

self.addEventListener("message", function (event) {

    let data = event.data.data;
    // assign log data
    data = data.log;

    if (!data || data.length < 1)
        return;

    let statistics = log.reduce((prev, curr) => {
        if (!prev[curr.user.user])
            prev[curr.user.user] = { posts: 1, session: { [curr.session]: 1 }};
        else if (!prev[curr.user.user].session[curr.session]) {
            prev[curr.user.user].session[curr.session] = 1;
            prev[curr.user.user].posts += 1;
        }
        else {
            prev[curr.user.user].session[curr.session] += 1;
            prev[curr.user.user].posts += 1;
        }
        return prev;
    },{});

    self.postMessage();
}, false);
