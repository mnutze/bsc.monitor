ccm.files["monitor.latest.js"] = function (data, instance) {

    let helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

    // filter data older than "value" minutes
    data = helper.datetime.gt(data, instance.range.value);

    // filter data against rules
    data = helper.filterData(data, instance.filter);

    // reverse data, so get newest data first
    data = data.reverse();

    return { aggregated: data };
};