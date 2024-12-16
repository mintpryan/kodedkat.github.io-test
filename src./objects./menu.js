import { gridCells } from './utils.js';
import { trainer } from './trainer.js';
import { isInsideCafe, checkEntrance } from './cafe.js';

export const menuItems = [
    { name: "Coffee", icon: "☕", description: "A hot cup of freshly brewed coffee", price: "$2.50" },
    { name: "Croissant", icon: "🥐", description: "Buttery, flaky pastry", price: "$3.00" },
    { name: "Cake", icon: "🍰", description: "Slice of delicious cake", price: "$4.50" },
    { name: "Tea", icon: "🍵", description: "Aromatic herbal tea", price: "$2.00" }
];

export const menu = {
    visible: false,
    selected: -1,
    items: menuItems,

    toggleVisibility: function() {
        this.visible = !this.visible;
        this.selected = -1;
        if (this.visible) {
            displayMenu();
        } else {
            closeItemDetails();
        }
    },

    selectNext: function() {
        this.selected = (this.selected + 1) % this.items.length;
        highlightSelectedItem();
    },

    selectPrevious: function() {
        this.selected = (this.selected - 1 + this.items.length) % this.items.length;
        highlightSelectedItem();
    }
};

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
    menuContainer.innerHTML = '';
    menuItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';
        itemElement.dataset.index = index;
        
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
    document.getElementById('menu-container').style.display = 'block';
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

function highlightSelectedItem() {
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
        if (index === menu.selected) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

export function playerNearCounter() {
    const counterX = gridCells(12);
    const counterY = gridCells(10);
    const interactionRadius = gridCells(1.5);

    const distance = Math.sqrt(Math.pow(trainer.position.x - counterX, 2) + Math.pow(trainer.position.y - counterY, 2));
    return distance < interactionRadius;
}

document.addEventListener('keydown', (event) => {
    if (isInsideCafe) {
        switch(event.key) {
            case 'e':
                if (playerNearCounter()) {
                    menu.toggleVisibility();
                }
                break;
            case 'ArrowUp':
                if (menu.visible) menu.selectPrevious();
                break;
            case 'ArrowDown':
                if (menu.visible) menu.selectNext();
                break;
            case 'Enter':
                if (menu.visible && menu.selected !== -1) {
                    console.log(`Selected: ${menu.items[menu.selected].name}`);
                    menu.toggleVisibility();
                }
                break;
        }
    }
    
    if (!menu.visible) {
        switch(event.key) {
            case 'ArrowLeft':
                trainer.position.x -= gridCells(0.25);
                break;
            case 'ArrowRight':
                trainer.position.x += gridCells(0.25);
                break;
            case 'ArrowUp':
                trainer.position.y -= gridCells(0.25);
                break;
            case 'ArrowDown':
                trainer.position.y += gridCells(0.25);
                break;
            case 'e':
                checkEntrance(trainer.position.x, trainer.position.y);
                break;
        }
    }
});
