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
    const healingItems = gameState.inventory.filter(item => item.type === "healing");

    // If no healing items are available
    if (healingItems.length === 0) {
        displayText("You have no healing items!", playerTurn);
        return;
    }

    // Create choices for each healing item
    const healingOptions = healingItems.map(item => ({
        text: item.name,
        action: () => {
            // Calculate healed amount
            let healedAmount = Math.min(item.healAmount, gameState.player.maxHp - gameState.player.hp);
            gameState.player.hp += healedAmount;

            if (gameState.player.hp > gameState.player.maxHp) {
                gameState.player.hp = gameState.player.maxHp; // Cap at max HP
            }

            // Remove item from inventory after use
            gameState.inventory = gameState.inventory.filter(i => i !== item);

            // ✅ Update the player's HP HUD
            if (typeof updatePlayerHP === "function") {
                updatePlayerHP(gameState.player.hp);
            }
            if (typeof updateHUD === "function") {
                updateHUD(); // ✅ Ensure HUD reflects the new health
            } else {
                console.warn("⚠️ updateHUD function is missing!");
            }

            // Notify the player and proceed to enemy's turn
            displayText(`You used ${item.name} and restored ${healedAmount} HP.`, enemyTurn);
        }
    }));

    // Show healing item choices
    showOptions(healingOptions);
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

// Ends the combat when enemy is defeated
function endCombat() {
    displayText(`You defeated ${combatState.enemy.name}!`, () => {
        if (combatState.enemy.drop) {
            addItemToInventory(combatState.enemy.drop);
        }
        gameState.inCombat = false;
        combatState.enemy = null;

        stopMusic();
        playMusic("scenes/chapter2.mp3");

        displayText("You take a deep breath, the battle is over.");
    });
}

// Check if player is dead
function checkCombatEnd() {
    if (gameState.player.hp <= 0) {
        displayText("You have been defeated...", () => {
            stopMusic();
            playMusic("death.mp3");
            setTimeout(() => {
                restartScene();
            }, 3000);
        });
        return;
    }

    if (combatState.enemyHP <= 0) {
        endCombat();
        return;
    }

    enemyTurn();
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