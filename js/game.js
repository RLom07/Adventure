// Game State - Everything stored here is automatically saved
let gameState = {
    player: { name: "", hp: 30, maxHp: 30, attack: 5 },
    inventory: [],
    location: "town",
    questGiven: false,
    questCompleted: false,
    inCombat: false,
    currentEnemy: null,
    nextLocation: null
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
        enterLocation(gameState.location); // Start from last saved location
    } else {
        displayText("No saved game found.");
    }
}

// Travel between locations
function travel(destination) {
    gameState.location = destination;
    saveGame(); // Auto-save on travel

    switch (destination) {
        case "forest":
            exploreForest(); // From forest.js
            break;
        case "town":
            visitTown(); // From town.js
            break;
        default:
            displayText("You can't travel there.");
    }
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

