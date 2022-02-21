import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.querySelector('.form').addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const refs = {
    // form: document.querySelector('.form'),
    firstDelay: Number(document.querySelector('input[name="delay"]').value),
    delayStep: Number(document.querySelector('input[name="step"]').value),
    amount: Number(document.querySelector('input[name="amount"]').value),
  }

  let {
    firstDelay,
    delayStep,
    amount,
  } = refs;

  let delayCalc = firstDelay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayCalc)
      .then(( { position, delay } ) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log('Fulfill');
      })
  
      .catch(( { position, delay } ) => {
        (Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
        // console.log('Reject');
      });
    delayCalc += delayStep;
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          // Fulfill
          resolve({ position, delay });
        } else {
          // Reject
          reject({ position, delay });
        }
      }, delay)
  });
}

// 2000 3000 4 
// 1 - 2000
// 2 - 5000
// 3 - 8000
// 4 - 11000