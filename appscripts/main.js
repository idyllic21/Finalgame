// Tan Jing Wen Michelle (A0126390J)

require(

   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
        ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {
        console.log("Updated Main");

        // grabs the div to put the Raphael paper
        var mySVGCanvas = document.getElementById("mySVGCanvas");
        var paper = new Raphael(mySVGCanvas);

        //var pWidth = paper.canvas.offsetWidth;
       var pWidth = 1;
        //var pHeight = paper.canvas.offsetHeight;
       var pHeight = 1;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        var button = document.getElementById("buttonone"); //button to enable user to skip story line if watched before. 
        var button2 = document.getElementById("buttontwo"); //button to enable user to skip story line if watched before. 


        //==================================================================
        // USER SETTINGS 
        //==================================================================

        //Initial welcome message + prompts for user's name and preferred buddy's name. 
        var userName= prompt("Welcome to Survival Instincts. \n\n Do you think you have what it takes to survive? \nIf your answer is a strong, definite 'yes', proceed on. If you said 'no', well... You don't have a choice. \n\n So... first things first, what is your name? ");
        var buddyName= prompt("Okay, hi there, " + userName + ". \n\nYou will be embarking on a journey with a good, old friend. So what might your good friend's name be?");
        alert("Okay, your buddy is called " + buddyName + "\n\nRight before we begin, please ensure that your volume is turned on (not too loud though).");
        alert("Okay, " + userName + ", so you are an aspiring pilot, with the dreams of flying around the world. \n\n You are now going to embark on your very first journey to the South America with " + buddyName + " \n\n Here's what happened...\n\n ** (If you've watched the storyline, you can skip it by clicking on the button at the bottom left of the page!)");



//===========================================================================================================
//===========================================================================================================
//                                           LOADING OF SOUNDS
//===========================================================================================================
//===========================================================================================================
        var helicopterBGM = new Audio('resources/helicopter.wav'); // an alert sound (used in mousedown tracking)
        var stormBGM = new Audio('resources/thunderstorm.m4a'); // BGM for storm scenes
        var thunderBGM = new Audio('resources/thunderstrike.wav'); // BGM for thunderstrike
        var crashBGM = new Audio('resources/crash.wav');
        var menuBGM = new Audio('resources/techno.wav'); // BGM for menu page
        var hoverBGM = new Audio('resources/hover.ogg'); // hover alert sound 
        hoverBGM.volume = .25; // sets the volume at 0.15, between the range of 0 and 1.0. --> makes the hover alert more subtle. 
        var clickBGM = new Audio('resources/click.wav'); // hover alert sound 
        clickBGM.volume = .15; // sets the volume at 0.15, between the range of 0 and 1.0.
        var gameBGM = new Audio('resources/gameBGM.mp3');
        var alarmBGM = new Audio('resources/alarm.wav');
        var ouchBGM = new Audio('resources/ouch.mp3');
        var winBGM = new Audio('resources/win.wav');
        var loseBGM = new Audio('resources/lose.wav');
        var splatBGM = new Audio('resources/splat.wav');
        splatBGM.volume = .20;

        // Function for fading out the volume for the menuBGM once the game starts
        function fadeVolume(volume) {
            var factor  = 0.01,
            speed = 20; // speed of 20 ms to be used as the interval for the setTime out
            if (volume > factor) { // setTimeout function will be called as long as the volume is still greater than 0.01
                setTimeout(function(){
                   fadeVolume(menuBGM.volume -= factor);         
                }, speed);
            }
            else {
                menuBGM.pause(); // ensures that the song completely stops with 0 volume. 
                console.log("MenuBGM Ends."); 
            }
        };

//===========================================================================================================
//===========================================================================================================
//                                          LOADING OF IMAGES
//===========================================================================================================
//===========================================================================================================
        var clearsky = paper.image("images/sky.jpg", 0, 0, pWidth, pHeight);
        var stormsky = paper.image("images/stormsky.jpg", 0, 0, pWidth, pHeight);
        var helicopter = paper.image("images/helicopter.png", 20, 110, 480, 200);
        var lightning = paper.image("images/lightning.svg", 380, 100, 100, 110);
        var nextRect = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);
        var nextRect2 = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);
        var nextRect3 = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);
        var nextRect4 = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);
        var nextRect5 = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);
        var scene5BG = paper.rect(0, 0, pWidth, pHeight).attr({"fill":"black"}); //sets paper to black colour.
         var forest= paper.image("images/rainforest.jpg", 0, 0, pWidth, pHeight);
         var gameRect= paper.image("images/gameforest.jpg", 0, 0, pWidth, pHeight).attr({"opacity": 0.58});
    //     var gameFly = paper.image("images/fly.png", 100, 100, 100, 75);
        var nextRect6 = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);
        var nextRect7 = paper.image("images/nextbutton.png", pWidth-150, pHeight-90, 130, 50);


        //Hiding irrelevant images from the screen
        stormsky.hide();
        lightning.hide();
        nextRect.hide(); nextRect2.hide(); nextRect3.hide(); nextRect4.hide(); nextRect5.hide();
        forest.hide();
        gameRect.hide();
        nextRect6.hide();
        nextRect7.hide();
        scene5BG.hide();

