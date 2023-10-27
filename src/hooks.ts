import { useEffect, useState } from "react";

// defiining T helps to make it generic instead of defning types.
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // clear timeout for every userefect call
    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debouncedValue;
};
