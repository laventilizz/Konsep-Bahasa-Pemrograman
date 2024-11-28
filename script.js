const div = document.getElementsByTagName("div")
div[0].style.backgroundColor = "pink"
div[1].style.backgroundColor = "black"

const link = document.querySelector("#a a")
link.setAttribute("href", "https://www.google.com")

const list = document.querySelectorAll("li")
list.forEach((item, index) => {
  item.textContent = `List Baru ${index + 1}`;
  item.style.backgroundColor = "Maroon"
  item.style.color = "white"
  item.style.fontSize = "20px" 
}); 