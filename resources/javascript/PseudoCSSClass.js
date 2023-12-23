'use strict';

/** Represents a fake css class. */
class PseudoCSSClass {
    /** 
     * A list of all the pseudo css classes.
     * @type {Object}
     */
    static #pseudoCSSClassList = {};

    /**
     * Returns a pseudo css class from an identifier.
     * @param {String} identifier An identifier associated with a PseudoCSSClass.
     * @returns {PseudoCSSClass | undefined} The PseudoCSSClass associated with the identifier.
     */
    static getClassFromId(identifier) {
        let pseudoClass = this.#pseudoCSSClassList[identifier];
        if (pseudoClass)
            return pseudoClass;
        else {
            console.warn('The pseudo class \"' + identifier + '\" does not exist.');
            return undefined;
        }
    }

    /**
     * Creates positioners for a cycle pseudo class.
     * @param {String} cycleIdentifier The identifier of the cycle pseudo class.
     */
    static createCyclePositioners(cycleIdentifier) {
        let cycleClass = PseudoCSSClass.getClassFromId(cycleIdentifier);
        let cycleCount = cycleClass.cycles;
        for (let i = 0; i < cycleCount; i++) {
            new PseudoCSSClass(cycleIdentifier + '-' + i, {
                onAddition: () => { PseudoCSSClass.getClassFromId(cycleIdentifier).cycle = i; }
            });
        }
    }

    /**
     * Creates a synchronous version of an animation pseudo class.
     * @param {String} animIdentifier The identifier of the animation pseudo class.
     * @param {String | undefined} syncIdentifier The identifier to assign to the synchronous pseudo class. 
     */
    static createSynchronousAnimation(animIdentifier, syncIdentifier = animIdentifier + '-sync') {
        new PseudoCSSClass(syncIdentifier, {
            styleElement: element => {
                let baseClass = PseudoCSSClass.getClassFromId(animIdentifier);
                let syncClass = PseudoCSSClass.getClassFromId(syncIdentifier);

                baseClass.styleElement(element);
                
                let animation = element.getAnimations().find(anim => anim.id === animIdentifier);
                animation.startTime = syncClass.animationStart % baseClass.animationDuration;
            },
            extraProperties: { animationStart: Date.now() }
        });
    }

    /**
     * Creates a PseudoCSSClass.
     * @param {String} identifier The name of the class.
     * @param {{ 
     * styleElement: (element: Element) => void | undefined, 
     * onAddition: () => void | undefined,
     * onRemoval: () => void | undefined,
     * onInitialize: (thisClass: PseudoCSSClass) => void | undefined,
     * extraProperties: {} | undefined
     * } | undefined} data Data pertaining to the pseudo css class.
     */
    constructor(identifier, data = {}) {
        /**
         * The pseudo class identifier.
         * @type {String}
         */
        this.identifier = identifier;
        PseudoCSSClass.#pseudoCSSClassList[identifier] = this;

        /**
         * Styles an html element.
         * @type {(element: Element) => void}
         */
        this.styleElement = data.styleElement || (() => {});

        /**
         * A function to be performed when the pseudo class is added.
         * @type {() => void}
         */
        this.onAddition = data.onAddition || (() => {});

        /**
         * A function to be performed when the pseudo class is removed.
         * @type {() => void}
         */
        this.onRemoval = data.onRemoval || (() => {});

        //Adds every property from extraProperties onto the PseudoCSSClass
        if (data.extraProperties) {
            let properties = Object.getOwnPropertyNames(data.extraProperties);
            for (let i = 0; i < properties.length; i++)
                this[properties[i]] = data.extraProperties[properties[i]];
        }

        if (data.onInitialize)
            data.onInitialize(this);
    }
}