
export function loadHTML(filename, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", filename);
    xhr.onload = () => {
        callback(xhr.response);
    }
    xhr.send();
}

export function callback(html) {
    document.body.innerHTML = html;
}

export function loadToMainPageLink() {
    let toMainPage = document.createElement("a");
    toMainPage.classList.add("logo");
    toMainPage.href = "menu_all.html"; // Меняем на переход на новую страницу
    loadHTML("src/img/prism.svg", (html) => {
        toMainPage.innerHTML = html;
    });
    document.body.appendChild(toMainPage);
}