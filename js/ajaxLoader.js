var ajaxLoader = function () {
    $('body').empty();
    $(document).ajaxStart(function () {
        $('body').html('<div class="loaderContainer"><img id="loader" src="loader/white_loader.gif" /><br /><span id="loading">loading...</span></div>');
        $('#loading').css('color', 'white');
    });
};

var ajaxLoader_b = function () {
    $('body').empty();
    $(document).ajaxStart(function () {
        $('body').html('<div class="loaderContainer"><img id="loader" src="loader/black_loader.gif" /><br /><span id="loading">loading...</span></div>');
        $('#loading').css('color', 'black');
    });
};