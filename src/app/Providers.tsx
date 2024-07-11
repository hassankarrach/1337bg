"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1 * 60 * 60 * 1000, // 4 hours
        },
    },
});

let persister : any;

if (typeof window !== "undefined") {
    persister = createSyncStoragePersister({
        storage: window.localStorage,
    });
}

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            <SessionProvider refetchInterval={5 * 60}>{children}</SessionProvider>
        </PersistQueryClientProvider>
    );
};

export default Providers;
