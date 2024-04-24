"use client"

import { store } from '@/lib/store'
import React from 'react'
import { Provider } from 'react-redux'

function StateWrapper({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>

    )
}

export default StateWrapper