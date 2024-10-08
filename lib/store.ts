import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import followReducer from './features/follow'
import blockReducer from './features/block'

export const store = configureStore({
  reducer: {
    user: userReducer,
    followList: followReducer,
    block: blockReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch