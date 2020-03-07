var playerController = (function(){
	//"world.h", battlesystem,
	var character, enemy, inBattle, userTurn, isStart;

	return{
		createCharacter: function(choice){
			isStart = true;
			if(choice==='1'){
				//todo: warrior
			}
			else{
				//todo: sorcerer
			}
			character = new Character();
			return character;
		},
		gameMenu: function(){ //did not include all of original  function in 'world.h'
			var _intro, _forsave, _menu;
			//this should only print when game first starts
			if(isStart){
				_intro = 'Soham Sonthi has been committing unthinkable crimes against humanity! It is your job to stop him! You need to travel 40 miles to get to him.';
			}
			else{
				_intro='';
			}
			if(character.isFighting){ //not finished
				_forsave = 'You were in the middle of a fight!';
				//battlesystem?
			}
			if(character.health >= 0){
				_milesleft = 'You have '+character.miles+'  miles left,';
				_menu = 'Enter 1 to go forward, 2 to open item menu, 3 to open status menu. Enter 9 to skip to final boss.';
			}
			else{
				_menu = 'You have been defeated.';
			}
			return {
				intro: _intro,
				milesleft: _milesleft,
				menu: _menu
			};
		},
		itemMenu: function(canchoose){
			var _message, _itemsString, _menu;			
			if(character.itemlist.length === '0'){
				_message = 'You have no items left.';
			}
			else{
				_message = 'The items you currently have are: ';
				_itemsString = '';
				for(var i=0; i<character.itemlist.length; i++){
					_itemsString+= (i+1) +'.'+character.itemlist[i]+ '    '; //whitespace not working??
				}
				console.log('itemsString:'+_itemsString);//debug
				if(canchoose){
					_menu = 'Which one would you like to use? Enter the number to use. Enter 0 to go back.';
				}
				else{
					_menu='Enter 0 to go back.';
				}
			}
			return {
				message: _message,
				itemsString: _itemsString,
				menu: _menu
			};
		},
		getCharacterStatus: function(){
			return character.status();
		},
		forward: function(){ //move forward in the world
			while(character.miles > 0 && !character.isFighting && character.health > 0){
				character.changeMiles(-1);
				console.log(character.miles + ' miles left.');
				var prob = Math.floor(Math.random()*100)+1;
				if(prob % 10 < 3){
					enemy = new Guitarist();
					console.log('you ran into an enemy',enemy);
					character.isFighting = true;

					//todo: customize enemies
					if(prob <= 15){

					}
					else if(prob<=25){

					}
					else if(prob<=40){

					}
					else if(prob<=60){

					}
					else if(prob<=80){

					}
					else{

					}
				}
			}
			return{
				character: character,
				enemy: enemy
			}
		},
		gainExperience: function(){
			var leveldiff = character.level - enemy.level;
			var _experience;
			if(Math.abs(leveldiff) <= 2){
				_experience = Math.floor(Math.random()*(leveldiff+9)+1);
				character.increaseexp(_experience);
			}
			else if(leveldiff >= 3){
				_experience = Math.floor(Math.random()*9+1);
				character.increaseexp(_experience);
			}
			else if(leveldiff <= -3){
				_experience = Math.floor(Math.random()*leveldiff*2+1);
				character.increaseexp(_experience);
			}
			if(character.experience >= 10){
				character.levelup();
				// character.status(); //should we call this??
			}
		},
		fight: function(){
			var input, input2;
			

		},
		calculateOrder: function(){
			if(character.speed > enemy.speed){
				return true;
			}
			else if(character.speed > enemy.speed){
				return false;
			}
			else{
				if(Math.floor(Math.random()*2+1)%2 == 0){
					return true;
				}
				else {
					return false;
				}
			}
		},
		getAttacked: function(){
			var str = 'You attacked the '+enemy.name+'!';
			enemy.takedamage(character.attack-enemy.defense);
			return str;
		}, 
		getStruck:function(){
			enemy.getStruck(character); //different depending on enemy class
		},
		getCharEnem: function(){
			return{
				character: character,
				enemy: enemy
			}
		}
	};
})();



