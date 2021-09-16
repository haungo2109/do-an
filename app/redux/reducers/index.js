import userReducer from "./userReducer"
import postReducer from "./postReducer"
import controllerReducer from "./controllerReducer"
import commentReducer from "./commentReducer"
import auctionReducer from "./auctionReducer"
import categoryAuctionReducer from "./categoryAuctionReducer"
import reportReducer from "./reportReducer"

const rootReducer = {
    user: userReducer,
    post: postReducer,
    auction: auctionReducer,
    controller: controllerReducer,
    comment: commentReducer,
    categoryAuction: categoryAuctionReducer,
    reportType: reportReducer,
}

export default rootReducer
