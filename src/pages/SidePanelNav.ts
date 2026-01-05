import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SidePanelNav extends BasePage {
    private readonly _sidePanelNav: Locator;
    private readonly _brandLink: Locator;
    private readonly _closeButton: Locator;
    private readonly _menuBody: Locator;
    private readonly _menuSearch: Locator;
    private readonly _buzzMenuItem: Locator;

    constructor(page: Page) {
        super(page);

        this._sidePanelNav = this.page.locator("nav.oxd-navbar-nav[role='navigation'][aria-label='Sidepanel']");
        this._brandLink = this._sidePanelNav.locator("a.oxd-brand");
        this._closeButton = this._sidePanelNav.locator("i.oxd-sidepanel-header-close");
        this._menuBody = this._sidePanelNav.locator(".oxd-sidepanel-body");
        this._menuSearch = this._sidePanelNav.locator(".oxd-main-menu-search");
        this._buzzMenuItem = this._sidePanelNav.locator(".oxd-main-menu-item--name", { hasText: "Buzz" });
    }

    get sidePanelNav(): Locator {
        return this._sidePanelNav;
    }

    get brandLink(): Locator {
        return this._brandLink;
    }

    get closeButton(): Locator {
        return this._closeButton;
    }

    get menuBody(): Locator {
        return this._menuBody;
    }

    get menuSearch(): Locator {
        return this._menuSearch;
    }

    get buzzMenuItem(): Locator {
        return this._buzzMenuItem;
    }

    async clickBrandLink(): Promise<void> {
        await this.brandLink.click();
    }

    async clickClose(): Promise<void> {
        await this.closeButton.click();
    }

    async clickBuzz(): Promise<void> {
        await this.buzzMenuItem.click();
    }
}
