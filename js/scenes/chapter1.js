(() => {
    if (!window.sceneData) {
        window.sceneData = {}; 
    }

    const sceneID = "chapter1"; 

    sceneData[sceneID] = { id: sceneID };

    console.log(`✅ Scene "${sceneID}" registered with ID: ${sceneData[sceneID].id}`);

    window[sceneID] = startChapter1;
})();

function startChapter1() {
    saveGame();
    console.log("🎬 Running Chapter 1: The Awakening");

    // Change music to Chapter 1's theme
    changeSceneMusic("chapter1Music");

    displayText("Chapter 1: The Awakening", () => {
        displayText("You jolt upright, breathless, drenched in sweat. The faint glow of dawn seeps through the cracks in the wooden cabin’s walls. Your heart pounds against your ribs as the remnants of the dream linger in your mind, vivid and raw.", () => {
            displayText("This cabin—your home—once echoed with laughter. Now, it is a hollow shell, a graveyard of memories. Your family once lived here… before they were taken.", () => {
                displayText("The Goat Riders.", () => {
                    displayText("The mere thought of their name ignites a fire of rage and grief inside you. The most feared bandit horde to ever plague these lands—they came without warning, leaving only ruin in their wake. You were the only survivor. You never learned why.", () => {
                        displayText("For years, you’ve lived in hiding, avoiding the roads, watching the horizon for signs of their return. You have become a ghost of your former self. A prisoner in your own home.", () => {
                            displayText("Yet, tonight’s dream… it felt different. More than a dream. A calling.", () => {
                                displayText("You reach for your journal, hands shaking as you scrawl down the name burned into your memory:", () => {
                                    displayText("Xivqmryw", () => {
                                        displayText("It doesn’t look right. It feels incomplete, wrong. As if something… or someone… is hiding its true meaning from you.", () => {
                                            displayText("Your thoughts race. Who was that woman? Why did she plead for you to find her? And who—or what—was the presence that consumed her?", () => {
                                                displayText("A choice lingers in the back of your mind, one that will shape the course of your fate.", () => {
                                                    showOptions([
                                                        { text: "Leave everything behind. Begin the adventure.", action: () => startScene("leave") },
                                                        { text: "Stay in the safety of home.", action: () => startScene("stay") }
                                                    ]);
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