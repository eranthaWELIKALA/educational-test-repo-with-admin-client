export interface Student {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified?: boolean;
    requiredActions?: [any];
    createdTimestamp?: Number;
    attributes?: StudentAttributes
}

export interface StudentAttributes {
    regNumber: Number;
    grade?: string;
}
