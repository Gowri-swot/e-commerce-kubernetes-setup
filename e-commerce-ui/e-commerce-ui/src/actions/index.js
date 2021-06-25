export const ADD_USER_DETAILS = 'ADD_USER_DETAILS';
export const REMOVE_USER_DETAILS = 'REMOVE_USER_DETAILS';
export const REGISTERED_USER = 'REGISTERED_USER'
export const SHOW_REGISTER_PAGE = 'SHOW_REGISTER_PAGE'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ORDER_PRODUCT = 'ORDER_PRODUCT'

export const Add_user_after_login = (user) => {
    return {
        type: ADD_USER_DETAILS,
        payload: user
    }
}

export const Remove_user_after_logout = () => {
    return {
        type: REMOVE_USER_DETAILS
    }
}
export const Registered_User = (status) => {
    return {
        type: REGISTERED_USER,
        payload: status
    }
}

export const Show_register_page = () => {
    return {
        type: SHOW_REGISTER_PAGE
    }
}

export const Add_product = (product) => {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

export const Order_product = (productids) => {
    return {
        type: ORDER_PRODUCT,
        payload: productids
    }
}