"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthButton } from "@/components/auth/auth-button";
import { User } from "@supabase/supabase-js";

/**
 * AuthProvider component - Client component để lấy thông tin người dùng hiện tại
 * Và render AuthButton với thông tin người dùng
 */
export function AuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();
        
        // Lấy thông tin người dùng hiện tại
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        // Nếu có người dùng, lấy thêm thông tin profile
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  if (loading) {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>;
  }
  
  return <AuthButton user={user} userProfile={userProfile} />;
}
