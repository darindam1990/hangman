function renderPuzzle(word, wordLength) {
    $(".word").empty();
    for(var i = 0; i < wordLength; i++) {
        var tmplt = "<span class='blanks'>" + word[i] + "</span>"
        $(".word").append(tmplt);
    }
}

function renderAlphabets(countPerRow) {
    var alphaCtEl = document.querySelector(".alphabets");
    var alphaRowEl;
    for (var i = 97; i <= 122; i++) {
        if ((i - 97) % countPerRow === 0) {
            alphaRowEl = document.createElement("div");
            $(alphaRowEl).addClass("alpha-row");
            alphaCtEl.appendChild(alphaRowEl);
        }
        letterEl = document.createElement("a");
        $(letterEl).addClass("letter");
        $(letterEl).text(String.fromCharCode(i));
        $(letterEl).on('click', function() {
            onUserInput(this);
        });
        alphaRowEl.appendChild(letterEl);
    }
}

function onUserInput(el) {
    $(el).addClass("used");
    var guess = $(el).text();
    prepServerCall(guess);
}


