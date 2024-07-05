import { addConversationHistory } from "@/utils/db/functions/conversationHistory";
import { Message } from "ai/react";
import { create } from "zustand";

type Tab = {
  id: string;
  title: string;
  active: boolean;
  messages: Message[]
};

type initialState = {
  tabs: Tab[],
  addNewTab: (newTab: Tab) => Promise<void>,
  setTabActive: (tabId: string) => void,
  closeTab: (tabId: string) => void
};

export const useConversationTabs = create<initialState>((set) => ({
  tabs: [{ id: "1", title: "Where To Go AI", active: true, messages: [] }],
  addNewTab: async (newTab: Tab) => {
    set(state => ({
      tabs: [...state.tabs, newTab]
    }))

    console.log(addConversationHistory(newTab.messages))
  },
  setTabActive: (tabId: string) => {
    set(state => {
      return {
        tabs: state.tabs.map((t) => ({ ...t, active: t.id === tabId}))
      };
    })
  },
  closeTab: (tabId: string) => {
    set(state => {
      // Handle case where there's only one tab
      return {
        tabs: state.tabs.filter((currentTab) => tabId !== currentTab.id)
      }
    })
  }
}));
