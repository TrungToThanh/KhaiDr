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
        script.src = "https://embed.tawk.to/67b880affe30aa19100e1db6/1ikkbdbvs";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        document.body.appendChild(script);
      }
    }
  }, []);

  return null;
};

export default TawkToChat;
