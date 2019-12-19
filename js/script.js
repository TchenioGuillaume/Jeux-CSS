$(document).ready(function () {
 
/* ----------------- */
/* --- VARIABLES --- */
/* ----------------- */

    // Logic variables
    let delay = 1000;
    let rdmNumber1;
    let rdmNumber2;
    let score = 0;
    let record = 0;
    let interval = setInterval(changeColors, delay);

    // Colors
    const blue = 'lightblue';
    const green = 'lightgreen';
    const pink = 'lightpink';
    const red = 'lightcoral';
    const yellow = 'lightgoldenrodyellow';

    // Array of colors
    const colors = [blue, green, pink, red, yellow];

    // Elements
    const $div1 = $('#jsDiv1');
    const $div2 = $('#jsDiv2');
    const $button = $('.button');
    const $scoreP = $('.score-infos');
    const $body = $('body');
    const $start = $('.modal-button');
    const $modal = $('#jsToHide');


/* ----------------- */
/* --- FUNCTIONS --- */
/* ----------------- */

    // Pick a rdm color and change color of divs
    function changeColors() {
        rdmNumber1 = getNumber();
        rdmNumber2 = getNumber();

        $div1.css('background-color', colors[rdmNumber1]);
        $div1.css('transition', 'all 0.2s ease');
        $div2.css('background-color', colors[rdmNumber2]);
        $div2.css('transition', 'all 0.2s ease');
    }

    // Pick a random color
    function getNumber() {
        const rdmNumber = Math.floor(Math.random() * (colors.length));
        return rdmNumber;
    }

    // Check if the player has won
    function checkVictory() {
        if (rdmNumber1 === rdmNumber2) {
            score++;
            $scoreP.html('record : ' + record + '<br/>' + score);
            checkScore();
        } else {
            clearInterval(interval);
            gameOver();
        }
    }

    // Check score
    function checkScore() {
        if (score >=10 && score < 15) {
            clearInterval(interval);
            delay = 800;
            interval = setInterval(changeColors, delay);
        } else if (score >= 15 && score < 20) {
            clearInterval(interval);
            delay = 500;
            interval = setInterval(changeColors, delay);
        } else if (score >= 20) {
            clearInterval(interval);
            delay = 200;
            interval = setInterval(changeColors, delay);
        }
    }

    // GameOver
    function gameOver() {
        clearInterval(changeColors);
        $scoreP.html('Perdu !<br/>Score : ' + score + '<br/>Appuyez sur une touche pour recommencer');
        $scoreP.css('font-size', '50px');
        if (score >= record) {
            record = score;
        }
        $body.keydown(function () {
            restartGame();
        });
    }

    // Restart
    function restartGame() {
        clearInterval(interval);
        score = 0;
        delay = 1000;
        $scoreP.html('record : ' + record + '<br/>' + score);
        interval = setInterval(changeColors, delay);
    }


/* ---------------- */
/* ----- FLOW ----- */
/* ---------------- */

    // Initialize function
    $start.on('click', function () {
        $modal.addClass('hidden');
        interval;
    });

    // Check victory when the player click on the button
    $button.on('click', function () {
        checkVictory();
    });

});
