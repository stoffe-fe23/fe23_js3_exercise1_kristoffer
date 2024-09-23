let busyIndicatorDelayTimer = null;


// Load subpage content when navigating browser history
window.addEventListener("popstate", (event) => {
    reloadPageInfo();
    loadPage(event.state && event.state.page && event.state.page.length ? event.state.page : window.location.spaPage);
});

// Load specific sub-page content if URL contains a fragment, otherwise load front page. 
window.addEventListener("load", (event) => {
    reloadPageInfo();
    if (window.location.spaPage && window.location.spaPage.length) {
        loadPage(window.location.spaPage);
    }
    else {
        history.pushState({ page: "home" }, '', "#home");
        loadPage("home");
    }
});

// Menu bar click events
document.querySelector("nav > ul").addEventListener("click", (event) => {
    if ((event.target.tagName == "BUTTON") && (event.target.dataset.destination !== undefined)) {
        history.pushState({ page: event.target.dataset.destination }, '', "#" + event.target.dataset.destination);
        loadPage(event.target.dataset.destination);
    }
});

// Load page content of the specified subpage
async function loadPage(pagename) {
    try {
        reloadPageInfo();
        if (pagename && pagename.length) {
            toggleBusyIndicator();
            const result = await fetch(`parts/${pagename}.html`);
            if (result.status >= 400)
                throw new Error(`Unable to load the specified page (${result.status}): ${pagename}`);

            const response = await result.text();
            document.querySelector("#content").innerHTML = response;
        }
    }
    catch (error) {
        console.error("loadPage Error: ", error.message);
    }
    finally {
        toggleBusyIndicator(false);
    }
}

// Display indicator to user that the page is busy loading content
// Load must take longer than 250 ms for indicator to appear. 
function toggleBusyIndicator(isBusy = true) {
    clearTimeout(busyIndicatorDelayTimer);
    if (isBusy) {
        busyIndicatorDelayTimer = setTimeout(() => document.querySelector("#loading-indicator").classList.add("show"), 250);
    }
    else {
        document.querySelector("#loading-indicator").classList.remove("show");
    }
}

// Ugly hack to load sub-page name and any parameters into globals. 
// Params are extracted from the end of the hash fragment to make it look more similar to normal urls,
// e.g. http://127.0.0.1/#contact?foo=bar instead of http://127.0.0.1/?foo=bar#contact
function reloadPageInfo() {
    const [page, params] = window.location.hash.split("?");
    window.location.spaPage = page.substring(1);
    window.location.spaSearch = params;
}