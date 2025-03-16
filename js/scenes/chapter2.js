(() => {
    if (!window.sceneData) {
        window.sceneData = {};
    }

    const sceneID = "chapter2";

    sceneData[sceneID] = { id: sceneID };

    console.log(`✅ Scene "${sceneID}" registered with ID: ${sceneData[sceneID].id}`);

    window[sceneID] = startChapter2;
})();

function startChapter2() {
    gameState.currentScene = "chapter2";
    console.log("🎬 Running Chapter 2: A Mentor");

    changeSceneMusic("forestNight");
    clearGameText();

    displayText("Chapter 2: A Beginning", () => {
        displayText("As you walk through the forest, you realize how long it has been since you have seen its beauty.", () => {
            displayText("The green trees, the animals—it is all so peaceful.", () => {
                displayText("After hours of walking, you decide to set up camp and rest for the night.", () => {
                    displayText("You have some meat in your bag.", () => {
                        displayText("What’s for dinner?", () => {
                            showOptions([
                                { text: "Beef", action: () => chooseDinner("Beef") },
                                { text: "Pork", action: () => chooseDinner("Pork") }
                            ]);
                        }, true);
                    });
                });
            });
        });
    });
}

// ✅ Ensures items.js is loaded before using allItems
function chooseDinner(meatChoice) {
    if (!allItems || typeof allItems !== 'object') {
        console.error("❌ ERROR: allItems is not loaded or not an object! Ensure items.js is properly loaded.");
        return;
    }

    const selectedMeat = allItems[meatChoice.toLowerCase()];

    if (!selectedMeat) {
        console.error(`❌ ERROR: The item "${meatChoice}" does not exist in allItems.`);
        return;
    }

    gameState.inventory = gameState.inventory.filter(item => item.name !== selectedMeat.name);

    const dinnerItem = allItems["dinner"];
    if (dinnerItem) {
        addItemToInventory(dinnerItem);
    } else {
        console.error("❌ ERROR: Dinner item not found in allItems!");
    }

    saveGame();

    clearGameText();

    displayText(`You cooked the ${meatChoice} over the fire and start eating.`, () => {
        displayText("After a day of walking, a good dinner feels like a gift from those above.", () => {
            wolfEncounter();    
        });
    });
}

function wolfEncounter() {
    displayText("Suddenly, you hear footsteps. When you turn around, you see a starving wolf staring right at you.", () => {
        displayText("Drool drops from its teeth as it looks at your dinner. The wolf growls at you, ready to jump at you at any moment.", () => {
            showOptions([
                { text: "Draw your knife and fight it", action: fightWolf },
                { text: "Try to calm it by throwing a piece of your dinner to it", action: calmWolf }
            ]);
        });
    });
}

// Must be placed here because it then will continue here after a battle
function afterWolfFight() {

    changeSceneMusic("forestNight");
    clearGameText();

    displayText("After the wolf crumbles to the ground, you look at it.", () => {
        displayText("You realize if you are to survive the path ahead, you need to learn to fight.", () => {
            displayText("Maybe in the village ahead there is someone who would like to mentor you.", () => {
                displayText("For now, you have to choose what to do with the wolf.", () => {
                    showOptions([
                        { text: "Cut the wolf open and claim its fur and meat", action: cutWolfOpen },
                        { text: "Leave it alone", action: leaveWolfAlone }
                    ]);
                });
            });
        });
    });
}

// ✅ Case: Cut open the wolf and collect resources
function cutWolfOpen() {
    displayText("You cut the wolf open and take out its meat—might be useful later.", () => {
        displayText("You also take its fur. You can’t really do much with it, but maybe you can trade it with someone.", () => {
            // Add wolf meat and fur to inventory
            addItemToInventory(allItems.wolfMeat);
            addItemToInventory(allItems.wolfPelt);

            saveGame(); // Save updated inventory

            continueNightChoices();
        });
    });
}

// ✅ Case: Leave the wolf alone
function leaveWolfAlone() {
    displayText("You leave the wolf and sit back down at the campfire. Mother nature will do as she will with it anyway.", () => {
        continueNightChoices();
    });
}

