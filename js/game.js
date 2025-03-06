// Game State - Everything stored here is automatically saved
let gameState = {
    player: { name: "", hp: 30, maxHp: 30, attack: 5 },
    inventory: [],
    currentScene: "intro", // Tracks the current story scene
};

// Auto-save function
function saveGame() {
    localStorage.setItem("adventureGameSave", JSON.stringify(gameState));
}

// Load function - Retrieves saved data if available
function loadGame() {
    const savedData = localStorage.getItem("adventureGameSave");

    if (savedData) {
        gameState = JSON.parse(savedData);
        console.log("Game loaded:", gameState); // Debugging

        if (gameState.currentScene) {
            startScene(gameState.currentScene); // Resume the story at the last saved scene
        } else {
            displayText("No saved game found.");
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
        currentScene: "intro", // Reset story to the beginning
    };

    skipEnter();
    saveGame(); // Save reset state
    displayText("Starting a new adventure...", () => {
        askPlayerName(); // Restart the name entry
    });
}


// Handles item collection
function addItemToInventory(item) {
    gameState.inventory.push(item);
    saveGame();
    displayText(`You have obtained: ${item.name}`);
}

// Updates player health
function updatePlayerHP(amount) {
    gameState.player.hp = Math.max(0, Math.min(gameState.player.maxHp, gameState.player.hp + amount));
    saveGame();
    displayText(`Your health is now ${gameState.player.hp}/${gameState.player.maxHp}.`);
}

// Completes quests
function completeQuest() {
    gameState.questCompleted = true;
    saveGame();
    displayText("Congratulations! You have completed the quest.");
}

// Start combat
function startCombat(enemy) {
    gameState.inCombat = true;
    gameState.currentEnemy = enemy;
    saveGame();
    displayText(`A wild ${enemy.name} appears!`);
}

// Defeat an enemy
function defeatEnemy() {
    if (gameState.currentEnemy.drop) {
        addItemToInventory(gameState.currentEnemy.drop);
    }
    gameState.inCombat = false;
    gameState.currentEnemy = null;
    saveGame();
    displayText("You have defeated the enemy!");
}

let skipEnterMode = false; // Default: Enter is required

function displayText(text, callback) {
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

            if (skipEnterMode) {
                console.log("Skipping Enter for this message."); // Debugging
                skipEnterMode = false; // Reset for next message
                if (callback) callback();
            } else {
                showEnterMessage();
                waitForEnter(callback);
            }
        }
    }, speed);
}

// Function to skip Enter requirement for the next message only
function skipEnter() {
    console.log("Skipping Enter activated."); // Debugging
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
            waitingForEnter = false; // Allow next dialogue
            hideEnterMessage(); // Hide "Press Enter to continue"
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



function showOptions(options) {
    skipEnter();
    const outputEl = document.getElementById("output");
    clearOptions(); // Ensure previous choices are removed

    const choicesEl = document.createElement("div");
    choicesEl.id = "choices";

    console.log("Choices being created:", options); // Debugging: Check if choices exist

    options.forEach((opt, index) => {
        const choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        const letter = String.fromCharCode(65 + index); // A, B, C...
        choiceEl.textContent = `${letter}: ${opt.text}`;

        choiceEl.onclick = () => {
            console.log(`Clicked: ${opt.text}`); // Debugging: Check if click works
            clearGameText();
            clearOptions();
            opt.action(); // Execute the action when clicked
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
    const playerInfoEl = document.getElementById("player-info");
    const inventoryListEl = document.getElementById("inventory-list");

    // Update player name
    playerInfoEl.textContent = `Player: ${gameState.player.name}`;

    // Update inventory display (only weapons)
    inventoryListEl.innerHTML = "";
    gameState.inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        inventoryListEl.appendChild(li);
    });
}

let previousGameText = ""; // Stores the last game text
let inventoryOpen = false; // Tracks if inventory is open

function openInventoryMenu() {
    if (document.activeElement.tagName === "INPUT") return;
    if (inventoryOpen) return; // Prevent reopening if already open

    console.log("Inventory menu opened"); // Debugging
    inventoryOpen = true; // Mark inventory as open

    const weapons = gameState.inventory.filter(item => item.type === "weapon");

    // Save current game text before clearing it
    previousGameText = document.getElementById("output").innerHTML;

    // Clear screen and show inventory
    clearGameText();
    displayText("📜 Inventory", () => {
        displayText("Press Backspace to return", () => {
            if (weapons.length === 0) {
                displayText("You have no weapons in your inventory.");
            } else {
                showOptions(weapons.map(weapon => ({
                    text: weapon.name,
                    action: () => equipWeapon(weapon)
                })));
            }
        });
    });
}

// Function to close inventory and restore previous game text
function closeInventory() {
    if (!inventoryOpen) return; // Only run if inventory is open

    console.log("Closing inventory, restoring game text..."); // Debugging
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
        closeInventory();
    }
});


// Equips the selected weapon
function equipWeapon(weapon) {
    gameState.player.equippedWeapon = weapon;
    saveGame(); // Save the equipped weapon
    displayText(`${weapon.name} is now equipped.`);
}