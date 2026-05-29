function ChatInput({
  message,
  setMessage,
  sendMessage,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-slate-800 flex gap-3 bg-slate-900">
      <input
        type="text"
        placeholder="Ask anything..."

        value={message}

        onChange={(e) =>
          setMessage(e.target.value)
        }

        onKeyDown={handleKeyDown}

        className="flex-1 p-4 rounded-xl bg-slate-800 text-white outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl text-white"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;