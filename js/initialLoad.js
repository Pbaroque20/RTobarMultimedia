/**
 * Initial page load handling for genesis.html
 */

var InitialLoad = {
    // Handle initial genesis.html preload and display
    init: function() {
        var $preloadContainer = $('<div style="display:none;"></div>').appendTo('body');
        var loaderTimeout;
        var contentLoaded = false;
        
        // Timer to show loader after 1 second if initial load is still in progress
        loaderTimeout = setTimeout(function() {
            var $pc = $('#page-content');
            if (!$pc.find('.loaderContainer').length && !contentLoaded) {
                LoadingUtils.reset();
                $pc.html('<div class="loaderContainer"><img id="loader" src="loader/black_loader.gif" /><br /><span id="loading">loading 0%</span></div>');
            }
        }, 1000);
        
        // Reset loading percentage to 0 for initial load
        LoadingUtils.reset();
        
        // Load HTML immediately
        $preloadContainer.load('genesis.html', function () {
            var $preloadedContent = $preloadContainer.children();
            // Hide preloaded content initially
            $preloadedContent.css('visibility', 'hidden');
            
            // HTML loaded, jump to 50%
            LoadingUtils.update(50);
            
            // Pre-load genesis background image first
            var bgImg = new Image();
            bgImg.onload = function() {
                // Background loaded, jump to 60%
                LoadingUtils.update(60);
                InitialLoad.loadImages($preloadedContent, loaderTimeout, contentLoaded, $preloadContainer);
            };
            bgImg.onerror = function() {
                // If background fails, continue anyway at 50%
                InitialLoad.loadImages($preloadedContent, loaderTimeout, contentLoaded, $preloadContainer, 50);
            };
            bgImg.src = 'images/page1.jpg'; // Genesis background image
        });
    },
    
    // Load images and display content
    loadImages: function($preloadedContent, loaderTimeout, contentLoaded, $preloadContainer, startPercent) {
        startPercent = startPercent || 60;
        var $images = $preloadedContent.find('img');
        var imagesToLoad = $images.length;
        var imagesLoaded = 0;
        
        if (imagesToLoad === 0) {
            LoadingUtils.update(100);
            InitialLoad.displayContent($preloadedContent, loaderTimeout, contentLoaded, $preloadContainer);
        } else {
            var percentPerImage = (100 - startPercent) / imagesToLoad;
            
            $images.each(function () {
                var $img = $(this);
                if (this.complete) {
                    imageLoaded();
                } else {
                    $img.on('load error', imageLoaded);
                }
            });
            
            function imageLoaded() {
                imagesLoaded++;
                var targetPercent = startPercent + (imagesLoaded / imagesToLoad) * (100 - startPercent);
                LoadingUtils.update(Math.min(targetPercent, 100));
                
                if (imagesLoaded >= imagesToLoad) {
                    LoadingUtils.update(100);
                    InitialLoad.displayContent($preloadedContent, loaderTimeout, contentLoaded, $preloadContainer);
                }
            }
        }
    },
    
    // Display the loaded content
    displayContent: function($preloadedContent, loaderTimeout, contentLoaded, $preloadContainer) {
        contentLoaded = true;
        clearTimeout(loaderTimeout);
        LoadingUtils.update(100);
        
        var $pc = $('#page-content');
        setTimeout(function() {
            $pc.find('.loaderContainer').remove();
            
            // Remove any existing fade-in-wrap
            var $existingFadeIn = $('#fade-in-wrap');
            if ($existingFadeIn.length) {
                $existingFadeIn.children().unwrap();
            }
            
            // Clear page content
            $pc.empty();
            
            // Remove header from preloaded content
            $preloadedContent.find('#topHeader').remove();
            
            // Make content visible
            $preloadedContent.css('visibility', 'visible');
            
            // Append content
            $pc.append($preloadedContent);
            
            // Get the content we just appended
            var $new = $pc.children();
            if ($new.length > 0) {
                FadeUtils.fadeInContent($new);
            }
            
            $preloadContainer.remove();
        }, 100);
    }
};
