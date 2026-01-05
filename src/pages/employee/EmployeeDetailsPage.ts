import { expect, type Locator, type Page } from "@playwright/test";
import type { AddAttachmentData, CustomFieldsData, PersonalDetailsData } from "../../types/UserTypes";

export class EmployeeDetailsPage {
    private readonly _page: Page;

    private readonly _employeeHeaderName: Locator;

    private readonly _personalDetailsTitle: Locator;
    private readonly _personalDetailsForm: Locator;
    private readonly _personalSaveButton: Locator;

    private readonly _firstNameInput: Locator;
    private readonly _middleNameInput: Locator;
    private readonly _lastNameInput: Locator;

    private readonly _employeeIdInput: Locator;
    private readonly _otherIdInput: Locator;
    private readonly _driversLicenseNumberInput: Locator;
    private readonly _licenseExpiryDateInput: Locator;

    private readonly _nationalitySelect: Locator;
    private readonly _maritalStatusSelect: Locator;
    private readonly _dateOfBirthInput: Locator;

    private readonly _genderMaleRadio: Locator;
    private readonly _genderFemaleRadio: Locator;

    private readonly _customFieldsTitle: Locator;
    private readonly _customFieldsSection: Locator;
    private readonly _customFieldsSaveButton: Locator;
    private readonly _bloodTypeSelect: Locator;
    private readonly _testFieldInput: Locator;

    private readonly _attachmentsTitle: Locator;
    private readonly _attachmentsSection: Locator;
    private readonly _attachmentsAddButton: Locator;

    private readonly _addAttachmentTitle: Locator;
    private readonly _addAttachmentSection: Locator;
    private readonly _attachmentFileInput: Locator;
    private readonly _attachmentCommentTextarea: Locator;
    private readonly _attachmentCancelButton: Locator;
    private readonly _attachmentSaveButton: Locator;

    constructor(page: Page) {
        this._page = page;

        this._employeeHeaderName = page.locator(".orangehrm-edit-employee-name h6").first();

        this._personalDetailsTitle = page.getByRole("heading", { name: "Personal Details" }).first();
        this._personalDetailsForm = page.locator("form.oxd-form").first();
        this._personalSaveButton = this._personalDetailsForm.getByRole("button", { name: " Save " });

        this._firstNameInput = page.locator("input[name=\"firstName\"]").first();
        this._middleNameInput = page.locator("input[name=\"middleName\"]").first();
        this._lastNameInput = page.locator("input[name=\"lastName\"]").first();

        this._otherIdInput = page
            .locator("form.oxd-form")
            .first()
            .locator("div.oxd-input-group", { has: page.locator("label.oxd-label", { hasText: "Other Id" }) })
            .locator("input.oxd-input")
            .first();

        this._employeeIdInput = this._byLabelInput(this._personalDetailsForm, "Employee Id");

        this._driversLicenseNumberInput = page
            .locator("form.oxd-form")
            .first()
            .locator("div.oxd-input-group", { has: page.locator("label.oxd-label", { hasText: "Driver's License Number" }) })
            .locator("input.oxd-input")
            .first();

        this._licenseExpiryDateInput = this._byLabelInput(this._personalDetailsForm, "License Expiry Date");

        this._nationalitySelect = this._byLabelSelect(this._personalDetailsForm, "Nationality");
        this._maritalStatusSelect = this._byLabelSelect(this._personalDetailsForm, "Marital Status");
        this._dateOfBirthInput = this._byLabelInput(this._personalDetailsForm, "Date of Birth");

        this._genderMaleRadio = this._byRadioLabel(this._personalDetailsForm, "Male");
        this._genderFemaleRadio = this._byRadioLabel(this._personalDetailsForm, "Female");

        this._customFieldsTitle = page.getByRole("heading", { name: "Custom Fields" }).first();
        this._customFieldsSection = page.locator(".orangehrm-custom-fields").first();
        this._customFieldsSaveButton = this._customFieldsSection.getByRole("button", { name: " Save " });

        this._bloodTypeSelect = this._bloodTypeSelect = page
            .locator(".orangehrm-custom-fields")
            .locator(".oxd-input-group", {
                has: page.locator("label.oxd-label", { hasText: "Blood Type" }),
            })
            .locator(".oxd-select-text-input")
            .first();
            
        this._testFieldInput = this._testFieldInput = page
            .locator(".orangehrm-custom-fields")
            .locator(".oxd-input-group", {
                has: page.locator("label.oxd-label", { hasText: "Test_Field" }),
            })
            .locator("input.oxd-input")
            .first();

        this._attachmentsTitle = page.getByRole("heading", { name: "Attachments" }).first();
        this._attachmentsSection = page.locator(".orangehrm-attachment").first();
        this._attachmentsAddButton = this._attachmentsSection.getByRole("button", { name: " Add " });

        this._addAttachmentTitle = page.getByRole("heading", { name: "Add Attachment" }).first();
        this._addAttachmentSection = page.locator(".orangehrm-attachment").filter({ has: this._addAttachmentTitle }).first();
        this._attachmentFileInput = this._addAttachmentSection.locator("input[type=\"file\"]").first();
        this._attachmentCommentTextarea = this._addAttachmentSection.locator("textarea").first();
        this._attachmentCancelButton = this._addAttachmentSection.getByRole("button", { name: " Cancel " });
        this._attachmentSaveButton = this._addAttachmentSection.getByRole("button", { name: " Save " });
    }

