import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HeaderPage extends BasePage {
    private readonly _topBar: Locator;
    private readonly _hamburgerButton: Locator;
    private readonly _moduleTitle: Locator;
    private readonly _upgradeLink: Locator;
    private readonly _upgradeButton: Locator;
    private readonly _userDropdown: Locator;
    private readonly _userDropdownTab: Locator;
    private readonly _userName: Locator;
    private readonly _userAvatar: Locator;
    private readonly _helpButton: Locator;

    constructor(page: Page) {
        super(page);

        this._topBar = this.page.locator("header.oxd-topbar");
        this._hamburgerButton = this._topBar.locator("i.oxd-topbar-header-hamburger");
        this._moduleTitle = this._topBar.locator("h6.oxd-topbar-header-breadcrumb-module");
        this._upgradeLink = this._topBar.locator("a.orangehrm-upgrade-link");
        this._upgradeButton = this._upgradeLink.locator("button.orangehrm-upgrade-button");
        this._userDropdown = this._topBar.locator("li.oxd-userdropdown");
        this._userDropdownTab = this._userDropdown.locator("span.oxd-userdropdown-tab");
        this._userName = this._userDropdown.locator("p.oxd-userdropdown-name");
        this._userAvatar = this._userDropdown.locator("img.oxd-userdropdown-img");
        this._helpButton = this._topBar.locator("button.oxd-icon-button[title='Help']");
    }

    get topBar(): Locator {
        return this._topBar;
    }

    get hamburgerButton(): Locator {
        return this._hamburgerButton;
    }

    get moduleTitle(): Locator {
        return this._moduleTitle;
    }

    get upgradeLink(): Locator {
        return this._upgradeLink;
    }

    get upgradeButton(): Locator {
        return this._upgradeButton;
    }

    get userDropdown(): Locator {
        return this._userDropdown;
    }

    get userDropdownTab(): Locator {
        return this._userDropdownTab;
    }

    get userName(): Locator {
        return this._userName;
    }

    get userAvatar(): Locator {
        return this._userAvatar;
    }

    get helpButton(): Locator {
        return this._helpButton;
    }

    async clickHamburger(): Promise<void> {
        await this.hamburgerButton.click();
    }

    async clickUpgrade(): Promise<void> {
        await this.upgradeButton.click();
    }

    async clickUserDropdown(): Promise<void> {
        await this.userDropdownTab.click();
    }

    async clickHelp(): Promise<void> {
        await this.helpButton.click();
    }

    async getModuleTitleText(): Promise<string> {
        return this.moduleTitle.innerText();
    }

    async getUserNameText(): Promise<string> {
        return this.userName.innerText();
    }
}
