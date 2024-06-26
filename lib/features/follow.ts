import { createSlice } from "@reduxjs/toolkit"

interface FollowList {
    following: string[]
    followers: string[]
}

const initialState: FollowList = {
    following: [],
    followers: []
}

const followSlice = createSlice({
    name: "followList",
    initialState,
    reducers:  {
        initFollowList: (state, action) => {
            state.following = action.payload.following;
            state.followers = action.payload.followers;
        },
        addToFollowing: (state, action) => {
            state.following.push(action.payload)
        },
        addToFollowers: (state, action) => {
            state.followers.push(action.payload)
        },
        removeFromFollowing: (state, action) => {
            state.following = state.following.filter(item => item != action.payload)
        },
        removeFromFollower: (state, action) => {
            state.followers = state.followers.filter(item => item != action.payload)
        }
    }
})

export const {initFollowList, addToFollowers, addToFollowing, removeFromFollowing, removeFromFollower} = followSlice.actions

export default followSlice.reducer