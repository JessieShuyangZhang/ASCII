class Character{
	constructor(){
		this.attack = 1;
		this.magic = 1;
		this.defense = 1;
		this.speed = 1;
		this.health = 20;
		this.level = 1;
		this.maxhealth = 20;
		this.experience = 0;
		//itemManager, tempenemy,
		this.tempenemy = null;
		this.miles = 40;
		this.isFighting = false;
		this.won = false; //is this needed for now?
		this.className = 'ERROR';
		this.name = 'warrior!'; //for temporary purpose
	}
	setWon(){
		this.won = true;
	}
	changeMiles(_miles){
		this.miles += miles;
	}
	increaseexp(_experence){
		console.log("you gained "+_experience+" experience points."); //should show on UI
		this.experience += _experience;
	}
	changeattack(_attack){
		if(_attack > 0){
			console.log("Attack increased by "+_attack);
		}else if(_attack < 0){
			console.log("Attack decreased by -"+_attack);
		}
		this.attack += _attack;
		//this.attack += _attack;//why twice?
	}
	changedef(_defense){
		if(_defense > 0){
			console.log("Defense increased by "+_defense);
		}else if(_defense < 0){
			console.log("Defense decreased by -"+_defense);
		}
		this.defense += _defense;
	}
	changespeed(_speed){
		if(_speed > 0){
			console.log("Defense increased by "+_speed);
		}else if(_speed < 0){
			console.log("Defense decreased by -"+_speed);
		}
		this.speed += _speed;
	}
	levelup(){
		console.log("You gained a level up!");
		var c = Math.floor(Math.random()*4)+1;
		this.experience -= 10;
		this.changeattack(Math.floor(Math.random()*3)+1);
		this.changedef(Math.floor(Math.random()*3)+1);
		this.changespeed(Math.floor(Math.random()*3)+1);
		this.increaseHealth(c);
		this.changeMaxHealth(c);
		this.level += 1;
	}
	takedamage(damage){
		if(damage<0){
			damage = 0;
		}
		this.health -= damage;
		console.log("You took "+damage+" damage.");
		if(this.health > 0){
			console.log("You have "+this.health+" HP left.");
		}else{
			this.health = 0;
		}
	}
	increaseHealth(num){
		console.log("Health increased by "+num);
		this.health += num;
		if(this.health > this.maxhealth){
			this.health = this.maxhealth;
			console.log("You are at max health!");
		}
	}
	changeMaxHealth(_maxhealth){
		if(_maxhealth > 0){
			console.log("Max health increased by "+_maxhealth);
		} else if(_maxhealth < 0){
			console.log("Max health decreased by -"+_maxhealth);
		}
		this.maxhealth += _maxhealth;
	}
	setFight(maybe){
		this.isFighting = maybe;
	}
	saveEnemy(enemy){
		this.tempenemy = enemy;
		setFight(true);
	}
	status(){
		return{ //messages yet to implement
			className: this.className,
			level: this.level,
			maxhealth: this.maxhealth,
			health: this.health,
			attack: this.attack,
			magic: this.magic,
			defense: this.defense,
			speed: this.speed,
			experience: this.experience,
			//need ___more for a level up...?
			milesleft: this.miles,
			isFighting: this.isFighting,
			tempenemy: this.tempenemy
		};
	}
	/* functions not sure how to implement yet
	items(){ }
	itemget(_item){}
	printabilities(){}
	specialAttack(){}
	gameover(){}
	}*/
}

