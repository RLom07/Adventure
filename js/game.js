//Game.js is used to handle game logic and interactions, the backend of the game.

// Game State - Everything stored here is automatically saved
let gameState = {
    player: { name: "", hp: 30, maxHp: 30, attack: 5 },
    inventory: []
};

// The commented out code was used to handle scene data, but it's now unused. It didnt work so i discontinued it.
/*
gameState.sceneData = gameState.sceneData || {}; // Ensure it's initialized
let sceneData = gameState.sceneData; // Use this globally
*/

/*
function loadSceneFile(sceneName, callback) {
    const script = document.createElement("script");
    script.src = `js/scenes/${sceneName}.js`;
    script.defer = true;

    script.onload = () => {
        console.log(`✅ Scene "${sceneName}" loaded successfully.`);
        if (callback) callback();
    };

    script.onerror = () => {
        console.error(`❌ Failed to load scene "${sceneName}".`);
        displayText("Error: Scene file could not be loaded.");
    };

    document.head.appendChild(script);
}

// Load function - Retrieves saved data if available
function loadGame() {
    const savedData = localStorage.getItem("adventureGameSave");

    if (savedData) {
        const loadedGame = JSON.parse(savedData);
        console.log("🔄 Game loaded:", loadedGame);

        gameState.player = loadedGame.player;
        gameState.inventory = loadedGame.inventory;
        gameState.scene = loadedGame.scene;

        console.log(`🎭 Resuming scene: ${gameState.scene}`);

        if (!sceneData[gameState.scene]) {
            console.warn(`⚠️ Scene "${gameState.scene}" is missing. Reloading scene file...`);
            loadSceneFile(gameState.scene, () => {
                startScene(gameState.scene);
            });
        } else {
            startScene(gameState.scene);
        }
    } else {
        displayText("No saved game found.");
    }
}

function resetGame() {
    console.log("Resetting game...");

    // Clear saved data
    localStorage.removeItem("adventureGameSave"); 

    // Reset game state
    gameState = {
        player: { name: "", hp: 30, maxHp: 30, attack: 5 },
        inventory: [],
        scene: "intro"
    };

    skipEnter();
    saveGame(); 
    displayText("Starting a new adventure...", () => {
        askPlayerName(); 
    });
}
*/

// Handles item collection
function addItemToInventory(item) {
    gameState.inventory.push(item);
    displayText(`You have obtained: ${item.name}`);
}

// Removes an item from inventory
function removeItemFromInventory(itemName) {
    const itemIndex = gameState.inventory.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
        gameState.inventory.splice(itemIndex, 1); // Remove item from array
        console.log(`🗑️ Removed ${itemName} from inventory.`);
        updateHUD(); // Ensure HUD updates correctly
    } else {
        console.warn(`⚠️ Tried to remove "${itemName}" but it wasn't found in inventory.`);
    }
}

// Updates player health
function updatePlayerHP(amount) {
    gameState.player.hp = Math.max(0, Math.min(gameState.player.maxHp, gameState.player.hp + amount));
    displayText(`Your health is now ${gameState.player.hp}/${gameState.player.maxHp}.`);
}

// Start combat
function startCombat(enemy) {
    gameState.inCombat = true;
    gameState.currentEnemy = enemy;
    displayText(`A wild ${enemy.name} appears!`);
}

let skipEnterMode = false; 

function displayText(text, callback, skipEnter = false) {
    const outputEl = document.getElementById("output");
    const lineEl = document.createElement("div");
    outputEl.appendChild(lineEl);

    let i = 0;
    const speed = 30;
    waitingForEnter = true;

    const timer = setInterval(() => {
        lineEl.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);

            // Prevent "Press Enter to continue" if skipEnter is true
            if (!skipEnter && !inventoryOpen) {
                showEnterMessage();
                waitForEnter(callback);
            } else if (callback) {
                callback();
            }
        }
    }, speed);
}

// Function to skip Enter requirement for the next message only
function skipEnter() {
    skipEnterMode = true;
}

// Shows the "Press Enter to continue" message
function showEnterMessage() {
    let enterMessage = document.getElementById("enterMessage");
    if (!enterMessage) {
        enterMessage = document.createElement("div");
        enterMessage.id = "enterMessage";
        enterMessage.style.color = "#33ff33";
        enterMessage.style.fontFamily = "Consolas, monospace";
        enterMessage.style.marginTop = "10px";
        document.getElementById("output").appendChild(enterMessage);
    }
    enterMessage.textContent = "Press Enter to continue";
}

