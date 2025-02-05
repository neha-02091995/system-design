type CallbackFunction = (value: string) => void
export const useDebounce =(callbackFn: CallbackFunction, delay: number) => {

  let timer: NodeJS.Timeout;

  return  (value: string) => {
    console.log(timer)
    if (timer) {
       clearTimeout(timer);
    }
    timer = setTimeout(()=>{
        console.log("calling 1")
        callbackFn(value)
    }, delay);
  };
};
