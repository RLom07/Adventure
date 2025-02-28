document.addEventListener("DOMContentLoaded", () => {
    askPlayerName();
});

// Function to ask the player for their name
function askPlayerName() {
    const outputEl = document.getElementById("output");
    outputEl.innerHTML = ""; // Clear previous text
    print("Before your journey begins, tell us your name...\n", () => {
        // Create an input field for the player to enter their name
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

        // Create a submit button
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
                outputEl.innerHTML = ""; // Clear input UI
                startIntroduction();
            } else {
                print("Please enter a valid name.", () => {});
            }
        };

        outputEl.appendChild(inputEl);
        outputEl.appendChild(buttonEl);

        // Allow pressing "Enter" to submit name
        inputEl.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                buttonEl.click();
            }
        });
    });
}

// Game state with player's name
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

// Function to start the game introduction after getting the name
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

// Function to create typewriter effect for game text
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

// Function to print text dynamically with typewriter effect
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

// Function to start the game after the intro
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

// Function to show options dynamically
function showOptions(options) {
    const outputEl = document.getElementById("output");
    const choicesEl = document.createElement("div");
    choicesEl.id = "choices";
    
    options.forEach((opt, index) => {
        const choiceEl = document.createElement("div");
        choiceEl.className = "choice";
        const letter = String.fromCharCode(65 + index); // A, B, C...
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
