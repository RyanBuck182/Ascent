'use strict';

/** An entity which combats. */
class Combatant {
    /**
     * Creates a new combatant.
     * @param {{
     *            name: String,
     *      identifier: String,
     *            room: Room,
     *          health: Number,
     *       maxHealth: Number,
     *   onCombatStart: (self: Combatant) => void | undefined, 
     *          onTurn: (self: Combatant) => void | undefined,
     *          onHeal: (self: Combatant) => void | undefined,
     *    onTakeDamage: (self: Combatant) => void | undefined,
     *         onDeath: (self: Combatant) => void | undefined,
     * extraProperties: Object | undefined
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

        /** Runs after combat starts. */
        this.onCombatStart = data.onCombatStart || (() => {});
    
        /** The combatant's actions on it's turn. If this is undefined, the combatant does nothing on it's turn. */
        this.onTurn = data.onTurn || (() => {});

        /** Runs after the combatant heals. */
        this.onHeal = data.onHeal || (() => {});

        /** Runs after the combatant takes damage. */
        this.onTakeDamage = data.onTakeDamage || (() => {});

        /** Runs after the combatant dies. */
        this.onDeath = data.onDeath || (() => {});

        let extraPropertyNames = Object.getOwnPropertyNames(data.extraProperties || {});
        for (let i = 0; i < extraPropertyNames.length; i++)
            this[extraPropertyNames[i]] = data.extraProperties[extraPropertyNames[i]];
    }

    startCombat() {
        //start of combat stuff 

        this.onCombatStart(this);
    }

    doTurn() {
        this.onTurn(this);
    }

    heal(amount) {
        //heal

        this.onHeal(this);
    }

    damage(damage, trueDamage = 0) {
        //damage calculations

        this.onTakeDamage(this);
    }

    die() {
        //death stuff

        this.onDeath(this);
    }
}