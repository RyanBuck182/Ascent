'use strict';

//------------------------------------------------------------------------------------------
//-----------------------------------------TEXT---------------------------------------------
//------------------------------------------------------------------------------------------

new PseudoCSSClass('text-bold', {
    styleElement: element => { element.style.fontWeight = 'bold'; }
});
new PseudoCSSClass('text-italic', {
    styleElement: element => { element.style.fontStyle = 'italic'; }
});

new PseudoCSSClass('text-red', {
    styleElement: element => { element.style.color = 'rgb(255, 0, 0)'; }
});
new PseudoCSSClass('text-dark-green', {
    styleElement: element => { element.style.color = 'rgb(0, 128, 0)'; }
});
new PseudoCSSClass('text-blue', {
    styleElement: element => { element.style.color = 'rgb(0, 115, 255)'; }
});
new PseudoCSSClass('text-white', {
    styleElement: element => { element.style.color = 'rgb(255, 255, 255)'; }
});

new PseudoCSSClass('text-candy-cane', {
    styleElement: element => {
        let thisClass = PseudoCSSClass.getClassFromId('text-candy-cane');
        if (thisClass.cycle % thisClass.cycles === 0)
            PseudoCSSClass.getClassFromId('text-red').styleElement(element);
        else
            PseudoCSSClass.getClassFromId('text-white').styleElement(element);
        thisClass.cycle++;
    },
    extraProperties: { cycle: 0, cycles: 2 }
});
PseudoCSSClass.createCyclePositioners('text-candy-cane');

new PseudoCSSClass('text-christmas', {
    styleElement: element => {
        let thisClass = PseudoCSSClass.getClassFromId('text-christmas');
        if (thisClass.cycle % thisClass.cycles === 0)
            PseudoCSSClass.getClassFromId('text-red').styleElement(element);
        else
            PseudoCSSClass.getClassFromId('text-dark-green').styleElement(element);
        thisClass.cycle++;
    },
    extraProperties: { cycle: 0, cycles: 2 }
});
PseudoCSSClass.createCyclePositioners('text-christmas');

new PseudoCSSClass('text-rainbow', {
    styleElement: element => {
        let thisClass = PseudoCSSClass.getClassFromId('text-rainbow');
        let rainbowText = [
            { offset: (0/12), color: 'rgb(255, 0, 0)'},
            { offset: (1/12), color: 'rgb(255, 155, 0)'},
            { offset: (3/12), color: 'rgb(255, 255, 0)' },
            { offset: (5/12), color: 'rgb(0, 255, 0)' },
            { offset: (7/12), color: 'rgb(0, 0, 255)' },
            { offset: (9/12), color: 'rgb(155, 0, 255)'},
            { offset: (11/12), color: 'rgb(255, 0, 255)'},
            { offset: (12/12), color: 'rgb(255, 0, 0)'}
        ];

        let animation = element.animate(rainbowText, {
            duration: thisClass.animationDuration,
            easing: 'ease-in-out',
            iterations: Infinity,
            id: thisClass.identifier
        });
    },
    extraProperties: { animationDuration: 3000 }
});
PseudoCSSClass.createSynchronousAnimation('text-rainbow');

//------------------------------------------------------------------------------------------
//---------------------------------------LINE TEXT------------------------------------------
//------------------------------------------------------------------------------------------

new PseudoCSSClass('line-text-candy-cane', {
    styleElement: element => {
        let thisClass = PseudoCSSClass.getClassFromId('line-text-candy-cane');
        if (element.parentElement !== thisClass.line) {
            thisClass.line = element.parentElement;
            thisClass.cycle++;
        } else {
            if (thisClass.cycle % thisClass.cycles === 0)
                PseudoCSSClass.getClassFromId('text-red').styleElement(element);
            else
                PseudoCSSClass.getClassFromId('text-white').styleElement(element);
        }
    },
    extraProperties: { cycle: 0, cycles: 2, line: undefined }
});
PseudoCSSClass.createCyclePositioners('line-text-candy-cane');

new PseudoCSSClass('line-text-christmas', {
    styleElement: element => {
        let thisClass = PseudoCSSClass.getClassFromId('line-text-christmas');
        if (element.parentElement !== thisClass.line) {
            thisClass.line = element.parentElement;
            thisClass.cycle++;
        } else {
            if (thisClass.cycle % thisClass.cycles === 0)
                PseudoCSSClass.getClassFromId('text-red').styleElement(element);
            else
                PseudoCSSClass.getClassFromId('text-dark-green').styleElement(element);
        }
    },
    extraProperties: { cycle: 0, cycles: 2, line: undefined }
});
PseudoCSSClass.createCyclePositioners('line-text-christmas');

//------------------------------------------------------------------------------------------
//--------------------------------------BACKGROUNDS-----------------------------------------
//------------------------------------------------------------------------------------------

new PseudoCSSClass('background-red', {
    styleElement: element => { element.style.backgroundColor = 'rgb(255, 0, 0)'; }
});
new PseudoCSSClass('background-blue', {
    styleElement: element => { element.style.backgroundColor = 'rgb(0, 115, 255)'; }
});
new PseudoCSSClass('background-white', {
    styleElement: element => { element.style.backgroundColor = 'rgb(0, 115, 255)'; }
});
new PseudoCSSClass('background-inherit', {
    styleElement: element => { element.style.backgroundColor = 'inherit'; }
});

new PseudoCSSClass('background-candy-cane', {
    styleElement: element => {
        let thisClass = PseudoCSSClass.getClassFromId('background-candy-cane');
        if (thisClass.cycle % thisClass.cycles === 0)
            PseudoCSSClass.getClassFromId('background-red').styleElement(element);
        else
            PseudoCSSClass.getClassFromId('background-white').styleElement(element);
        thisClass.cycle++;
    },
    extraProperties: { cycle: 0, cycles: 2 }
});
PseudoCSSClass.createCyclePositioners('background-candy-cane');