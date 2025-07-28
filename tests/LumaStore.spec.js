// @ts-check
import { test, expect } from '@playwright/test';
import { User, Address } from './support/UserData.js';
import { adBlocker } from './support/helpers.js';
import { TIMEOUT } from 'dns';
import { defineConfig, devices } from '@playwright/test';

export default {
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  retries: 2,
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
};

test.beforeEach(async ({ page }) => {
  await adBlocker(page);
  await page.goto('https://magento.softwaretestingboard.com/');
  await page.reload();
});

test('go to the home page and register', async ({ page }) => {
  const user = new User();
  const address = new Address();

  await page.locator('//div[@class=\'panel header\']//a[normalize-space()=\'Create an Account\']').click();
  await expect(page).toHaveTitle('Create New Customer Account');
  await expect(page.locator('//span[@class=\'base\']')).toBeVisible();

  await page.getByRole('textbox', { name: 'First Name*' }).fill(user.name);
  await page.getByRole('textbox', { name: 'Last Name*' }).fill(user.surname);
  await page.getByRole('textbox', { name: 'Email*' }).fill(Math.floor(Math.random() * 1000) + user.email);
  await page.getByRole('textbox', { name: 'Password*', exact: true }).fill(address.password);
  await page.getByRole('textbox', { name: 'Confirm Password*' }).fill(address.password);
  await page.getByRole('button', { name: 'Create an Account' }).click();
  await expect(page.getByText('Thank you for registering with Main Website Store.')).toBeVisible();

});

test('search for item and checkout', async ({ page }) => {
  const user = new User();
  const address = new Address();

  await page.getByRole('combobox', { name: 'Search' }).fill('shirt');
  await page.locator('//button[@title=\'Search\']').press('Enter');
  const lastResult = page.locator('.product-item').last();
  await lastResult.click();
  await expect(page.locator('//span[normalize-space()=\'In stock\']')).toBeVisible();

  await page.locator('#option-label-size-143-item-168').click();
  await page.locator('#option-label-color-93-item-49').click();
  await page.locator('#qty').fill('2');
  await page.locator('#product-addtocart-button').click();
  await expect(page.locator('//a[normalize-space()=\'shopping cart\']')).toBeVisible();

  await page.locator('//a[normalize-space()=\'shopping cart\']').click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click({ timeout: 10000 });

  await expect(page.getByText('Shipping Address')).toBeVisible();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(Math.floor(Math.random() * 1000) + user.email);
  await page.getByRole('textbox', { name: 'First Name' }).fill(user.name);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(user.surname);
  await page.getByRole('textbox', { name: 'Street Address: Line 1' }).fill(address.street);
  await page.getByRole('textbox', { name: 'City' }).fill(address.city);
  await page.getByRole('combobox', { name: 'State/Province' }).selectOption(address.state);
  await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(address.zip);
  await page.getByRole('combobox', { name: 'Country' }).selectOption(address.country);
  await page.getByRole('textbox', { name: 'Phone Number' }).fill(user.phone);
  await page.locator('input[name="ko_unique_1"]').check();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
});

test('Add product review', async ({ page }) => {

  const user = new User();
  await page.goto('https://magento.softwaretestingboard.com/');
  await page.reload();

  await page.getByRole('combobox', { name: 'Search' }).fill('shirt');
  await page.locator('//button[@title=\'Search\']').press('Enter');
  const lastResult = page.locator('.product-item').last();
  await lastResult.click();
  await expect(page.locator('//span[normalize-space()=\'In stock\']')).toBeVisible();

  await page.getByRole('link', { name: 'Reviews' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('label[for="Rating_2"]').click();
  await page.locator('//input[@id=\'nickname_field\']').fill(user.name);
  await page.locator('//input[@id=\'summary_field\']').fill('Fast Delivery');
  await page.locator('//textarea[@id=\'review_field\']').fill('Very fast delivery, I haven\'t tested it yet');
  await page.locator('//span[normalize-space()=\'Submit Review\']').click();
  ;
});