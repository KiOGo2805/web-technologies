const listItems = document.querySelectorAll('ul li');

if (listItems.length > 0) {
    listItems[0].textContent = "Hello world!";
}

const button = document.getElementById('action-button');

button.ondblclick = function() {
    console.error("Степан");
};