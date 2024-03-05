document.getElementById("mainTitle").innerText = "Point and Click adventure game";
// Game State
let gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false,
}

window.confirm("Would you like to reset your game progress?")

if (Storage) {
    if (localStorage) {
        //Uses LocalStorage gameState string and convert it to an object. Then store it into gameState
        gameState = JSON.parse(localStorage.gameState)
    } else {
        //Convert local object variable to a string. Then store it inro LocalStorage
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }
}


//Game window reference
const gameWindow = document.getElementById("gameWindow");
const inventoryList = document.getElementById("inventoryList");

const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

//speech bubbles
const heroSpeech = document.getElementById("heroSpeech");
const counsterSpeech = document.getElementById("counterSpeech");

//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

//avatar
const counterAvatar = document.getElementById("counterAvatar");

//Objects
const tree1 = document.getElementById("squareTree");

if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

updateInventory(gameState.inventory, inventoryList);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }
        switch (e.target.id) {
            case "key":
                console.log("pick up key")
                document.getElementById("key").remove();
                changeInventory('key', "add");
                gameState.keyPickedUp = true
                saveGamestate(gameState)
                break;

            case "well":
                if (gameState.coinPickedUp == false) {
                    changeInventory("coin", "add");
                    gameState.coinPickedUp = true;
                } else {
                    console.log("There are no more coins in this well!");
                }
                break;

            case "doorWizardHut":
                if (checkItem("key")) {
                    showMessage(heroSpeech, "I opened the door. Yeah!", heroAudio);

                }

                else if (checkItem("coin")) {
                    changeInventory("coin", "remove");
                    showMessage(heroSpeech, "Oh no I lost the coin and it didn't open the door.. Feel kinda stupid..", heroAudio);
                }

                else {
                    showMessage(heroSpeech, "Fuck this door is locked and I don't have a key. boohoo :(", heroAudio);
                }

                break;

            case "statue":
                showMessage(heroSpeech, "Hey a statue.. Looks cool.", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Thanks!", counterAudio);
                setTimeout(showMessage, 8.1 * sec, heroSpeech, "Wait what? You can talk?!?", heroAudio);
                setTimeout(showMessage, 12.1 * sec, counsterSpeech, "Shut up and I'll tell u where the key is", counterAudio);
                setTimeout(showMessage, 16.1 * sec, heroSpeech, "Eh... Okay!", heroAudioAudio);
                setTimeout(showMessage, 20.1 * sec, counsterSpeech, "Go search through the graves.", counterAudio);
                setTimeout(showMessage, 24.1 * sec, counsterSpeech, "Thanks! I wont forget this", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 24 * sec);
                //console.log("hey you.. wanna know where the key is? It's by the graves.");
                break;
            default:
                break;
        }
    }
}

/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameters given to changeInventory()");
        return;
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'remove':
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;

    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * This returns string value if it exist within the array
 * @param {string} itemName 
 * @returns 
 */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
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

/**
 * It will show dialog and trigger sound.
 * @param {getElementById} targetBubble 
 * @param {string} message
 * @param {getElementById} targetSound 
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
}

/**
 * Hides message and pauze the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}

/**
 * Saves gamestate into localstorage
 * @param {*} gameState 
 */

function saveGamestate(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}