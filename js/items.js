// items.js - Centralized item definitions for the game

// Weapons
const dagger = { name: "Dagger", type: "weapon", damage: 5 };
const sword = { name: "Sword", type: "weapon", damage: 10 };
const axe = { name: "Axe", type: "weapon", damage: 12 };

// Utility Items
const waterskin = { name: "Waterskin", type: "utility" };
const torch = { name: "Torch", type: "utility" };

// Special Items
const keepsake = { name: "Keepsake", type: "special" };
const mysteriousAmulet = { name: "Mysterious Amulet", type: "special" };

// Register all items in a global object for easy access
const allItems = {
    dagger,
    sword,
    axe,
    waterskin,
    torch,
    keepsake,
    mysteriousAmulet
};