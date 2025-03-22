function startChapter6() {
    changeSceneMusic("harbour"); 
    clearGameText();

    displayText("Chapter 6: A Awakening", () => {
        displayText("After a few days of walking, you and Manji arrive at a harbor.", () => {
            displayText("You see multiple ships and different people, but as you get closer, you immediately notice", () => {
                displayText("These aren’t ordinary sailors. They are pirates.", () => {
                    displayText("You approach one of them.", () => {
                        displayText("You: Who’s your captain?", () => {
                            displayText("Pirate: Arrr, who's asking?", () => {
                                displayText("You: I am.", () => {
                                    displayText("Pirate: Thinking you’re funny, are we?", () => {
                                        displayText("Manji: Something the matter?", () => {
                                            displayText("The pirate immediately seems very intimidated by Manji.", () => {
                                                displayText("Pirate: Uhhh... Arrr, not at all, compadre. The captain is right over there.", () => {
                                                    displayText("Manji: Wasn’t so hard now, was it?", () => {
                                                        displayText("You and Manji walk towards the captain.", () => {
                                                            displayText("Manji: Ahoi, Captain! Where is the journey going?", () => {
                                                                displayText("Captain: Arrr... To the land of Solitude past the Abyssal Isle.", () => {
                                                                    displayText("You: That’s it! That is where we need to go!", () => {
                                                                        displayText("Manji: For how much will you take us with you?", () => {
                                                                            displayText("Captain: Arrr, now now, new friends. Since we are already going there, you can come with us for free, arrr.", () => {
                                                                                displayText("Manji: And the catch is???", () => {
                                                                                    displayText("Captain: Arrr... that you protect us during our journey until we arrive at Abyssal Isle. You both seem like good swordsmen.", () => {
                                                                                        displayText("Manji: That’s it?", () => {
                                                                                            displayText("Captain: Arrr no no, new friends. One more thing. When you find treasure on the island, you give it to us, argh.", () => {
                                                                                                displayText("Manji: That okay with you, kid?", () => {
                                                                                                    showOptions([
                                                                                                        { text: "Fine by me", action: acceptPirateDeal },
                                                                                                        { text: "No, the treasures are ours to keep", action: refusePirateDeal }
                                                                                                    ]);
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}


function acceptPirateDeal() {
    displayText("Captain: Arrr, welcome onboard, compadres! Arrr!", () => {
        boardShip();
    });
}


function refusePirateDeal() {
    displayText("Captain: Arrr, that is too bad, compadre. Then you have to swim to the island yourself, arrr.", () => {
        showOptions([
            { text: "Ugh, alright then, you can have the treasures if we find any.", action: acceptPirateDeal }
        ]);
    });
}


function boardShip() {

    displayText("You and Manji get onboard. A few days later, the ship finally leaves.", () => {
        displayText("As the ship sets sail, the salty wind whips through the air.", () => {
            displayText("The creaking of the wooden deck beneath your boots reminds you that you are now truly at sea.", () => {
                displayText("The pirates burst into song, their voices rough yet oddly in sync as they chant a shanty of old.", () => {
                    
                    changeSceneMusic("singingPirates");
                    displayText("Sailing through stormy oceans, we fear no danger", () => {
                        displayText("With the wind at our back, we're the lords of the sea (yo-ho!)", () => {
                            displayText("Our sails, they billow as we search for the treasure", () => {
                                displayText("We're pirates bold, with hearts wild and free (arrr!)", () => {
                                    displayText("Hoist the anchor, let the cannons roar (yo-ho!)", () => {
                                        displayText("Sail on, sail on, to distant shores (yo-ho!)", () => {
                                            displayText("With swords in our hands and our hearts filled with fire", () => {
                                                displayText("We're bound for glory, we'll never tire", () => {
                                                    displayText("Through the misty moonlit nights, we seek our fortune", () => {
                                                        displayText("Over the seven seas, we'll claim our victory (yo-ho!)", () => {
                                                            displayText("The gold and jewels, they glisten in our sight", () => {
                                                                displayText("As we sing our song for all the world to see (arrr!)", () => {
                                                                    displayText("Hoist the anchor, let the cannons roar (yo-ho!)", () => {
                                                                        displayText("Sail on, sail on, to distant shores (yo-ho!)", () => {
                                                                            displayText("With swords in our hands and our hearts filled with fire", () => {
                                                                                displayText("We're bound for glory, we'll never tire", () => {
                                                                                    changeSceneMusic("seaAtNight");
                                                                                    displayText("As the song ends, you look around and realize you are about to enter the unknown...", () => {
                                                                                        nightOnShip()
                                                                                    });
                                                                                });
                                                                            }, true);
                                                                        }, true);
                                                                    }, true);
                                                                }, true);
                                                            }, true);
                                                        });
                                                    }, true);
                                                }, true);
                                            }, true);
                                        }, true);
                                    }, true);
                                }, true);
                            }, true);
                        }, true);

                    }, true);
                });
            });
        });
    });
}

function nightOnShip() {
    clearGameText();

    displayText("At nightfall, you and Manji lean against the railing, staring at the moonlit waves.", () => {
        displayText("The sea is calm, but there is an uneasiness in the air.", () => {
            displayText("Manji: You ever been at sea before, kid?", () => {
                displayText("You: No. First time.", () => {
                    displayText("Manji: Heh. Hope you got a strong stomach. Some land dwellers take one look at the waves and start puking their guts out.", () => {
                        displayText("You: I think I’ll be fine… though I can’t say I trust these pirates.", () => {
                            displayText("Manji: (chuckles) They’re pirates, kid. They’d stab their own mothers for an extra piece of Embermark.", () => {
                                displayText("Manji: But… they do live by a code, strange as it is. As long as we hold up our end, we should be fine.", () => {
                                    displayText("You: And if we don’t?", () => {
                                        displayText("Manji: (smirks) Then we’ll see how many of ‘em can swim with a sword in their gut.", () => {
                                            displayText("The two of you share a quiet moment, watching the ocean.", arriveAtAbyssalIsle);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function arriveAtAbyssalIsle() {
    changeSceneMusic("island"); 
    gameState.player.hp = gameState.player.maxHp;
    clearGameText();

    displayText("A few weeks later, you and Manji finally arrive at Abyssal Isle.", () => {
        displayText("As you step off the ship, the Captain calls out to you both one last time.", () => {
            displayText("Captain: Arrrr, you both better remember our bargain, all treasures on that island are ours, arrrr.", () => {
                displayText("You: Have a good journey, Captain. We’ll see each other soon!", () => {
                    displayText("Captain: Arrrr, good journey to you too, arrr.", () => {
                        displayText("The ship sails away, leaving you and Manji alone on the island.", () => {
                            displayText("No way back now.", () => {
                                displayText("Manji: Where to next, kid?", () => {
                                    displayText("You: This way. We’re close.", () => {
                                        exploreIsland();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function exploreIsland() {

    displayText("You and Manji start walking. The deeper you go into the island, the darker it feels.", () => {
        displayText("Manji notices it too. For the first time, you start seeing him feel uncomfortable.", () => {
            displayText("Maybe even... scared.", () => {
                displayText("Manji: How much further, kid?", () => {
                    displayText("You: Not far.", () => {
                        displayText("After walking for a couple more hours, you see a cave in the distance.", () => {
                            displayText("You: Over there, that’s where we need to—", () => {
                                playMusic("horn");
                                displayText("Suddenly, a loud horn echoes across the island.", () => {
                                    playMusic("ambush");
                                    displayText("You: Oh no, Manji! Watch out!", () => {
                                        triggerAmbush();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function triggerAmbush() {
    displayText("Multiple beings jump out from the shadows, weapons drawn, ready to strike!", () => {
        displayText("???: @#^*In@&The%$%^Name^$Of $@$Lord $#$Terminus@$@#", () => {
            displayText("The creatures look humanoid, but you can tell they are not human.", () => {
                displayText("You draw your weapon, ready to fight.", () => {
                    displayText("You and Manji stand back to back.", () => {
                        displayText("Manji: Show me what you learned, kid! We got this!", () => {
                            clearGameText();
                            startCombat(terminusMinion);
                        });
                    });
                });
            });
        });
    });
}

const terminusMinion = {
    name: "Terminus Minion",
    hp: 200,
    attackOptions: [
        { name: "Shadow Slash", damage: 10, accuracy: 70 },
        { name: "Dark Stab", damage: 15, accuracy: 50 }
    ],
    music: "terminusMinion",
    afterDefeat: afterMinionBattle
};

function afterMinionBattle() {
    changeSceneMusic("ambush")
    displayText("After you defeated the being, it disappears. When you turn around, you see Manji still fighting one.", () => {
        displayText("The being is fast, but Manji is even faster. He strikes it down, and it falls to the ground.", () => {
            displayText("Manji turns around, breathing heavily.", () => {
                displayText("Manji: You okay ki-", () => {
                    stopAllMusic();
                    displayText("Before Manji can finish his sentence, a sword pierces through his chest.", () => {
                        playMusic("goodbyeManji");
                        displayText("As you look past him, you notice it is one of the beings that Manji just struck down.", () => {
                            displayText("After stabbing Manji, it falls to the ground and disappears. Manji collapses.", () => {
                                displayText("You rush to his aid.", () => {
                                    displayText("You: MANJI NO, STAY WITH ME!", () => {
                                        displayText("You grab something out of your backpack and start patching up Manji.", () => {
                                            displayText("You hear footsteps nearing you. Faster. Harder. Louder.", () => {
                                                displayText("Manji: Listen... Kid... go... there is no time... go...", () => {
                                                    displayText("You: No, I’m not leaving you!", () => {
                                                        displayText("Manji: He-here... take... my... s-s-s-sword... i-i’m going to see my sister again... he... he", () => {
                                                            addItemToInventory(allItems.bladeOfTheImmortal);
                                                            equipWeapon(allItems.bladeOfTheImmortal);
                                                            displayText("You: Manji...", () => {
                                                                displayText("The footsteps get louder, and you see the beings emerge from the bushes.", () => {
                                                                    displayText("Manji: (Yelling) GOOOO... NOW!", () => {
                                                                        stopMusic();
                                                                        displayText("You drop a tear as you leave Manji and start running towards the cave without looking back.", () => {
                                                                            startCaveEscape();
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function startCaveEscape() {
    clearGameText();
    playMusic("run");

    setTimeout(() => {
        displayText("You enter the cave, the beings are still chasing you. There are too many to fight off. You need to keep running!", () => {
            firstCaveSplit();
        }, true);
    }, 8000); 
}

function firstCaveSplit() {
    displayText("You near a parting of the tunnel, you need to decide where to go!", () => {
        timedChoice(
            [
                { text: "Left", action: () => takeDamageAndContinue(2, "You run left, you run into one of those beings. You manage to dodge its attack mostly, but you still take 2 damage.", secondCaveSplit) },
                { text: "Right", action: secondCaveSplit }
            ]
        );
    }, true);
}

function secondCaveSplit() {
    clearGameText();
    displayText("Another parting, quickly where do you go!", () => {
        timedChoice(
            [
                { text: "Left", action: thirdCaveSplit },
                { text: "Right", action: () => takeDamageAndContinue(2, "You run right, you run into one of those beings. You manage to dodge its attack mostly, but you still take 2 damage.", thirdCaveSplit) }
            ]
        );
    }, true);
}

function thirdCaveSplit() {
    clearGameText();
    displayText("Another parting, quickly where do you go!", () => {
        timedChoice(
            [
                { text: "Left", action: reachSafeRoom },
                { text: "Right", action: () => takeDamageAndContinue(2, "You run right, you run into one of those beings. You manage to dodge its attack mostly, but you still take 2 damage.", reachSafeRoom) }
            ]
        );
    }, true);
}

function reachSafeRoom() {
    playMusic("safety");
    displayText("You near a door, you kick it open and shut it behind you.", () => {
        displayText("You hear the beings crash against the door, but luckily none of them seem to get through.", () => {
            findHealingItems()
        });
    });
}

 
 // Handles choices with a 3-second timer.
 // If no choice is made, the player takes 2 damage.

function timedChoice(options) {
    let countdown = 3;
    let countdownEl = document.createElement("div");
    countdownEl.id = "countdown";
    countdownEl.textContent = `⏳ ${countdown} seconds remaining...`;
    document.getElementById("output").appendChild(countdownEl);

    let timer = setInterval(() => {
        countdown--;
        countdownEl.textContent = `⏳ ${countdown} seconds remaining...`;

    if (countdown <= 0) {
    clearInterval(timer);
    countdownEl.remove();

    // Player takes 2 damage and is sent directly to the second cave split
    takeDamageAndContinue(2, "You hesitated too long! One of the beings slashes at you, dealing 2 damage.", true ,secondCaveSplit);
    return;
    }   
    }, 1000);

    showOptions(options.map(opt => ({
        text: opt.text,
        action: () => {
            clearInterval(timer); // Stop the countdown if the player selects an option
            countdownEl.remove();
            opt.action();
        }
    })));
}

/**
 * Inflicts damage on the player, updates UI, then proceeds with the scene.
 */
function takeDamageAndContinue(damage, message) {
    gameState.player.hp = Math.max(0, gameState.player.hp - damage);
    updateHUD();
    displayText(message, () => {
        if (gameState.player.hp <= 0) {
            handleGameOver();
        } else {
            thirdCaveSplit();
        }
    }, true);
}

function findHealingItems() {
    displayText("As you take a moment to breathe, you notice something in the dim light of the chamber.", () => {
        displayText("There are some abandoned supplies scattered on the ground. You search through them.", () => {
            addItemToInventory(allItems.soulRemnant);
            addItemToInventory(allItems.abyssalDraught);
            addItemToInventory(allItems.emberOfPyrethorn);
            displayText("You found some healing supplies, they will most likely come in handy soon.", () => {
                continueExploring();
            });
        });
    });
}

function continueExploring() {
    displayText("You start walking down the huge chamber. It looks like a prison, but not for humans.", () => {
        displayText("The silence around you is deafening. Whatever was here… is long gone.", () => {
            displayText("After a while of walking, you notice a faint glow in the distance.", () => {
                displayText("As you approach, the light gets brighter.", () => {
                    meetTheWoman();
                });
            });
        });
    });
}

function meetTheWoman() {
    playMusic("nearingTerminus"); 
    displayText("When you enter the room where the light is coming from, you see her.", () => {
        displayText("The woman from your dreams. She looks at you, and as soon as she recognizes you, she smiles.", () => {
            displayText(`???: ${gameState.player.name}, you made it! I can’t believ e e e e e e e e- @#$`, () => {
                revealTerminus();
            });
        });
    });
}

function revealTerminus() {
    changeSceneMusic("terminusTheme"); 

    displayText("Her words become twisted, her form distorting as the smile disappears.", () => {
        displayText("???: I can’t believe… you fell for that!", () => {
            displayText("Suddenly, the woman disappears into darkness, and from the shadows, a monstrous figure emerges.", () => {
                displayText("You know exactly who it is.", () => {
                    displayText("It’s Terminus.", () => {
                        confrontationWithTerminus();
                    });
                });
            });
        });
    });
}

const terminus = {
    name: "Terminus",
    hp: 500,
    attackOptions: [
        { name: "Dark Slash", damage: 15, accuracy: 60 },
        { name: "Void Pierce", damage: 25, accuracy: 50 },
        { name: "Shadow Blast", damage: 30, accuracy: 40 },
    ],
    music: "terminusBattle", 
    afterDefeat: afterTerminusBattle
};

function confrontationWithTerminus() {
    displayText("Terminus: Time to finally finish the last one. Nothing personal.", () => {
        displayText("You: YOUR FOLLOWERS TOOK EVERYTHING FROM ME!", () => {
            displayText("Terminus: Yes, yes, your family…", () => {
                displayText("Terminus: If only they had kept their hands off of business that wasn’t theirs, you all would still comfortably live in that forest of yours.", () => {
                    displayText("You: I’LL KILL YOU!", () => {
                        displayText("Terminus: You can’t kill something that is already dead.", () => {
                            displayText("Terminus: But I’ll be happy to see you try. Hahaha!", () => {
                                clearGameText();
                                startCombat(terminus);
                            });
                        });
                    });
                });
            });
        });
    });
}

function afterTerminusBattle() {

    changeSceneMusic("terminusTheme");

    displayText("Terminus stumbles back, shocked by your strength.", () => {
        displayText("Terminus: I must say, I underestimated you... No matter.", () => {
            displayText("Terminus: After all, you can't kill something that is already dead!", () => {
                displayText("???: But it can be sealed away.", () => {
                    changeSceneMusic("alysandraApears");
                    displayText("Terminus looks behind him. You turn to see the woman from your dreams.", () => {
                        displayText("Terminus: YOU?!", () => {
                            displayText("Terminus: I already dealt with you!", () => {
                                displayText("???: Did you?", () => {
                                    displayText("She raises her hand, shining a light through the chamber.", () => {
                                        displayText("The light reflects off multiple crystals, illuminating the vast chamber.", () => {
                                            displayText("Finally, the light engulfs Terminus, forcing him to one knee.", () => {
                                                displayText("Terminus: No! No!! I will not be sealed again!", () => {
                                                    displayText("He screams as his form begins to dissolve, vanishing into a black mist.", () => {
                                                        displayText("The black mist is drawn into the crystals, sealing him away once more.", () => {
                                                            revealAlysandra();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function revealAlysandra() {
    changeSceneMusic("alysandraTheme");

    displayText("The woman approaches you, smiling gently.", () => {
        displayText(`???: You have my gratitude, ${gameState.player.name}. You answered my calling and saved this world from catastrophe.`, () => {
            displayText("You: W-Who are you truly?", () => {
                displayText("???: In life, I was known as Alysandra, an Elf and a priest of the Pyrethorn Empire.", () => {
                    displayText("Alysandra: I'm sure you have many questions. I am happy to answer them.", () => {
                        showAlysandraOptions();
                    });
                });
            });
        });
    });
}

// Tracks remaining questions
let remainingQuestions = [
    { text: "Why did you choose me?", action: whyMe },
    { text: "What had my family to do with this?", action: familyTruth },
    { text: "Why did Terminus do what he did?", action: terminusAmbition },
    { text: "Why did you need me?", action: whyNeeded }
];

// Function to update the choices dynamically
function showAlysandraOptions() {
    if (remainingQuestions.length === 0) {
        proceedAfterQuestions(); // Continue story if all questions are asked
        return;
    }

    showOptions(remainingQuestions.map((q, index) => ({
        text: q.text,
        action: () => {
            remainingQuestions.splice(index, 1); // Remove chosen question
            q.action(); // Call the selected function
        }
    })));
}

function whyMe() {
    displayText("Alysandra: Simple, you were the last of your family. That is why I chose you as my champion.", showAlysandraOptions);
}

function familyTruth() {
    displayText("Alysandra: Your family once led the priests of the Pyrethorn Empire. But when Terminus turned against his brother, your ancestors went into hiding.", () => {
        displayText("Alysandra: The Goat Riders were ordered to eliminate anyone connected to that history.", () => {
            displayText("Alysandra: Since you were just a child, Terminus spared you he saw you as unimportant. Terminus might be evil but even he had his limits", showAlysandraOptions);
        });
    });
}

function terminusAmbition() {
    displayText("Alysandra: Terminus sought immortality, but not as he is now.", () => {
        displayText("Alysandra: He wanted to remain flesh and blood, ruling forever.", () => {
            displayText("Alysandra: Emperor Pyrethorn and the priests forbade it, sensing the darkness it would bring. Terminus rebelled, leading to years of bloody civil war before he was sealed here", () => {
                displayText("Alysandra: To make sure Terminus stayed here I was stationed down here by the order of priest to make sure Terminus never got out. As I am an Elf I could live for many hundred years. The Empire chose to let the bloody civil war be forgotten, and since there is not many more Elf kind in this world many have been born centuries after the conflict.", showAlysandraOptions);
            });
        });
    });
}

function whyNeeded() {
    displayText("Alysandra: A part of Terminus escaped when a crystal cracked. He used it to trap me between this life and the next.", () => {
        displayText("Alysandra: I needed you to keep him distracted while I repaired the seal.", showAlysandraOptions);
    });
}

// When all questions have been asked, proceed with the story
function proceedAfterQuestions() {
    displayText("Alysandra smiles warmly as she looks at you.", () => {
        displayText("Alysandra: Now that you understand everything, there is one last thing I must offer you.", () => {
            finalChoice();
        });
    });
}

function finalChoice() {
    displayText("Alysandra places her hand on your cheek, smiling warmly.", () => {
        displayText(`Alysandra: Dear ${gameState.player.name}, since you fulfilled your mission, I will give you a choice.`, () => {
            displayText("Alysandra: I can send you to a world where no pain nor sadness exists.", () => {
                displayText("Alysandra: Or you can stay and try to make this world a better place, because I know you can do it", () => {
                    displayText("Alysandra: Choose wisely.", () => {
                        showOptions([
                            { text: "[Find the rest you have been searching for]", action: findRest },
                            { text: "[Stay and make this world better]", action: stayAndChange }
                        ]);
                    });
                });
            });
        });
    });
}

function findRest() {
    displayText("You: I want to find the rest I have been seeking for so long.", () => {
        displayText("Alysandra: So it will be.", () => {
            displayText("She snaps her fingers, and a bright light engulfs you.", () => {
                changeSceneMusic("peacefullEnding");
                clearGameText();
                displayText("When you open your eyes, you see a beautiful land, mountains, waterfalls, peaceful villages.", () => {
                    displayText("In the distance, you see your family waving at you, beckoning you to come.", () => {
                        displayText("As you step forward, a hand rests on your shoulder.", () => {
                            displayText("You turn to see Manji, smiling at you.", () => {
                                displayText("Manji: Ready to go?", () => {
                                    displayText("You: Always.", () => {
                                        displayText("Together, you walk toward your family.", () => {
                                            displayText("You finally feel the peace you've longed for.", () => {
                                                displayText("THE END.", () => {
                                                    startCredits();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function stayAndChange() {
    displayText("You: I want to stay and make this world a better place.", () => {
        displayText("Alysandra: So it will be.", () => {
            displayText("She snaps her fingers, and a bright light surrounds you.", () => {
                changeSceneMusic("stayAndChange");
                clearGameText();
                displayText("When you open your eyes, you're standing on top of the island.", () => {
                    displayText("You feel different stronger, unstoppable.", () => {
                        displayText("A ship appears in the distance, the pirates returning.", () => {
                            displayText("Captain: Ahoy, buddy! Did you find any treasure?", () => {
                                displayText("You: Sorry Captain, nothing you can use.", () => {
                                    displayText("Captain: Arrr, too bad! Well, no matter. Hop onboard, compadre!", () => {
                                        displayText("You step aboard, feeling ready for whatever comes next.", () => {
                                            displayText("A new adventure awaits.", () => {
                                                displayText("THE END.", () => {
                                                    startCredits();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
