function startCredits() {
    // Clear the screen completely
    clearGameText();
    stopAllMusic();

    // Create a full-screen black overlay
    let creditsOverlay = document.createElement("div");
    creditsOverlay.id = "creditsScreen";
    creditsOverlay.style.position = "fixed";
    creditsOverlay.style.top = "0";
    creditsOverlay.style.left = "0";
    creditsOverlay.style.width = "100vw";
    creditsOverlay.style.height = "100vh";
    creditsOverlay.style.backgroundColor = "black";
    creditsOverlay.style.zIndex = "9999";
    creditsOverlay.style.overflow = "hidden"; // Prevent scrolling outside
    document.body.appendChild(creditsOverlay);

    // 🎵 Play Credit Music
    playMusic("credits");

    // 🕒 Wait a few seconds before rolling credits
    setTimeout(() => {
        rollCredits(creditsOverlay);
    }, 6000);
}

function rollCredits(container) {
    let creditsContent = `
        <h1 style="text-align: center; font-size: 2em; color: #33ff33; margin-bottom: 2vh;">Adventure</h1>
        <p style="margin-top: 20px; font-size: 1.2em; color: #33ff33;">A game made by: Ronald Lommers</p>
        <p style="font-size: 1.2em; color: #33ff33;">Story written by: Ronald Lommers</p>

        <h2 style="color: #33ff33;">Inspired by:</h2>
        <p>Skyrim By Bethesda</p>
        <p>Dungeons and Dragons</p>
        <p>The Operator by Bureau 47</p>
        <p>Blade Of The Immortal By Netflix</p>

        <h2 style="color: #33ff33;">Music Used:</h2>
        <p>Prologue: Cinematrix - Revolve (R Mix) By: Hacknet</p>
        <p>Chapter1: Magical Flora By: Tabletop Audio</p>
        <p>Bad Ending Music: Hello Zepp + Overture (Saw Theme)</p>
        <p>Bad Ending Dialogue: Game Over by John Kramer</p>
        <p>Adventure Begins: KINGSMAN: THE SECRET SERVICE - MAIN THEME</p>
        <p>Chapter 2 Forest night: Long Rest by Tabletop Audio</p>
        <p>Wolf Battle Music: Dragonfire: The Ultimate D&D Battle by Soundscape Freeflow</p>
        <p>Death Music: Death Music by Subnautica</p>
        <p>Chapter 3 start music: I Dream Of Flying by Johan Fredrik</p>
        <p>Inn Music: Medieval Fantasy Tavern | D&D Fantasy Music and Ambience By Daydreaming of Persephone</p>
        <p>Town Music: Goodhaven By Tabletop Audio</p>
        <p>Meeting Maji Music: The Misty Marsh By Tabletop Audio</p>
        <p>The two Goat Riders: Necropolis By Tabletop Audio</p>
        <p>Training Starts: The Adventure Begins By Howard Shore</p>
        <p>Morning Theme: Middle Earth: Dawn By Tabletop Audio</p>
        <p>Market Theme: All Roads Lead to Hogsmeade By Peter Murray</p>
        <p>Market Battle: A Market Day's Merriment By SoundScape FreeFlow</p>
        <p>Solving the name theme: Operator (Main Menu) By Spinozarre</p>
        <p>Harbour Ambience: Harbour Ambience and Music By Martia's Muses</p>
        <p>Pirates Singing: Sails Of Glory By SoundScape FreeFlow</p>
        <p>Ocean at night: Open Ocean By Tabletop Audio</p>
        <p>Abyssal Isle: Quiet Cove By Tabletop Audio</p>
        <p>Terminus Minion battle music: Waterblight Ganon Battle By Nintendo</p>
        <p>Manji's Death Music: Naomi Misora's Death By Death Note</p>
        <p>Run Music: Escape! By Spinozarre</p>
        <p>Nearing Terminus: Hidden Passage By Tabletop Audio</p>
        <p>Terminus Theme: Lava King's Lair By Tabletop Audio</p>
        <p>Terminus Battle Music: So I tried making a Boss Theme... By Chocominh</p>
        <p>Alysandra Appears: The Flight By Ubisoft Music</p>
        <p>Alysandra Theme: Ezio's Family By Jesper Kyd</p>
        <p>Peaceful Ending Theme: The Legend of Zelda: Breath of the Wild - Theme By Nintendo</p>
        <p>Stay and Change Ending Theme: Sirius By Cobra Kai</p>
        <p>Credit music: The Walking Dead Season 4 intro By TellTale</p>

        <h2 style="color: #33ff33;">Made as an Assignment for:</h2>
        <p>Amsterdam University Of Applied Sciences</p>

        <h2 style="color: #33ff33;">Special Thanks to:</h2>
        <p>Lisette Pool</p>
    `;

    let creditsText = document.createElement("div");
    creditsText.innerHTML = creditsContent;
    creditsText.style.position = "absolute";
    creditsText.style.width = "100%";
    creditsText.style.color = "#33ff33";
    creditsText.style.fontSize = "1em";
    creditsText.style.textAlign = "center";
    creditsText.style.fontFamily = "Arial, sans-serif";
    creditsText.style.marginBottom = "-105rem"; // Start even further down
    creditsText.style.animation = "scrollCredits 47s linear forwards"; // Smooth scrolling

    container.appendChild(creditsText);

    // 🎬 Add animation via CSS
    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes scrollCredits {
            from { bottom: -100vh; } /* Start from even lower */
            to { bottom: 158rem; } /* Scroll up fully */
        }
    `;
    document.head.appendChild(style);

    // 🎇 After credits finish, show thank-you message
    setTimeout(() => {
        creditsText.remove(); // Remove credits
        showThankYouMessage();
    }, 48000);
}

// ✅ Final Thank You Message
function showThankYouMessage() {
    let thankYouScreen = document.getElementById("creditsScreen");
    thankYouScreen.innerHTML = ""; // Clear everything

    let thankYouMessage = document.createElement("div");
    thankYouMessage.style.position = "absolute";
    thankYouMessage.style.top = "50%";
    thankYouMessage.style.left = "50%";
    thankYouMessage.style.transform = "translate(-50%, -50%)";
    thankYouMessage.style.color = "#33ff33";
    thankYouMessage.style.fontSize = "1.5em";
    thankYouMessage.style.textAlign = "center";
    thankYouMessage.style.fontFamily = "Arial, sans-serif";

    thankYouMessage.innerHTML = `<p>Thank you so much for playing my game, ${gameState.player.name} ❤️</p>`;

    thankYouScreen.appendChild(thankYouMessage);

    // 🎇 After a few seconds, fade to black and return to main menu
    // Smooth fade in
    setTimeout(() => {
        thankYouMessage.style.transition = "opacity 3s";
        thankYouMessage.style.opacity = "1";
    }, 3000);

    // Smooth fade out after a few seconds
    setTimeout(() => {
        thankYouMessage.style.opacity = "0";
    }, 6000);
}

// ✅ Return to Main Menu
function returnToMainMenu() {
    stopMusic();
    clearGameText();
    displayText("Press Enter to return to the main menu.", () => {
        document.addEventListener("keydown", () => {
            location.reload(); // Restart the game
        }, { once: true });
    });
}