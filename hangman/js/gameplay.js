function showWord(word) {
    renderPuzzle(word, word.length);
}

function resetGameUi() {
    clearDom();
    renderAlphabets(8);
    prepareGallow();
}

function clearDom() {
    $(".word").empty();
    $(".alphabets").empty();
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function hideMask() {
    $(".mask").hide();
}

function hideStatusMasks() {
    $(".fail-screen:visible").hide();
    $(".success-screen:visible").hide();
}

function showFailScreen() {
    $(".fail-screen").fadeIn();
}

function showSuccessScreen() {
    $(".success-screen").fadeIn();
}

function gameOn(response) {
    hideStatusMasks();
    var data;
    try {
        data = JSON.parse(response);
        gameKey = data.game_key;
        hangman(triesLeft, Number(data.num_tries_left));
        triesLeft = Number(data.num_tries_left);
        switch(data.state) {
            case "alive":
                showWord(data.phrase);
                break;
            case "won":
                showSuccessScreen();
                var score = Number($(".score").text());
                $(".score").text(score + 10);
                setTimeout(prepServerCall, 2000);
                resetGameUi();
                break;
            case "lost":
                showFailScreen();
                setTimeout(prepServerCall, 2000);
                resetGameUi();
                break;
        }
    } catch(e) {
        console.error("Invalid JSON response");
    }
    console.log(response);
}


function hangman(lastTryNum, currTryNum) {
    if (currTryNum < lastTryNum) {
        continueToHang(currTryNum);
    }
}