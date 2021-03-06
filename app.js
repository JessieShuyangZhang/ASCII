var UIController = (function() {
    var DOMstrings = {
        characterName: ".character-name",
        menuQuestion: ".menuquestion",
        inputBox: "user-choice",
        userChoice: ".user-choice",
        modal: "character-status", //id
        closeModal: ".closemodal",
        modalContent: ".modal-content",
        modalText: "modal-text", //id
        characterImg: "images",
        gameMenuBtn: "btn-gamemenu", //id
        gameMenuBtns: ".btn-gamemenu",
        battleMenuBtn: "btn-battlemenu", //id
        battleMenuBtns: ".btn-battlemenu",
        fightMenuBtn: "btn-fightmenu", //id
        fightMenuBtns: ".btn-fightmenu",
        replayBtn: "btn-again", //id
        replayBtns: ".btn-again",
        enemyImg: "enemy-image", //id
        enemyGif: "enemy-gif", //id of img tag
    };

    var charchoice;

    return {
        init: function() {
            document.getElementById(DOMstrings.gameMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.battleMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.fightMenuBtn).style.display = "none";
            //need to hide input box too
        },

        getInput: function() {
            var v = document.querySelector(DOMstrings.userChoice).value;
            return v;
        },

        setCharChoice: function(choice) {
            charchoice = choice;
            console.log(choice);
        },

        getCharChoice: function() {
            return charchoice;
        },

        displayCharacterName: function(name) {
            document.querySelector(DOMstrings.characterName).textContent = name;
        },

        showCharacterStatus: function(both) {
            var obj = both.charstat;
            var html, newHtml;
            html =
                "<p>Class: %classname%</p>" +
                "<p>Current level: %level%</p>" +
                "<p>Max health: %maxhealth%</p>" +
                "<p>Health remaining: %health%</p>" +
                "<p>Attack: %attack%</p>" +
                "<p>Magic: %magic%</p>" +
                "<p>Defense: %defense%</p>" +
                "<p>Speed: %speed%</p>" +
                "<p>Experience: %experience%</p>" +
                "<p>Need %10-exp% more for a level up.</p>" +
                "<p>Miles left: %milesleft%</p>";

            newHtml = html.replace("%classname%", obj.className);
            newHtml = newHtml.replace("%level%", obj.level);
            newHtml = newHtml.replace("%maxhealth%", obj.maxhealth);
            newHtml = newHtml.replace("%health%", obj.health);
            newHtml = newHtml.replace("%attack%", obj.attack);
            newHtml = newHtml.replace("%magic%", obj.magic);
            newHtml = newHtml.replace("%defense%", obj.defense);
            newHtml = newHtml.replace("%speed%", obj.speed);
            newHtml = newHtml.replace("%experience%", obj.experience);
            newHtml = newHtml.replace("%10-exp%", 10 - obj.experience);
            newHtml = newHtml.replace("%milesleft%", obj.milesleft);

            if (obj.isFighting) {
                newHtml +=
                    "<p>Currently in the middle of fighting " + both.enemy.name + "</p>";
            } else if (obj.health === 0) {
                newHtml +=
                    "<p>THIS CHARACTER HAS UNFORTUNATELY EXPERIENCED MATH AND DIED. </p>";
            } else if (obj.won) {
                newHtml += "<p>THIS CHARACTER HAS BEATEN PROFESSOR SONTHI. </p>";
            }

            document.getElementById(DOMstrings.modalText).innerHTML = newHtml;
            document.getElementById(DOMstrings.modal).style.display = "block";
        },

        displayItemMenu: function(obj) {
            document.getElementById("menuquestion-0").textContent = obj.message;
            document.getElementById("menuquestion-1").textContent = obj.itemsString;
            document.getElementById("menuquestion-2").textContent = obj.menu;
            document.getElementById(DOMstrings.inputBox).style.display = "block";
        },

        displayGameMenu: function(texts) {
            if (texts.intro) {
                document.getElementById(
                    "menuquestion-0"
                ).innerHTML = texts.intro.replace(/(?:\r\n|\r|\n)/g, "<br>");
            }
            document.getElementById("menuquestion-1").textContent = texts.milesleft;
            //document.getElementById('menuquestion-2').textContent = texts.menu;
            document.getElementById(DOMstrings.battleMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.fightMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.gameMenuBtn).style.display = "block";
        },

        displayBattleMenu: function(char_enem) {
            var str0;
            if (char_enem) {
                str0 =
                    "You ran into the " +
                    char_enem.enemy.name +
                    " at " +
                    char_enem.character.miles +
                    " miles!";
            } else {
                str0 = "Your turn!";
            }
            var str1 = "What would you like to do?";
            var str2 =
                "1. Fight     2. Item     3. Status     4. Run     5. Save and Quit ";
            document.getElementById("menuquestion-0").textContent = str0;
            document.getElementById("menuquestion-1").textContent = str1;
            //document.getElementById('menuquestion-2').textContent = str2;
            document.getElementById(DOMstrings.gameMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.fightMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.battleMenuBtn).style.display = "block";
        },

        displayFightMenu: function() {
            var str = "1. Attack     2. Strike     3. Special     4. Back";
            //document.getElementById('menuquestion-2').textContent = str;
            document.getElementById(DOMstrings.battleMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.gameMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.fightMenuBtn).style.display = "block";
        },

        displayAttackResult: function(str) {
            document.getElementById("menuquestion-0").innerHTML = str.replace(
                /\n\r?/g,
                "<br>"
            );
        },

        displayEnemyAction: function(obj) {
            // document.getElementById('menuquestion-1').textContent = obj.string;
            // document.getElementById('menuquestion-2').textContent = obj.message;
            document.getElementById("menuquestion-1").innerHTML = obj.string.replace(
                /\n\r?/g,
                "<br />"
            );
            document.getElementById("menuquestion-2").innerHTML = obj.message.replace(
                /\n\r?/g,
                "<br />"
            );
        },

        clearField: function() {
            document.querySelector(DOMstrings.userChoice).value = "";
        },

        clearMenuFields: function() {
            document.getElementById("menuquestion-0").textContent = "";
            document.getElementById("menuquestion-1").textContent = "";
            document.getElementById("menuquestion-2").textContent = "";
        },

        hideImage: function() {
            document.getElementById(DOMstrings.characterImg).style.display = "none";
        },

        hideAllBtns: function() {
            document.getElementById(DOMstrings.gameMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.fightMenuBtn).style.display = "none";
            document.getElementById(DOMstrings.battleMenuBtn).style.display = "none";
        },

        hideInputBox: function() {
            document.getElementById(DOMstrings.inputBox).style.display = "none";
        },

        displayEnemyImg: function() {
            document.getElementById(DOMstrings.enemyImg).style.display = "block";
        },

        hideEnemyImg: function() {
            document.getElementById(DOMstrings.enemyImg).style.display = "none";
        },

        changeEnemyImg: function(filename) {
            document.getElementById(DOMstrings.enemyGif).src = filename;
        },

        defeatEnemy: function(enemy) {
            document.getElementById("menuquestion-0").textContent =
                "You have defeated the " + enemy.name + "!";
            document.getElementById(DOMstrings.enemyImg).style.display = "none";
        },

        gameover: function() {
            document.getElementById("menuquestion-0").textContent =
                "You have been defeated. Game Over!";
            document.getElementById(DOMstrings.replayBtn).style.display = "block";
        },

        getDOMstrings: function() {
            return DOMstrings;
        },
    };
})();

