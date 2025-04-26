"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  id: string;
  username: string;
  profile_image: string;
  xp: number;
  user_id: string;
};

const AuthContext = createContext<{ user: UserProfile | null }>({ user: null });

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
        .select("id, username, profile_image, xp, user_id")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        setUser(null);
      } else {
        setUser(data);
      }
    } else {
      setUser(null);
    }
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
