$(function(){
    var questions = [
        {q:"What is the name of the paper company?", a:"Slumdunder Mifflinaire", b:"Dunder Mifflin", c:"Vance Paper", d:"Scott's Tot's Paper", answer: "Dunder Mifflin" },
        {q:"Who gave Michael the 'World's Best Boss' Mug?", a:"Dwight", b:"His Mom", c:"Himself", d:"Corporate", answer: "Himself" },
        {q:"What is the name of their annual awards event?", a:"The Oscarettes", b:"The Coffe Mugs", c:"The Dundees", d:"The Mifflins", answer: "The Dundees" },
        {q:"Michael is not superstitious but he is ", a:"always scared", b:"religious", c:"a little stitious", d:"in a cult", answer: "a little stitious" },
        {q:"When does Jim confess his love to Pam?", a:"Casino Night", b:"Rabies 5k", c:"Gas station", d:"Booze Cruise", answer: "Casino Night" },
        {q:"What does Michael put in Toby's desk to frame him for drug possession?", a:"Caprese Salad", b:"Cilantro", c:"Oregano", d:"Real drugs", answer: "Caprese Salad" },
        {q:"Who started the fire with their cheese pita?", a:"Michael", b:"Creed", c:"Kevin", d:"Ryan", answer: "Ryan" },
        {q:"Who has the final lines in the finale?", a:"Michael", b:"Jim", c:"Pam", d:"Dwight", answer: "Pam" }
    ];
    
    var i = 0;
    var time = 20;
    var isRunning = false;
    var timer;
    var userChoice;
    var next;
    var reveal;
    var timesUp = false;
    var correct = 0;
    var incorrect = 0;
    var noAnswer = 0;
    var questionsLeft= 8;
    
    $(".main").hide();

    $("#start").click(function(){
        start();

    })
    
    function start(){
        reset();
        $("#score").empty();
        i = 0;
        time = 20;
        isRunning = false;
        timer;
        userChoice;
        next;
        reveal;
        timesUp = false;
        correct = 0;
        incorrect = 0;
        noAnswer = 0;
        questionsLeft= 8;
        $(".main").show();
        $("#time").text("Seconds Left: " +time);
        $("#start").hide();
        displayQuestion();
    }

    function nextQuestion(){
        
            i++;
            questionsLeft--;
            if (i < questions.length){
                displayQuestion();
                    
            }
            else{
                $(".main").hide();
                $("#start").show();
                $("#score").append("Game Over! Here are your results! <br> ");
                $("#score").append("Correct: " + correct + "<br>");
                $("#score").append("Incorrect: " + incorrect + "<br>");
                $("#score").append("Unanswered: " + noAnswer + "<br>");
                var image = $("<img id = #score-image>").attr("src",  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif")
                $("#score").append(image);

            }
            
        
    }
    function displayQuestion(){
        $("#left").text(questionsLeft);
        $("#question").text(questions[i].q);
        $("#result").hide();
        $("#answers").show();
        $("#buttonA").html(questions[i].a);
        $("#buttonB").html(questions[i].b);
        $("#buttonC").html(questions[i].c);
        $("#buttonD").html(questions[i].d); 
        if (!isRunning){
            timer = setInterval(decrement, 1000);     
            // reveal = setTimeout(displayAnswer,5000); 
            // next = setTimeout(nextQuestion, 10000);  
            isRunning = true;
        }
        
    }

    function decrement(){
        time--;
        $("#time").text("Seconds Left: " + time);
        
        if (time < 0) {
            displayAnswer();
            clearInterval(timer);
            isRunning = false;
            time = 20;
            $("#time").text("Seconds Left: " +time);
            setTimeout(nextQuestion, 5000); 
        }
        if(time === 0){
            timesUp = true;
        }
    }

    function reset(){
        clearInterval(timer);
        clearTimeout(next);
        clearTimeout(reveal);
        isRunning=false;
        time = 20;
        $("#time").text("Seconds Left: " +time);

    }

    function displayAnswer(){
        $("#answers").hide();
        $("#result").show();
        checkAnswer();
    }    


    function checkAnswer(){
        if (userChoice === questions[i].answer){
            
            $("#result").html("Correct!<br>" + "<img src = 'https://media0.giphy.com/media/Is1O1TWV0LEJi/giphy.gif' class = img-fluid>"); 
            
            correct++;
        }
        else if(timesUp){
            
            $("#result").html("Times up! The correct answer is "+ questions[i].answer + "<br>"+ "<img src ='https://media1.popsugar-assets.com/files/thumbor/_CA2MamkFlq5aLDby0ch60I9PGU/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/03/10/3/192/1922283/691747b5411a3c6c_url-14/i/One-day-when-Pam-middle--camera-interview-Jim.gif' class = img-fluid>"); 
            noAnswer++;
            timesUp = false;
        }
        else {
            
            $("#result").html("Wrong! The correct answer is " + questions[i].answer + "<br>"  + "<img src = 'https://media.giphy.com/media/10uoxQhDburBiE/giphy.gif' class = img-fluid>"); 
            incorrect++;
        }
        
    }

    $(".answer").on("click",function(){
        userChoice = $(this).text();
        reset();
        displayAnswer();
        setTimeout(nextQuestion, 5000);
        

    })
})




