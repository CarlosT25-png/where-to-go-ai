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
    // save to DB
    const id = await addConversationHistory(newTab.messages) 
    // Only save if it is not saved in the DB - Pending
    set((state: initialState) => {
      const newTabs = state.tabs;
      newTabs.forEach((el) => el.active = false)
      const newTabWithDBId = newTab
      newTabWithDBId.id = id
      newTabs.push(newTabWithDBId)
      return {tabs: newTabs};
    });
  },
  setTabActive: (tabId: string) => { // fix delete state active from other tabs
    set(state => {
      return {
        tabs: state.tabs.map((t) => ({ ...t, active: t.id === tabId}))
      };
    })
  },
  closeTab: (tabId: string) => {
    set(state => {
      // Handle case where there's only one tab
      const newTabs = state.tabs.filter((currentTab) => tabId !== currentTab.id)
      if(newTabs.length === 1){
        newTabs[0].active = true
      }
      return {
        tabs: newTabs
      }
    })
  }
}));