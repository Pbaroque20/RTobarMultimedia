/**
 * Page-specific handlers for post-load animations and effects
 */

var PageHandlers = {
    // Handle connect page animations
    handleConnectPage: function($container) {
        var $chatbubbles = $container.find('#chatbubble, #chatbubble2, #chatbubble3, #chatbubble4, #chatbubble5, #chatbubble6');
        if ($chatbubbles.length === 0) return;
        
        // Remove premature animation classes
        $chatbubbles.removeClass('chatbubble_animate chatbubble2_animate chatbubble3_animate chatbubble4_animate chatbubble5_animate chatbubble6_animate');
        
        // Trigger animations after fade-in
        AnimationUtils.triggerChatBubbles($container, 50);
    },
    
    // Handle session page animations
    handleSessionPage: function($container) {
        // Trigger scrambling effect after fade-in completes
        AnimationUtils.initWorkimgScrambling($container);
    },
    
    // Handle page-specific post-load effects
    handlePageEffects: function(url, $container) {
        var pageType = NavigationUtils.getPageType(url);
        
        if (pageType.isConnect) {
            this.handleConnectPage($container);
        } else if (pageType.isSession) {
            this.handleSessionPage($container);
        }
    }
};
