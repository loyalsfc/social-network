"use client"

import { store } from '@/lib/store'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StateWrapper({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            {children}
            <ToastContainer />
        </Provider>

    )
}

export default StateWrapper