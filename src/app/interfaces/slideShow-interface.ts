export interface ISlideShow {
    $implicit: string,
    imageNumber: number,
    handler: {
        nextImage: () => void,
        preImage: () => void,
    }
}

export interface ISlideImage {
    url: string,
    duration: number
}
