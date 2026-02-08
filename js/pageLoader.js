/**
 * Page loading and transition logic
 */

var PageLoader = {
    // Common function to handle page loading after fade-out or initial load
    loadPageContent: function($pc, url, loaderTimeout, callback) {
        // Reset loading percentage
        LoadingUtils.reset();
        
        // Load HTML
        $pc.load(url, function() {
            // Hide content immediately when loaded
            var $loadedContent = $pc.children().not('.loaderContainer');
            $loadedContent.css('visibility', 'hidden');
            
            // HTML loaded, jump to 50%
            LoadingUtils.update(50);
            
            // Prevent premature chat bubble animations for connect page
            var pageType = NavigationUtils.getPageType(url);
            if (pageType.isConnect) {
                setTimeout(function() {
                    $loadedContent.find('#chatbubble, #chatbubble2, #chatbubble3, #chatbubble4, #chatbubble5, #chatbubble6')
                        .removeClass('chatbubble_animate chatbubble2_animate chatbubble3_animate chatbubble4_animate chatbubble5_animate chatbubble6_animate')
                        .css('display', 'none');
                }, 10);
            }
            
            // Preload background image
            PreloadUtils.preloadPageBackground(url, 60, function() {
                // Background loaded (now at 60%), handle page-specific images
                if (pageType.isSession) {
                    PreloadUtils.preloadSessionImages(function() {
                        LoadingUtils.update(100);
                        setTimeout(function() {
                            PageLoader.completePageLoad($pc, url, loaderTimeout);
                            if (callback) callback();
                        }, 100);
                    });
                } else {
                    LoadingUtils.update(100);
                    setTimeout(function() {
                        PageLoader.completePageLoad($pc, url, loaderTimeout);
                        if (callback) callback();
                    }, 100);
                }
            });
        });
    },
    
    // Complete page load and trigger fade-in
    completePageLoad: function($pc, url, loaderTimeout) {
        // Clear loader timeout
        if (loaderTimeout) {
            clearTimeout(loaderTimeout);
        }
        
        // Remove loader
        $pc.find('.loaderContainer').remove();
        $pc.find('header').first().remove();
        
        // Ensure we're at 100%
        LoadingUtils.update(100);
        
        // Get content
        var $new = $pc.children().not('.loaderContainer');
        if ($new.length === 0) return;
        
        // Apply fade-in effect
        FadeUtils.fadeInContent($new, function() {
            // Handle page-specific effects after fade-in completes
            PageHandlers.handlePageEffects(url, $new);
        });
    },
    
    // Handle fade-out of existing content
    fadeOutContent: function($content, $pc, callback) {
        if ($content.length && !$content.is('#fade-out-wrap')) {
            $content.wrapAll('<div id="fade-out-wrap"></div>');
        }
        
        var $wrap = $('#page-content #fade-out-wrap');
        if ($wrap.length) {
            $wrap.css('transition', 'opacity 0.3s ease');
            $wrap[0].offsetHeight; // Force reflow
            $wrap.css('opacity', '0');
            $wrap.one('transitionend', function() {
                $pc.empty();
                if (callback) callback();
            });
        } else {
            $pc.empty();
            if (callback) callback();
        }
    }
};