//===========================================================================================================
//===========================================================================================================
//                                     NARRATIVES FOR THE STORYLINE 
//===========================================================================================================
//===========================================================================================================


        var scene1text = paper.text(700, 200, userName + ", you were cruising through the skies\n with your best bud, " + buddyName + " \n The two of you were flying \njust above the Amazon forest. ").attr({"font-size":"20px", "fill":"white"});
        var scene2text = paper.text(700, 200, "Stormy clouds appeared all of a sudden\n We are facing some turbulence. \n You're trying your best\n to control the helicopter.\n Gotta stay calm.").attr({"font-size":"20px", "fill":"white"});
        var scene3text = paper.text(700, 200, "BOOM\n You felt a catastrophic thump\n on the helicopter. \n Oh no, you're hit!\n It's the lightning. \n Stay calm...").attr({"font-size":"20px", "fill":"white"});
        var scene4text = paper.text(700, 200, "You lost all control of the helicopter\n It's not use... You're heading down...").attr({"font-size":"20px", "fill":"white"});
        var scene5text = paper.text(460, 200, "It's all a blur.").attr({"font-size":"20px", "fill":"white"});
        var scene5text2 = paper.text(460, 250, "How did I get myself into this?").attr({"font-size":"20px", "fill":"white"});
        var scene5text3 = paper.text(pWidth/2, 300, "... " + buddyName + "??").attr({"font-size":"20px", "fill":"white"});

        //Hiding the messages from the screen
        scene1text.hide();
        scene2text.hide();
        scene3text.hide();
        scene4text.hide();
        scene5text.hide();
        scene5text2.hide();
        scene5text3.hide();



        //===========================================================================================================
