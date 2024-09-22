let busyIndicatorDelayTimer = null;
let [urlPage, urlParams] = reloadPageInfo();

// Load subpage content when navigating browser history
window.addEventListener("popstate", (event) => {
    [urlPage, urlParams] = reloadPageInfo();
    loadPage(event.state && event.state.page && event.state.page.length ? event.state.page : urlPage);
});

// Load specific sub-page content if URL contains a fragment, otherwise load front page. 
window.addEventListener("load", (event) => {
    [urlPage, urlParams] = reloadPageInfo();
    if (urlPage && urlPage.length) {
        loadPage(urlPage);
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
        [urlPage, urlParams] = reloadPageInfo();
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

// Load sub-page name and any parameters into globals
function reloadPageInfo() {
    let [hash, search] = window.location.hash.split("?");
    return [hash.substring(1), new URLSearchParams(search ?? "")];
}