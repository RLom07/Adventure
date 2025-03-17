function startChapter5() {
    saveGame();
    console.log("🎬 Starting Chapter 5: The Market & The Attack...");

    changeSceneMusic("morningTheme"); // Use a calm market theme
    clearGameText();

    // ✅ Increase Player's Max HP & Fully Heal Them
    gameState.player.maxHp = 100;
    gameState.player.hp = gameState.player.maxHp; // ✅ Fully restore health

    // ✅ Ensure the HUD updates properly
    if (typeof updatePlayerHP === "function") {
        updatePlayerHP(gameState.player.hp); // ✅ Pass updated HP value
    }
    if (typeof updateHUD === "function") {
        updateHUD();
    }

    addItemToInventory(allItems.bandage);
    addItemToInventory(allItems.smallHerb);
    addItemToInventory(allItems.healingPotion);
    addItemToInventory(allItems.herbalMix);

    displayText("Chapter 5: A Solution", () => {
        displayText("1 year later...", () => {
            displayText("After many training sessions, you finally did it. For the first time since your training began, you managed to surprise Manji and beat him in a spar.", () => {
                displayText("Manji: Well, congrats kid. You’ve come far in the short time you have been under my wing.", () => {
                    displayText("You: Thanks Manji, I finally beat you today.", () => {
                        displayText("Manji: Don’t pat yourself too much on the back, kid. You still got a long way to go.", () => {
                            displayText("Manji: Follow me, I have something for you.", () => {
                                displayText("You follow Manji inside his wooden cabin. He grabs something hidden behind his bed.", () => {
                                    displayText("Manji: This was my sister’s. Since you have come so far, I want you to have it.", () => {
                                        displayText("He hands you a beautiful mighty Katana.", () => {
                                            showOptions([
                                                { text: "What?! No way, thank you!", action: acceptKatana },
                                                { text: "Manji... I can’t accept this.", action: refuseKatana }
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
}

function acceptKatana() {
    displayText("Manji: You’ve earned it, kid. But remember, you still have a long way to go. So don’t go swinging it in all directions.", () => {
        afterReceivingKatana();
    });
}

function refuseKatana() {
    displayText("Manji: Just take it, kid. It’s here just collecting dust anyway.", () => {
        afterReceivingKatana();
    });
}

function afterReceivingKatana() {
    addItemToInventory(allItems.katana); 

    displayText("You: I don’t know what to say.", () => {
        displayText("Manji: Then say nothing for once in your life.", () => {
            showOptions([
                { text: "What happened to your sister?", action: askAboutSister },
                { text: "...", action: ignorePast }
            ]);
        });
    });
}

function askAboutSister() {
    displayText("Manji: Well, let me ask you this, kid. Why do you think I agreed to take you under my wing?", () => {
        displayText("You: I don’t know... why did you?", () => {
            displayText("Manji: Well, when you told me you lost your family to those monsters, I realized we aren’t so different.", () => {
                displayText("You: Wait... don’t tell me.", () => {
                    displayText("Manji: Yep. Lost her to those sons of bitches.", () => {
                        displayText("Manji: Goat Riders is a fitting name for them because they are fucking animals!", () => {
                            displayText("You: What was her name?", () => {
                                displayText("Manji: ...", () => {
                                    displayText("Manji: Mari.", () => {
                                        displayText("Manji: It was just a day like every other. We were getting ready to go to the market.", () => {
                                            displayText("Manji: I sold firewood, and she sold clothes she made from materials she found all over town.", () => {
                                                displayText("Manji: Then those bastards ran in on their goats and started abducting women and children, killing the men. No reason why. They just did it.", () => {
                                                    displayText("Manji: When they tried to take Mari, she resisted. She was stubborn but strong. When she didn’t comply, they slit her throat.", () => {
                                                        displayText("Manji: Then they just left. Leaving only chaos and despair.", () => {
                                                            displayText("Manji: So take the damn sword and take revenge for your family. They are animals, so they deserve to be slaughtered like animals.", () => {
                                                                displayText("You: Manji...", () => {
                                                                    manjiInvitesToMarket();
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

function ignorePast() {
    displayText("Manji: ...", () => {
        manjiInvitesToMarket();
    });
}

function manjiInvitesToMarket() {
    displayText("Manji: Well, I am heading to the market, kid. We need some new things here. Wanna come with me?", () => {
        showOptions([
            { text: "Yeah, alright.", action: visitMarket }
        ]);
    });
}

function visitMarket() {
    changeSceneMusic("marketTheme");

    displayText("You and Manji start walking towards the village. When you both arrive, the market is filled with life and conversation.", () => {
        displayText("Manji: Take a look around, kid. See if you find anything useful.", () => {
            showOptions([
                { text: "Go to the blacksmith", action: visitBlacksmith },
                { text: "Go to the traveling trader", action: visitTrader }
            ]);
        });
    });
}

function visitBlacksmith() {
    displayText("You decide to take a look at the smith. The closer you get, the hotter it gets. A muscular man approaches you.", () => {
        displayText("Smith: Welcome to the Black Metal Smith, best and also the only smith in town. What can I do for ya?", () => {
            displayText("You: Uhm... I’ll just have a look around.", () => {
                displayText("Smith: No problemo, when you need anything, great uncle Mario is at your service!", () => {
                    displayText("You: Right...", () => {
                        displayText("You take a look around at all the different armors and weapons, fascinated by the craftsmanship.", () => {
                            enemyEncounter();
                        });
                    });
                });
            });
        });
    });
}

function visitTrader() {
    displayText("You decide to take a look at the tent of the traveling trader. A handsome young man approaches you.", () => {
        displayText("Trader: See anything you like?", () => {
            displayText("You: Not yet, I’ll just have a look around.", () => {
                displayText("Trader: Sure thing, tell me if you need anything.", () => {
                    displayText("You take a look at the rare goods and artifacts. Every item more impressive than the last.", () => {
                        enemyEncounter();
                    });
                });
            });
        });
    });
}

const goat_rider = {
    name: "Goat Rider",
    hp: 150,
    attackOptions: [
        { name: "Sword Slash", damage: 10, accuracy: 60 },
        { name: "Sword Pierce", damage: 15, accuracy: 50 },
        { name: "Dagger Stab", damage: 5, accuracy: 70 }
    ],
    music: "marketBattle",
    afterDefeat: afterBattle 
};

function enemyEncounter() {

    // ✅ Increase Player's Max HP & Fully Heal Them
    gameState.player.maxHp = 100;
    gameState.player.hp = gameState.player.maxHp; // ✅ Fully restore health

    if (isNaN(gameState.player.hp) || gameState.player.hp > gameState.player.maxHp) {
    gameState.player.hp = gameState.player.maxHp; // Ensure it's set correctly
    }

    // ✅ Ensure the HUD updates properly
    if (typeof updatePlayerHP === "function") {
        updatePlayerHP(gameState.player.hp); // ✅ Pass updated HP value
    }
    if (typeof updateHUD === "function") {
        updateHUD();
    }

    changeSceneMusic("twoGoatRiders");
    displayText("Suddenly, you hear a lot of commotion in the marketplace.", () => {
        displayText("???: There! That must be Alysandra’s chosen one!", () => {
            displayText("You turn around and see multiple Goat Riders staring directly into your soul.", () => {
                displayText("The largest one, sitting on top of a goat, speaks to you.", () => {
                    displayText("Leader: Pity. You didn’t have to die. She signed your death sentence the moment she gave you that stupid dream.", () => {
                        displayText("You: H-how do you know about that?", () => {
                            displayText("Leader: It doesn’t matter. You’re dead anyway.", () => {
                                displayText("Three Goat Riders charge at you, you close your eyes. You can’t do it after all this time you’re still scared.", () => {
                                    displayText("You hear clings of swords and when you open your eyes you see Manji in front of you and two of the three Goat Riders dead on the ground.", () => {
                                        displayText("Manji: GODDAMMIT, STUPID KID! SNAP OUT OF IT!!!", () => {
                                            displayText("Manji is right. You snap out of it and grab your weapon, preparing for battle!", () => {
                                                clearGameText()
                                                startCombat(goat_rider); 
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

function afterBattle() {

    changeSceneMusic("twoGoatRiders");
    clearGameText();

    displayText("After the battle, the Leader on top of a goat yells to you:", () => {
        displayText("Leader: You are lucky to be alive today because of that man, but he can’t protect you forever!", () => {
            displayText("He charges away with the remaining Goat Riders, leaving you and Manji behind.", () => {
                displayText("Manji: You okay, kid?", () => {
                    displayText("You: Yeah...", () => {
                        displayText("Manji: Idiot, what fool closes his eyes in the face of the enemy.", () => {
                            displayText("You: I know, I’m so—", () => {
                                displayText("You notice a letter in the pocket of the Goat Rider you just killed.", () => {
                                    displayText("You pick it up and slide it into your pocket.", () => {
                                        displayText("Manji: Let’s go home before more of those animals show up.", () => {
                                            displayText("You: Yeah...", () => {
                                                continueToManjiHouse(); 
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