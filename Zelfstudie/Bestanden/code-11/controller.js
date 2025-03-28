$(document).ready(function () {
	
	var questionBank=new Array;
	var wordArray=new Array;
	var previousGuesses=new Array;
 	var currentWord;
	var currentClue;
	var wrongAnswerCount;
	
	
 
 
 		$.getJSON('quizbank.json', function(data) { 

		for(i=0;i<data.wordlist.length;i++){ 
			questionBank[i]=new Array;
			questionBank[i][0]=data.wordlist[i].word;
			questionBank[i][1]=data.wordlist[i].clue;
		}
		  
		
		 
		titleScreen();
		})//gtjson
 

 
	
function titleScreen(){
			
	$('#gameContent').append('<div id="gameTitle">Galgje</div><br><div id="beschrijving">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbspZoek het verborgen woord; na 5 foutieve pogingen verschijnt er een hint</div><div id="startButton" class="button">BEGIN </div>');		
	$('#startButton').on("click",function (){gameScreen()});
			
}//display game
	
	
	
function gameScreen(){
	$('#gameContent').empty();
	$('#gameContent').append('<div id="pixHolder"><img id="hangman" src="man.png"></div>');
	$('#gameContent').append('<div id="wordHolder"></div>');
	$('#gameContent').append('<div id="clueHolder"></div>');
	$('#gameContent').append('<div id="guesses">Eerder geprobeerd:</div>');
	$('#gameContent').append('<div id="feedback"></div>');
	$('#gameContent').append('<form><input type="text" id="dummy" ></form>');
			
	getWord();
	var numberOfTiles=currentWord.length;
	wrongAnswerCount=0;
	previousGuesses=[];
			 
	for(i=0;i<numberOfTiles;i++){
		$('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
	}
			
	
 
	$(document).on("keyup",handleKeyUp);
	$(document).on("click",function(){$('#dummy').focus();});
	$('#dummy').focus();
}//gamescreen
			
			
function getWord(){
	var rnd=Math.floor(Math.random()*questionBank.length);
	currentWord=questionBank[rnd][0];
	currentClue=questionBank[rnd][1];
	questionBank.splice(rnd,1); 
	wordArray=currentWord.split("");			
}//getword
			
function handleKeyUp(event) {
	if(event.keyCode>64 && event.keyCode<91){
		var found=false;
		var previouslyEntered=false;
		var input=String.fromCharCode(event.keyCode).toLowerCase();
				
		for(i=0;i<previousGuesses.length;i++){if(input==previousGuesses[i]){previouslyEntered=true;}}
				
		if(!previouslyEntered){
			previousGuesses.push(input);
				
			for(i=0;i<wordArray.length;i++){
				
				if(input==wordArray[i]){found=true;$('#t'+i).append(input);}	
				
			}//for
				
			if(found){checkAnswer();}
			else{wrongAnswer(input);}
		}//if
	}//if
}//handlekeyup
	
		
function checkAnswer(){
	var currentAnswer="";	
	for(i=0;i<currentWord.length;i++){
		currentAnswer+=($('#t'+i).text());
	}		
	if(currentAnswer==currentWord){
		victoryMessage();
	};
}//checkanswer
		
function wrongAnswer(a){
	wrongAnswerCount++;
	var pos=(wrongAnswerCount*-75) +"px"
	$('#guesses').append("  "+a);
	$('#hangman').css("left",pos);
	if(wrongAnswerCount==5){
		$('#clueHolder').append("HINT: "+currentClue);}
	if(wrongAnswerCount==6){
		defeatMessage();}
}//wronganswer
		
function victoryMessage(){
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("CORRECT!<br><br><div id='replay' class='button'>Speel verder</div>");
	$('#replay').on("click",function (){
		if(questionBank.length>0){
			gameScreen()}
		else{finalPage()}
	});
}//victory
		
function defeatMessage(){
	$(document).off("keyup", handleKeyUp);
	$('#feedback').append("Te Laat U hangt!!!<br>(Oplossing= "+ currentWord +")<div id='replay' class='button'>Verder Spelen</div>");
	$('#replay').on("click",function (){
		if(questionBank.length>0){
			gameScreen()}
		else{finalPage()}
	});
}//defeat

function finalPage(){
	$('#gameContent').empty();
	$('#gameContent').append('<div id="finalMessage">U hebt alle woorden gevonden</div>');
}//finalpage
	
	});//doc ready