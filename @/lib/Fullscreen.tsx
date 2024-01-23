import { useState, useEffect } from "react";

// Custom hook untuk mengatur fullscreen mode
const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fungsi untuk masuk ke fullscreen mode
  const enterFullscreen = (element: {
    requestFullscreen: () => void;
    webkitRequestFullscreen: () => void;
    mozRequestFullScreen: () => void;
    msRequestFullscreen: () => void;
  }) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  // Fungsi untuk keluar dari fullscreen mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  // Fungsi untuk toggle fullscreen mode
  const toggleFullscreen = (element: any) => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen(element);
    }
  };

  // Effect untuk menghapus event listener saat komponen unmount
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        document.fullscreenElement ||
        document.fullscreenElement ||
        document.fullscreenElement;
      if (fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
};

export default useFullscreen;
