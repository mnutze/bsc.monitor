ccm.files[ 'configs.js' ] = {

    kanban: {
        process: [ "ccm.load", { url: "./assets/monitor.kanban.js", type: "js" } ],
        render: { key: "highcharts" },
        stores: {
            log: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_kanban_log" } ],
                key: {},
                onchangeFilter: {}
            }, // level-3 store
            kanban_board: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_kanban" } ],
                key: {},
                onchangeFilter: {}
            },
            kanban_cards: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_cscl" } ],
                key: {},
                onchangeFilter: {}
            }
        },
    },
    
    communication: {
        render: { key: "none" },
        stores: {
            log: {
                store: [ "ccm.store", { name: "log" } ],
                key: {},
                onchangeFilter: {}
            }
        },
        worker: "./assets/worker.communication_analysis.js"
    },

    courseActivities: {
        process: [ "ccm.load", { url: "./assets/monitor.leader.js", type: "js" } ],
        // initial configuration
        groupBy: {
            key: "event",
            groupBy: {key: "parent.descr,parent.id"},
        },
        limit: 20,
        render: { key: "highcharts", graph: "pie", highcharts: { "tooltip.shared": false ,"legend.enabled": false } },
        subject: {},
        // runtime configuration
        range: { enabled: true, range: null },
        stores: {
            log: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_activity_log" } ],
                key: {
                    $or: [
                        { $and: [ { "parent.name": "youtube" }, { event:  "onStateChange" } ] },
                        { $and: [ { "parent.name": "quiz" }, { event:  "finish" } ] },
                        { $and: [ { "parent.name": "live_poll" }, { event:  "finish" } ] },
                        { $and: [ { "parent.name": "feedback" }, { event:  "create" } ] },
                        { $and: [ { "parent.name": "comment" }, { event:  "create" } ] },
                        { $and: [ { "parent.name": "submit" }, { event:  "submit" } ] },
                        { $and: [ { "parent.name": "cloze" }, { event:  "finish" } ] },
                        //{ $and: [ { "parent.name": "regex" }, { event:  "regex" } ] },
                        { $and: [ { "parent.name": "regex" }, { event:  "plus" } ] },
                        { $and: [ { "parent.name": "regex" }, { event:  "eval" } ] },
                        { $and: [ { "parent.name": "quick_decide" }, { event:  "click" } ] },
                        { $and: [ { "parent.name": "quick_decide" }, { event:  "finish" } ] },
                        { $and: [ { "parent.name": "fast_poll" }, { event:  "click" } ] },
                        { $and: [ { "parent.name": "fast_poll" }, { event:  "finish" } ] },
                        { $and: [ { "parent.name": "pdf_viewer" }, { event:  "goto" } ] },
                        { $and: [ { "parent.name": "pdf_viewer" }, { event:  "next" } ] },
                        { $and: [ { "parent.name": "pdf_viewer" }, { event:  "prev" } ] },
                        { $and: [ { "parent.name": "kanban_board" }, { event:  "add" } ] },
                        { $and: [ { "parent.name": "kanban_board" }, { event:  "drop" } ] },
                        { $and: [ { "parent.name": "kanban_board" }, { event:  "del" } ] },
                        { $and: [ { "parent.name": "kanban_card" }, { event:  "change" } ] },
                    ]
                },
                onchangeFilter: {
                    and: [
                        { has: [ "user" ] },
                        { or: [
                            { and: [ { "===" : [ { var : "parent.name" }, "youtube" ] }, { "===" : [ { var : "event" }, "onStateChange" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "quiz" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "live_poll" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "feedback" ] }, { "===" : [ { var : "event" }, "create" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "comment" ] }, { "===" : [ { var : "event" }, "create" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "submit" ] }, { "===" : [ { var : "event" }, "submit" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "cloze" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                            //{ and: [ { "===" : [ { var : "parent.name" }, "regex" ] }, { "===" : [ { var : "event" }, "regex" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "regex" ] }, { "===" : [ { var : "event" }, "plus" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "regex" ] }, { "===" : [ { var : "event" }, "eval" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "quick_decide" ] }, { "===" : [ { var : "event" }, "click" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "quick_decide" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "fast_poll" ] }, { "===" : [ { var : "event" }, "click" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "fast_poll" ] }, { "===" : [ { var : "event" }, "finish" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "pdf_viewer" ] }, { "===" : [ { var : "event" }, "goto" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "pdf_viewer" ] }, { "===" : [ { var : "event" }, "next" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "pdf_viewer" ] }, { "===" : [ { var : "event" }, "prev" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "kanban_board" ] }, { "===" : [ { var : "event" }, "add" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "kanban_board" ] }, { "===" : [ { var : "event" }, "drop" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "kanban_board" ] }, { "===" : [ { var : "event" }, "del" ] } ] },
                            { and: [ { "===" : [ { var : "parent.name" }, "kanban_card" ] }, { "===" : [ { var : "event" }, "change" ] } ] },
                        ] }
                    ]
                }
            }
        }
    },
    
    getle10a6: {
        process: [ "ccm.load", { url: "./assets/monitor.kanban.js", type: "js" } ],
        render: { key: "highcharts" },
        stores: {
            log: {
                store: [ "ccm.store", { url: "https://ccm2.inf.h-brs.de", name: "mnutze2s_activity_log" } ],
                key: { "parent.descr": "le10_a6" },
                onchangeFilter: {}
            }, // level-3 store
            kanban_board: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_kanban" } ],
                key: {},
                onchangeFilter: {}
            },
            kanban_cards: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_cscl" } ],
                key: {},
                onchangeFilter: {}
            }
        },
    },

    local: {
        css: [ "ccm.load", [
            { "url": "../../libs/css/delos.css" },
            { "url": "../../libs/css/delos_cont.css" },
            { "url": "../../libs/css/fonts.css" },
            { "url": "resources/default.css" }
        ] ]
    },

    "course-monitoring": {
        css: [ "ccm.load", [
            { url: "../libs/css/delos.css" },
            { url: "../libs/css/delos_cont.css" },
            { url: "../libs/css/fonts.css" },
            { url: "../components/monitor/resources/default.css" }
        ] ],
        "html.table": [ "ccm.load", { url: "../components/monitor/templates/table.js" } ],
        "html.students_panel": [ "ccm.load", { url: "../components/monitor/templates/students.panel.js" } ],
        "html.templates": [ "ccm.load", { url: "../components/monitor/resources/templates.js" } ],
    }
};

