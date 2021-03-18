const form = document.getElementById("form_score");

vueapp = new Vue({
        el: '#vue-app',
        data: {
            score: 0,
            high_score: 0,

            cell_0: {
                num: 0,
                cs: ""
            },
            cell_1: {
                num: 0,
                cs: ""
            },
            cell_2: {
                num: 0,
                cs: ""
            },
            cell_3: {
                num: 0,
                cs: ""
            },
            cell_4: {
                num: 0,
                cs: ""
            },
            cell_5: {
                num: 0,
                cs: ""
            },
            cell_6: {
                num: 0,
                cs: ""
            },
            cell_7: {
                num: 0,
                cs: ""
            },
            cell_8: {
                num: 0,
                cs: ""
            },
            cell_9: {
                num: 0,
                cs: ""
            },
            cell_10: {
                num: 0,
                cs: ""
            },
            cell_11: {
                num: 0,
                cs: ""
            },
            cell_12: {
                num: 0,
                cs: ""
            },
            cell_13: {
                num: 0,
                cs: ""
            },
            cell_14: {
                num: 0,
                cs: ""
            },
            cell_15: {
                num: 0,
                cs: ""
            }
        },

        methods: {
            calculateColor: function (x) {

                switch (x) {
                    case(1):
                        return "palegreen"
                        break;
                    case(2):
                        return "aquamarine";
                        break;
                    case(4):
                        return "aqua";
                        break;
                    case(8):
                        return "darkturquoise";
                        break;
                    case(16):
                        return "deepskyblue";
                        break;
                    case(32):
                        return "dodgerblue";
                        break;
                    case(64):
                        return "royalblue";
                        break;
                    case(128):
                        return "mediumslateblue";
                        break;
                    case(256):
                        return "slateblue";
                        break;
                    case(512):
                        return "rebeccapurple";
                        break;
                    case(1024):
                        return "darkorchid";
                        break;
                    case(2048):
                        return "darkmagenta";
                        break;
                    default:
                        return "aliceBlue";
                        break;
                }
            },

            nextMove: function () {
                let lost = true;

                for (let i = 0; i < 32; i++) {
                    let randomNum = Math.floor(Math.random() * Math.floor(16))

                    if (vueapp.$data["cell_" + randomNum].num === 0) {
                        lost = false;
                        vueapp.$data["cell_" + randomNum].num = 2;
                        break;
                    }
                }

                if (lost) {
                    document.getElementById("row").hidden = true;
                    document.getElementById("add_score").style.display = "block";

                    return;
                }

                for (let i = 0; i < 16; i++) {
                    vueapp.$data["cell_" + i].cs = this.calculateColor(vueapp.$data["cell_" + i].num);
                }
            },

            keyPress: function (direction) {
                let blocks = [];
                for (let i = 0; i < 16; i++) {
                    if (vueapp.$data["cell_" + i].num !== 0) {
                        blocks.push(i);
                    }
                }

                if (direction === -1) {
                    for (const block of blocks) {
                        let position = block - block % 4;

                        while (true) {
                            if (vueapp.$data["cell_" + (position)].num === 0 || position === block) {

                                if (position !== block) {
                                    vueapp.$data["cell_" + (position)].num = vueapp.$data["cell_" + block].num;
                                    vueapp.$data["cell_" + block].num = 0;
                                }
                                if (vueapp.$data["cell_" + (position - 1)] !== undefined && vueapp.$data["cell_" + (position)].num === vueapp.$data["cell_" + (position - 1)].num) {
                                    if (position !== 4 && position !== 8 && position !== 12) {
                                        vueapp.$data["cell_" + (position - 1)].num *= 2;
                                        vueapp.$data["cell_" + position].num = 0;

                                        this.score += vueapp.$data["cell_" + (position - 1)].num;
                                    }
                                }
                                break;
                            }
                            position++;
                        }
                    }
                }

                if (direction === 1) {
                    for (let block of blocks.reverse()) {
                        let position = block + (3 - block % 4);

                        while (true) {
                            if (vueapp.$data["cell_" + (position)].num === 0 || position === block) {

                                if (position !== block) {
                                    vueapp.$data["cell_" + (position)].num = vueapp.$data["cell_" + block].num;
                                    vueapp.$data["cell_" + block].num = 0;
                                }
                                if (vueapp.$data["cell_" + (position + 1)] !== undefined && vueapp.$data["cell_" + (position)].num === vueapp.$data["cell_" + (position + 1)].num) {

                                    if (position !== 3 && position !== 7 && position !== 11) {
                                        vueapp.$data["cell_" + (position + 1)].num *= 2;
                                        vueapp.$data["cell_" + position].num = 0;

                                        this.score += vueapp.$data["cell_" + (position + 1)].num;
                                    }
                                }
                                break;
                            }
                            position--;
                        }
                    }
                }

                if (direction === -4) {
                    for (let block of blocks) {
                        let position = block % 4;

                        while (true) {
                            if (vueapp.$data["cell_" + (position)].num === 0 || position === block) {

                                if (position !== block) {
                                    vueapp.$data["cell_" + (position)].num = vueapp.$data["cell_" + block].num;
                                    vueapp.$data["cell_" + block].num = 0;
                                }
                                if (vueapp.$data["cell_" + (position - 4)] !== undefined && vueapp.$data["cell_" + (position)].num === vueapp.$data["cell_" + (position - 4)].num) {
                                    if (position !== 1 && position !== 2 && position !== 3) {
                                        vueapp.$data["cell_" + (position - 4)].num *= 2;
                                        vueapp.$data["cell_" + position].num = 0;

                                        this.score += vueapp.$data["cell_" + (position - 4)].num;
                                    }
                                }
                                break;
                            }
                            position += 4;
                        }
                    }
                }

                if (direction === 4) {
                    for (let block of blocks.reverse()) {
                        let position = 12 + block % 4;

                        while (true) {
                            if (vueapp.$data["cell_" + (position)].num === 0 || position === block) {

                                if (position !== block) {
                                    vueapp.$data["cell_" + (position)].num = vueapp.$data["cell_" + block].num;
                                    vueapp.$data["cell_" + block].num = 0;
                                }
                                if (vueapp.$data["cell_" + (position + 4)] !== undefined && vueapp.$data["cell_" + (position)].num === vueapp.$data["cell_" + (position + 4)].num) {
                                    if (position !== 12 && position !== 13 && position !== 14) {
                                        vueapp.$data["cell_" + (position + 4)].num *= 2;
                                        vueapp.$data["cell_" + position].num = 0;

                                        this.score += vueapp.$data["cell_" + (position + 4)].num;
                                    }
                                }
                                break;
                            }
                            position -= 4;
                        }
                    }
                }
                this.nextMove();
            },
        },

        created() {
            window.addEventListener('keydown', (e) => {
                console.log('oof')

                if (e.key === "ArrowUp") {
                    this.keyPress(-4)
                }
                if (e.key === "ArrowDown") {
                    this.keyPress(4)
                }
                if (e.key === "ArrowLeft") {
                    this.keyPress(-1)
                }
                if (e.key === "ArrowRight") {
                    this.keyPress(1)
                }
            });

            form.addEventListener("submit", (e) => {
                console.log("submit")
                e.preventDefault();
                let d = new Date();

                db.collection("scores").add({
                    name: form.player_name.value,
                    score: this.score,
                    date: d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()
                });

                form.player_name.value = "";

                alert("Score saved!");

                location.reload();
            })

            db.collection("scores").get().then(
                snapshot => {
                    snapshot.docs.forEach(
                        doc => {
                            if (this.high_score < doc.data().score) {
                                this.high_score = doc.data().score;
                            }
                        }
                    );
                }
            )
        },
    }
)
vueapp.nextMove();
vueapp.nextMove();

