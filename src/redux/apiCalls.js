import { loginFailure, loginStart, loginSuccess, loginFailureReset, logoutSuccess } from "./userRedux"

export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    const userLogin = async () => {
        // const host = "http://localhost:5000"
        const host = process.env.REACT_APP_BASE_URL
        const response = await fetch(`${host}/api/auth/login/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        if (response.status >= 200 && response.status <= 299) {
            const tokenObj = await response.json()
            sessionStorage.setItem("token", tokenObj.authToken)
            dispatch(loginSuccess(user))
            navigate("/")

        } else {
            const json = await response.json()
            console.log(json)
            dispatch(loginFailure())
            setTimeout(() => {
                dispatch(loginFailureReset())
            }, 5000);

        }

    }
  userLogin()
}

export const logout = async (dispatch,user, navigate) => {
    navigate("/login")
    dispatch(logoutSuccess(user))
}