let cards = [
    {
        "updated_at": "2019-05-06T20:33:11+02:00",
        "created_at": "2019-05-06T20:25:52+02:00",
        "title": "Abendbrot",
        "deadline": "2019-05-06",
        "owner": "Michael",
        "summary": "zu Abend essen",
        "priority": "D",
        "key": "1557167144327X12740973350880025"
    },
    {
        "title": "Frühstück",
        "updated_at": "2019-05-06T22:30:42+02:00",
        "created_at": "2019-05-06T20:33:17+02:00",
        "priority": "A",
        "deadline": "2019-05-07",
        "summary": "Spiegelei?",
        "key": "1557167592875X10427945647250025"
    },
    {
        "owner": "Michael",
        "updated_at": "2019-05-10T16:02:33+02:00",
        "created_at": "2019-05-06T21:52:25+02:00",
        "title": "Buch abgeben",
        "summary": "Leihfrist-Ende am 10.05. CSCL-Kompendium",
        "deadline": "2019-05-10",
        "priority": "A",
        "key": "1557167966867X6866974216038793"
    },
    {
        "title": "Backen",
        "updated_at": "2019-05-10T16:39:04+02:00",
        "created_at": "2019-05-10T16:38:47+02:00",
        "owner": "Anna",
        "deadline": "2019-05-11",
        "priority": "C",
        "summary": "Irgendwas backen",
        "key": "1557499125153X9987571247168916"
    },
    {
        "title": "Einkaufen",
        "updated_at": "2019-05-10T16:39:44+02:00",
        "created_at": "2019-05-10T16:39:18+02:00",
        "priority": "B",
        "summary": "Wocheneinkauf für nächste Woche",
        "deadline": "2019-05-11",
        "owner": "Michael",
        "key": "1557499154681X12720452275474292"
    },
    {
        "title": "Test",
        "content": "Feedback",
        "updated_at": "2019-05-20T22:53:54+02:00",
        "created_at": "2019-05-20T22:53:54+02:00",
        "key": "1558385634254X19155599826735314"
    },
    {
        "updated_at": "2019-06-16T20:46:16+02:00",
        "created_at": "2019-06-16T20:44:47+02:00",
        "summary": "Schuhe ausziehen, wenn die Wohnung betreten wird",
        "title": "Schuhe aus",
        "deadline": "2019-06-16",
        "priority": "Important",
        "key": "1560710665211X5065798191597526"
    },
    {
        "title": "Course Facts",
        "updated_at": "2019-06-16T23:54:53+02:00",
        "created_at": "2019-06-16T22:34:53+02:00",
        "summary": "Aggregate & Render",
        "owner": "Michael",
        "priority": "Important",
        "key": "1560710894215X6682586673182074"
    },
    {
        "updated_at": "2019-06-16T22:36:27+02:00",
        "created_at": "2019-06-16T22:35:50+02:00",
        "title": "Percentage by actions",
        "owner": "Michael",
        "summary": "Aggregate & Render",
        "deadline": "2019-06-17",
        "priority": "High",
        "key": "1560717329428X3724057012452493"
    },
    {
        "summary": "Fenster putzen",
        "updated_at": "2019-06-16T23:10:39+02:00",
        "created_at": "2019-06-16T23:10:28+02:00",
        "owner": "Lukas",
        "priority": "Normal",
        "key": "1560719399020X663393329269816"
    },
    {
        "summary": "Saugen",
        "updated_at": "2019-06-16T23:10:52+02:00",
        "created_at": "2019-06-16T23:10:45+02:00",
        "owner": "Anna",
        "priority": "Normal",
        "key": "1560719447100X9014415568012173"
    },
    {
        "title": "Saugen",
        "updated_at": "2019-06-16T23:11:22+02:00",
        "created_at": "2019-06-16T23:11:16+02:00",
        "owner": "Lukas",
        "priority": "Normal",
        "key": "1560719461587X9116817622639078"
    },
    {
        "title": "Fenster putzen",
        "updated_at": "2019-06-19T09:46:05+02:00",
        "created_at": "2019-06-16T23:11:26+02:00",
        "priority": "Normal",
        "owner": "Anna",
        "summary": "Küchenfenster",
        "key": "1560719489635X4784246881941433"
    },
    {
        "updated_at": "2019-06-19T09:48:43+02:00",
        "created_at": "2019-06-16T23:11:41+02:00",
        "title": "Müll runter bringen",
        "owner": "Christian",
        "priority": "Important",
        "summary": "Bio",
        "key": "1560719500930X11549415628734738"
    },
    {
        "title": "Kochen",
        "updated_at": "2019-06-16T23:12:15+02:00",
        "created_at": "2019-06-16T23:12:06+02:00",
        "owner": "Christian",
        "priority": "Low",
        "key": "1560719527835X8019041738202373"
    },
    {
        "updated_at": "2019-06-16T23:12:36+02:00",
        "created_at": "2019-06-16T23:12:25+02:00",
        "title": "Bad putzen",
        "owner": "Michael",
        "priority": "Normal",
        "key": "1560719542403X012335539302697374"
    },
    {
        "updated_at": "2019-06-17T00:29:16+02:00",
        "created_at": "2019-06-17T00:28:53+02:00",
        "title": "Exercise Points Heatmap",
        "owner": "Michael",
        "priority": "Important",
        "deadline": "2019-06-17",
        "key": "1560724129310X9285306943813278"
    },
    {
        "title": "Bachelor Arbeit schreiben",
        "updated_at": "2019-06-19T11:17:11+02:00",
        "created_at": "2019-06-17T17:01:45+02:00",
        "owner": "Michael",
        "priority": "Important",
        "deadline": "2019-06-20",
        "key": "1560783697445X8514161666754012"
    },
    {
        "title": "Korrektur lesen",
        "updated_at": "2019-06-17T17:02:34+02:00",
        "created_at": "2019-06-17T17:02:19+02:00",
        "owner": "Anna",
        "priority": "High",
        "key": "1560783736021X5605475201598122"
    },
    {
        "title": "Korrektur lesen 2",
        "updated_at": "2019-06-17T17:02:52+02:00",
        "created_at": "2019-06-17T17:02:39+02:00",
        "owner": "Christian",
        "priority": "High",
        "key": "1560783757293X44256528815032325"
    },
    {
        "updated_at": "2019-06-17T17:03:47+02:00",
        "created_at": "2019-06-17T17:03:30+02:00",
        "title": "Pizza backen",
        "owner": "Anna",
        "priority": "Normal",
        "key": "1560783779397X05832028075580853"
    },
    {
        "title": "Pizza essen",
        "updated_at": "2019-06-17T17:04:14+02:00",
        "created_at": "2019-06-17T17:04:01+02:00",
        "owner": "Michael",
        "priority": "Low",
        "key": "1560783838005X06405136288332591"
    },
    {
        "title": "Pizza essen 2",
        "updated_at": "2019-06-17T17:04:33+02:00",
        "created_at": "2019-06-17T17:04:22+02:00",
        "owner": "Christian",
        "priority": "High",
        "key": "1560783859677X7697201476992828"
    },
    {
        "title": "Protokolle lesen",
        "updated_at": "2019-06-17T17:04:59+02:00",
        "created_at": "2019-06-17T17:04:47+02:00",
        "priority": "High",
        "owner": "Anna",
        "key": "1560783885461X08160699550535266"
    },
    {
        "updated_at": "2019-06-17T17:05:22+02:00",
        "created_at": "2019-06-17T17:05:09+02:00",
        "title": "Absolventenliste erstellen",
        "owner": "Anna",
        "priority": "Normal",
        "key": "1560783901877X13755443845581028"
    },
    {
        "title": "Leistungsverzeichnis durchgehen",
        "updated_at": "2019-06-17T17:05:50+02:00",
        "created_at": "2019-06-17T17:05:33+02:00",
        "owner": "Anna",
        "priority": "Normal",
        "key": "1560783930621X5790298195033969"
    },
    {
        "title": "Folien Projektmanagement",
        "updated_at": "2019-06-17T17:06:22+02:00",
        "created_at": "2019-06-17T17:06:11+02:00",
        "owner": "Anna",
        "priority": "Low",
        "key": "1560783954877X11328108567273132"
    }
];
let board = [];