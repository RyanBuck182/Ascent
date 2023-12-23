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
    let input = await PseudoConsole.getUserInput(coords.end);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter something less than or equal to 10 characters: ');
    input = await PseudoConsole.getTextInput(coords.end, undefined, 10);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter something greater than or equal to 5 characters: ');
    input = await PseudoConsole.getTextInput(coords.end, 5);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter something between 5 and 10 characters: ');
    input = await PseudoConsole.getTextInput(coords.end, 5, 10);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter an integer: ');
    input = await PseudoConsole.getIntegerInput(coords.end);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter an integer less than or equal to 10: ');
    input = await PseudoConsole.getIntegerInput(coords.end, undefined, 10);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter an integer greater than or equal to 5: ');
    input = await PseudoConsole.getIntegerInput(coords.end, 5);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    coords = await PseudoConsole.printByChar('\n\nEnter an integer between 5 and 10: ');
    input = await PseudoConsole.getIntegerInput(coords.end, 5, 10);
    await PseudoConsole.printByChar('\nInput: \"' + input + '\"');
    wait(200);
    await PseudoConsole.printByChar('\n\nPress enter to continue...');
    await PseudoConsole.waitForEnter();
    await PseudoConsole.printByChar('\nYou pressed enter!!!');
    wait(200);
    await PseudoConsole.printByChar('\n' + ('\n§text-rainbow§asynchronous rainbows§/§').repeat(5));
    await PseudoConsole.printByLine('\n' + ('\n§text-rainbow§asynchronous rainbows§/§').repeat(5), 50);
    await PseudoConsole.printByChar('\n' + ('\n§text-rainbow-sync§synchronous rainbows§/§').repeat(5));
    await PseudoConsole.printByChar('\n\n' + '§text-candy-cane§CANDYCANE§/§');

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
        setWidth("###  ##   ## ##    ## ##   ### ###  ###  ##   ####  ", 'center')
    );
    await PseudoConsole.printInstant('§//§');
}

/** Displays a divider to the screens. */
async function displayDivider() {
    await PseudoConsole.printByLine('§text-christmas§' + '═'.repeat(PseudoConsole.MAX_CHARS_PER_LINE) + '§/§');
}