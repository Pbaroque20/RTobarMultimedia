/**
 * Loading percentage and progress utilities
 */

var LoadingUtils = {
    maxLoadingPercent: 0,
    
    update: function(percent) {
        var roundedPercent = Math.round(percent);
        if (roundedPercent > this.maxLoadingPercent) {
            this.maxLoadingPercent = roundedPercent;
            var $loading = $('#loading');
            if ($loading.length) {
                $loading.text('loading ' + this.maxLoadingPercent + '%');
            }
        }
    },
    
    reset: function() {
        this.maxLoadingPercent = 0;
        var $loading = $('#loading');
        if ($loading.length) {
            $loading.text('loading 0%');
        }
    }
};
