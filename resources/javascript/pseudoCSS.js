new PseudoCSSClass('text-blue',
    element => { element.style.color = 'rgb(0, 115, 255)'; }
);
new PseudoCSSClass('text-red',
    element => { element.style.color = 'rgb(255, 0, 0)'; }
);
new PseudoCSSClass('text-bold',
    element => { element.style.fontWeight = 'bold'; }
);
new PseudoCSSClass('background-blue',
    element => { element.style.backgroundColor = 'rgb(0, 115, 255)'; }
);
new PseudoCSSClass('background-red',
    element => { element.style.backgroundColor = 'rgb(255, 0, 0)'; }
);
new PseudoCSSClass('background-inherit',
    element => { element.style.backgroundColor = 'inherit'; }
);
new PseudoCSSClass('text-rainbow',
    element => {
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
            duration: 3000,
            easing: 'ease-in-out',
            iterations: Infinity,
            id: 'text-rainbow'
        });
    }
);
new PseudoCSSClass('text-rainbow-synchronous',
    element => {
        PseudoCSSClass.LIST['text-rainbow'].styleElement(element);

        let animationStart = PseudoCSSClass.LIST['text-rainbow-synchronous'].animationStart || Date.now();
        let animation = element.getAnimations().find(anim => anim.id === 'text-rainbow');
        animation.startTime = animationStart % 3000;
    }, { animationStart: Date.now() }
);