//===========================================================================================================
//                                           GAME MENU PAGE
//===========================================================================================================
//===========================================================================================================

        //==================================================================
        // Game Menu & Settings
        //==================================================================
        //add a button for skipping the story line
            // setting as global variables so that they can be listened to with eventlisteners

        var gameMenuText = paper.text(pWidth/2, 95, buddyName + " is nowhere to be found...\n" + userName + ", what's your next step?").attr({"font-size":"32px", "font-weight": "bold", "fill":"white"});

        // Buttons for the Game Menu
        var gameStart = paper.circle(240,270,80).attr({fill:"white", opacity:"0.9"});
        var chooseLevel = paper.circle(440,270,80).attr({fill:"white", opacity:"0.9"});
        var help = paper.circle(640,270,80).attr({fill:"white", opacity:"0.9"});

        var gameStartText = paper.text(240, 270, "I'm \nready").attr({"font-size":"25px", "font-weight": "bold", "fill":"black"});
        var chooseLevelText = paper.text(440, 270, "choose \na level").attr({"font-size":"25px", "font-weight": "bold", "fill":"black"});
        var helpButtonText = paper.text(640, 270, "help").attr({"font-size":"25px", "font-weight": "bold", "fill":"black"});

            gameMenuText.hide();
            gameStart.hide();
            gameStartText.hide();
            chooseLevel.hide();
            chooseLevelText.hide();

            help.hide();
            helpButtonText.hide();
            forest.hide();

        var gameMenu = function () {        //shows the menu page and loops the menu BGM. 
            stormBGM.pause();
            menuBGM.play(); // plays menu BGM 
            menuBGM.volume = 1; 
            menuBGM.loop= true;  // enable music to loop when played
            forest.show();
            forest.toBack();
            gameMenuText.show();
            gameStart.show();
            gameStartText.show();
            chooseLevel.show();
            chooseLevelText.show();
            help.show();
            helpButtonText.show();
        }

        var hideGameMenu = function(){ 
            gameMenuText.hide();
            gameStart.hide();
            gameStartText.hide();
            chooseLevel.hide();
            chooseLevelText.hide();
            help.hide();
            helpButtonText.hide();
            forest.hide();
        }



        // Images and texts for the Help Screen
        var helpClose = paper.image("images/closebutton.png", 832, 15, 35, 35);
        var helpRect = paper.image("images/plank.png", 50, 25, 800, 350).attr({opacity:"0.95", "stroke": "white", "stroke-width": 4});
        var helpText = paper.text(pWidth/2, pHeight/2, "You suspect that you have crashed somewhere in the Amazon Forest. \n \nWhen you have regained consciousness, you realised that your buddy, " + buddyName + "\n is nowhere to be seen. \n \nBut you see a faint blood trail leading deeper into the forest. \n  \nProceed into the forest and find " + buddyName + " \n\n any sign of civilisation, before you eventually pass out from exhaustion, hunger and thirst.").attr({fill:"black", "font-size": "18"});
        helpClose.hide();
        helpRect.hide();
        helpText.hide();

        // Images and texts for the chooseLevel Screen
        var chosenLevel = 1; //initialise 1 (Easy) as the default level for the game 
        var chosenLevelText = "Easy"; //initalise it as Easy (a string). 

        //Background, text and buttons for the chooseLevel Screen
        var levelRect = paper.rect(50, 25, 800, 350).attr({fill:"#683f35", opacity:"0.985", "stroke": "white", "stroke-width": 4});
        var levelText = paper.text(pWidth/2, 120, "Select your desired level of difficulty:").attr({"fill":"white", "font-size": "24"});
        var level1Button = paper.image("images/easybutton.png", 190, 200, 120, 92);
        var level2Button = paper.image("images/mediumbutton.png", 390, 200, 120, 92);        
        var level3Button = paper.image("images/hardbutton.png", 590, 200, 120, 92);

        // hide the irrelevant image/text/buttons, since they are set as global variables
        levelRect.hide();
        levelText.hide();       
        level1Button.hide();
        level2Button.hide();
        level3Button.hide();


    //----------------------------- FUNCTIONS: FOR THE HELP/LEVEL PAGES TO POP UP. -------------------------------------------//

        // Function that calls for the pop up for the help page. 
        var helpPage= function(){ 
            helpRect.show();
            helpText.show();
            helpClose.show();
            helpClose.toFront();
        };
        // Function that calls for the pop up for the level page. 
        var levelPage= function (){
            levelRect.show();
            levelText.show();
            levelText.toFront();
            level1Button.show();
            level2Button.show();
            level3Button.show();
            helpClose.show();
            helpClose.toFront();

            //Event Listeners for the buttons on the level page. 
            level1Button.addEventListener('click', function(){ 
              chosenLevel = 1;
              chosenLevelText = "Easy";
              clickBGM.play();
              levelText.hide();
              levelText = paper.text(pWidth/2, 120, "Current Level: \n" + chosenLevelText).attr({"fill":"white", "font-size": "24"});
              levelBar.attr({text: "Level : " + chosenLevelText});
              console.log("Level 1 selected");
            });
            level2Button.addEventListener('click', function(){
              chosenLevel = 2;
              chosenLevelText = "Medium";
              levelText.hide();
              levelText = paper.text(pWidth/2, 120, "Current Level: \n" + chosenLevelText).attr({"fill":"white", "font-size": "24"});
              clickBGM.play();
              levelBar.attr({text: "Level : " + chosenLevelText});
              console.log("Level 2 selected");
            });
            level3Button.addEventListener('click', function(){
              chosenLevel = 3;
              chosenLevelText = "Hard";
              levelText.hide();
              levelText = paper.text(pWidth/2, 120, "Current Level: \n" + chosenLevelText).attr({"fill":"white", "font-size": "24"});
              clickBGM.play();
              levelBar.attr({text: "Level : " + chosenLevelText});
              console.log("Level 3 selected ");
             });
        };



        //==================================================================
        // Storyline at the Start
        //==================================================================
        
        var sceneNumber; // Helps to keep track of the scene number. 

        // Scene 1 --> Cruising through the skies
        var scene1 = function () { 
            //hideGameMenu();

            sceneNumber = 1; 
            console.log("Scene 1 --> Cruising through the skies");
            helicopterBGM.loop= true;  // enable music to loop when played
            helicopterBGM.play();      // plays the helicopter BGM     
            setInterval(movingHelicopter, 1500); //calls the movingHelicopter function every 500ms
            setTimeout(function(){scene1text.show();}, 1000); //Shows text after 1 second
            setTimeout(function(){nextRect.show();}, 2000); // Shows nextRect after 2 seconds
            console.log("Skies are clear!"); 

        }


        // Scene 2 --> Losing control
        var scene2= function () { 

            sceneNumber = 2; 
            console.log("Scene 2 --> Losing control");

            for (i = 0; i < maxRaindrop; i++) { // loop to create 'maxRaindrop' number of raindrops; default = 100
                rain[i]= paper.image("images/raindrop.svg", 0, 0, 30, 30); //sets each rain[i] as a raindrop image
                console.log("Raindrop " + (i+1) + " created.");    
                rain[i].xpos=Math.random() * (pWidth - 0) + 1;      // default = initial xpos of rain[i], changes when modified in function draw
                rain[i].ypos=Math.random() * (0 - (-200));          // default = initial ypos of rain[i], changes when modified in function draw
                console.log("Raindrop " + (i+1) + " xpos = " + rain[i].xpos + ", ypos = " + rain[i].ypos);

                // Add properties to keep track of the rate the raindrop is moving
                rain[i].xrate= -1.3; //direction of raindrops is affected by strong winds
                rain[i].yrate= 7  // setting all the raindrops to fall at a constant speed
                console.log("Rain " + (i+1) + " xrate = " + rain[i].xrate + ", yrate = " + rain[i].yrate);
            }

            setInterval(draw, 40); // calls the draw function for the raindrops to move every 40ms


            var nextToEmit=0; // initialise next raindrop to emit to 0
            // Function to enable the storm to continue (emitting more raindrops from the top of the screen)
            setInterval(function(){
                rain[nextToEmit].xpos= Math.random() * (pWidth - 0) + 1; //setting xpos to be a value between 1 and PWidth
                rain[nextToEmit].ypos= -10; //setting ypos to be slightly above the screen before falling into the screen
                rain[nextToEmit].xrate= -1; //so that raindrop moves -1 units in the x position due to strond winds
                rain[nextToEmit].yrate= 7; //so that raindrop falls 7 units in the y position

                nextToEmit=(nextToEmit+1) % maxRaindrop; // % operator used so that the rain does not stop after value of maxRaindrop. 

                },20); 
              
            setInterval(wobblyHelicopter, 1000); //calls function every 1s (makes the helicopter wobbly)
            setTimeout(function(){scene2text.show(); scene2text.toFront();}, 1500); 
            console.log("Seems like we are experiencing some turbulence!");
            setTimeout(function(){nextRect2.show(); nextRect2.toFront();}, 4000);
            
        }


        var scene3 = function () {
            sceneNumber = 3;
            lightning.show(); 
            setInterval(lightningStrike, 500);
            setTimeout(thunderSound, 500);
            setInterval(wobblyHelicopter, 800);
            setTimeout(function(){scene3text.show();scene3text.toFront();}, 1500);
            setTimeout(function(){nextRect3.show(); nextRect3.toFront();}, 4000);
            console.log("Scene " + sceneNumber + ": BOOM. Oh no, we've been hit!!")
        }

        var scene4 = function () {
            sceneNumber = 4;
            console.log("Scene " + sceneNumber + ": We're falling!")

            helicopter.xpos = 20; //initialising x.pos as 20
            helicopter.ypos = 110; //initialising y.pos as 110
            helicopter.xrate= 2; //the rate at which the helicopter moves in the x position
            helicopter.yrate= 3; //the rate at which the helicopter moves in the y position

            setInterval(descent, 20); // calls the descent function every 20ms (Interval of 20ms was chosen so that the helicopter moves smoothly.)
            setTimeout(function(){scene4text.show(); scene4text.toFront();}, 800);
            setTimeout(function(){nextRect4.show(); nextRect4.toFront();}, 1200);
        }


        var scene5 = function () {
            sceneNumber = 5;
            //paper.rect(0, 0, pWidth, pHeight).attr({"fill":"black"}); //sets paper to black colour. 
            scene5BG.show();
            crashBGM.play();
            setTimeout(function(){scene5text.show();scene5text.toFront();}, 3800);
            setTimeout(function(){scene5text2.show();scene5text2.toFront();}, 5800);
            setTimeout(function(){scene5text3.show();scene5text3.toFront();}, 7800);
            setTimeout(function(){nextRect5.show(); nextRect5.toFront();}, 8500);

            console.log("Scene " + sceneNumber + ": You blacked out.")
        }


    var maxRaindrop = 150; // variable for easier modification of total number of raindrops; default = 150
    var rain = [];   // sets raindrops as a global array

    //move the raindrops down the screen. 
    function draw(i){

        for (i = 0; i < maxRaindrop; i++) {   // loop to move 'maxRaindrop' number of raindrops; default = 150
            // update the position where we want our raindrops to be
            rain[i].xpos += rain[i].xrate;
            rain[i].ypos += rain[i].yrate;
            // modifies rain[i] raphael x, y attribute based on calculated position as above to reflect visually the new position of rain[i]
            rain[i].attr({'x': rain[i].xpos, 'y': rain[i].ypos});
            } 
    }   

    // function for hiding the raindrops
    function hide(i){
        for (i = 0; i < maxRaindrop; i++) {  // loop to move 'maxDots' number of dots; default = 150
            rain[i].xpos = -100; // hides the array of raindrops off-screen
            rain[i].ypos = -100; // hides the array of raindrops off-screen 
            // modifies rain[i] raphael x, y attribute based on calculated position as above to reflect visually the new position of rain[i]
            rain[i].attr({'x': rain[i].xpos, 'y': rain[i].ypos}); 
            } 
    }   

    // function for animating the helicopter
    var movingHelicopter = function(){
        setTimeout(function(){helicopter.animate({transform: "r" + -1}, 500)}, 0);
        setTimeout(function(){helicopter.animate({transform: "r" + 0.1}, 500)}, 100);
        setTimeout(function(){helicopter.animate({transform: "r" + 1}, 500)}, 100);
    }

    // function for making the helicopter wobbly during the turbulence. 
    var wobblyHelicopter = function() { 
        setTimeout(function(){helicopter.animate({transform: "r" + -5}, 400)}, 0);
        setTimeout(function(){helicopter.animate({transform: "r" + 5}, 800)}, 400);
        }

    // function for animating the lightning
    var lightningStrike = function(){
            setTimeout(function(){lightning.animate({transform: "r" + -50}, 500)}, 0);
            setTimeout(function(){lightning.animate({transform: "r" + 1}, 500)}, 50);
            }

    var thunderSound = function(){
            thunderBGM.play();
            }

    // function for animating the sudden decline of the helicopter (by adding x.rate and y.rate values to the x.pos and y.pos)
    var descent = function () { 
            helicopter.xpos += helicopter.xrate;
            helicopter.ypos += helicopter.yrate;
            helicopter.attr({'x': helicopter.xpos, 'y': helicopter.ypos});
        }

        scene1(); //runs scene 1. 

        // Event Listeners for clicks on the next button to transition into the next scene.
        nextRect.addEventListener('click', function(){
            scene2(); // runs scene2
            scene1text.hide(); //hiding irrelevant texts and images
            nextRect.hide();
            clearsky.hide();
            stormsky.show();
            stormBGM.play();
            stormBGM.loop= true;  // enable music to loop when played

        });

        nextRect2.addEventListener('click', function(){
            nextRect2.hide(); //hiding irrelevant texts and images
            scene2text.hide();
            scene3(); // runs scene 3
        });

        nextRect3.addEventListener('click', function(){
            nextRect3.hide(); //hiding irrelevant texts and images
            scene3text.hide(); 
            thunderBGM.pause();
            lightning.hide();
            scene4(); //runs scene 4. 
        });

        nextRect4.addEventListener('click', function(){
            nextRect4.hide(); //hiding irrelevant texts and images
            scene4text.hide();
            helicopterBGM.pause(); // ends previous BGM
            scene5(); //runs scene 5
            fadeVolume(stormBGM.volume);
        });

        nextRect5.addEventListener('click', function(){
            nextRect5.hide(); //hiding irrelevant texts and images
            scene5text.hide();
            scene5text2.hide();
            scene5text3.hide();
            stormsky.hide();
            scene5BG.hide();
            setInterval(hide, 0); //calls the function for hiding the array of raindrops
            gameMenu(); //runs the game menu
        });


