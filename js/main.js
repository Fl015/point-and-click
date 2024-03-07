document.getElementById("mainTitle").innerText = "Point and Click adventure game";

// Game State
let gameState = {
    "inventory": [],
    "goodbyeKurt": false,
    "gameEnded": false,
}

function runGame() {

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
    const woodsAudio = document.getElementById("woodsAudio")

    //avatar
    const counterAvatar = document.getElementById("counterAvatar");

    //Objects
    const tree1 = document.getElementById("squareTree");


    gameWindow.onclick = function (e) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        //TODO: calc offset based on character size
        //TODO: making dialog functionality

        if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
            if (e.target.id !== "heroImage") {
                mainCharacter.style.left = x - offsetCharacter + "px";
                mainCharacter.style.top = y - offsetCharacter + "px";
            }

            switch (e.target.id) {



                case "bush":

                    if (checkItem("magnifying glass")) {
                        changeInventory("key", "add");
                        document.getElementById("bush").remove();

                    }

                    else {
                        changeInventory('ruby', "add")
                    }

                    break;

                case "doorInWall":

                    if (checkItem("key")) {
                        document.getElementById("doorInWall").remove();

                        changeInventory('key', "remove")
                        changeInventory('sword', "add")
                        //console.log("I opened the door. Yeah!");
                    }

                    else {
                        showMessage(heroSpeech, "Hmm... I wonder how I would be able to get in here.", heroAudio);
                    }

                    break;

                case "ladder":

                    if (checkItem("sword" && "totem")) {
                        document.getElementById("ladder").remove();

                        showMessage(heroSpeech, "You damn goblin come here!", heroAudio);
                        setTimeout(function () { counterAvatar2.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "You think you can beat me huh... I HAVEN'T BEEN CHALANGED FOR 20 YEARS", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "Ehhh ok...", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "WHAT HOW DID YOU GET THAT TOTEM?!?", counterAudio);
                        setTimeout(showMessage, 16.1 * sec, heroSpeech, "HEHEHE HA", laughAudio);

                        setTimeout(function () { counterAvatar2.style.opacity = 0; }, 16 * sec);

                        changeInventory('ruby', "add")

                        changeInventory('sword', "remove")
                        changeInventory('totem', "remove")

                    }

                    else if (checkItem("sword")) {
                        showMessage(heroSpeech, "Hmm, I have the sword but it feels like I'm missing something...", heroAudio);
                    }

                    else {
                        showMessage(heroSpeech, "WOW!!! A Random ladder... I almost tripped. \"Someone down here?\" ", heroAudio);
                    }

                    break;

                case "statues":

                    if (checkItem("key")) {
                        showMessage(heroSpeech, "I got the key Kurt!", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Now you see the door in the wall?", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "Yeah... What about it?", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "Unlock the door, grab the sword and come back!", counterAudio);
                        setTimeout(changeInventory, 14.1 * sec, 'magnifying glass', "remove")

                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                    }

                    else if (checkItem("sword")) {
                        showMessage(heroSpeech, "KURT!!! I've found the sword", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Good... Now I need you to go down in the dungeon, there should be a ladder somewhere", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "I Think I know where it is!", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "Great, you need to defeat the evil goblin, I got something for you so you dont die! Be safe.", counterAudio);
                        setTimeout(changeInventory, 14.1 * sec, 'totem', "add")
                        setTimeout(showMessage, 16.1 * sec, heroSpeech, "I wont let you down kurt!", heroAudio);

                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 19 * sec);
                    }

                    else if (checkItem("ruby")) {
                        showMessage(heroSpeech, "That was hell of a fight", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Well done... I'm proud of you traveler.", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "What now Kurt?", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "There should be a portal that requires a ruby to enter, go there", counterAudio);
                        setTimeout(showMessage, 16.1 * sec, heroSpeech, "Alright come on lets go!", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "I can't come with you traveler, I will have to wait for the next person to come across!", counterAudio);
                        setTimeout(showMessage, 16.1 * sec, heroSpeech, "I'll miss you...", heroAudio);

                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 19 * sec);
                    }

                    else if (checkItem("totem")) {
                        showMessage(heroSpeech, "Kurt I'm scared...", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "You can do this traveler, I believe in you", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "Thanks, I'll try my best!", heroAudio);

                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 19 * sec);
                    }

                    else {
                        showMessage(heroSpeech, "WOW Kurt Angle!.", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "I will help you escape this dimension!", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "Wait what? Really?", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "If you want the key to the door go search in the maze! Come back when you've found it.", counterAudio);
                        setTimeout(changeInventory, 14.1 * sec, 'magnifying glass', "add")
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "BTW! Before you go make sure you do NOT go too deep in the woods at the top...", counterAudio);

                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                    }
                    break;

                case "escapePortal":

                    if (checkItem("ruby")) {
                        showMessage(heroSpeech, "*Screams* I WILL MISS YOU KURT!", heroAudio);
                        setTimeout(4.1 * sec,
                            document.getElementById('gamewindow').remove();

                        var creditsContainer = document.createElement('div');
                        creditsContainer.style.textAlign = 'center';
                        creditsContainer.style.position = 'absolute';
                        creditsContainer.style.top = '50%';
                        creditsContainer.style.left = '50%';
                        creditsContainer.style.transform = 'translate(-50%, -50%)';
                        creditsContainer.style.fontSize = '24px';
                        creditsContainer.innerHTML = `
                        <strong style="font-size: 32px;">Credits</strong><br><br>
                        in charge of not making me bored: Music, Jaydee, Joshua & Mans<br>
                        ideas: Floris, Jaydee & Joshua<br>
                        The rest: Floris
                    `;

                        // Append the credits container to the body
                        document.body.appendChild(creditsContainer);

                        // Play the audio
                        var audioPlayer = document.getElementById('audioPlayer');
                        audioPlayer.play();
                    }




                    else if (checkItem("ruby" && gameState.goodbyeKurt == false)) {
                        showMessage(heroSpeech, "WAIT I HAVE TO GET KURT!", heroAudio);
                    }

                    else {
                        showMessage(heroSpeech, "Hmm... I just got really nauseous, I better get out of here.", heroAudio);
                    }

                    break;

                case "woods":
                    document.getElementById("gameWindow").remove();
                    document.getElementById("mainTitle").innerText = "I WARNED YOU...";

                    document.getElementById("videoPlayer").style.opacity = 1;
                    videoPlayer.style.top = '160px';
                    playVideo();
                    document.getElementById("woods1").style.opacity = 1;
                    document.getElementById("woods2").style.opacity = 1;

                    document.body.style.backgroundColor = "grey"

                    setTimeout(2 * sec, woodsAudio)

                default:
                    break;
            }
        }
    }

    if (gameState.gameEnded == true) {
        document.getElementById(gameWindow).remove();
        document.addEventListener('DOMContentLoaded', showCreditsAndPlayAudio);
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

    function playVideo() {
        var iframe = document.getElementById("youtubeVideo");
        var videoSrc = iframe.src;
        videoSrc += "&autoplay=1"; // Append autoplay parameter
        iframe.src = videoSrc; // Trigger the video to play automatically
    }

}

runGame();