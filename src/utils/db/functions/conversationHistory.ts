import { createClient } from "@/utils/supabase/client";
import { Message } from "ai/react";

export const addConversationHistory = async (messages: Message[]) => {
  const supabase = createClient()
  const userResponse = await supabase.auth.getUser();

  if (userResponse.error) {
    throw new Error("Error fetching user");
  }

  const user = userResponse.data.user;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const userId = user.id; // Ensure this is a string

  const { data } = await supabase.from('conversations_history').insert({
    // @ts-ignore
    messages: messages , // Ensure this matches your Json type
    user_id: userId,
  });

  return data
};