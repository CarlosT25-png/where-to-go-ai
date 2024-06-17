"use client";

import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useChat } from "ai/react";
import Chat from "./Chat";

type Tab = {
  id: number;
  title: string;
  active: boolean;
};

export default function ConversationDashboard() {
  // AI
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, title: "Where To Go AI", active: true },
    { id: 2, title: "Places to Visit NYC", active: false },
    { id: 3, title: "Places to eat in NYC", active: false },
  ]);
  const [history, setHistory] = useState([
    { id: 1, title: "Conversation 1", date: "2023-05-01" },
    { id: 2, title: "Conversation 2", date: "2023-04-15" },
    { id: 3, title: "Conversation 3", date: "2023-03-20" },
  ]);
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [message, setMessage] = useState("");
  const handleTabClick = (tab: Tab) => {
    setTabs(tabs.map((t) => ({ ...t, active: t.id === tab.id })));
    setCurrentTab(tab);
  };
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setHistory([
        ...history,
        {
          id: history.length + 1,
          title: message,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
      setMessage("");
    }
  };
  const handleCloseTabClick = (
    tab: Tab,
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setTabs((tabs) => {
      const newTabs = tabs.filter((currentTab) => tab.id !== currentTab.id);
      if (newTabs.length === 1) {
        setCurrentTab(tabs[0]);
      }
      return newTabs;
    });
  };  
  return (
    <div className="flex h-screen w-full">
      <div className="bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 w-[280px] p-4">
        <h2 className="text-lg font-medium mb-4">Conversation History</h2>
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-lg p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                tab.active
                  ? "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 border-b-2 border-blue-500"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.title}
              {tab.id !== 1 && (
                <span>
                  <IoMdCloseCircleOutline
                    size={"1rem"}
                    onClick={(e) => handleCloseTabClick(tab, e)}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
        {/* content  */}
        <div className="flex flex-col p-4 overflow-y-auto h-full">
          <div className="space-y-4 overflow-y-auto flex-1">
            <Chat messages={messages} />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <form className="flex items-center" onSubmit={handleSubmit}>
              <textarea
                className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
              />
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
