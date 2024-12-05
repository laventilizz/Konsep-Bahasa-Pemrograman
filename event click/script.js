const button = document.getElementById('changeText');
const text = document.getElementById('text');

button.addEventListener('click', function () {
  text.style.color = "blue";
});

const button1 = document.createElement("button");
button1.textContent = "Hover Me!";
document.body.insertBefore(button1, document.getElementById("hoverText"));

button1.addEventListener("mouseover", () => {
    document.getElementById("hoverText").textContent = "Mouse is over the button!";
});
button1.addEventListener("mouseout", () => {
    document.getElementById("hoverText").textContent = "Hover over this text!";
});