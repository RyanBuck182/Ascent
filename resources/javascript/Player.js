'use strict';


// class Player extends Combatant {
//     /**
//      * The player's inventory.
//      * @type {Array<Item>}
//      */
//     inventory = [];

//     /**
//      * Creates the player.
//      * @param {{
//      * name: String,
//      * identifier: String,
//      * image: Array<String>,
//      * room: Room | undefined,
//      * maxHealth: Number,
//      * health: Number | undefined,
//      * onCombatStart: async(self: Combatant) => void | undefined, 
//      * onRoundStart: async(self: Combatant) => void | undefined, 
//      * onRoundEnd: async(self: Combatant) => void | undefined, 
//      * doTurn: async(self: Combatant) => void | undefined,
//      * onHeal: async(self: Combatant, amount: Number) => void | undefined,
//      * onTakeDamage: async(self: Combatant, amount: Number) => void | undefined,
//      * onDeath: async(self: Combatant) => void | undefined,
//      * extraProperties: Object | undefined,
//      * takeHeal: async(self: Combatant, amount: Number) => void | undefined,
//      * takeDamage: async(self: Combatant, amount: Number) => void | undefined,
//      * die: async(self: Combatant) => void | undefined
//      * }} data Data associated with the combatant.
//      */
//     constructor(data) {
//         super(data);
//     }
// }

const PLAYER = new Combatant({
    name: 'Player',
    identifier: 'ascent:player',
    image: [
        ' o ',
        '/|\\',
        ' | ',
        '/ \\'
    ],
    maxHealth: 100,
    doTurn: async(self) => {
        let weapons = self.inventory.filter(item => item instanceof Weapon);
        let turnMenu = '\n\n';

        let i = 0;
        weapons.forEach(weapon => {
            turnMenu += '(' + (++i) + ') Attack with your ' + weapon.name + '\n';
        });
        turnMenu += '(' + (++i) + ') Do nothing' + '\n';
        turnMenu += 'Your choice: ';

        let coords = await PseudoConsole.printByChar(turnMenu);
        let choice = await PseudoConsole.getIntegerInput(coords.end, 1, i) - 1;

        if (choice < weapons.length)
            await weapons[choice].onUse();

        await PseudoConsole.printByChar('\n');
    },
    die: async(self) => {
        let room = self.room;
        while (room.combatants.length != 0)
            await room.removeCombatant(room.combatants[0]);
    },
    extraProperties: {
        inventory: []
    }
});