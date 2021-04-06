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

export interface HeroApiResponse{
    response: string,
    results: Array<{
        id: string,
        name: string,
        powerstats: {
            combat: string
            durability: string
            intelligence: string
            power: string
            speed: string
            strength: string
        },
        image: {
            url: string
        }
    }>
}