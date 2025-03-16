(() => {
    if (!window.sceneData) {
        window.sceneData = {};
    }

    const sceneID = "chapter3";
    sceneData[sceneID] = { id: sceneID };

    console.log(`✅ Scene "${sceneID}" registered with ID: ${sceneData[sceneID].id}`);

    window[sceneID] = startChapter3;
})();

function startChapter3() {
    saveGame();
    console.log("🎬 Running Chapter 3: A Way");

    changeSceneMusic("travel");
    clearGameText();

    displayText("Chapter 3: A Way", () => {
        displayText("You pack your belongings and head to the nearest town.", () => {
            displayText("When you leave the forest, you see an old man with a large bag. He must be a traveler.", () => {
                displayText("What will you do?", () => {
                    showOptions([
                        { text: "Ask the old man for direction", action: talkToTraveler },
                        { text: "Stay low and look for direction yourself", action: findPathAlone }
                    ]);
                });
            });
        });
    });
}

// ✅ Traveler Interaction
function talkToTraveler() {
    displayText("Traveler: Hello, is there something I can do for you?", () => {
        displayText("You: Do you know where the nearest town is?", () => {
            displayText("Traveler: Yes, I do.", () => {
                displayText("The old man points at a stone road to the right of you.", () => {
                    displayText("Traveler: That road leads to Ashen. It’s the nearest town and a great place to get yourself some weapons. I see you only have a knife. You’re not going to make it with that alone, kid.", () => {
                        displayText("Traveler: Trust me, I’ve seen young folks like you get themselves killed. By them, those monster!", () => {
                            showOptions([
                                { text: "Who is them?", action: askAboutGoatRiders },
                                { text: "Thank you, old man. Safe travels.", action: proceedToRoad }
                            ], true);
                        });
                    });
                });
            });
        });
    });
}

function askAboutGoatRiders() {
    displayText("Traveler: Don’t tell me you haven’t heard of them. The Goat Riders.", () => {
        displayText("Traveler: Terrible, horrific monsters who do nothing but plunder and destroy. Even the Jarl of Ashen is powerless against them.", () => {
            displayText("Traveler: I’m sorry, kid, but I need to get going now. I have to reach the next village before nightfall.", () => {
                displayText("Traveler: Safe travels.", () => {
                    displayText("You: Thank you, old man. Safe travels.", proceedToRoad);
                });
            });
        });
    });
}

function findPathAlone() {
    displayText("You decide to stay low and find the way yourself.", () => {
        displayText("Eventually, you find a stone road leading to a town ahead called Ashen.", proceedToRoad);
    });
}

function proceedToRoad() {
    displayText("The old man walks away. You take the stone road towards Ashen.", () => {
        displayText("On your way there, you see a woman with a child standing on the side of the road. She approaches you.", () => {
            displayText("Woman: Please, do you have any food?", () => {
                showOptions([
                    { text: "Give her the wolf meat (if available)", action: giveWolfMeat },
                    { text: "Give her remaining dinner (if available)", action: giveDinner },
                    { text: "I don’t have anything, sorry", action: refuseHelp },
                    { text: "Get lost!", action: beRude }
                ]);
            });
        });
    });
}


function giveWolfMeat() {
    if (gameState.inventory.some(item => item.name === "Wolf Meat")) {
    removeItemFromInventory("Wolf Meat");
    displayText("You hand her the wolf meat. She seems happy with it even though she can’t eat it right away.", () => {
        displayText("Woman: Thank you so much.", proceedToAshen);
    });
    } else {
        displayText("You check your bag, but you remember you didn't fill the wolf after you killed it. So you don't have anything.", () => {
            showOptions([{ text: "I don’t have anything, sorry", action: refuseHelp }]);
        });
    }
}

function giveDinner() {
    if (gameState.inventory.some(item => item.name === "Dinner")) {
        removeItemFromInventory("Dinner");
        displayText("You hand her the remaining dinner from last night. The woman jumps with happiness and then embraces you.", () => {
            displayText("Woman: Thank you, thank you, thank you! You are a lifesaver!", proceedToAshen);
        });
    } else {
        displayText("You check your bag, but you remember after the wolf bit you your dinner fell in the dirt. You don't have anything.", () => {
            showOptions([{ text: "I don’t have anything, sorry", action: refuseHelp }]);
        });
    }
}

function refuseHelp() {
    displayText("The woman looks down, very disappointed.", () => {
        displayText("Woman: Okay, thank you anyway...", proceedToAshen);
    });
}

function beRude() {
    displayText("The woman backs off in fear, then grabs her child and runs away.", proceedToAshen);
}

// ✅ Arrival at Ashen
function proceedToAshen() {
    displayText("You continue walking towards the village.", () => {
        displayText("When you finally arrive, it is already nighttime.", () => {
            displayText("You see a small cozy building called “Night Owl Inn”. You decide to go inside.", enterInn);
        });
    });
}

