import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  submitButton: document.querySelector('button'),
  delay: document.querySelector('input[name="delay"]'.value),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),


}
console.log(refs.submitButton);

refs.submitButton.addEventListener('submit', onFormSubmit);

const firstDelay = 1000;

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('d',refs.delay);


  const amount = 6;
// const delayStep = 2000;
  // setTimeout(() => {
  // setTimeout(() => {

    for (let i = 1; i <= amount; i += 1) {
      createPromise(refs, 500)
        .then(result => console.log('Fulfill'))
        .catch(error => console.log('Reject'));
    }
  // }, delayStep);
  // }, 1000);
  evt.Target.reset();
  
  
  
  
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    // const intervalId = null;

      setTimeout(() => {
        if (shouldResolve) {
          // Fulfill
          resolve(Notify.success(`✅ Fulfilled promise ${position} in ${firstDelay + delay}ms`));
        } else {
          // Reject
          reject(Notify.failure(`❌ Rejected promise ${position} in ${firstDelay + delay}ms`));
        }
      }, delay)
    
  });
}



// return new Promise(function (resolve, reject) {
//   var burger = cookBurger(type)
//   burger.ready = function (err, burger) {
//     if (err) {
//       return reject(Error('Error while cooking'))
//     }
//     return resolve(burger)
//   }
// }

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });




// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }