'use strict';

const DEFAULT_WAIT_MILLISECONDS = 1000;

/**
 * Waits for the specified number of milliseconds.
 * @param {Number} milliseconds Milliseconds to wait.
 */
function wait(milliseconds = DEFAULT_WAIT_MILLISECONDS) {
    if (milliseconds == 0)
        return;
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Pads a string with spaces.
 * @param {String} text The string to set the width of.
 * @param {'left' | 'center' | 'right'} justify How the string should be positioned.
 * @param {Number} width The width the string should be set to.
 * @returns {String} The padded string.
 */
function setWidth(text, justify = 'left', width = PseudoConsole.MAX_CHARS_PER_LINE) {
    let remainingWidth = width - text.length;

    let classActivatorIndex = text.indexOf(PseudoConsole.CLASS_ACTIVATOR);
    while (classActivatorIndex != -1) {
        let nextClassActivator = text.indexOf(PseudoConsole.CLASS_ACTIVATOR, classActivatorIndex + 1);
        remainingWidth += nextClassActivator - classActivatorIndex + 1;
        classActivatorIndex = text.indexOf(PseudoConsole.CLASS_ACTIVATOR, nextClassActivator + 1);
    }

    if (remainingWidth < 1)
        return text;
    
    switch (justify) {
        default:
            return ' '.repeat(remainingWidth) + text;
        case 'right':
            return text + ' '.repeat(remainingWidth);
        case 'center':
            return ' '.repeat(Math.ceil(remainingWidth / 2)) + text + ' '.repeat(Math.floor(remainingWidth / 2));
    }
}