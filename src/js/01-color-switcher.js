const start = document.querySelector("button[data-start]");
const stop = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
let interval = null;
const disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const onClick = () => {
    start.disabled = disabled;
    interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};
start.addEventListener("click", onClick);

stop.addEventListener("click", () => {
    clearInterval(interval);
    start.disabled = !disabled;
});