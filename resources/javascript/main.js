'use strict';

//------------------------------------------------------------------------------------------
//------------------------------------STATE MACHINE-----------------------------------------
//------------------------------------------------------------------------------------------

/**
 * A game state.
 * @typedef {'start' | 'mainMenu' | 'quit'} State
 */

/** Plays the game. */
async function stateMachine() {
    let state = 'start';
    while (state != 'quit') {
        switch (state) {
            case 'start':
                state = 'main-menu'; //load mods
                break;
            case 'main-menu':
                state = mainMenu();
                break;
            default:
                state = 'quit';
                break;
        }
    }
}

stateMachine();

//------------------------------------------------------------------------------------------
//--------------------------------------MAIN MENU-------------------------------------------
//------------------------------------------------------------------------------------------

/**
 * Displays the main menu.
 * @returns {State} The game state.
 */
async function mainMenu() {
    await displayTitle();
    await displayDivider();

    PLAYER.inventory.push(Weapon.createInstance('ascent:bronze_sword'), Weapon.createInstance('ascent:iron_sword'), Weapon.createInstance('ascent:gun'));

    let testRoom = new Room({
        onEntry: async(self) => {
            await PseudoConsole.printByChar('Entering room!\n');
        },
        combatants: [
            PLAYER,
            Enemy.createInstance('ascent:goblin'),
            Enemy.createInstance('ascent:goblin', {
                name: 'Injured Goblin',
                health: 35,
                image: (() => {
                    let newImage = Enemy.enemyList['ascent:goblin'].image.slice();
                    newImage[1] = '§text-dark-green§' + '/|' + '§text-red§' + '\\' + '§//§';
                    return newImage;
                })()
            }),
            Enemy.createInstance('ascent:goblin', {
                name: 'Gun Goblin',
                minDamage: Number.MAX_SAFE_INTEGER,
                maxDamage: Number.MAX_SAFE_INTEGER
            })
        ]
    });

    await PseudoConsole.printByChar('\n\n');
    await testRoom.enterRoom();
    await testRoom.playRoom();
    await testRoom.exitRoom();

    await PseudoConsole.printByChar('\n\nPress enter to restart...');
    await PseudoConsole.waitForEnter();
    location.reload();

    return 'quit';
}

//------------------------------------------------------------------------------------------
//-------------------------------------DISPLAY----------------------------------------------
//------------------------------------------------------------------------------------------

/** Displays the title image to the screen. */
async function displayTitle() {
    await PseudoConsole.printInstant('§line-text-christmas line-text-christmas-0 / text-bold§');
    await PseudoConsole.printByLine(
        setWidth("  ##      ## ##    ## ##   ### ###  ###  ##  #### ##", 'center') + '\n' +
        setWidth(" ## ##   ##   ##  ##   ##   ##  ##    ## ##  # ## ##", 'center') + '\n' +
        setWidth(" ##  ##  ####     ##        ##       # ## #    ##   ", 'center') + '\n' +
        setWidth(" ##  ##   #####   ##        ## ##    ## ##     ##   ", 'center') + '\n' +
        setWidth(" ## ###      ###  ##        ##       ##  ##    ##   ", 'center') + '\n' +
        setWidth(" ##  ##  ##   ##  ##   ##   ##  ##   ##  ##    ##   ", 'center') + '\n' +
        setWidth("###  ##   ## ##    ## ##   ### ###  ###  ##   ####  ", 'center') + '\n'
    );
    await PseudoConsole.printInstant('§//§');
}

/** Displays a divider to the screens. */
async function displayDivider() {
    await PseudoConsole.printByLine('§text-christmas§' + '═'.repeat(PseudoConsole.MAX_CHARS_PER_LINE) + '§/§');
}