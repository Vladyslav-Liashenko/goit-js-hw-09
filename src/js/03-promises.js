import Notiflix from "notiflix";
const submitBtn = document.querySelector('button[type="submit"]');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const delay = +delayInput.value;
  const step = +stepInput.value;
  const amount = +amountInput.value;

  function createSinglePromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  const promises = [];

  for (let i = 1; i <= amount; i++) {
    promises.push(createSinglePromise(i, delay + (i - 1) * step));
  }

  Promise.all(promises.map((p) => p.catch((e) => e))).then((results) => {
    results.forEach(({ position, delay }) => {
      if (delay instanceof Error) {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay.position}ms`
        );
      } else {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      }
    });
  });
});

