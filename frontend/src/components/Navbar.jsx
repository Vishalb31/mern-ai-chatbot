function Navbar({ logout }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
      <h1 className="text-2xl font-bold text-white">
        MERN AI Chatbot 🚀
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;