//===========================================================================================================
//===========================================================================================================
//                                      ACTUAL GAME MECHANICS HERE: 
//===========================================================================================================
//===========================================================================================================

    //===============================================================================
    // SETTING UP THE GAME SCREEN
    //===============================================================================

        var whiteBG= paper.rect(0, 0, pWidth, pHeight).attr({"fill": "white"});
        whiteBG.hide();

        // Hides the menu screen, fades out the menuBGM and presents the game instructions. 
        var gameScreen = function () { 
            hideGameMenu();
            whiteBG.show();
            whiteBG.toBack();
            gameRect.show();
            fadeVolume(menuBGM.volume);
            gameInstructions();
        };

    //===============================================================================
    // INSTRUCTIONS BEFORE GAME BEGINS
    //===============================================================================
        // Pop up showing the instructions before the game commences
        var instructionPopUpClose = paper.image("images/okay.png", 432, 310, 50, 50);
        var instructionPopUp = paper.image("images/instructions.jpg", pWidth/4, 35, 480, 350);        // Pop up screen for instructions for the game.
        instructionPopUpClose.hide(); //hides pop up
        instructionPopUp.hide();    //hides pop up

        // function that shows the game instructions after gameScreen function is called. 
        var gameInstructions = function () { 
            instructionPopUp.show();
            instructionPopUpClose.show();
            instructionPopUpClose.toFront();           
            showTopBar();
            //showBottomBar();
        }
    //===============================================================================
    // FUNCTION THAT CALLS FOR THE GAME TO START 
    //===============================================================================
    // function to start the game; called after user reads the instructions. 
        var gameBegin = function (){ 
           // clearInterval(hideFlyInterval);
            drawFlyInterval;
            gameBGM.loop = true;
            gameBGM.play();
            gameFlyAppear();
            gametime = 20;
            health.value= 100;  
        }

    //===============================================================================
    // COMMENCES THE GAME AFTER LISTENING FOR CLICK EVENT
    //===============================================================================
    // event listener to listen for mouse click on the instruction pop up button, which will proceed to start the game. 
        instructionPopUpClose.addEventListener('click', function() {              
            instructionPopUpClose.hide(); //hides instruction pop up
            instructionPopUp.hide();
            gameBegin(); // calls the gameBegin function
       } );


    //===============================================================================
    // TARGET FLIES --- ARRAY
    //===============================================================================

        var speed = 10;                                         // variable for easier adjustment of speed of fly[i]; default = 10
        var maxFly = 15;                                      // variable for easier modification of total number of flies; default = 100
        var fly = [];                                           // establishes var fly as a global array

        var count = 0; // counts losses in health  
        var warning= paper.text(pWidth-30, pHeight-20, "!!!").attr({"fill":"red", "font-size": "27"}); // warning text at the bottom right corner of the screen
        warning.hide();


    //function to start showing the fly array; calls for functions drawFly, flyKill and timer periodicly; 
        var gameFlyAppear = function (){ 

            if (chosenLevel ===1) {
                maxFly = 15;
                speed = 10;
            };

            if (chosenLevel ===2) {
                maxFly = 20;
                speed = 15;
            }

            if (chosenLevel ===3) {
                maxFly = 25;
                speed = 25;
            }



            for (i = 0; i < maxFly; i++) { // loop to create 'maxFly' number of flies; default = 15
                fly[i] = paper.image("images/fly.png", -100, -100, 50, 50); //initialises fly[i] offscreen.            
                console.log("Fly " + (i+1) + " created.");    
                fly[i].xpos=Math.random() * ((pWidth-30) - 30) + 1;      // default = initial xpos of fly[i], changes when modified in function draw
                fly[i].ypos= -100;          // default = initial ypos of fly[i] to be off-screen, changes when modified in function draw
                console.log("Fly " + (i+1) + " xpos = " + fly[i].xpos + ", ypos = " + fly[i].ypos);

                fly[i].attr({'x': fly[i].xpos, 'y': fly[i].ypos}); 

                // Add properties to keep track of the rate the fly is moving
                fly[i].xrate=0;      // sets xrate to 0 so that the flies fly down vertically.
                fly[i].yrate=map(Math.random(),0,1,3,speed); // randomises yrate so that each fly moves at different rates
                console.log("Fly " + (i+1) + " xrate = " + fly[i].xrate + ", yrate = " + fly[i].yrate);
                }


            drawFlyInterval = setInterval(drawFly, 40); // calls the drawfly function for the flies to move every 40ms
            
            nextFlyInterval = setInterval(nextFlyEmit,900); //calls nextfly to emit function every 900ms


            // track and update mouse properties in state object upon mousedown
            mySVGCanvas.addEventListener("mousedown", function(ev){
                state.mouseX = ev.offsetX;  // remember current mouse x position
                state.mouseY = ev.offsetY;  // remember current mouse y position
                state.pushed = 1;           // change state.pushed to 1 to indicate that mouse is currently pushed
                clickBGM.play();              // alert sound for audio feedback indicating succesful mousedown
                console.log("X = " + state.mouseX + ", Y = " + state.mouseY + ", Pushed = " + state.pushed);
            });

            // release state.pushed
            mySVGCanvas.addEventListener("mouseup", function(ev){
                state.pushed = 0;           // change state.pushed to 0 to indicate that mouse is no longer pushed
                console.log("Pushed = " + state.pushed);
            });   

            flyKillInterval = setInterval(function(){
                for (i = 0; i < maxFly; i++) {                     // loop to move 'maxFly' number of flies; default = 100
                    flyKill(i);                                        // call flyKill function for fly[i]
                    }
                }, 20); 

        };


        var drawFlyInterval; //setting the intervals as global variables. 
        var hideFlyInterval;
        var flyKillInterval;
        var nextFlyInterval;

        var nextFly=0; // initialise next fly to emit to 0
            // Function to continue emitting more flies from the top of the screen)
            nextFlyEmit = function(){
                fly[nextFly].xpos= Math.random() * ((pWidth-30) - 30) + 1; //setting xpos to be a value between 1 and PWidth
                fly[nextFly].ypos= -100; //setting ypos to be slightly above the screen before fly enters into the screen
                fly[nextFly].xrate= 0; //so that fly moves vertically down
                fly[nextFly].yrate = map(Math.random(),0,1,3,speed); // randomises the speeds at which each fly moves
                nextFly=(nextFly+1) % maxFly; // % operator used so that the number of flies generated does not stop after value of maxFly. 
            };

        //moving the flies down the screen using a draw function. 
        var drawFly = function(i){

            for (i = 0; i < maxFly; i++) {   // loop to move 'maxFly' number of flies; default = 100
                // update the position of the flies
                fly[i].xpos += fly[i].xrate;
                fly[i].ypos += fly[i].yrate;
                // modifies fly[i] raphael x, y attribute based on calculated position as above to reflect visually the new position of fly[i]
                fly[i].attr({'x': fly[i].xpos, 'y': fly[i].ypos});
            } 
        }   

        // function for hiding the flies after the game
        var hideFly = function(i){
            for (i = 0; i < maxFly; i++) {  // loop to move 'maxFly' number of flies; default = 100
                //fly[i].xpos = -100; // hides the array of flies off-screen
                //fly[i].ypos = -100; // hides the array of flies off-screen 
                // modifies fly[i] raphael x, y attribute based on calculated position as above to reflect visually the new position of fly[i]
                fly[i].attr({'x': fly[i].xpos, 'y': fly[i].ypos}); 
                fly[i].xrate =0;
                fly[i].yrate =0; 
            } 
        }   
        // calls for the hide Fly function in 20ms intervals
        var hideFlyInterval= function() { 
            setInterval(hideFly,20); 
            }  

        // initialize state object tracking mouse x, mouse y, and if mouse pushed; defaults = 0
        var state = {
            mouseX: 0,
            mouseY: 0,
            pushed: 0,       // 0 = false/not pushed, 1 = true/pushed
        }

        // function that kills fly if state.pushed =1 and distance from mousedown coordinates is less than 100. 
        var flyKill = function () { 
            if (state.pushed === 1 && distance(fly[i].xpos,fly[i].ypos,state.mouseX,state.mouseY) <= 100) { 
                //fly[i].xrate =0, // stops target from moving in the x position
                //fly[i].yrate =0;  // stops target from moving in the y position
                splatBGM.play();
                fly[i].ypos = -300;
            } 

            if (fly[i].ypos >= 320 && fly[i].ypos <= pHeight && fly[i].yrate != 0) {  //Listens for fly[i] entering the warning region (i.e between y coordinates of 320 and pHeight)
                warning.show(); // warning text is shown if fly[i] is reaching the bottom of the screen
                alarmBGM.play(); // warning text is shown if fly[i] is reaching the bottom of the screen          
            }

            if (fly[i].ypos <= 320 && fly[i].ypos >= pHeight) {
                warning.hide(); // hides warning if fly is not in the "warning region" i.e between y coordinates of 320 and pHeight.        
            }

            if (fly[i].ypos >= pHeight && fly[i].ypos <= pHeight+speed ) {
                warning.hide(); //hides warning text 
                count ++ // count is incremented, when fly[i] is between y coordinates of pHeight and pHeight+Speed
                // a range of "speed" value was chosen for this region, because a single y point will not capture all flies that pass through
                //... since they are incremented at different speeds (yrate). 
                // Count will increase more when a slower fly (with a lower yrate) passes through
                // Hence, slower flies will cause more health damage than faster flies. 
                console.log(count);
                ouchBGM.play();
                health.value = health.value - 1.5; // health.value (progress bar value) will decrease by 1.5
                console.log(health.value + " health left");
                    if (health.value === 0) {
                        gameOver();
                        warning.hide();
                        console.log("health = 0, game over");
                    }
            }


            if (gametime===0) { //only runs if timer = 0, ie when game is over
                hideFlyInterval();
                gameBGM.pause();
                warning.hide();
                hideGameScreen();
                survived();
            }

        }

    //===============================================================================
    // LIVE GAME FEEDBACK - Points, Health, Timer
    //===============================================================================
       var gametime = NaN; //amount of time player has per game, ie 10 seconds. initial is set to NaN since game is not yet in play

       var timerText = paper.text(750, 12,""); //text on top left of game space showing how much time left in game

        timerText.attr({ //attributes for timer text
            'text-anchor':'start',
            'font-size': "16px",
            'fill': 'black',
        }); 


        var timer = function() { //during the game, reduces timer by 1s every 1000ms. 
            if (gametime>0) {
                timerText.show();
                gametime -= 1;
                timerText.attr({
                    text: "Time left: " + gametime + "s"
                });
                console.log(gametime + "seconds left");
            } else {
                gametime = NaN; //if game is not in play, set timer to NaN
                timerText.hide(); //hides timer text if game is not in play
            };
        };


        var points = 0; // initialise points scored as zero. 

        // setting top bar components as global variables, so that they can be modified in other functions. 
        var topBar= paper.rect(0, 0, pWidth, 30 ).attr({fill: "white"});
        var userBar = paper.text(140, 12, "Name : " + userName).attr({fill: "black", "font-size":"16px"});
        var levelBar = paper.text(-100, -100, "Level : " + chosenLevelText).attr({fill: "black", "font-size":"16px"});

        // Task: Count points. 

        // hides them as they are not needed yet. 
        topBar.hide();
        userBar.hide();

        // Function that unhides the components of the top bar (username, level and points)
        var showTopBar = function() { 
            topBar.show();
            topBar.toFront();
            userBar.show();
            userBar.toFront();
            levelBar.attr({x: pWidth/2, y: 12});
            levelBar.show();
            levelBar.toFront();
            timerText.show();
            timerText.toFront();
        }

        setInterval(timer,1000); //runs timer function to decrease every 1000ms

        // function is called if gameover (when health hits zero)
        var gameOver = function(){ 
            loseBGM.play();
            clearInterval(drawFlyInterval);
            clearInterval(flyKillInterval);
            gameBGM.pause();
            hideGameScreen();
            alert("Game Over");
            gametime= NaN;
            diedScreen(); // shows died screen 
        }

        var hideGameScreen = function() { 
            warning.hide();
            gameRect.hide();
            topBar.hide();
            userBar.hide();
            levelBar.hide();
            timerText.hide();
            whiteBG.hide();
        }; 

        var rating; 

        if (health.value >= 80) {
            rating = "Great job! You escaped almost unscathed!";
        }

        if (health.value  <= 30) {
            rating = "You're safe! You barely made it!";
        }

        else {
            rating = "Could've done better, but at least you're alive!";
        }

        var blackBG= paper.rect(0, 0, pWidth, pHeight).attr({"fill": "black"});
        var survivedText = paper.text(pWidth/2, 110, "You survived!").attr({"font-size":"20px", "fill":"white"});
        var healthBonus = paper.text(pWidth/2, 180, "Well done! You are now safe.").attr({"font-size":"20px", "fill":"white"});
        var penalty = paper.text(pWidth/2, 250, "You continue walking until you heard someone shout '" + userName + "'").attr({"font-size":"20px", "fill":"white"});
        var totalPoints = paper.text(pWidth/2, 320, "You have found your friend and civilisation. You're safe.").attr({"font-size":"20px", "fill":"white"});
        
        var diedText = paper.text(pWidth/2, 200, "You blacked out. \nYou felt your life being sucked out of you. \nWonder how's " + buddyName + "doing ...").attr({"font-size":"20px", "fill":"white"});

        var hideSurvivedScreen = function () {
            blackBG.hide();
            survivedText.hide();
            healthBonus.hide();
            penalty.hide();
            totalPoints.hide();
            nextRect6.hide();
        }

        hideSurvivedScreen(); //keeps the survived screen hidden

        // function that shows the survived screen
        var survived= function() { 
            //alert("You are left with " + health.value + " health points, " + rating);
            blackBG.show();
            winBGM.play();
            clearInterval(drawFlyInterval);
            clearInterval(flyKillInterval);
            var report = paper.text(pWidth/2, 50, "You are left with " + health.value + " health points, " + rating).attr({"font-size":"20px", "fill":"white"});; 

            setTimeout(function(){report.hide();}, 7500);
            setTimeout(function(){survivedText.show();survivedText.toFront();}, 1800);
            setTimeout(function(){healthBonus.show();healthBonus.toFront();}, 2800);
            setTimeout(function(){penalty.show();penalty.toFront();}, 3800);
            setTimeout(function(){totalPoints.show(); totalPoints.toFront();}, 5500);
            setTimeout(function(){nextRect6.show(); nextRect6.toFront();}, 7500);

        }


        var diedScreen = function() { 
            blackBG.show();
            setTimeout(function(){diedText.show();diedText.toFront();}, 1000);
            setTimeout(function(){nextRect7.show(); nextRect7.toFront();}, 2000);
        }

        var hideDiedScreen = function (){
            blackBG.hide();
            diedText.hide();
            nextRect7.hide();
        }
        
        hideDiedScreen();

        nextRect6.addEventListener('click', function(){
            hideSurvivedScreen();
            health.value = 100;
            gametime=NaN;
            hideGameScreen();
            gameMenu();
        });

        nextRect7.addEventListener('click', function(){
            hideDiedScreen();
            health.value = 100;
            gametime=NaN;
            hideGameScreen();
            gameMenu();
        });

        //===============================================================================
        // MATHEMATICAL FUNCTIONS: Map and Distance
        //===============================================================================

    // shifting/scaling mathematical function by converting variable x in [a,b] range (a is thus 0%, b is thus 100%) into % to find corresponding value in [n,m] range (n is thus 0%, m is thus 100%)
        function map(x, a, b, n, m){
            var percent = (x - a) / (b - a);
            return (percent * (m - n) + n);
        }

        // mathematical function to calculate distance between 2 points (x1,y1 vs x2,y2) using PYTHAGORAS THEOREM
        function distance(x1, y1, x2, y2){
            return Math.sqrt( (x2 -= x1) * x2 + (y2 -= y1) * y2);
        }



