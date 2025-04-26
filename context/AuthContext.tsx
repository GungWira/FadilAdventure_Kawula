"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  id: string;
  username: string;
  profile_image: string;
  xp: number;
  user_id: string;
  culture: string;
};

const AuthContext = createContext<{
  user: UserProfile | null;
  login: (
    fullname: string,
    username: string,
    umur: number
  ) => Promise<{ status: number } | undefined>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: async (fullname: string, username: string, umur: number) => {
    return undefined;
  },
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUserProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, profile_image, xp, user_id, culture")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        setUser({
          id: "",
          username: "",
          profile_image: "",
          xp: 0,
          user_id: session.user.id,
          culture: "",
        });
      } else {
        setUser(data);
      }
    } else {
      setUser(null);
    }
  };

  const login = async (fullname: string, username: string, umur: number) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      const { error } = await supabase.from("profiles").insert([
        {
          fullname,
          username,
          umur,
          user_id: session.user.id,
        },
      ]);

      if (error) {
        console.error("Error inserting profile:", error);
      } else {
        await fetchUserProfile();
        return { status: 200 };
      }
    } else {
      console.error("No user session found");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    fetchUserProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchUserProfile();
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
