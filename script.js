//your JS code here. If required.
// Define a function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise() {
  return new Promise(resolve => {
    const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1000ms (1s) and 3000ms (3s)
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
}

// Create an array to hold the promises
const promises = [createPromise(), createPromise(), createPromise()];

// Display "Loading..." in the table while promises are pending
document.getElementById('output').innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

// Use Promise.all() to wait for all promises to resolve
Promise.all(promises)
  .then(results => {
    // Remove the "Loading..." text from the table
    document.getElementById('output').innerHTML = '';

    // Iterate through the results and populate the table
    results.forEach((time, index) => {
      const promiseName = `Promise ${index + 1}`;
      const timeInSeconds = (time / 1000).toFixed(3);
      document.getElementById('output').innerHTML += `<tr><td>${promiseName}</td><td>${timeInSeconds}</td></tr>`;
    });

    // Calculate and display the total time taken to resolve all promises
    const totalTime = results.reduce((acc, curr) => acc + curr, 0);
    const totalTimeInSeconds = (totalTime / 1000).toFixed(3);
    document.getElementById('output').innerHTML += `<tr><td>Total</td><td>${totalTimeInSeconds}</td></tr>`;
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
