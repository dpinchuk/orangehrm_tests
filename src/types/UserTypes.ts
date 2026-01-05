export type Gender = "Male" | "Female";

export interface PersonalDetailsData {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    employeeId?: string;
    otherId?: string;
    driversLicenseNumber?: string;
    licenseExpiryDate?: string; // "yyyy-dd-mm" as in placeholder
    nationality?: string; // dropdown visible text
    maritalStatus?: string; // dropdown visible text
    dateOfBirth?: string; // "yyyy-dd-mm"
    gender?: Gender;
}

export interface CustomFieldsData {
    bloodType?: string; // dropdown visible text
    testField?: string;
}

export type AttachmentAction = "save" | "cancel";

export interface AddAttachmentData {
    filePath: string;
    comment?: string;
    action: AttachmentAction;
}
