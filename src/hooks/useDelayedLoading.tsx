import { useEffect, useState } from "react";

/**
 * Helper hook for delaying truthy state of loading flags.
 * This helps to show the loading state for longer time and avoid UI flashes.
 */
const useDelayedLoading = (isLoaded: boolean, delayMs = 2000): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [delayMs]);

  return isReady && isLoaded;
};

export default useDelayedLoading;
