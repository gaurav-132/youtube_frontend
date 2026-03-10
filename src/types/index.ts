export interface Owner {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    avatar: string;
    coverImage: string;
}

export interface Video {
    _id: string;
    title: string;
    thumbnail: string;
    ownerInfo: Owner;
    videoFile: string;
    description: string;
    views?: number;
}

export interface RecommendedVideos {
    _id: string;
    title: string;
    thumbnail: string;
    ownerInfo: Owner;
    videoFile: string;
    views?: number;
}

export interface Comments {
    _id: string;
    userInfo: {
        username: string;
        avatar: string;
    };
    comment: string;
    replies: number;
}
