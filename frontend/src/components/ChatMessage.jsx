import ReactMarkdown from "react-markdown";

import {
  FaRobot,
  FaUser,
} from "react-icons/fa";

function ChatMessage({ msg }) {
  return (
    <div
      className={`flex mb-6 ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[75%] ${
          msg.role === "user"
            ? "flex-row-reverse"
            : ""
        }`}
      >
        <div
          className={`p-3 rounded-full h-fit ${
            msg.role === "user"
              ? "bg-blue-600"
              : "bg-slate-700"
          }`}
        >
          {msg.role === "user" ? (
            <FaUser />
          ) : (
            <FaRobot />
          )}
        </div>

        <div
          className={`p-4 rounded-2xl text-white leading-7 break-words overflow-hidden ${
            msg.role === "user"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          <ReactMarkdown>
            {msg.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;