// ✅ Inside the Inn
function enterInn() {
    changeSceneMusic("innMusic1");

    displayText("Inside the inn, you see different sorts of people drinking, dancing, and talking.", () => {
        displayText("You walk up to the man standing behind the counter.", () => {
            displayText("Man: Good evening! Welcome to the Night Owl Inn. What can I do for you?", () => {
                showOptions([
                    { text: "Do you know where I can find a place to sleep?", action: askForRoom },
                    { text: "What is this place?", action: askAboutInn }
                ]);
            });
        });
    });
}

function askForRoom() {
    displayText("Man: Well... this is an inn, so you can have a place to sleep here.", offerRoom);
}

function askAboutInn() {
    displayText("Man: This is the Night Owl Inn. You can have a place to sleep, a drink, or some food if you like.", () => {
        displayText("Man: You can also ask the bard over there to play a song of your choice, but it will cost you.", offerRoom);
    });
}

function offerRoom() {
    displayText("Man: Though you don’t seem familiar to me, where are you from?", () => {
        showOptions([
            { text: "I lived in the forest my entire life.", action: livedInForest },
            { text: "...", action: sayNothing }
        ]);
    });
}

function sayNothing() {
    displayText("Man: It is okay if you don’t want to tell me. I really don’t care anyway.", offerInnServices);
}

function livedInForest() {
    displayText("Man: Is that so?", offerInnServices);
}

function offerInnServices() {
    displayText("Man: Well, would you like something?", () => {
        showOptions([
            { text: "I'd like a room to sleep.", action: getRoom },
            { text: "I'd like something to drink.", action: orderDrink },
            { text: "I'd like something to eat.", action: orderFood }
        ]);
    });
}

function getRoom() {
    displayText("Man: A room is 40 Embermarks.", askEmbermarks)
}

function orderDrink() {
    displayText("Man: What would you like?", () => {
        showOptions([
            { text: "I’d like a beer", action: orderBeer },
            { text: "I’d like a wine.", action: orderWine },
            { text: "I’d like some Redwater", action: orderRedwater }
        ]);
    });
}

function orderBeer() {
    displayText("Man: That will be 5 Embermarks", askEmbermarks);
}

function orderWine() {
    displayText("Man: That will be 4 Embermarks", askEmbermarks);
}

function orderRedwater() {
    displayText("Man: That will be 10 Embermarks", askEmbermarks);
}

function orderFood() {
    displayText("Man: What would you like?", () => {
        showOptions([
            { text: "I’d like some bread", action: orderBread },
            { text: "I’d like some beef", action: orderBeef },
            { text: "I’d like some pork", action: orderPork }
        ]);
    });
}

function orderBread() {
    displayText("Man: That will be 3 Embermarks", askEmbermarks);
}

function orderBeef() {
    displayText("Man: That will be 5 Embermarks", askEmbermarks);
}

function orderPork() {
    displayText("Man: That will be 5 Embermarks", askEmbermarks);
}

function askEmbermarks() {
    displayText("You: Ehhh... Embermarks?", () => {
        displayText("Man: Yeah, Embermarks. What’s the problem?", () => {
            displayText("You: What are Embermarks?", () => {
                displayText("Man: You don’t know?", () => {
                    displayText("Man: It’s our currency. The way we pay for things—food, drinks, a bed for the night.", () => {
                        displayText("You: You don’t trade with animals or materials?", () => {
                            displayText("Man: (chuckles) I don’t know what time you think we live in, but this is how it’s been since the Empire took over these lands almost a thousand years ago.", () => {
                                displayText("You: Empire?", () => {
                                    displayText("Man: Yeah. The Empire of Pyrethorn. He ruled these lands years ago, alongside his brother, Terminus. You really never heard of them?", () => {
                                        displayText("You: No...", () => {
                                            displayText("Man: (sighs) Well, kid, this is how things are. No Embermarks, no food, no drink, no place to stay.", tryToTrade);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function tryToTrade() {
    displayText("Man: Please, i really need a room for tonight. There must be something i can give you to trade.", () => {
        showOptions([
            { text: "[Offer your Dagger]", action: offerDagger },
            { text: "[Offer Wolf Pelt (if available)]", action: offerPelt },
        ]);
    });
}

function offerDagger() {
    removeItemFromInventory("Dagger");
    displayText("Man: Kid this doesn’t even cover half of what a room costs for a night", exceptionMade);
}

function offerPelt() {
    if (gameState.inventory.some(item => item.name === "Wolf Pelt")) {
    removeItemFromInventory("Wolf Pelt");
        displayText("Man: Kid this doesn’t even cover half of what a room costs for a night", exceptionMade);
    } else {
        displayText("You check your bag, but you remember you didn't fill the wolf after you killed it. So you don't have wolf pelt.", () => {
            showOptions([{ text: "[Offer your Dagger]", action: offerDagger }]);
        });
    }
}

function exceptionMade() {
     displayText("Man: Oh well since you’re new in town and you are clearly not from around here i’ll make a exception just for you only.", () => {
        displayText("You: Thank you so much", () => {
            displayText("Man: Room’s are upstairs, if you need anything i’ll be here for the rest of the night.", headUpstairs);
        });
    });
}

function headUpstairs() {
    displayText("You head upstairs to your room. When you finally get there you are exhausted from the long trip today. You lay down on the bed and fall in a deep sleep.", () => {
        startChapter4();
    });
}