export interface Message {
    
    author: string;
    recipient: string;
    title: string;
    body: string[];
    createdAt: Date;
    newContent: boolean;
    visible:string[];
    postId:string;


}