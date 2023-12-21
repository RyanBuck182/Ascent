new PseudoCSSClass('text-blue',
    element => { element.style.color = 'rgb(0, 115, 255)'; }
);
new PseudoCSSClass('text-red',
    element => { element.style.color = 'red'; }
);
new PseudoCSSClass('text-bold',
    element => { element.style.fontWeight = 'bold'; }
);
new PseudoCSSClass('background-blue',
    element => { element.style.backgroundColor = 'rgb(0, 115, 255)'; }
);
new PseudoCSSClass('background-red',
    element => { element.style.backgroundColor = 'red'; }
);
new PseudoCSSClass('background-inherit',
    element => { element.style.backgroundColor = 'inherit'; }
)