// ✅ Continue the night choices (sleep or stay alert)
function continueNightChoices() {
    displayText("Your eyes are starting to become heavy, and you know you will need rest for the journey ahead.", () => {
        displayText("But what if more wolves roam this forest? Can you safely sleep here?", () => {
            displayText("You take a walk around the camp, and the coast seems clear—no wolves, no bandits, only mother nature.", () => {
                showOptions([
                    { text: "Take some much needed sleep", action: sleepAndRecover },
                    { text: "Stay awake and alert all night", action: stayAlert }
                ]);
            });
        });
    });
}

// ✅ Case: Sleep and recover HP
function sleepAndRecover() {
    displayText("You awaken feeling refreshed and well rested.", () => {
        displayText("You quickly take a good look at your belongings, and to your surprise, they are all still there.", () => {
            gameState.player.hp = gameState.player.maxHp; // Fully restore HP
            if (typeof updatePlayerHP === "function") {
                updatePlayerHP(gameState.player.hp);
            }
            if (typeof updateHUD === "function") {
                updateHUD(); // ✅ Ensure HUD reflects the new health
            } else {
                console.warn("⚠️ updateHUD function is missing!");
            }
            saveGame(); // Save state after sleep
            proceedToNextDay();
        });
    });
}

// ✅ Case: Stay awake and lose HP
function stayAlert() {
    displayText("When daylight finally comes through, you feel like a tree has fallen on you.", () => {
        displayText("You stayed up all night to make sure nothing would get neither you nor your belongings.", () => {
             gameState.player.hp = gameState.player.hp - gameState.player.hp + 14; 
            if (typeof updatePlayerHP === "function") {
                updatePlayerHP(gameState.player.hp);
            }
            if (typeof updateHUD === "function") {
                updateHUD(); // ✅ Ensure HUD reflects the new health
            } else {
                console.warn("⚠️ updateHUD function is missing!");
            }
                saveGame();
            saveGame(); // Save updated HP
            proceedToNextDay();
        });
    });
}

// ✅ Proceed to next day (continue story)
function proceedToNextDay() {
    displayText("The sun rises, and it's time to continue your journey towards the village.", () => {
        startChapter3() 
    });
}

// ✅ Starving Wolf Data (NO external file needed)
const starving_wolf = {
    name: "Starving Wolf",
    hp: 20,
    attackOptions: [
        { name: "Bite", damage: 5, accuracy: 50 }
    ],
    music: "combatMusic",
    afterDefeat: afterWolfFight 
};

// ✅ Case: Player chooses to fight
function fightWolf() {
    displayText("You lay down your dinner on a piece of dry leaves, making sure it does not get dirty.", () => {
        displayText("Then, you draw your knife and jump at the wolf before it can leap at you!", () => {
            startCombat(starving_wolf); // Directly pass enemy data
        });
    });
}

// ✅ Case: Player chooses to calm the wolf
function calmWolf() {
    console.log("🐺 Trying to calm the starving wolf...");

    // Remove dinner from inventory safely
    if (gameState.inventory.some(item => item.name === "Dinner")) {
        removeItemFromInventory("Dinner");
    } else {
        console.warn("⚠️ No Dinner found in inventory!");
    }

    displayText("You throw it a piece of your dinner, and it starts tearing it apart and swallowing it.", () => {
        displayText("After it swallows the meat, the wolf looks right back at you. It doesn't seem satisfied.", () => {
            displayText("Before you can react, the wolf lunges and sinks its teeth into your arm!", () => {

            gameState.player.hp = gameState.player.hp - gameState.player.hp + 13; 
            if (typeof updatePlayerHP === "function") {
                updatePlayerHP(gameState.player.hp);
            }
            if (typeof updateHUD === "function") {
                updateHUD(); // ✅ Ensure HUD reflects the new health
            } else {
                console.warn("⚠️ updateHUD function is missing!");
            }
                saveGame();

                displayText("Your dinner drops into the dirt. The wolf finally lets go, and you quickly draw your knife.", () => {
                    startCombat(starving_wolf); // Start combat after being attacked
                });
            });
        });
    });
}