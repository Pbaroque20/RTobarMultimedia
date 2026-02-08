/**
 * Utility functions for RTobarMultimedia site
 */

// Suppress font glyph bbox warnings
(function() {
    var originalWarn = console.warn;
    console.warn = function() {
        var message = arguments[0];
        if (typeof message === 'string' && (
            message.indexOf('downloadable font: Glyph bbox was incorrect') !== -1 ||
            message.indexOf('Glyph bbox was incorrect') !== -1
        )) {
            return;
        }
        originalWarn.apply(console, arguments);
    };
})();

// Preload utilities
var PreloadUtils = {
    // Preload loader GIFs
    preloadLoaders: function() {
        var blackLoader = new Image();
        blackLoader.src = 'loader/black_loader.gif';
        var whiteLoader = new Image();
        whiteLoader.src = 'loader/white_loader.gif';
    },
    
    // Preload fonts
    preloadFonts: function() {
        var fonts = [
            { href: 'fonts/Univers.woff', type: 'font/woff' },
            { href: 'fonts/Univers-Oblique.woff', type: 'font/woff' }
        ];
        
        fonts.forEach(function(font) {
            var link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = font.type;
            link.crossOrigin = 'anonymous';
            link.href = font.href;
            document.head.appendChild(link);
        });
    },
    
    // Preload page background images
    preloadPageBackground: function(url, targetPercent, callback) {
        var backgroundImages = {
            'genesis.html': 'images/page1.jpg',
            'narrative.html': 'images/page3.jpg',
            'connect.html': 'images/page4.jpg',
            'session.html': 'images/page2.jpg',
            'genoma.html': 'expansion/images/expansion_wires.png'
        };
        
        var backgroundImage = null;
        
        for (var key in backgroundImages) {
            if (url.indexOf(key) !== -1) {
                backgroundImage = backgroundImages[key];
                break;
            }
        }
        
        if (!backgroundImage) {
            LoadingUtils.update(targetPercent);
            if (callback) callback();
            return;
        }
        
        var img = new Image();
        img.onload = function() {
            LoadingUtils.update(targetPercent);
            if (callback) callback();
        };
        img.onerror = function() {
            LoadingUtils.update(targetPercent);
            if (callback) callback();
        };
        img.src = backgroundImage;
    },
    
    // Preload session workimg images
    preloadSessionImages: function(callback) {
        var imageSources = [
            'images/birth.png',
            'images/ances.png',
            'images/contactus2.png',
            'images/30min.png',
            'images/contactus2gameplay.png',
            'images/beaver.png',
            'images/essence.png',
            'images/experi.png',
            'images/fish.png',
            'images/ford.png',
            'images/lifeisjazz.png',
            'images/M.png',
            'images/mirror.png',
            'images/2020.png',
            'images/rw.png',
            'images/2020eledonkey.png',
            'images/surgeons.png',
            'images/vaniads.png',
            'images/logodesigns.png',
            'images/gelfenstein.png'
        ];
        
        var imagesToLoad = imageSources.length;
        var imagesLoaded = 0;
        var startPercent = 60;
        var percentPerImage = (100 - startPercent) / imagesToLoad;
        
        if (imagesToLoad === 0) {
            if (callback) callback();
            return;
        }
        
        imageSources.forEach(function(src) {
            var img = new Image();
            img.onload = function() {
                imagesLoaded++;
                var targetPercent = startPercent + (imagesLoaded / imagesToLoad) * (100 - startPercent);
                LoadingUtils.update(Math.min(targetPercent, 100));
                
                if (imagesLoaded >= imagesToLoad) {
                    LoadingUtils.update(100);
                    if (callback) callback();
                }
            };
            img.onerror = function() {
                imagesLoaded++;
                var targetPercent = startPercent + (imagesLoaded / imagesToLoad) * (100 - startPercent);
                LoadingUtils.update(Math.min(targetPercent, 100));
                
                if (imagesLoaded >= imagesToLoad) {
                    LoadingUtils.update(100);
                    if (callback) callback();
                }
            };
            img.src = src;
        });
    }
};

