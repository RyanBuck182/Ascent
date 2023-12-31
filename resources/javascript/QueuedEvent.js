'use strict';

class QueuedEvent {
    /** 
     * An array of all listeners and their priorities. Sorted from least to most priority.
     * @type {{
     * listener: () => Promize<void>,
     * priority: Number 
     * }[]}
     */
    #listeners = [];

    /**
     * Adds a listener to the listener array.
     * @param {() => Promize<void>} listener The listener to add to the array.
     * @param {Number | undefined} priority The priority of the listener. Determines what order the listeners are triggered when the event triggers.  
     */
    addListener(listener, priority = 1000) {
        let insertionPoint = -1;
    
        let lowerBound = 0;
        let upperBound = this.#listeners.length - 1;
        while (lowerBound <= upperBound) {
            let midPoint = Math.floor((upperBound + lowerBound) / 2);
            if (priority > this.#listeners[midPoint].priority)
                lowerBound = midPoint + 1;
            else if (priority < this.#listeners[midPoint].priority)
                upperBound = midPoint - 1;
            else {
                insertionPoint = midPoint;
                break;
            }
        }
        if (insertionPoint == -1)
            insertionPoint = lowerBound;

        while (this.#listeners[insertionPoint + 1] && this.#listeners[insertionPoint + 1].priority == priority)
            insertionPoint++;

        this.#listeners.splice(insertionPoint + 1, 0, { 'listener': listener, 'priority': priority });
    }

    /**
     * Removes a listener from the listener array.
     * @param {() => Promize<void>} listener
     */
    removeListener(listener) {
        let index = this.#listeners.find(listenerOnEvent => listenerOnEvent == listener);
        if (index)
            this.#listeners.splice(index, 1);
    }

    /**
     * Runs every function in the listener array.
     * @param {any} eventData Data to send to the listener.
     */
    async triggerEvent(eventData) {
        for (let i = 0; i < this.#listeners.length; i++)
            await this.#listeners[i].listener(eventData);
    }
}