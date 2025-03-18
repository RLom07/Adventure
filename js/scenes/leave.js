(() => {
    if (!window.sceneData) {
        window.sceneData = {}; 
    }

    const sceneID = "leave"; 

    sceneData[sceneID] = { id: sceneID };

    console.log(`✅ Scene "${sceneID}" registered with ID: ${sceneData[sceneID].id}`);

    window[sceneID] = startLeaveScene;
})();

function startLeaveScene() {
    saveGame();
    console.log("🎬 Running Leave Scene");

    // Change to the appropriate background music
    changeSceneMusic("adventureBegins");

    clearGameText();

    displayText("Something stirs deep inside you a feeling long buried beneath grief and fear.", () => {
        displayText("No more hiding. No more waiting for death to find you.", () => {
            displayText("You pack what little you have: a dagger, a waterskin, a single keepsake from your past and some food. Stepping outside, the morning sun greets you with its golden embrace.", () => {
                displayText("You take a deep breath.", () => {
                    displayText("The world awaits.", () => {
                        displayText("And with that, your Adventure begins.", () => {

                            // After all scene text is finished, THEN show inventory updates
                            setTimeout(() => {
                                obtainStartingItems();
                            }, 500); // Small delay for pacing
                        });
                    });
                });
            });
        });
    });
}

// Function to give player starting items after the scene text finishes
function obtainStartingItems() {
    if (typeof allItems === "undefined") {
        console.error("❌ Item database not found! Ensure items.js is loaded.");
        return;
    }

    addItemToInventory(allItems.dagger);
    addItemToInventory(allItems.waterskin);
    addItemToInventory(allItems.keepsake);
    addItemToInventory(allItems.pork);
    addItemToInventory(allItems.beef);

    if (!gameState.player.equippedWeapon) {
        equipWeapon(allItems.dagger);
    }

    // After displaying item messages, move to the next scene
    setTimeout(() => {
        startScene("chapter2");
    }, 2000); // Delay so the player sees obtained items
}