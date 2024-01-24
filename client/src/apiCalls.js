import axios from "axios"

export const loginCall = async (userCredential,dispatch) => {
    // const BASE_URL = process.env.BASE_URL

    dispatch({type: "LOGIN_START"})
    try{
        console.log(userCredential)
        const res = await axios.post(`https://mjsocial2.onrender.com/api/auth/login`, userCredential);
        dispatch({type:"LOGIN_SUCCESS", payload:
        res.data });
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE", payload: err });
    }
}

