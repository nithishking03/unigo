import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<{
  session: Session | null;
  loading: boolean;
}>({
  session: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error fetching session:", error.message);
        toast({
          title: "Authentication Error",
          description: "There was a problem with your session. Please sign in again.",
          variant: "destructive",
        });
      }
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      setSession(session);
      setLoading(false);

      if (event === 'SIGNED_OUT') {
        // Clear any local storage or state if needed
        setSession(null);
      } else if (event === 'SIGNED_IN') {
        // Handle successful sign in
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};