// Waits for "Enter" key before continuing
function waitForEnter(callback) {
    function enterHandler(event) {
        if (event.key === "Enter") {
            document.removeEventListener("keydown", enterHandler);
            waitingForEnter = false;
            hideEnterMessage(); 
            if (callback) callback();
        }
    }

    document.addEventListener("keydown", enterHandler);
}

// Hides the "Press Enter to continue" message
function hideEnterMessage() {
    const enterMessage = document.getElementById("enterMessage");
    if (enterMessage) enterMessage.remove();
}

// Show options without requiring Enter
function showOptions(options) {
    clearOptions();
    let outputEl = document.getElementById("output");
    let choicesEl = document.createElement("div");
    choicesEl.id = "choices";

    options.forEach((opt, index) => {
        let choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        choiceEl.textContent = `${String.fromCharCode(65 + index)}: ${opt.text}`;
        choiceEl.onclick = () => {
            clearOptions();
            opt.action(); // Execute instantly
        };
        choicesEl.appendChild(choiceEl);
    });

    outputEl.appendChild(choicesEl);
}

// Function to clear choices when selected
function clearOptions() {
    const choicesEl = document.getElementById("choices");
    if (choicesEl) choicesEl.remove();
}


// Clears all game text except the title
function clearGameText() {
    const outputEl = document.getElementById("output");
    
    // Remove all text but keep the choices visible
    [...outputEl.children].forEach(child => {
        if (child.id !== "choices") child.remove();
    });
}

// Updates the Heads-Up Display (HUD)
function updateHUD() {
    const hudEl = document.getElementById("hud");
    if (!hudEl) return; // Prevent errors if HUD isn't found

    const playerName = gameState.player.name || "Player";

    hudEl.innerHTML = `
        <div id="inventory-indicator">[I] Inventory</div>
        <div id="player-info">🔹 ${playerName} | ❤️ HP: ${gameState.player.hp}/${gameState.player.maxHp}</div>
    `;
}

let previousGameText = ""; 
let inventoryOpen = false; 

function openInventoryMenu() {
    if (document.activeElement.tagName === "INPUT") return;
    if (inventoryOpen) return; // Prevent reopening if already open

    inventoryOpen = true; // Mark inventory as open

    const weapons = gameState.inventory.filter(item => item.type === "weapon");

    // Save current game text before clearing it
    previousGameText = document.getElementById("output").innerHTML;

    // Clear screen and show inventory
    clearGameText();
    
    displayText("📜 Inventory", () => {
        displayText("🔻 Mysterious Name: Xivqmryw", () => { 
            displayText("Press Backspace to return", () => {
                if (gameState.inventory.length === 0) {
                    displayText("Your inventory is empty.");
                } else {
                    // Display all items, not just weapons
                    displayText("🔹 Items:", () => {
                        gameState.inventory.forEach(item => {
                            displayText(`- ${item.name}`);
                        });

                        // Show weapon selection options
                        if (weapons.length > 0) {
                            displayText("🗡️ Select a weapon:", () => {
                                showOptions(weapons.map(weapon => ({
                                    text: weapon.name,
                                    action: () => equipWeapon(weapon)
                                })));
                            });
                        }
                    });
                }
            });
        });
    });
}
    
// Function to close inventory and restore previous game text
function closeInventory() {
    if (!inventoryOpen) return; // Only run if inventory is open
    
    inventoryOpen = false; // Mark inventory as closed
    document.getElementById("output").innerHTML = previousGameText; // Restore previous text
}

// Listen for "I" key to open inventory
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "i") {
        openInventoryMenu();
    }
});

// Listen for "Backspace" key **only when inventory is open**
document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && inventoryOpen) {
        event.preventDefault(); // Prevent accidental page navigation
        closeInventory();
    }
});

// Equips the selected weapon
function equipWeapon(weapon) {
    gameState.player.equippedWeapon = weapon;
    displayText(`${weapon.name} is now equipped.`);
}

// This tool is used for developers to add specific items during development, if you want to play the game like its suposed to i suggest you leave this function alone.


// Developer Tool: Add any item to inventory with CTRL + D
function devAddItem() {
    if (typeof allItems === "undefined") {
        console.warn("❌ Item database not found! Ensure items.js is loaded.");
        return;
    }

    console.log("🛠️ Available items:", Object.keys(allItems));

    const itemName = prompt("Enter the item name to add:\n" + Object.keys(allItems).join(", "));

    if (itemName && allItems[itemName]) {
        addItemToInventory(allItems[itemName]);
        console.log(`✅ Added "${itemName}" to inventory.`);
    } else {
        console.warn(`❌ Item "${itemName}" not found.`);
    }
}

// Bind `CTRL + D` to `devAddItem()`
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "d") {
        event.preventDefault(); // Prevent browser shortcut conflicts
        devAddItem();
    }
});