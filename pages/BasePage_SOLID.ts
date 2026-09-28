import{Page,Locator} from '@playwright/test'

export abstract class BasePage_SOLID {

     readonly page:Page;
    constructor(page:Page) {
        this.page = page;
    }

    async click(locator : Locator) : Promise<void>
    {
        await locator.waitFor({state:'visible'});
        await locator.click();
    }

    async navigate(url:string):Promise<void>
    {
        await this.page.goto(url,{waitUntil:'load'});
    }

    async fill(locator : Locator,value:string)
    {
        await locator.waitFor({state:'visible'});
        await locator.fill(value);
    }

    abstract isLoaded():Promise<void>
}