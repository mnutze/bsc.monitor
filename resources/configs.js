ccm.files[ 'configs.js' ] = {

    kanban: {
        process: [ "ccm.load", { url: "./assets/monitor.kanban.js", type: "js" } ],
        //render: { key: "highcharts" },
        "render": { "key": "highcharts", "mock": true },
        "subject": { "key": "team", "values": [] },
        "teams": true,
        "course": {
            "humanReadable": {
                "learners": {
                    "4c9d704dfcb512873c39ddeefdd559e1": "Tutor 2",
                    "4d12923863b12fc810b53fc4dea82054": "Learner 2",
                    "2de139986a5af991a44afa0a91028887": "Learner 3",
                    "2eea823b3008cb5881a6c474d3205f7d": "Learner 4",
                    "0d50f5cf866265bd884fa48d03c6bd5e": "Learner 5",
                    "04a9f70aaabed9ba9705f9ab69406501": "Learner 6",
                    "45319075db1b0ece8b40a33f509f37eb": "Learner 7",
                    "777554caf9604c2034824ffe6e9fe8dd": "Learner 8",
                    "d6eeca831e25256a90c287a6d00f56e0": "Learner 9",
                    "422434902623c2127b9a32f7a4bf9f31": "Learner 10",
                    "987c579793b3a2fdd5bf188429dc898d": "Learner 11",
                    "802f896b7fe7e2aedfc4f7a1108fa6dc": "Learner 12",
                    "d096deaa9f00f108742224008114decd": "Learner 13",
                    "bca2e71b6470256df6d1948095552099": "Learner 14",
                    "78dcd4d52b0e83478bfe4970a551d6cf": "Learner 15",
                    "a1bd2b05f433d350837ae894998792f6": "Learner 16",
                    "47a12248100db42590fcb63dcad0524a": "Learner 17",
                    "5bcfa198657323973f023393666a7210": "Learner 18",
                    "a0e207eacd170a9b191eaf6ea05712ff": "Learner 19",
                    "d8d3483265c8b8fd223395b96c94267b": "Learner 20",
                    "086a4ad01ad218ad09b0aba128e6c41e": "Learner 21",
                    "25af48542dbd8df884b19c399acc6388": "Learner 22",
                    "25a696ff52063de0f39e89a76b625a3a": "Learner 23",
                    "4269ae6b881d90a70167514788f67516": "Learner 24",
                    "a3803cee4994362dec85c901853b35ef": "Learner 25",
                    "e740bfe38fdfc3e5df8ed488e681657e": "Learner 26",
                    "f71c540882f4c20cad6158717cf79804": "Learner 27",
                    "53759bb368217e202edec5d8f4dd5441": "Learner 28",
                    "5831f3cbfb9a973d20b3a469fd7c92c7": "Learner 29",
                    "c0b2164532b99ada53c92b017c3b1209": "Learner 30",
                    "308cecce8e2115c780e374f13ecb4547": "Developer",
                    "979cf615a2e908342ddb1f974b2c6cba": "Learner 32",
                    "43b22f468cbf48c03b423af131cd5085": "Learner 33",
                    "04f81d62ff3ffa1b109491d728649446": "Learner 34",
                    "f9638806fc692bb031b9db223a57656f": "Learner 35",
                    "2f68ee4e9a8fe44575043b5f90b938d6": "Learner 36",
                    "93c10bfa4eacf3e51fff00aa312b0bd4": "Learner 37",
                    "a2debab41128d3a6661f724456c61415": "Learner 38",
                    "3aa1213ffa711e003fb02cc9e4e096be": "Learner 39",
                    "2f3823cbbca04a04df841ae11ba7eaed": "Learner 40",
                    "5b0e97237b34dd4b7dd7ebe7cd4ecc13": "Learner 41",
                    "8565d5dce906bdadae2ce167d21d7dc3": "Learner 42",
                    "c60aa982952059ff3b0910f6298bf1e1": "Learner 43",
                    "7addca9f03e1545f384455d2132ad634": "Learner 44",
                    "b3d676b1f5e58d7f433380b41372476e": "Learner 45",
                    "a4619d471ed474ef52e849729bc2da88": "Learner 46",
                    "dec12aef844ef4e0f2f1ad8aa8496f8b": "Learner 47",
                    "2dd4d4c1064041e88225b2501a13fe85": "Learner 48",
                    "57d9e42e5dbf71afcf8da4796a860a9f": "Learner 49",
                    "5834c87710509cf864f01d1236393cf8": "Learner 50",
                    "500f8515b397b98cddcbb2faf9c078c0": "Learner 51",
                    "c0edd93012c5b22fa91a910f1fd3db4f": "Learner 52",
                    "1d2eacef77d49b067c7d35db31884891": "Learner 53",
                    "e5c83b56d5e17b8b5c93a5e0bf137004": "Learner 54",
                    "cf4bbde1a048d219b09314752de841b2": "Learner 55",
                    "01bf4e899b9984be5bbc450d8641c5e8": "Learner 56",
                    "cd186730d33d441e0590333506f99c46": "Learner 57",
                    "b67616e5692fafb7ad217326f11f0f13": "Learner 58",
                    "13e7a35974271699057d7a650bff00fb": "Learner 59",
                    "4429a9b184ce1c33408d666f04ab81d5": "Learner 60",
                    "ebb8297d2a304b399e179bd8a46b95f2": "Learner 61",
                    "155dd10f8b5b96ecf5fc1a89bebe7c51": "Learner 62",
                    "cfdb70f66e87408a03a249880832d611": "Learner 63",
                    "990e01e83a973ac3813a5f0e1170a20c": "Learner 64",
                    "bfaf8dc19c7ead80f3053c48d5c0fd75": "Learner 65",
                    "89e484c339d9b87278604c7d3f153dbf": "Learner 66",
                    "35721bbe451c959394bb5cf5f74a9fd5": "Learner 67",
                    "4c8a50496028f38bac17b9ce4c91ebfe": "Learner 68",
                    "657df3b1e66814c011ce752d408fee3f": "Learner 69",
                    "6011e478133a14c8405ad489239cc276": "Learner 70",
                    "f0603e5e1662c457d578a2537451ef42": "Learner 71",
                    "cd7fb2e60e6adb66e957c6d40a493bad": "Learner 72",
                    "a91108650324b43435d398ac85a9d546": "Learner 73",
                    "77e7a0a01dc7918e310c1ceebcddb3f3": "Learner 74",
                    "efbb7ae532427496680b381f49001973": "Learner 75",
                    "af0ce8f5ac59375e6b73db04b851e4a5": "Learner 76",
                    "111fe409f6a5ba87945890f19f112734": "Learner 77",
                    "66901f9163854cd8cb1b5cfa0c888dd7": "Learner 78",
                    "11d45c318518290786ac275367765bf5": "Learner 79",
                    "965f37bfc4ca7abbe503ef2b596ffd59": "Learner 80",
                    "88b918bad7aba34250d2e11c04f5783c": "Learner 81",
                    "0faf7eef46d5dd580d652302a56c2a14": "Learner 82",
                    "02489beae701519ea3b07f5b2ff304ab": "Learner 83",
                    "e9afe846dd43a9d9f586b14d40e71a5d": "Learner 84",
                    "78aaee2f7614bf5a9c946dda656a1308": "Learner 85",
                    "c38dddbc3f9b5deb04be190094770214": "Learner 86",
                    "3c6d74f139d3d7a00c1292133e71a626": "Learner 87",
                    "4dc0e6207f5a662c3f475431225c0c8d": "Learner 88",
                    "de2ec5a6573783f327ecd7555773f850": "Learner 89",
                    "479e5f8396cec7afccd68b097eabe5f9": "Tutor 1",
                    "49bee8a7f0d1c2218f26158901b9a805": "Learner 91",
                    "aa16d31fd6c2383b3c46609539a717f3": "Learner 92",
                    "cb588768cef4bd8502059efc41191cf0": "Learner 93",
                    "6e3b1aa2656c7d9d83faa02d4ccda333": "Learner 94",
                    "410292fe71579a663840e4302733153c": "Learner 95",
                    "828c467087ba84716a8b8ac2f4864c77": "Learner 96",
                    "6a8926262555ae92b182950b05d0fb4a": "Learner 97",
                    "dcdfc585be98cff802f20190dd1a2708": "Learner 98",
                    "2b9fb3c50aacb81a96ecb6823f3ae8c4": "Learner 99",
                    "dd75345503eeb7b0e98b9a3bc9597908": "Learner 100",
                    "c27e09b380151b0ac12fa7f2f23457f0": "Learner 101",
                    "54799039855a68c10c7e82588f2eace1": "Learner 102",
                    "8f2b56948ef996dc3877570be215dda8": "Learner 103",
                    "e026700cc402c12eee641fa53746db25": "Learner 104",
                    "d2014435b8e7ba4522c1339adaf13be9": "Learner 105",
                    "3d0bde0c72570fd75cba91f924588b87": "Learner 106",
                    "d467abc3511d66ed7bc1f994feb3f3a5": "Learner 107",
                    "08ea34e38dfda8f618d65f759b9f941b": "Learner 108",
                    "464723446faa8f3937e08d37e0fae144": "Learner 109",
                    "1c5f41d2d0e4f288e70cd369b3f63973": "Learner 110",
                    "a4406dbb328e69dc5ce63284e53d8b04": "Learner 111",
                    "fa5efdfb1eb8c390069db180473b07e1": "Learner 112",
                    "c11fb3b2c5b20a5c751eebc1076d5381": "Learner 113",
                    "ebc7291ea6ebd0e15faa9daf6e4ad77b": "Learner 114",
                    "c8e3bdc44b97cb243c2256161e56a637": "Learner 115",
                    "efe607b49bc8da1e1a6a02f43392a578": "Learner 116",
                    "92da3d194e9256df96dbfdd2754e4319": "Learner 117",
                    "1dee8a873af03ccd878b86b84c08c19b": "Learner 118",
                    "3396bc96d6713d6467506dd1129e3d71": "Learner 119",
                    "0f017521976eaed43bda9ce4fdb84ccf": "Learner 120",
                    "111bce1dd87448484bf41694d4afe091": "Learner 121",
                    "229ca1f8a131a9d50587e49881e245ad": "Learner 122",
                    "c5109a17b8e922551c5ca985efb56988": "Learner 123",
                    "d32476efd18e78c532cd40b8acf730f9": "Learner 124",
                    "83b663721092eca0f2f0e9f7de0ef7bc": "Learner 125",
                    "bdfecc850dd8ca40e991c1e2b36d925e": "Learner 126",
                    "69ae89a7979fefb2559961c6b6412001": "Learner 127",
                    "2286731fd915bc2bef4da6dd95d40559": "Learner 128",
                    "e8980aad8ab419427066f59ee65fa9db": "Learner 129",
                    "ee44321f54504853310f577ca588e26e": "Learner 130",
                    "67e1ee3411707ed7aac65279c18a02dc": "Learner 131",
                    "3e02cff43791f7f10d23c17cf4a07f92": "Learner 132",
                    "280aaf712d6fe49f0a6a8a549b8f4ef3": "Learner 133",
                    "0659d67f63b520ab5c0579321d9bf5db": "Learner 134",
                    "1b0f991d732ac09717a153b88c483b7f": "Learner 135",
                    "4e1477a15dbcc710a465be4eca8c2b9c": "Learner 136",
                    "b962dd6cf649b083b35bce7e8cdf2fa9": "Learner 137",
                    "32b6567af83c63370a5bc7ce605e654a": "Learner 138",
                    "1b4136e236d7ad94d5f9cc1ba7ce5b52": "Learner 139",
                    "2e8fb4a00d5db128aa403acc1ea1c15c": "Learner 140",
                    "9bcebc82daf5cb18871e5ad1c0ccbfee": "Learner 141",
                    "9c8edcfa5fcd615e904bbb2e6c9dc372": "Learner 142",
                    "e48a1b75cf06d61103999c3ea9e230d1": "Learner 143",
                    "8f54cbab04ae2a7eec874a3ee8df2b77": "Learner 144",
                    "021729a61b3d3d389e6fdb2ec3977212": "Learner 145",
                    "e59183e167e77b7bf5bbd2ebc5fc74d1": "Learner 146",
                    "6129f374604ba0305a790a16eb7ef381": "Learner 147",
                    "b5898066398898c2f2df03b95dc90309": "Learner 148",
                    "3120ab2616add31404449110ebbcfc2b": "Learner 149",
                    "8008410d9665c301916ff51ebc10e7b8": "Learner 150",
                    "d49ca48d76a2fbc8b465781e9059eadb": "Learner 151",
                    "54b72270c5fd146e8d69bed1b889b1a3": "Learner 152",
                    "725647a28e8f0da31f1f1230649cdcd9": "Learner 153",
                    "23a25fc16722bf7adce3e87dd55a1379": "Learner 154",
                    "6d84a436420a8e0b5b21c496e091d506": "Learner 155",
                    "2d0bdf54a38eeeb606c8a1d8f51c9c37": "Learner 156",
                    "32e96d29ff4f020d6a37d765453bd2b0": "Learner 157",
                    "229f4229f91c7452b183e6d536947d52": "Learner 158"
                }
            },
            "kanban": {
                "lanes": [
                    "Backlog",
                    "To-Do",
                    "Doing",
                    "Done"
                ]
            },
            "lessons": {
                "lesson01": {
                    "label": "Unit 1",
                    "prefix": "le01_",
                    "exercises": {
                        "a1": {
                            "points": 4
                        },
                        "a2": {
                            "points": 6
                        }
                    },
                    "start": "2019-04-04T08:00",
                    "deadline": "2019-04-11T08:00",
                    "content": {
                        "b5af3ce45d991a19751d993209e46128": true,
                        "le01_a1": true,
                        "le01_a2": true
                    }
                },
                "lesson02": {
                    "label": "Unit 2",
                    "prefix": "le02_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 8
                        }
                    },
                    "deadline": "2019-04-18T08:00",
                    "start": "2019-04-11T08:00",
                    "content": {
                        "le02_a1": true,
                        "le02_a2": true
                    }
                },
                "lesson03": {
                    "label": "Unit 3",
                    "prefix": "le03_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 8
                        }
                    },
                    "start": "2019-04-18T08:00",
                    "deadline": "2019-04-25T08:00",
                    "content": {
                        "le03_a1": true,
                        "le03_a2": true
                    }
                },
                "lesson04": {
                    "label": "Unit 4",
                    "prefix": "le04_",
                    "exercises": {
                        "a1": {
                            "points": 3
                        },
                        "a2": {
                            "points": 3
                        },
                        "a3": {
                            "points": 4
                        }
                    },
                    "start": "2019-04-25T08:00",
                    "deadline": "2019-05-02T08:00",
                    "content": {
                        "d88dd198ecacd236387c96047c55e7c1": true,
                        "76da67ac06516ba69a14d14378b85f20": true,
                        "60e91b5267570e24ab1ded74d2c1a6b8": true,
                        "le04_a1": true,
                        "le04_a2": true,
                        "le04_a3": true
                    }
                },
                "lesson05": {
                    "label": "Unit 5",
                    "prefix": "le05_",
                    "exercises": {
                        "a1": {
                            "points": 4
                        },
                        "a2": {
                            "points": 4
                        },
                        "a3": {
                            "points": 2
                        }
                    },
                    "start": "2019-05-02T08:00",
                    "deadline": "2019-05-09T08:00",
                    "content": {
                        "le05_a1": true,
                        "le05_a2": true,
                        "le05_a3": true,
                        "5e677196903d7182bb3fdf615c4a0f66": true,
                        "93db8482531e6ff2b62a9d8663d12db5": true
                    }
                },
                "lesson06": {
                    "label": "Unit 6",
                    "prefix": "le06_",
                    "exercises": {
                        "a1": {
                            "points": 1
                        },
                        "a2": {
                            "points": 1
                        },
                        "a3": {
                            "points": 1
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 1
                        },
                        "a6": {
                            "points": 1
                        },
                        "a7": {
                            "points": 1
                        },
                        "a8": {
                            "points": 2
                        }
                    },
                    "start": "2019-05-09T08:00",
                    "deadline": "2019-05-16T08:00",
                    "content": {
                        "le06_a1": true,
                        "le06_a2": true,
                        "le06_a3": true,
                        "le06_a4": true,
                        "le06_a5": true,
                        "le06_a6": true,
                        "le06_a7": true,
                        "le06_a8": true,
                        "11f289770825892e4eb3879d420d2f9f": true,
                        "a101099624aae498e6ca77ac698b36a3": true,
                        "1fc5fc8a3f6ce327ce305d68a1dfae83": true,
                        "17e78e48f5fe58c23893ba63acf3a52e": true
                    }
                },
                "lesson07": {
                    "label": "Unit 7",
                    "prefix": "le07_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 3
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 3
                        }
                    },
                    "start": "2019-05-16T08:00",
                    "deadline": "2019-05-23T08:00",
                    "content": {
                        "le07_a1": true,
                        "le07_a2": true,
                        "le07_a3": true,
                        "le07_a4": true,
                        "6f7b92a085d6f5b59b0d234ead6cff55": true,
                        "b12a0e6c49d08f80524dcf5342e8aa72": true
                    }
                },
                "lesson08": {
                    "label": "Unit 8",
                    "prefix": "le08_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 3
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 3
                        }
                    },
                    "start": "2019-05-23T08:00",
                    "deadline": "2019-06-06T08:00",
                    "content": {
                        "le08_a1": true,
                        "le08_a2": true,
                        "le08_a3": true,
                        "le08_a4": true,
                        "cf09a815eb5ee6fa6703911baf16f5c2": true
                    }
                },
                "lesson09": {
                    "label": "Unit 9",
                    "prefix": "le09_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 2
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 2
                        }
                    },
                    "start": "2019-06-06T08:00",
                    "deadline": "2019-06-13T08:00",
                    "content": {
                        "le09_a1": true,
                        "le09_a2": true,
                        "le09_a3": true,
                        "le09_a4": true,
                        "le09_a5": true,
                        "3250734e58bdede1c0972a05e70c0bbf": true
                    }
                },
                "lesson10": {
                    "label": "Unit 10",
                    "prefix": "le10_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 2
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 2
                        },
                        "a6": {
                            "points": 40
                        }
                    },
                    "start": "2019-06-13T08:00",
                    "deadline": "2019-06-27T08:00",
                    "content": {
                        "le10_a1": true,
                        "le10_a2": true,
                        "le10_a3": true,
                        "le10_a4": true,
                        "le10_a5": true,
                        "le10_a6": true,
                        "ffe66fdafe89e037e1f12d86a2d0f96a": true
                    }
                },
                "lesson11": {
                    "label": "Unit 11",
                    "prefix": "le11_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 2
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 2
                        }
                    },
                    "start": "2019-06-27T08:00",
                    "deadline": "2019-07-04T08:00",
                    "content": {
                        "le11_a1": true,
                        "le11_a2": true,
                        "le11_a3": true,
                        "le11_a4": true,
                        "le11_a5": true
                    }
                }
            },
            "learners": {},
            "min": 98,
            "max": 140,
            "role": {
                "tutor": {
                    "479e5f8396cec7afccd68b097eabe5f9": true,
                    "4c9d704dfcb512873c39ddeefdd559e1": true
                },
                "developer": {
                    "308cecce8e2115c780e374f13ecb4547": true
                }
            },
            "teamdata": [
                "1561594278025X6681404849795909"
            ]
        },
        stores: {
            kanban_log: {
                store: [ "ccm.store", { url: "wss://ccm2.inf.h-brs.de", name: "mnutze2s_mock_kanban_log" } ],
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
        "render": { "key": "forceDirected", "mock": true },
        "css.default": [ "ccm.load", [
            { "url": "./resources/monitor.css" },
            { "url": "./resources/cm-highcharts.css" }
        ] ],
        // runtime configuration
        "runtimeOptions": true,
        "course": {
            "humanReadable": {
                "learners": {
                    "4c9d704dfcb512873c39ddeefdd559e1": "Tutor 2",
                    "4d12923863b12fc810b53fc4dea82054": "Learner 2",
                    "2de139986a5af991a44afa0a91028887": "Learner 3",
                    "2eea823b3008cb5881a6c474d3205f7d": "Learner 4",
                    "0d50f5cf866265bd884fa48d03c6bd5e": "Learner 5",
                    "04a9f70aaabed9ba9705f9ab69406501": "Learner 6",
                    "45319075db1b0ece8b40a33f509f37eb": "Learner 7",
                    "777554caf9604c2034824ffe6e9fe8dd": "Learner 8",
                    "d6eeca831e25256a90c287a6d00f56e0": "Learner 9",
                    "422434902623c2127b9a32f7a4bf9f31": "Learner 10",
                    "987c579793b3a2fdd5bf188429dc898d": "Learner 11",
                    "802f896b7fe7e2aedfc4f7a1108fa6dc": "Learner 12",
                    "d096deaa9f00f108742224008114decd": "Learner 13",
                    "bca2e71b6470256df6d1948095552099": "Learner 14",
                    "78dcd4d52b0e83478bfe4970a551d6cf": "Learner 15",
                    "a1bd2b05f433d350837ae894998792f6": "Learner 16",
                    "47a12248100db42590fcb63dcad0524a": "Learner 17",
                    "5bcfa198657323973f023393666a7210": "Learner 18",
                    "a0e207eacd170a9b191eaf6ea05712ff": "Learner 19",
                    "d8d3483265c8b8fd223395b96c94267b": "Learner 20",
                    "086a4ad01ad218ad09b0aba128e6c41e": "Learner 21",
                    "25af48542dbd8df884b19c399acc6388": "Learner 22",
                    "25a696ff52063de0f39e89a76b625a3a": "Learner 23",
                    "4269ae6b881d90a70167514788f67516": "Learner 24",
                    "a3803cee4994362dec85c901853b35ef": "Learner 25",
                    "e740bfe38fdfc3e5df8ed488e681657e": "Learner 26",
                    "f71c540882f4c20cad6158717cf79804": "Learner 27",
                    "53759bb368217e202edec5d8f4dd5441": "Learner 28",
                    "5831f3cbfb9a973d20b3a469fd7c92c7": "Learner 29",
                    "c0b2164532b99ada53c92b017c3b1209": "Learner 30",
                    "308cecce8e2115c780e374f13ecb4547": "Developer",
                    "979cf615a2e908342ddb1f974b2c6cba": "Learner 32",
                    "43b22f468cbf48c03b423af131cd5085": "Learner 33",
                    "04f81d62ff3ffa1b109491d728649446": "Learner 34",
                    "f9638806fc692bb031b9db223a57656f": "Learner 35",
                    "2f68ee4e9a8fe44575043b5f90b938d6": "Learner 36",
                    "93c10bfa4eacf3e51fff00aa312b0bd4": "Learner 37",
                    "a2debab41128d3a6661f724456c61415": "Learner 38",
                    "3aa1213ffa711e003fb02cc9e4e096be": "Learner 39",
                    "2f3823cbbca04a04df841ae11ba7eaed": "Learner 40",
                    "5b0e97237b34dd4b7dd7ebe7cd4ecc13": "Learner 41",
                    "8565d5dce906bdadae2ce167d21d7dc3": "Learner 42",
                    "c60aa982952059ff3b0910f6298bf1e1": "Learner 43",
                    "7addca9f03e1545f384455d2132ad634": "Learner 44",
                    "b3d676b1f5e58d7f433380b41372476e": "Learner 45",
                    "a4619d471ed474ef52e849729bc2da88": "Learner 46",
                    "dec12aef844ef4e0f2f1ad8aa8496f8b": "Learner 47",
                    "2dd4d4c1064041e88225b2501a13fe85": "Learner 48",
                    "57d9e42e5dbf71afcf8da4796a860a9f": "Learner 49",
                    "5834c87710509cf864f01d1236393cf8": "Learner 50",
                    "500f8515b397b98cddcbb2faf9c078c0": "Learner 51",
                    "c0edd93012c5b22fa91a910f1fd3db4f": "Learner 52",
                    "1d2eacef77d49b067c7d35db31884891": "Learner 53",
                    "e5c83b56d5e17b8b5c93a5e0bf137004": "Learner 54",
                    "cf4bbde1a048d219b09314752de841b2": "Learner 55",
                    "01bf4e899b9984be5bbc450d8641c5e8": "Learner 56",
                    "cd186730d33d441e0590333506f99c46": "Learner 57",
                    "b67616e5692fafb7ad217326f11f0f13": "Learner 58",
                    "13e7a35974271699057d7a650bff00fb": "Learner 59",
                    "4429a9b184ce1c33408d666f04ab81d5": "Learner 60",
                    "ebb8297d2a304b399e179bd8a46b95f2": "Learner 61",
                    "155dd10f8b5b96ecf5fc1a89bebe7c51": "Learner 62",
                    "cfdb70f66e87408a03a249880832d611": "Learner 63",
                    "990e01e83a973ac3813a5f0e1170a20c": "Learner 64",
                    "bfaf8dc19c7ead80f3053c48d5c0fd75": "Learner 65",
                    "89e484c339d9b87278604c7d3f153dbf": "Learner 66",
                    "35721bbe451c959394bb5cf5f74a9fd5": "Learner 67",
                    "4c8a50496028f38bac17b9ce4c91ebfe": "Learner 68",
                    "657df3b1e66814c011ce752d408fee3f": "Learner 69",
                    "6011e478133a14c8405ad489239cc276": "Learner 70",
                    "f0603e5e1662c457d578a2537451ef42": "Learner 71",
                    "cd7fb2e60e6adb66e957c6d40a493bad": "Learner 72",
                    "a91108650324b43435d398ac85a9d546": "Learner 73",
                    "77e7a0a01dc7918e310c1ceebcddb3f3": "Learner 74",
                    "efbb7ae532427496680b381f49001973": "Learner 75",
                    "af0ce8f5ac59375e6b73db04b851e4a5": "Learner 76",
                    "111fe409f6a5ba87945890f19f112734": "Learner 77",
                    "66901f9163854cd8cb1b5cfa0c888dd7": "Learner 78",
                    "11d45c318518290786ac275367765bf5": "Learner 79",
                    "965f37bfc4ca7abbe503ef2b596ffd59": "Learner 80",
                    "88b918bad7aba34250d2e11c04f5783c": "Learner 81",
                    "0faf7eef46d5dd580d652302a56c2a14": "Learner 82",
                    "02489beae701519ea3b07f5b2ff304ab": "Learner 83",
                    "e9afe846dd43a9d9f586b14d40e71a5d": "Learner 84",
                    "78aaee2f7614bf5a9c946dda656a1308": "Learner 85",
                    "c38dddbc3f9b5deb04be190094770214": "Learner 86",
                    "3c6d74f139d3d7a00c1292133e71a626": "Learner 87",
                    "4dc0e6207f5a662c3f475431225c0c8d": "Learner 88",
                    "de2ec5a6573783f327ecd7555773f850": "Learner 89",
                    "479e5f8396cec7afccd68b097eabe5f9": "Tutor 1",
                    "49bee8a7f0d1c2218f26158901b9a805": "Learner 91",
                    "aa16d31fd6c2383b3c46609539a717f3": "Learner 92",
                    "cb588768cef4bd8502059efc41191cf0": "Learner 93",
                    "6e3b1aa2656c7d9d83faa02d4ccda333": "Learner 94",
                    "410292fe71579a663840e4302733153c": "Learner 95",
                    "828c467087ba84716a8b8ac2f4864c77": "Learner 96",
                    "6a8926262555ae92b182950b05d0fb4a": "Learner 97",
                    "dcdfc585be98cff802f20190dd1a2708": "Learner 98",
                    "2b9fb3c50aacb81a96ecb6823f3ae8c4": "Learner 99",
                    "dd75345503eeb7b0e98b9a3bc9597908": "Learner 100",
                    "c27e09b380151b0ac12fa7f2f23457f0": "Learner 101",
                    "54799039855a68c10c7e82588f2eace1": "Learner 102",
                    "8f2b56948ef996dc3877570be215dda8": "Learner 103",
                    "e026700cc402c12eee641fa53746db25": "Learner 104",
                    "d2014435b8e7ba4522c1339adaf13be9": "Learner 105",
                    "3d0bde0c72570fd75cba91f924588b87": "Learner 106",
                    "d467abc3511d66ed7bc1f994feb3f3a5": "Learner 107",
                    "08ea34e38dfda8f618d65f759b9f941b": "Learner 108",
                    "464723446faa8f3937e08d37e0fae144": "Learner 109",
                    "1c5f41d2d0e4f288e70cd369b3f63973": "Learner 110",
                    "a4406dbb328e69dc5ce63284e53d8b04": "Learner 111",
                    "fa5efdfb1eb8c390069db180473b07e1": "Learner 112",
                    "c11fb3b2c5b20a5c751eebc1076d5381": "Learner 113",
                    "ebc7291ea6ebd0e15faa9daf6e4ad77b": "Learner 114",
                    "c8e3bdc44b97cb243c2256161e56a637": "Learner 115",
                    "efe607b49bc8da1e1a6a02f43392a578": "Learner 116",
                    "92da3d194e9256df96dbfdd2754e4319": "Learner 117",
                    "1dee8a873af03ccd878b86b84c08c19b": "Learner 118",
                    "3396bc96d6713d6467506dd1129e3d71": "Learner 119",
                    "0f017521976eaed43bda9ce4fdb84ccf": "Learner 120",
                    "111bce1dd87448484bf41694d4afe091": "Learner 121",
                    "229ca1f8a131a9d50587e49881e245ad": "Learner 122",
                    "c5109a17b8e922551c5ca985efb56988": "Learner 123",
                    "d32476efd18e78c532cd40b8acf730f9": "Learner 124",
                    "83b663721092eca0f2f0e9f7de0ef7bc": "Learner 125",
                    "bdfecc850dd8ca40e991c1e2b36d925e": "Learner 126",
                    "69ae89a7979fefb2559961c6b6412001": "Learner 127",
                    "2286731fd915bc2bef4da6dd95d40559": "Learner 128",
                    "e8980aad8ab419427066f59ee65fa9db": "Learner 129",
                    "ee44321f54504853310f577ca588e26e": "Learner 130",
                    "67e1ee3411707ed7aac65279c18a02dc": "Learner 131",
                    "3e02cff43791f7f10d23c17cf4a07f92": "Learner 132",
                    "280aaf712d6fe49f0a6a8a549b8f4ef3": "Learner 133",
                    "0659d67f63b520ab5c0579321d9bf5db": "Learner 134",
                    "1b0f991d732ac09717a153b88c483b7f": "Learner 135",
                    "4e1477a15dbcc710a465be4eca8c2b9c": "Learner 136",
                    "b962dd6cf649b083b35bce7e8cdf2fa9": "Learner 137",
                    "32b6567af83c63370a5bc7ce605e654a": "Learner 138",
                    "1b4136e236d7ad94d5f9cc1ba7ce5b52": "Learner 139",
                    "2e8fb4a00d5db128aa403acc1ea1c15c": "Learner 140",
                    "9bcebc82daf5cb18871e5ad1c0ccbfee": "Learner 141",
                    "9c8edcfa5fcd615e904bbb2e6c9dc372": "Learner 142",
                    "e48a1b75cf06d61103999c3ea9e230d1": "Learner 143",
                    "8f54cbab04ae2a7eec874a3ee8df2b77": "Learner 144",
                    "021729a61b3d3d389e6fdb2ec3977212": "Learner 145",
                    "e59183e167e77b7bf5bbd2ebc5fc74d1": "Learner 146",
                    "6129f374604ba0305a790a16eb7ef381": "Learner 147",
                    "b5898066398898c2f2df03b95dc90309": "Learner 148",
                    "3120ab2616add31404449110ebbcfc2b": "Learner 149",
                    "8008410d9665c301916ff51ebc10e7b8": "Learner 150",
                    "d49ca48d76a2fbc8b465781e9059eadb": "Learner 151",
                    "54b72270c5fd146e8d69bed1b889b1a3": "Learner 152",
                    "725647a28e8f0da31f1f1230649cdcd9": "Learner 153",
                    "23a25fc16722bf7adce3e87dd55a1379": "Learner 154",
                    "6d84a436420a8e0b5b21c496e091d506": "Learner 155",
                    "2d0bdf54a38eeeb606c8a1d8f51c9c37": "Learner 156",
                    "32e96d29ff4f020d6a37d765453bd2b0": "Learner 157",
                    "229f4229f91c7452b183e6d536947d52": "Learner 158"
                }
            },
            "lessons": {
                "lesson01": {
                    "label": "Unit 1",
                    "prefix": "le01_",
                    "exercises": {
                        "a1": {
                            "points": 4
                        },
                        "a2": {
                            "points": 6
                        }
                    },
                    "start": "2019-04-04T08:00",
                    "deadline": "2019-04-11T08:00",
                    "content": {
                        "b5af3ce45d991a19751d993209e46128": true,
                        "le01_a1": true,
                        "le01_a2": true
                    }
                },
                "lesson02": {
                    "label": "Unit 2",
                    "prefix": "le02_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 8
                        }
                    },
                    "deadline": "2019-04-18T08:00",
                    "start": "2019-04-11T08:00",
                    "content": {
                        "le02_a1": true,
                        "le02_a2": true
                    }
                },
                "lesson03": {
                    "label": "Unit 3",
                    "prefix": "le03_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 8
                        }
                    },
                    "start": "2019-04-18T08:00",
                    "deadline": "2019-04-25T08:00",
                    "content": {
                        "le03_a1": true,
                        "le03_a2": true
                    }
                },
                "lesson04": {
                    "label": "Unit 4",
                    "prefix": "le04_",
                    "exercises": {
                        "a1": {
                            "points": 3
                        },
                        "a2": {
                            "points": 3
                        },
                        "a3": {
                            "points": 4
                        }
                    },
                    "start": "2019-04-25T08:00",
                    "deadline": "2019-05-02T08:00",
                    "content": {
                        "d88dd198ecacd236387c96047c55e7c1": true,
                        "76da67ac06516ba69a14d14378b85f20": true,
                        "60e91b5267570e24ab1ded74d2c1a6b8": true,
                        "le04_a1": true,
                        "le04_a2": true,
                        "le04_a3": true
                    }
                },
                "lesson05": {
                    "label": "Unit 5",
                    "prefix": "le05_",
                    "exercises": {
                        "a1": {
                            "points": 4
                        },
                        "a2": {
                            "points": 4
                        },
                        "a3": {
                            "points": 2
                        }
                    },
                    "start": "2019-05-02T08:00",
                    "deadline": "2019-05-09T08:00",
                    "content": {
                        "le05_a1": true,
                        "le05_a2": true,
                        "le05_a3": true,
                        "5e677196903d7182bb3fdf615c4a0f66": true,
                        "93db8482531e6ff2b62a9d8663d12db5": true
                    }
                },
                "lesson06": {
                    "label": "Unit 6",
                    "prefix": "le06_",
                    "exercises": {
                        "a1": {
                            "points": 1
                        },
                        "a2": {
                            "points": 1
                        },
                        "a3": {
                            "points": 1
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 1
                        },
                        "a6": {
                            "points": 1
                        },
                        "a7": {
                            "points": 1
                        },
                        "a8": {
                            "points": 2
                        }
                    },
                    "start": "2019-05-09T08:00",
                    "deadline": "2019-05-16T08:00",
                    "content": {
                        "le06_a1": true,
                        "le06_a2": true,
                        "le06_a3": true,
                        "le06_a4": true,
                        "le06_a5": true,
                        "le06_a6": true,
                        "le06_a7": true,
                        "le06_a8": true,
                        "11f289770825892e4eb3879d420d2f9f": true,
                        "a101099624aae498e6ca77ac698b36a3": true,
                        "1fc5fc8a3f6ce327ce305d68a1dfae83": true,
                        "17e78e48f5fe58c23893ba63acf3a52e": true
                    }
                },
                "lesson07": {
                    "label": "Unit 7",
                    "prefix": "le07_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 3
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 3
                        }
                    },
                    "start": "2019-05-16T08:00",
                    "deadline": "2019-05-23T08:00",
                    "content": {
                        "le07_a1": true,
                        "le07_a2": true,
                        "le07_a3": true,
                        "le07_a4": true,
                        "6f7b92a085d6f5b59b0d234ead6cff55": true,
                        "b12a0e6c49d08f80524dcf5342e8aa72": true
                    }
                },
                "lesson08": {
                    "label": "Unit 8",
                    "prefix": "le08_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 3
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 3
                        }
                    },
                    "start": "2019-05-23T08:00",
                    "deadline": "2019-06-06T08:00",
                    "content": {
                        "le08_a1": true,
                        "le08_a2": true,
                        "le08_a3": true,
                        "le08_a4": true,
                        "cf09a815eb5ee6fa6703911baf16f5c2": true
                    }
                },
                "lesson09": {
                    "label": "Unit 9",
                    "prefix": "le09_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 2
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 2
                        }
                    },
                    "start": "2019-06-06T08:00",
                    "deadline": "2019-06-13T08:00",
                    "content": {
                        "le09_a1": true,
                        "le09_a2": true,
                        "le09_a3": true,
                        "le09_a4": true,
                        "le09_a5": true,
                        "3250734e58bdede1c0972a05e70c0bbf": true
                    }
                },
                "lesson10": {
                    "label": "Unit 10",
                    "prefix": "le10_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 2
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 2
                        },
                        "a6": {
                            "points": 40
                        }
                    },
                    "start": "2019-06-13T08:00",
                    "deadline": "2019-06-27T08:00",
                    "content": {
                        "le10_a1": true,
                        "le10_a2": true,
                        "le10_a3": true,
                        "le10_a4": true,
                        "le10_a5": true,
                        "le10_a6": true,
                        "ffe66fdafe89e037e1f12d86a2d0f96a": true
                    }
                },
                "lesson11": {
                    "label": "Unit 11",
                    "prefix": "le11_",
                    "exercises": {
                        "a1": {
                            "points": 2
                        },
                        "a2": {
                            "points": 2
                        },
                        "a3": {
                            "points": 2
                        },
                        "a4": {
                            "points": 2
                        },
                        "a5": {
                            "points": 2
                        }
                    },
                    "start": "2019-06-27T08:00",
                    "deadline": "2019-07-04T08:00",
                    "content": {
                        "le11_a1": true,
                        "le11_a2": true,
                        "le11_a3": true,
                        "le11_a4": true,
                        "le11_a5": true
                    }
                }
            },
            "learners": {
                "4c9d704dfcb512873c39ddeefdd559e1": "mock_team_1561013135493X47421570680499947",
                "4d12923863b12fc810b53fc4dea82054": "mock_team_1561013135493X47421570680499947",
                "2de139986a5af991a44afa0a91028887": "mock_team_1561013135493X47421570680499947",
                "2eea823b3008cb5881a6c474d3205f7d": "mock_team_1561013135493X47421570680499947",
                "0d50f5cf866265bd884fa48d03c6bd5e": "mock_team_1561013135494X4339867686856125",
                "04a9f70aaabed9ba9705f9ab69406501": "mock_team_1561013135494X4339867686856125",
                "45319075db1b0ece8b40a33f509f37eb": "mock_team_1561013135494X4339867686856125",
                "777554caf9604c2034824ffe6e9fe8dd": "mock_team_1561013135494X4339867686856125",
                "d6eeca831e25256a90c287a6d00f56e0": "mock_team_1561013135494X17777648381385625",
                "422434902623c2127b9a32f7a4bf9f31": "mock_team_1561013135494X17777648381385625",
                "987c579793b3a2fdd5bf188429dc898d": "mock_team_1561013135494X17777648381385625",
                "802f896b7fe7e2aedfc4f7a1108fa6dc": "mock_team_1561013135494X17777648381385625",
                "d096deaa9f00f108742224008114decd": "mock_team_1561013135494X4840181141403157",
                "bca2e71b6470256df6d1948095552099": "mock_team_1561013135494X4840181141403157",
                "78dcd4d52b0e83478bfe4970a551d6cf": "mock_team_1561013135494X4840181141403157",
                "a1bd2b05f433d350837ae894998792f6": "mock_team_1561013135494X4840181141403157",
                "47a12248100db42590fcb63dcad0524a": "mock_team_1561013135494X4939980693686541",
                "5bcfa198657323973f023393666a7210": "mock_team_1561013135494X4939980693686541",
                "a0e207eacd170a9b191eaf6ea05712ff": "mock_team_1561013135494X4939980693686541",
                "d8d3483265c8b8fd223395b96c94267b": "mock_team_1561013135494X4939980693686541",
                "086a4ad01ad218ad09b0aba128e6c41e": "mock_team_1561013135494X3008458952427473",
                "25af48542dbd8df884b19c399acc6388": "mock_team_1561013135494X3008458952427473",
                "25a696ff52063de0f39e89a76b625a3a": "mock_team_1561013135494X3008458952427473",
                "4269ae6b881d90a70167514788f67516": "mock_team_1561013135494X3008458952427473",
                "a3803cee4994362dec85c901853b35ef": "mock_team_1561013135494X6264996021360096",
                "e740bfe38fdfc3e5df8ed488e681657e": "mock_team_1561013135494X6264996021360096",
                "f71c540882f4c20cad6158717cf79804": "mock_team_1561013135494X6264996021360096",
                "53759bb368217e202edec5d8f4dd5441": "mock_team_1561013135494X6264996021360096",
                "5831f3cbfb9a973d20b3a469fd7c92c7": "mock_team_1561013135494X622357302441314",
                "c0b2164532b99ada53c92b017c3b1209": "mock_team_1561013135494X622357302441314",
                "308cecce8e2115c780e374f13ecb4547": "mock_team_1561013135494X622357302441314",
                "979cf615a2e908342ddb1f974b2c6cba": "mock_team_1561013135494X622357302441314",
                "43b22f468cbf48c03b423af131cd5085": "mock_team_1561013135494X5929389786803025",
                "04f81d62ff3ffa1b109491d728649446": "mock_team_1561013135494X5929389786803025",
                "f9638806fc692bb031b9db223a57656f": "mock_team_1561013135494X5929389786803025",
                "2f68ee4e9a8fe44575043b5f90b938d6": "mock_team_1561013135494X5929389786803025",
                "93c10bfa4eacf3e51fff00aa312b0bd4": "mock_team_1561013135494X5521995452088562",
                "a2debab41128d3a6661f724456c61415": "mock_team_1561013135494X5521995452088562",
                "3aa1213ffa711e003fb02cc9e4e096be": "mock_team_1561013135494X5521995452088562",
                "2f3823cbbca04a04df841ae11ba7eaed": "mock_team_1561013135494X5521995452088562",
                "5b0e97237b34dd4b7dd7ebe7cd4ecc13": "mock_team_1561013135495X03874743892354404",
                "8565d5dce906bdadae2ce167d21d7dc3": "mock_team_1561013135495X03874743892354404",
                "c60aa982952059ff3b0910f6298bf1e1": "mock_team_1561013135495X03874743892354404",
                "7addca9f03e1545f384455d2132ad634": "mock_team_1561013135495X03874743892354404",
                "b3d676b1f5e58d7f433380b41372476e": "mock_team_1561013135495X8856621263788307",
                "a4619d471ed474ef52e849729bc2da88": "mock_team_1561013135495X8856621263788307",
                "dec12aef844ef4e0f2f1ad8aa8496f8b": "mock_team_1561013135495X8856621263788307",
                "2dd4d4c1064041e88225b2501a13fe85": "mock_team_1561013135495X8856621263788307",
                "57d9e42e5dbf71afcf8da4796a860a9f": "mock_team_1561013135495X35904308442661725",
                "5834c87710509cf864f01d1236393cf8": "mock_team_1561013135495X35904308442661725",
                "500f8515b397b98cddcbb2faf9c078c0": "mock_team_1561013135495X35904308442661725",
                "c0edd93012c5b22fa91a910f1fd3db4f": "mock_team_1561013135495X35904308442661725",
                "1d2eacef77d49b067c7d35db31884891": "mock_team_1561013135495X4372346209096969",
                "e5c83b56d5e17b8b5c93a5e0bf137004": "mock_team_1561013135495X4372346209096969",
                "cf4bbde1a048d219b09314752de841b2": "mock_team_1561013135495X4372346209096969",
                "01bf4e899b9984be5bbc450d8641c5e8": "mock_team_1561013135495X4372346209096969",
                "cd186730d33d441e0590333506f99c46": "mock_team_1561013135495X013140704180036655",
                "b67616e5692fafb7ad217326f11f0f13": "mock_team_1561013135495X013140704180036655",
                "13e7a35974271699057d7a650bff00fb": "mock_team_1561013135495X013140704180036655",
                "4429a9b184ce1c33408d666f04ab81d5": "mock_team_1561013135495X013140704180036655",
                "ebb8297d2a304b399e179bd8a46b95f2": "mock_team_1561013135495X9970271082396971",
                "155dd10f8b5b96ecf5fc1a89bebe7c51": "mock_team_1561013135495X9970271082396971",
                "cfdb70f66e87408a03a249880832d611": "mock_team_1561013135495X9970271082396971",
                "990e01e83a973ac3813a5f0e1170a20c": "mock_team_1561013135495X9970271082396971",
                "bfaf8dc19c7ead80f3053c48d5c0fd75": "mock_team_1561013135495X14112339553103181",
                "89e484c339d9b87278604c7d3f153dbf": "mock_team_1561013135495X14112339553103181",
                "35721bbe451c959394bb5cf5f74a9fd5": "mock_team_1561013135495X14112339553103181",
                "4c8a50496028f38bac17b9ce4c91ebfe": "mock_team_1561013135495X14112339553103181",
                "657df3b1e66814c011ce752d408fee3f": "mock_team_1561013135496X8818705356091767",
                "6011e478133a14c8405ad489239cc276": "mock_team_1561013135496X8818705356091767",
                "f0603e5e1662c457d578a2537451ef42": "mock_team_1561013135496X8818705356091767",
                "cd7fb2e60e6adb66e957c6d40a493bad": "mock_team_1561013135496X8818705356091767",
                "a91108650324b43435d398ac85a9d546": "mock_team_1561013135496X2968999789503364",
                "77e7a0a01dc7918e310c1ceebcddb3f3": "mock_team_1561013135496X2968999789503364",
                "efbb7ae532427496680b381f49001973": "mock_team_1561013135496X2968999789503364",
                "af0ce8f5ac59375e6b73db04b851e4a5": "mock_team_1561013135496X2968999789503364",
                "111fe409f6a5ba87945890f19f112734": "mock_team_1561013135496X49834296960186597",
                "66901f9163854cd8cb1b5cfa0c888dd7": "mock_team_1561013135496X49834296960186597",
                "11d45c318518290786ac275367765bf5": "mock_team_1561013135496X49834296960186597",
                "965f37bfc4ca7abbe503ef2b596ffd59": "mock_team_1561013135496X49834296960186597",
                "88b918bad7aba34250d2e11c04f5783c": "mock_team_1561013135496X8260853145776439",
                "0faf7eef46d5dd580d652302a56c2a14": "mock_team_1561013135496X8260853145776439",
                "02489beae701519ea3b07f5b2ff304ab": "mock_team_1561013135496X8260853145776439",
                "e9afe846dd43a9d9f586b14d40e71a5d": "mock_team_1561013135496X8260853145776439",
                "78aaee2f7614bf5a9c946dda656a1308": "mock_team_1561013135496X41216239585284353",
                "c38dddbc3f9b5deb04be190094770214": "mock_team_1561013135496X41216239585284353",
                "3c6d74f139d3d7a00c1292133e71a626": "mock_team_1561013135496X41216239585284353",
                "4dc0e6207f5a662c3f475431225c0c8d": "mock_team_1561013135496X41216239585284353",
                "de2ec5a6573783f327ecd7555773f850": "mock_team_1561013135497X5333942409887504",
                "479e5f8396cec7afccd68b097eabe5f9": "mock_team_1561013135497X5333942409887504",
                "49bee8a7f0d1c2218f26158901b9a805": "mock_team_1561013135497X5333942409887504",
                "aa16d31fd6c2383b3c46609539a717f3": "mock_team_1561013135497X5333942409887504",
                "cb588768cef4bd8502059efc41191cf0": "mock_team_1561013135497X1668991799059032",
                "6e3b1aa2656c7d9d83faa02d4ccda333": "mock_team_1561013135497X1668991799059032",
                "410292fe71579a663840e4302733153c": "mock_team_1561013135497X1668991799059032",
                "828c467087ba84716a8b8ac2f4864c77": "mock_team_1561013135497X1668991799059032",
                "6a8926262555ae92b182950b05d0fb4a": "mock_team_1561013135497X0878475551873914",
                "dcdfc585be98cff802f20190dd1a2708": "mock_team_1561013135497X0878475551873914",
                "2b9fb3c50aacb81a96ecb6823f3ae8c4": "mock_team_1561013135497X0878475551873914",
                "dd75345503eeb7b0e98b9a3bc9597908": "mock_team_1561013135497X0878475551873914",
                "c27e09b380151b0ac12fa7f2f23457f0": "mock_team_1561013135498X0498029219365248",
                "54799039855a68c10c7e82588f2eace1": "mock_team_1561013135498X0498029219365248",
                "8f2b56948ef996dc3877570be215dda8": "mock_team_1561013135498X0498029219365248",
                "e026700cc402c12eee641fa53746db25": "mock_team_1561013135498X0498029219365248",
                "d2014435b8e7ba4522c1339adaf13be9": "mock_team_1561013135498X9576082154654677",
                "3d0bde0c72570fd75cba91f924588b87": "mock_team_1561013135498X9576082154654677",
                "d467abc3511d66ed7bc1f994feb3f3a5": "mock_team_1561013135498X9576082154654677",
                "08ea34e38dfda8f618d65f759b9f941b": "mock_team_1561013135498X9576082154654677",
                "464723446faa8f3937e08d37e0fae144": "mock_team_1561013135499X9314346424813591",
                "1c5f41d2d0e4f288e70cd369b3f63973": "mock_team_1561013135499X9314346424813591",
                "a4406dbb328e69dc5ce63284e53d8b04": "mock_team_1561013135499X9314346424813591",
                "fa5efdfb1eb8c390069db180473b07e1": "mock_team_1561013135499X9314346424813591",
                "c11fb3b2c5b20a5c751eebc1076d5381": "mock_team_1561013135499X2784589957997585",
                "ebc7291ea6ebd0e15faa9daf6e4ad77b": "mock_team_1561013135499X2784589957997585",
                "c8e3bdc44b97cb243c2256161e56a637": "mock_team_1561013135499X2784589957997585",
                "efe607b49bc8da1e1a6a02f43392a578": "mock_team_1561013135499X2784589957997585",
                "92da3d194e9256df96dbfdd2754e4319": "mock_team_1561013135499X4094869801481422",
                "1dee8a873af03ccd878b86b84c08c19b": "mock_team_1561013135499X4094869801481422",
                "3396bc96d6713d6467506dd1129e3d71": "mock_team_1561013135499X4094869801481422",
                "0f017521976eaed43bda9ce4fdb84ccf": "mock_team_1561013135499X4094869801481422",
                "111bce1dd87448484bf41694d4afe091": "mock_team_1561013135500X15988779414927645",
                "229ca1f8a131a9d50587e49881e245ad": "mock_team_1561013135500X15988779414927645",
                "c5109a17b8e922551c5ca985efb56988": "mock_team_1561013135500X15988779414927645",
                "d32476efd18e78c532cd40b8acf730f9": "mock_team_1561013135500X15988779414927645",
                "83b663721092eca0f2f0e9f7de0ef7bc": "mock_team_1561013135501X9687449595762767",
                "bdfecc850dd8ca40e991c1e2b36d925e": "mock_team_1561013135501X9687449595762767",
                "69ae89a7979fefb2559961c6b6412001": "mock_team_1561013135501X9687449595762767",
                "2286731fd915bc2bef4da6dd95d40559": "mock_team_1561013135501X9687449595762767",
                "e8980aad8ab419427066f59ee65fa9db": "mock_team_1561013135502X505239888223133",
                "ee44321f54504853310f577ca588e26e": "mock_team_1561013135502X505239888223133",
                "67e1ee3411707ed7aac65279c18a02dc": "mock_team_1561013135502X505239888223133",
                "3e02cff43791f7f10d23c17cf4a07f92": "mock_team_1561013135502X505239888223133",
                "280aaf712d6fe49f0a6a8a549b8f4ef3": "mock_team_1561013135503X8959575388390668",
                "0659d67f63b520ab5c0579321d9bf5db": "mock_team_1561013135503X8959575388390668",
                "1b0f991d732ac09717a153b88c483b7f": "mock_team_1561013135503X8959575388390668",
                "4e1477a15dbcc710a465be4eca8c2b9c": "mock_team_1561013135503X8959575388390668",
                "b962dd6cf649b083b35bce7e8cdf2fa9": "mock_team_1561013135504X20707217652036292",
                "32b6567af83c63370a5bc7ce605e654a": "mock_team_1561013135504X20707217652036292",
                "1b4136e236d7ad94d5f9cc1ba7ce5b52": "mock_team_1561013135504X20707217652036292",
                "2e8fb4a00d5db128aa403acc1ea1c15c": "mock_team_1561013135504X20707217652036292",
                "9bcebc82daf5cb18871e5ad1c0ccbfee": "mock_team_1561013135505X2797059527464436",
                "9c8edcfa5fcd615e904bbb2e6c9dc372": "mock_team_1561013135505X2797059527464436",
                "e48a1b75cf06d61103999c3ea9e230d1": "mock_team_1561013135505X2797059527464436",
                "8f54cbab04ae2a7eec874a3ee8df2b77": "mock_team_1561013135505X2797059527464436",
                "021729a61b3d3d389e6fdb2ec3977212": "mock_team_1561013135509X14262429909171082",
                "e59183e167e77b7bf5bbd2ebc5fc74d1": "mock_team_1561013135509X14262429909171082",
                "6129f374604ba0305a790a16eb7ef381": "mock_team_1561013135509X14262429909171082",
                "b5898066398898c2f2df03b95dc90309": "mock_team_1561013135509X14262429909171082",
                "3120ab2616add31404449110ebbcfc2b": "mock_team_1561013135513X7372622339258876",
                "8008410d9665c301916ff51ebc10e7b8": "mock_team_1561013135513X7372622339258876",
                "d49ca48d76a2fbc8b465781e9059eadb": "mock_team_1561013135513X7372622339258876",
                "54b72270c5fd146e8d69bed1b889b1a3": "mock_team_1561013135513X7372622339258876",
                "725647a28e8f0da31f1f1230649cdcd9": "mock_team_1561013135515X9883577102946213",
                "23a25fc16722bf7adce3e87dd55a1379": "mock_team_1561013135515X9883577102946213",
                "6d84a436420a8e0b5b21c496e091d506": "mock_team_1561013135515X9883577102946213",
                "2d0bdf54a38eeeb606c8a1d8f51c9c37": "mock_team_1561013135515X9883577102946213",
                "32e96d29ff4f020d6a37d765453bd2b0": "mock_team_1561013135524X25245475820149155",
                "229f4229f91c7452b183e6d536947d52": "mock_team_1561013135524X25245475820149155"
            },
            "min": 98,
            "max": 140,
            "role": {
                "tutor": {
                    "479e5f8396cec7afccd68b097eabe5f9": true,
                    "4c9d704dfcb512873c39ddeefdd559e1": true
                },
                "developer": {
                    "308cecce8e2115c780e374f13ecb4547": true
                }
            },
            "teamdata": [
                {
                    "teams": [
                        {
                            "key": "mock_team_1561013135493X47421570680499947",
                            "members": {
                                "4c9d704dfcb512873c39ddeefdd559e1": true,
                                "4d12923863b12fc810b53fc4dea82054": true,
                                "2de139986a5af991a44afa0a91028887": true,
                                "2eea823b3008cb5881a6c474d3205f7d": true
                            },
                            "name": "MockTeam 1"
                        },
                        {
                            "key": "mock_team_1561013135494X4339867686856125",
                            "members": {
                                "0d50f5cf866265bd884fa48d03c6bd5e": true,
                                "04a9f70aaabed9ba9705f9ab69406501": true,
                                "45319075db1b0ece8b40a33f509f37eb": true,
                                "777554caf9604c2034824ffe6e9fe8dd": true
                            },
                            "name": "MockTeam 2"
                        },
                        {
                            "key": "mock_team_1561013135494X17777648381385625",
                            "members": {
                                "d6eeca831e25256a90c287a6d00f56e0": true,
                                "422434902623c2127b9a32f7a4bf9f31": true,
                                "987c579793b3a2fdd5bf188429dc898d": true,
                                "802f896b7fe7e2aedfc4f7a1108fa6dc": true
                            },
                            "name": "MockTeam 3"
                        },
                        {
                            "key": "mock_team_1561013135494X4840181141403157",
                            "members": {
                                "d096deaa9f00f108742224008114decd": true,
                                "bca2e71b6470256df6d1948095552099": true,
                                "78dcd4d52b0e83478bfe4970a551d6cf": true,
                                "a1bd2b05f433d350837ae894998792f6": true
                            },
                            "name": "MockTeam 4"
                        },
                        {
                            "key": "mock_team_1561013135494X4939980693686541",
                            "members": {
                                "47a12248100db42590fcb63dcad0524a": true,
                                "5bcfa198657323973f023393666a7210": true,
                                "a0e207eacd170a9b191eaf6ea05712ff": true,
                                "d8d3483265c8b8fd223395b96c94267b": true
                            },
                            "name": "MockTeam 5"
                        },
                        {
                            "key": "mock_team_1561013135494X3008458952427473",
                            "members": {
                                "086a4ad01ad218ad09b0aba128e6c41e": true,
                                "25af48542dbd8df884b19c399acc6388": true,
                                "25a696ff52063de0f39e89a76b625a3a": true,
                                "4269ae6b881d90a70167514788f67516": true
                            },
                            "name": "MockTeam 6"
                        },
                        {
                            "key": "mock_team_1561013135494X6264996021360096",
                            "members": {
                                "a3803cee4994362dec85c901853b35ef": true,
                                "e740bfe38fdfc3e5df8ed488e681657e": true,
                                "f71c540882f4c20cad6158717cf79804": true,
                                "53759bb368217e202edec5d8f4dd5441": true
                            },
                            "name": "MockTeam 7"
                        },
                        {
                            "key": "mock_team_1561013135494X622357302441314",
                            "members": {
                                "5831f3cbfb9a973d20b3a469fd7c92c7": true,
                                "c0b2164532b99ada53c92b017c3b1209": true,
                                "308cecce8e2115c780e374f13ecb4547": true,
                                "979cf615a2e908342ddb1f974b2c6cba": true
                            },
                            "name": "MockTeam 8"
                        },
                        {
                            "key": "mock_team_1561013135494X5929389786803025",
                            "members": {
                                "43b22f468cbf48c03b423af131cd5085": true,
                                "04f81d62ff3ffa1b109491d728649446": true,
                                "f9638806fc692bb031b9db223a57656f": true,
                                "2f68ee4e9a8fe44575043b5f90b938d6": true
                            },
                            "name": "MockTeam 9"
                        },
                        {
                            "key": "mock_team_1561013135494X5521995452088562",
                            "members": {
                                "93c10bfa4eacf3e51fff00aa312b0bd4": true,
                                "a2debab41128d3a6661f724456c61415": true,
                                "3aa1213ffa711e003fb02cc9e4e096be": true,
                                "2f3823cbbca04a04df841ae11ba7eaed": true
                            },
                            "name": "MockTeam 10"
                        },
                        {
                            "key": "mock_team_1561013135495X03874743892354404",
                            "members": {
                                "5b0e97237b34dd4b7dd7ebe7cd4ecc13": true,
                                "8565d5dce906bdadae2ce167d21d7dc3": true,
                                "c60aa982952059ff3b0910f6298bf1e1": true,
                                "7addca9f03e1545f384455d2132ad634": true
                            },
                            "name": "MockTeam 11"
                        },
                        {
                            "key": "mock_team_1561013135495X8856621263788307",
                            "members": {
                                "b3d676b1f5e58d7f433380b41372476e": true,
                                "a4619d471ed474ef52e849729bc2da88": true,
                                "dec12aef844ef4e0f2f1ad8aa8496f8b": true,
                                "2dd4d4c1064041e88225b2501a13fe85": true
                            },
                            "name": "MockTeam 12"
                        },
                        {
                            "key": "mock_team_1561013135495X35904308442661725",
                            "members": {
                                "57d9e42e5dbf71afcf8da4796a860a9f": true,
                                "5834c87710509cf864f01d1236393cf8": true,
                                "500f8515b397b98cddcbb2faf9c078c0": true,
                                "c0edd93012c5b22fa91a910f1fd3db4f": true
                            },
                            "name": "MockTeam 13"
                        },
                        {
                            "key": "mock_team_1561013135495X4372346209096969",
                            "members": {
                                "1d2eacef77d49b067c7d35db31884891": true,
                                "e5c83b56d5e17b8b5c93a5e0bf137004": true,
                                "cf4bbde1a048d219b09314752de841b2": true,
                                "01bf4e899b9984be5bbc450d8641c5e8": true
                            },
                            "name": "MockTeam 14"
                        },
                        {
                            "key": "mock_team_1561013135495X013140704180036655",
                            "members": {
                                "cd186730d33d441e0590333506f99c46": true,
                                "b67616e5692fafb7ad217326f11f0f13": true,
                                "13e7a35974271699057d7a650bff00fb": true,
                                "4429a9b184ce1c33408d666f04ab81d5": true
                            },
                            "name": "MockTeam 15"
                        },
                        {
                            "key": "mock_team_1561013135495X9970271082396971",
                            "members": {
                                "ebb8297d2a304b399e179bd8a46b95f2": true,
                                "155dd10f8b5b96ecf5fc1a89bebe7c51": true,
                                "cfdb70f66e87408a03a249880832d611": true,
                                "990e01e83a973ac3813a5f0e1170a20c": true
                            },
                            "name": "MockTeam 16"
                        },
                        {
                            "key": "mock_team_1561013135495X14112339553103181",
                            "members": {
                                "bfaf8dc19c7ead80f3053c48d5c0fd75": true,
                                "89e484c339d9b87278604c7d3f153dbf": true,
                                "35721bbe451c959394bb5cf5f74a9fd5": true,
                                "4c8a50496028f38bac17b9ce4c91ebfe": true
                            },
                            "name": "MockTeam 17"
                        },
                        {
                            "key": "mock_team_1561013135496X8818705356091767",
                            "members": {
                                "657df3b1e66814c011ce752d408fee3f": true,
                                "6011e478133a14c8405ad489239cc276": true,
                                "f0603e5e1662c457d578a2537451ef42": true,
                                "cd7fb2e60e6adb66e957c6d40a493bad": true
                            },
                            "name": "MockTeam 18"
                        },
                        {
                            "key": "mock_team_1561013135496X2968999789503364",
                            "members": {
                                "a91108650324b43435d398ac85a9d546": true,
                                "77e7a0a01dc7918e310c1ceebcddb3f3": true,
                                "efbb7ae532427496680b381f49001973": true,
                                "af0ce8f5ac59375e6b73db04b851e4a5": true
                            },
                            "name": "MockTeam 19"
                        },
                        {
                            "key": "mock_team_1561013135496X49834296960186597",
                            "members": {
                                "111fe409f6a5ba87945890f19f112734": true,
                                "66901f9163854cd8cb1b5cfa0c888dd7": true,
                                "11d45c318518290786ac275367765bf5": true,
                                "965f37bfc4ca7abbe503ef2b596ffd59": true
                            },
                            "name": "MockTeam 20"
                        },
                        {
                            "key": "mock_team_1561013135496X8260853145776439",
                            "members": {
                                "88b918bad7aba34250d2e11c04f5783c": true,
                                "0faf7eef46d5dd580d652302a56c2a14": true,
                                "02489beae701519ea3b07f5b2ff304ab": true,
                                "e9afe846dd43a9d9f586b14d40e71a5d": true
                            },
                            "name": "MockTeam 21"
                        },
                        {
                            "key": "mock_team_1561013135496X41216239585284353",
                            "members": {
                                "78aaee2f7614bf5a9c946dda656a1308": true,
                                "c38dddbc3f9b5deb04be190094770214": true,
                                "3c6d74f139d3d7a00c1292133e71a626": true,
                                "4dc0e6207f5a662c3f475431225c0c8d": true
                            },
                            "name": "MockTeam 22"
                        },
                        {
                            "key": "mock_team_1561013135497X5333942409887504",
                            "members": {
                                "de2ec5a6573783f327ecd7555773f850": true,
                                "479e5f8396cec7afccd68b097eabe5f9": true,
                                "49bee8a7f0d1c2218f26158901b9a805": true,
                                "aa16d31fd6c2383b3c46609539a717f3": true
                            },
                            "name": "MockTeam 23"
                        },
                        {
                            "key": "mock_team_1561013135497X1668991799059032",
                            "members": {
                                "cb588768cef4bd8502059efc41191cf0": true,
                                "6e3b1aa2656c7d9d83faa02d4ccda333": true,
                                "410292fe71579a663840e4302733153c": true,
                                "828c467087ba84716a8b8ac2f4864c77": true
                            },
                            "name": "MockTeam 24"
                        },
                        {
                            "key": "mock_team_1561013135497X0878475551873914",
                            "members": {
                                "6a8926262555ae92b182950b05d0fb4a": true,
                                "dcdfc585be98cff802f20190dd1a2708": true,
                                "2b9fb3c50aacb81a96ecb6823f3ae8c4": true,
                                "dd75345503eeb7b0e98b9a3bc9597908": true
                            },
                            "name": "MockTeam 25"
                        },
                        {
                            "key": "mock_team_1561013135498X0498029219365248",
                            "members": {
                                "c27e09b380151b0ac12fa7f2f23457f0": true,
                                "54799039855a68c10c7e82588f2eace1": true,
                                "8f2b56948ef996dc3877570be215dda8": true,
                                "e026700cc402c12eee641fa53746db25": true
                            },
                            "name": "MockTeam 26"
                        },
                        {
                            "key": "mock_team_1561013135498X9576082154654677",
                            "members": {
                                "d2014435b8e7ba4522c1339adaf13be9": true,
                                "3d0bde0c72570fd75cba91f924588b87": true,
                                "d467abc3511d66ed7bc1f994feb3f3a5": true,
                                "08ea34e38dfda8f618d65f759b9f941b": true
                            },
                            "name": "MockTeam 27"
                        },
                        {
                            "key": "mock_team_1561013135499X9314346424813591",
                            "members": {
                                "464723446faa8f3937e08d37e0fae144": true,
                                "1c5f41d2d0e4f288e70cd369b3f63973": true,
                                "a4406dbb328e69dc5ce63284e53d8b04": true,
                                "fa5efdfb1eb8c390069db180473b07e1": true
                            },
                            "name": "MockTeam 28"
                        },
                        {
                            "key": "mock_team_1561013135499X2784589957997585",
                            "members": {
                                "c11fb3b2c5b20a5c751eebc1076d5381": true,
                                "ebc7291ea6ebd0e15faa9daf6e4ad77b": true,
                                "c8e3bdc44b97cb243c2256161e56a637": true,
                                "efe607b49bc8da1e1a6a02f43392a578": true
                            },
                            "name": "MockTeam 29"
                        },
                        {
                            "key": "mock_team_1561013135499X4094869801481422",
                            "members": {
                                "92da3d194e9256df96dbfdd2754e4319": true,
                                "1dee8a873af03ccd878b86b84c08c19b": true,
                                "3396bc96d6713d6467506dd1129e3d71": true,
                                "0f017521976eaed43bda9ce4fdb84ccf": true
                            },
                            "name": "MockTeam 30"
                        },
                        {
                            "key": "mock_team_1561013135500X15988779414927645",
                            "members": {
                                "111bce1dd87448484bf41694d4afe091": true,
                                "229ca1f8a131a9d50587e49881e245ad": true,
                                "c5109a17b8e922551c5ca985efb56988": true,
                                "d32476efd18e78c532cd40b8acf730f9": true
                            },
                            "name": "MockTeam 31"
                        },
                        {
                            "key": "mock_team_1561013135501X9687449595762767",
                            "members": {
                                "83b663721092eca0f2f0e9f7de0ef7bc": true,
                                "bdfecc850dd8ca40e991c1e2b36d925e": true,
                                "69ae89a7979fefb2559961c6b6412001": true,
                                "2286731fd915bc2bef4da6dd95d40559": true
                            },
                            "name": "MockTeam 32"
                        },
                        {
                            "key": "mock_team_1561013135502X505239888223133",
                            "members": {
                                "e8980aad8ab419427066f59ee65fa9db": true,
                                "ee44321f54504853310f577ca588e26e": true,
                                "67e1ee3411707ed7aac65279c18a02dc": true,
                                "3e02cff43791f7f10d23c17cf4a07f92": true
                            },
                            "name": "MockTeam 33"
                        },
                        {
                            "key": "mock_team_1561013135503X8959575388390668",
                            "members": {
                                "280aaf712d6fe49f0a6a8a549b8f4ef3": true,
                                "0659d67f63b520ab5c0579321d9bf5db": true,
                                "1b0f991d732ac09717a153b88c483b7f": true,
                                "4e1477a15dbcc710a465be4eca8c2b9c": true
                            },
                            "name": "MockTeam 34"
                        },
                        {
                            "key": "mock_team_1561013135504X20707217652036292",
                            "members": {
                                "b962dd6cf649b083b35bce7e8cdf2fa9": true,
                                "32b6567af83c63370a5bc7ce605e654a": true,
                                "1b4136e236d7ad94d5f9cc1ba7ce5b52": true,
                                "2e8fb4a00d5db128aa403acc1ea1c15c": true
                            },
                            "name": "MockTeam 35"
                        },
                        {
                            "key": "mock_team_1561013135505X2797059527464436",
                            "members": {
                                "9bcebc82daf5cb18871e5ad1c0ccbfee": true,
                                "9c8edcfa5fcd615e904bbb2e6c9dc372": true,
                                "e48a1b75cf06d61103999c3ea9e230d1": true,
                                "8f54cbab04ae2a7eec874a3ee8df2b77": true
                            },
                            "name": "MockTeam 36"
                        },
                        {
                            "key": "mock_team_1561013135509X14262429909171082",
                            "members": {
                                "021729a61b3d3d389e6fdb2ec3977212": true,
                                "e59183e167e77b7bf5bbd2ebc5fc74d1": true,
                                "6129f374604ba0305a790a16eb7ef381": true,
                                "b5898066398898c2f2df03b95dc90309": true
                            },
                            "name": "MockTeam 37"
                        },
                        {
                            "key": "mock_team_1561013135513X7372622339258876",
                            "members": {
                                "3120ab2616add31404449110ebbcfc2b": true,
                                "8008410d9665c301916ff51ebc10e7b8": true,
                                "d49ca48d76a2fbc8b465781e9059eadb": true,
                                "54b72270c5fd146e8d69bed1b889b1a3": true
                            },
                            "name": "MockTeam 38"
                        },
                        {
                            "key": "mock_team_1561013135515X9883577102946213",
                            "members": {
                                "725647a28e8f0da31f1f1230649cdcd9": true,
                                "23a25fc16722bf7adce3e87dd55a1379": true,
                                "6d84a436420a8e0b5b21c496e091d506": true,
                                "2d0bdf54a38eeeb606c8a1d8f51c9c37": true
                            },
                            "name": "MockTeam 39"
                        },
                        {
                            "key": "mock_team_1561013135524X25245475820149155",
                            "members": {
                                "32e96d29ff4f020d6a37d765453bd2b0": true,
                                "229f4229f91c7452b183e6d536947d52": true
                            },
                            "name": "MockTeam 40"
                        }
                    ],
                    "updated_at": "2019-06-27T02:11:19+02:00",
                    "created_at": "2019-06-27T02:11:19+02:00",
                    "key": "1561594278025X6681404849795909"
                }
            ],
            "updated_at": "2019-06-27T02:15:49+02:00",
            "created_at": "2019-06-27T02:15:49+02:00",
            "key": "1561594547882X8328147500647436",
            "teams": {
                "mock_team_1561013135493X47421570680499947": {
                    "key": "mock_team_1561013135493X47421570680499947",
                    "members": {
                        "4c9d704dfcb512873c39ddeefdd559e1": true,
                        "4d12923863b12fc810b53fc4dea82054": true,
                        "2de139986a5af991a44afa0a91028887": true,
                        "2eea823b3008cb5881a6c474d3205f7d": true
                    },
                    "name": "MockTeam 1"
                },
                "mock_team_1561013135494X4339867686856125": {
                    "key": "mock_team_1561013135494X4339867686856125",
                    "members": {
                        "0d50f5cf866265bd884fa48d03c6bd5e": true,
                        "04a9f70aaabed9ba9705f9ab69406501": true,
                        "45319075db1b0ece8b40a33f509f37eb": true,
                        "777554caf9604c2034824ffe6e9fe8dd": true
                    },
                    "name": "MockTeam 2"
                },
                "mock_team_1561013135494X17777648381385625": {
                    "key": "mock_team_1561013135494X17777648381385625",
                    "members": {
                        "d6eeca831e25256a90c287a6d00f56e0": true,
                        "422434902623c2127b9a32f7a4bf9f31": true,
                        "987c579793b3a2fdd5bf188429dc898d": true,
                        "802f896b7fe7e2aedfc4f7a1108fa6dc": true
                    },
                    "name": "MockTeam 3"
                },
                "mock_team_1561013135494X4840181141403157": {
                    "key": "mock_team_1561013135494X4840181141403157",
                    "members": {
                        "d096deaa9f00f108742224008114decd": true,
                        "bca2e71b6470256df6d1948095552099": true,
                        "78dcd4d52b0e83478bfe4970a551d6cf": true,
                        "a1bd2b05f433d350837ae894998792f6": true
                    },
                    "name": "MockTeam 4"
                },
                "mock_team_1561013135494X4939980693686541": {
                    "key": "mock_team_1561013135494X4939980693686541",
                    "members": {
                        "47a12248100db42590fcb63dcad0524a": true,
                        "5bcfa198657323973f023393666a7210": true,
                        "a0e207eacd170a9b191eaf6ea05712ff": true,
                        "d8d3483265c8b8fd223395b96c94267b": true
                    },
                    "name": "MockTeam 5"
                },
                "mock_team_1561013135494X3008458952427473": {
                    "key": "mock_team_1561013135494X3008458952427473",
                    "members": {
                        "086a4ad01ad218ad09b0aba128e6c41e": true,
                        "25af48542dbd8df884b19c399acc6388": true,
                        "25a696ff52063de0f39e89a76b625a3a": true,
                        "4269ae6b881d90a70167514788f67516": true
                    },
                    "name": "MockTeam 6"
                },
                "mock_team_1561013135494X6264996021360096": {
                    "key": "mock_team_1561013135494X6264996021360096",
                    "members": {
                        "a3803cee4994362dec85c901853b35ef": true,
                        "e740bfe38fdfc3e5df8ed488e681657e": true,
                        "f71c540882f4c20cad6158717cf79804": true,
                        "53759bb368217e202edec5d8f4dd5441": true
                    },
                    "name": "MockTeam 7"
                },
                "mock_team_1561013135494X622357302441314": {
                    "key": "mock_team_1561013135494X622357302441314",
                    "members": {
                        "5831f3cbfb9a973d20b3a469fd7c92c7": true,
                        "c0b2164532b99ada53c92b017c3b1209": true,
                        "308cecce8e2115c780e374f13ecb4547": true,
                        "979cf615a2e908342ddb1f974b2c6cba": true
                    },
                    "name": "MockTeam 8"
                },
                "mock_team_1561013135494X5929389786803025": {
                    "key": "mock_team_1561013135494X5929389786803025",
                    "members": {
                        "43b22f468cbf48c03b423af131cd5085": true,
                        "04f81d62ff3ffa1b109491d728649446": true,
                        "f9638806fc692bb031b9db223a57656f": true,
                        "2f68ee4e9a8fe44575043b5f90b938d6": true
                    },
                    "name": "MockTeam 9"
                },
                "mock_team_1561013135494X5521995452088562": {
                    "key": "mock_team_1561013135494X5521995452088562",
                    "members": {
                        "93c10bfa4eacf3e51fff00aa312b0bd4": true,
                        "a2debab41128d3a6661f724456c61415": true,
                        "3aa1213ffa711e003fb02cc9e4e096be": true,
                        "2f3823cbbca04a04df841ae11ba7eaed": true
                    },
                    "name": "MockTeam 10"
                },
                "mock_team_1561013135495X03874743892354404": {
                    "key": "mock_team_1561013135495X03874743892354404",
                    "members": {
                        "5b0e97237b34dd4b7dd7ebe7cd4ecc13": true,
                        "8565d5dce906bdadae2ce167d21d7dc3": true,
                        "c60aa982952059ff3b0910f6298bf1e1": true,
                        "7addca9f03e1545f384455d2132ad634": true
                    },
                    "name": "MockTeam 11"
                },
                "mock_team_1561013135495X8856621263788307": {
                    "key": "mock_team_1561013135495X8856621263788307",
                    "members": {
                        "b3d676b1f5e58d7f433380b41372476e": true,
                        "a4619d471ed474ef52e849729bc2da88": true,
                        "dec12aef844ef4e0f2f1ad8aa8496f8b": true,
                        "2dd4d4c1064041e88225b2501a13fe85": true
                    },
                    "name": "MockTeam 12"
                },
                "mock_team_1561013135495X35904308442661725": {
                    "key": "mock_team_1561013135495X35904308442661725",
                    "members": {
                        "57d9e42e5dbf71afcf8da4796a860a9f": true,
                        "5834c87710509cf864f01d1236393cf8": true,
                        "500f8515b397b98cddcbb2faf9c078c0": true,
                        "c0edd93012c5b22fa91a910f1fd3db4f": true
                    },
                    "name": "MockTeam 13"
                },
                "mock_team_1561013135495X4372346209096969": {
                    "key": "mock_team_1561013135495X4372346209096969",
                    "members": {
                        "1d2eacef77d49b067c7d35db31884891": true,
                        "e5c83b56d5e17b8b5c93a5e0bf137004": true,
                        "cf4bbde1a048d219b09314752de841b2": true,
                        "01bf4e899b9984be5bbc450d8641c5e8": true
                    },
                    "name": "MockTeam 14"
                },
                "mock_team_1561013135495X013140704180036655": {
                    "key": "mock_team_1561013135495X013140704180036655",
                    "members": {
                        "cd186730d33d441e0590333506f99c46": true,
                        "b67616e5692fafb7ad217326f11f0f13": true,
                        "13e7a35974271699057d7a650bff00fb": true,
                        "4429a9b184ce1c33408d666f04ab81d5": true
                    },
                    "name": "MockTeam 15"
                },
                "mock_team_1561013135495X9970271082396971": {
                    "key": "mock_team_1561013135495X9970271082396971",
                    "members": {
                        "ebb8297d2a304b399e179bd8a46b95f2": true,
                        "155dd10f8b5b96ecf5fc1a89bebe7c51": true,
                        "cfdb70f66e87408a03a249880832d611": true,
                        "990e01e83a973ac3813a5f0e1170a20c": true
                    },
                    "name": "MockTeam 16"
                },
                "mock_team_1561013135495X14112339553103181": {
                    "key": "mock_team_1561013135495X14112339553103181",
                    "members": {
                        "bfaf8dc19c7ead80f3053c48d5c0fd75": true,
                        "89e484c339d9b87278604c7d3f153dbf": true,
                        "35721bbe451c959394bb5cf5f74a9fd5": true,
                        "4c8a50496028f38bac17b9ce4c91ebfe": true
                    },
                    "name": "MockTeam 17"
                },
                "mock_team_1561013135496X8818705356091767": {
                    "key": "mock_team_1561013135496X8818705356091767",
                    "members": {
                        "657df3b1e66814c011ce752d408fee3f": true,
                        "6011e478133a14c8405ad489239cc276": true,
                        "f0603e5e1662c457d578a2537451ef42": true,
                        "cd7fb2e60e6adb66e957c6d40a493bad": true
                    },
                    "name": "MockTeam 18"
                },
                "mock_team_1561013135496X2968999789503364": {
                    "key": "mock_team_1561013135496X2968999789503364",
                    "members": {
                        "a91108650324b43435d398ac85a9d546": true,
                        "77e7a0a01dc7918e310c1ceebcddb3f3": true,
                        "efbb7ae532427496680b381f49001973": true,
                        "af0ce8f5ac59375e6b73db04b851e4a5": true
                    },
                    "name": "MockTeam 19"
                },
                "mock_team_1561013135496X49834296960186597": {
                    "key": "mock_team_1561013135496X49834296960186597",
                    "members": {
                        "111fe409f6a5ba87945890f19f112734": true,
                        "66901f9163854cd8cb1b5cfa0c888dd7": true,
                        "11d45c318518290786ac275367765bf5": true,
                        "965f37bfc4ca7abbe503ef2b596ffd59": true
                    },
                    "name": "MockTeam 20"
                },
                "mock_team_1561013135496X8260853145776439": {
                    "key": "mock_team_1561013135496X8260853145776439",
                    "members": {
                        "88b918bad7aba34250d2e11c04f5783c": true,
                        "0faf7eef46d5dd580d652302a56c2a14": true,
                        "02489beae701519ea3b07f5b2ff304ab": true,
                        "e9afe846dd43a9d9f586b14d40e71a5d": true
                    },
                    "name": "MockTeam 21"
                },
                "mock_team_1561013135496X41216239585284353": {
                    "key": "mock_team_1561013135496X41216239585284353",
                    "members": {
                        "78aaee2f7614bf5a9c946dda656a1308": true,
                        "c38dddbc3f9b5deb04be190094770214": true,
                        "3c6d74f139d3d7a00c1292133e71a626": true,
                        "4dc0e6207f5a662c3f475431225c0c8d": true
                    },
                    "name": "MockTeam 22"
                },
                "mock_team_1561013135497X5333942409887504": {
                    "key": "mock_team_1561013135497X5333942409887504",
                    "members": {
                        "de2ec5a6573783f327ecd7555773f850": true,
                        "479e5f8396cec7afccd68b097eabe5f9": true,
                        "49bee8a7f0d1c2218f26158901b9a805": true,
                        "aa16d31fd6c2383b3c46609539a717f3": true
                    },
                    "name": "MockTeam 23"
                },
                "mock_team_1561013135497X1668991799059032": {
                    "key": "mock_team_1561013135497X1668991799059032",
                    "members": {
                        "cb588768cef4bd8502059efc41191cf0": true,
                        "6e3b1aa2656c7d9d83faa02d4ccda333": true,
                        "410292fe71579a663840e4302733153c": true,
                        "828c467087ba84716a8b8ac2f4864c77": true
                    },
                    "name": "MockTeam 24"
                },
                "mock_team_1561013135497X0878475551873914": {
                    "key": "mock_team_1561013135497X0878475551873914",
                    "members": {
                        "6a8926262555ae92b182950b05d0fb4a": true,
                        "dcdfc585be98cff802f20190dd1a2708": true,
                        "2b9fb3c50aacb81a96ecb6823f3ae8c4": true,
                        "dd75345503eeb7b0e98b9a3bc9597908": true
                    },
                    "name": "MockTeam 25"
                },
                "mock_team_1561013135498X0498029219365248": {
                    "key": "mock_team_1561013135498X0498029219365248",
                    "members": {
                        "c27e09b380151b0ac12fa7f2f23457f0": true,
                        "54799039855a68c10c7e82588f2eace1": true,
                        "8f2b56948ef996dc3877570be215dda8": true,
                        "e026700cc402c12eee641fa53746db25": true
                    },
                    "name": "MockTeam 26"
                },
                "mock_team_1561013135498X9576082154654677": {
                    "key": "mock_team_1561013135498X9576082154654677",
                    "members": {
                        "d2014435b8e7ba4522c1339adaf13be9": true,
                        "3d0bde0c72570fd75cba91f924588b87": true,
                        "d467abc3511d66ed7bc1f994feb3f3a5": true,
                        "08ea34e38dfda8f618d65f759b9f941b": true
                    },
                    "name": "MockTeam 27"
                },
                "mock_team_1561013135499X9314346424813591": {
                    "key": "mock_team_1561013135499X9314346424813591",
                    "members": {
                        "464723446faa8f3937e08d37e0fae144": true,
                        "1c5f41d2d0e4f288e70cd369b3f63973": true,
                        "a4406dbb328e69dc5ce63284e53d8b04": true,
                        "fa5efdfb1eb8c390069db180473b07e1": true
                    },
                    "name": "MockTeam 28"
                },
                "mock_team_1561013135499X2784589957997585": {
                    "key": "mock_team_1561013135499X2784589957997585",
                    "members": {
                        "c11fb3b2c5b20a5c751eebc1076d5381": true,
                        "ebc7291ea6ebd0e15faa9daf6e4ad77b": true,
                        "c8e3bdc44b97cb243c2256161e56a637": true,
                        "efe607b49bc8da1e1a6a02f43392a578": true
                    },
                    "name": "MockTeam 29"
                },
                "mock_team_1561013135499X4094869801481422": {
                    "key": "mock_team_1561013135499X4094869801481422",
                    "members": {
                        "92da3d194e9256df96dbfdd2754e4319": true,
                        "1dee8a873af03ccd878b86b84c08c19b": true,
                        "3396bc96d6713d6467506dd1129e3d71": true,
                        "0f017521976eaed43bda9ce4fdb84ccf": true
                    },
                    "name": "MockTeam 30"
                },
                "mock_team_1561013135500X15988779414927645": {
                    "key": "mock_team_1561013135500X15988779414927645",
                    "members": {
                        "111bce1dd87448484bf41694d4afe091": true,
                        "229ca1f8a131a9d50587e49881e245ad": true,
                        "c5109a17b8e922551c5ca985efb56988": true,
                        "d32476efd18e78c532cd40b8acf730f9": true
                    },
                    "name": "MockTeam 31"
                },
                "mock_team_1561013135501X9687449595762767": {
                    "key": "mock_team_1561013135501X9687449595762767",
                    "members": {
                        "83b663721092eca0f2f0e9f7de0ef7bc": true,
                        "bdfecc850dd8ca40e991c1e2b36d925e": true,
                        "69ae89a7979fefb2559961c6b6412001": true,
                        "2286731fd915bc2bef4da6dd95d40559": true
                    },
                    "name": "MockTeam 32"
                },
                "mock_team_1561013135502X505239888223133": {
                    "key": "mock_team_1561013135502X505239888223133",
                    "members": {
                        "e8980aad8ab419427066f59ee65fa9db": true,
                        "ee44321f54504853310f577ca588e26e": true,
                        "67e1ee3411707ed7aac65279c18a02dc": true,
                        "3e02cff43791f7f10d23c17cf4a07f92": true
                    },
                    "name": "MockTeam 33"
                },
                "mock_team_1561013135503X8959575388390668": {
                    "key": "mock_team_1561013135503X8959575388390668",
                    "members": {
                        "280aaf712d6fe49f0a6a8a549b8f4ef3": true,
                        "0659d67f63b520ab5c0579321d9bf5db": true,
                        "1b0f991d732ac09717a153b88c483b7f": true,
                        "4e1477a15dbcc710a465be4eca8c2b9c": true
                    },
                    "name": "MockTeam 34"
                },
                "mock_team_1561013135504X20707217652036292": {
                    "key": "mock_team_1561013135504X20707217652036292",
                    "members": {
                        "b962dd6cf649b083b35bce7e8cdf2fa9": true,
                        "32b6567af83c63370a5bc7ce605e654a": true,
                        "1b4136e236d7ad94d5f9cc1ba7ce5b52": true,
                        "2e8fb4a00d5db128aa403acc1ea1c15c": true
                    },
                    "name": "MockTeam 35"
                },
                "mock_team_1561013135505X2797059527464436": {
                    "key": "mock_team_1561013135505X2797059527464436",
                    "members": {
                        "9bcebc82daf5cb18871e5ad1c0ccbfee": true,
                        "9c8edcfa5fcd615e904bbb2e6c9dc372": true,
                        "e48a1b75cf06d61103999c3ea9e230d1": true,
                        "8f54cbab04ae2a7eec874a3ee8df2b77": true
                    },
                    "name": "MockTeam 36"
                },
                "mock_team_1561013135509X14262429909171082": {
                    "key": "mock_team_1561013135509X14262429909171082",
                    "members": {
                        "021729a61b3d3d389e6fdb2ec3977212": true,
                        "e59183e167e77b7bf5bbd2ebc5fc74d1": true,
                        "6129f374604ba0305a790a16eb7ef381": true,
                        "b5898066398898c2f2df03b95dc90309": true
                    },
                    "name": "MockTeam 37"
                },
                "mock_team_1561013135513X7372622339258876": {
                    "key": "mock_team_1561013135513X7372622339258876",
                    "members": {
                        "3120ab2616add31404449110ebbcfc2b": true,
                        "8008410d9665c301916ff51ebc10e7b8": true,
                        "d49ca48d76a2fbc8b465781e9059eadb": true,
                        "54b72270c5fd146e8d69bed1b889b1a3": true
                    },
                    "name": "MockTeam 38"
                },
                "mock_team_1561013135515X9883577102946213": {
                    "key": "mock_team_1561013135515X9883577102946213",
                    "members": {
                        "725647a28e8f0da31f1f1230649cdcd9": true,
                        "23a25fc16722bf7adce3e87dd55a1379": true,
                        "6d84a436420a8e0b5b21c496e091d506": true,
                        "2d0bdf54a38eeeb606c8a1d8f51c9c37": true
                    },
                    "name": "MockTeam 39"
                },
                "mock_team_1561013135524X25245475820149155": {
                    "key": "mock_team_1561013135524X25245475820149155",
                    "members": {
                        "32e96d29ff4f020d6a37d765453bd2b0": true,
                        "229f4229f91c7452b183e6d536947d52": true
                    },
                    "name": "MockTeam 40"
                }
            }
        },
        "stores": {
            "communication_log": {
                "store": [ "ccm.store", { "name": "mnutze2s_chat_log", "url": "https://ccm2.inf.h-brs.de" } ],
                "key": { "user": { "$exists": true }, "parent.name": "comment" },
                "onchangeFilter": {}
            }
        },
        "worker": "./assets/worker.communication_analysis.js"
    },

    courseActivities: {
        process: [ "ccm.load", { url: "./assets/monitor.leader.js", type: "js" } ],
        // initial configuration
        groupBy: {
            key: "event",
            groupBy: {key: "parent.descr,parent.id"},
        },
        limit: 20,
        render: { key: "highcharts", type: "pie", highcharts: { "tooltip.shared": false ,"legend.enabled": false } },
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
            { "url": "resources/monitor.css" }
        ] ]
    },

    "course-monitoring": {
        css: [ "ccm.load", [
            { url: "../libs/css/delos.css" },
            { url: "../libs/css/delos_cont.css" },
            { url: "../libs/css/fonts.css" },
            { url: "../components/monitor/resources/monitor.css" }
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