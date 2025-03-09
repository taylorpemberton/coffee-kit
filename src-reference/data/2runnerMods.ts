const twoRunnerMods = [
    {
        name: "Suspension Lift Kit",
        link: "#",
        price: "$1200.00",
        category: "Suspension"
    },
    {
        name: "All-Terrain Tires",
        link: "#",
        price: "$800.00",
        category: "Wheels & Tires"
    },
    {
        name: "LED Light Bar",
        link: "#",
        price: "$300.00",
        category: "Lighting"
    },
    {
        name: "Roof Rack",
        link: "#",
        price: "$450.00",
        category: "Exterior"
    },
    {
        name: "Winch System",
        link: "#",
        price: "$600.00",
        category: "Recovery"
    }
];

const totalPrice = twoRunnerMods.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('$', ''));
}, 0).toFixed(2);

// Function to group mods by category
function getModsByCategory() {
    const categories: Record<string, typeof twoRunnerMods> = {};
    
    twoRunnerMods.forEach(mod => {
        const category = mod.category || 'Uncategorized';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(mod);
    });
    
    return categories;
}

export { twoRunnerMods, totalPrice, getModsByCategory }; 