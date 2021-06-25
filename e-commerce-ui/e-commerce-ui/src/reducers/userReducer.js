import { ADD_USER_DETAILS, REMOVE_USER_DETAILS, REGISTERED_USER, SHOW_REGISTER_PAGE } from "../actions";

const intialState = {
    user : {
        email: "",
        token :""
    },
    isRegistered : false,
    showRegisterPage : false
}

const userReducer = (state = intialState, action) => {
    if(action.type === ADD_USER_DETAILS) {
        console.log(state)
        state.user = action.payload
        return {
            ...state,
            user: action.payload
        }
    }
    else if (action.type === REGISTERED_USER) {
        return {
            ...state,
            isRegistered: action.payload,
            showRegisterPage: false
        }
    }
    else if (action.type === REMOVE_USER_DETAILS) {
        var empty_user = { email: "", token : ""}
        return {
            ...state,
            user: empty_user
        }
    } 
    else if (action.type === SHOW_REGISTER_PAGE) {
        return {
            ...state,
            showRegisterPage: true
        }
    }
    else {
        return state;
    }
}

export default userReducer;