    get employeeHeaderName(): Locator {
        return this._employeeHeaderName;
    }

    get personalDetailsTitle(): Locator {
        return this._personalDetailsTitle;
    }

    get customFieldsTitle(): Locator {
        return this._customFieldsTitle;
    }

    get attachmentsTitle(): Locator {
        return this._attachmentsTitle;
    }

    async expectPageLoaded(): Promise<void> {
        await expect(this._personalDetailsTitle, "\"Personal Details\" title should be visible").toBeVisible();
        await expect(this._firstNameInput, "\"First Name\" input should be visible").toBeVisible();
        await expect(this._employeeHeaderName, "Employee header name should be visible").toBeVisible();
    }

    async expectCreatedEmployeeDataDisplayed(data: { firstName: string; middleName?: string; lastName: string }): Promise<void> {
        const firstLast = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
        const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ").trim();

        const text = (await this._employeeHeaderName.first().innerText()).replace(/\s+/g, " ").trim();

        if (data.middleName) {
            expect([firstLast, fullName], "Created employee name should be displayed in header").toContain(text);
            return;
        }

        await expect(this._employeeHeaderName.first(), "Created employee name should be displayed in header").toHaveText(firstLast);
    }

    async updateAndSavePersonalDetails(data: PersonalDetailsData): Promise<void> {
        await this.expectPageLoaded();

        if (data.firstName !== undefined) await this._fillInput(this._firstNameInput, data.firstName);
        if (data.middleName !== undefined) await this._fillInput(this._middleNameInput, data.middleName);
        if (data.lastName !== undefined) await this._fillInput(this._lastNameInput, data.lastName);

        if (data.employeeId !== undefined) await this._fillInput(this._employeeIdInput, data.employeeId);
        if (data.otherId !== undefined) await this._fillInput(this._otherIdInput, data.otherId);
        if (data.driversLicenseNumber !== undefined) await this._fillInput(this._driversLicenseNumberInput, data.driversLicenseNumber);

        if (data.nationality !== undefined) await this._selectFromDropdown(this._nationalitySelect, data.nationality);
        if (data.maritalStatus !== undefined) await this._selectFromDropdown(this._maritalStatusSelect, data.maritalStatus);
        if (data.dateOfBirth !== undefined) await this._fillInput(this._dateOfBirthInput, data.dateOfBirth);

        if (data.gender === "Male") await this._genderMaleRadio.click();
        if (data.gender === "Female") await this._genderFemaleRadio.click();

        await this._personalSaveButton.click();
    }

