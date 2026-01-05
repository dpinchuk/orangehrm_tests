import { test } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";
import { LeftNavMenu } from "../src/pages/LeftNavMenu";
import { LoginPage } from "../src/pages/LoginPage";
import { EmployeeListPage } from "../src/pages/employee/EmployeeListPage";
import { AddEmployeePage } from "../src/pages/AddEmployeePage";
import { EmployeeDetailsPage } from "../src/pages/employee/EmployeeDetailsPage";

test.describe("PIM - Add Employee", () => {
    test("Add employee with random data, verify created, then edit (using existing methods only)", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const leftNav = new LeftNavMenu(page);
        const employeeListPage = new EmployeeListPage(page);
        const addEmployeePage = new AddEmployeePage(page);
        const employeeDetailsPage = new EmployeeDetailsPage(page);

        const createLoginDetails = true;

        const password = createLoginDetails ? faker.internet.password({ length: 15 }) : undefined;

        const employeeData = {
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            lastName: faker.person.lastName(),
            employeeId: String(faker.number.int({ min: 100000, max: 999999 })),
            username: createLoginDetails ? faker.internet.userName() : undefined,
            status: "Enabled" as const,
            password,
            confirmPassword: password,
        };

        await test.step("Step 1 - Login", async () => {
            await page.goto("/");
            await loginPage.login(
                process.env.E2E_USERNAME ?? "Admin",
                process.env.E2E_PASSWORD ?? "admin123",
            );
        });

        await test.step("Step 2 - Open PIM via left nav menu", async () => {
            await leftNav.clickPim();
            await employeeListPage.expectPageLoaded();
        });

        await test.step("Step 3 - Click Add on Employee List page", async () => {
            await employeeListPage.clickAdd();
            await addEmployeePage.expectPageLoaded();
        });

        await test.step("Step 4 - Fill Add Employee form with faker data and Save", async () => {
            await addEmployeePage.fillAndSave(
                {
                    firstName: employeeData.firstName,
                    middleName: employeeData.middleName,
                    lastName: employeeData.lastName,
                    employeeId: employeeData.employeeId,
                    username: employeeData.username,
                    status: employeeData.status,
                    password: employeeData.password,
                    confirmPassword: employeeData.confirmPassword,
                },
                createLoginDetails,
            );
        });

        await test.step("Step 5 - Verify details page opened and created employee is displayed", async () => {
            await employeeDetailsPage.expectPageLoaded();
            await employeeDetailsPage.expectCreatedEmployeeDataDisplayed({
                firstName: employeeData.firstName,
                middleName: employeeData.middleName,
                lastName: employeeData.lastName,
            });
        });

        await test.step("Step 6 - Edit Personal Details and save", async () => {
            const edited = {
                otherId: `OID-123-${faker.person.zodiacSign()}`,
                driversLicenseNumber: `DL-555-777-${faker.string.alpha(5)}`,
                gender: "Male",
            } as const;

            await employeeDetailsPage.updateAndSavePersonalDetails(edited);
            await employeeDetailsPage.expectPersonalDetailsSaved(edited);
        });

        await test.step("Step 7 - Edit Custom Fields and save", async () => {
            const custom = {
                bloodType: "A+",
                testField: "hello",
            } as const;

            await employeeDetailsPage.updateAndSaveCustomFields(custom);
            await employeeDetailsPage.expectCustomFieldsSaved(custom);
        });

        await test.step("Step 8 - Add attachment", async () => {
            await employeeDetailsPage.attachmentsClickAdd();
            await employeeDetailsPage.addAttachment({
                filePath: "fixtures/files/test-attachment.txt",
                comment: "auto",
                action: "save",
            });
            await employeeDetailsPage.expectAttachmentPresent("test-attachment.txt");
        });

    });
});
