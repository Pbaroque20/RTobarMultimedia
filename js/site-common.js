/**
 * Shared utilities for TobarMediaDesign fragments (session, narrative, connect, genesis, genoma).
 * Load this script from index.html so it is available when fragments are injected.
 * Depends on: jQuery, window.navigateTo (provided by index.html).
 */
var SiteUtils = (function () {
    'use strict';

    var NAV_PAGES = {
        genesis: { url: 'genesis.html', bg: '#F5E10E' },
        session: { url: 'session.html', bg: '#1D5F89' },
        narrative: { url: 'narrative.html', bg: '#0E1037' },
        connect: { url: 'connect.html', bg: '#EA0C94' },
        genoma: { url: 'genoma.html', bg: '#3B002B' }
    };

    function updateCopyrightYear(selector) {
        var el = selector ? $(selector) : $('#copyright-year');
        if (el.length) el.text('©' + new Date().getFullYear());
    }

    /**
     * Bind nav links (.genesis, .session, .narrative, .connect) to navigateTo.
     * Call from each fragment's document.ready. No-op if navigateTo is not defined.
     */
    function initNavLinks() {
        if (typeof window.navigateTo !== 'function') return;
        $.each(NAV_PAGES, function (key, config) {
            if (key === 'genoma') return; // genoma uses .genoma-back-link, not .genoma
            $('.' + key).on('click', function (e) {
                e.preventDefault();
                window.navigateTo(config.url, config.bg);
            });
        });
    }

    /**
     * Clamp window scroll so the user cannot scroll past the bottom of $stopElement.
     * Use for genesis (#visit) and connect (#contact_form). Session uses custom logic.
     * @param {jQuery} $stopElement - Element that defines the scroll limit (e.g. $('#visit'))
     */
    function scrollClamp($stopElement) {
        if (!$stopElement || !$stopElement.length) return;
        function getMaxScrollY() {
            var rect = $stopElement[0].getBoundingClientRect();
            return rect.bottom + window.scrollY - window.innerHeight;
        }
        function clamp() {
            var maxY = getMaxScrollY();
            if (maxY > 0 && window.scrollY > maxY) window.scrollTo(0, maxY);
        }
        $(window).on('scroll.scrollclamp resize.scrollclamp', clamp);
    }

    return {
        updateCopyrightYear: updateCopyrightYear,
        initNavLinks: initNavLinks,
        scrollClamp: scrollClamp,
        NAV_PAGES: NAV_PAGES
    };
})();
