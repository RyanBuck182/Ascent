'use strict';

/**
 * Coordinate on the pseudoConsole.
 * @typedef {Object} ConsoleCoordinate
 * @property {Number} line A line on the pseudo console.
 * @property {Number} column A column on the pseudo console.
 */

/** Functions associated with the pseudoconsole. Everything is static. */
class PseudoConsole {
    static pseudoConsole = document.getElementById('console');
    static columnClasses = 'consoleColumn';

    /**
     * Creates a new console line.
     * @returns {Element} The created new line.
     */
    static newLine() {
        let line = document.createElement('div');
        line.className = 'consoleRow';
        line.style.fontSize = this.pseudoConsoleFontSize();
        for (let i = 0; i < MAX_CHARS_PER_LINE; i++) {
            let char = document.createElement('span');
            char.className = 'consoleColumn';
            char.textContent = ' ';
            line.appendChild(char);
        }
        line.value = 0;
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

        line.value = (startingColumn == 'last') ? line.value : startingColumn;
        text = this.insertLineBreaks(text, line.value);

        let startCoords = { line: lineIndex, column: line.value };

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                lineIndex++;
                line = lines[lineIndex] || this.newLine();
                columns = this.columns(line);
                continue;
            } else if (text[i] == CLASS_ACTIVATOR) {
                let className = text.substring(i + 1, text.indexOf(CLASS_ACTIVATOR, i + 1));
                if (className == '/')
                    this.columnClasses = this.columnClasses.substring(0, this.columnClasses.lastIndexOf(' '));
                else
                    this.columnClasses += ' ' + className;
                i += className.length + 1;
                continue;
            } else {
                columns[line.value].className = this.columnClasses;
                columns[line.value].textContent = text[i];
                line.value++;
            }
        }

        let endCoords = { line: lineIndex, column: line.value };
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

        line.value = (startingColumn == 'last') ? line.value : startingColumn;
        text = this.insertLineBreaks(text, line.value);

        let startCoords = { line: lineIndex, column: line.value };

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                lineIndex++;
                line = lines[lineIndex] || this.newLine();
                columns = this.columns(line);
                continue;
            } else if (text[i] == CLASS_ACTIVATOR) {
                let className = text.substring(i + 1, text.indexOf(CLASS_ACTIVATOR, i + 1));
                if (className == '/')
                    this.columnClasses = this.columnClasses.substring(0, this.columnClasses.lastIndexOf(' '));
                else
                    this.columnClasses += ' ' + className;
                i += className.length + 1;
                continue;
            } else {
                await wait(millisecondsBetween);
                columns[line.value].className = this.columnClasses;
                columns[line.value].textContent = text[i];
                line.value++;
            }
        }

        let endCoords = { line: lineIndex, column: line.value };
        return { start: startCoords, end: endCoords };
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

        line.value = (startingColumn == 'last') ? line.value : startingColumn;
        text = this.insertLineBreaks(text, line.value);

        let startCoords = { line: lineIndex, column: line.value };

        let lineText = '';
        async function printLine() {
            await wait(millisecondsBetween);
            for (let j = lineText.length - 1; j >= 0; j--)
                columns[line.value - 1 - j].textContent = lineText[lineText.length - 1 - j];
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
                let className = text.substring(i + 1, text.indexOf(CLASS_ACTIVATOR, i + 1));
                if (className == '/')
                    this.columnClasses = this.columnClasses.substring(0, this.columnClasses.lastIndexOf(' '));
                else
                    this.columnClasses += ' ' + className;
                i += className.length + 1;
                continue;
            } else {
                columns[line.value].className = this.columnClasses;
                lineText += text[i];
                line.value++;
            }
        }

        if (text[text.length - 1] != '\n')
            await printLine();

        let endCoords = { line: lineIndex, column: line.value };
        return { start: startCoords, end: endCoords };
    }
    
    /**
     * Replaces the characters in a line with spaces.  
     * @param {Number} lineIndex The index of the line to clear. 
     */
    static async clearLine(lineIndex) {
        let lines = this.lines();
        let line = lines[lineIndex];
        let columns = this.columns(line);

        for (let i = 0; i < columns.length; i++) {
            columns[i].className = 'consoleColumn';
            columns[i].textContent = ' ';
        }
    }

    /**
     * Clears multiple lines.  
     * @param {Number} startingLine The index of the line to start clearing.
     * @param {Number} endingLine The index of the line to end clearing (exclusive). 
     */
    static async clearLines(startingLine, endingLine = 'last') {        
        let lines = this.lines();
        for (let i = startingLine; i < ((endingLine == 'last') ? lines.length : endingLine); i++) {
            let line = lines[i];
            let columns = this.columns(line);
            for (let j = 0; j < columns.length; j++) {
                columns[j].className = 'consoleColumn';
                columns[j].textContent = ' ';
            }
            line.value = 0;
        }
    }

    /**
     * Prepares a string for pseudoconsole output by inserting line breaks.
     * @param {String} text The text to prepare.
     * @param {Number} currentLineLength The length of the current line.
     */
    static insertLineBreaks(text, currentLineLength) {
        let lineCharCount = currentLineLength;
        let i = 0;

        while (i < text.length) {
            if (text[i] == CLASS_ACTIVATOR) {
                i++;
                while (text[i++] != CLASS_ACTIVATOR);
                continue;
            } else if (text[i] == '\n') {
                i++;
                lineCharCount = 0;
            }

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

        if (lineCharCount == MAX_CHARS_PER_LINE)
            text += '\n';

        return text;
    }

    /**
     * Returns the appropriate font size for the current screen size.
     * @returns {String} The font size.
     */
    static pseudoConsoleFontSize() {
        return (this.pseudoConsole.offsetWidth * FONT_SIZE_PER_CONSOLE_WIDTH) + 'px';
    }

    /**
     * Returns an array of the lines of the pseudo console.
     * @returns {NodeListOf<Element>} The lines of the pseudo console. 
     */
    static lines() {
        return this.pseudoConsole.querySelectorAll('.consoleRow');
    }

    /**
     * Returns the columns of a line of the pseudo console.
     * @param {Element} line A line of the pseudo console.
     * @returns {NodeListOf<Element>} The columns of the line. 
     */
    static columns(line) {
        return line.querySelectorAll('.consoleColumn');
    }
}