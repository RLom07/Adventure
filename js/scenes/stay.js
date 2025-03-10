(() => {
    if (!window.sceneData) {
        window.sceneData = {}; 
    }

    const sceneID = "stay"; 

    sceneData[sceneID] = { id: sceneID };

    console.log(`✅ Scene "${sceneID}" registered with ID: ${sceneData[sceneID].id}`);

    window[sceneID] = startStayScene;
})();

function startStayScene() {
    saveGame();
    console.log("🎬 Running Stay Scene (Game Over)");

    // Change music to Stay Scene's theme
    changeSceneMusic("stayMusic");

    displayText("You close the journal. Whatever this dream was, it’s none of your concern. You’ve lost too much already. Chasing ghosts won’t bring your family back.", () => {
        displayText("Days pass. Weeks.", () => {
            displayText("One night, the wind howls like a dying beast. Then, the distant sound of hooves. It’s them.", () => {
                displayText("You reach for your blade, knowing full well this time… there will be no escape.", () => {
                    displayText("GAME OVER", () => {
                        showOptions([
                            { text: "Restart", action: () => startScene("chapter1") }
                        ]);
                    });
                });
            });
        });
    });
}