function PlaceholderImageStr() {
	return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
}

function getCurrentPageUrlWithoutQueryParams() {
    var url = window.location.href;
    return url.split('?')[0];
}

function hasDevSubdomain() {
    var url = window.location.href;
    var hostname = new URL(url).hostname;
    return hostname.startsWith('dev.');
}
