$(document).ready(function () {
    //creating an array of arrays filled with a question, answer choices, the answer, and images
    var questions = [[
        "Which original pokemon game series was first released for gameboy?",
        "A) Silver and Gold",
        "B) Sun and Moon",
        "C) Red and Blue",
        "D) Black and White",
        "C) Red and Blue",
        "<img src='assets/images/redandblue.png'>", "Red and Blue came out first"
    ],
    [
        "What is the latest pokemon gameboy series called?",
        "A) Silver and Gold",
        "B) Ultra Sun and Ultra Moon",
        "C) Red and Blue",
        "D) Black and White",
        "B) Ultra Sun and Ultra Moon",
        "<img src='assets/images/sunandmoon.jpg'>", "Ultra Sun and Ultra Moon is the most recent"
    ], [
        "Who is the main character in the original Pokemon television series?",
        "A) Brook",
        "B) Misty",
        "C) Gary",
        "D) Ash",
        "D) Ash",
        "<img src='assets/images/ash.png'>", "Ash is the main character!"
    ], [
        "How many Pokemon can Eevee currently evolve into?",
        "A) 6", "B) 7", "C) 8", "D) 9", "C) 8", "<img src='assets/images/eevee1.webp'>", "Eight different Eeveelutions!"
    ], [
        "How many Pokemon types currently exist?",
        "A) 19",
        "B) 16",
        "C) 17",
        "D) 18",
        "D) 18",
        "<img src='assets/images/type.webp'>", "Currently, 18 Pokemon types!"
    ], [
        "Which Pokemon type has the SECOND least amount of Pokemon? (Note - this included Mega Pokemon and separate forms as their own individual Pokemon",
        "A) Ice",
        "B) Fairy",
        "C) Ghost",
        "D) Dragon",
        "A) Ice",
        "<img src='assets/images/ice.webp'>", "With 35 Pokemon, the Ice tpe is the second rarest Pokemon type."
    ], [
        "If there was a hypotheitical Pokemon that was all 18 types at once, it would only be weak to one Pokemon type. Which type would it be weak to?",
        "A) Rock",
        "B) Dark",
        "C) Ice",
        "D) Flying",
        "A) Rock",
        "<img src='assets/images/rock.webp'>", "It would only be weak to the Rock type"
    ], [
        "How many Pokemon have branch evolution?",
        "A) 8",
        "B) 10",
        "C) 12",
        "D) 9",
        "B) 10",
        "<img src='assets/images/branch.webp'>", "10 Pokemon have branched evolution lines."
    ], [
        "Which Pokemon was the first Pokemon ever created?",
        "A) Pickachu",
        "B) Mew",
        "C) Bulbasaur",
        "D) Rhydon",
        "D) Rhydon",
        "<img src='assets/images/rhydon.webp'>", "Rhydon was the first Pokemon created"
    ],
    [
        "Which of these legendary Pokemon can be either male or female?",
        "A) Darkrai",
        "B) Landorus",
        "C) Cresselia",
        "D) Heatran",
        "D) Heatran",
        "<img src='assets/images/heatran.webp'>", "Heatran is the only legendary Pokemon that can be either male or female."
    ]
    ]

    var nextQuestion = 0;//counter for the purpose of the next question
    var answerVar = questions[nextQuestion][5], answerText = questions[nextQuestion][7];
    var intervalId;
    var number = 30; // the start of each timer
    var imagesHere = questions[nextQuestion][6];
    var incorrect = 0, correct = 0, restarting = true;

    //hiding the "time remaining" portion in the html
    $(".RT").hide();
    $("button").on("click", function () {
        // if the restarting is false, it will go into the restart function and zero everything. This was necessary because without this, every time I restarted the game, it counted down starting at zero and into the negatives. 
        if (restarting === false) {
            restarting = true;
            restart();
        }
        $(".RT").show();
        start();
        $("#choices, #question").show();

    })
    // start function that will start the countdown and then goes to the 'next' function
    function start() {
        $("button").hide()
        intervalId = setInterval(decrement, 1000);
        next();
    }
    //This function shows the question from the array.  The question goes in order
    function next() {

        $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
        $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
        $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
        $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
        $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
    }

    // click function which adds the correct and incorrect answers
    $("#a, #b, #c, #d").click(function () {

        var a = $(this).text();
        if (a === answerVar) {
            correct++;
            number = 30;
            stop();
            greatJob();
        } else {
            incorrect++;
            stop();
            sorry();
        }

    })
    // every time I get a question correct, it will take me to this function which says you've got the question right and some pictures.  This will also have a setTimeout function which will wait about 3 seconds and then move on to the next question. (trying not to add any functions within a function to create a recurison.... I've done that with the previous jQuery homework)
    function greatJob() {
        if (nextQuestion == questions.length - 1) {
            imagesHere = questions[nextQuestion][6];
            answerText = questions[nextQuestion][7];
            $("#choices").hide();
            $("#question").html("<h1> Correct! <br>" + answerText + "</h1>");
            $("#images").show().html(imagesHere);

            setTimeout(function () {
                $("#question, #choices, #images").hide();
                gameOver();
            }, 3000);
        }
        imagesHere = questions[nextQuestion][6];
        answerText = questions[nextQuestion][7];
        $("#choices").hide();
        $("#question").html("<h1> Yes, sir!" + answerText + "</h1>");
        $("#images").show().html(imagesHere);

        nextQuestion++;// adding 1 so that we can move on to the next question in the array at the top
        answerVar = questions[nextQuestion][5];
        setTimeout(function () {
            start();
            $("#images").hide();
            $("#choices").show();
            $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
            $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
            $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
            $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
            $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
        }, 3000);
    }

    // big function that gets called when the user picks the wrong answer
    function sorry() {
        //this will show if you got the last question wrong and then go over to the gameOver function
        if (nextQuestion == questions.length - 1) {
            imagesHere = questions[nextQuestion][6];
            answerText = questions[nextQuestion][7];
            $("#choices").hide();
            $("#question").html("<h1> Sorry!<br>" + answerText + "</h1>");
            $("#images").show().html(imagesHere);

            setTimeout(function () {
                $("#question, #choices, #images").hide();
                gameOver();
            }, 3000);
        }

        imagesHere = questions[nextQuestion][6];
        answerText = questions[nextQuestion][7];
        $("#choices").hide();
        $("#question").html("<h1> Sorry~ You are not a NERD!<br>" + answerText + "</h1>");
        $("#images").show().html(imagesHere);

        nextQuestion++;
        answerVar = questions[nextQuestion][5];

        setTimeout(function () {
            start();
            $("#images").hide();
            $("#choices").show();
            $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
            $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
            $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
            $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
            $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
        }, 3000);

    }
    //function to count down from the remaining time
    function decrement() {
        number--;
        $("#timer").text(number);
        if (number === 0) {
            stop();
            $("#question, #choices").hide();
            $("#timer").html("<h2>Times Run Out! Start Over!</h2>");
            restarting = false;
            $("#start").show();
        }
    }
    //function to stop the setInterval's timing
    function stop() {
        clearInterval(intervalId);
    }
    // game over function that will tell you your scores and another button that will restart the game
    function gameOver() {
        $("#question, #choices").show();
        $("#start").show();

        restarting = false;
        $("#question").html("<h1> All done, here's how you did!</h1>");
        $("#final").show().html("<h2> Correct Answers: " + correct + "</h2>").append("<h2> Incorrect Answers: " + incorrect + "</h2>");
        $("#choices").hide();
        $("#start").html("<h1> Start Over? </h1>");
    }
    // zero-ing on all the variables so that we can start the game over BUT not resetting.
    function restart() {
        $("#final").hide();
        nextQuestion = 0, correct = 0, incorrect = 0, number = 30;
        answerVar = questions[nextQuestion][5];

        $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
        $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
        $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
        $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
        $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
    }

});