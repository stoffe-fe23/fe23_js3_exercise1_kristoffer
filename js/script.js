

loadPage("home");

window.addEventListener('popstate', (event) => {
    loadPage(event.state.page);
});


const navBar = document.querySelector("nav");
if (navBar) {
    navBar.addEventListener("click", (event) => {
        history.pushState({ page: event.target.dataset.destination }, '', event.target.dataset.destination);
        loadPage(event.target.dataset.destination);
    });
}

async function loadPage(pagename) {
    const result = await fetch(`parts/${pagename}.html`);
    const response = await result.text();
    document.querySelector("#content").innerHTML = response;
}