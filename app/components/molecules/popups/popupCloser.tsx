import { useEffect } from "react";

const useHistoryBackHandler = (handleClose:any) => {
  console.log("closer popup")
  useEffect(() => {
    const handlePopState = () => {
      document.body.style.overflow = "scroll";
      handleClose ? handleClose() : "";
      window.history.replaceState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pushHistory = () => {
    // window.history.pushState("reqCallModal", "");
    window.history.pushState(null, "", window.location.href);
  };

  return pushHistory;
};


export default useHistoryBackHandler;
