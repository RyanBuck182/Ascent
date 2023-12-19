'use strict';

/** Functions associated with the pseudoconsole. Everything is static. */
class PseudoConsole {
    static pseudoConsole = document.getElementById('console');
    static columnClasses = 'consoleColumn';

    /**
     * Creates a new console line.
     * @returns {Element} the new line
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
     * Print's a string instantly.
     * @param {String} text the text to print
     */
    static async printInstant(text) {
        await printByChar(text, 0);
    }
    
    /**
     * Prints a string. Pauses between each character.
     * @param {String} text the text to print
     * @param {Number} millisecondsBetween milliseconds between each character
     */
    static async printByChar(text, millisecondsBetween = MILLISECONDS_PER_CHAR) {
        let lines = this.pseudoConsole.querySelectorAll('.consoleRow');
        let line = lines[lines.length - 1] || this.newLine();
        let columns = line.querySelectorAll('.consoleColumn');
        let currentColumn = line.value;

        text = this.insertLineBreaks(text, currentColumn);

        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                line = this.newLine();
                columns = line.querySelectorAll('.consoleColumn');
                currentColumn = 0;
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
                columns[currentColumn].className = this.columnClasses;
                columns[currentColumn].textContent = text[i];
                currentColumn++;
                line.value++;
            }
        }
    }

    /**
     * Prepares a string for pseudoconsole output by inserting line breaks.
     * @param {String} text the text to prepare
     * @param {Number} currentLineLength the length of the current line
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

        return text;
    }

    /**
     * Returns the appropriate font size for the current screen size.
     * @returns {String} the font size
     */
    static pseudoConsoleFontSize() {
        return (this.pseudoConsole.offsetWidth * FONT_SIZE_PER_CONSOLE_WIDTH) + 'px';
    }
}