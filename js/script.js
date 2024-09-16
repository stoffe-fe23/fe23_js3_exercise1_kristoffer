
// Front page is loaded by default
loadPage("home");

// Load page content when navigating browser history
window.addEventListener('popstate', (event) => {
    loadPage(event.state.page);
});

// Menu bar click events
document.querySelector("nav").addEventListener("click", (event) => {
    history.pushState({ page: event.target.dataset.destination }, '', event.target.dataset.destination);
    loadPage(event.target.dataset.destination);
});

// Load sub-page content of the specified page
async function loadPage(pagename) {
    const result = await fetch(`parts/${pagename}.html`);
    const response = await result.text();
    document.querySelector("#content").innerHTML = response;
}