    async expectPersonalDetailsSaved(data: PersonalDetailsData): Promise<void> {
        if (data.firstName !== undefined) await expect(this._firstNameInput, "First name should be saved").toHaveValue(data.firstName);
        if (data.middleName !== undefined) await expect(this._middleNameInput, "Middle name should be saved").toHaveValue(data.middleName);
        if (data.lastName !== undefined) await expect(this._lastNameInput, "Last name should be saved").toHaveValue(data.lastName);

        if (data.employeeId !== undefined) await expect(this._employeeIdInput, "Employee Id should be saved").toHaveValue(data.employeeId);
        if (data.otherId !== undefined) await expect(this._otherIdInput, "Other Id should be saved").toHaveValue(data.otherId);

        if (data.driversLicenseNumber !== undefined) await expect(this._driversLicenseNumberInput, "Driver's License Number should be saved").toHaveValue(data.driversLicenseNumber);

        if (data.nationality !== undefined) await expect(this._nationalitySelect, "Nationality should be saved").toContainText(data.nationality);
        if (data.maritalStatus !== undefined) await expect(this._maritalStatusSelect, "Marital Status should be saved").toContainText(data.maritalStatus);
        if (data.dateOfBirth !== undefined) await expect(this._dateOfBirthInput, "Date of Birth should be saved").toHaveValue(data.dateOfBirth);

        if (data.gender === "Male") await expect(this._genderMaleRadio.locator("input"), "Male should be selected").toBeChecked();
        if (data.gender === "Female") await expect(this._genderFemaleRadio.locator("input"), "Female should be selected").toBeChecked();
    }

    async updateAndSaveCustomFields(data: CustomFieldsData): Promise<void> {
        await expect(this._customFieldsTitle, "\"Custom Fields\" title should be visible").toBeVisible();

        if (data.bloodType !== undefined) await this._selectFromDropdown(this._bloodTypeSelect, data.bloodType);
        if (data.testField !== undefined) await this._fillInput(this._testFieldInput, data.testField);

        await this._customFieldsSaveButton.click();
    }

    async expectCustomFieldsSaved(data: CustomFieldsData): Promise<void> {
        if (data.bloodType !== undefined) await expect(this._bloodTypeSelect, "Blood Type should be saved").toContainText(data.bloodType);
        if (data.testField !== undefined) await expect(this._testFieldInput, "Test_Field should be saved").toHaveValue(data.testField);
    }

    async attachmentsClickAdd(): Promise<void> {
        await expect(this._attachmentsTitle, "\"Attachments\" title should be visible").toBeVisible();
        await this._attachmentsAddButton.click();
        await expect(this._addAttachmentTitle, "\"Add Attachment\" title should be visible").toBeVisible();
    }

    async addAttachment(data: AddAttachmentData): Promise<void> {
        await expect(this._addAttachmentTitle, "\"Add Attachment\" title should be visible").toBeVisible();

        await this._attachmentFileInput.setInputFiles(data.filePath);

        if (data.comment !== undefined) {
            await this._attachmentCommentTextarea.fill(data.comment);
        }

        if (data.action === "cancel") {
            await this._attachmentCancelButton.click();
            return;
        }

        await this._attachmentSaveButton.click();
    }

    async expectAttachmentPresent(fileName: string): Promise<void> {
        await expect(this._attachmentsSection, "Attachments section should be visible").toBeVisible();
        const row = this._attachmentsSection.locator(".oxd-table-body").locator("[role=\"row\"]").filter({ hasText: fileName }).first();
        await expect(row, "Attachment row should be present").toBeVisible();
    }

    private _escapeRegExp(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    private _byLabelInput(scope: Locator, labelText: string): Locator {
        const label = scope
            .locator("label.oxd-label")
            .filter({ hasText: new RegExp(`^${this._escapeRegExp(labelText)}$`) })
            .first();

        return label
            .locator("xpath=ancestor::div[contains(@class,'oxd-input-group')][1]")
            .locator("input.oxd-input")
            .first();
    }

    private _byLabelSelect(scope: Locator, labelText: string): Locator {
        return scope
            .locator(".oxd-input-group")
            .filter({ has: scope.locator("label").filter({ hasText: labelText }) })
            .locator(".oxd-select-text")
            .first();
    }

    private _byRadioLabel(scope: Locator, text: string): Locator {
        return scope.locator(".oxd-radio-wrapper label").filter({ hasText: text }).first();
    }

    private async _fillInput(input: Locator, value: string): Promise<void> { 
        await input.click();
        await input.fill("");
        await input.fill(value);
    }

    private async _selectFromDropdown(select: Locator, optionText: string): Promise<void> {
        await select.click();
        const option = this._page.getByRole("option", { name: optionText }).first();
        await option.click();
    }
}
