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
    var number = 30; // the start of each timer
    var imagesHere = questions[nextQuestion][6];
    var incorrect = 0, correct = 0;

    console.log(answerVar);
    $("button").on("click", function () {
        start();
        $("#choices, #question").show();
    })

    function start() {
        console.log(answerVar);
        $("button").hide()
        intervalId = setInterval(decrement, 1000);
        next();
    }
    function next() {

        // $("#choices, #question").show();
        console.log(nextQuestion);
        $("#question").html("<h3>" + questions[nextQuestion][0] + "</h3>");

        $("#a").html("<h4 value='a'>" + questions[nextQuestion][1] + "</h4>");
        $("#b").html("<h4 value='b'>" + questions[nextQuestion][2] + "</h4>");
        $("#c").html("<h4 value='c'>" + questions[nextQuestion][3] + "</h4>");
        $("#d").html("<h4 value='d'>" + questions[nextQuestion][4] + "</h4>");
    }

    $("#a, #b, #c, #d").click(function () {

        console.log(questions[nextQuestion][5]);
        var a = $(this).text();
        if (a === answerVar) {
            correct++;
            console.log("you got it!");

            if (nextQuestion == questions.length - 1) {

                $("#question, #choices").hide();
                gameOver();
            }
            stop();
            nextQuestion++;
            console.log(nextQuestion);
            answerVar = questions[nextQuestion][5];
            next();

        } else {
            incorrect++;

            stop();
            sorry();

        }

    })
    function decrement() {
        number--;
        $("#timer").text(number);
        if (number === 0) {
            stop();
            $("#question, #choices").hide();
            $("#timer").html("<h2>Times Run Out! Start Over!</h2>");
        }
    }
    function stop() {

        clearInterval(intervalId);
    }

    function sorry() {

        if (nextQuestion == questions.length - 1) {
            imagesHere = questions[nextQuestion][6];
            $("#choices").hide();
            $("#question").html("<h1> Sorry! The correct answer was: <br>" + answerVar + "</h1>");

            $("#images").show().html(imagesHere);

            
            setTimeout(function() {
                $("#question, #choices, #images").hide();
                gameOver();
            }, 3000);
            
        }

        imagesHere = questions[nextQuestion][6];
        $("#choices").hide();
        $("#question").html("<h1> Sorry! The correct answer was: <br>" + answerVar + "</h1>");

        $("#images").show().html(imagesHere);



        nextQuestion++;
        console.log(nextQuestion);
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
            console.log(answerVar);
        }, 3000);

    }

    function gameOver() {
        $("#question, #choices").show();
        $("#question").html("<h1> All done, here's how you did!</h1>");
        $("#choices").html("<h2> Correct Answers: " + correct + "</h2>").append("<h2> Incorrect Answers: " + incorrect + "</h2>");
        $("#start").html("<h1> Start Over? </h1>");

    }

});