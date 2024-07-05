"use client";

import { FormEvent, useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useChat } from "ai/react";
import { useToast } from "@/components/ui/use-toast";
import Chat from "./Chat";
import { User } from "@supabase/supabase-js";
import { useUserData } from "@/store/useUserData";
import { Button } from "../ui/button";
import { FiSend } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';
import { useConversationTabs } from "@/store/useConversationTabs";

type Tab = {
  id: string;
  title: string;
  active: boolean;
};

export default function ConversationDashboard({
  searchParams,
  user,
}: {
  searchParams: { toastmessage: string };
  user: User;
}) {
  // Toast
  const { toast } = useToast();

  const { addNewTab, closeTab, setTabActive, tabs } = useConversationTabs(state => state)

  // setNewUser local state
  const { setNewUser } = useUserData();

  useEffect(() => {
    if (searchParams.toastmessage) {
      toast({
        title: searchParams.toastmessage.split("-")[0],
        description: searchParams.toastmessage.split("-")[1],
      });
    }

    setNewUser({
      email: user.email as string,
      name: user.user_metadata["name"] as string,
    });
  }, [searchParams, toast, user]);
  // AI
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [history, setHistory] = useState([
    { id: '1', title: "Conversation 1", date: "2023-05-01" },
    { id: '2', title: "Conversation 2", date: "2023-04-15" },
    { id: '3', title: "Conversation 3", date: "2023-03-20" },
  ]);
  // const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [message, setMessage] = useState("");
  const handleTabClick = (tab: Tab) => {
    // setTabs(tabs.map((t) => ({ ...t, active: t.id === tab.id })));
    setTabActive(tab.id)
    // setCurrentTab(tab);
  };
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() !== "") {
      // setTabs(((prevTabs) => {
      //   prevTabs[0].active = false
      //   return [...prevTabs, {
      //     id: uuidv4(),
      //     active: true,
      //     title: 'new Tab'
      //   }]
      // }))
      addNewTab({
        id: uuidv4(),
        active: true,
        title: 'new tab',
        messages: messages
      })
      handleSubmit(e)
    }
  };
  const handleCloseTabClick = (
    tab: Tab,
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    // setTabs((tabs) => {
    //   const newTabs = tabs.filter((currentTab) => tab.id !== currentTab.id);
    //   if (newTabs.length === 1) {
    //     setCurrentTab(tabs[0]);
    //   }
    //   return newTabs;
    // });
    closeTab(tab.id)
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
      <div className="flex flex-1 flex-col">
        {/* tabs */}
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
              {tab.id !== '1' && (
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
        {/* chat */}
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="w-full h-full overflow-y-auto flex items-center flex-col">
            <div className="space-y-4 max-w-4xl w-full flex-1 flex justify-start">
              <Chat messages={messages} />
            </div>
          </div>
          <div className="w-full flex items-center flex-col">
            <div className="border-t border-gray-200 dark:border-gray-800 py-4 space-y-4 flex justify-center max-w-4xl w-full">
              <form
                className="flex items-stretch justify-center w-full"
                onSubmit={handleSendMessage}
              >
                <textarea
                  className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Type your message..."
                  value={input}
                  onChange={handleInputChange}
                />
                <Button
                  className="ml-2 h-full"
                  type="submit"
                  aria-label="send prompt"
                >
                  <FiSend size={"1.2rem"} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
