export interface Exchange {
   
    author?: string;
    authorUid?:string;
    recipientUid?:string;
    recipient?: string;
    postId?: string;
    location?: string;
    time?: Date;
    createdAt?:Date;
    complete?:boolean;
    confirmed?:boolean;

}