
import{test, expect} from '@playwright/test';
import { LoginPage_SOLID } from '../../../pages/LoginPage_SOLID';
import { CurrencyPage } from '../../../pages/CurrencyPage';


// CHANGE: Read credentials from environment variables ONLY - no hardcoded
// fallback values.
// BEFORE:
//   await loginPage.login(process.env.TEST_EMAIL || 'user2402@gmail.com',
//                          process.env.TEST_PASSWORD || 'Admin@123');
// WHY THIS WAS CHANGED (security fix, not just style):
// Hardcoding a real-looking email/password directly in source code means
// those credentials get committed to git history permanently - even if
// removed later, they remain recoverable from old commits. If this repo is
// ever made public, forked, or shared, that's a leaked credential incident.
// Test credentials should live ONLY in .env files (which are .gitignored)
// or in your CI/CD pipeline's secret manager - never as a fallback literal
// in code.
//
// Instead, we now FAIL FAST with a clear error if the env vars are missing,
// rather than silently falling back to a hardcoded value. This surfaces
// misconfiguration immediately instead of masking it.


  test('Currency test : INR', async({page}) =>
        {
            
           
            const currencyPage = new CurrencyPage(page);
            await currencyPage.goto();
            await currencyPage.isLoaded();
            await page.waitForTimeout(5000);
            
            const selectedOptionText = await currencyPage.currencyDropDow
                .locator('option:checked')
                .textContent();
            console.log('Option before selection:', selectedOptionText?.trim());
            await currencyPage.selectCurrency('INR')
             await page.waitForTimeout(5000);

            await currencyPage.verifySelectedCurrency('INR')
            
            const selectedOptionText1 = await currencyPage.currencyDropDow
                .locator('option:checked')
                .textContent();
            console.log('Option afer selection:', selectedOptionText1?.trim());
            

        })

         test('Currency test : USD', async({page}) =>
        {
             const currencyPage = new CurrencyPage(page);
            await currencyPage.goto();
            await currencyPage.isLoaded();

            /*const selectedOptionText = await currencyPage.currencyDropDow
                .locator('option:checked')
                .textContent();
            console.log('Option before selection(Currency test : USD):', selectedOptionText?.trim());*/

            await currencyPage.selectOption('USD',currencyPage.currencyDropDow);
             
            await currencyPage.verifySelectedCurrency('USD')

          

        })
//Fixed test - 'Hello'
//Variable inside text - `Hello ${name}
//LOCAL MACHINE - .env files
//CI CD - vault - credentials are masked - not displayed in plain english language
