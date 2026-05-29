import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUser, FaRobot } from "react-icons/fa";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/chat",
        {
          message: currentMessage,
        }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #1e293b",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        AI Chatbot
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                maxWidth: "70%",
                flexDirection:
                  msg.role === "user"
                    ? "row-reverse"
                    : "row",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    msg.role === "user"
                      ? "#2563eb"
                      : "#334155",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              >
                {msg.role === "user" ? (
                  <FaUser />
                ) : (
                  <FaRobot />
                )}
              </div>

              <div
                style={{
                  backgroundColor:
                    msg.role === "user"
                      ? "#2563eb"
                      : "#1e293b",
                  padding: "15px",
                  borderRadius: "15px",
                  lineHeight: "1.5",
                }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              color: "#94a3b8",
            }}
          >
            <FaRobot />
            AI is typing...
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #1e293b",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            backgroundColor: "#1e293b",
            color: "white",
            fontSize: "16px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "15px 25px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;