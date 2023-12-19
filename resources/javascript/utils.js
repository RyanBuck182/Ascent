'use strict';

/**
 * Waits for the specified number of milliseconds.
 * @param {Number} milliseconds milliseconds to wait
 */
function wait(milliseconds) {
    if (milliseconds == 0)
        return;
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Pads a string with spaces.
 * @param {String} text the string to set the width of
 * @param {'left' | 'center' | 'right'} justify how the string should be positioned
 * @param {String} width the width the string should be set to
 * @returns {String} the padded string
 */
function setWidth(text, justify = 'left', width = MAX_CHARS_PER_LINE) {
    let remainingWidth = width - text.length;

    let classActivatorIndex = text.indexOf(CLASS_ACTIVATOR);
    while (classActivatorIndex != -1) {
        let nextClassActivator = text.indexOf(CLASS_ACTIVATOR, classActivatorIndex + 1);
        remainingWidth += nextClassActivator - classActivatorIndex + 1;
        classActivatorIndex = text.indexOf(CLASS_ACTIVATOR, nextClassActivator + 1);
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