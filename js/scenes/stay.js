function startStayScene() {

    changeSceneMusic("badEndingMusic");

    clearGameText();

    // Use displayTextQueue to auto-play all lines
    const lines = [
        "You close the journal. Whatever this dream was, it’s none of your concern. You’ve lost too much already. Chasing ghosts won’t bring your family back.",
        "Days pass. Weeks.",
        "One night, the wind howls like a dying beast. Then, the distant sound of hooves. It’s them.",
        "You reach for your blade, knowing full well this time… there will be no escape."
    ];

    displayTextQueue(lines, () => {
        // Wait 10 seconds before showing "GAME OVER"
        setTimeout(() => {
            skipEnter(); // Prevent Enter key press before fade
            displayText("GAME OVER", () => {
                startFadeOutEffect(); // Start the fade-out effect
            }, true); // Skip Enter for "GAME OVER"
        }, 5500); 
    });
}


function displayTextQueue(lines, callback) {
    let index = 0;

    function nextLine() {
        if (index < lines.length) {
            displayText(lines[index], () => {
                setTimeout(() => { // Auto-advance after each line
                    index++;
                    nextLine();
                }, 500); // 0.5-second delay before the next line starts
            }, true); // Skip Enter
        } else if (callback) {
            callback(); // Run the callback after all lines are done
        }
    }

    nextLine(); // Start the text sequence
}

// Function to fade out text and transition to credits
function startFadeOutEffect() {
    const outputEl = document.getElementById("output");

    let opacity = 1; // Start fully visible
    const fadeDuration = 10000; // 10 seconds fade-out
    const fadeStep = 50; // Speed of fading
    const fadeAmount = fadeStep / fadeDuration; 

    const fadeInterval = setInterval(() => {
        opacity -= fadeAmount;
        outputEl.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(fadeInterval);
            outputEl.innerHTML = ""; // Clear text after fade
        }
    }, fadeStep);
}