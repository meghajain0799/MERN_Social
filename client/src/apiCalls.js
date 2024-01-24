import axios from "axios"

export const loginCall = async (userCredential,dispatch) => {
    // const BASE_URL = process.env.BASE_URL

    dispatch({type: "LOGIN_START"})
    try{
        const res = await axios.post(`auth/login`, userCredential);
        dispatch({type:"LOGIN_SUCCESS", payload:
        res.data });
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE", payload: err });
    }
}

