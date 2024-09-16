
let busyIndicatorDelayTimer = null;

// Front page is loaded by default
loadPage("home");


// Load page content when navigating browser history
window.addEventListener("popstate", (event) => {
    loadPage(event.state.page);
});

// Load specific sub-page if URL contains a page parameter
window.addEventListener("load", (event) => {
    const page = new URLSearchParams(window.location.search).get("page");
    if (page && page.length) {
        loadPage(page);
    }
});

// Menu bar click events
document.querySelector("nav > ul").addEventListener("click", (event) => {
    if ((event.target.tagName == "BUTTON") && (event.target.dataset.destination !== undefined)) {
        history.pushState({ page: event.target.dataset.destination }, '', event.target.dataset.destination);
        loadPage(event.target.dataset.destination);
    }
});

// Load sub-page content of the specified page
async function loadPage(pagename) {
    try {
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