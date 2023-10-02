import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datetime = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");
let countdownInterval;
let beforeDays = document.querySelector("span.value[data-days]");
let beforeHour = document.querySelector("span.value[data-hours]");
let beforeMinute = document.querySelector("span.value[data-minutes]");
let beforeSecond = document.querySelector("span.value[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  minDate: "today",
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Report.failure(
        "Error",
        "Please choose a date in the future",
        "Close"
      );
      datetime.value = "";
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const datePicker = flatpickr("#datetime-picker", options);
startButton.addEventListener("click", () => {
    
    let milliseconds = new Date(datetime.value);
    milliseconds = milliseconds.getTime();


  countdownInterval = setInterval(() => {
    const nowTime = new Date();
    const nowTimeM = nowTime.getTime();
    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = Math.floor(ms / day);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      return { days, hours, minutes, seconds };
    }
    const time = convertMs(milliseconds - nowTimeM);

    beforeDays.textContent = modifyDate(time.days, 2);
    beforeHour.innerHTML = modifyDate(time.hours, 2);
    beforeMinute.innerHTML = modifyDate(time.minutes, 2);
    beforeSecond.textContent = modifyDate(time.seconds, 2);
  }, 1000);
});

function modifyDate(num, totalLength) {
  return String(num).padStart(totalLength, "0");
}
