import React, { createContext, useContext, useState, useEffect } from 'react';
import GoTrue, { User } from 'gotrue-js';
import { toast } from "sonner";

// Initialize the Netlify Identity client using gotrue-js
export const netlifyAuth = new GoTrue({
    APIUrl: import.meta.env.VITE_NETLIFY_IDENTITY_URL || 'https://roaring-melba-75e05a.netlify.app/.netlify/identity',
    audience: '',
    setCookie: true,
});

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for an existing session on load
        const user = netlifyAuth.currentUser();
        if (user) {
            setUser(user);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const user = await netlifyAuth.login(email, password, true);
            setUser(user);
        } catch (error: any) {
            console.error("Login Error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            const user = netlifyAuth.currentUser();
            if (user) {
                await user.logout();
            }
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Failed to logically log out.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
