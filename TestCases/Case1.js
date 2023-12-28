const assert = require('assert');
const AssertionError = require('assert').AssertionError;
const { Builder, until } = require('selenium-webdriver');
const HomePage = require('../pages/home_page');
const CheckoutPage = require('../pages/checkout_page');

var capabilities = {
    'browserName': 'chrome',
    'chromeOptions': {
        'args': ['--enable-javascript'] // or ['--javascriptEnabled']
    }
};

describe('Suit de Prubas de Compra de Boletos', () => {
    let driver;
    let homePage;

    before(async () => {
        driver = await new Builder().withCapabilities(capabilities).build(); 
        await driver.get('https://demo.testim.io/'); 
          
    });

    it('Validar titulo de pagina web', async () => {       
        try {    
            homePage = new HomePage(driver);
            const title = await homePage.getTitlePage();
            const tituloEsperado = 'Space & Beyond | Testim.io demo';
            // assertion codes...
            assert.strictEqual(title,tituloEsperado);
                 
        } catch (error) {
            if (error instanceof AssertionError) {
                // Output expected AssertionErrors.
                throw new Error(error);                
            } else {
                // Output unexpected Errors.
                console.log(error);
            }                   
        }                
    });

    it('Busca que exista un destino al espacio llamado Madan', async () => {        
      try {
          homePage = new HomePage(driver);
          const elementoMadan = await homePage.searchCardByName("Madan");
          assert.strictEqual(elementoMadan,true);
               
      } catch (error) {
          if (error instanceof AssertionError) {
              // Output expected AssertionErrors.
              throw new Error(error);                
          } else {
              // Output unexpected Errors.
              console.log(error);
          }                   
      }                
  });

  it('Seleccionar una fecha de salida', async () => {        
    try {
        homePage = new HomePage(driver);
        await homePage.addDateTravel("Departing","18/01/2024");
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

  it('Elegir boleto para 2 adultos con 1 niño', async () => {        
    try {
        homePage = new HomePage(driver);
        await homePage.selectAdult("2");
        await homePage.selectChildren("1");
             
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

  it('filtrar planetas de color azul', async () => {     
    try {
        homePage = new HomePage(driver);
        await homePage.filterColourPlanet("Blue");
             
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});


it('visualizar 3 destinos, reservar planeta Tayabamba', async () => {        
    try {
        homePage = new HomePage(driver);
        const cardMenu = await homePage.countCard();
        await homePage.selectCardBook("Tayabamba");
        assert.strictEqual(cardMenu,3);
             
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

it('Rellenar checkout', async () => {        
    try {
        checkoutPage = new CheckoutPage(driver);
        await checkoutPage.fillFormCheckout("Johanna Patricia","johanna@gmail.com","111-11-1111","2124567890");
             
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

it('Cargar fotografia de carnet de vacunación', async () => {        
    try {
        checkoutPage = new CheckoutPage(driver);
        //await driver.sleep(5000);
        await checkoutPage.uploadPhoto('D:\\Descargas\\Ejemplo.png');
             
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

it('Ingresar el codigo promocional', async () => {        
    try {
        checkoutPage = new CheckoutPage(driver);
        //await driver.sleep(5000);
        await checkoutPage.addPromotion('30076');
             
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

it('seleccionar pagar', async () => {        
    try {
        checkoutPage = new CheckoutPage(driver);
        await checkoutPage.selectPayNow();
    } catch (error) {
        if (error instanceof AssertionError) {
            // Output expected AssertionErrors.
            throw new Error(error);                
        } else {
            // Output unexpected Errors.
            console.log(error);
        }                   
    }                
});

    after(async () => driver.quit());
})