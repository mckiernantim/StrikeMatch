export interface Message {
    
    author: string;
    recipient: string;
    recipientDisplayName:string;
    title: string;
    body: any[];
    createdAt: Date;
    newContent: boolean;
    canView:string[];
    postId:string;


}