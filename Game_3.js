const selectBox = document.querySelector('.select-box'),
    SelectXBtn = selectBox.querySelector('.playerX'),
    SelectOBtn = selectBox.querySelector('.playerO'),
    playboard = document.querySelector('.play-board'),
    allBox = document.querySelectorAll('section span'),
    players = document.querySelector('.players'),
    resultBox = document.querySelector('.result-box'),
    wonText = resultBox.querySelector('.won-text'),
    replayBtn = resultBox.querySelector('button');

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }
    SelectXBtn.onclick = () => {
        selectBox.classList.add('hide');
        playboard.classList.add('show');
    }
    SelectOBtn.onclick = () => {
        selectBox.classList.add('hide');
        playboard.classList.add('show');
        players.setAttribute('class', 'players active player');
    }
}

let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';
let playerSign = 'X';
let runBot = true;

const winCombos = [
    [1,2,3], [4,5,6], [7,8,9],
    [1,4,7], [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
];

function getBestMove(currentSign) {
    for (let combo of winCombos) {
        let [a, b, c] = combo;
        if (getClass(a) === currentSign && getClass(b) === currentSign && getClass(c) === "") return c-1;
        if (getClass(a) === currentSign && getClass(c) === currentSign && getClass(b) === "") return b-1;
        if (getClass(b) === currentSign && getClass(c) === currentSign && getClass(a) === "") return a-1;
    }

    const opponentSign = currentSign === 'X' ? 'O' : 'X';
    for (let combo of winCombos) {
        let [a, b, c] = combo;
        if (getClass(a) === opponentSign && getClass(b) === opponentSign && getClass(c) === "") return c-1;
        if (getClass(a) === opponentSign && getClass(c) === opponentSign && getClass(b) === "") return b-1;
        if (getClass(b) === opponentSign && getClass(c) === opponentSign && getClass(a) === "") return a-1;
    }

    if (getClass(5) === "") return 4;

    let emptyCells = [];
    for (let i=0; i<allBox.length; i++) {
        if (allBox[i].childElementCount === 0) emptyCells.push(i);
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function clickedBox(element){
    if(players.classList.contains('player')){
        element.innerHTML = `<i class = '${playerOIcon}'></i>`;
        element.setAttribute('id', 'O');
        
        players.classList.remove('active');
        
        playerSign = 'O';
        selectWinner();
        
        playboard.style.pointerEvents = 'none';
        element.style.pointerEvents = 'none';
        
        let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(() => {
            bot(runBot);
            players.classList.add('active');
        }, randomDelayTime);
    }
    else {
        element.innerHTML = `<i class = '${playerXIcon}'></i>`;
        players.classList.add('active');
        element.setAttribute('id', playerSign);
        selectWinner();
        playboard.style.pointerEvents = 'none';
        element.style.pointerEvents = 'none';
        let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(() => {
            bot(runBot);
        }, randomDelayTime);
    }
}

function bot(runBot){
    if(runBot){
        const isBotX = players.classList.contains('player');
        const botSign = isBotX ? 'X' : 'O';
        
        const bestMove = getBestMove(botSign);
        
        if (bestMove !== undefined) {
            const icon = botSign === 'X' ? playerXIcon : playerOIcon;
            allBox[bestMove].innerHTML = `<i class='${icon}'></i>`;
            allBox[bestMove].setAttribute('id', botSign);
            allBox[bestMove].style.pointerEvents = 'none';
            playerSign = botSign === 'X' ? 'O' : 'X';
        }

        selectWinner();
        playboard.style.pointerEvents = 'auto';
    }
}

function getClass(idname){
    return document.querySelector('.box' + idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkClass(1,2,3, playerSign) || checkClass(4,5,6, playerSign) || checkClass(7,8,9, playerSign) || checkClass(1,4,7, playerSign) || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playboard.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> Won the Game!`;
    }
    else {
        if(getClass(1) != '' && getClass(2) != '' && getClass(3) != '' && getClass(4) != '' && getClass(5) != '' && getClass(6) != '' && getClass(7) != '' && getClass(8) != '' && getClass(9) != ''){
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playboard.classList.remove('show');
                resultBox.classList.add('show');
            }, 700);
            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
