export interface Teacher {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified?: boolean;
    requiredActions?: [any];
    createdTimestamp?: Number;
    attributes?: TeacherAttributes;
}

export interface TeacherAttributes {
    regNumber: Number;
    phoneNumber?: Number;
    subjects?: [String];
}
