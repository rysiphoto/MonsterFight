new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();

    },
    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster hard for " + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },

    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player for " + damage
      })
      this.checkWin();
    },

    heal: function () {
      var health = 10;
      if (this.playerHealth <= 90) {
        this.playerHealth += health;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isHealth: true,
        isPlayer: true,
        text: "Player is healed for " + health
      });
      this.monsterAttacks();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },

    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You died! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }

});