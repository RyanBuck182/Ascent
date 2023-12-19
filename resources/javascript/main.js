'use strict';

//------------------------------------------------------------------------------------------
//------------------------------------STATE MACHINE-----------------------------------------
//------------------------------------------------------------------------------------------

/**
 * A game state.
 * @typedef {'start' | 'mainMenu' | 'quit'} State
 */

/**
 * Plays the game.
 * @param {State} state the game state
 */
async function stateMachine(state) {
    state = 'start';
    while (state != 'quit') {
        switch (state) {
            case 'start':
                state = 'mainMenu';
                break;
            case 'mainMenu':
                state = mainMenu();
                break;
            default:
                state = 'quit';
                break;
        }
    }
}

//------------------------------------------------------------------------------------------
//--------------------------------------MAIN MENU-------------------------------------------
//------------------------------------------------------------------------------------------

/**
 * Displays the main menu.
 * @returns {State} the game state
 */
async function mainMenu() {
    await displayTitle();
    await displayDivider();
    await PseudoConsole.printByChar('wasdwa§text-red§test§/§wadas');
    return 'quit';
}

//------------------------------------------------------------------------------------------
//-------------------------------------DISPLAY----------------------------------------------
//------------------------------------------------------------------------------------------

/** Displays the title image to the screen. */
async function displayTitle() {
    await PseudoConsole.printByChar(
        setWidth("  ##      ## ##    ## ##   ### ###  ###  ##  #### ##", 'center') + '\n' +
        setWidth(" ## ##   ##   ##  ##   ##   ##  ##    ## ##  # ## ##", 'center') + '\n' +
        setWidth(" ##  ##  ####     ##        ##       # ## #    ##   ", 'center') + '\n' +
        setWidth(" ##  ##   #####   ##        ## ##    ## ##     ##   ", 'center') + '\n' +
        setWidth(" ## ###      ###  ##        ##       ##  ##    ##   ", 'center') + '\n' +
        setWidth(" ##  ##  ##   ##  ##   ##   ##  ##   ##  ##    ##   ", 'center') + '\n' +
        setWidth("###  ##   ## ##    ## ##   ### ###  ###  ##   ####  ", 'center')
    );
}

/** Displays a divider to the screens. */
async function displayDivider() {
    await PseudoConsole.printByChar('-'.repeat(MAX_CHARS_PER_LINE));
}

/** Updates pseudo console font sizes. Runs when the page is resized. */
function updateFontSizes() {
    let lines = document.querySelectorAll('.consoleRow');

    for (let i = 0; i < lines.length; i++)
        lines[i].style.fontSize = PseudoConsole.pseudoConsoleFontSize();
}

//------------------------------------------------------------------------------------------
//---------------------------------------EVENTS---------------------------------------------
//------------------------------------------------------------------------------------------

window.addEventListener('resize', updateFontSizes);

//------------------------------------------------------------------------------------------
//-----------------------------------INITIALIZATION-----------------------------------------
//------------------------------------------------------------------------------------------

updateFontSizes();
stateMachine('start');