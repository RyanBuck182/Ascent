'use strict';

/**
 * Coordinate on the pseudoConsole.
 * @typedef {Object} ConsoleCoordinate
 * @property {Number} line A line on the pseudo console.
 * @property {Number} column A column on the pseudo console.
 */

/** Functions associated with the pseudoconsole. Everything is static. */
class PseudoConsole {
    /** 
     * The pseudo console html element.
     * @type {Element}
     */
    static pseudoConsole = document.getElementById('console');

    /**
     * The console input html element.
     * @type {Element}
     */
    static consoleInput = document.getElementById('consoleInput');
    
    /**
     * The list of identifiers associated with the pseudo classes to apply to pseudo console output.
     * @type {Array<String>}
     */
    static #outputClassArray = [];

    /**
     * Applies the output classes to an element.
     * @param {Element} element 
     */
    static applyOutputClasses(element) {
        for (let i = 0; i < this.#outputClassArray.length; i++) {
            try {
                PseudoCSSClass.LIST[this.#outputClassArray[i]].styleElement(element);
            }
            catch {
                console.warn('Invalid pseudo class name: ' + this.#outputClassArray[i]);
            }
        }
    }

    /**
     * Modifies output classes based on the contents of a class activator.
     * @param {String} contents The contents of a class activator. Arguments are space delimited.
     */
    static modifyOutputClasses(contents) {
        let argumentList = [];
        function parseContents(contents) {
            contents = contents.trim();
            if (contents.includes(' ')) {
                parseContents(contents.slice(0, contents.indexOf(' ')));
                parseContents(contents.slice(contents.indexOf(' ') + 1));
            } else
                argumentList.push(contents);
        }
        parseContents(contents);

        for (let i = 0; i < argumentList.length; i++) {
            let argument = argumentList[i];
            if (argument[0] == '/') {
                let j = 0;
                for (; j < argument.length && (argument[j + 1] == '/' || argument[j + 1] == undefined); j++)
                    this.removeLastOutputClass();
    
                for(; j < argument.length; j++) {
                    let classEnd = argument.indexOf('/', j + 1);
                    let className = '';
                    if (classEnd != -1) {
                        if (argument[classEnd + 1] == '/' || argument[classEnd + 1] == undefined) {
                            className = argument.slice(j + 1, classEnd + 1);
                            this.removeSpecificOutputClass(className.slice(0, className.length - 1));
                        } else {
                            className = argument.slice(j + 1, classEnd);
                            this.removeLastSpecificOutputClass(className);
                        }
                    } else {
                        className = argument.slice(j + 1);
                        this.removeLastSpecificOutputClass(className);
                    }
                    j += className.length;
                }
            }
            else
                this.addOutputClass(argument);
        }
    }

    /**
     * Adds a pseudo class to the list of output classes.
     * @param {String} className The name of the class to add.
     */
    static addOutputClass(className) {
        this.#outputClassArray.push(className);
    }

    /** 
     * Removes every instance of the specific pseudo class from the list of output classes.
     * @param {String} className The class to remove.
     */
    static removeSpecificOutputClass(className) {
        let index = this.#outputClassArray.indexOf(className);
        while (index != -1) {
            this.#outputClassArray.splice(index, 1);
            index = this.#outputClassArray.indexOf(className);
        }
    }

    /** Removes the last pseudo class from the list of output classes. */
    static removeLastOutputClass() {
        this.#outputClassArray.pop();
    }

    /** 
     * Removes last instance of the specific pseudo class from the list of output classes.
     * @param {String} className The class to remove.
     */
    static removeLastSpecificOutputClass(className) {
        let index = this.#outputClassArray.lastIndexOf(className);
        if (index != -1)
            this.#outputClassArray.splice(index, 1);
    }

    /** Removes every pseudo class from the list of output classes. */
    static removeAllOutputClasses() {
        this.#outputClassArray = [];
    }

    /**
     * Creates a new console line.
     * @returns {Element} The created new line.
     */
    static newLine() {
        let line = document.createElement('div');
        line.className = 'consoleLine';
        line.style.fontSize = this.fontSize();
        for (let i = 0; i < MAX_CHARS_PER_LINE; i++) {
            let char = document.createElement('span');
            char.textContent = ' ';
            line.appendChild(char);
        }
        line.column = 0;
        this.pseudoConsole.appendChild(line);
        return line;
    }
    
    /**
     * Instantly prints a string to the pseudo console.
     * @param {String} text The text to print.
     * @param {'last' | Number} startingLine Index of the line to start printing at.
     * @param {'last' | Number} startingColumn Index of the column to start printing at.
     * @returns {Promise<{ start: ConsoleCoordinate, end: ConsoleCoordinate }>} The coordinates where the function started and stopped printing.
     */
    static printInstant(text, startingLine = 'last', startingColumn = 'last') {
        let lines = this.lines();
        let lineIndex = (startingLine == 'last') ? lines.length - 1 : startingLine;
        let line = lines[lineIndex];
        let columns = this.columns(line);

        line.column = (startingColumn == 'last') ? line.column : startingColumn;
        text = this.#insertLineBreaks(text, line.column);

        let startCoords = { line: lineIndex, column: line.column };

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                lineIndex++;
                line = lines[lineIndex] || this.newLine();
                columns = this.columns(line);
                continue;
            } else if (text[i] == CLASS_ACTIVATOR) {
                let endIndex = text.indexOf(CLASS_ACTIVATOR, i + 1);
                let contents = text.substring(i + 1, (endIndex == -1) ? undefined : endIndex);
                this.modifyOutputClasses(contents);
                i = (endIndex == -1) ? text.length - 1 : endIndex;
                continue;
            } else {
                this.applyOutputClasses(columns[line.column]);
                columns[line.column].textContent = text[i];
                line.column++;
            }
        }

        let endCoords = { line: lineIndex, column: line.column };
        return { start: startCoords, end: endCoords };
    }
    
