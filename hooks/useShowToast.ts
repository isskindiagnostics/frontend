import { useState, useEffect } from "react";

export function useShowToast(duration = 5000) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;

    const timeout = setTimeout(() => {
      setShowToast(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [showToast, duration]);

  return [showToast, setShowToast] as const;
}
