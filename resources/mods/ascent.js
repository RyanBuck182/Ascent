'use strict';
{

const MOD_ID = 'ascent:';

//------------------------------------------------------------------------------------------
//---------------------------------------ENEMIES--------------------------------------------
//------------------------------------------------------------------------------------------

new Enemy({
    name: 'Goblin',
    identifier: MOD_ID + 'goblin',
    image: [
        '§text-dark-green§ o §/§',
        '§text-dark-green§/|\\§/§',
        '§text-dark-green§/ \\§/§'
    ],
    maxHealth: 60,
    doTurn: async(self) => {
        let damage = generateRandomInteger(self.minDamage, self.maxDamage);
        
        await PseudoConsole.printByChar('\nThe ' + self.name + ' attacks you for ' + damage + ' damage.');

        let player = self.room.combatants[0];
        await player.takeDamage(damage);
    },
    extraProperties: {
        minDamage: 3,
        maxDamage: 5
    },
    generable: true,
    difficulty: 1
});

//------------------------------------------------------------------------------------------
//----------------------------------------ITEMS---------------------------------------------
//------------------------------------------------------------------------------------------

new Weapon({
    name: 'Bronze Sword',
    identifier: MOD_ID + 'bronze_sword',
    rarity: 'Common',
    generable: true,
    onUse: async(self) => {
        let potentialTargets = PLAYER.room.combatants.filter(combatant => combatant instanceof Enemy);
        let attackMenu = '\n\n';

        let i = 0;
        potentialTargets.forEach(potentialTarget => {
            attackMenu += '(' + (++i) + ') Attack ' + potentialTarget.name + '\n';
        });
        attackMenu += 'Your choice: ';

        let coords = await PseudoConsole.printByChar(attackMenu);
        let choice = await PseudoConsole.getIntegerInput(coords.end, 1, i) - 1;

        let target = potentialTargets[choice];
        let damage = generateRandomInteger(self.minDamage, self.maxDamage);

        await PseudoConsole.printByChar('\n\nYou attack ' + target.name + ' with your ' + self.name + ' for ' + damage + ' damage.');

        await target.takeDamage(damage);
    },
    extraProperties: {
        minDamage: 3,
        maxDamage: 5
    }
});

new Weapon({
    name: 'Iron Sword',
    identifier: MOD_ID + 'iron_sword',
    rarity: 'Uncommon',
    generable: true,
    onUse: async(self) => {
        let potentialTargets = PLAYER.room.combatants.filter(combatant => combatant instanceof Enemy);
        let attackMenu = '\n\n';

        let i = 0;
        potentialTargets.forEach(potentialTarget => {
            attackMenu += '(' + (++i) + ') Attack ' + potentialTarget.name + '\n';
        });
        attackMenu += 'Your choice: ';

        let coords = await PseudoConsole.printByChar(attackMenu);
        let choice = await PseudoConsole.getIntegerInput(coords.end, 1, i) - 1;

        let target = potentialTargets[choice];
        let damage = generateRandomInteger(self.minDamage, self.maxDamage);

        await PseudoConsole.printByChar('\n\nYou attack ' + target.name + ' with your ' + self.name + ' for ' + damage + ' damage.');
        
        await target.takeDamage(damage);
    },
    extraProperties: {
        minDamage: 5,
        maxDamage: 7
    }
});

new Weapon({
    name: 'Gun',
    identifier: MOD_ID + 'gun',
    rarity: 'Gun',
    generable: false,
    onUse: async(self) => {
        let potentialTargets = PLAYER.room.combatants.filter(combatant => combatant instanceof Enemy);
        let attackMenu = '\n\n';

        let i = 0;
        potentialTargets.forEach(potentialTarget => {
            attackMenu += '(' + (++i) + ') Attack ' + potentialTarget.name + '\n';
        });
        attackMenu += 'Your choice: ';

        let coords = await PseudoConsole.printByChar(attackMenu);
        let choice = await PseudoConsole.getIntegerInput(coords.end, 1, i) - 1;

        let target = potentialTargets[choice];

        await PseudoConsole.printByChar('\n\nYou shot ' + target.name + ' with your ' + self.name + ' for ' + self.damage + ' damage.');

        await target.takeDamage(self.damage);
    },
    extraProperties: {
        damage: Number.MAX_SAFE_INTEGER
    }
});

//------------------------------------------------------------------------------------------
//-----------------------------------------TEXT---------------------------------------------
//------------------------------------------------------------------------------------------

new PseudoCSSClass('text-bold', {
    styleElement: (self, element) => { element.style.fontWeight = 'bold'; }
});
new PseudoCSSClass('text-italic', {
    styleElement: (self, element) => { element.style.fontStyle = 'italic'; }
});

new PseudoCSSClass('text-red', {
    styleElement: (self, element) => { element.style.color = 'rgb(255, 0, 0)'; }
});
new PseudoCSSClass('text-dark-green', {
    styleElement: (self, element) => { element.style.color = 'rgb(0, 128, 0)'; }
});
new PseudoCSSClass('text-blue', {
    styleElement: (self, element) => { element.style.color = 'rgb(0, 115, 255)'; }
});
new PseudoCSSClass('text-white', {
    styleElement: (self, element) => { element.style.color = 'rgb(255, 255, 255)'; }
});

new PseudoCSSClass('text-candy-cane', {
    styleElement: (self, element) => {
        if (self.cycle % self.cycles === 0)
            PseudoCSSClass.getClassFromId('text-red').styleElement(element);
        else
            PseudoCSSClass.getClassFromId('text-white').styleElement(element);
        self.cycle++;
    },
    extraProperties: { cycle: 0, cycles: 2 }
});
PseudoCSSClass.createCyclePositioners('text-candy-cane');

new PseudoCSSClass('text-christmas', {
    styleElement: (self, element) => {
        if (self.cycle % self.cycles === 0)
            PseudoCSSClass.getClassFromId('text-red').styleElement(element);
        else
            PseudoCSSClass.getClassFromId('text-dark-green').styleElement(element);
        self.cycle++;
    },
    extraProperties: { cycle: 0, cycles: 2 }
});
PseudoCSSClass.createCyclePositioners('text-christmas');

new PseudoCSSClass('text-rainbow', {
    styleElement: (self, element) => {
        let rainbowText = [
            { offset: (0/12), color: 'rgb(255, 0, 0)'},
            { offset: (1/12), color: 'rgb(255, 155, 0)'},
            { offset: (3/12), color: 'rgb(255, 255, 0)' },
            { offset: (5/12), color: 'rgb(0, 255, 0)' },
            { offset: (7/12), color: 'rgb(0, 0, 255)' },
            { offset: (9/12), color: 'rgb(155, 0, 255)'},
            { offset: (11/12), color: 'rgb(255, 0, 255)'},
            { offset: (12/12), color: 'rgb(255, 0, 0)'}
        ];

        let animation = element.animate(rainbowText, {
            duration: self.animationDuration,
            easing: 'ease-in-out',
            iterations: Infinity,
            id: self.identifier
        });
    },
    extraProperties: { animationDuration: 3000 }
});
PseudoCSSClass.createSynchronousAnimation('text-rainbow');

new PseudoCSSClass('text-pulse-red', {
    styleElement: (self, element) => {
        let rainbowText = [
            { offset: (0/2), color: 'rgb(255, 255, 255)'},
            { offset: (1/2), color: 'rgb(255, 0, 0)'},
            { offset: (2/2), color: 'rgb(255, 255, 255)' },
        ];

        let animation = element.animate(rainbowText, {
            duration: self.animationDuration,
            easing: 'ease-in-out',
            iterations: 1,
            id: self.identifier
        });
    },
    extraProperties: { animationDuration: 3000 }
});
PseudoCSSClass.createSynchronousAnimation('text-pulse-red');

//------------------------------------------------------------------------------------------
//---------------------------------------LINE TEXT------------------------------------------
//------------------------------------------------------------------------------------------

new PseudoCSSClass('line-text-candy-cane', {
    styleElement: (self, element) => {
        if (element.parentElement !== self.line) {
            self.line = element.parentElement;
            self.cycle++;
        } else {
            if (self.cycle % self.cycles === 0)
                PseudoCSSClass.getClassFromId('text-red').styleElement(element);
            else
                PseudoCSSClass.getClassFromId('text-white').styleElement(element);
        }
    },
    extraProperties: { cycle: 0, cycles: 2, line: undefined }
});
PseudoCSSClass.createCyclePositioners('line-text-candy-cane');

new PseudoCSSClass('line-text-christmas', {
    styleElement: (self, element) => {
        if (element.parentElement !== self.line) {
            self.line = element.parentElement;
            self.cycle++;
        } else {
            if (self.cycle % self.cycles === 0)
                PseudoCSSClass.getClassFromId('text-red').styleElement(element);
            else
                PseudoCSSClass.getClassFromId('text-dark-green').styleElement(element);
        }
    },
    extraProperties: { cycle: 0, cycles: 2, line: undefined }
});
PseudoCSSClass.createCyclePositioners('line-text-christmas');

//------------------------------------------------------------------------------------------
//--------------------------------------BACKGROUNDS-----------------------------------------
//------------------------------------------------------------------------------------------

new PseudoCSSClass('background-red', {
    styleElement: (self, element) => { element.style.backgroundColor = 'rgb(255, 0, 0)'; }
});
new PseudoCSSClass('background-blue', {
    styleElement: (self, element) => { element.style.backgroundColor = 'rgb(0, 115, 255)'; }
});
new PseudoCSSClass('background-white', {
    styleElement: (self, element) => { element.style.backgroundColor = 'rgb(0, 115, 255)'; }
});
new PseudoCSSClass('background-inherit', {
    styleElement: (self, element) => { element.style.backgroundColor = 'inherit'; }
});

new PseudoCSSClass('background-candy-cane', {
    styleElement: (self, element) => {
        if (self.cycle % self.cycles === 0)
            PseudoCSSClass.getClassFromId('background-red').styleElement(element);
        else
            PseudoCSSClass.getClassFromId('background-white').styleElement(element);
        self.cycle++;
    },
    extraProperties: { cycle: 0, cycles: 2 }
});
PseudoCSSClass.createCyclePositioners('background-candy-cane');

}