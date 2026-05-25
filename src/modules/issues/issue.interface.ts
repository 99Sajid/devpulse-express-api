export interface IIssue {
    id?: string;
    title: string;
    description: string;
    type: string;
    reporter_id?: number;
    created_at?: Date;
    updated_at?: Date;
}