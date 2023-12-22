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

stateMachine();

//------------------------------------------------------------------------------------------
//--------------------------------------MAIN MENU-------------------------------------------
//------------------------------------------------------------------------------------------

/**
 * Displays the main menu.
 * @returns {State} The game state.
 */
async function mainMenu() {
    PseudoConsole.newLine();
    await displayTitle();
    await displayDivider();

    let coords = await PseudoConsole.printByChar('\n\nEnter something: ');
    let input = await PseudoConsole.getTextInput(coords.end);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    await PseudoConsole.printByChar('\n\nPress enter to continue...');
    await PseudoConsole.waitForEnter();
    await PseudoConsole.printByChar('\nYou pressed enter!!!');
    wait(200);
    await PseudoConsole.printByChar('\n' + ('\n§text-rainbow§asynchronous rainbows§/§').repeat(5));
    await PseudoConsole.printByLine('\n' + ('\n§text-rainbow§asynchronous rainbows§/§').repeat(5), 50);
    await PseudoConsole.printByChar('\n' + ('\n§text-rainbow-synchronous§synchronous rainbows§/§').repeat(5));
    await PseudoConsole.printByLine('\n\n'+ setWidth('§text-rainbow-synchronous§♥§/§', 'center'));

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
    await PseudoConsole.printByLine('-'.repeat(PseudoConsole.MAX_CHARS_PER_LINE));
}