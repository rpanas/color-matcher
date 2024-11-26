export function initDelayExecution() {

  let timerId: NodeJS.Timeout | null = null;

  return (fun: () => void, delay = 100) => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    timerId = setTimeout(fun, delay);

  }
}

export default initDelayExecution();
