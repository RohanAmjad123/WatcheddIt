export interface Post {
    _id: string,
    title: string,
    description: string,
    user: string
}

export interface Media {
    Title: string,
    Poster: string,
    Plot: string,
    Year: string,
    Genre: string,
    ratings: {
        avg: number,
        total: number
    },
    imdbID: string
}

export interface User {
    username: string,
    type: string
}