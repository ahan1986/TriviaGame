$(document).ready(function () {
    //creating an array of objects filled with a question, answer choices, and the answer
    var questions = [[
        "Which original pokemon game series was first released for gameboy?",
        "A) Silver and Gold",
        "B) Sun and Moon",
        "C) Red and Blue",
        "D) Black and White",
        "C) Red and Blue",
        "<img src='assets/images/redandblue.png'>"
    ],
    [
        "What is the latest pokemon gameboy series called?",
        "A) Silver and Gold",
        "B) Ultra Sun and Ultra Moon",
        "C) Red and Blue",
        "D) Black and White",
        "B) Ultra Sun and Ultra Moon",
        "<img src='assets/images/sunandmoon.jpg'>"
    ], [
        "Who is the main character in the original Pokemon television series?",
        "A) Brook",
        "B) Misty",
        "C) Gary",
        "D) Ash",
        "D) Ash",
        "<img src='assets/images/ash.png'>"
    ]]

    var nextQuestion = 0;//counter for the purpose of the next question
    var answerVar = questions[nextQuestion][5];
    var intervalId;
    var number = 15; // the start of each timer
    var imagesHere = questions[nextQuestion][6];
    var incorrect = 0, correct = 0, restarting = true;

    //hiding the "time remaining" portion in the html
    $(".RT").hide();
    $("button").on("click", function () {
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
            number = 15;
            stop();
            greatJob();
        } else {
            incorrect++;
            stop();
            sorry();
        }

    })
    function greatJob() {
        if (nextQuestion == questions.length - 1) {
            imagesHere = questions[nextQuestion][6];
            $("#choices").hide();
            $("#question").html("<h1> Correct! The correct answer is: <br>" + answerVar + "</h1>");
            $("#images").show().html(imagesHere);

            setTimeout(function () {
                $("#question, #choices, #images").hide();
                gameOver();
            }, 3000);
        }
        imagesHere = questions[nextQuestion][6];
        $("#choices").hide();
        $("#question").html("<h1> Great Job, NERD! The answer is: <br>" + answerVar + "</h1>");
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

    // big function that gets called when the user picks the wrong answer
    function sorry() {
        //this will show if you got the last question wrong and then go over to the gameOver function
        if (nextQuestion == questions.length - 1) {
            imagesHere = questions[nextQuestion][6];
            $("#choices").hide();
            $("#question").html("<h1> Sorry! The correct answer was: <br>" + answerVar + "</h1>");
            $("#images").show().html(imagesHere);

            setTimeout(function () {
                $("#question, #choices, #images").hide();
                gameOver();
            }, 3000);
        }

        imagesHere = questions[nextQuestion][6];
        $("#choices").hide();
        $("#question").html("<h1> Sorry~ You are not a NERD! The correct answer was: <br>" + answerVar + "</h1>");
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
        nextQuestion = 0, correct = 0, incorrect = 0, number = 15;
        answerVar = questions[nextQuestion][5];

        $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");
        $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
        $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
        $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
        $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
    }

});