class Enemy{
	//not sure if constructor is correct
	constructor(name, attack, defense, magicdefense, speed, level, health){
		this.name = name;
		this.attack = attack;
		this.defense = defense;
		this.magicdefense = magicdefense;
		this.speed = speed;
		this.level = level;
		this.health = health;
	}
	setmonster(level, attack, defense, speed, health){
		this.attack = attack;
		this.defense = defense;
		this.speed = speed;
		this.level = level;
		this.health = health;
	}
	takedamage(damage){ //print message yet to be implemented
		this.health -= damage;
	}
	changedef(defense){//print message yet to be implemented
		this.defense += defense;
	}
	changeattack(attack){//print message yet to be implemented
		this.attack += attack;
	}
	changespeed(speed){//print message yet to be implemented
		this.speed = speed;
	}
	enemystatus(){ //returns an object of all info instead of cout
		return{
			level: this.level,
			health: this.health,
			attack: this.attack,
			defense: this.defense,
			speed: this.speed
		}
	}
	//takes in a character object
	getAttacked(character){//print message yet to be implemented
		//"you attacked the "+this.name;
		takedamage(character.getattack() - this.defense);
	}

}


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
				_intro = 'Soham Sonthi has been committing unthinkable crimes against humanity! It is your job to stop him! You need to travel '+character.miles+'  miles to get to him.';
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
		getCharacterStatus: function(){
			return character.status();
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

		// inputBtn: '.btn-submit'
	};

	return{
		getInput: function(){
			var v= document.querySelector(DOMstrings.userChoice).value;
			// console.log(v);
			return v;
		},

		displayCharacterName: function(name){
			document.querySelector(DOMstrings.characterName).textContent = name;
		},
		showCharacterStatus: function(obj){
			/*return{ //messages yet to implement
			className: this.className,
			level: this.level,
			maxhealth: this.maxhealth,
			health: this.health,
			attack: this.attack,
			magic: this.magic,
			defense: this.defense,
			speed: this.speed,
			experience: this.experience,
			//need ___more for a level up...?
			milesleft: this.miles,
			isFighting: this.isFighting,
			tempenemy: this.tempenemy
		};*/
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

			if(obj.isFighting && !obj.tempenemy){
				newHtml += '<p>Currently in the middle of fighting '+obj.tempenemy.name+ '</p>';
			}
			else if(obj.health === '0'){
				newHtml += '<p>THIS CHARACTER HAS UNFORTUNATELY EXPERIENCED MATH AND DIED. </p>';
			}
			else {
				newHtml += '<p>THIS CHARACTER HAS BEATEN PROFESSOR SONTHI. </p>';
			}
			document.querySelector(DOMstrings.modalContent).insertAdjacentHTML('beforeend', newHtml);
			document.getElementById(DOMstrings.modal).style.display = 'block';

		},

		displayGameMenu: function(texts){
			/*document.querySelector(DOMstrings.menuQuestion).textContent = texts.intro + texts.menu;*/
			document.getElementById('menuquestion-0').textContent = texts.intro;
			document.getElementById('menuquestion-1').textContent = texts.milesleft;
			document.getElementById('menuquestion-2').textContent = texts.menu;
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
	var isStart, atMenu; 
	var setupEventListeners = function(){ //for future use
		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.closeModal).addEventListener('click', function(){
			document.getElementById(DOM.modal).style.display = 'none';
		});
		document.addEventListener('keypress', function(event){
			if(event.keyCode == 13 || event.which === 13){ // pressed enter
				var choice = UICtrl.getInput();
				if(isNaN(choice)){
					return 0; //is this ok?
				}
				if(isStart){
					ctrlSetCharacter(choice);
					var texts = playerCtrl.gameMenu();
					console.log(texts);
					UICtrl.displayGameMenu(texts);
					isStart = false;
					atMenu = false;
				}
				else{
					UICtrl.displayGameMenu(playerCtrl.gameMenu());
					atMenu = true;
				}
				if(atMenu){
					ctrlMenuSelection(choice);

					UICtrl.clearField();
				}
			}
		});


	}
	var ctrlSetCharacter = function(choice){		
		console.log(choice);
		if(!isNaN(choice) && choice > 0) { //need more conditions to check
			character = playerCtrl.createCharacter(choice);
			UICtrl.displayCharacterName(character.name); //needs to change after polymorphism
			console.log(character);
			UICtrl.clearField();
		}
	}
	var ctrlMenuSelection = function(choice){
		var ret;
		if(!isNaN(choice) && choice > 0) { //need more conditions to check
			if(choice==='1'){
				//forward
				ret = 'forward (not ready yet)';
				console.log(ret);
			}else if(choice==='2'){
				//character.items()
				ret = 'getitems (not ready yet)';
				console.log(ret);
			}
			else if(choice==='3'){
				var obj = playerCtrl.getCharacterStatus();	
				UICtrl.showCharacterStatus(obj);
			}
			else{
				ret = 'please input a valid command';//is this ok?
				console.log(ret);
			}
			
			UICtrl.clearField();			
		}
	}



	return{
		init: function(){
			isStart = true;
			console.log('game started');
			setupEventListeners();
		}
	};

})(playerController, UIController);

controller.init();