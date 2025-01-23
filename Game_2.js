const gameContainer = document.querySelector('.container'),
    yourResult = document.querySelector('.your_result img'),
    dealerResult = document.querySelector('.dealer_result img'),
    result = document.querySelector('.result'),
    optionImages = document.querySelectorAll('.option_image');

optionImages.forEach((image,index) => {
    image.addEventListener('click', (e) => {
        image.classList.add('active');

        yourResult.src = dealerResult.src = 'rock.png'
        result.textContent = 'Wait...';

        optionImages.forEach((image2, index2) => {
            index !== index2 && image.classList.remove('active');
        });

        gameContainer.classList.add('start');

        let time = setTimeout(() => {
            gameContainer.classList.remove('start');

            let imageSrc = e.target.querySelector('img').src;

            yourResult.src = imageSrc;
    
            let randomNumber = Math.floor(Math.random() * 3);
    
            let dealerImages = ['rock.png', 'paper.png','scissors.png']
    
            dealerResult.src = dealerImages[randomNumber];
    
            let dealerValue = ['R', 'P', 'S'][randomNumber];
            let yourValue = ['R', 'P', 'S'][index];
    
            let outcomes = {
                RR: 'Draw',
                PP: 'Draw',
                SS: 'Draw',
                RP: 'Dealer',
                RS: 'You',
                PR: 'You',
                PS: 'Dealer',
                SP: 'You',
                SR: 'Dealer',
            };
    
            let outComeValue = outcomes[yourValue + dealerValue]
    
            result.textContent = yourValue === dealerValue ? 'Match Draw': `${outComeValue} Won!!!`;
        },2500);
    });
})