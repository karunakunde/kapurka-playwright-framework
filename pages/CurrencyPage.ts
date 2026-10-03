import { Page,Locator, expect } from "@playwright/test";
import { BasePage_SOLID } from "./BasePage_SOLID";

export class CurrencyPage extends BasePage_SOLID
{
    readonly currencyDropDow : Locator;
   

    constructor(page:Page){
        super(page);
        this.currencyDropDow = page.getByRole('combobox',{name:'Select Currency'});
    }
       async isLoaded(): Promise<void> {
        await expect(this.currencyDropDow).toBeVisible();
    }

    async goto(): Promise<void>
        {
            await this.navigate('/');
        }
    async selectCurrency(currency:'INR' | 'USD')    
    {
    
            await this.currencyDropDow.waitFor({state:'visible'})
            await Promise.all([
                 this.page.waitForLoadState('load'),
                 this.currencyDropDow.selectOption({label:currency})
            ]);
        
        
    }


    async verifySelectedCurrency(expected:string): Promise<void>
    {
        await expect(this.currencyDropDow).toHaveValue(expected);
    }
}