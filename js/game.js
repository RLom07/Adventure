function askPlayerName() {
    const outputEl = document.getElementById("output");
    outputEl.innerHTML = "";
    print("Before your journey begins, tell us your name...\n", () => {
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

        const buttonEl = document.createElement("button");
        buttonEl.textContent = "Confirm";
        buttonEl.style.background = "#000";
        buttonEl.style.color = "#33ff33";
        buttonEl.style.border = "1px solid #33ff33";
        buttonEl.style.fontFamily = "Consolas, monospace";
        buttonEl.style.fontSize = "x-large";
        buttonEl.style.cursor = "pointer";

        buttonEl.onclick = () => {
            const name = inputEl.value.trim();
            if (name.length > 0) {
                gameState.player.name = name;
                outputEl.innerHTML = ""; 
                startIntroduction();
            } else {
                print("Please enter a valid name.", () => {});
            }
        };

        outputEl.appendChild(inputEl);
        outputEl.appendChild(buttonEl);

        inputEl.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                buttonEl.click();
            }
        });
    });
}

let gameState = {
    player: { name: "", hp: 30, maxHp: 30, attack: 5 },
    inventory: [],
    location: null,
    questGiven: false,
    questCompleted: false,
    inCombat: false,
    currentEnemy: null,
    nextLocation: null
};

function saveGame() {
    localStorage.setItem("adventureGameSave", JSON.stringify(gameState));
}

function loadGame() {
    const savedData = localStorage.getItem("adventureGameSave");

    if (savedData) {
        gameState = JSON.parse(savedData);
        print("Game loaded successfully!", () => {
            enterLocation(gameState.location); 
        });
    } else {
        print("No saved game found.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("adventureGameSave")) {
        print("A previous save was found. Loading your adventure...", () => {
            loadGame();
        });
    } else {
        askPlayerName();
    }
});

function enterLocation(name) {
    gameState.location = name;
    saveGame(); // Auto-save
    print(`You have arrived at ${name}.`, () => {
        if (name === "town") visitTown();
        else if (name === "forest") exploreForest();
    });
}

function addItemToInventory(item) {
    gameState.inventory.push(item);
    saveGame(); 
    print(`You have obtained: ${item.name}`);
}

function updatePlayerHP(amount) {
    gameState.player.hp = Math.max(0, Math.min(gameState.player.maxHp, gameState.player.hp + amount));
    saveGame(); 
    print(`Your health is now ${gameState.player.hp}/${gameState.player.maxHp}.`);
}

function completeQuest() {
    gameState.questCompleted = true;
    saveGame(); 
    print("Congratulations! You have completed the quest.");
}

function startCombat(enemy) {
    gameState.inCombat = true;
    gameState.currentEnemy = enemy;
    saveGame(); 
    print(`A wild ${enemy.name} appears!`);
}

function defeatEnemy() {
    if (gameState.currentEnemy.drop) {
        addItemToInventory(gameState.currentEnemy.drop);
    }
    gameState.inCombat = false;
    gameState.currentEnemy = null;
    saveGame(); 
    print("You have defeated the enemy!");
}


function startIntroduction() {
    const introText = `
Welcome, ${gameState.player.name}.

You have entered the world of Adventure, a place where your choices shape your journey.

The path before you is yours to decide. Will you seek glory in battle? Explore the unknown? Forge your own legend?

Every decision matters. Every step tells a story.

What will you do?
    `;

    typeWriterEffect("output", introText, 30, () => {
        startGame();
    });
}

function typeWriterEffect(elementId, text, speed = 30, callback) {
    const element = document.getElementById(elementId);
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

function print(text, callback) {
    const outputEl = document.getElementById("output");
    const lineEl = document.createElement("div");
    outputEl.appendChild(lineEl);
    let i = 0;
    const speed = 30;
    const timer = setInterval(() => {
        lineEl.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

function startGame() {
    print(`Your journey begins, ${gameState.player.name}...\n`, () => {
        print("Choose your path:", () => {
            showOptions([
                { text: "Explore the Forest", action: () => travel("forest") },
                { text: "Visit the Town", action: () => travel("town") }
            ]);
        });
    });
}

function showOptions(options) {
    const outputEl = document.getElementById("output");
    const choicesEl = document.createElement("div");
    choicesEl.id = "choices";
    
    options.forEach((opt, index) => {
        const choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        const letter = String.fromCharCode(65 + index); 
        choiceEl.textContent = `${letter}: ${opt.text}`;
        choiceEl.onclick = () => {
            clearOptions();
            opt.action();
        };
        choicesEl.appendChild(choiceEl);
    });

    outputEl.appendChild(choicesEl);
}

// Function to clear choices
function clearOptions() {
    const choicesEl = document.getElementById("choices");
    if (choicesEl) choicesEl.remove();
}

function chooseLocation(choice) {
    switch (choice) {
        case "forest":
            travel("forest");
            break;
        case "town":
            travel("town");
            break;
        default:
            print("Invalid choice. Please try again.", () => {
                startGame();
            });
    }
}

function travel(destination) {
    gameState.location = destination;
    switch (destination) {
        case "forest":
            exploreForest(); 
            break;
        case "town":
            visitTown(); 
            break;
        default:
            print("You can't travel there.", () => {
                startGame();
            });
    }
}

function clearGameText() {
    const outputEl = document.getElementById("output");
    outputEl.innerHTML = ""; 
}

// Shows choices and clears previous text ONLY when a choice is clicked
function showOptions(options) {
    const outputEl = document.getElementById("output");
    const choicesEl = document.createElement("div");
    choicesEl.id = "choices";

    options.forEach((opt, index) => {
        const choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        const letter = String.fromCharCode(65 + index); // A, B, C...
        choiceEl.textContent = `${letter}: ${opt.text}`;

        // When choice is clicked, clear previous text and execute action
        choiceEl.onclick = () => {
            clearGameText(); // Removes everything except the title
            clearOptions();
            opt.action();
        };

        choicesEl.appendChild(choiceEl);
    });

    outputEl.appendChild(choicesEl);
}

function clearOptions() {
    const choicesEl = document.getElementById("choices");
    if (choicesEl) choicesEl.remove();
}