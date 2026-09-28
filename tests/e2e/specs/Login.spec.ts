import { test,expect } from '@playwright/test';
import { LoginPage_SOLID } from '../../../pages/LoginPage_SOLID';
import { config } from '../../../config/environment';


test('Login', async ({ page }) => {
	const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASS = process.env.TEST_PASSWORD;
console.log({
  emailLoaded: Boolean(process.env.TEST_EMAIL),
  passwordLoaded: Boolean(process.env.TEST_PASSWORD),
});
if (!TEST_EMAIL || !TEST_PASS) {
	throw new Error('TEST_EMAIL and TEST_PASSWORD environment variables are required');
} 
	const loginPage = new LoginPage_SOLID(page);
	const loginUrl = `${config.baseUrl}${config.loginPath}`;

	await loginPage.goto(loginUrl);
    await loginPage.isLoaded();
    await loginPage.login(TEST_EMAIL,TEST_PASS);
	await loginPage.verifyLogin();
});

import{Page, Locator, expect} from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';
import {config} from '../config/environment';

export class LoginPage_SOLID extends BasePage_SOLID
//inheritance - parent properties and methods
//click, navigate, fill, page
{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page)
    {
        super(page);// calling the constructor of my parent class
        //constructor(page: Page)
    //     this.page = page;
    // }
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator();
        this.loginButton = page.locator();
    }

    async goto(): Promise<void>
    {
        //await this.navigate('https://www.kapruka.com/shops/customerAccounts/accountLogin.jsp');
        await this.navigate(`${config.baseUrl}${config.loginPath}`);
    }
    async login(email:string, password: string): Promise<void>
    {
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async verifyLoginSuccess(): Promise<void>
    {
        const currentUrl = this.page.url();
        await expect(this.page).not.toHaveURL(/accountLogin/);
        // -> /..../
    }
    async isLoaded(): Promise<void> {
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

}
