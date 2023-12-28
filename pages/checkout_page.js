const { By } = require("selenium-webdriver/lib/by");
const { Key } = require("selenium-webdriver/lib/input");

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }

    async fillFormCheckout(name, email, socialNumber, phone) {
        await this.driver.findElement(By.xpath('//span[.="Name"]//preceding-sibling::input[1]')).sendKeys(name);
        await this.driver.findElement(By.xpath('//span[.="Email Address"]//preceding-sibling::input[1]')).sendKeys(email);
        await this.driver.findElement(By.xpath('//span[.="Social Security Number"]//preceding-sibling::input[1]')).sendKeys(socialNumber);
        await this.driver.findElement(By.xpath('//span[.="Phone Number"]//preceding-sibling::input[1]')).sendKeys(phone);
    }

    async uploadPhoto(pathPhoto){
        await this.driver.findElement(By.css('input[type="file"]')).sendKeys(pathPhoto);
    }

    async addPromotion(codPromotion){
        await this.driver.findElement(By.name('promo')).sendKeys(codPromotion);
        await this.driver.findElement(By.xpath('//button[.="Apply"]')).click();
    }

    async selectPayNow(){
        await this.driver.findElement(By.css('[data-react-toolbox="check"]')).click();
        await this.driver.findElement(By.xpath('//button[.="Pay now"]')).click();
    }
}

module.exports = CheckoutPage;