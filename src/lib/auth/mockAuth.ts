// src/lib/auth/mockAuth.ts
import { User } from "./types";

const STORAGE_KEY = "hct_auth";

interface StoredUser extends Omit<User, "createdAt"> {
  createdAt: string;
}

export const mockAuth = {
  signUp: async (
    email: string,
    password: string,
    name: string
  ): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem("hct_users") || "[]");
    if (existingUsers.some((u: StoredUser) => u.email === email)) {
      throw new Error("User already exists");
    }

    const user: User = {
      id: Math.random().toString(36).slice(2),
      email,
      name,
      createdAt: new Date(),
    };

    // Store user in mock database
    localStorage.setItem("hct_users", JSON.stringify([...existingUsers, user]));

    // Store current session
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    return user;
  },

  signIn: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists
    const users = JSON.parse(localStorage.getItem("hct_users") || "[]");
    const user = users.find((u: StoredUser) => u.email === email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Store current session
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

    return {
      ...user,
      createdAt: new Date(user.createdAt),
    };
  },

  signOut: async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const user = JSON.parse(data);
    return {
      ...user,
      createdAt: new Date(user.createdAt),
    };
  },
};