//===========================================================================================================
//===========================================================================================================
//                                      EVENT LISTENERS FOR MENU PAGE
//===========================================================================================================
//===========================================================================================================


        //===============================================================================
        // EVENT LISTENERS FOR MAIN MENU PAGE - Listening for clicks/hovering over the buttons
        //===============================================================================

    //-----------------------------GAME START BUTTON -------------------------------------------//
        //when mouse hovers over the button, button glows and has a hover alert sound. 
        gameStart.addEventListener('mousemove', function(){
            gameStart.attr({cursor: "pointer", "stroke": "yellow", "stroke-width": 7});
            hoverBGM.play();
        }); 
        gameStartText.addEventListener('mousemove', function(){
            gameStart.attr({cursor: "pointer", "stroke": "yellow", "stroke-width": 7});
            hoverBGM.play();
        }); 
        // when mouse leaves the button, the glow effect ends
        gameStart.addEventListener('mouseleave', function(){
            gameStart.attr({"stroke": "black", "stroke-width": 0});
        }); 
        gameStartText.addEventListener('mouseleave', function(){
            gameStart.attr({"stroke": "black", "stroke-width": 0});
        }); 
        //when there is mouse click on the gameStart button, there is a click alert sound and the game commences. 
        gameStart.addEventListener('click', function(){
            console.log("Starting the game...");
            clickBGM.play();
            gameScreen();
        }); 
        gameStartText.addEventListener('click', function(){
            console.log("Starting the game...");
            clickBGM.play();
            gameScreen();
        }); 

    //-----------------------------CHOOSE LEVEL BUTTON -----------------------------------------//
        chooseLevel.addEventListener('click', function(){ // Listening for clicks on the chooseLevel button. 
            console.log("Choose your level");
            clickBGM.play();
            levelPage();
        });
        chooseLevelText.addEventListener('click', function(){ // Listening for clicks on the chooseLevel button. 
            console.log("Choose your level");
            clickBGM.play();
            levelPage();
        });
        //when mouse hovers over the button, button glows and has a hover alert sound. 
        chooseLevel.addEventListener('mousemove', function(){
            chooseLevel.attr({cursor: "pointer", "stroke": "yellow", "stroke-width": 7});
            hoverBGM.play();
        }); 
        chooseLevelText.addEventListener('mousemove', function(){
            chooseLevel.attr({cursor: "pointer", "stroke": "yellow", "stroke-width": 7});
            hoverBGM.play();
        }); 
        // when mouse leaves the button, the glow effect ends
        chooseLevel.addEventListener('mouseleave', function(){
            chooseLevel.attr({"stroke": "black", "stroke-width": 0});
        }); 
        chooseLevelText.addEventListener('mouseleave', function(){
            chooseLevel.attr({"stroke": "black", "stroke-width": 0});
        }); 


        //-----------------------------HELP BUTTON -----------------------------------------//

        help.addEventListener('click', function(){
            console.log("Here is what's happening.")
            clickBGM.play();
            helpPage();
        });
        helpButtonText.addEventListener('click', function(){
            console.log("Here is what's happening.")
            clickBGM.play();
            helpPage();
        });
        //when mouse hovers over the button, button glows and has a hover alert sound. 
        help.addEventListener('mousemove', function(){
            help.attr({cursor: "help", "stroke": "yellow", "stroke-width": 7});
            hoverBGM.play();
        });
        helpButtonText.addEventListener('mousemove', function(){
            help.attr({cursor: "help", "stroke": "yellow", "stroke-width": 7});
            hoverBGM.play();
        });
        // when mouse leaves the button, the glow effect ends
        help.addEventListener('mouseleave', function(){
            help.attr({"stroke": "black", "stroke-width": 0});
        }); 

        helpButtonText.addEventListener('mouseleave', function(){
            help.attr({"stroke": "black", "stroke-width": 0});
        }); 

        //-----------------------------CLOSE BUTTONS -----------------------------------------//

        helpClose.addEventListener('click', function(){ //for closing Help Page
            helpRect.hide();
            helpClose.hide();
            helpText.hide();
            clickBGM.play();
            console.log("exit");
        })

        helpClose.addEventListener('click', function(){ //for closing Choose Level page
            levelRect.hide();
            levelText.hide();
            level1Button.hide();
            level2Button.hide();
            level3Button.hide();
            helpClose.hide();
            clickBGM.play();
            console.log("exit");
        })

        //button to skip the storyline
        button.addEventListener('click', function(){
            helicopter.hide();
            helicopterBGM.pause();
            scene1text.hide(); //hiding irrelevant texts and images
            nextRect.hide();
            clearsky.hide();
            nextRect2.hide(); //hiding irrelevant texts and images
            scene2text.hide();
            nextRect3.hide(); //hiding irrelevant texts and images
            scene3text.hide(); 
            thunderBGM.pause();
            lightning.hide();
            nextRect4.hide(); //hiding irrelevant texts and images
            scene4text.hide();
            helicopterBGM.pause(); // ends previous BGM
            nextRect5.hide(); //hiding irrelevant texts and images
            scene5text.hide();
            scene5text2.hide();
            scene5text3.hide();
            stormsky.hide();
            scene5BG.hide();
            setTimeout(function(){
            helicopter.hide();
            helicopterBGM.pause();
            scene1text.hide(); //hiding irrelevant texts and images
            nextRect.hide();
            clearsky.hide();
            nextRect2.hide(); //hiding irrelevant texts and images
            scene2text.hide();
            nextRect3.hide(); //hiding irrelevant texts and images
            scene3text.hide(); 
            thunderBGM.pause();
            lightning.hide();
            nextRect4.hide(); //hiding irrelevant texts and images
            scene4text.hide();
            helicopterBGM.pause(); // ends previous BGM
            nextRect5.hide(); //hiding irrelevant texts and images
            scene5text.hide();
            scene5text2.hide();
            scene5text3.hide();
            stormsky.hide();
            scene5BG.hide(); }, 4000); // ensures everything from the storyline is removed from screen, as some items are animated and have not appeared on screen.
            gameMenu();
        });


        button2.addEventListener('click', function(){
            if (sceneNumber != 1) { //won't run if it's scene 1 as there is no rain yet and there will be errors.
            setInterval(hide, 0); //calls the function for hiding the array of raindrops 
            }
        });


});
