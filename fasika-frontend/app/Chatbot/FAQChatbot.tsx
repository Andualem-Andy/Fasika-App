"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import { Send, MessageCircle, X } from "lucide-react";
import faqData from "@/app/Chatbot/faqData"; // Ensure this path is correct

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface FAQChatbotProps {
  botName?: string;
}

export function FAQChatbot({ botName = "Betty" }: FAQChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Memoize the Fuse instance to prevent recreating it on every render
  const fuse = useMemo(() => new Fuse(faqData, {
    keys: [
      { name: "question", weight: 0.7 },
      { name: "answer", weight: 0.3 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 3,
    ignoreFieldNorm: true,
    shouldSort: true,
  }), []);

  // Scroll to the bottom of the chat window when messages update
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Show a welcome message when the chat opens
  const showWelcomeMessage = useCallback(() => {
    if (isChatOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          sender: "bot",
          text: `Hi! I'm ${botName}, your assistant. How can I help you today?`,
        }]);
      }, 500);
    }
  }, [isChatOpen, messages.length, botName]);

  useEffect(() => {
    showWelcomeMessage();
  }, [showWelcomeMessage]);

  // Handle sending a message
  const handleSendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: inputText }]);
    setInputText("");
    setIsBotTyping(true);

    const searchResults = fuse.search(inputText);

    setTimeout(() => {
      if (searchResults.length > 0) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: searchResults[0].item.answer },
        ]);
      } else {
        const fallbackResponses = [
          "I'm sorry, I couldn't find an answer to that question.",
          "Could you rephrase your question?",
          "That's an interesting question! Let me look into that.",
        ];
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
          },
        ]);
      }
      setIsBotTyping(false);
    }, 1000);
  }, [inputText, fuse]); // Added fuse to the dependency array

  // Handle closing the chat
  const handleCloseChat = useCallback(() => {
    setShowClearConfirm(true);
  }, []);

  // Handle clearing the chat
  const handleClearChat = useCallback(() => {
    setMessages([]);
    setIsChatOpen(false);
    setShowClearConfirm(false);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="rounded-full w-12 h-12 bg-green-800 text-white flex items-center justify-center shadow-lg hover:bg-green-900 transition-shadow"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-[380px] max-h-[500px] bg-white shadow-lg border rounded-lg flex flex-col">
          {/* Header */}
          <div className="p-3 bg-green-800 text-white flex justify-between items-center rounded-t-lg">
            <span>{botName} - Your Assistant</span>
            <button onClick={handleCloseChat} className="text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2"
            style={{ maxHeight: "350px" }}
            ref={chatWindowRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-green-800 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isBotTyping && <div className="text-gray-500">Betty is typing...</div>}
          </div>

          {/* Card Modal for Clear Confirmation */}
          {showClearConfirm ? (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border rounded-lg p-4 w-[90%] max-w-[320px]">
              <p className="text-gray-800 text-sm font-medium text-center">
                All messages in the chat will be cleared.
                Would you like to clear this conversation?
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearChat}
                  className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            /* Input Box */
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}