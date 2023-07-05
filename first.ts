function randomBetween(start: number, end: number) {
  // Calculate the range by adding 1 to the difference between end and start
  const range = end - start + 1;

  // Generate a random number between 0 and range
  const randomNumber = Math.floor(Math.random() * range);

  // Add the random number to the start to get a number within the desired range
  const result = start + randomNumber;

  return result;
}

console.log(randomBetween(1, 10));
