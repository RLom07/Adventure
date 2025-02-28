function exploreForest() {
    print(`You step into the dark forest, ${gameState.player.name}. The air is thick with mystery.`, () => {
        showOptions([
            { text: "Look for resources", action: () => findResources() },
            { text: "Search for enemies", action: () => startCombat(randomForestEnemy()) },
            { text: "Return to town", action: () => travel("town") }
        ]);
    });
}

function findResources() {
    print("You search the forest and find some useful herbs.", () => {
        gameState.inventory.push({ name: "Healing Herb", type: "heal", heal: 10 });
        exploreForest();
    });
}

function randomForestEnemy() {
    const enemies = [
        { name: "Goblin", maxHp: 20, attack: 5, drop: { name: "Health Potion", type: "heal", heal: 20 } },
        { name: "Wolf", maxHp: 15, attack: 4, drop: null }
    ];
    return { ...enemies[Math.floor(Math.random() * enemies.length)], hp: enemies[0].maxHp };
}
