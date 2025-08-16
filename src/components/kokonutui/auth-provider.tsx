"use client";

import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supabase/database.types";
import type { User } from "@supabase/auth-helpers-nextjs";

// Định nghĩa kiểu dữ liệu cho context
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Tạo context cho authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component cho KokonutUI
 * Quản lý trạng thái đăng nhập và cung cấp các phương thức xác thực
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient<Database>();

  // Kiểm tra trạng thái đăng nhập khi component được mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);

      // Lắng nghe sự thay đổi trạng thái đăng nhập
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    getUser();
  }, [supabase.auth]);

  // Phương thức đăng nhập
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Phương thức đăng ký
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Phương thức đăng xuất
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Giá trị context
  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};
