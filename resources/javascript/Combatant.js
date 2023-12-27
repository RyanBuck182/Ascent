'use strict';

/** An entity which combats. */
class Combatant {
    /**
     * Creates a new combatant.
     * @param {{
     * name: String,
     * identifier: String,
     * room: Room | undefined,
     * maxHealth: Number,
     * health: Number | undefined,
     * onCombatStart: (self: Combatant) => void | undefined, 
     * onRoundStart: (self: Combatant) => void | undefined, 
     * onRoundEnd: (self: Combatant) => void | undefined, 
     * doTurn: (self: Combatant) => void | undefined,
     * onHeal: (self: Combatant, amount: Number) => void | undefined,
     * onTakeDamage: (self: Combatant, amount: Number) => void | undefined,
     * onDeath: (self: Combatant) => void | undefined,
     * extraProperties: Object | undefined,
     * takeHeal: (self: Combatant, amount: Number) => void | undefined,
     * takeDamage: (self: Combatant, amount: Number) => void | undefined,
     * die: (self: Combatant) => void | undefined
     * }} data Data associated with the combatant.
     */
    constructor(data) {
        /** The name of the combatant. */
        this.name = data.name;

        /** The identifier of the combatant. */
        this.identifier = data.identifier;

        /** The room the combatant is in. */
        this.room = data.room;

        /** The combatant's max health. */
        this.maxHealth = data.maxHealth;

        /** The combatant's current health. */
        this.health = data.health || this.maxHealth;

        if (data.onCombatStart)
            this.onCombatStart = () => { data.onCombatStart(this); };
    
        if (data.onRoundStart)
            this.onRoundStart = () => { data.onRoundStart(this); };

        if (data.onRoundEnd)
            this.onRoundEnd = () => { data.onRoundEnd(this); };

        if (data.doTurn)
            this.doTurn = () => { data.doTurn(this); };

        /** Runs when the combatant heals. */
        this.onHeal = data.onHeal || (() => {});

        /** Runs when the combatant takes damage. */
        this.onTakeDamage = data.onTakeDamage || (() => {});

        /** Runs when the combatant dies. */
        this.onDeath = data.onDeath || (() => {});

        let extraPropertyNames = Object.getOwnPropertyNames(data.extraProperties || {});
        for (let i = 0; i < extraPropertyNames.length; i++)
            this[extraPropertyNames[i]] = data.extraProperties[extraPropertyNames[i]];

        if (data.takeHeal)
            this.takeHeal = (amount) => { data.takeHeal(this, amount); };

        if (data.takeDamage)
            this.takeDamage = (amount) => { data.takeDamage(this, amount); };

        if (data.die)
            this.die = () => { data.die(this); };
    }

    /** Runs when combat starts. */
    onCombatStart = () => {};

    /** The combatant's actions on it's turn. If this is undefined, the combatant does nothing on it's turn. */
    doTurn = () => {};

    /** Runs when the round starts. */
    onRoundStart = () => {};

    /** Runs when the round ends. */
    onRoundEnd = () => {};

    /** 
     * Heals the combatant.
     * @param {Number} amount The amount to heal the combatant by.
     */
    takeHeal(amount) {
        this.health += amount;
        if (this.health > this.maxHealth)
            this.health = this.maxHealth;

        this.onHeal(this, amount);
    }

    /**
     * Deals damage to the combatant.
     * @param {Number} amount The amount to damage the combatant by.
     */
    takeDamage(amount) {
        this.health -= amount;
        
        this.onTakeDamage(this, amount);
        
        if (this.health <= 0)
            this.die()
    }

    /** Kills the combatant. */
    die() {
        //fade out animation?
        //remove from room?

        this.onDeath(this);
    }
}