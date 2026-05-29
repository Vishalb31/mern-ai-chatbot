function Sidebar({
  conversations,
  activeChat,
  setActiveChat,
  createNewChat,
  deleteChat,
}) {
  return (
    <div className="w-72 bg-slate-950 border-r border-slate-800 flex flex-col">
      <button
        onClick={createNewChat}
        className="m-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 cursor-pointer border-b border-slate-800 flex justify-between items-center ${
              activeChat === chat.id
                ? "bg-slate-800"
                : ""
            }`}
          >
            <div
              onClick={() =>
                setActiveChat(chat.id)
              }
              className="flex-1 text-white truncate"
            >
              {chat.title}
            </div>

            <button
              onClick={() =>
                deleteChat(chat.id)
              }
              className="text-red-400 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;