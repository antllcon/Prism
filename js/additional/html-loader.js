export function loadHTMLAndInitialize(filename, callback = () => {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", filename);
        xhr.onload = () => {
            document.body.innerHTML = xhr.response;
            callback();
            resolve();
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}
