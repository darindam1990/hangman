$(document).ready(function() {
    $("#email_address").keypress(function(event) {
        EMAIL = $(this).val();
        if ( validateEmail(EMAIL) && event.which == 13 ) {
            hideMask();
            resetGameUi();
            prepServerCall();
        }
    });
    canvas = document.getElementById('gallows');
    hideStatusMasks();
});