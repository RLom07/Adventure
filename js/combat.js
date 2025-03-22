// Combat State
let combatState = {
    playerTurn: true,
    enemy: null,
    enemyHP: 0,
    previousMusic: null
};

function stopAllMusic() {
    document.querySelectorAll("audio.playing").forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.classList.remove("playing");
    });
}

// Start Combat
function startCombat(enemyData) {
    stopAllMusic(); // Stop all other music

    if (!enemyData || typeof enemyData !== 'object') {
        console.error("❌ ERROR: Invalid enemy data received in startCombat.");
        return;
    }

    combatState.enemy = enemyData;
    combatState.enemyHP = enemyData.hp;

    playMusic(enemyData.music || "combatMusic"); // Uses the audio ID instead of file path
    displayText(`A ${enemyData.name} appears!`, () => {
        setTimeout(() => playerTurn(), 500); // Start player's turn
    });
}

function playerTurn() {
    if (!combatState.enemy) {
        console.error("❌ ERROR: No enemy found in combatState.");
        return;
    }

    showOptions([
        { text: "Attack", action: attackEnemy },
        { text: "Change Weapon", action: changeWeapon },
        { text: "Use Healing Item", action: useHealingItem }
    ]);
}

// Player attacks
function attackEnemy() {
    let hitChance = Math.random();
    let currentWeapon = gameState.player.equippedWeapon;

    if (!currentWeapon) {
        console.warn("⚠️ No weapon equipped! Defaulting to fists.");
        currentWeapon = { name: "Fists", damage: 1 };
    }

    if (hitChance <= 0.85) {
        combatState.enemyHP -= currentWeapon.damage;
        displayText(`You attack with ${currentWeapon.name} and deal ${currentWeapon.damage} damage.`, () => {
            if (combatState.enemyHP <= 0) {
                endCombat();
            } else {
                enemyTurn();
            }
        });
    } else {
        displayText("Your attack missed!", enemyTurn);
    }
}

function changeWeapon() {
    // Get all weapons from inventory
    const weaponChoices = gameState.inventory.filter(item => item.type === "weapon");

    // If no weapons are available
    if (weaponChoices.length === 0) {
        displayText("You have no other weapons to equip!", playerTurn);
        return;
    }

    // Create choices for each weapon
    const weaponOptions = weaponChoices.map(weapon => ({
        text: weapon.name,
        action: () => {
            gameState.player.equippedWeapon = weapon;
            displayText(`You equipped the ${weapon.name}.`, enemyTurn);
        }
    }));

    // Show weapon choices
    showOptions(weaponOptions);
}

function useHealingItem() {
    // Get all healing items from inventory
    let healingItems = gameState.inventory.filter(item => item.type === "healing");

    if (healingItems.length === 0) {
        displayText("You have no healing items!", playerTurn);
        return;
    }

    // Show options for available healing items
    showOptions(healingItems.map(item => ({
        text: `${item.name} (${item.healAmount} HP)`,
        action: () => {
            let previousHP = gameState.player.hp;
            let healedAmount = item.healAmount;
            let newHP = Math.min(previousHP + healedAmount, gameState.player.maxHp);

            // Update player HP
            gameState.player.hp = newHP;

            // Remove the healing item from inventory
            gameState.inventory = gameState.inventory.filter(i => i !== item);

            // Update UI
            updateHUD();

            displayText(`You used ${item.name} and restored ${healedAmount} HP.`, () => {
                displayText(`Your health is now ${gameState.player.hp}/${gameState.player.maxHp}.`, enemyTurn);
            });
        }
    })));
}


// Enemy's turn
function enemyTurn() {
    let hitChance = Math.random();
    let enemyAttack = combatState.enemy.attackOptions[Math.floor(Math.random() * combatState.enemy.attackOptions.length)];

    if (hitChance <= 0.5) {
        gameState.player.hp -= enemyAttack.damage;
        updateHUD();
        displayText(`${combatState.enemy.name} attacks with ${enemyAttack.name}, dealing ${enemyAttack.damage} damage.`, () => {
            if (gameState.player.hp <= 0) {
                handleGameOver();
            } else {
                playerTurn();
            }
        });
    } else {
        displayText(`${combatState.enemy.name} attacks but misses!`, playerTurn);
    }
}

// Check if player is dead
function checkCombatEnd() {

    if (combatState.enemyHP <= 0) {
        endCombat();
        return;
    }

    enemyTurn();
}

// Ends the combat when enemy is defeated
function endCombat() {
    displayText(`You defeated ${combatState.enemy.name}!`, () => {
        stopMusic();

        displayText("You take a deep breath, the battle is over.", () => {
            continueAfterBattle(); // Calls the correct post-battle function
        });
    });
}

// Dynamically calls the correct story function after battle
function continueAfterBattle() {
    if (combatState.enemy && combatState.enemy.afterDefeat) {
        combatState.enemy.afterDefeat(); // Call the function dynamically
    } else {
        console.warn("⚠️ No afterDefeat function assigned to enemy.");
        displayText("With your enemy vanquished, you take a moment to catch your breath.");
    }

    combatState.enemy = null; // Reset combat state
}

// Function to play death music (ensure this is in `audio.js` as well)
function playDeathMusic() {
    stopAllMusic();
    playMusic("death"); // Ensure an <audio> tag exists in index.html with id="death"
}

function handleGameOver() {
    displayText("You have been defeated...", () => {
        playDeathMusic(); // Play the death music
        setTimeout(() => {
            displayText("Your vision fades to black... The journey ends here.", () => {
                restartGame(); // Restart the game
            });
        }, 2000); // Delay for dramatic effect
    });
}

function restartGame() {
    gameState.player.hp = gameState.player.maxHp; // Reset player HP
    gameState.inventory = []; // Clear inventory (or modify if needed)
    location.reload(); // Reload the game
}