const selectBox = document.querySelector('.select-box'),
    SelectXBtn = selectBox.querySelector('.playerX'),
    SelectOBtn = selectBox.querySelector('.playerO'),
    playboard = document.querySelector('.play-board'),
    allBox = document.querySelectorAll('section span'),
    players = document.querySelector('.players'),
    resultBox = document.querySelector('.result-box'),
    wonText = resultBox.querySelector('.won-text'),
    replayBtn = resultBox.querySelector('button');

let playerXIcon = 'fas fa-times',
    playerOIcon = 'far fa-circle',
    playerSign = 'X',
    runBot = true,
    isPlayerX = true;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }
    SelectXBtn.onclick = () => {
        selectBox.classList.add('hide');
        playboard.classList.add('show');
        isPlayerX = true;
        players.classList.remove('active');
    }
    SelectOBtn.onclick = () => {
        selectBox.classList.add('hide');
        playboard.classList.add('show');
        isPlayerX = false;
        players.classList.add('active');
    }
}


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
    if (!isPlayerX) {
        element.innerHTML = `<i class='${playerOIcon}'></i>`;
        element.setAttribute('id', 'O');
        players.classList.remove('active');
        playerSign = 'O';
        selectWinner();
        playboard.style.pointerEvents = 'none';
        element.style.pointerEvents = 'none';
        setTimeout(() => {
            bot();
        }, ((Math.random() * 1000) + 200).toFixed());
    } else {
        element.innerHTML = `<i class='${playerXIcon}'></i>`;
        players.classList.add('active');
        element.setAttribute('id', 'X');
        playerSign = 'X';
        selectWinner();
        playboard.style.pointerEvents = 'none';
        element.style.pointerEvents = 'none';
        setTimeout(() => {
            bot();
        }, ((Math.random() * 1000) + 200).toFixed());
    }
}

function bot(){
    if(runBot){
        const botSign = isPlayerX ? 'O' : 'X';
        const bestMove = getBestMove(botSign);
        if (bestMove !== undefined) {
            const icon = botSign === 'X' ? playerXIcon : playerOIcon;
            allBox[bestMove].innerHTML = `<i class='${icon}'></i>`;
            allBox[bestMove].setAttribute('id', botSign);
            allBox[bestMove].style.pointerEvents = 'none';
            if (isPlayerX) players.classList.remove('active');
            else players.classList.add('active');
        }
        selectWinner();
        playboard.style.pointerEvents = 'auto';
    }
}

function getClass(idname){
    return document.querySelector('.box' + idname).id;
}

function checkClass(val1, val2, val3, sign){
    return (getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign);
}

function selectWinner(){
    let isXWin = winCombos.some(combo => 
        combo.every(idx => getClass(idx) === 'X')
    );
    let isOWin = winCombos.some(combo => 
        combo.every(idx => getClass(idx) === 'O')
    );

    if (isXWin || isOWin) {
        const winner = isXWin ? 'X' : 'O';
        runBot = false;
        setTimeout(() => {
            playboard.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);
        wonText.innerHTML = `Player <p>${winner}</p> Won the Game!`;
    } else if ([...allBox].every(box => box.id !== '')) {
        runBot = false;
        setTimeout(() => {
            playboard.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);
        wonText.textContent = `Match has been drawn!`;
    }
}

replayBtn.onclick = () => window.location.reload();
