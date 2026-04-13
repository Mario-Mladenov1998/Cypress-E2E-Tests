import LoginPage from '../../pages/LoginPage';

//Helper function
function login() {
  const loginPage = new LoginPage();
  loginPage.visit();

  loginPage.enterUsername('standard_user');
  loginPage.enterPassword('secret_sauce');
  loginPage.clickLogin();
}

describe('Login Test', () => {

  it('Valid Login', () => {
    const loginPage = new LoginPage();

    loginPage.visit();
    loginPage.enterUsername('standard_user');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.url().should('include', '/inventory');

    cy.contains('Products').should('be.visible');
  });

  it('User cannot login with invalid password', () => {
    const loginPage = new LoginPage();

    loginPage.visit();
    loginPage.enterUsername('standard_user');
    loginPage.enterPassword('wrong_password');
    loginPage.clickLogin();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('User cannot login with empty fields', () => {
    const loginPage = new LoginPage();

    loginPage.visit();
    loginPage.clickLogin();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Username is required');
  });

  it('Locked user cannot login', () => {
    const loginPage = new LoginPage();

    loginPage.visit();
    loginPage.enterUsername('locked_out_user');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('User can add product to cart', () => {
    const loginPage = new LoginPage();

    loginPage.visit();

    loginPage.enterUsername('standard_user');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.get('.inventory_item').first().contains('Add to cart').click();

    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1');
  });

  it('User can remove product from cart', () => {
    const loginPage = new LoginPage();

    loginPage.visit();

    loginPage.enterUsername('standard_user');
    loginPage.enterPassword('secret_sauce');
    loginPage.clickLogin();

    cy.get('.inventory_item').first().contains('Add to cart').click();

    //Go to cart
    cy.get('.shopping_cart_link').click();

    //Remove
    cy.get('.cart_item').first().contains('Remove').click();

    cy.get('.shopping_cart_badge').should('not.exist');
  });
  it('User can complete checkout with correct total price', () => {
  const loginPage = new LoginPage();

  // LOGIN
  loginPage.visit();
  loginPage.enterUsername('standard_user');
  loginPage.enterPassword('secret_sauce');
  loginPage.clickLogin();

  cy.contains('Products').should('be.visible');

  // ADD PRODUCT
    cy.get('.inventory_item_price')
      .first()
      .invoke('text')
      .then((priceText) => {

        const price = parseFloat(priceText.replace('$', ''));

        cy.contains('Add to cart').click();

        //Wait UI Update
        cy.get('.shopping_cart_badge')
          .should('be.visible')
          .and('have.text', '1');

          //Cart

        cy.get('.shopping_cart_link').click();

        cy.contains('Checkout').click();

        cy.get('[data-test="firstName"]').type('Mario');
        cy.get('[data-test="lastName"]').type('Canady');
        cy.get('[data-test="postalCode"]').type('1000');

        cy.contains('Continue').click();

        // VALIDATE 
        cy.get('.summary_subtotal_label')
          .invoke('text')
          .then((totalText) => {

            const total = parseFloat(
              totalText.replace('Item total: $', '')
            );

            expect(total).to.eq(price);

            cy.contains('Finish').click();
            cy.contains('Thank you for your order').should('be.visible');
          });
      });     
  });
  it('User cannot login with wrong password', () =>{
            const loginPage = new LoginPage();

            loginPage.visit();

            //Login with invalid credentials.
            loginPage.enterUsername('standard_user');
            loginPage.enterPassword('wrong_pass');
            loginPage.clickLogin();

            cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface');
          });
          it('User cannot login without username', () => {
            const loginPage = new LoginPage();

            loginPage.visit();
            loginPage.enterPassword('secret_sauce');
            loginPage.clickLogin();

            cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username is required');
          });
          it('User cannot login without password', () => {
            const loginPage = new LoginPage();
            
            loginPage.visit();

            loginPage.enterUsername('standard_user');
            loginPage.clickLogin();
            
            cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Password is required');
          });
          it('User cannot login with invalid username and password', () => {
            const loginPage = new LoginPage();

            loginPage.visit();
            loginPage.enterUsername('fake_user');
            loginPage.enterPassword('fake_pass');
            loginPage.clickLogin();

            cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface');
          });
          it('Checkout fails without first name', () => {
           const loginPage = new LoginPage();

            loginPage.visit();

            loginPage.enterUsername('standard_user');
            loginPage.enterPassword('secret_sauce');
            loginPage.clickLogin();
              
            

            cy.contains('Add to cart').click();
            cy.get('.shopping_cart_link').click();
            cy.contains('Checkout').click();

            cy.get('[data-test="lastName"]').type('Test');

            cy.get('[data-test="postalCode"]').type('1000');

            cy.contains('Continue').click();

            cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'First Name is required');
          });
          it('Checkout fails without postal code', () => {
            const loginPage = new LoginPage();

            loginPage.visit();

            loginPage.enterUsername('standard_user');
            loginPage.enterPassword('secret_sauce');
            loginPage.clickLogin();

            cy.contains('Add to cart').click();
            cy.get('.shopping_cart_link').click();
            cy.contains('Checkout').click();

            cy.get('[data-test="firstName"]').type('Mario');

            cy.get('[data-test="lastName"]').type('Canady');

            cy.contains('Continue').click();

            cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Postal Code is required');
          });
          it('User cannot proceed with empty cart', () => {
            const loginPage = new LoginPage();

            loginPage.visit();

            loginPage.enterUsername('standard_user');
            loginPage.enterPassword('secret_sauce');
            loginPage.clickLogin();

            cy.get('.shopping_cart_link').click();
            cy.contains('Checkout').click();

            //Check for products
            cy.get('.cart_item').should('not.exist');
          });
  });

