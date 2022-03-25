export interface Post {
    _id: string,
    title: string,
    description: string,
    user: string,
    votes: {
        upvotes: number,
        downvotes: number
    }
}

export interface Media {
    Title: string,
    Poster: string,
    Plot: string,
    Year: string,
    Genre: string,
    Ratings: {
        count: number;
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