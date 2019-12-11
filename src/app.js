import Vue from 'vue';

import dice from './dice';

new Vue({
    el         : '#app',
    components : {
        dice
    },
    methods    : {
        rollAll() {
            if (this.$refs.dice_1.$data.diceData.state !== 'closed' || this.$refs.dice_2.$data.diceData.state !== 'closed' || this.$refs.dice_3.$data.diceData.state !== 'closed' || this.$refs.dice_4.$data.diceData.state !== 'closed' || this.$refs.dice_5.$data.diceData.state !== 'closed') return;

            window.setTimeout(() => {
                this.$refs.dice_4.rollDice();
            }, 0);
            window.setTimeout(() => {
                this.$refs.dice_3.rollDice();
            }, 200);
            window.setTimeout(() => {
                this.$refs.dice_2.rollDice();
            }, 400);
            window.setTimeout(() => {
                this.$refs.dice_1.rollDice();
            }, 600);
            window.setTimeout(() => {
                this.$refs.dice_5.rollDice();
            }, 800);
        },
        closeAll() {
            this.$refs.dice_1.closeDice();
            this.$refs.dice_2.closeDice();
            this.$refs.dice_3.closeDice();
            this.$refs.dice_4.closeDice();
            this.$refs.dice_5.closeDice();
        }
    }
});
