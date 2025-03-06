
function startIntroduction() {
    displayText("Prologue I: The Dream", () => {
        displayText("You are floating in an endless void, weightless, drifting through an abyss untouched by time. There is no ground, no sky—only the vast nothingness stretching infinitely in every direction. You feel neither cold nor warmth, only the eerie sensation of being watched.", () => {
            displayText("Then, from the shadows, she appears.", () => {
                displayText("Her presence is familiar yet unrecognizable, a paradox wrapped in sorrow. Her form flickers like a candle in the wind, barely holding on to existence. Her eyes meet yours, filled with urgency and despair.", () => {
                    displayText(`???: “Greetings, ${gameState.player.name}… if you are seeing this, then I am already dead.”`, () => {
                        displayText("The void trembles. An unseen force distorts the space around you. Though there is nothing tangible, you sense a terrible presence drawing near. The air thickens, pressing down on you like an unseen weight.", () => {
                            displayText("???: “He’s here.”", () => {
                                displayText("She reaches out, fingers trembling, desperate. You instinctively try to grasp her hand, but reality itself bends. The shadows twist, churning into a monstrous storm of pure darkness. The presence grows stronger, suffocating, oppressive—an entity beyond comprehension.", () => {
                                    displayText("???: “There is not much time… please, find me! I beg you—find me!”", () => {
                                        displayText("The shadows consume her. You scream, yet no sound escapes your lips.", () => {
                                            displayText("For a fleeting moment, a name appears before your eyes, glowing in crimson letters across the void:", () => {
                                                displayText("Xivqmryw", () => {
                                                    displayText("The name feels wrong, unnatural, as if it has been twisted beyond recognition. You know it means something. You know you're missing a crucial piece of the puzzle.", () => {
                                                        displayText("Then, silence.", () => {
                                                            displayText("And just like that, you awaken.", () => {
                                                                startScene("chapter1"); // Move to next scene
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
