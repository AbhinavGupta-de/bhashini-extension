import { useState } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import BhashiniTraslator from "@scaler-school-of-technology/bhashini-web-translator";

const Bhashini = BhashiniTraslator(
  "019a562b7f-bb9c-4440-8b79-11b170353130",
  "48115d2ab7f24c55b8b29af34806050c"
);

function Popup() {
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  const handleSourceLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleTranslateClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        console.log(document.body);
        document.body.style.backgroundColor = "red";
        try {
          const response = await Bhashini.translateDOM(
            document.body,
            "en",
            "hi"
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        const token = jsonwebtoken.sign(
          {
            data: {
              userId: "123",
              name: "John Doe",
              email: "",
            },
          },
          "secret",
          { expiresIn: "1h" }
        );
        console.log(token);

        try {
        } catch (error) {}
      },
    });
  };

  return (
    <div className="language-select-container">
      <h1>Bhashini Translator</h1>
      <label>Translate from:</label>
      <select value={sourceLanguage} onChange={handleSourceLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>

      <label>Translate to:</label>
      <select value={targetLanguage} onChange={handleTargetLanguageChange}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>

      <button onClick={handleTranslateClick}>Translate</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Popup />);
