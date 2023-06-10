function fibonacci(n: number): number {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

const doFib = (iterations: number) =>
  new Promise((resolve) => {
    const start = Date.now();
    const result = fibonacci(iterations);
    console.log(`doFib done in ${Date.now() - start}ms`);
    resolve(result);
  });

const main = async () => {
  const start = Date.now();
  const values = await Promise.all(
    Array(10)
      .fill(0)
      .map((v) => doFib(40))
  );
  console.log('values', values);
  console.log(`fib done in ${Date.now() - start}ms`);
};

main().catch(console.error);

export default {};
