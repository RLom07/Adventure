function visitTown() {
    print(`You arrive in the bustling town, ${gameState.player.name}.`, () => {
        showOptions([
            { text: "Visit the Old Man", action: () => oldManDialogue() },
            { text: "Check your inventory", action: () => openInventory() },
            { text: "Travel to the forest", action: () => travel("forest") }
        ]);
    });
}

function oldManDialogue() {
    print("Old Man: Greetings, traveler. How can I help you?", () => {
        showOptions([
            { text: "Ask about a quest", action: () => {
                    clearOptions();
                    if (!gameState.questGiven && !gameState.questCompleted) {
                        gameState.questGiven = true;
                        print("Old Man: A fearsome dragon dwells in the cave. Slay it to save our town!", () => visitTown());
                    } else if (!gameState.questCompleted) {
                        print("Old Man: You must defeat the dragon!", () => visitTown());
                    } else {
                        print("Old Man: Thank you for slaying the dragon!", () => visitTown());
                    }
                }
            },
            { text: "Ask for a potion", action: () => {
                    gameState.inventory.push({ name: "Health Potion", type: "heal", heal: 20 });
                    print("Old Man: Here, take this potion.", () => visitTown());
                }
            },
            { text: "Leave", action: () => visitTown() }
        ]);
    });
}
