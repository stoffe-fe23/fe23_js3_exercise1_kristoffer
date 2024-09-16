
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
    if ((event.target.tagName == "LI") && (event.target.dataset.destination !== undefined)) {
        history.pushState({ page: event.target.dataset.destination }, '', event.target.dataset.destination);
        loadPage(event.target.dataset.destination);
    }
});

// Load sub-page content of the specified page
async function loadPage(pagename) {
    try {
        if (pagename && pagename.length) {
            const result = await fetch(`parts/${pagename}.html`);
            const response = await result.text();
            document.querySelector("#content").innerHTML = response;
        }
    }
    catch (error) {
        console.error("Error loading page fragment", error);
    }
}