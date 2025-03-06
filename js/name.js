document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("adventureGameSave")) {
        console.log("Showing New Game / Continue choices"); // Debugging
        skipEnter(); // Add this line to skip Enter immediately
        displayText("A previous save was found. What would you like to do?", () => {
            showOptions([
                { text: "Continue", action: loadGame },
                { text: "New Game", action: resetGame }
            ]);
        });
    } else {
        console.log("No save found. Asking for name..."); // Debugging
        askPlayerName();
    }
});

// Handles asking for the player's name
function askPlayerName() {
    const outputEl = document.getElementById("output");
    outputEl.innerHTML = "";

    skipEnter();

    displayText("Before your journey begins, tell us your name...\n", () => {
        console.log("Displaying name input field...");

        skipEnter(); // Skip Enter for next message
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
        skipEnter();

        outputEl.appendChild(inputEl);

        // Listen for Enter key to confirm name
        inputEl.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && inputEl.value.trim().length > 0) {
                skipEnter(); // Skip Enter for next message
                confirmName(inputEl.value.trim());
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

