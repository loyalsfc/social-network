"use client"

import { store } from '@/lib/store'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

function StateWrapper({
    children
}:{
    children: React.ReactNode
}) {
    const queryClient = new QueryClient()
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ToastContainer />
            </QueryClientProvider>
        </Provider>

    )
}

export default StateWrapper