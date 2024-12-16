import {useState} from "react";
import {toast} from "react-toastify";

type Props = {
  enableErrorToast?: boolean
}

export default function useHandleRequest({enableErrorToast = true}: Props = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null>(null);

  const run = async (asyncCallback: () => Promise<void>, errorCallback?: () => void) => {
    try {
      setIsLoading(true);
      setError(null);
      await asyncCallback();
    } catch (error) {
      setError(error);
      if(errorCallback) errorCallback()
      if(enableErrorToast) toast.error(error.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { run, isLoading, setIsLoading, error };
}