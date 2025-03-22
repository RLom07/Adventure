function startChapter5() {

    changeSceneMusic("morningTheme"); // Use a calm market theme
    clearGameText();

    // Increase Player's Max HP & Fully Heal Them
    gameState.player.maxHp = 100;
    gameState.player.hp = gameState.player.maxHp; // Fully restore health

    // Ensure the HUD updates properly
    if (typeof updatePlayerHP === "function") {
        updatePlayerHP(gameState.player.hp); // Pass updated HP value
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
    equipWeapon(allItems.katana);

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

function continueToManjiHouse() {
    clearGameText();
    displayText("When you arrive at Manji's house you grab the letter out of your pocket and unfold it.", () => {
        displayText("Manji: What’s that?", () => {
            displayText("You: A letter I found on one of the dead Goat Riders.", () => {
                displayText("You start reading the letter out loud.", () => {
                    displayText("You: “To the Shadowed Riders,", () => {
                        displayText("The faithful continue to seek our Lord’s return, but we must remain unseen.", () => {
                            displayText("His will is not yet fulfilled, and the world must not suspect his awakening.", () => {
                                displayText("The name of our Lord is known only to us, but outsiders may still stumble upon it.", () => {
                                    displayText("Thus, we follow his command: Seal all knowledge behind the cipher of the Old Empire,", () => {
                                        displayText("as it was in the days of fire and conquest.", () => {
                                            displayText("The unworthy will see only twisted letters, meaningless and wrong.", () => {
                                                displayText("Only those who follow the path shall unravel the truth.", () => {
                                                    displayText("Remember the rule, as written in the sacred texts of the Abyss:", () => {
                                                        displayText("“Four steps backwards, the past obscured.”", () => {
                                                            displayText("Let no fool uncover what we guard, for the path must remain hidden until the hour of reckoning.”", () => {
                                                                displayText("Manji: Seal knowledge? What knowledge?", () => {
                                                                    displayText("You: I don’t know, what knowledge can animals like that possibly pos—", () => {
                                                                        displayText("You: !!!", () => {
                                                                            displayText("Manji: What?", () => {
                                                                                displayText("You: The name!!!", () => {
                                                                                    displayText("Manji: What name?", () => {
                                                                                        displayText("You: The name I saw in my dream! I knew it had to mean something.", () => {
                                                                                            displayText("You grab your journal and show Manji the name: Xivqmryw", () => {
                                                                                                displayText("Manji: Damn kid, you might be onto something. Keep going.", () => {
                                                                                                    displayText("You: Four steps backwards? Or maybe more like four letters backwards!", decipherNamePuzzle); // Calls the cipher puzzle
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            }, true);
                                                        });
                                                    }, true);
                                                }, true);
                                            });
                                        });
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

function decipherNamePuzzle() {

    changeSceneMusic("theName");

    const outputEl = document.getElementById("output");
    outputEl.innerHTML = ""; // Clear previous content

    displayText("You: Four steps backwards? Or maybe more like four letters backwards!", () => {
        displayText("🔻 Mysterious Name: Xivqmryw", () => {
            displayText("Enter the true name:", () => {
                const inputEl = document.createElement("input");
                inputEl.type = "text";
                inputEl.id = "cipherInput";
                inputEl.placeholder = "Enter the name...";
                inputEl.style.background = "#000";
                inputEl.style.color = "#33ff33";
                inputEl.style.border = "1px solid #33ff33";
                inputEl.style.fontFamily = "Consolas, monospace";
                inputEl.style.fontSize = "x-large";
                inputEl.autofocus = true;

                outputEl.appendChild(inputEl);

                // Hide "Press Enter to continue"
                hideEnterMessage();

                showOptions([
                { text: "Give me a hint", action: giveHint }
                ]);

                // Listen for Enter key to check answer
                inputEl.addEventListener("keypress", (event) => {
                    if (event.key === "Enter" && inputEl.value.trim().length > 0) {
                        checkCipherAnswer(inputEl.value.trim().toLowerCase());
                    }
                });
            }, true); // Skip enter
        }, true);
    }, true);
}
// **Check the answer**
function checkCipherAnswer(input) {
    if (input == "terminus") {
        playMusic("solved");
        continueScene();
    } else {
        displayText("No, that cannot be it.", decipherNamePuzzle);
    }
}

// **Hint functionality**
function giveHint() {
    displayText("E -> A     X -> T");
}

function continueScene() {

    clearGameText();
    clearOptions();

    displayText("You: Terminus...", () => {
        displayText("Manji: Terminus? Are you sure?", () => {
            displayText("You: Dead sure.", () => {
                displayText("Manji: No way, that explains everything.", () => {
                    displayText("You: What do you mean?", () => {
                        displayText("Manji: My sister was doing research on Terminus, the brother of Emperor Pyrethorn.", () => {
                            displayText("Manji: She never told me anything, saying it was too dangerous. I never understood why, but now it makes sense.", () => {
                                displayText("Manji: The Goat Riders... they are still animals, but they kill for a reason.", () => {
                                    displayText("Manji: Everyone who gets too close to the identity of their lord gets killed by them...", () => {
                                        displayText("You: No way! But wait, then that means...", () => {
                                            displayText("Manji: Yep, they are coming after me as well.", () => {
                                                visionAndDeparture();
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

function visionAndDeparture() {

    changeSceneMusic("anotherVision");

    displayText("All of a sudden, your head starts to hurt really bad. You fall to the ground.", () => {
        displayText("Manji: KID! You alright?", () => {
            displayText("Your head starts to hurt more and more until you suddenly hear the voice of that woman from your dreams.", () => {
                displayText("???: You figured it out, good. You are ready to find me, you know where to go. Hurry, you are my only hope.", () => {
                    displayText("Suddenly the pain starts to fade, but something remains you know where you need to go.", () => {
                        displayText("You: I know where I need to go. I’m sorry Manji, but I have to leave.", () => {
                            displayText("Manji: Don’t be foolish, kid. I’m coming with you.", () => {
                                displayText("You: Manji, no! I can’t bring you into any more danger.", () => {
                                    displayText("Manji: I am already in danger, remember? The moment you uncovered that name, we both became bound to this fate.", () => {
                                        displayText("Manji: Now shut up and go grab your things.", () => {
                                            displayText("You: Okay...", () => {
                                                addItemToInventory(allItems.cleanBandage);
                                                addItemToInventory(allItems.herbalBandage);
                                                addItemToInventory(allItems.bigHealingPotion);
                                                addItemToInventory(allItems.elixir);
                                                displayText("You grab all your belongings. When you finish packing, Manji is already waiting for you.", () => {
                                                    displayText("Manji: Took you long enough. Let’s move out. Lead the way.", () => {
                                                        displayText("You and Manji leave, with you leading the way. You don’t know how, but you just know where you need to go.", () => {
                                                            startChapter6();
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