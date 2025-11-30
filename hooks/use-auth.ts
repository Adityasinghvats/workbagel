import { SignInData } from '@/interfaces/users/interface';
import { userAPI } from '@/services/userService';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export function useAuth() {
    const { session, isLoading, setSession, setIsLoading, clearSession } = useAuthStore();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionData = await userAPI.getSession();
                if (sessionData) {
                    setSession(sessionData);
                } else {
                    clearSession();
                }
            } catch (error) {
                console.error('Session check failed:', error);
                clearSession();
            }
        };

        checkSession();
    }, [setSession, clearSession]);

    const signUp = async (data: any) => {
        setIsLoading(true);
        try {
            const result = await userAPI.signUp(data);
            setSession(result);
            return result;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const signIn = async (data: SignInData) => {
        setIsLoading(true);
        try {
            const result = await userAPI.signIn(data);
            setSession(result);
            return result;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await userAPI.signOut();
            clearSession();
        } catch (error) {
            console.error('Sign out failed:', error);
            clearSession();
        }
    };

    return {
        session,
        isLoading,
        isAuthenticated: !!session,
        user: session?.user,
        signUp,
        signIn,
        signOut,
    };
}