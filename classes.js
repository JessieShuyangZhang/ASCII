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
		this.tempenemy = null;
		this.miles = 40;
		this.isFighting = false;
		this.won = false; //is this needed for now?
		this.className = 'ERROR';
		this.name = 'warrior!'; //for temporary purpose
		this.itemlist = [
		'Potion', 'Potion', 'Mega Potion'];
		this.ability = null;
	}
	getItem(name){ //character gets an Item 
		this.itemlist.push(name);
	}
	potion(){
		return this.increaseHealth(5);
	}
	megapotion(){
		return this.increaseHealth(10);
	}
	lucy(){ //message yet to implement
		takedamage(-9999);
		var message = 'Lucy got angry and mortally slapped you.';
		return message;
	}
	flyingbat(){//message yet to implement
		var message = 'The bat flew around the area and gave you encouragement!';
		return message;
	}
	guitar(){
		var message;
		if(Math.floor(Math.random()*100)+1 < 20){
			changeattack(1);
			changedef(1);
			message = 'Somehow you played something good?';
		}else{
			message = 'Do you even know how to play guitar?';
		}
		return message;
	}
	setWon(){
		this.won = true;
	}
	changeMiles(_miles){
		this.miles += _miles;
	}
	increaseexp(_experience){
		var message = "You gained "+_experience+" experience points. "; //should show on UI
		this.experience += _experience;
		return message;
	}
	changeattack(_attack){
		var message;
		if(_attack > 0){
			message += "Attack increased by "+_attack;
		}else if(_attack < 0){
			message += "Attack decreased by -"+_attack;
		}
		this.attack += _attack;
		return message;
	}
	changedef(_defense){
		var message;
		if(_defense > 0){
			message += "Defense increased by "+_defense;
		}else if(_defense < 0){
			message += "Defense decreased by -"+_defense;
		}
		this.defense += _defense;
		return message;
	}
	changespeed(_speed){
		var message;
		if(_speed > 0){
			message += "Defense increased by "+_speed;
		}else if(_speed < 0){
			message += "Defense decreased by -"+_speed;
		}
		this.speed += _speed;
		return message;
	}
	levelup(){
		console.log("You gained a level up! ");
		var c = Math.floor(Math.random()*100%3)+1;
		this.experience -= 10;
		this.changeattack(Math.floor(Math.random()*100%3));
		this.changedef(Math.floor(Math.random()*100%2));
		this.changespeed(Math.floor(Math.random()*100%3));
		this.increaseHealth(c);
		this.changeMaxHealth(c);
		this.level += 1;
	}
	takedamage(damage){
		var message='';
		if(damage<0){
			damage = 0;
		}
		this.health -= damage;
		message += "\r\nYou took "+damage+" damage. ";
		console.log("You took "+damage+" damage.");
		if(this.health > 0){
			message += "You have "+this.health+" HP left.\r\n";
			console.log("You have "+this.health+" HP left.");
		}else{
			this.health = 0;
		}
		return message;
	}
	increaseHealth(num){
		var message="Health increased by "+num+'. ';
		this.health += num;
		if(this.health > this.maxhealth){
			this.health = this.maxhealth;
			message+="\r\nYou are at max health!";
		}
		return message;
	}
	changeMaxHealth(_maxhealth){
		var message;
		if(_maxhealth > 0){
			message="Max health increased by "+_maxhealth+'. ';
		} else if(_maxhealth < 0){
			message="Max health decreased by -"+_maxhealth+'. ';
		}
		this.maxhealth += _maxhealth;
		return message;
	}
	setFight(maybe){
		this.isFighting = maybe;
	}
	saveEnemy(enemy){
		this.tempenemy = enemy;
		setFight(true);
	}
	status(){
		return{
			className: this.className,
			level: this.level,
			maxhealth: this.maxhealth,
			health: this.health,
			attack: this.attack,
			magic: this.magic,
			defense: this.defense,
			speed: this.speed,
			experience: this.experience,
			milesleft: this.miles,
			isFighting: this.isFighting,
			tempenemy: this.tempenemy,
			won: this.won
		};
	}
	
}

