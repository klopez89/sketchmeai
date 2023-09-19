function loadScriptsForPage(page) {
    var scripts = [
        "https://code.jquery.com/jquery-3.6.0.min.js",
        "../node_modules/tw-elements/dist/js/tw-elements.umd.min.js",
        "/js/helpers/constants.js",
        "/js/helpers/shared_templates.js",
        `/js/pages/${page}/${page}_template.js`, 
        `/js/pages/${page}/${page}_page.js`
    ];
    scripts.forEach(script => {
        var s = document.createElement('script');
        s.src = script + '?v=' + new Date().getTime();
        document.body.appendChild(s);
    });
}

function loadStylesForPage(page) {
    var styles = [
        "/css/output.css",
        "/css/general.css",
        `/css/${page}.css`,
    ];
    styles.forEach(style => {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = style + '?v=' + new Date().getTime();
        document.head.appendChild(link);
    });
}