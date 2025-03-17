function startChapter4() {
    saveGame();
    console.log("🎬 Running Chapter 4: The Mentor");

    changeSceneMusic("innMusic2");
    clearGameText();

    displayText("Chapter 4: A Mentor", () => {
        displayText("When you wake up, you feel well rested and energized for the day. Though, you are hungry since you didn’t have any dinner last night.", () => {
            displayText("You head downstairs. The Inn, which was lively yesterday, is now very quiet, with only a few people awake.", () => {
                displayText("Man: Hey kid!", () => {
                    displayText("You walk to the counter where the man is standing.", () => {
                        displayText("Man: I got you a little breakfast, it’s on the house.", () => {
                            showOptions([
                                { text: "What’s the catch?", action: breakfastCatch },
                                { text: "Thank you so much.", action: breakfastThanks }
                            ]);
                        });
                    });
                });
            });
        });
    });
}

function breakfastCatch() {
    displayText("Man: No catch today, kid. Since it's your first time in the village and you are clearly not from around here, I wanted to make your first day worthwhile. Now dig in.", eatBreakfast);
}

function breakfastThanks() {
    displayText("Man: Dig in, kid.", eatBreakfast);
}

function eatBreakfast() {
    displayText("You start eating your breakfast. Some bread and water. It is simple but free, so not much to complain about.", () => {
        displayText("Man: So what are you gonna do today, kid?", () => {
            displayText("You: I am going to look for a teacher, someone who can teach me how to fight.", () => {
                displayText("Man: A teacher?", () => {
                    displayText("You: Yeah, a swordsman who is willing to train me.", () => {
                        displayText("Man: Hate to break it to you, kid, but the only way to be trained is to join the Imperial Academy. And they only accept locals.", () => {
                            displayText("You: There must be another way, right?", () => {
                                displayText("Man: Well...", () => {
                                    displayText("Man: There is one, I think... but I wouldn’t recommend it.", () => {
                                        displayText("You: Please tell me.", () => {
                                            displayText("Man: Well, there is a man living in a small wooden house just outside the village.", () => {
                                                displayText("Man: His name is Manji Suzuki. He is said to be a very skilled swordsman.", () => {
                                                    displayText("Man: But he is also a loner, and there have been rumors that he has been abducting women and children to eat them when he can't catch animals for his meals.", () => {
                                                        displayText("You: That sounds awful.", () => {
                                                            displayText("Man: That’s why I don’t recommend it, kid. But hey, I’m just an innkeeper telling you what I heard.", () => {
                                                                displayText("You: I should get going now. Thank you for everything.", () => {
                                                                    displayText("Man: My pleasure, kid. Come again sometime.", chooseNextMove);
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
                        });
                    });
                });
            });
        });
    });
}

function chooseNextMove() {
    changeSceneMusic("townMusic");
    displayText("You exit the Inn and see different people walking around and talking to each other. There is also a market, though it doesn’t seem very helpful since you don’t have any Embermarks to buy things.", () => {
        showOptions([
            { text: "Go to Manji Suzuki", action: goToManji },
            { text: "Look around town and try to find someone else", action: lookAroundTown }
        ]);
    });
}

function goToManji() {
    displayText("You decide to ignore the warning from the Innkeeper and head off to find Manji. After all, they are just rumors, you can’t know for sure unless you meet the person.", arriveAtManji);
}

function lookAroundTown() {
    displayText("You decide not to take the risk. After all, if what the innkeeper said is true, you may very well be his next meal.", () => {
        displayText("This town is huge—there must be an alternative somewhere.", () => {
            displayText("3 hours later...", () => {
                displayText("You walked through the entire town multiple times and asked multiple people. They all told you the same thing: the godforsaken Imperial Academy is the only way, and they don’t accept outsiders.", () => {
                    displayText("With no better plan, you decide to try to find that Manji guy anyway. It’s better than going off with no plan because that will certainly get you killed.", arriveAtManji);
                });
            });
        });
    });
}

function arriveAtManji() {
    changeSceneMusic("meetingMaji");
    displayText("When you take a walk just outside the village walls you start searching, by nightfall you finally find something, a small wooden house made of sticks. Next to it is a man chopping wood.", () => {
        showOptions([
            { text: "Are you Manji?", action: askManji },
            { text: "Hello", action: greetManji }
        ]);
    });
}

function askManji() {
    displayText("The man turns around. You immediately notice two huge scars on the left side of his face. He is also missing his left eye.", () => {
        displayText("Man: Who’s asking?", requestManjiHelp);
    });
}

function greetManji() {
    displayText("The man turns around. You immediately notice two huge scars on the left side of his face. He is also missing his left eye.", () => {
        displayText("He doesn’t say anything he just looks at you.", requestManjiHelp);
    });
}

function requestManjiHelp() {
    displayText("You: Please, sir, I need your help.", () => {
        displayText("He invites you to sit at the campfire he made. You sit down and explain everything to him.", () => {
            displayText("Manji: So you left your comfortable forest just because of some dream? Stupid kid.", () => {
                displayText("You: It wasn’t just a dream. I know what I saw was real.", () => {
                    displayText("You: I heard from the innkeeper that you are a skilled swordsman.", () => {
                        displayText("Manji: That guy is just talking nonsense.", () => {
                            displayText("You: Please, you don’t need to pretend. I really need your help.", () => {
                                displayText("Manji: Shush it, kid. If I train you, I’ll get in trouble with the Imperials. Not gonna risk that because some kid had a bad dream.", () => {
                                    displayText("Manji: ...", () => {
                                        displayText("Manji: Well, it’s getting late. I’ll bring you back to the village. From there, you need to find your own way.", goatRiderAmbush);
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

function goatRiderAmbush() {
    changeSceneMusic("twoGoatRiders");
    displayText("As you near the village, two men jump out of the bushes. You immediately recognize the symbol on their uniform—they are Goat Riders.", () => {
        displayText("Goat Rider 1: So this is where the remaining one has been hiding.", () => {
            displayText("Goat Rider 2: You missed the fireworks at your home, fool. Now prepare to die!", () => {
                displayText("They charge at you with knives drawn. You freeze in fear, unable to move.", () => {
                    displayText("Just before they can touch you, Manji draws his sword. With one swift motion, both men fall to the ground—dead.", manjiAsks);
                });
            });
        });
    });
}

function manjiAsks() {
    displayText("Manji: These guys are after you?", () => {
        displayText("You: They took my family from me and left me alive to suffer only to finish me off later so it seems", () => {
            displayText("Manji: You knuckle head, the last thing you must do if two armed man run at you is stand frozen in fear.", () => {
                displayText("Manji: Even if those man took everything from you", () => {
                    displayText("You continue walking to the village, eventually you arrive.", manjiAcceptsTraining);
                });
            });
        });
    });
}

function manjiAcceptsTraining() {
    displayText("Manji: Come see me tomorrow just after sunrise, your training starts then.", () => {
        displayText("You: Really?", () => {
            displayText("Manji: Yeah really, does it looks like i’m kidding?", () => {
                displayText("Manji: If what you say is true than you have a long way to go, I don’t have anything to lose anyway so I don’t care if the Imperials come after me", () => {
                    displayText("You: I won’t disappoint you!", () => {
                        displayText("Manji: You better not", () => {
                            displayText("Manji walks away back to his house, he gave you some Embermarks for a room tonight.", trainingStarts);
                        });
                    });
                });
            });
        });
    });
}

function trainingStarts() {
    saveGame();

    changeSceneMusic("trainingStarts");
    clearGameText();

    displayText("The next morning, you arrive as early as you can at Manji’s house.", () => {
        displayText("Manji: You actually came. Good.", () => {
            displayText("Manji: By the way, you haven’t told me your name.", () => {
                displayText(`You: It's ${gameState.player.name}.`, () => {
                    displayText(`Manji: Alright, ${gameState.player.name}, your training starts now.`, () => {
                        startChapter5()
                    });
                });
            });
        });
    });
}
