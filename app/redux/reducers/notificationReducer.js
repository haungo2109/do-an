import { createSlice } from "@reduxjs/toolkit"
import { logoutAction } from "../actions"

const initState = {
    title: "Chào mừng bạn đã đến với Kanj",
    content: "Hãy cùng chúng mình giới thiệu App nhé",
    type: "introduction",
    data: {},
    isSeen: false,
}
const notificationSlice = createSlice({
    name: "notification",
    initialState: [initState],
    reducers: {
        setSeenAll: (state, action) => {
            state = state.map((c) => ({ ...c, isSeen: true }))
        },
        addNotification: (state, action) => {
            state = Object.assign(state, [...state, action.payload])
        },
        removeANotification: (state, action) => {
            const { id } = action.payload
            state = state.map((c) =>
                c.id === id ? { ...c, isSeeen: true } : c
            )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutAction, (state) => {
            state = [initState]
        })
    },
})

export const { setSeenAll, addNotification, removeANotification } =
    notificationSlice.actions

export default notificationSlice.reducer
