var vm = new Vue({
    el: '#app',
    data: {
        packIds: [
            {
                "code": "core",
                "name": "Core Set",
            },
            {
                "code": "wla",
                "name": "What Lies Ahead",
            },
            {
                "code": "ta",
                "name": "Trace Amount",
            },
            {
                "code": "ce",
                "name": "Cyber Exodus",
            },
            {
                "code": "asis",
                "name": "A Study in Static",
            },
            {
                "code": "hs",
                "name": "Humanity's Shadow",
            },
            {
                "code": "fp",
                "name": "Future Proof",
            },
            {
                "code": "cac",
                "name": "Creation and Control",
            },
            {
                "code": "om",
                "name": "Opening Moves",
            },
            {
                "code": "st",
                "name": "Second Thoughts",
            },
            {
                "code": "mt",
                "name": "Mala Tempora",
            },
            {
                "code": "tc",
                "name": "True Colors",
            },
            {
                "code": "dt",
                "name": "Double Time",
            },
            {
                "code": "fal",
                "name": "Fear and Loathing",
            },
            {
                "code": "hap",
                "name": "Honor and Profit",
            },
            {
                "code": "up",
                "name": "Upstalk",
            },
            {
                "code": "tsb",
                "name": "The Spaces Between",
            },
            {
                "code": "fc",
                "name": "First Contact",
            },
            {
                "code": "uao",
                "name": "Up and Over",
            },
            {
                "code": "atr",
                "name": "All That Remains",
            },
            {
                "code": "ts",
                "name": "The Source",
            },
            {
                "code": "oac",
                "name": "Order and Chaos",
            },
            {
                "code": "val",
                "name": "The Valley",
            },
            {
                "code": "bb",
                "name": "Breaker Bay",
            },
            {
                "code": "cc",
                "name": "Chrome City",
            },
            {
                "code": "uw",
                "name": "The Underway",
            },
            {
                "code": "oh",
                "name": "Old Hollywood",
            },
            {
                "code": "uot",
                "name": "The Universe of Tomorrow",
            },
            {
                "code": "dad",
                "name": "Data and Destiny",
            },
            {
                "code": "kg",
                "name": "Kala Ghoda",
            },
            {
                "code": "bf",
                "name": "Business First",
            },
            {
                "code": "dag",
                "name": "Democracy and Dogma",
            },
            {
                "code": "si",
                "name": "Salsette Island",
            },
            {
                "code": "tlm",
                "name": "The Liberated Mind",
            },
            {
                "code": "ftm",
                "name": "Fear the Masses",
            },
            {
                "code": "23s",
                "name": "23 Seconds",
            },
            {
                "code": "bm",
                "name": "Blood Money",
            },
            {
                "code": "es",
                "name": "Escalation",
            },
            {
                "code": "in",
                "name": "Intervention",
            },
            {
                "code": "ml",
                "name": "Martial Law",
            },
            {
                "code": "qu",
                "name": "Quorum",
            },
            {
                "code": "dc",
                "name": "Daedalus Complex",
            },
            {
                "code": "so",
                "name": "Station One",
            },
            {
                "code": "eas",
                "name": "Earth's Scion",
            },
            {
                "code": "td",
                "name": "Terminal Directive",
            },
            {
                "code": "baw",
                "name": "Blood and Water",
            },
            {
                "code": "fm",
                "name": "Free Mars",
            },
            {
                "code": "cd",
                "name": "Crimson Dust",
            },
            {
                "code":"core2",
                "name":"Revised Core Set"
            },
            {
                "code": "ss",
                "name": "Sovereign Sight",
            },
            {
                "code": "dtwn",
                "name": "Down the White Nile",
            },
            {
                "code": "cotc",
                "name": "Council of the Crest",
            },
            {
                "code": "tdatd",
                "name": "The Devil and the Dragon",
            },
            {
                "code": "win",
                "name": "Whispers in Nalubaale",
            },
            {
                "code": "ka",
                "name": "Kampala Ascendent",
            },
            {
                "code": "rar",
                "name": "Reign and Reverie",
            },
            {
                "code": "mo",
                "name": "Magnum Opus",
            },
            {
                "code": "sc19",
                "name": "System Core 2019",
            },
            {
                "code": "df",
                "name": "Downfall",
            },
            {
                "code": "ur",
                "name": "Uprising",
            },
            {
                "code": "sg",
                "name": "System Gateway",
            },
            {
                "code": "su21",
                "name": "System Update 2021",
            },
        ],
        draftedPacks: [],
        draftedPackIds: [],
        allCards: [],
        corpCards: {},
        runnerCards: {},
        runnerIdentities: {},
        corpIdentities: {},
        latestPack: [],
        latestPackName: '',
    },
    methods: {
        reset() {
            this.draftedPacks = [];
            this.draftedPackIds = [];
            this.corpCards = [];
            this.runnerCards = [];
            this.updateIdentities();
            this.latestPack = [];
            this.latestPackName = '';
        },
        draftAPack() {
            let randomPack = this.packIds[Math.floor(Math.random() * this.packIds.length)];

            if (this.draftedPackIds.includes(randomPack.code)) {
                this.draftAPack();
            } else {
                this.draftedPackIds.push(randomPack.code);
                this.draftedPacks.push(randomPack);
                console.log(`Drafting ${randomPack.name}`);
                this.latestPack = [];
                this.latestPackName = randomPack.name;
                this.retrieveInfo(randomPack.code);
                this.updateIdentities();
            }
        },
        retrieveInfo(packCode) {
            let packCards = [];

            for (let x = 0; x < this.allCards.length; x++) {
                if (this.allCards[x].pack_code == packCode) {
                    this.processCard(this.allCards[x]);
                }
            }
        },
        processCard(cardInfo) {
            let relevantCards = {};

            if (cardInfo.side_code == 'runner') {
                relevantCards = this.runnerCards;
            } else {
                relevantCards = this.corpCards;
            }

            if (
                cardInfo.title == 'The Catalyst: Convention Breaker'
                || cardInfo.title == 'The Syndicate: Profit over Principle'
                || cardInfo.title == 'Watch the World Burn'
                || cardInfo.title == 'Hired Help'
            ) {
                return;
            }

            if (!relevantCards[cardInfo.faction_code]) {
                relevantCards[cardInfo.faction_code] = [];
            }

            relevantCards[cardInfo.faction_code].push(cardInfo);
            this.latestPack.push(cardInfo);
        },
        updateIdentities() {
            let runnerIds = {};

            for (let x = 0; x < Object.keys(this.runnerCards).length; x++) {
                let faction = Object.keys(this.runnerCards)[x];
                runnerIds[faction] = this.runnerCards[faction].filter((card) => {
                    return card.type_code == 'identity';
                });
            }

            this.runnerIdentities = runnerIds;

            let corpIds = {};

            for (let x = 0; x < Object.keys(this.corpCards).length; x++) {
                let faction = Object.keys(this.corpCards)[x];
                corpIds[faction] = this.corpCards[faction].filter((card) => {
                    return card.type_code == 'identity';
                });
            }

            this.corpIdentities = corpIds;
        },
    },
    computed: {
        latestPackSorted() {
            return this.latestPack.sort((a, b) => {
                if (a.type_code == 'identity') {
                    return -1;
                }

                if (b.type_code == 'identity') {
                    return 1;
                }

                return (a.type_code > b.type_code) ? 1 : -1;
            });
        }
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    mounted() {
        let vm = this;

        fetch('https://netrunnerdb.com/api/2.0/public/cards')
            .then(response => response.json())
            .then(out => {
                vm.allCards = out.data;
            })
            .catch(err => console.log('Fucked it'));
    },
});
