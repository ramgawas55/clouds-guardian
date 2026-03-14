import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export interface User {
    id: string;
    email: string;
    user_metadata: {
        full_name: string;
    };
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    requestPasswordRecovery: (email: string) => Promise<void>;
    recoverPassword: (token: string, password: string) => Promise<void>;
    acceptInvite: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock session check
        setTimeout(() => {
            const savedSession = localStorage.getItem('cloud_guardian_session');
            if (savedSession) {
                try {
                    setUser(JSON.parse(savedSession));
                } catch (e) { }
            }
            setIsLoading(false);
        }, 300);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        // Simulate network
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock generic successful login logic
        if (!email || !password) {
            setIsLoading(false);
            throw new Error("Invalid credentials");
        }

        const newUser: User = {
            id: 'mock-usr-' + Date.now(),
            email: email,
            user_metadata: {
                full_name: email.split('@')[0].toUpperCase(),
            }
        };

        localStorage.setItem('cloud_guardian_session', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
    };

    const logout = async () => {
        localStorage.removeItem('cloud_guardian_session');
        setUser(null);
        toast.info("Logged out safely.");
    };

    const requestPasswordRecovery = async (email: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
        // Does nothing locally, just simulates wait
    };

    const recoverPassword = async (token: string, password: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser: User = {
            id: 'mock-usr-' + Date.now(),
            email: 'admin@cloudguardian.io',
            user_metadata: {
                full_name: 'Admin User',
            }
        };

        localStorage.setItem('cloud_guardian_session', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
    };

    const acceptInvite = async (token: string, password: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser: User = {
            id: 'mock-usr-' + Date.now(),
            email: 'invited_user@cloudguardian.io',
            user_metadata: {
                full_name: 'Invited User',
            }
        };

        localStorage.setItem('cloud_guardian_session', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            logout,
            requestPasswordRecovery,
            recoverPassword,
            acceptInvite
        }}>
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
