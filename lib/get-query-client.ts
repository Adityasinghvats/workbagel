import { QueryClient, focusManager, onlineManager } from '@tanstack/react-query';
import * as Network from 'expo-network';
import { useEffect } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState, Platform } from 'react-native';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Optional: Configure default options for all queries
            staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
        },
    },
});

// RQ supports reftech on reconnect on web but in mobile we need to configure it manually
onlineManager.setEventListener((setOnline) => {
    const eventSubscription = Network.addNetworkStateListener((state) => {
        setOnline(!!state.isConnected)
    })
    return eventSubscription.remove;
})

function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
    }
}

export function useAppState() {
    useEffect(() => {
        const subscription = AppState.addEventListener('change', onAppStateChange);
        return () => subscription.remove();
    }, [])
};