var UIController = (function(){
	var DOMstrings = {
		characterName: '.character-name',
		menuQuestion:'.menuquestion',
		userChoice: '.user-choice',
		modal: 'character-status',
		closeModal: '.closemodal',
		modalContent: '.modal-content',
		modalText: 'modal-text'
	};

	return{
		getInput: function(){
			var v= document.querySelector(DOMstrings.userChoice).value;
			return v;
		},

		displayCharacterName: function(name){
			document.querySelector(DOMstrings.characterName).textContent = name;
		},

		showCharacterStatus: function(obj){
			var html, newHtml;
			html = '<p>Class: %classname%</p>'+'<p>Current level: %level%</p>'+'<p>Max health: %maxhealth%</p>'+'<p>Health remaining: %health%</p>'+'<p>Attack: %attack%</p>'+'<p>Magic: %magic%</p>'+'<p>Defense: %defense%</p>'+'<p>Speed: %speed%</p>'+'<p>Experience: %experience%</p>'+'<p>Need %10-exp% more for a level up.</p>'+'<p>Miles left: %milesleft%</p>'; 

			newHtml = html.replace('%classname%', obj.className);
			newHtml = newHtml.replace('%level%', obj.level);
			newHtml = newHtml.replace('%maxhealth%', obj.maxhealth);
			newHtml = newHtml.replace('%health%', obj.health);
			newHtml = newHtml.replace('%attack%', obj.attack);
			newHtml = newHtml.replace('%magic%', obj.magic);
			newHtml = newHtml.replace('%defense%', obj.defense);
			newHtml = newHtml.replace('%speed%', obj.speed);
			newHtml = newHtml.replace('%experience%', obj.experience);
			newHtml = newHtml.replace('%10-exp%', 10-obj.experience);
			newHtml = newHtml.replace('%milesleft%', obj.milesleft);

			if(obj.isFighting && obj.tempenemy){
				newHtml += '<p>Currently in the middle of fighting '+obj.tempenemy.name+ '</p>';
			}
			else if(obj.health === 0){
				newHtml += '<p>THIS CHARACTER HAS UNFORTUNATELY EXPERIENCED MATH AND DIED. </p>';
			}
			else if(obj.won){
				newHtml += '<p>THIS CHARACTER HAS BEATEN PROFESSOR SONTHI. </p>';
			}
			
			document.getElementById(DOMstrings.modalText).innerHTML = newHtml;
			document.getElementById(DOMstrings.modal).style.display = 'block';
		},

		displayItemMenu: function(obj){
			document.getElementById('menuquestion-0').textContent = obj.message;
			document.getElementById('menuquestion-1').textContent = obj.itemsString;
			document.getElementById('menuquestion-2').textContent = obj.menu;
		},

		displayGameMenu: function(texts){
			document.getElementById('menuquestion-0').textContent = texts.intro;
			document.getElementById('menuquestion-1').textContent = texts.milesleft;
			document.getElementById('menuquestion-2').textContent = texts.menu;
		},

		displayBattleMenu: function(char_enem){
			var str0;
			if(char_enem){
				str0 = 'You ran into the '+char_enem.enemy.name+' at '+ char_enem.character.miles+' miles!';
			}else{
				str0 = 'Your turn!';
			}
			var str1 = 'What would you like to do?';
			var str2 ="1. Fight     2. Item     3. Status     4. Run     5. Save and Quit ";
			document.getElementById('menuquestion-0').textContent = str0;	
			document.getElementById('menuquestion-1').textContent = str1;
			document.getElementById('menuquestion-2').textContent = str2;
		},

		displayFightMenu: function(){
			var str = '1. Attack     2. Strike     3. Special     4. Back';
			document.getElementById('menuquestion-2').textContent = str;
		},

		displayAttackResult: function(str){
			document.getElementById('menuquestion-0').textContent = str;
		},
		clearField: function(){
			document.querySelector(DOMstrings.userChoice).value = "";
		},
		getDOMstrings: function(){
			return DOMstrings;
		}
	};

})();

