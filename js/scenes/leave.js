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

    displayText("Something stirs deep inside you—a feeling long buried beneath grief and fear.", () => {
        displayText("No more hiding. No more waiting for death to find you.", () => {
            displayText("You pack what little you have: a dagger, a waterskin, and a single keepsake from your past. Stepping outside, the morning sun greets you with its golden embrace.", () => {
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
    const dagger = { name: "Dagger", type: "weapon", damage: 5 };
    const waterskin = { name: "Waterskin", type: "utility" };
    const keepsake = { name: "Keepsake", type: "special" };

    addItemToInventory(dagger);
    addItemToInventory(waterskin);
    addItemToInventory(keepsake);

    if (!gameState.player.equippedWeapon) {
        equipWeapon(dagger);
    }

    // After displaying item messages, move to the next scene
    setTimeout(() => {
        startScene("chapter2");
    }, 2000); // Delay so the player sees obtained items
}