var controller = (function(UICtrl) {
    var character, enemy, inBattle, userTurn, choice; //, isStart;
    var isStart, atMenu, atBattle, atFight, atItem;

    var executeChoice = function(choice) {
        console.log("in executeChoice");
        if (!atItem) {
            UICtrl.hideInputBox();
        }
        if (isNaN(choice)) {
            console.log("non existence?");
            return 0;
        }
        if (isStart) {
            character = createCharacter(choice);
            console.log(character);
            UICtrl.displayCharacterName(character.className);
            UICtrl.clearField();
            var texts = gameMenu();
            UICtrl.displayGameMenu(texts);
            UICtrl.hideImage();
            isStart = false;
            atMenu = true;
            atBattle = false;
            atFight = false;
            atItem = false;
        } else if (atMenu) {
            ctrlMenuSelection(choice);
        } else if (atBattle) {
            // atMenu = false;
            console.log("here at battle");
            ctrlBattleSelection(choice);
        } else if (atFight) {
            // atBattle = false;
            console.log("here at fight");
            ctrlFightSelection(choice);
        } else if (atItem) {
            ctrlItemSelection(choice);
        }
    };

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(".image-row").addEventListener("click", function() {
            choice = UICtrl.getCharChoice();
            executeChoice(choice);
        });

        document
            .querySelector(DOM.gameMenuBtns)
            .addEventListener("click", function() {
                choice = UICtrl.getCharChoice();
                executeChoice(choice);
            });

        document
            .querySelector(DOM.battleMenuBtns)
            .addEventListener("click", function() {
                choice = UICtrl.getCharChoice();
                executeChoice(choice);
            });

        document
            .querySelector(DOM.fightMenuBtns)
            .addEventListener("click", function() {
                choice = UICtrl.getCharChoice();
                executeChoice(choice);
            });

        document.addEventListener("keypress", function(event) {
            if (event.keyCode == 13 || event.which === 13) {
                // pressed enter
                choice = UICtrl.getInput();
                executeChoice(choice);
            }
        });

        document
            .querySelector(DOM.closeModal)
            .addEventListener("click", function() {
                document.getElementById(DOM.modal).style.display = "none";
            });
    };

    var ctrlSetCharacter = function(choice) {
        console.log(choice);
        if (choice === "1" || choice === "2") {
            //need more conditions to check
            character = createCharacter(choice);
            console.log(character);
            UICtrl.displayCharacterName(character.className);
            UICtrl.clearField();
        }
    };

    var ctrlMenuSelection = function(choice) {
        var ret;
        if (choice == "0") {
            //going back from item menu
            UICtrl.clearMenuFields();
            UICtrl.displayGameMenu(gameMenu());
        } else if (choice == "1") {
            //go forward
            var obj = forward();
            if (!obj) {
                document.getElementById(DOMstrings.replayBtn).style.display = "block";
            }
            if (obj.enemy) {
                atBattle = true;
                atMenu = false;
                UICtrl.displayBattleMenu(obj);
            }
        } else if (choice == "2") {
            //open item menu
            atMenu = false;
            atItem = true;
            var obj = itemMenu(false);
            UICtrl.hideAllBtns();
            UICtrl.displayItemMenu(obj);
        } else if (choice == "3") {
            //status
            var obj = getCharacterStatus();
            console.log(obj);
            UICtrl.showCharacterStatus(obj);
        } else if (choice == "4") {
            alert("Final Boss is not implemented yet")

            //choice 9 not implemented yet
            console.log("skip to final boss");
        } else {
            ret = "please input a valid command";
            console.log(ret);
        }
        UICtrl.clearField();
    };

    var ctrlBattleSelection = function(choice) {
        var ret;
        if (!isNaN(choice) && choice > 0) {
            //need more conditions to check
            if (choice == "1") {
                //fight
                atBattle = false;
                atFight = true;
                console.log("trying to fight");
                UICtrl.displayFightMenu();
            } else if (choice == "2") {
                //item
                atBattle = false;
                atItem = true;
                var obj = itemMenu(true);
                UICtrl.hideAllBtns();
                UICtrl.displayItemMenu(obj);
            } else if (choice == "3") {
                //status
                var obj = getCharacterStatus();
                UICtrl.showCharacterStatus(obj);
            } else if (choice == "4") {
                //run
                var escaped = runsuccess();
                var message;
                if (escaped) {
                    message = "You have successfully ran away.";
                    character.isFighting = false;
                    enemy = null;
                    atMenu = true;
                    atBattle = false;
                    UICtrl.hideEnemyImg();
                    UICtrl.clearMenuFields();
                    UICtrl.displayGameMenu({
                        intro: message,
                        milesleft: "You have " + character.miles + "  miles left.",
                        menu: NaN,
                    });
                } else {
                    message = "You have failed at running away.";
                    UICtrl.clearMenuFields();
                    UICtrl.displayBattleMenu();
                    document.getElementById("menuquestion-0").textContent = message;
                    UICtrl.hideAllBtns();
                    // then the enemies turn
                    UICtrl.displayEnemyAction(enemy.enemyAction(character));

                    if (character.health <= 0) {
                        UICtrl.clearMenuFields();
                        UICtrl.gameover();
                        enemy = null;
                        character.isFighting = false;
                        atFight = false;
                        atBattle = false;
                    } else {
                        atBattle = true;
                        atFight = false;
                        setTimeout(function() {
                            UICtrl.clearMenuFields();
                            UICtrl.displayBattleMenu();
                        }, 3000);
                    }
                }
            } else if (choice == "5") {
                alert("Save and Quit is not implemented yet")
                    //save and quit?? not implemented yet
                    /*atBattle = false;
				atFight = false;*/
            } else {
                console.log("Please input a valid command.");
            }
            UICtrl.clearField();
        }
    };

    var ctrlFightSelection = function(choice) {
        var ret;
        if (!isNaN(choice) && choice > 0) {
            //need more conditions to check
            if (choice == "1" || choice == "2" || choice == "3") {
                if (choice == "1") {
                    //attack
                    ret = enemy.getAttacked(character);
                } else if (choice == "2") {
                    //strike
                    ret = enemy.getStruck(character);
                } else if (choice == "3") {
                    ret = character.specialAttack(enemy);
                }
                console.log(ret);
                UICtrl.clearMenuFields();
                UICtrl.displayAttackResult(ret);
                UICtrl.hideAllBtns();
                // then the enemies turn
                UICtrl.displayEnemyAction(enemy.enemyAction(character));
                if (enemy.health <= 0) {
                    //enemy.itemchance not implemented yet
                    gainExperience();
                    UICtrl.clearMenuFields();
                    console.log("You have defeated the enemy");
                    UICtrl.defeatEnemy(enemy);

                    enemy = null;
                    character.isFighting = false;
                    atFight = false;
                    atBattle = false;
                    atMenu = true;
                    UICtrl.displayGameMenu(gameMenu());
                } else if (character.health <= 0) {
                    UICtrl.clearMenuFields();
                    UICtrl.gameover();
                    enemy = null;
                    character.isFighting = false;
                    atFight = false;
                    atBattle = false;
                } else {
                    atBattle = true;
                    atFight = false;
                    setTimeout(function() {
                        UICtrl.clearMenuFields();
                        UICtrl.displayBattleMenu();
                    }, 3000);
                }
            } else if (choice == "4") {
                //back
                atBattle = true;
                atFight = false;
                UICtrl.clearMenuFields();
                UICtrl.displayBattleMenu({ character: character, enemy: enemy });
            } else {
                console.log("Please input a valid command.");
            }

            UICtrl.clearField();
        }
    };

    var ctrlItemSelection = function(choice) {
        //TOOD: implement
        var ret;
        if (!isNaN(choice)) {
            if (choice == "0") {
                atItem = false;
                console.log(character, enemy);
                UICtrl.clearMenuFields();
                if (enemy) {
                    atBattle = true;
                    UICtrl.displayBattleMenu({ character: character, enemy: enemy });
                } else {
                    atMenu = true;
                    UICtrl.displayGameMenu({
                        //is this right?
                        intro: NaN,
                        milesleft: "You have " + character.miles + "  miles left.",
                        menu: NaN,
                    });
                }
                UICtrl.hideInputBox();
                UICtrl.clearField();
            } else if (choice >= 1 && choice <= character.itemlist.length) {
                UICtrl.hideInputBox();
                var itemname = character.itemlist[choice - 1];
                ret = "You used the " + itemname + "! \r\n";
                if (itemname == "Potion") {
                    ret += character.potion();
                } else if (itemname == "Mega Potion") {
                    ret += character.megapotion();
                } else if (itemname == "Lucy") {
                    ret += character.lucy();
                } else if (itemname == "Flying Bat") {
                    ret += character.flyingbat();
                } else if (itemname == "Guitar") {
                    ret += character.guitar();
                } else {
                    console.log("item does not exist");
                }
                character.itemlist.splice(choice - 1, 1);
                console.log(ret);
                UICtrl.clearMenuFields();
                document.getElementById("menuquestion-0").innerHTML = ret.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br>"
                );
                setTimeout(function() {
                    var obj = itemMenu(true);
                    UICtrl.hideAllBtns();
                    UICtrl.displayItemMenu(obj);
                }, 3000);
                UICtrl.clearField();
            }
        }
    };

    var createCharacter = function(choice) {
        console.log(choice);
        var character;
        isStart = true;
        if (choice === 1) {
            character = new Warrior();
        } else {
            character = new Sorcerer();
        }
        return character;
    };

    var gameMenu = function() {
        //did not include all of original  function in 'world.h'
        var _intro, _forsave, _menu;
        //this should only print when game first starts
        if (isStart) {
            _intro =
                "Soham Sonthi has been committing unthinkable crimes against humanity! It is your job to stop him! You need to travel 40 miles to get to him.";
            isStart = false;
        }
        if (character.isFighting) {
            //not finished
            _forsave = "You were in the middle of a fight!";
            //battlesystem?
        }
        if (character.health >= 0) {
            _milesleft = "You have " + character.miles + "  miles left.";
            _menu =
                "Enter 1 to go forward, 2 to open item menu, 3 to open status menu. Enter 9 to skip to final boss.";
        } else {
            _menu = "You have been defeated.";
        }
        return {
            intro: _intro,
            milesleft: _milesleft,
            menu: _menu,
        };
    };

    var itemMenu = function(canchoose) {
        var _message, _itemsString, _menu;
        if (character.itemlist.length == "0") {
            _message = "You have no items left. Enter 0 to go back.";
        } else {
            _message = "The items you currently have are: ";
            _itemsString = "";
            for (var i = 0; i < character.itemlist.length; i++) {
                _itemsString += i + 1 + "." + character.itemlist[i] + "    "; //whitespace not working??
            }
            console.log("itemsString:" + _itemsString); //debug
            if (canchoose) {
                _menu = "Which one would you like to use? Enter 0 to go back.";
            } else {
                _menu = "Enter 0 to go back.";
            }
        }
        return {
            message: _message,
            itemsString: _itemsString,
            menu: _menu,
        };
    };

    var getCharacterStatus = function() {
        return { charstat: character.status(), enemy: enemy };
    };

    var forward = function() {
        //move forward in the game world
        var encounteritem = false;
        while (
            character.miles > 0 &&
            !character.isFighting &&
            character.health > 0 &&
            !encounteritem
        ) {
            character.changeMiles(-1);
            console.log(character.miles + " miles left.");
            document.getElementById("menuquestion-0").textContent =
                character.miles + " miles left."; //not working...too fast to see?
            var prob = Math.floor(Math.random() * 100);
            if (prob < 20) {
                prob = Math.floor(Math.random() * 100);

                //todo: customize enemies
                if (prob <= 20) {
                    enemy = new Cat();
                    UICtrl.changeEnemyImg("cat.gif");
                } else if (prob <= 30) {
                    enemy = new Lucy();
                    UICtrl.changeEnemyImg("lucy.gif");
                } else if (prob <= 45) {
                    enemy = new Turtle();
                    UICtrl.changeEnemyImg("turtle.gif");
                } else if (prob <= 60) {
                    enemy = new Juggler();
                    UICtrl.changeEnemyImg("juggler.gif");
                } else if (prob <= 85) {
                    //guitarist
                    enemy = new Guitarist();
                    UICtrl.changeEnemyImg("guitarist.gif");
                } else {
                    enemy = new Nerd();
                    UICtrl.changeEnemyImg("nerd.gif");
                }
                console.log("you ran into an enemy", enemy);
                UICtrl.displayEnemyImg();
                character.isFighting = true;
            } else if (prob % 100 > 94) {
                //5% item encounter
                // else{ //temporary 80% for debugging purpose
                encounteritem = true;
                var prob2 = Math.floor(Math.random() * 10);
                var message;
                if (prob2 == 0) {
                    message =
                        "You found a half opened Mega Potion! \r\nHopefully, it's safe.";
                    character.itemlist.push("Mega Potion");
                } else if (prob2 == 1) {
                    message =
                        "You found a trashed guitar? \r\nYou look cool now holding trash!";
                    character.itemlist.push("Guitar");
                } else {
                    message =
                        "You found a potion! \r\nMaybe someone threw out one after having 999 of them.";
                    character.itemlist.push("Potion");
                }
                console.log(message);
                UICtrl.clearMenuFields();
                UICtrl.displayGameMenu({
                    intro: message,
                    milesleft: "You have " + character.miles + "  miles left.",
                    menu: NaN,
                });
            }
        }
        if (character.miles == 0) {
            return null;
        }
        return {
            character: character,
            enemy: enemy,
        };
    };

    var gainExperience = function() {
        var leveldiff = character.level - enemy.level;
        var _experience;
        var msg;
        if (Math.abs(leveldiff) <= 2) {
            _experience = Math.floor(Math.random() * (leveldiff + 9) + 1);
            msg += character.increaseexp(_experience);
        } else if (leveldiff >= 3) {
            _experience = Math.floor(Math.random() * 9 + 1);
            msg += character.increaseexp(_experience);
        } else if (leveldiff <= -3) {
            _experience = Math.floor(Math.random() * leveldiff * 2 + 1);
            msg += character.increaseexp(_experience);
        }
        if (character.experience >= 10) {
            msg += character.levelup();
        }
        console.log("in controller.gainExperience()", msg);
        return msg;
    };

    var calculateOrder = function() {
        //didn't use, assumed user starts each fight
        if (character.speed > enemy.speed) {
            return true;
        } else if (character.speed > enemy.speed) {
            return false;
        } else {
            if (Math.floor(Math.random() * 2 + 1) % 2 == 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    var runsuccess = function() {
        var threshold, rand, message;
        threshold = 70;
        if (character.level < enemy.level) {
            threshold = 30;
        } else if (character.level == enemy.level) {
            threshold = 50;
        }
        rand = Math.floor(Math.random() * 100);
        if (rand < threshold) {
            // message = 'You have successfully ran away.';
            character.isFighting = false;
            enemy = null;
            return true;
        } else {
            // message = 'You have failed at running away.';
            return false;
        }
    };

    var returnCharEnem = function() {
        return {
            character: character,
            enemy: enemy,
        };
    };

    return {
        debug: function() {
            //check private member vairables
            console.log({
                character: character,
                enemy: enemy,
                isStart: isStart,
                atMenu: atMenu,
                atBattle: atBattle,
                atFight: atFight,
                atItem: atItem,
            });
        },
        init: function() {
            isStart = true;
            console.log("game started");
            UIController.init();
            setupEventListeners();
        },
    };
})(UIController);

controller.init();