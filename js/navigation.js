/**
 * Navigation and page loading utilities
 */

var NavigationUtils = {
    // Page type detection
    getPageType: function(url) {
        return {
            isGenesis: url.indexOf('genesis.html') !== -1,
            isSession: url.indexOf('session.html') !== -1,
            isNarrative: url.indexOf('narrative.html') !== -1,
            isConnect: url.indexOf('connect.html') !== -1,
            isGenoma: url.indexOf('genoma.html') !== -1
        };
    },
    
    // Get loader configuration based on page type
    getLoaderConfig: function(pageType) {
        var useWhiteLoader = pageType.isNarrative || pageType.isSession || pageType.isGenoma;
        return {
            src: useWhiteLoader ? 'loader/white_loader.gif' : 'loader/black_loader.gif',
            color: useWhiteLoader ? 'white' : 'black'
        };
    },
    
    // Background colors for each page
    getBackgroundColor: function(url) {
        var colors = {
            'genesis.html': '#F5E10E',
            'session.html': '#1D5F89',
            'narrative.html': '#0E1037',
            'connect.html': '#EA0C94',
            'genoma.html': '#3B002B'
        };
        
        for (var key in colors) {
            if (url.indexOf(key) !== -1) {
                return colors[key];
            }
        }
        return '#F5E10E'; // Default
    }
};
