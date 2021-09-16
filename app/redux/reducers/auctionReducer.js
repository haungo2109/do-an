import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auctionApi from "../../api/auctionApi"
import { logoutAction } from "../actions"

export const getAllAuctionAction = createAsyncThunk(
    "auction/fetchAllAuction",
    async () => {
        const response = await auctionApi.getAuctions()
        return response
    }
)
export const getMyAuction = createAsyncThunk(
    "auction/fetchMyAuction",
    async () => {
        const response = await auctionApi.getAuctionOwner()
        return response
    }
)
export const updateAuction = createAsyncThunk(
    "auction/updateAuction",
    async ({ id, data }) => {
        const response = await auctionApi.patchAuction(id, data)
        return response
    }
)
export const postAuctionAction = createAsyncThunk(
    "auction/postAuction",
    async (data) => {
        const response = await auctionApi.postAuction(data)
        return response
    }
)
export const deleteAuctionAction = createAsyncThunk(
    "auction/deleteAuction",
    async (id) => {
        const response = await auctionApi.deleteAuction(id)
        return response
    }
)

export const likeAuction = createAsyncThunk(
    "auction/like",
    async (auctionId) => {
        const response = await auctionApi.increateAuctionVote(auctionId)
        return response
    }
)

export const dislikeAuction = createAsyncThunk(
    "auction/dislike",
    async (auctionId) => {
        const response = await auctionApi.decreateAuctionVote(auctionId)
        return response
    }
)

const auctionSlice = createSlice({
    name: "auction",
    initialState: {
        page: 1,
        data: [],
        error: "",
        loading: false,
        nextPage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAuctionAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload.results,
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMyAuction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getAllAuctionAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getAllAuctionAction.pending, (state, action) => {
            state = Object.assign(state, {
                loading: true,
            })
        })
        builder.addCase(getMyAuction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getMyAuction.pending, (state, action) => {
            state = Object.assign(state, {
                loading: true,
            })
        })
        builder.addCase(likeAuction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(dislikeAuction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(deleteAuctionAction.fulfilled, (state, action) => {
            let id = action.meta.arg
            let newState = state.data.filter((c) => c.id !== id)
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(deleteAuctionAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
            })
        })
        builder.addCase(postAuctionAction.fulfilled, (state, action) => {
            let auction = action.payload
            state = Object.assign(state, {
                data: [...state.data, auction],
                error: "",
                loading: false,
            })
        })
        builder.addCase(postAuctionAction.rejected, (state, action) => {
            console.log("Rejected Action auction Auction", action)
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(postAuctionAction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
        builder.addCase(updateAuction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, {
                data: newState,
                error: "",
                loading: false,
            })
        })
        builder.addCase(updateAuction.rejected, (state, action) => {
            console.log("Rejected Action edit Auction", action)
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(updateAuction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
        builder.addCase(logoutAction, (state) => {
            state = {
                page: 1,
                data: [],
                error: "",
                loading: false,
                nextPage: "",
            }
        })
    },
})

export default auctionSlice.reducer
