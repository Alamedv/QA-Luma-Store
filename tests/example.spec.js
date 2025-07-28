// @ts-check
import { test, expect } from '@playwright/test';
import { TIMEOUT } from 'dns';

//dados do usuario
export class Usuario {
  constructor(nome, sobrenome, email, senha, aniversario, endereco, telefone) {
    this.nome = 'Anita';
    this.sobrenome = 'Lawson';
    this.email = 'anita' + Math.floor(Math.random() * 1000) + '.lawson@example.com';
    this.aniversario = '9/5/1944';
    this.telefone = '(970) 523-6639';
  }
}
//endereço do usuario
export class Endereco {
  constructor(rua, cidade, estado, cep, pais, senha) {
    this.rua = '9805 Central St';
    this.cidade = 'Denver';
    this.estado = 'Colorado';
    this.cep = '80202';
    this.pais = 'United States';
    this.senha = this.estado + Math.floor(Math.random() * 10000);

  }
}

//bloqueio de anúncios

const bloqueiaAnuncios = async (page) => {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (
      url.includes('doubleclick.net') ||
      url.includes('google-analytics.com')
    ) {
      console.log(`Bloqueando: ${url}`);
      route.abort();
    } else {
      route.continue();
    }
  });
}


test('Deve entrar na Home Page e fazer login', async ({ page }) => {
  await bloqueiaAnuncios(page);


  await page.goto('https://magento.softwaretestingboard.com/');
  await page.reload();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Home Page');

  await page.locator('//div[@class=\'panel header\']//a[normalize-space()=\'Create an Account\']').click();
  await expect(page).toHaveTitle('Create New Customer Account');
  await expect(page.locator('//span[@class=\'base\']')).toBeVisible();
  await page.waitForLoadState('networkidle');

  const usuario = new Usuario();
  const endereco = new Endereco();

  await page.getByRole('textbox', { name: 'First Name*' }).fill(usuario.nome);
  await page.getByRole('textbox', { name: 'Last Name*' }).fill(usuario.sobrenome);
  await page.getByRole('textbox', { name: 'Email*' }).fill(usuario.email);
  await page.getByRole('textbox', { name: 'Password*', exact: true }).fill(endereco.senha);
  await page.getByRole('textbox', { name: 'Confirm Password*' }).fill(endereco.senha);
  await page.getByRole('button', { name: 'Create an Account' }).click();

  await expect(page.getByText('Thank you for registering with Main Website Store.')).toBeVisible();

});

test('Deve buscar item e fazer checkout', async ({ page }) => {
  await bloqueiaAnuncios(page);
  const usuario = new Usuario();
  const endereco = new Endereco();

  await page.goto('https://magento.softwaretestingboard.com/');
  await page.reload();

  await page.getByRole('combobox', { name: 'Search' }).fill('shirt');
  await page.locator('//button[@title=\'Search\']').press('Enter');

  const lastResult = page.locator('.product-item').last();
  await lastResult.click();

  await expect(page.locator('//span[normalize-space()=\'In stock\']')).toBeVisible();
  await page.locator('//div[@id=\'option-label-size-143-item-168\']').click();
  await page.locator('//div[@id=\'option-label-color-93-item-49\']').click();
  await page.locator('//input[@id=\'qty\']').fill('2');
  await page.locator('//button[@id=\'product-addtocart-button\']').click();
  await expect(page.locator('//a[normalize-space()=\'shopping cart\']')).toBeVisible();
  await page.locator('//a[normalize-space()=\'shopping cart\']').click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  await expect(page.getByText('Shipping Address')).toBeVisible();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(usuario.email);
  await page.getByRole('textbox', { name: 'First Name' }).fill(usuario.nome);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(usuario.sobrenome);
  await page.getByRole('textbox', { name: 'Street Address: Line 1' }).fill(endereco.rua);
  await page.getByRole('textbox', { name: 'City' }).fill(endereco.cidade);
  await page.getByRole('combobox', { name: 'State/Province' }).selectOption(endereco.estado);
  await page.getByRole('textbox', { name: 'ZIP/Postal Code' }).fill(endereco.cep);
  await page.getByRole('combobox', { name: 'Country' }).selectOption(endereco.pais);
  await page.getByRole('textbox', { name: 'Phone Number' }).fill(usuario.telefone);
  await page.locator('//input[@name="ko_unique_1"]').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page).toHaveTitle('Checkout');
  await page.getByRole('button', { name: 'Place Order' }).click();
});

test('Adicionar comentário no produto', async ({ page }) => {
  await bloqueiaAnuncios(page);

  const usuario = new Usuario();
  const endereco = new Endereco();

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
  await page.locator('//input[@id=\'nickname_field\']').fill(usuario.nome);
  await page.locator('//input[@id=\'summary_field\']').fill('Entrega Rápida');
  await page.locator('//textarea[@id=\'review_field\']').fill('Entrega muito rápida não testei ainda');
  await page.locator('//span[normalize-space()=\'Submit Review\']').click();
  await expect(page.getByText('You submitted your review for moderation.')).toBeVisible();

});
