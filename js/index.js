class AudioController {
  constructor() {
      this.bgMusic = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3');
      this.flipSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav');
      this.matchSound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/match.wav');
      this.victorySound = new Audio('https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/victory.wav');
      // this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
      this.bgMusic.volume = 0.5;
      this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
    setTimeout(() => {
      this.bgMusic.pause();
    }, 8000);
  }
  stopMusic() {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
  }
  flip() {
      this.flipSound.play();
  }
  match() {
      this.matchSound.play();
  }
  victory() {
      this.stopMusic();
      this.victorySound.play();
  }
  gameOver() {
      this.stopMusic();
      this.gameOverSound.play();
  }
}

class MixOrMatch {
  constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById('time')
      this.ticker = document.getElementById('flips');
      this.audioController = new AudioController();
  }

  startGame() {
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      this.cardToCheck = null;
      this.matchedCards = [];
      this.busy = true;
      setTimeout(() => {
          this.audioController.startMusic();
          this.shuffleCards(this.cardsArray);
          this.countdown = this.startCountdown();
          this.busy = false;
      }, 500)
      this.hideCards();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.totalClicks;
  }
  startCountdown() {
      return setInterval(() => {
          this.timeRemaining--;
          this.timer.innerText = this.timeRemaining;
          if(this.timeRemaining === 0)
              this.gameOver();
      }, 1000);
  }
  gameOver() {
      clearInterval(this.countdown);
      this.audioController.gameOver();
      document.getElementById('game-over-text').classList.add('visible');
  }
  victory() {
      clearInterval(this.countdown);
      this.audioController.victory();
      this.audioController.stopMusic();
      document.getElementById('victory-text').classList.add('visible');
  }
  hideCards() {
      this.cardsArray.forEach(card => {
          card.classList.remove('visible');
          card.classList.remove('matched');
      });
  }
  flipCard(card) {
      if(this.canFlipCard(card)) {
          this.audioController.flip();
          this.totalClicks++;
          this.ticker.innerText = this.totalClicks;
          card.classList.add('visible');

          if(this.cardToCheck) {
              this.checkForCardMatch(card);
          } else {
              this.cardToCheck = card;
          }
      }
  }
  checkForCardMatch(card) {
      if(this.getCardType(card) === this.getCardType(this.cardToCheck))
          this.cardMatch(card, this.cardToCheck);
      else 
          this.cardMismatch(card, this.cardToCheck);

      this.cardToCheck = null;
  }
  cardMatch(card1, card2) {
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.audioController.match();
      if(this.matchedCards.length === this.cardsArray.length)
          this.victory();
  }
  cardMismatch(card1, card2) {
      this.busy = true;
      setTimeout(() => {
          card1.classList.remove('visible');
          card2.classList.remove('visible');
          this.busy = false;
      }, 1000);
  }
  shuffleCards(cardsArray) {
      for (let i = cardsArray.length - 1; i > 0; i--) {
          const randIndex = Math.floor(Math.random() * (i + 1));
          [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
      }
      cardsArray = cardsArray.map((card, index) => {
          card.style.order = index;
      });
  }
  getCardType(card) {
      return card.getElementsByClassName('card-value')[0].src;
  }
  canFlipCard(card) {
      return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
  }
}

$(() => {
  
      $.getJSON("../json/card.json",
  
        (data) => {
          $("div#card__row").html("");
  
          for (let i = 0; i < 2; i++) {
            $.each(data, function (key, value) {
              let str = "";
  
              let cornerImg =
                "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png";
  
              let cornerImgGrey =
                "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png";
  
              let spider =
                "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Spider.png";
  
              str += "<div class='col-6 col-md-4 col-lg-3 p-0 d-flex align-items-center justify-content-center'>";
              str += `<div class="card-item rounded">
                  <div class="card-back card-face bg-dark rounded">
                       <img class="cob-web cob-web-top-left"
                         src="${cornerImg}">
                       <img class="cob-web cob-web-top-right"
                         src="${cornerImg}">
                       <img class="cob-web cob-web-bottom-left"
                         src="${cornerImg}">
                       <img class="cob-web cob-web-bottom-right"
                         src="${cornerImg}">
                       <img class="spider"
                         src="${spider}">
                     </div>
                     <div class="card-front card-face">
                       <img class="cob-web cob-web-top-left"
                         src="${cornerImgGrey}">
                       <img class="cob-web cob-web-top-right"
                         src="${cornerImgGrey}">
                       <img class="cob-web cob-web-bottom-left"
                         src="${cornerImgGrey}">
                       <img class="cob-web cob-web-bottom-right"
                         src="${cornerImgGrey}">
                       <img class="card-value"
                         src="${value.mainImg}">
                      </div>
                     </div>`;
              str += "</div>";
              $("div#card__row").html($("div#card__row").html() + str);

            });
          }

            let overlays = Array.from(document.getElementsByClassName("overlay-text"));
            let cards = Array.from(document.getElementsByClassName("card-item"));
            let game = new MixOrMatch(10,cards);
        
            overlays.forEach((overlay) => {
                 overlay.addEventListener('click', ()=> {
                    overlay.classList.remove('visible');
                    let auidoController = new AudioController();
                    auidoController.startMusic();
                    game.startGame();
                 })
            })
        
            cards.forEach((card)=> {
                card.addEventListener('click', ()=> {
                   game.flipCard(card);
                })
            })

        });

  });