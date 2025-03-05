let waitingForEnter = false; // Prevents skipping dialogue when waiting for input

// Function to display text and optionally skip "Enter" requirement
function displayText(text, callback, skipEnter = false) {
    const outputEl = document.getElementById("output");
    const lineEl = document.createElement("div");
    outputEl.appendChild(lineEl);

    let i = 0;
    const speed = 30;

    waitingForEnter = true; // Prevents skipping ahead

    const timer = setInterval(() => {
        lineEl.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            if (skipEnter) {
                // If skipping Enter, go straight to the callback
                if (callback) callback();
            } else {
                waitForEnter(callback); // Otherwise, require Enter
            }
        }
    }, speed);
}

// Function to wait for "Enter" key before continuing (for dialogue)
function waitForEnter(callback) {
    function enterHandler(event) {
        if (event.key === "Enter") {
            document.removeEventListener("keydown", enterHandler);
            waitingForEnter = false; // Allow next dialogue
            if (callback) callback();
        }
    }

    document.addEventListener("keydown", enterHandler);
}

// Function to show choices without requiring Enter key
function showOptions(options) {
    console.log("Displaying options:", options); // Debugging log

    const outputEl = document.getElementById("output");
    clearOptions(); // Ensure previous choices are removed

    const choicesEl = document.createElement("div");
    choicesEl.id = "choices";

    options.forEach((opt, index) => {
        const choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        const letter = String.fromCharCode(65 + index); // A, B, C...
        choiceEl.textContent = `${letter}: ${opt.text}`;

        choiceEl.onclick = () => {
            console.log(`Clicked: ${opt.text}`); // Debugging log
            clearGameText(); // Clear previous text but keep the title
            clearOptions();  // Clear choices
            opt.action();    // Execute the choice action immediately
        };

        choicesEl.appendChild(choiceEl);
    });

    outputEl.appendChild(choicesEl);
}

function startIntroduction() {
    displayText(`Welcome, ${gameState.player.name}.`, () => {
        displayText(`You have entered the world of Adventure, a place where your choices shape your journey.`, () => {
            displayText(`The path before you is yours to decide. Will you seek glory in battle? Explore the unknown? Forge your own legend?`, () => {
                displayText(`Every decision matters. Every step tells a story.`, () => {
                    updateHUD(); // Show inventory and player name
                    startGame(); // Move to first decision
                });
            });
        });
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

// Opens the inventory selection menu (Only for Weapons)
function openInventoryMenu() {
    // If player is typing, do nothing
    if (document.activeElement.tagName === "INPUT") return;

    const weapons = gameState.inventory.filter(item => item.type === "weapon");

    if (weapons.length === 0) {
        displayText("You have no weapons in your inventory.");
        return;
    }

    displayText("Select a weapon:", () => {
        showOptions(weapons.map(weapon => ({
            text: weapon.name,
            action: () => equipWeapon(weapon)
        })));
    });
}

// Equips the selected weapon
function equipWeapon(weapon) {
    gameState.player.equippedWeapon = weapon;
    saveGame(); // Save the equipped weapon
    displayText(`${weapon.name} is now equipped.`);
}

// Listen for "I" key press to open inventory (only when not typing)
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "i") {
        openInventoryMenu();
    }
});
