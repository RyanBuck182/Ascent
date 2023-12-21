'use strict';

/** Represents a fake css class. */
class PseudoCSSClass {
    /** 
     * A list of all the pseudo css classes.
     * @type {Object}
     */
    static LIST = {};
    
    /**
     * Styles an html element.
     * @param {Element} element The element to be styled.
     */
    styleElement(element) {}

    /**
     * Creates a PseudoCSSClass.
     * @param {String} identifier The name of the class.
     * @param {Function} styleElement A function that styles a css element. Takes an element as input.
     */
    constructor(identifier, styleElement) {
        this.styleElement = styleElement;
        PseudoCSSClass.LIST[identifier] = this;
    }
}