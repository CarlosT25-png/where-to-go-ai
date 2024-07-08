import { updateConversationMessage } from "../db/functions/conversationHistory";

export const debouncedUpdateConversationMessage = debounce(
  async (tabId: string, messages: any[]) => {
    await updateConversationMessage(tabId, messages);
  },
  1000
);

export function debounce<Params extends any[]>(
  func: (...args: Params) => Promise<void>,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await func(...args);
    }, timeout);
  };
}
