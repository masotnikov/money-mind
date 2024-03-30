import {useState} from "react";
interface FetchingFunction<T> {
  (callback: (...args: any[]) => Promise<T>): [() => Promise<T>, boolean, string];
}

export const useFetching: FetchingFunction<any> = (callback) => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching: () => Promise<any> = async () => {
    try {
      setIsloading(true);
      await callback();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsloading(false);
    }
  };

  return [fetching, isLoading, error];
};