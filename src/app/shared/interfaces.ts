export interface User {
    email: string,
    password: string,
    returnSecureToken?: boolean,
    userName?: string
}

export interface FbAuthResponse {
    idToken: string,
    expiresIn: string
}