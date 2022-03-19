export const debounce = (fn: Function, delay: number = 500) => {
  let timer: number;
  return function() {
    timer && clearTimeout(timer);
    const arg = [...arguments];
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  }
}

export const getImageUrl = (src: string) => {
  return new URL(src, import.meta.url).href
}