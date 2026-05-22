export interface IIssue {
    id?: string;
    title: string;
    description: string;
    type: string;
    reporter_id?: string;
    created_at?: Date;
    updated_at?: Date;
}