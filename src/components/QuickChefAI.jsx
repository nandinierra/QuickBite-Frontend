
import   { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  X, 
  ChefHat, 
  Sparkles,
  Loader2,
  Trash2,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from '../context/context';

// Using port 5000 for the Python Flask AI Backend
// const AI_BACKEND_URL = "http://localhost:5000";
const AI_BACKEND_URL = import.meta.env.AI_BACKEND_URL;

const QuickChefAI = () => {
  const { user } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const location = useLocation();
  
  // Use user email as steady threadId for cross-refresh persistence
  const threadId = user?.email || "anonymous_guest";

  // Messages are now only kept in React state, synced with Backend
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial greeting
  const initialGreeting = { 
    id: "init", 
    text: "Hey there! I'm your 'QuickChef AI'. 🥗 Stuck on what to order? I can help! 😊", 
    sender: "ai" 
  };

  // On mount: Fetch existing session history from Backend (Rufus Style)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${AI_BACKEND_URL}/api/chat/${threadId}`);
        if (response.data.messages && response.data.messages.length > 0) {
          const formatted = response.data.messages.map((m, index) => ({
            id: index,
            text: m.text,
            sender: m.role === "user" ? "user" : "ai"
          }));
          setMessages(formatted);
        } else {
          setMessages([initialGreeting]);
        }
      } catch (err) {
        console.error("Failed to sync with AI kitchen:", err);
        setMessages([initialGreeting]);
      }
    };
    fetchHistory();
  }, [threadId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    
    setInput("");
    setIsLoading(true);

    try {
      // Rufus logic: Send ONLY prompt and threadId. No history from frontend.
      const response = await axios.post(`${AI_BACKEND_URL}/api/ask`, { 
        prompt: input,
        threadId: threadId
      });

      const aiReply = { 
        id: Date.now() + 1, 
        text: response.data.reply, 
        sender: "ai" 
      };
      setMessages(prev => [...prev, aiReply]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "My kitchen circuit is a bit hot! Please try again in a moment. 🍽️🔥", 
        sender: "ai" 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      // Purge session from backend
      await axios.delete(`${AI_BACKEND_URL}/api/chat/${threadId}`);
      setMessages([initialGreeting]);
    } catch (err) {
      console.error("Failed to clear session:", err);
    }
  };

  // Hide bot on Auth pages
  const hiddenPaths = ["/login", "/signup", "/register", "/admin"];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-Inter">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-red-500 shadow-[0_10px_35px_rgba(220,38,38,0.4)] flex items-center justify-center text-white cursor-pointer relative group border-2 border-white/20"
          >
            <ChefHat size={30} className="relative z-10" />
            <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-25 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            
            {/* Tooltip hint for interviewer */}
            <div className="absolute right-20 bg-gray-950 text-white text-[10px] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10 pointer-events-none translate-x-5 group-hover:translate-x-0 transition-all font-semibold tracking-wider">
               ASK THE AI EXPERT ✨
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 100, transformOrigin: 'bottom right' }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            className="w-[380px] sm:w-[420px] h-[600px] bg-slate-950/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col overflow-hidden ring-1 ring-white/20"
          >
            {/* AI Header - Premium Styling */}
            <div className="p-5 bg-gradient-to-br from-red-600/40 via-red-800/30 to-slate-950 border-b border-white/10 flex items-center justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/20 ring-1 ring-white/30">
                  <ChefHat size={26} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2 font-Outfit tracking-tight">
                    QuickChef AI <Sparkles size={16} className="text-orange-400 fill-orange-400 animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></span>
                     <p className="text-gray-400 text-[10px] sm:text-xs font-medium tracking-wide uppercase">Powered by Flask Engine</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 relative z-10">
                <button 
                  onClick={clearChat}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-orange-500 transition-all duration-300 active:scale-95"
                  title="Clear Chat Logs"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all duration-300 active:scale-95"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* AI Chat History */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-none scrollbar-track-transparent">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm leading-relaxed shadow-xl relative ${
                      m.sender === "user"
                        ? "bg-gradient-to-br from-red-600 to-red-700 text-white rounded-tr-none border border-white/10 shadow-red-600/10"
                        : "bg-slate-900/50 text-gray-200 border border-white/10 rounded-tl-none ring-1 ring-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/50 border border-white/10 rounded-[1.5rem] rounded-tl-none p-4 shadow-xl flex items-center gap-3 min-w-[150px]">
                    <Loader2 size={20} className="animate-spin text-red-500" />
                    <span className="text-xs text-gray-400 font-medium tracking-wide italic">Preparing thoughts...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* AI Input Area */}
            <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex gap-2 bg-slate-900/80 p-1.5 rounded-[1.5rem] border border-white/10 focus-within:border-red-600/50 focus-within:shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all duration-500 shadow-inner group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me what to eat today..."
                  className="flex-1 bg-transparent px-4 py-2 text-white text-sm focus:outline-none placeholder:text-gray-600 font-Inter"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    input.trim() && !isLoading
                      ? "bg-red-600 shadow-lg shadow-red-600/30 text-white hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/20"
                      : "bg-slate-800 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex justify-between items-center px-2 mt-4">
                 <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">QuickChef Intelligence</p>
                 <div className="flex gap-1.5 opacity-40">
                    <div className="w-1 h-1 bg-red-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-red-600 rounded-full animate-bounce delay-150"></div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickChefAI;
