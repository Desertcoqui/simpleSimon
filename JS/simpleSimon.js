///**
// * Created by PapoteDetres1 on 12/9/16.
// */
$(document).ready(function () {
    'use strict';



//global variables
    var redTile = $('#red');
    var blueTile = $('#blue');
    var yellTile = $('#yellow');
    var greenTile = $('#green');
    var score = $('.level');
    var start = $('#start');
    var strict = $('#strict');

    var strictMode = false;
    var power = false;

    var computerMoves = [];
    var playerMoves = [];
    var count;

//sound and animation functions--
    var red = function () {
        redTile.fadeOut(500).fadeIn(200);
        //sound1.play();
    };

    var blue = function () {
        blueTile.fadeOut(500).fadeIn(200);
        //sound2.play();
    };

    var yellow = function () {
        yellTile.fadeOut(500).fadeIn(200);
        //sound3.play();
    };

    var green = function () {
        greenTile.fadeOut(500).fadeIn(200);
        // sound4.play();
    };


//device on
    start.on('click', play);
    strict.on('click', setStrict);
//functions


//click functionality of tiles

    function play() {
        if (power == false) {
            power = true;
            score.html(0);

            redTile.on('click', red);
            blueTile.on('click', blue);
            yellTile.on('click', yellow);
            greenTile.on('click', green);
            redTile.on('click', trakMove);
            blueTile.on('click', trakMove);
            greenTile.on('click', trakMove);
            yellTile.on('click', trakMove);
            startGame();
        } else {
            gameOff();
        }
    }

    function overCheck() {
        if (count == 20) {
            alert('You Win!');
            gameOff();
            playerMoves = [];
        }
    }

    function setStrict() {
        if (strictMode == false) {
            strictMode = true;
            strict.addClass('pressed');
        } else {
            strictMode = false;
            strict.removeClass('pressed');
        }
    }

    function gameOff() {
        power = false;
        strictMode = false;
        strict.removeClass('pressed');
        score.html('--');
        redTile.off('click');
        blueTile.off('click');
        yellTile.off('click');
        greenTile.off('click');
    }

    function startGame() {
        computerMoves = [];
        playerMoves = [];
        count = 0;
        score.html(count);
        fillChallenge();
        //computerMoves[0]();
        playSteps(0);
    }

    var seqArr = [red, blue, yellow, green];

//loops through the seqArr variable to create 20 random patterns

    function fillChallenge() {
        for (var i = 0; i < 20; i++) {
            computerMoves.push(seqArr[Math.floor(Math.random() * seqArr.length)]);
        } //console.log(computerMoves);
    }

    function playSteps(j) {
        j = j || 0;
        computerMoves[j]();
        if (j < count) {
            setTimeout(function () {
                j++;
                playSteps(j);
            }, 1400);
        }

    }

//check if player matches simon
    function moveChecker(x) {

        if (playerMoves[x] == computerMoves[x]) {
            return true;
        } else {
            return false;
        }
    }
});

//player move pushed into array
function trakMove() {
    var clicked = this.id;

    switch (clicked) {
        case 'blue':
            playerMoves.push(blue);
            success();
            break;
        case 'yellow':
            playerMoves.push(yellow);
            success();
            break;
        case 'red':
            playerMoves.push(red);
            success();
            break;
        case 'green':
            playerMoves.push(green);
            success();
    }
}

function success() {
    if (strictMode && !moveChecker(playerMoves.length - 1)) {
        score.html('You SUCK!');
        setTimeout(gameOff, 2000);
    } else if (!moveChecker(playerMoves.length - 1)) {
        score.html('You Suck!');
        playerMoves=[];
        setTimeout(playSteps, 2000);
    } else {
        //count++;
        correctSeq();
        score.html(count);
        overCheck();

    }
}

function correctSeq() {
    if (playerMoves.length-1 === count) {
        count++;
        setTimeout(playSteps, 2000);
        playerMoves = [];
    }
}