document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("adventureGameSave")) {
        console.log("Showing New Game / Continue choices"); // Debugging
        displayText("A previous save was found. What would you like to do?", () => {
            showOptions([
                { text: "Continue", action: loadGame },
                { text: "New Game", action: resetGame }
            ]);
        }, true);
    } else {
        console.log("No save found. Asking for name..."); // Debugging
        askPlayerName();
    }
});

// Handles asking for the player's name
function askPlayerName() {
    const outputEl = document.getElementById("output");
    outputEl.innerHTML = "";

    displayText("Before your journey begins, tell us your name...\n", () => {
        console.log("Displaying name input field..."); // Debugging

        const inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.id = "playerNameInput";
        inputEl.placeholder = "Enter your name...";
        inputEl.style.background = "#000";
        inputEl.style.color = "#33ff33";
        inputEl.style.border = "1px solid #33ff33";
        inputEl.style.fontFamily = "Consolas, monospace";
        inputEl.style.fontSize = "x-large";
        inputEl.autofocus = true;

        outputEl.appendChild(inputEl);

        // Detect when a valid name is typed and auto-confirm
        inputEl.addEventListener("input", () => {
            const name = inputEl.value.trim();
            if (name.length > 0) {
                setTimeout(() => {
                    if (inputEl.value.trim() === name) { // Check if they stopped typing
                        confirmName(name);
                    }
                }, 10000); 
            }
        });
    });
}

// Confirms and saves the name automatically
function confirmName(name) {
    console.log(`Name confirmed: ${name}`); // Debugging
    gameState.player.name = name; // Save to game.js
    saveGame(); // Auto-save in game.js
    document.getElementById("output").innerHTML = ""; // Clear screen
    startIntroduction(); // Start game intro
}


function resetGame() {
    console.log("Resetting game..."); // Debugging

    // Clear saved data
    localStorage.removeItem("adventureGameSave"); 

    // Reset game state
    gameState = {
        player: { name: "", hp: 30, maxHp: 30, attack: 5 },
        inventory: [],
        location: null,
        questGiven: false,
        questCompleted: false,
        inCombat: false,
        currentEnemy: null,
        nextLocation: null
    };

    saveGame(); // Save reset state

    displayText("Starting a new adventure...", () => {
        console.log("Restarting name entry..."); // Debugging
        askPlayerName(); // Restart the name entry
    }, true);
}

