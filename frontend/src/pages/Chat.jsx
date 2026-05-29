import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import ChatMessage from "../components/ChatMessage";

import ChatInput from "../components/ChatInput";

import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [chat, setChat] = useState([]);

  const [conversations, setConversations] =
    useState([]);

  const [activeChat, setActiveChat] =
    useState("");

  const chatEndRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  // Create initial chat
  useEffect(() => {
    const firstChat = {
      id: uuidv4(),
      title: "New Chat",
      messages: [],
    };

    setConversations([firstChat]);

    setActiveChat(firstChat.id);
  }, []);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  // Load selected conversation
  useEffect(() => {
    const currentConversation =
      conversations.find(
        (c) => c.id === activeChat
      );

    if (currentConversation) {
      setChat(
        currentConversation.messages
      );
    }
  }, [activeChat, conversations]);

  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    // Update title automatically
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeChat &&
        conv.title === "New Chat"
          ? {
              ...conv,
              title:
                currentMessage.slice(
                  0,
                  25
                ) + "...",
            }
          : conv
      )
    );

    const userMessage = {
      role: "user",
      text: currentMessage,
    };

    const updatedMessages = [
      ...chat,
      userMessage,
    ];

    setChat(updatedMessages);

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeChat
          ? {
              ...conv,
              messages:
                updatedMessages,
            }
          : conv
      )
    );

    setMessage("");

    setLoading(true);

    try {
      const res = await axios.post(
        "https://mern-ai-chatbot-s725.onrender.com",
        {
          message: currentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiText = res.data.reply;

      let streamedText = "";

      for (
        let i = 0;
        i < aiText.length;
        i++
      ) {
        streamedText += aiText[i];

        await new Promise((resolve) =>
          setTimeout(resolve, 10)
        );

        const streamedMessages = [
          ...updatedMessages,
          {
            role: "ai",
            text: streamedText,
          },
        ];

        setChat(streamedMessages);

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeChat
              ? {
                  ...conv,
                  messages:
                    streamedMessages,
                }
              : conv
          )
        );
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // Create new chat
  const createNewChat = () => {
    const newChat = {
      id: uuidv4(),
      title: "New Chat",
      messages: [],
    };

    setConversations((prev) => [
      newChat,
      ...prev,
    ]);

    setActiveChat(newChat.id);

    setChat([]);
  };

  // Delete chat
  const deleteChat = (id) => {
    const filtered =
      conversations.filter(
        (chat) => chat.id !== id
      );

    setConversations(filtered);

    if (filtered.length > 0) {
      setActiveChat(filtered[0].id);
    } else {
      createNewChat();
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="h-screen flex bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Navbar logout={logout} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {chat.map((msg, index) => (
            <ChatMessage
              key={index}
              msg={msg}
            />
          ))}

          {loading && (
            <div className="text-slate-400">
              AI is typing...
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;