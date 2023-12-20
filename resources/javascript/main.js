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
    await wait(1000);
    await PseudoConsole.printByChar('wasdwa§text-red§test§/§wadas Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt praesentium quod!');
    PseudoConsole.newLine();
    await PseudoConsole.printByLine('wasdwa§text-red§test§/§wadas Lorem ipsum dolor §text-blue§sit amet consectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt praesentium quod! ');
    await PseudoConsole.printByChar('wasdwa§text-red§test§/§wadas Lorem ipsum dolor sit amet co§/§nsectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt praesentium quod! ');
    return 'quit';
}

//------------------------------------------------------------------------------------------
//-------------------------------------DISPLAY----------------------------------------------
//------------------------------------------------------------------------------------------

/** Displays the title image to the screen. */
async function displayTitle() {
    await PseudoConsole.printByLine(
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
    await PseudoConsole.printByLine('-'.repeat(MAX_CHARS_PER_LINE));
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