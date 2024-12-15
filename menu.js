const menuItems = [
    { name: "Coffee", icon: "☕", description: "A hot cup of freshly brewed coffee", price: "$2.50" },
    { name: "Croissant", icon: "🥐", description: "Buttery, flaky pastry", price: "$3.00" },
    { name: "Cake", icon: "🍰", description: "Slice of delicious cake", price: "$4.50" },
    { name: "Tea", icon: "🍵", description: "Aromatic herbal tea", price: "$2.00" }
];

function createPixelArt(emoji) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 16, 16);
    
    return canvas.toDataURL();
}

function displayMenu() {
    const menuContainer = document.getElementById('menu-items');
    menuItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        
        const icon = document.createElement('img');
        icon.src = createPixelArt(item.icon);
        icon.alt = item.name;
        icon.className = 'pixel-icon';
        
        const name = document.createElement('p');
        name.textContent = item.name;
        
        itemElement.appendChild(icon);
        itemElement.appendChild(name);
        itemElement.addEventListener('click', () => showItemDetails(item));
        
        menuContainer.appendChild(itemElement);
    });
}

function showItemDetails(item) {
    const detailsContainer = document.getElementById('item-details');
    detailsContainer.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${createPixelArt(item.icon)}" alt="${item.name}" class="pixel-icon">
        <p>${item.description}</p>
        <p>Price: ${item.price}</p>
        <button onclick="closeItemDetails()">Close</button>
    `;
    detailsContainer.style.display = 'block';
}

function closeItemDetails() {
    document.getElementById('item-details').style.display = 'none';
}

window.onload = displayMenu;