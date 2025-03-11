//Game.js is used to handle all game logic and interactions, the backend of the game.

// Game State - Everything stored here is automatically saved
let gameState = {
    player: { name: "Dev", hp: 30, maxHp: 30, attack: 5 }, // 👈 Hardcoded name for development
    inventory: [],
    scene: "" // Tracks the current story scene
};


// The commented out code was used to handle scene data, but it's now unused. It didnt work so i discontinued it.
/*
gameState.sceneData = gameState.sceneData || {}; // Ensure it's initialized
let sceneData = gameState.sceneData; // Use this globally
*/

// Auto-save function
 function saveGame() {
    const saveData = {
        player: gameState.player,
        inventory: gameState.inventory
    };

    localStorage.setItem("adventureGameSave", JSON.stringify(saveData));
    console.log("✅ Game saved:", saveData);
}

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
*/

function startScene(sceneName) {
    if (!window.sceneData || !sceneData[sceneName]) {
        console.warn(`❌ Scene "${sceneName}" not found.`);
        displayText(`Error: Scene "${sceneName}" does not exist.`);
        return;
    }

    console.log(`🎭 Running scene function for: ${sceneName}`);

    gameState.scene = sceneName; // Store the scene ID
    saveGame();
    updateHUD(); // ✅ Ensure HUD updates on scene change

    if (typeof window[sceneName] === "function") {
        clearGameText();
        window[sceneName]();
    } else {
        console.error(`❌ Error: Scene function "${sceneName}" is not defined.`);
        displayText(`Error: Scene "${sceneName}" is missing a function.`);
    }
}

/*
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

function showOptions(options) {
    skipEnter();
    console.log("Options received in showOptions():", options); // Debugging

    const outputEl = document.getElementById("output");
    clearOptions(); // Ensure previous choices are removed

    const choicesEl = document.createElement("div");
    choicesEl.id = "choices";

    options.forEach((opt, index) => {
        console.log("Choice being created:", opt); // Debugging each option
        const choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        const letter = String.fromCharCode(65 + index); // A, B, C...
        choiceEl.textContent = `${letter}: ${opt.text}`;

        choiceEl.onclick = () => {
            console.log(`Clicked: ${opt.text}`, opt); // Debugging

            if (typeof opt.action === "function") {
                clearGameText();
                clearOptions();
                opt.action(); // Execute the action when clicked
            } else {
                console.error(`❌ Error: Action for "${opt.text}" is not a function`, opt);
                displayText("Error: Invalid choice.");
            }
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
        event.preventDefault(); // Prevent accidental page navigation
        closeInventory();
    }
});

// Equips the selected weapon
function equipWeapon(weapon) {
    gameState.player.equippedWeapon = weapon;
    saveGame(); 
    displayText(`${weapon.name} is now equipped.`);
}

// This tool is used for developers to skip specific scenes during development, if you want to play the game like its suposed to i suggest you leave this function alone.
function devSkipScene() {
    if (!window.sceneData || Object.keys(sceneData).length === 0) {
        console.warn("❌ No scenes are registered yet.");
        displayText("Error: No scenes are available.");
        return;
    }

    console.log("🗺️ Available scenes:", Object.keys(sceneData));
  
    const sceneName = prompt("Enter scene ID to jump to:\n" + Object.keys(sceneData).join(", "));

    if (sceneName && sceneData[sceneName]) {
        console.log(`🔄 Jumping to scene: ${sceneName}`);
        
        // Instead of displaying text, directly run the scene's function
        if (typeof window[sceneName] === "function") {
            clearGameText();
            window[sceneName](); // Runs the scene's function
        } else {
            console.warn(`❌ No function found for scene "${sceneName}".`);
            displayText(`Error: Scene "${sceneName}" is missing a function.`);
        }
    } else {
        console.warn(`❌ Scene "${sceneName}" not found.`);
        displayText(`Error: Scene "${sceneName}" does not exist.`);
    }
}

// Bind `CTRL + S` to `devSkipScene()`
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault(); // Prevent browser save popup
        devSkipScene();
    }
});

function changeSceneMusic(newMusicId) {
    const currentMusic = document.querySelector("audio.playing");

    if (currentMusic) {
        fadeOutMusic(currentMusic, () => {
            currentMusic.classList.remove("playing");
            playNewMusic(newMusicId);
        });
    } else {
        playNewMusic(newMusicId);
    }
}

// Fade out current music
function fadeOutMusic(audioElement, callback) {
    let volume = audioElement.volume;
    const fadeInterval = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            audioElement.volume = volume;
        } else {
            clearInterval(fadeInterval);
            audioElement.pause();
            audioElement.volume = 1.0; // Reset for next use
            if (callback) callback();
        }
    }, 200);
}

// Play new music with fade-in effect
function playNewMusic(musicId) {
    const newMusic = document.getElementById(musicId);
    if (!newMusic) {
        console.warn(`⚠️ Music file "${musicId}" not found.`);
        return;
    }

    newMusic.classList.add("playing");
    newMusic.volume = 0;
    newMusic.play().catch(error => console.warn("🔇 Failed to play music automatically:", error));

    let volume = 0;
    const fadeInterval = setInterval(() => {
        if (volume < 0.5) {
            volume += 0.05;
            newMusic.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 200);
}