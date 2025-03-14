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

    displayText("Chapter 2: A Mentor", () => {
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

// ✅ Starving Wolf Data (NO external file needed)
const starving_wolf = {
    name: "Starving Wolf",
    hp: 20,
    attackOptions: [
        { name: "Bite", damage: 5, accuracy: 50 }
    ],
    music: "combatMusic" 
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
                
                // ✅ Reduce player HP properly
                gameState.player.hp = Math.max(0, gameState.player.hp - 3);
                console.log(`💔 Player HP reduced by 3. Current HP: ${gameState.player.hp}`);

                // ✅ Ensure the UI updates immediately
                if (typeof updatePlayerHP === "function") {
                    updatePlayerHP();
                } else {
                    console.warn("⚠️ updatePlayerHP function is missing!");
                }

                // ✅ Save the game state after HP change
                saveGame();


                displayText("Your dinner drops into the dirt. The wolf finally lets go, and you quickly draw your knife.", () => {
                    startCombat(starving_wolf); // Start combat after being attacked
                });
            });
        });
    });
}