class Warrior extends Character{
	constructor(){
		super();
		this.attack = 6;
		this.magic = 2;
		this.defense = 2;
		this.speed = 4;
		this.health = 22;
		this.className = 'Warrior';
		this.abilities='Green Tea';
	}
	greenatea(enemy){
		var message = 'You threw Green Tea at the '+enemy.name+'. It only caused some first degree burns...';
		enemy.takedamage(1);
		return message;
	}
	levelup(){
		// super.levelup();
		console.log("You gained a level up!");
		var c = Math.floor(Math.random()*100%2)+2;
		this.experience -= 10;
		this.changeattack(Math.floor(Math.random()*100%3)+1);
		this.changedef(Math.floor(Math.random()*100%2));
		this.changespeed(Math.floor(Math.random()*100%2));
		this.increaseHealth(c);
		this.changeMaxHealth(c);
		this.level += 1;

	}
	specialAttack(enemy){
		return this.greenatea(enemy);
	}
}

class Sorcerer extends Character{
	constructor(){
		super();
		this.attack = 5;
		this.magic = 4;
		this.defense = 2;
		this.speed = 6;
		this.health = 24;
		this.className = 'Sorcerer';
		this.abilities='Physics Homework';
	}
	phyicshw(enemy){
		var message = 'You threw your physics homework at the '+enemy.name+'. Hundreds of papers'+enemy.name+' hit on the head.';
		message += enemy.takedamage((this.magic-enemy.magicdefense)*2);
		return message;
	}
	/*mathAbility(enemy){
		var message = 'You showed the '+enemy.name+' how to solve 1 + 1! The'+enemy.name+' was enlightened!';
		enemy.takedamage((this.magic-enemy.magicdefense)*3);
		return message;
	}*/
	/*levelup(){ //disabled gaining special ability
		super.levelup();
		if(level==='2'){
			console.log('You learned Math!');
			abilities.push('Math');
		}
	}*/
	specialAttack(choice, enemy){
		return this.physicshw(enemy);
	}
}


class Enemy{
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
		if(damage<0){
			damage = 0;
		}
		this.health -= damage;
		var str ='Enemy lost '+damage+' HP.';
		return str;
	}
	changedef(defense){//print message yet to be implemented
		this.defense += defense;
		var str = this.name +"'s defense ";
		str += defense >=0 ? 'increased' : 'decreased';
		str += ' by ' + Math.abs(defense);
		console.log(str);
		return str;
	}
	changemagicdef(defense){//print message yet to be implemented
		this.magicdefense += defense;
		var str = this.name +"'s magic defense ";
		str += defense >=0 ? 'increased' : 'decreased';
		str += ' by ' + Math.abs(defense);
		console.log(str);
		return str;
	}
	changeattack(x){//print message yet to be implemented
		this.attack += x;
		var str = this.name +"'s attack ";
		str += x >=0 ? 'increased' : 'decreased';
		str += ' by ' + Math.abs(x);
		console.log(str);
		return str;
	}
	changespeed(x){//print message yet to be implemented
		this.speed = x;
		var str = this.name +"'s speed ";
		str += x >=0 ? 'increased' : 'decreased';
		str += ' by ' + Math.abs(x);
		console.log(str);
		return str;
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
		var str = 'You attacked the '+this.name+'! ';
		var str2 = this.takedamage(character.attack - this.defense);
		str += str2;
		return str;
	}

}

class Guitarist extends Enemy{
	constructor(){
		//(name, attack, defense, magicdefense, speed, level, health)
		super('Hippie Guitarist', 
			Math.floor(Math.random()*100%3+5),
			Math.floor(Math.random()*100%3+2),
			Math.floor(Math.random()*100%4),
			Math.floor(Math.random()*100%3+4),
			1,
			Math.floor(Math.random()*100%4+10));
		this.guitar = true;
	}
	enemyAction(character){
		var _string = "It's the Hippie Guitarist's turn.";
		var _message = '';
		if(this.guitar == false){
			_message = 'The Hippie Guitarist continued to cry. ';
		}
		else if(Math.floor(Math.random()*1000%100) < 30){
			_message="The Hippie Guitarist played a funky riff. ";
			if(Math.floor(Math.random()*1000%100) < 30){			
				var msg = character.takedamage((this.attack- character.defense)*3); 
				_message+="You lost all your hearing."+msg;
			}
			else{
				_message+="The melody was actually not too bad???";
			}
		}
		else{
			var msg = character.takedamage(this.attack-character.defense);
			_message = "The Hippie Guitarist whacked you on the head with his guitar!"+msg;
			if(Math.floor(Math.random()*1000%100) < 50){
				this.guitar = false;
				_message += "The guitar broke. The Hippie Guitarist started sobbing due to his lack of soul. ";
			}
		}
		return{
			string: _string,
			message: _message
		}
	}
	getStruck(character){
		var message = "You attempted to hit the Hippie Guitarist with his guitar!\r\n";
		if (this.guitar == false) {
			message += "His guitar is broken and does no damage...";
		}
		else if (Math.floor(Math.random()*100) < 30) {			
			message += "His guitar broke. The Hippie Guitarist started sobbing due to his lack of soul.";
			message += super.takedamage((character.attack - this.defense)*3);
			this.guitar = false;
		}
		else {
			message += "The Hippie Guitarist had a firm grip on his guitar...";
		}
		console.log(message);
		return message;
	}
	// itemChance(){}
}

