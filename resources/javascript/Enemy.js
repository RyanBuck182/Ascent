'use strict';

/** An enemy of the player. */
class Enemy extends Combatant {
    /**
     * A list of all defined enemies.
     * @type {Object}
     */
    static #enemyList = {};

    /**
     * Getter for #enemyList.
     * @returns {Object} A list of all defined enemies.
     */
    static get enemyList() {
        return this.#enemyList;
    }

    /**
     * An array of all generable enemies, sorted from least to most difficult.
     * @type {Array<Enemy>}
     */
    static #generableEnemyList = [];

    /**
     * Getter for #generableEnemyList.
     * @returns {Array<Enemy>} An array of all generable enemies, sorted from least to most difficult.
     */
    static get generableEnemyList() {
        return this.#generableEnemyList;
    }

    /**
     * Randomly generates an array of enemies.
     * @param {Number} difficulty The combined difficulty of the enemies to generate.
     * @param {Number} count The number of enemies to generate.
     */
    static generateEnemies(difficulty, count) {
        //to define
    }

    /**
     * Defines an enemy to be used for combat.
     * @param {{
     * name: String,
     * identifier: String,
     * room: Room | undefined,
     * health: Number,
     * maxHealth: Number,
     * onCombatStart: (self: Combatant) => void | undefined, 
     * onRoundStart: (self: Combatant) => void | undefined, 
     * onRoundEnd: (self: Combatant) => void | undefined, 
     * doTurn: (self: Combatant) => void | undefined,
     * onHeal: (self: Combatant) => void | undefined,
     * onTakeDamage: (self: Combatant) => void | undefined,
     * onDeath: (self: Combatant) => void | undefined,
     * extraProperties: Object | undefined,
     * takeHeal: (self: Combatant) => void | undefined,
     * takeDamage: (self: Combatant) => void | undefined,
     * die: (self: Combatant) => void | undefined,
     * extraProperties: {} | undefined,
     * generable: Boolean,
     * difficulty: Number
     * }} data Data associated with the enemy.
     */
    static defineEnemy(data) {
        let enemy = super(data);
        
        enemy.generable = data.generable;
        enemy.difficulty = data.difficulty;

        this.#enemyList[data.identifier] = enemy;

        if (enemy.generable) {
            let insertionPoint = -1;

            let lowerBound = 0;
            let upperBound = this.#generableEnemyList.length - 1;
            while (lowerBound <= upperBound) {
                let midPoint = Math.floor((upperBound + lowerBound) / 2);
                if (enemy.difficulty > this.#generableEnemyList[midPoint].difficulty)
                    lowerBound = midPoint + 1;
                else if (enemy.difficulty < this.#generableEnemyList[midPoint].difficulty)
                    upperBound = midPoint - 1;
                else
                    insertionPoint = midPoint;
            }
            if (insertionPoint == -1)
                insertionPoint = lowerBound;

            this.#generableEnemyList.splice(insertionPoint, 0, enemy);
        }
    }

    /**
     * Creates an enemy from an instance.
     * @param {String} identifier The identifier of enemy to create an instance of.
     * @param {Object | undefined} modifiedProperties Properties of the enemy to overwrite for this instance.
     */
    constructor(identifier, modifiedProperties) {
        this = Enemy.#enemyList[identifier];
        
        let modifiedPropertyNames = Object.getOwnPropertyNames(modifiedProperties);
        for (let i = 0; i < modifiedPropertyNames.length; i++)
            this[modifiedPropertyNames[i]] = modifiedProperties[modifiedPropertyNames[i]];
    }

    /** 
     * Whether the enemy can be generated for random encounters.
     * @type {Boolean}
     */
    generable;

    /** 
     * The difficulty of the enemy.
     * @type {Number}
     */
    difficulty;
}