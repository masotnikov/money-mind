import {useState} from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...arg) => {
    try {
      setIsloading(true);
      await callback(...arg)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsloading(false);
    }
  }
  return [fetching, isLoading, error]
}