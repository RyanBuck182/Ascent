'use strict';

/** A room. */
class Room {
    /**
     * Randomly generates a room.
     * @param {Number} difficulty
     */
    static generateRoom() {
        //to define
    }

    /**
     * Creates a new room.
     * @param {{
     * onEntry: (self: Room) => void | undefined,
     * onExit: (self: Room) => void | undefined,
     * combatants: Array<Combatant> | undefined,
     * onCombatStart: (self: Room) => void | undefined,
     * onCombatEnd: (self: Room) => void | undefined,
     * onRoundStart: (self: Room) => void | undefined,
     * onRoundEnd: (self: Room) => void | undefined,
     * extraProperties: Object | undefined,
     * enterRoom: (self: Room) => void | undefined,
     * exitRoom: (self: Room) => void | undefined,
     * playRoom: (self: Room) => void | undefined
     * }} data Data associated with the room.
     */
    constructor(data) {        
        /** A function to be performed on room entry. */
        this.onEntry = data.onEntry || (() => {});
        
        /** A function to be performed on room exit. */
        this.onExit = data.onExit || (() => {});

        /** The room's combatants. */
        this.combatants = data.combatants || [];

        /** Runs when combat starts. */
        this.onCombatStart = data.onCombatStart || (() => {});

        /** Runs when combat ends. */
        this.onCombatEnd = data.onCombatEnd || (() => {});

        /** Runs when a combat round starts. */
        this.onRoundStart = data.onRoundStart || (() => {});

        /** Runs when a combat round ends. */
        this.onRoundEnd = data.onRoundEnd || (() => {});

        let extraPropertyNames = Object.getOwnPropertyNames(data.extraProperties || {});
        for (let i = 0; i < extraPropertyNames.length; i++)
            this[extraPropertyNames[i]] = data.extraProperties[extraPropertyNames[i]];

        if (data.enterRoom)
            this.enterRoom = () => { data.enterRoom(this); };

        if (data.exitRoom)
            this.exitRoom = () => { data.exitRoom(this); };

        if (data.playRoom)
            this.playRoom = () => { data.playRoom(this); };
    }

    /** Enters the room. */
    enterRoom() {
        //Entrance stuff

        this.onEntry(this);
    }

    /** Plays the room (usually means combat). */
    playRoom() {
        this.onCombatStart(this);
        this.combatants.forEach(combatant => combatant.onCombatStart())

        while (this.combatants.find(combatant => typeof combatant == Enemy) != undefined) {
            this.onRoundStart(this);
            this.combatants.forEach(combatant => combatant.onRoundStart());

            //display stats

            //player should be first in combatant list, so player should go first
            this.combatants.forEach(combatant => combatant.doTurn());

            this.onRoundEnd(this);
            this.combatants.forEach(combatant => combatant.onRoundEnd());
            break; //temporary to prevent inf loop while testing
        }
        
        
        //win message and stuff

        this.onCombatEnd(this);
    }

    /** Exits the room. */
    exitRoom() {
        this.onExit(this);

        //Exit stuff
    }
}