    /**
     * Prints a string to pseudo console. Pauses between each character.
     * @param {String} text The text to print.
     * @param {Number} millisecondsBetween Milliseconds between each character.
     * @param {'last' | Number} startingLine Index of the line to start printing at.
     * @param {'last' | Number} startingColumn Index of the column to start printing at.
     * @returns {Promise<{ start: ConsoleCoordinate, end: ConsoleCoordinate }>} The coordinates where the function started and stopped printing.
     */
    static async printByChar(text, millisecondsBetween = MILLISECONDS_PER_CHAR, startingLine = 'last', startingColumn = 'last') {
        let lines = this.lines();
        let lineIndex = (startingLine == 'last') ? lines.length - 1 : startingLine;
        let line = lines[lineIndex];
        let columns = this.columns(line);

        line.column = (startingColumn == 'last') ? line.column : startingColumn;
        text = this.#insertLineBreaks(text, line.column);

        let startCoords = { line: lineIndex, column: line.column };

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                lineIndex++;
                line = lines[lineIndex] || this.newLine();
                columns = this.columns(line);
                continue;
            } else if (text[i] == CLASS_ACTIVATOR) {
                let endIndex = text.indexOf(CLASS_ACTIVATOR, i + 1);
                let contents = text.substring(i + 1, (endIndex == -1) ? undefined : endIndex);
                this.modifyOutputClasses(contents);
                i = (endIndex == -1) ? text.length - 1 : endIndex;
                continue;
            } else {
                await wait(millisecondsBetween);
                this.applyOutputClasses(columns[line.column]);
                columns[line.column].textContent = text[i];
                line.column++;
            }
        }

        let endCoords = { line: lineIndex, column: line.column };
        return new Promise (resolve => resolve({ start: startCoords, end: endCoords }));
    }

    /**
     * Prints a string to pseudo console. Pauses between each line.
     * @param {String} text The text to print.
     * @param {Number} millisecondsBetween Milliseconds between each line.
     * @param {'last' | Number} startingLine Index of the line to start printing at.
     * @param {'last' | Number} startingColumn Index of the column to start printing at.
     * @returns {Promise<{ start: ConsoleCoordinate, end: ConsoleCoordinate }>} The coordinates where the function started and stopped printing.
     */
    static async printByLine(text, millisecondsBetween = MILLISECONDS_PER_LINE, startingLine = 'last', startingColumn = 'last') {
        let lines = this.lines();
        let lineIndex = (startingLine == 'last') ? lines.length - 1 : startingLine;
        let line = lines[lineIndex];
        let columns = this.columns(line);

        line.column = (startingColumn == 'last') ? line.column : startingColumn;
        text = this.#insertLineBreaks(text, line.column);

        let startCoords = { line: lineIndex, column: line.column };

        let lineText = '';
        async function printLine() {
            await wait(millisecondsBetween);
            for (let j = lineText.length - 1; j >= 0; j--)
                columns[line.column - 1 - j].textContent = lineText[lineText.length - 1 - j];
        }

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                await printLine();
                lineText = '';
                lineIndex++;
                line = lines[lineIndex] || this.newLine();
                columns = this.columns(line);
                continue;
            } else if (text[i] == CLASS_ACTIVATOR) {
                let endIndex = text.indexOf(CLASS_ACTIVATOR, i + 1);
                let contents = text.substring(i + 1, (endIndex == -1) ? undefined : endIndex);
                this.modifyOutputClasses(contents);
                i = (endIndex == -1) ? text.length - 1 : endIndex;
                continue;
            } else {
                this.applyOutputClasses(columns[line.column]);
                lineText += text[i];
                line.column++;
            }
        }

        if (text[text.length - 1] != '\n')
            await printLine();

        let endCoords = { line: lineIndex, column: line.column };
        return new Promise (resolve => resolve({ start: startCoords, end: endCoords }));
    }
    
    /**
     * Replaces the characters in a line with spaces.  
     * @param {Element} line The line to clear. 
     */
    static clearLineElement(line) {
        let columns = this.columns(line);
        for (let i = 0; i < columns.length; i++) {
            columns[i].style.cssText = '';
            columns[i].textContent = ' ';
        }
        line.column = 0;
    }

    /**
     * Replaces the characters in a line with spaces.  
     * @param {Number} lineIndex The index of the line to clear. 
     */
    static clearLine(lineIndex) {
        let lines = this.lines();
        let line = lines[lineIndex];
        this.clearLineElement(line);
    }

    /**
     * Clears multiple lines.  
     * @param {Number} startingLine The index of the line to start clearing.
     * @param {Number} endingLine The index of the line to end clearing (exclusive). 
     */
    static clearLines(startingLine, endingLine = 'last') {        
        let lines = this.lines();
        for (let i = startingLine; i < ((endingLine == 'last') ? lines.length : endingLine); i++)
            this.clearLineElement(lines[i]);
    }

    /**
     * Prepares a string for pseudoconsole output by inserting line breaks.
     * @param {String} text The text to prepare.
     * @param {Number} currentLineLength The length of the current line.
     */
    static #insertLineBreaks(text, currentLineLength) {
        let lineCharCount = currentLineLength;
        
        let i = 0;
        while (i < text.length) {
            if (text[i] == CLASS_ACTIVATOR) {
                let endIndex = text.indexOf(CLASS_ACTIVATOR, i + 1);
                if (endIndex == -1) {
                    text += CLASS_ACTIVATOR;
                    i = text.length;
                } else
                    i = endIndex + 1;
            } else if (text[i] == '\n') {
                i++;
                lineCharCount = 0;
            } else {
                let spaceIndex = text.indexOf(' ', i + 1);
                let newLineIndex = text.indexOf('\n', i + 1);
                let classIndex = text.indexOf(CLASS_ACTIVATOR, i + 1);
                let lastIndex = text.length;

                let potentialEndIndices = [spaceIndex, newLineIndex, classIndex, lastIndex].filter(index => index != -1);
                let wordEndIndex = Math.min(...potentialEndIndices);

                let wordLength = wordEndIndex - i;
                let wordFitsLineLength = lineCharCount + wordLength <= MAX_CHARS_PER_LINE;
                let wordIsTooLong = wordLength > MAX_CHARS_PER_LINE;

                if (wordFitsLineLength) {
                    lineCharCount += wordLength;
                    i += wordLength;
                } else if (wordIsTooLong) {
                    wordLength = (MAX_CHARS_PER_LINE - lineCharCount);
                    i += wordLength;
                    text = text.slice(0, i) + '\n' + text.slice(i);
                    lineCharCount = 0;
                } else {
                    text = text.slice(0, i) + '\n' + text.slice((text[i] == ' ') ? i + 1 : i++);
                    i += wordLength;
                    lineCharCount = wordLength - 1;
                }
            }
        }

        if (lineCharCount == MAX_CHARS_PER_LINE)
            text += '\n';

        return text;
    }

    /**
     * Gets text input from the user.
     * @param {ConsoleCoordinate} coordinates The coordinates to start the input at.
     * @returns {Promise<String>} The text input.
     */
    static async getTextInput(coordinates) {
        let line = this.lines()[coordinates.line];
        let column = this.columns(line)[coordinates.column];
        let columnRect = column.getBoundingClientRect();

        /** Sizes and positions the input element. */
        let transformInput = () => {
            columnRect = column.getBoundingClientRect();
            PseudoConsole.consoleInput.style.fontSize = this.fontSize();
            this.consoleInput.style.top = columnRect.top + 'px';
            this.consoleInput.style.left = columnRect.left + 'px';
        }

        /** Focuses the input when the user starts typing. */
        let focusOnType = () => {
            let listener;
            document.addEventListener('keypress', listener = () => {
                document.removeEventListener('keypress', listener);
                this.consoleInput.focus();
            });
        }

        //Pre input
        window.addEventListener('resize', transformInput);
        this.consoleInput.addEventListener('focusout', focusOnType);

        transformInput();
        this.consoleInput.type = 'text';
        this.consoleInput.maxLength = MAX_CHARS_PER_LINE - coordinates.column;
        this.consoleInput.size = this.consoleInput.maxLength;
        this.consoleInput.hidden = false;
        this.consoleInput.focus();

        await this.#waitForInput();

        //Post input
        this.consoleInput.hidden = true;

        window.removeEventListener('resize', transformInput);
        this.consoleInput.removeEventListener('focusout', focusOnType);

        let input = this.consoleInput.value; 
        this.consoleInput.value = '';
        this.printInstant(input, coordinates.line, coordinates.column);
        return new Promise (resolve => resolve(input));
    }

    /** Waits until the user presses enter. */
    static async waitForEnter() {
        return new Promise(resolve => {
            let listener;
            document.addEventListener('keypress', listener = (event) => {
                if (event.key === 'Enter') {
                    document.removeEventListener('keypress', listener);
                    resolve();
                }
            });
        });
    }

    /** Waits until the user presses enter in the input box. */
    static async #waitForInput() {
        return new Promise(resolve => {
            let listener;
            this.consoleInput.addEventListener('keypress', listener = (event) => {
                if (event.key === 'Enter') {
                    this.consoleInput.removeEventListener('keypress', listener);
                    resolve();
                }
            });
        });
    }

    /**
     * Returns the appropriate font size for the current screen size.
     * @returns {String} The font size.
     */
    static fontSize() {
        return (this.pseudoConsole.offsetWidth * FONT_SIZE_PER_CONSOLE_WIDTH) + 'px';
    }

    /**
     * Returns an array of the lines of the pseudo console.
     * @returns {NodeListOf<Element>} The lines of the pseudo console. 
     */
    static lines() {
        return this.pseudoConsole.querySelectorAll('.consoleLine');
    }

    /**
     * Returns the columns of a line of the pseudo console.
     * @param {Element} line A line of the pseudo console.
     * @returns {NodeListOf<ChildNode>} The columns of the line. 
     */
    static columns(line) {
        return line.children;
    }
}