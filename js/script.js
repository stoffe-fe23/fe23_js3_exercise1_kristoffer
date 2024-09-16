

window.addEventListener('popstate', (event) => {
    loadPage(`parts/${event.state.page}.html`);
});



const navBar = document.querySelector("nav");
if (navBar) {
    navBar.addEventListener("click", (event) => {
        history.pushState({ page: event.target.dataset.destination }, '', event.target.dataset.destination);
        loadPage(`parts/${event.target.dataset.destination}.html`);
    });
}

async function loadPage(pagename) {
    const result = await fetch(pagename);
    const response = await result.text();
    document.querySelector("#content").innerHTML = response;
}