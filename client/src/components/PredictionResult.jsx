import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import "./PredictionResult.css";
import getBaseURL from "../utils/getBaseURL";

const baseURL = getBaseURL();

function PredictionResult() {
  const location = useLocation();
  const { prediction, birthDataStr } = location.state || {};

  const [messages, setMessages] = useState(
    prediction ? [{ text: prediction, sender: "bot" }] : []
  );
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localBirthData, setLocalBirthData] = useState(
    birthDataStr || localStorage.getItem("birthData")
  );

  useEffect(() => {
    if (!localBirthData) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Birth data is missing. Please provide your birth information.",
          sender: "bot",
        },
      ]);
    }
  }, [localBirthData]);

  // Load chat history from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user" },
    ]);
    setInputText("");
    setIsLoading(true);

    try {
      // Send the user's message to the backend
      const response = await axios.post(`${baseURL}/submit`, {
        birth_data: localBirthData,
        question: inputText,
      });

      // Add bot's response to chat
      const botResponse = response.data.prediction;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Failed to get a response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `Error: ${error.response?.data?.error || "Unknown error."}`,
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBirthDataSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Save birth data and clear input
    setLocalBirthData(inputText);
    localStorage.setItem("birthData", inputText);
    setInputText("");

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: "Thank you! Your birth data has been updated. Ask me anything now!",
        sender: "bot",
      },
    ]);
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Chat with BaZi</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} text-start`}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {msg.text}
            </ReactMarkdown>
          </div>
        ))}
      </div>
      <form
        onSubmit={localBirthData ? handleSendMessage : handleBirthDataSubmit}
        className="chat-form"
      >
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder={
            localBirthData
              ? "Message AI Fortune Teller 🔮"
              : "Please provide your birth data..."
          }
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputText.trim()}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default PredictionResult;
