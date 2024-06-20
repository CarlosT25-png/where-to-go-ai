import { create } from "zustand";

type userState = {
  name: string;
  email: string;
  initials: string;
  setNewUser: ({ name, email }: { name: string; email: string }) => void;
  clearNewUser: () => void;
};

export const useUserData = create<userState>((set) => ({
  name: "",
  email: "",
  initials: "",
  setNewUser: ({ name, email }) =>
    set(() => ({ name: name, email: email, initials: getInitials(name) })),
  clearNewUser: () => set({ name: "", email: "", initials: "" }),
}));


const getInitials = (name: string) => {
  if (!name) return '';

  const nameParts = name.trim().split(' ');

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    return nameParts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('');
  }
}