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
    await wait(500);
    await PseudoConsole.printInstant('wasdwa§text-red§test§/§wadas Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt praesentium quod!');
    PseudoConsole.newLine();
    await PseudoConsole.printInstant('wasdwa§text-red§test§/§wadas Lorem ipsum dolor §text-blue§sit amet consectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt praesentium quod! ');
    await PseudoConsole.printInstant('wasdwa§text-red§test§/§wadas Lorem ipsum dolor sit amet co§/§nsectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt praesentium quod! ');
    await wait(500);
    PseudoConsole.printInstant('wasdwa§text-red§test§/§wadas Lorem ipsum dolor §text-blue§sit amet consectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt§/§ praesentium quod! ');
    await wait(500);
    PseudoConsole.clearLine(PseudoConsole.lines().length - 3);
    await wait(500);
    await PseudoConsole.printInstant("should be white §text-blue§should be blue §text-red§should be red §text-blue§should be blue §/§should be red §/§should be blue §/§should be white")
    await wait(500);
    PseudoConsole.printInstant('wasdwa§text-red§test§/§wadas Lorem ipsum dolor §text-blue§sit amet consectetur adipisicing elit. Vitae, illo? Molestias deserunt id minus quasi nihil, voluptate, eum voluptas veniam placeat quisquam porro eligendi dignissimos. Esse accusantium deserunt§/§ praesentium quod! ');
    await wait(500);
    PseudoConsole.clearLine(PseudoConsole.lines().length - 3);
    await wait(500);
    let coords;
    await PseudoConsole.printByLine(
        'testing1\n' +
        'testing2\n' +
        'testing3\n' +
        'testing4\n'
    , 10).then((resolve) => coords = resolve);
    await wait(500);
    PseudoConsole.clearLines(coords.start.line, coords.end.line);
    await wait(500);
    await PseudoConsole.printByLine(
        'testing1\n' +
        'testing2\n' +
        'testing3\n' +
        'testing4\n'
    , 10, coords.start.line).then((resolve) => coords = resolve);
    await PseudoConsole.printByChar('\n§text-bold text-blue background-red§blue on red§background-inherit§ §/§§text-red background-blue§red o§/text-bold§n blue§background-inherit§ §/§§//§blue on red§//§');
    await PseudoConsole.printByChar(
        '\n§text-bold text-blue§' + 'bold&blue-' + '§/text-bold text-red§' + 'red-' + '§//§' + 'white\n' +
        '§text-bold text-bold§' + 'bold-' + '§/text-bold§' + 'bold-' + '§/text-bold§' + 'notbold\n' +
        '§text-bold text-bold§' + 'bold-' + '§/text-bold/§' + 'notbold\n' +
        '§text-blue text-bold text-red§' + 'bold&red-' + '§/text-bold/text-blue§' + 'red-' + '§/§' + 'white\n' +
        '§text-bold background-blue text-blue text-blue text-red§' + 'bold&redonblue-' + '§//text-blue//text-bold§' + 'whiteonblue' + '§/§' + 'white\n' +
        '§text-red§' + 'red-' + '§/ text-blue§' + 'blue-' + '§text-bold /§' + 'blue-' + '§/ text-bold§' + 'bold-' + '§/§' + 'white\n' +
        '§text-blue§' + 'blue-' + '§text-red /text-blue /§' + 'white\n'
    );
    
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
    let lines = PseudoConsole.lines();
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
stateMachine();