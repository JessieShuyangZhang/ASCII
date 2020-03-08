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
		this.abilities = [];
	}
	getItem(name){ //character gets an Item 
		this.itemlist.push(name);
	}
	//itemMenu(){} ??
	potion(){
		increaseHealth(5);
	}
	megapotion(){
		increaseHealth(10);
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
		message += "You took "+damage+" damage.";
		console.log("You took "+damage+" damage.");
		if(this.health > 0){
			message += "You have "+this.health+" HP left."
			console.log("You have "+this.health+" HP left.");
		}else{
			this.health = 0;
		}
		return message;
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
	/* functions not sure how to implement yet
	specialAttack(){}
	}*/
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
		this.abilities.push('Green Tea');
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
	specialAttack(ability){
		if(ability === 'Green Tea'){
			this.greenatea(enemy);
		}
		else{
			console.log('item does not exist');
		}
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
		this.abilities.push('Physics Homework');
	}
	phyicshw(enemy){
		var message = 'You threw your physics homework at the '+enemy.name+'. Hundreds of papers'+enemy.name+' hit on the head.';
		enemy.takedamage((this.magic-enemy.magicdefense)*2);
		return message;
	}
	mathAbility(enemy){
		var message = 'You showed the '+enemy.name+' how to solve 1 + 1! The'+enemy.name+' was enlightened!';
		enemy.takedamage((this.magic-enemy.magicdefense)*3);
		return message;
	}
	levelup(){
		super.levelup();
		if(level==='2'){
			console.log('You learned Math!');
			abilities.push('Math');
		}
	}
	specialAttack(ability){
		console.log('You used '+ ability);
		if(ability === 'Math'){
			this.mathAbility(enemy);
		}
		else if(ability === 'Physics Homework'){
			this.physicshw(enemy);
		}
		else{
			console.log('item does not exist');
		}
		//return the message?
	}
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
		if(damage<0){
			damage = 0;
		}
		this.health -= damage;
		var str ='Enemy lost '+damage+' HP.';
		return str;
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
	getStruck(){
		console.log('get struck not yet implemented');
	}
	// itemChance(){}
}