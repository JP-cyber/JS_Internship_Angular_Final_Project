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

export interface SingleHeroResponse {
    response: string,
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
    biography: {
        "full-name": string,
        "alter-egos": string,
        aliases: string[],
        "place-of-birth": string,
        "first-appearance": string,
        publisher: string,
        alignment: string
    },
    appearance: {
        gender: string,
        race: string,
        height: string[],
        weight: string[],
        "eye-color": string,
        "hair-color": string
      },
    work: {
        occupation: string,
        base: string
    },
    connections: {
        "group-affiliation": string,
        relatives: string
    },
    image: {
        url: string
    }
}

export interface Battle {
    date: Date,
    heroName: string,
    heroId: string,
    opponentName: string,
    opponentId: string,
    battleResult: string
}

export interface Powerup {
    name?: string,
    bonus: string,
    imageUrl?: string,
    left: number
}