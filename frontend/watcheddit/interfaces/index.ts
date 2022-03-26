export interface Post {
    _id: string,
    title: string,
    description: string,
    user: string,
    imdbID: string
    votes: {
        upvotes: number,
        downvotes: number
    },
}

export interface Comment {
    _id: string
    postID: string,
    text: string,
    user: string
}

export interface Media {
    Title: string,
    Poster: string,
    Plot: string,
    Year: string,
    Genre: string,
    Ratings: {
        avg: number,
        total: number
    },
    imdbID: string
}

export interface User {
    username: string,
    type: string,
    ratings: {
        imdbID: string,
        rating: number
    }[]
}