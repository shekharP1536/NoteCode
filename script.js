function showMessage(message) {
    var messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
    messageElement.style.display = "block";
    setTimeout(function () {
        messageElement.innerHTML = '';
        messageElement.style.display = "none";
    }, 3000);
}
window.addEventListener("load", () =>{
showMessage("Welcome!");
});

function demo() {
    let e = document.getElementById("edit").childElementCount;
    console.log(e);
    showMessage(e)
}
document.getElementById("theme-selector").addEventListener("change", switchTheme)
function switchTheme(theme) {
    const themeLink = document.getElementById("theme-link");
    themeLink.href = `${theme}.css`;
    showMessage(`${theme}`);
    localStorage.setItem("theme", theme);
}
const themeSelector = document.getElementById("theme-selector");
themeSelector.addEventListener("change", () => switchTheme(themeSelector.value));
themeSelector.value = "default-theme";
switchTheme(themeSelector.value);