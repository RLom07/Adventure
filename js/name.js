/*
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
*/

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Starting new game by asking for player name...");
    askPlayerName(); // Start name entry immediately
});


// Handles asking for the player's name
function askPlayerName() {
    const outputEl = document.getElementById("output");
    outputEl.innerHTML = ""; // Clear previous content

    console.log("Displaying name input field immediately...");

    // Display text but SKIP the Enter requirement
    displayText("Before your journey begins, tell us your name...\n", () => {
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

        // Remove "Press Enter to continue" from name selection
        hideEnterMessage();

        // Listen for Enter key to confirm name
        inputEl.addEventListener("keypress", (event) => {
            if (event.key === "Enter" && inputEl.value.trim().length > 0) {
                confirmName(inputEl.value.trim());
            }
        });
    }, true); // `true` to SKIP Enter requirement
}

// Confirms and saves the name automatically
function confirmName(name) {
    gameState.player.name = name.trim();
    saveGame();
    updateHUD(); // Update HUD after name is confirmed
    document.getElementById("output").innerHTML = "";
    startChapter4();  
}