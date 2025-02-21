"use client";
import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingScript = document.getElementById("tawk-script");

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "tawk-script";
        script.async = true;
        script.src = "https://embed.tawk.to/67b7f4a59d0131190fa8b7ad/1ikj97a14";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        document.body.appendChild(script);
      }
    }
  }, []);

  return null;
};

export default TawkToChat;
