import axios from "axios";
import { ADD_PRODUCT, ORDER_PRODUCT } from "../actions";

const intialState = {
    product_list : [],
    ids: []
}

const productReducer = (state = intialState, action) => {
    if(action.type === ADD_PRODUCT) {
        let updated_product = []
        if(state.product_list.length > 0 ) {
            state.product_list.forEach(item => {
                updated_product.push(item)
            })
        }
        updated_product.push(...action.payload)
        return {
            ...state,
            product_list: updated_product
        }
    } else {
        return state;
    }
}

export default productReducer;