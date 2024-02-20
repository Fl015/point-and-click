document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Inventory
let inventory = [];
console.log(inventory);
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

    if (e.target.id !== "heroImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    switch (e.target.id) {
        case "key":
            getItem("Rusty key", "rustyKey");
            break;
        case "well":
            getItem("Coin", "coin");
            break;
        case "doorWizardHut":
            if (checkItem("Rusty key")) {
                console.log("I opened the door. Yeah!");
            } else if (checkItem("Coin")) {
                removeItem("Coin", "coin")
                console.log("Oh no I lost the coin and it didn't open the door.. Feel kinda stupid..");
            } else {
                console.log("Fuck this door is locked and I don't have a key. boohoo :(");
            }
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

    function checkItem(itemName) {
        return inventory.includes(itemName);
    }

    /**
     * Needs a name for displaying item and a html id name
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function showItem(itemName, itemId) {
        console.log('You\'ve found a ' + itemName + '!');
        const keyElement = document.createElement("li");
        keyElement.id = itemId;
        keyElement.innerText = itemName;
        inventoryList.appendChild(keyElement);
    }

    /**
     * Removes item from array and the element within the HTML
     * @param {string} itemName 
     * @param {string} itemId 
     */
    function removeItem(itemName, itemId) {
        //remove item in Array
        inventory = inventory.filter(function (newInventory) {
            return newInventory !== itemName;
        });
        document.getElementById(itemId).remove();
    }


}