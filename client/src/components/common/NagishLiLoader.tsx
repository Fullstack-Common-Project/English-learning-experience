"use client";
import { useEffect } from "react";

export default function NagishLiLoader() {
  useEffect(() => {
    // Load jQuery first
    const jq = document.createElement("script");
    jq.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jq.async = true;
    document.body.appendChild(jq);

    // Load NagishLi only after jQuery has loaded
    jq.onload = () => {
      const script = document.createElement("script");
      script.src = "/nagishli.js?v=2.3";
      script.async = true;
      document.body.appendChild(script);
    };
  
    // Define global variables for NagishLi
    (window as any).nl_lang = "en";
    (window as any).nl_pos = "bl";
    (window as any).nl_compact = "1";
    (window as any).nl_contact = "n:English-learning-experience";
  }, []);

  return null;
}