class Cat extends Enemy{
	constructor(){
		//(name, attack, defense, magicdefense, speed, level, health)
		super('Black Cat of Death', 
			Math.floor(Math.random()*100%3+4),
			Math.floor(Math.random()*100%4+2),
			Math.floor(Math.random()*100%3+1),
			Math.floor(Math.random()*100%10),
			1,
			Math.floor(Math.random()*100%3+9));
	}
	enemyAction(character){
		var _string = "It's the Black Cat of Death's turn.";
		var _message = '';
		if(Math.floor(Math.random()*1000%100) < 30){
			if(Math.floor(Math.random()*1000%100) < 30){			
				var msg = character.takedamage((this.attack- character.defense)*3); 
				_message+="The Black Cat of Death scratched your face! "+msg;
			}
			else{
				_message+="The Black Cat of Death was overcome with tiredness to move.";
			}
		}
		else{
			var msg = character.takedamage(this.attack-character.defense);
			_message = "The Black Cat of Death used its powers of die!"+msg;			
		}
		return{
			string: _string,
			message: _message
		}
	}
	getStruck(character){
		var message = "You attempted to beat the Black Cat of Death!\r\n";
		if (Math.floor(Math.random()*100) < 30) {			
			message += "You directly hit the Black Cat of Death! It whimpered and meowed softly... ";
			message += super.takedamage((character.attack - this.defense)*3);
		}
		else {
			message += "The cat nimbly dodged the attack...";
		}
		console.log(message);
		return message;
	}
// itemChance(){}
}

class Juggler extends Enemy{
	constructor(){
		//(name, attack, defense, magicdefense, speed, level, health)
		super('Juggler', 
			Math.floor(Math.random()*100%3+5),
			Math.floor(Math.random()*100%3+2),
			Math.floor(Math.random()*100%2),
			Math.floor(Math.random()*100%3+3),
			2,
			Math.floor(Math.random()*100%3+7));
	}
	enemyAction(character){
		var _string = "It's the Juggler's turn.";
		var _message = '';
		if(Math.floor(Math.random()*1000%100) < 30){
			if(Math.floor(Math.random()*1000%100) < 30){			
				var msg = character.takedamage((this.attack- character.defense)*2); 
				_message+="The Juggler threw a knife at you! "+msg;
			}
			else{
				_message+="The Juggler is hoping to win the audition to perform at Lacey's Carnival to impress the kids.";
			}
		}
		else{
			var msg = character.takedamage(this.attack-character.defense);
			_message = "The Juggler threw his balls at you!"+msg;			
		}
		return{
			string: _string,
			message: _message
		}
	}
	getAttacked(character){//print message yet to be implemented
		var str = 'You stole his balls and threw them back at him!';
		var str2 = this.takedamage(character.attack - this.defense);
		str += str2;
		return str;
	}
	getStruck(character){
		var message = "You tried juggling four balls in front of him! \r\n";
		if (Math.floor(Math.random()*100) < 30) {			
			message += "The Juggler was shocked at your ball handling skills!";
			message += super.takedamage((character.attack - this.defense)*3);
		}
		else {
			message += "You slipped on one of his balls and failed... ";
		}
		console.log(message);
		return message;
	}
// itemChance(){}
}

