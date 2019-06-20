ccm.files["monitor.latest.js"] = function (data, instance) {

    let helper = instance.helper;

    // assign log data
    data = data.log;

    if (data.length < 1)
        return;

    if (Object.keys(instance.filter).length === 0 )
        instance.filter = { and: [ {} ] };

    let subjectFilter;
    if (instance.subject && instance.subject.values.length > 0)
        subjectFilter = instance.subject.values.map(subject => ({ "===" : [ { var : instance.subject.key }, subject ] }) );

    if (subjectFilter)
        subjectFilter.forEach(filter => {
            if (!instance.filter.and.includes(filter))
                instance.filter.and.push(filter);
        });

    // filter data older than "value" minutes
    data = helper.datetime.gt(data, instance.range.value);

    // filter data against rules
    data = helper.filterData(data, instance.filter);

    // reverse data, so get newest data first
    data = data.reverse();

    return { aggregated: data };
};