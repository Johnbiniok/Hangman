$(document).ready(function () {
    //make an array for displaying the table
    var letters = [];
    var words = ['audience', 'right', 'predator', 'hoopla', 'ambiguous', 'biplane', 'momentary',
        'agility', 'composite', 'portrait', 'jigsaw', 'willow', 'drifting', 'bleak', 'gravel',
        'gadget', 'defection', 'closing', 'code', 'keyboard', 'warrior', 'everything'];
    //22 words (randomly picked)

    var another = 0, theWord, randomChoice, spacesWrite = "", lives = 6,
        displayLet, winIncrement = 0, winGoal, canvas, ctx, html;
    //hide all aspects of the game

    //hide the game initially
    $('#hideGame').hide();

    //hide replay button
    $('#replayGame').hide();

    //on button push show all aspects of the game and hide the start button
    $('#startGame').on('click', function () {
        initializeGame();
    });
    /*$('#replayGame').on('click',function(){
        theWord = "";
       initializeGame();
    });*/
    //this function shows the game and creates everything in it
    function initializeGame() {

        //initialize letters
        //make an array for displaying the table
        letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        //hide the start button
        $('#startGame').hide();

        //change the background element of the body by changing its class
        $('.firstPage').removeClass('firstPage').addClass('trueGame');

        //show game
        $('#hideGame').show();


        html = '<div id="keyboard">';

        //use loops to create the keyboard
        //use an outer for loop to separate rows
        for (let i = 0; another < letters.length; i++) {
            html += '<div class="separate">';
            //use an inner for loop to uniquely identify each div created and assign them to class key for styling
            for (let g = 0; g < 7; g++) {
                if (another < letters.length) {
                    html += '<div class="key notChosen" id="' + letters[another] + '">' + letters[another] + '</div>';
                }
                //you need to use an incrementer other than the loop controller because the
                //loop is 2 short of 7 at the end
                another++;
            }
            html += '</div>';
        }
        html += '</div>';

        $('#keyboard').replaceWith(html);
        $('#keyPad').replaceWith(html);


        //call function to randomly choose a word
        randomWord();


        //all canvas initialization
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        //set the color of the canvas
        ctx.strokeStyle = 'black';

        //set the line width
        ctx.lineWidth = 3;

        //draw the hanger
        //horizontal bottom
        ctx.moveTo(50, 130);
        ctx.lineTo(170, 130);
        ctx.stroke();

        //vertical line
        ctx.moveTo(100, 130);
        ctx.lineTo(100, 20);
        ctx.stroke();

        //horizontal top
        ctx.moveTo(100, 20);
        ctx.lineTo(175, 20);
        ctx.stroke();

        //line coming down
        ctx.moveTo(167, 20);
        ctx.lineTo(167, 40);
        ctx.stroke();


        //this function chooses a random word from the array
        function randomWord() {
            randomChoice = Math.floor((Math.random() * 22) + 1);
            theWord = words[randomChoice];
            addSlots(theWord);
        }

        //this function adds slots to correspond to the word
        function addSlots(theWord) {
            //figure out how many the user needs to guess correctly to win
            winGoal = theWord.length;
            for (let i = 0; i < theWord.length; i++) {
                spacesWrite += '<div id="space' + i + '" class="openSpace">__</div>';

            }
            $('#spaces').html(spacesWrite);
            console.log(theWord);
        }
        playGame();
    }
    function playGame() {
        //create a class to find which id was clicked
        $('.notChosen').on('click', function () {

            //this makes it so you can't choose the same letter twice
            if (!letters.includes(this.id)) {

            } else {
                //gets rid of chosen letters in the letters array
                letters.splice(letters.indexOf(this.id), 1);
                //$(this).replaceWith('<div class="key" id="chosen' + letters.indexOf(this.id) + '">' + letters[letters.indexOf(this.id)] + '</div>');


                //remove the class used as the selector once it has been chosen
                $(this).removeClass('notChosen');
                $(this).addClass('key1');
                $(this).removeClass('key');

                //use an if statement to find if it is included in the string
                if (theWord.includes(this.id.toLowerCase())) {

                    for (var t = 0; t < theWord.length; t++) {
                        if (theWord.charAt(t) === this.id.toLowerCase()) {
                            displayLet = this.id.toLowerCase();
                            winIncrement++;
                            replaceSpace(t);
                        }
                    }
                } else {
                    //will subtract a life and then build the stickman for a wrong guess
                    lives--;
                    buildStickMan();
                }
            }
        });
    }

    //function to replace the space with the letter
    function replaceSpace(spaceToReplace) {
        $('#space' + spaceToReplace).replaceWith('<div id="correct' + spaceToReplace + '" class="openSpace correctLetter">' + displayLet + '</div>');
        /*if($('.correctLetter').id === 'space0'){
            $('#space0').html.toUpperCase();
        }*/
        if (winIncrement === winGoal) {
            setTimeout(function () {
                userWin();
            }, 750);

        }
    }

    function buildStickMan() {
        if (lives === 5) {
            //draw the head
            ctx.moveTo(167, 50);
            ctx.beginPath();
            ctx.arc(167, 50, 10, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();
        } else if (lives === 4) {
            //draw body
            ctx.moveTo(167, 60);
            ctx.lineTo(167, 95);
            ctx.stroke();
        } else if (lives === 3) {
            //draw left arm
            ctx.moveTo(167, 64);
            ctx.lineTo(140, 80);
            ctx.stroke();
        } else if (lives === 2) {
            //draw right arm
            ctx.moveTo(167, 64);
            ctx.lineTo(194, 80);
            ctx.stroke();
        } else if (lives === 1) {
            //draw right leg
            ctx.moveTo(167, 95);
            ctx.lineTo(194, 120);
            ctx.stroke();
        } else if (lives === 0) {
            //draw left leg
            ctx.moveTo(167, 95);
            ctx.lineTo(140, 120);
            ctx.stroke();
            //game loss
            $('.key').addClass('key1');
            setTimeout(function () {
                displayLoss();
            }, 1700);
        }
    }
    //display win
    function userWin() {
        $('.endGame').replaceWith('<div id="youWon" class="center endGame"><span id="flash" class="winShow">Congratulations! You have WON</span></div>');
        makeBlink();
    }
    //display loss
    function displayLoss() {
        $('.endGame').replaceWith('<div id="youLost" class="center endGame"><span id="flash" class="loseShow">Your man has been hung! you LOSE</span></div>');
        makeBlink();
    }
    //makes the text blink
    function makeBlink(){
        var setflash = document.getElementById('flash');
        setInterval(function () {
            setflash.style.display = (setflash.style.display == 'none' ? '' : 'none');
        }, 1000);
        backToFirst();
    }
    //send the background to the homepage
    function backToFirst(){
        $('#hideGame').hide();
        $('#replayGame').show();
        //change the background element of the body by changing its class
        $('.trueGame').removeClass('trueGame').addClass('replayPage');
        gameOver();
    }
    function gameOver() {
        $('#replayGame').on('click', function () {
            $('div#keyboard').replaceWith('<div id="keyboard"></div>');
            $('div#spaces').replaceWith('<div id="spaces"></div>');
            $('#replayGame').hide();
            $('.endGame').replaceWith('<div id="displaywin" class="endGame"></div>');
            lives = 6;
            $('div#gameCanvas').replaceWith('<canvas id="gameCanvas"></canvas>');

            $('.key').removeClass('key1');
            initializeGame();
        });
    }

    //failed attempt to use an api to generate a random word
    /*var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://xkubist-random-word-v1.p.rapidapi.com/run.cgi",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "xkubist-random-word-v1.p.rapidapi.com",
            "x-rapidapi-key": "75a43e6c7dmsh81febc1d60029cep199973jsn45161f65ab56",
            "authorization": "Basic am9obmJpbmlvazpMaWtlYWJvc3MxOQ==",
            "probability_selection": "4000",
            "length_selection": "5-12",
            "word_selection": "all",
            "language_selection": "English"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });*/
});