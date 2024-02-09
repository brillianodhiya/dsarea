// hooks/useFullScreen.ts

import { useState, useEffect } from "react";

const useFullScreen = (): boolean => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return isFullScreen;
};

export default useFullScreen;
