
import React, { useState } from "react";
import aibotimg from "../assets/aibotimg.png";
import user from "../assets/user.png"
import img from "../assets/img.svg"
import submit from "../assets/submit.svg"
const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userFile, setUserFile] = useState({ mime_type: null, data: null });
  const [loading, setLoading] = useState(false);

  const Api_Url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBuwOjFcY8x1ztaBj2gjLMeRncejxs9-r0";

  const generateResponse = async (aiResponseElement, userMessage) => {
    console.log("Sending input to API:", userMessage);

    const RequestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              ...(userMessage ? [{ text: userMessage }] : []),
              ...(userFile?.data ? [{ inline_data: userFile }] : []),
            ],
          },
        ],
      }),
    };

    try {
      setLoading(true);
      const response = await fetch(Api_Url, RequestOption);
      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const apiResponse = data.candidates[0].content.parts[0].text
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .trim();
        console.log("API Response:", apiResponse);

        setTimeout(() => {
          aiResponseElement.innerText = apiResponse;
        }, 200);
      } else {
        throw new Error("No candidates found in the response.");
      }
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        aiResponseElement.innerText = "Error: Unable to fetch response.";
      }, 200);
    } finally {
      setUserFile({ mime_type: null, data: null });
      setLoading(false);
    }
  };

  const createChatBox = (message, isUser, file = null) => {
    return (
      <div
        className={`mt-3 w-full md:w-3/5 flex ${isUser ? "flex-row-reverse ml-auto mb-6" : "mt-4"
          } items-center gap-3`}
      >
        <img
          src={isUser ? user : aibotimg}
          alt="User or AI"
          className="bg-white rounded-full drop-shadow-md"
          style={{ width: 50, height: 50 }}
        />
        <div
          className={`p-4 ${isUser ? "bg-black text-white" : "bg-gray-200"
            }`}
          style={{
            borderRadius: isUser
              ? "40px 0px 40px 40px"
              : "0px 40px 40px 40px",
            boxShadow: "2px 2px 10px black",
          }}
        >
          {message && <div className={isUser ? "" : "ai-chat"}>{message}</div>}
          {file && (
            <img
              src={`data:${file.mime_type};base64,${file.data}`}
              className="chooseimg mt-2"
              alt="uploaded"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          )}
        </div>
      </div>
    );
  };

  const handleChatResponse = (message) => {
    const newChat = {
      message,
      isUser: true,
      file: userFile.data ? userFile : null,
    };
    setChatHistory((prev) => [
      ...prev,
      newChat,
      { message: "Generating Response...", isUser: false },
    ]);

    setTimeout(() => {
      const chatBoxes = document.querySelectorAll(".ai-chat-box");
      const lastChatBox = chatBoxes[chatBoxes.length - 1];

      if (lastChatBox) {
        const aiPlaceholder = lastChatBox.querySelector(".ai-chat");

        if (aiPlaceholder) {
          generateResponse(aiPlaceholder, message);
        } else {
          console.error("AI placeholder not found in the last chat box.");
        }
      } else {
        console.error("No AI chat box found.");
      }
    }, 600);

    setUserFile({ mime_type: null, data: null });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      setUserFile({ mime_type: file.type, data: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = () => {
    if (prompt.trim()) {
      handleChatResponse(prompt.trim());
      setPrompt(""); // Reset prompt after sending
    } else if (userFile.data) {
      handleChatResponse("Image uploaded.");
      setUserFile({ mime_type: null, data: null }); // Clear file input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-black h-[108vh]">
      <div
        className="text-center text-white text-4xl md:text-5xl font-semibold py-4"
        style={{ fontFamily: "Courier New, Courier, monospace" }}
      >
        AI Chatbot
      </div>

      <div className="chat-container w-[95%] md:w-[90%] h-[70vh] md:h-[80vh] bg-white my-4 rounded-3xl mx-auto p-5 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.isUser ? "user-chat-box" : "ai-chat-box"}>
            {createChatBox(chat.message, chat.isUser, chat.file)}
          </div>
        ))}
      </div>

      <div className="input-container mx-auto w-[95%] md:w-[90%] h-[9vh] bg-white rounded-3xl flex flex-wrap items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-blue-50 outline-none w-[70%] md:w-[50%] h-10 rounded-full p-3"
        />
        <button
          id="image"
          className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center overflow-hidden"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {userFile.data ? (
            <img
              src={`data:${userFile.mime_type};base64,${userFile.data}`}
              alt="Uploaded"
              className="h-10 w-10 object-cover"
            />
          ) : (
            <img src={img} alt="icon" className="h-6 w-6" />
          )}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </button>
        <button
          id="submit"
          className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <img src={submit} alt="submit" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