var controller = (function(playerCtrl, UICtrl){
	var isStart, atMenu, atBattle, atFight, atItem, char_enem; 
	var setupEventListeners = function(){ //for future use
		var DOM = UICtrl.getDOMstrings();
		
		document.addEventListener('keypress', function(event){
			if(event.keyCode == 13 || event.which === 13){ // pressed enter
				var choice = UICtrl.getInput();
				if(isNaN(choice)){
					console.log('non existence?');
					return 0; 
				}
				if(isStart){
					ctrlSetCharacter(choice);
					var texts = playerCtrl.gameMenu();
					// console.log(texts);
					UICtrl.displayGameMenu(texts);
					isStart = false;
					atMenu = true;
					atBattle = false;
					atFight = false;
					atItem = false;
				}
				/*else{
					//UICtrl.displayGameMenu(playerCtrl.gameMenu());
					atMenu = true;
				}*/
				else if(atMenu){
					ctrlMenuSelection(choice);
				}
				else if(atBattle){
					// atMenu = false;
					console.log('here at battle');
					ctrlBattleSelection(choice);
				}
				else if(atFight){
					// atBattle = false;
					console.log('here at fight');
					ctrlFightSelection(choice);
				}
				else if(atItem){
					ctrlItemSelection(choice);
				}

			}
		});
		document.querySelector(DOM.closeModal).addEventListener('click', function(){
			document.getElementById(DOM.modal).style.display = 'none';
		});
	}

	var ctrlSetCharacter = function(choice){		
		// console.log(choice);
		if(!isNaN(choice) && choice > 0) { //need more conditions to check
			character = playerCtrl.createCharacter(choice);
			UICtrl.displayCharacterName(character.name); //needs to change after polymorphism
			// console.log(character);
			UICtrl.clearField();
		}
	}
	
	var ctrlItemSelection = function(choice){
		//TOOD: implement
		var ret;
		if(!isNaN(choice)) {
			if(choice==='0'){
				atBattle = true;
				atItem = false;
				console.log('char_enem', char_enem);
				UICtrl.displayBattleMenu(char_enem);//how to go back to previous level??

			}
			else{
				console.log('???');


			}
			UICtrl.clearField();
		}
	}

	var ctrlFightSelection = function(choice){
		var ret;
		if(!isNaN(choice) && choice > 0) { //need more conditions to check
			if(choice==='1'){ //attack				
				/*var str = char_enem.enemy.getAttacked(char_enem.character);*/
				var str = playerCtrl.getAttacked();
				char_enem = playerCtrl.getCharEnem();
				console.log(str);
				UICtrl.displayAttackResult(str);
				// UICtrl.displayBattleMenu(char_enem);
				atBattle = true;
				atFight = false;
			}
			else if(choice==='2'){//strike
				playerCtrl.getStruck();
			}
			else if(choice==='3'){//special abilities




			}
			else if(choice==='4'){ //back
				atBattle = true;
				atFight = false;
				UICtrl.displayBattleMenu(char_enem);
			}
			else{
				console.log('Please input a valid command.');
			}
			UICtrl.clearField();
		}
	}

	var ctrlBattleSelection = function(choice){
		var ret;
		if(!isNaN(choice) && choice > 0) { //need more conditions to check
			if(choice==='1'){ //fight
				atBattle = false;
				atFight = true;
				console.log('trying to fight');
				UICtrl.displayFightMenu();
			}
			else if(choice==='2'){//item
				atBattle = false;
				atItem = true;
				var obj = playerCtrl.itemMenu(true);
				UICtrl.displayItemMenu(obj);
			}
			else if(choice==='3'){//status
				var obj = playerCtrl.getCharacterStatus();
				UICtrl.showCharacterStatus(obj);
			}
			else if(choice==='4'){ //run
				



			}
			else if(chocie==='5'){ //save and quit?? not implemented yet
				atBattle = true;
				atFight = false;
			}
			else{
				console.log('Please input a valid command.');
			}
			UICtrl.clearField();
		}
	}

	var ctrlMenuSelection = function(choice){
		var ret;
		if(choice==='0'){//going back from item menu
			// console.log('here');
			UICtrl.displayGameMenu(playerCtrl.gameMenu());
		}
		else if(choice==='1'){ //go forward
			atBattle = true;
			atMenu = false;
			char_enem =playerCtrl.forward();
			UICtrl.displayBattleMenu(char_enem);
		}
		else if(choice==='2'){ //open item menu
			// atMenu = true;
			var obj = playerCtrl.itemMenu(false);	
			UICtrl.displayItemMenu(obj);
		}
		else if(choice==='3'){//status
			var obj = playerCtrl.getCharacterStatus();	
			UICtrl.showCharacterStatus(obj);
		}
		else if(choice==='9'){//choice 9 not implemented yet
			console.log('skip to final boss');
		}
		else{
			ret = 'please input a valid command';
			console.log(ret);
		}
		UICtrl.clearField();
		
	}

	return{
		debug: function(){ //check private member vairables
			console.log( {
				isStart:isStart, 
				atMenu:atMenu, 
				atBattle:atBattle, 
				atFight:atFight, 
				atItem:atItem, 
				char_enem:char_enem
			});
		},
		init: function(){
			isStart = true;
			console.log('game started');
			setupEventListeners();
		}
	};

})(playerController, UIController);

controller.init();