// Animation utilities
var AnimationUtils = {
    // Trigger chat bubble animations for connect page
    triggerChatBubbles: function($container, delay) {
        delay = delay || 50;
        setTimeout(function() {
            var $chatbubbles = $container.find('#chatbubble, #chatbubble2, #chatbubble3, #chatbubble4, #chatbubble5, #chatbubble6');
            if ($chatbubbles.length > 0) {
                // Remove premature animation classes
                $chatbubbles.removeClass('chatbubble_animate chatbubble2_animate chatbubble3_animate chatbubble4_animate chatbubble5_animate chatbubble6_animate');
                
                setTimeout(function() {
                    $chatbubbles.css('display', 'block');
                    setTimeout(function() {
                        $container.find('#chatbubble').addClass('chatbubble_animate');
                        $container.find('#chatbubble2').addClass('chatbubble2_animate');
                        $container.find('#chatbubble3').addClass('chatbubble3_animate');
                        $container.find('#chatbubble4').addClass('chatbubble4_animate');
                        $container.find('#chatbubble5').addClass('chatbubble5_animate');
                        $container.find('#chatbubble6').addClass('chatbubble6_animate');
                    }, 50);
                }, delay);
            }
        }, delay);
    },
    
    // Initialize scrambled brightness effect for session workimgs
    initWorkimgScrambling: function($container) {
        if (sessionStorage.getItem('sessionScramblingShown')) {
            return;
        }
        
        // Wait for fade-in transition to complete (350ms) + small buffer
        setTimeout(function() {
            var $workimgs = $container.find('.workimg');
            if ($workimgs.length === 0) return;
            
            // Set transition for smooth blinking
        $workimgs.css({
            '-webkit-transition': 'filter 0.15s ease',
            '-moz-transition': 'filter 0.15s ease',
            '-ms-transition': 'filter 0.15s ease',
            '-o-transition': 'filter 0.15s ease',
            'transition': 'filter 0.15s ease'
        });
        
        // Blink effect: change brightness multiple times during 1 second
        var blinkInterval = setInterval(function() {
            $workimgs.each(function() {
                var randomBrightness = 0.3 + Math.random() * 1.5;
                $(this).css({
                    '-webkit-filter': 'brightness(' + randomBrightness + ')',
                    '-moz-filter': 'brightness(' + randomBrightness + ')',
                    '-ms-filter': 'brightness(' + randomBrightness + ')',
                    '-o-filter': 'brightness(' + randomBrightness + ')',
                    'filter': 'brightness(' + randomBrightness + ')'
                });
            });
        }, 150);
        
        // After 1 second, stop blinking and animate to normal brightness
        setTimeout(function() {
            clearInterval(blinkInterval);
            $workimgs.css({
                '-webkit-transition': 'filter 0.8s ease',
                '-moz-transition': 'filter 0.8s ease',
                '-ms-transition': 'filter 0.8s ease',
                '-o-transition': 'filter 0.8s ease',
                'transition': 'filter 0.8s ease'
            });
            $workimgs.css({
                '-webkit-filter': 'brightness(1)',
                '-moz-filter': 'brightness(1)',
                '-ms-filter': 'brightness(1)',
                '-o-filter': 'brightness(1)',
                'filter': 'brightness(1)'
            });
            
            setTimeout(function() {
                $workimgs.css({
                    '-webkit-filter': '',
                    '-moz-filter': '',
                    '-ms-filter': '',
                    '-o-filter': '',
                    'filter': '',
                    '-webkit-transition': '',
                    '-moz-transition': '',
                    '-ms-transition': '',
                    '-o-transition': '',
                    'transition': ''
                });
                sessionStorage.setItem('sessionScramblingShown', '1');
            }, 800);
        }, 1000);
        }, 400); // Wait for fade-in transition (350ms) + small buffer
    }
};

// Fade-in utility
var FadeUtils = {
    // Apply fade-in effect to content
    fadeInContent: function($content, callback) {
        // Remove any existing fade-in-wrap
        var $existingFadeIn = $('#fade-in-wrap');
        if ($existingFadeIn.length) {
            $existingFadeIn.children().unwrap();
        }
        
        if ($content.length === 0) {
            if (callback) callback();
            return;
        }
        
        // Make content visible
        $content.css('visibility', 'visible');
        
        // Wrap content
        $content.wrapAll('<div id="fade-in-wrap"></div>');
        var $in = $('#fade-in-wrap');
        
        // Set initial opacity and transition
        $in.css({ 'opacity': '0', 'transition': 'opacity 0.35s ease' });
        $in[0].offsetHeight; // Force reflow
        
        // Fade in
        requestAnimationFrame(function() {
            $in.css('opacity', '1');
            if (callback) {
                $in.on('transitionend', function(e) {
                    if (e.originalEvent.propertyName === 'opacity') {
                        $in.off('transitionend');
                        callback();
                    }
                });
            }
        });
    }
};
