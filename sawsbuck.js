class NPCInteraction {
    constructor() {
      this.menuItems = ['Potion', 'Pokeball', 'Antidote'];
      this.prices = [5, 8, 3];
      this.isInteracting = false;
    }
  
    interact() {
      if (!this.isInteracting) {
        this.isInteracting = true;
        this.startOrderProcess();
      }
    }
  
    async startOrderProcess() {
      await this.displayDialogue("What would you like to order?");
      const selectedItem = await this.showMenu();
      await this.displayDialogue(`That'll be ${this.prices[selectedItem]} Pokémon dollars, thank you.`);
      this.deductCurrency(this.prices[selectedItem]);
      this.isInteracting = false;
    }
  
    async showMenu() {
      return new Promise(resolve => {
        // Implement menu display logic here
        // For example, create buttons for each menu item
        this.menuItems.forEach((item, index) => {
          const button = this.createButton(item, () => {
            this.clearMenu();
            resolve(index);
          });
          // Add button to the game scene
        });
      });
    }
  
    createButton(text, onClick) {
      // Implement button creation logic
      // Return the created button
    }
  
    clearMenu() {
      // Remove all menu buttons from the game scene
    }
  
    async displayDialogue(text) {
      // Implement dialogue display logic here
      console.log(text);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  
    deductCurrency(amount) {
      // Implement currency deduction logic here
      console.log(`Deducted ${amount} Pokémon dollars`);
    }
  }
  
  // Usage
  const npc = new NPCInteraction();
  
  // When the player interacts with the NPC
  npc.interact();
