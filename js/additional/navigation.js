import { loadHTMLAndInitialize } from './html-loader.js';

export function navigateToPage(file) {
    loadHTMLAndInitialize(file, () => {
        if (file === 'menu.html' || file === 'with_bot.html' || file === 'with-player.html') {
            addLogoLink();
        }
        initPageEventListeners();
    });
}

function addLogoLink() {
    const toMainPage = document.createElement("a");
    toMainPage.classList.add("logo");
    toMainPage.href = "menu_all.html";
    loadHTMLAndInitialize("src/img/prism.svg", (html) => {
        toMainPage.innerHTML = html;
    });
    document.body.appendChild(toMainPage);
}
