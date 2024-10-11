import { useState, useEffect, useCallback, useMemo } from "react";
import { IUseWebShareResult, IWebShareData } from "./types";

export const useWebShare = (shareData: IWebShareData): IUseWebShareResult => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let available = false;

    const methodsAvailable =
      typeof navigator.share === "function" && navigator.canShare !== undefined;

    if (methodsAvailable) {
      // We need put the data object in the canShare method to check if the browser supports the Web Share API with exactly the same data
      // So we can provide similar data to the share method to get availability of the share method
      available = navigator.canShare(shareData);
    }
    setIsAvailable(available);
  }, [shareData]);

  const share = useCallback(async () => {
    if (!isAvailable) {
      setError("Web Share API is not available or disabled.");
      return;
    }

    setIsSharing(true);
    try {
      await navigator.share(shareData);
    } catch (err) {
      setError((err as Error)?.message);
    } finally {
      setIsSharing(false);
    }
  }, [isAvailable, shareData]);

  return useMemo(
    () => ({
      isAvailable,
      share,
      isSharing,
      isError: !!error,
      error,
    }),
    [isAvailable, share, isSharing, error]
  );
};
