'use strict';

/** An entity which combats. */
class Combatant {
    /**
     * Creates a new combatant.
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

        /** The combatant's current health. */
        this.health = data.health;

        /** The combatant's max health. */
        this.maxHealth = data.maxHealth;

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
            this.takeHeal = () => { data.takeHeal(this); };

        if (data.takeDamage)
            this.takeDamage = () => { data.takeDamage(this); };

        if (data.die)
            this.die = () => { data.die(this); };
    }

    /** Runs when combat starts. */
    onCombatStart() {}

    /** The combatant's actions on it's turn. If this is undefined, the combatant does nothing on it's turn. */
    doTurn() {}

    /** Runs when the round starts. */
    onRoundStart() {}

    /** Runs when the round ends. */
    onRoundEnd() {}

    /** Heals the combatant. */
    takeHeal(amount) {
        //heal

        this.onHeal(this);
    }

    /** Deals damage to the combatant. */
    takeDamage(damage, trueDamage = 0) {
        //damage calculations

        this.onTakeDamage(this);
    }

    /** Kills the combatant. */
    die() {
        //death stuff

        this.onDeath(this);
    }
}