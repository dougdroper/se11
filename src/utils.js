export function validate(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return /^[a-zA-Z]+$/.test(value) ? resolve() : reject();
    }, 500)
  });
}

export function submit(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return Math.random() < 0.4 || values.one === "error"
        ? reject()
        : resolve();
    }, 1000);
  });
}
