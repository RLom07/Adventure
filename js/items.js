if (!window.allItems) {
    window.allItems = {};
}

// Define items as properties of allItems
window.allItems = {
    // Weapons
    dagger: { name: "Dagger", type: "weapon", damage: 5 },
    sword: { name: "Sword", type: "weapon", damage: 10 },
    katana: { name: "Katana", type: "weapon", damage: 15 },
    bladeOfTheImmortal: { name: "Blade of the Immortal", type: "weapon", damage: 50 },
    terminusMinionSwords: { name: "Terminus Minion Swords", type: "weapon", damage: 20 },
    terminusSword: { name: "Terminus Sword", type: "weapon", damage: 30 },

    // Utility Items
    waterskin: { name: "Waterskin", type: "utility" },
    torch: { name: "Torch", type: "utility" },

    // Special Items
    keepsake: { name: "Keepsake", type: "special" },

    // Addible Items
    beef: { name: "Beef", type: "food" },
    pork: { name: "Pork", type: "food" },
    wolfMeat: { name: "Wolf Meat", type: "food" },
    dinner: { name: "Dinner", type: "food" },

    // Loot Items
    wolfPelt: { name: "Wolf Pelt", type: "loot" },

    // Healing Items
    bandage: { name: "Bandage", type: "healing", healAmount: 10 },
    smallHerb: { name: "Small Herb", type: "healing", healAmount: 5 },
    healingPotion: { name: "Healing Potion", type: "healing", healAmount: 15 },
    cleanBandage: { name: "Clean Bandage", type: "healing", healAmount: 20},
    herbalBandage: { name: "Herbal Bandage", type: "healing", healAmount: 30},

    // 🌿 Advanced Healing Items
    bigHealingPotion: { name: "Big Healing Potion", type: "healing", healAmount: 50 },
    elixir: { name: "Elixir", type: "healing", healAmount: 50 },
    divineBlessing: { name: "Divine Blessing", type: "healing", healAmount: 100 },


    // 🩸 Special Regeneration Items
    herbalMix: { name: "Herbal Mix", type: "healing", healAmount: 20 },
    soulRemnant: { name: "Soul Remnant", type: "healing", healAmount: 75 },
    abyssalDraught: { name: "Abyssal Draught", type: "healing", healAmount: 60}, 
    emberOfPyrethorn: { name: "Ember Of Pyrethorn", type: "healing", healAmount: 100}
};

// Dispatch event to notify items are loaded
document.dispatchEvent(new Event("itemsLoaded"));

console.log("✅ items.js fully loaded. All items are now available.");