import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User } from '@/interfaces/users/interface';
import * as SecureStore from 'expo-secure-store'

interface Session {
    user: User;
    session: {
        id: string;
        expiresAt: string;
        token: string;
    };
}

interface AuthState {
    session: Session | null;
    isLoading: boolean;
    setSession: (session: Session | null) => void;
    setIsLoading: (isLoading: boolean) => void;
    clearSession: () => void;
    updateUser: (user: Partial<User>) => void;
    hydrated?: boolean;
    setHydrated: () => void;
}

const secureStorage = {
    getItem: (name: string) => SecureStore.getItemAsync(name),
    setItem: (name: string, value: string) => SecureStore.setItemAsync(name, value),
    removeItem: (name: string) => SecureStore.deleteItemAsync(name),
}

export const useAuthStore = create<AuthState>()(
    persist(
        immer((set) => ({
            session: null,
            isLoading: true,
            hydrated: false,
            setHydrated: () => set({ hydrated: true }),
            setSession: (session) => set({ session, isLoading: false }),
            setIsLoading: (loading) => set({ isLoading: loading }),
            clearSession: () => set({ session: null, isLoading: false }),
            updateUser: (updatedUser) => set((state) => {
                if (!state.session) return state;
                return {
                    session: {
                        ...state.session,
                        user: { ...state.session.user, ...updatedUser }
                    }
                }
            })
        })),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => secureStorage),
            onRehydrateStorage() {
                return (state, error) => {
                    if (!error) state?.setHydrated();
                }
            }
        }
    )
)