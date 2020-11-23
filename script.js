'use strict';

//selecting all the buttons available in the index.html
const selectionButtons = document.querySelectorAll('[data-selection]');

//
const finalColumn = document.querySelector('[data-final-column');

//
let computerScoreSpan = document.querySelector(['#data-computer-score']);
let yourScoreSpan = document.querySelector(['#data-your-score']);

//array of possible selections with the corresponding emoji and the result.
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
];

//choosing the computer selection
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

//function where both computer and user selection is logged.
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);

    //console.log(computerSelection);
    //console.log(selection);
}

//Checking the winner using the SELECTIONS array
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

//
function addSelectionResult(selection, winner) {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection');
    if (winner) {
        div.classList.add('winner');
    }
    finalColumn.after(div);
}

//
function incrementScore(scoreSpan) {
    scoreSpan.innerText = Number(scoreSpan.innerText) + 1;
}

//selecting buttons from HTML and comparing with SELECTIONS array. Later calling makeSelection function.
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    });
});