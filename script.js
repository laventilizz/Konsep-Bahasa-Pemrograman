const div = document.getElementById("container1")
div.style.backgroundColor = "Pink"

const div2 = document.getElementById("container2")
div2.style.backgroundColor = "Magenta"

const link = document.querySelector("#a a")
link.setAttribute("href", "https://www.google.com")

const list = document.querySelectorAll(".list")
list.forEach((item, index) => {
  item.textContent = `List Baru ${index + 1}`;
});