document.getElementById("mainTitle").innerText = "Point and click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Game inventory
const inventoryList = document.getElementById("inventoryList");

//Main character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: Calc offset based on character size
    //FIX: Character doesn't animate on first move
    //FIX: Out of bounds when clicking on itself
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch (e.target.id) {
        case "squareTree":
            squareTree.style.opacity = 0.5;
        case "key":
            console.log("You\'ve found a key!");
            document.getElementById("key").remove();
            const keyElement = document.createElement("li");
            keyElement.id = "inv-key";
            keyElement.innerText = "Key"
            inventoryList.appendChild(keyElement)
            break;
        default:
            squareTree.style.opacity = 1;
    }

}