class Turtle extends Enemy{
	constructor(){
		//(name, attack, defense, magicdefense, speed, level, health)
		super('Crazy Turtle', 
			Math.floor(Math.random()*100%3+4),
			Math.floor(Math.random()*100%2+7),
			Math.floor(Math.random()*100%2+7),
			0,
			2,
			Math.floor(Math.random()*100%3+10));
	}
	enemyAction(character){
		var _string = "It's the Crazy Turtle's turn.";
		var _message = '';
		if(Math.floor(Math.random()*1000%100) < 30){
			if(Math.floor(Math.random()*1000%100) < 40){			
				var msg = character.takedamage((this.attack- character.defense)*2); 
				_message+="The Crazy Turtle jumped 10 meters in the air and flattened you! "+msg;
			}
			else{
				_message+="The turtle slowly moved towards you...";
			}
		}
		else{
			var msg = character.takedamage(this.attack-character.defense);
			_message = "The Crazy Turtle drove at super speed and rammed in you!"+msg;			
		}
		return{
			string: _string,
			message: _message
		}
	}
	getAttacked(character){
		str = super.getAttacked() + " Maybe there's a way to lower its defenses...";
		return str;
	}
	getStruck(character){
		var message = "You attempted to break open the turtle's shell with your hand! \r\n";
		if (Math.floor(Math.random()*100) < 70) {			
			message += "You chopped open the turtle's shell!";
			message += super.takedamage((character.attack - this.defense)*3);
			message += super.changedef(-5);
			message += super.changemagicdef(-5);
		}
		else {
			message += "Your hand wasn't strong enough... ";
			message += character.takedamage(1);
		}
		console.log(message);
		return message;
	}
// itemChance(){}
}

class Lucy extends Enemy{ //not finished yet
	constructor(){
		//(name, attack, defense, magicdefense, speed, level, health)
		super('Lucy', 
			Math.floor(Math.random()*100%3+4),
			Math.floor(Math.random()*100%2+7),
			Math.floor(Math.random()*100%2+7),
			0,
			2,
			Math.floor(Math.random()*100%3+10));
	}
	enemyAction(character){
		var _string = "It's the Crazy Turtle's turn.";
		var _message = '';
		if(Math.floor(Math.random()*1000%100) < 30){
			if(Math.floor(Math.random()*1000%100) < 40){			
				var msg = character.takedamage((this.attack- character.defense)*2); 
				_message+="The Crazy Turtle jumped 10 meters in the air and flattened you! "+msg;
			}
			else{
				_message+="The turtle slowly moved towards you...";
			}
		}
		else{
			var msg = character.takedamage(this.attack-character.defense);
			_message = "The Crazy Turtle drove at super speed and rammed in you!"+msg;			
		}
		return{
			string: _string,
			message: _message
		}
	}
	getAttacked(character){
		str = super.getAttacked() + " Maybe there's a way to lower its defenses...";
		return str;
	}
	getStruck(character){
		var message = "You attempted to break open the turtle's shell with your hand! \r\n";
		if (Math.floor(Math.random()*100) < 70) {			
			message += "You chopped open the turtle's shell!";
			message += super.takedamage((character.attack - this.defense)*3);
			message += super.changedef(-5);
			message += super.changemagicdef(-5);
		}
		else {
			message += "Your hand wasn't strong enough... ";
			message += character.takedamage(1);
		}
		console.log(message);
		return message;
	}
// itemChance(){}
}

class Nerd extends Enemy{
	constructor(){
		//(name, attack, defense, magicdefense, speed, level, health)
		super('Nerd', 
			Math.floor(Math.random()*100%3+4),
			Math.floor(Math.random()*100%2+7),
			Math.floor(Math.random()*100%2+7),
			0,
			2,
			Math.floor(Math.random()*100%3+10));
	}
	enemyAction(character){
		var _string = "It's the Crazy Turtle's turn.";
		var _message = '';
		if(Math.floor(Math.random()*1000%100) < 30){
			if(Math.floor(Math.random()*1000%100) < 40){			
				var msg = character.takedamage((this.attack- character.defense)*2); 
				_message+="The Crazy Turtle jumped 10 meters in the air and flattened you! "+msg;
			}
			else{
				_message+="The turtle slowly moved towards you...";
			}
		}
		else{
			var msg = character.takedamage(this.attack-character.defense);
			_message = "The Crazy Turtle drove at super speed and rammed in you!"+msg;			
		}
		return{
			string: _string,
			message: _message
		}
	}
	getAttacked(character){
		str = super.getAttacked() + " Maybe there's a way to lower its defenses...";
		return str;
	}
	getStruck(character){
		var message = "You attempted to break open the turtle's shell with your hand! \r\n";
		if (Math.floor(Math.random()*100) < 70) {			
			message += "You chopped open the turtle's shell!";
			message += super.takedamage((character.attack - this.defense)*3);
			message += super.changedef(-5);
			message += super.changemagicdef(-5);
		}
		else {
			message += "Your hand wasn't strong enough... ";
			message += character.takedamage(1);
		}
		console.log(message);
		return message;
	}
// itemChance(){}
}