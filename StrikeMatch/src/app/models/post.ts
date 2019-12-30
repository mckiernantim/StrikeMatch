
export interface Post{
    uid?: string;
    displayName?:string;
    title?: string;
    description?: string;
    claimedBy?: string;
    claimedByDisplayName?: string;
    department?: string;
    subDepartment?:string;
    category?:string;
    deathDate?:Date;
    availableDate?: Date;
    location?:string;
    claimRequested?:boolean;
    requestedBy?:string;

  }