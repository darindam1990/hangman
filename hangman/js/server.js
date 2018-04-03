function serverCall(url, requestParams) {
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: url,
        data: requestParams,
        success: gameOn,
        error: function (responseData, textStatus, errorThrown) {
          console.error(arguments)
        }
    });
}

function prepServerCall(guess) {
    if (gameKey && guess) {
        var url = BASE_URL + 'hangman/game/' + gameKey;
        var data = {
            guess: guess
        };
    } else {
        var url = BASE_URL + 'hangman/game';
        var data = {
            email: EMAIL
        };
    }
    serverCall(url, JSON.stringify(data));
}