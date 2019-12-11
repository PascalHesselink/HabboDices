<template>
    <div v-if="itemId" class="dice">
        <img class="bottom" ref="bottom" @dblclick="closeDice" src="img/dice/bottom.png"/>
        <img class="top-closed" ref="top-closed" v-show="diceData.state === 'closed'" @dblclick="rollDice" src="img/dice/top-closed.png"/>
        <img class="top-opened" ref="top-opened" v-show="diceData.state === 'open' || diceData.state === 'rolling'" @dblclick="rollDice" src="img/dice/top-opened.png"/>
        <img class="rolling-dice" ref="rolling-dice" v-show="diceData.state === 'rolling'" @dblclick="rollDice" :src="'img/dice/' + rollingDice + '.png'"/>
        <img class="dice-number1" ref="dice-number1" v-show="diceData.state === 'open' && diceData.value === 1" @dblclick="rollDice" src="img/dice/number1.png"/>
        <img class="dice-number2" ref="dice-number2" v-show="diceData.state === 'open' && diceData.value === 2" @dblclick="rollDice" src="img/dice/number2.png"/>
        <img class="dice-number3" ref="dice-number3" v-show="diceData.state === 'open' && diceData.value === 3" @dblclick="rollDice" src="img/dice/number3.png"/>
        <img class="dice-number4" ref="dice-number4" v-show="diceData.state === 'open' && diceData.value === 4" @dblclick="rollDice" src="img/dice/number4.png"/>
        <img class="dice-number5" ref="dice-number5" v-show="diceData.state === 'open' && diceData.value === 5" @dblclick="rollDice" src="img/dice/number5.png"/>
        <img class="dice-number6" ref="dice-number6" v-show="diceData.state === 'open' && diceData.value === 6" @dblclick="rollDice" src="img/dice/number6.png"/>
    </div>
</template>

<script>
    export default {
        props    : {
            itemId : {
                type     : Number,
                required : true
            }
        },
        data() {
            return {
                oddDiceRollingState : true,
                diceData            : {
                    state : 'rolling',
                    value : null
                }
            }
        },
        mounted() {
            setInterval(() => {
                this.oddDiceRollingState = !this.oddDiceRollingState;
            }, 55);

            this.restoreDice();

            if (this.diceData.state === 'rolling' && this.diceData.value) {
                setTimeout(() => {
                    this.diceData.state = 'open';
                }, 1500)
            } else if (this.diceData.state !== 'open') {
                this.diceData.state = 'closed';
            }
        },
        computed : {
            rollingDice() {
                if (this.oddDiceRollingState === false) {
                    return 'rolling_1';
                } else {
                    return 'rolling_2';
                }
            }
        },
        methods  : {
            rollDice() {
                if (this.diceData.state === 'rolling') return;

                this.diceData.state = 'rolling';
                this.diceData.value = Math.floor(Math.random() * 6) + 1;

                setTimeout(() => {
                    if (this.diceData.state === 'rolling')
                        this.diceData.state = 'open';
                }, 1500)
            },
            closeDice() {
                this.diceData.state = 'closed';
                this.diceData.value = null;
            },
            restoreDice() {
                if (localStorage.getItem('dice_' + this.itemId)) {
                    this.diceData = JSON.parse(localStorage.getItem('dice_' + this.itemId));
                } else {
                    localStorage.setItem('dice_' + this.itemId, JSON.stringify(this.diceData));
                }
            }
        },
        watch    : {
            diceData : {
                handler : function (newVal) {
                    localStorage.setItem('dice_' + this.itemId, JSON.stringify(newVal));
                },
                deep    : true
            }
        }
    }
</script>

<style scoped>
    img {
        image-rendering   : pixelated;
        -webkit-user-drag : none;
        -khtml-user-drag  : none;
        -moz-user-drag    : none;
        -o-user-drag      : none;
        user-drag         : none;
    }

    .dice {
        @apply absolute;
        width  : 56px;
        height : 80px;
    }

    .dice img {
        @apply absolute;
    }

    .bottom {
        left   : 4px;
        bottom : 0px;
    }

    .top-closed {
        left   : 0px;
        bottom : 33px;
    }

    .top-opened {
        left   : 0px;
        bottom : 25px;
    }

    .rolling-dice,
    .dice-number1,
    .dice-number2,
    .dice-number3,
    .dice-number4,
    .dice-number5,
    .dice-number6 {
        left   : 17px;
        bottom : 49px;
    }
</style>