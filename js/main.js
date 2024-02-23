document.getElementById("mainTitle").innerText = "Point and Click adventure game";

fetch('data/save.json').then((response) => {
    if (response.status == 404) {
        alert('file not found')
    } else {
        return response.json();
    }
}).then((resJson) => {
    gameState = resJson;
    runGame();
}).catch((error) => {
    console.error(error);
})

function runGame() {



    //Game window reference
    const gameWindow = document.getElementById("gameWindow");

    // Game state
    gameState = {
        "inventory": [],
        "coinPickedUp": false
    }

    //Inventory
    const inventoryList = document.getElementById("inventoryList");

    //Main Character
    const mainCharacter = document.getElementById("hero");
    const offsetCharacter = 16;
    const tree1 = document.getElementById("squareTree");

    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //TODO: calc offset based on character size
        //TODO: making dialog functionality

        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }

        switch (e.target.id) {
            case "key":
                console.log("Picked up key")
                document.getElementById("key").remove();
                changeInventory("key", "add")
                break;
            case "well":
                if (gameState.coinPickedUp == false) {
                    changeInventory("coin", "add")
                    gameState.coinPickedUp = true
                }
                break;
            case "doorWizardHut":
                if (checkItem("key")) {
                    console.log("I opened the door. Yeah!");
                } else if (checkItem("coin")) {
                    changeInventory("coin", "remove")
                    console.log("Oh no I lost the coin and it didn't open the door.. Feel kinda stupid..");
                } else {
                    console.log("Fuck this door is locked and I don't have a key. boohoo :(");
                }
                break;
            case "statue":
                console.log("hey you.. wanna know where the key is? It's by the graves.");
                break;

            default:
                break;

        }
        /**
         * Checks if the value exists within the array
         * If not then it adds value to the array and use showItem function
         * @param {string} itemName 
         * @param {string} itemId 
         */
        function getItem(itemName, itemId) {
            if (!checkItem(itemName)) {
                inventory.push(itemName);
                showItem(itemName, itemId);
            }
            console.log(inventory);
        }

        /**
         * This returns string value if it exist within the array
         * @param {string} itemName 
         * @returns 
         */
        function checkItem(itemName) {
            return gameState.inventory.includes(itemName);
        }

        /**
        * 
        * @param {string} itemName 
        * @param {string} action 
        */
        function changeInventory(itemName, action) {
            if (itemName == null || action == null) {
                console.error("invalid parameters given to changeInventory");
                return;
            }
            switch (action) {
                case 'add':
                    gameState.inventory.push(itemName);
                    break;
                case "remove":
                    gameState.inventory = gameState.inventory.filter(function (newInventory) {
                        return newInventory !== itemName;
                    })
                    document.getElementById("inv-" + itemName).remove();
                    break;

            }
            updateInventory(gameState.inventory, inventoryList);
        }

        function updateInventory(inventory, inventoryList) {
            inventoryList.innerHTML = '';
            inventory.forEach(function (item) {
                const inventoryItem = document.createElement("li");
                inventoryItem.id = 'inv-' + item;
                inventoryItem.innerText = item;
                inventoryList.appendChild(inventoryItem);
            })
        }

    }
}