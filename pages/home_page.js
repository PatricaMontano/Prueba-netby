const { By } = require("selenium-webdriver/lib/by");
const { Key } = require("selenium-webdriver/lib/input");

class HomePage {
    constructor(driver) {
        this.driver = driver;
    }

    async getTitlePage(){
        return await this.driver.getTitle();
    }

    async searchCardByName(name){
        const coincidencia = await this.driver.findElement(By.xpath('//h5[.="'+name+'"]'));
        if (await coincidencia.getText() === name) {
            return true;
        }
        return false;
    }   

    async addDateTravel(tipoFecha,fecha){
        await this.driver.findElement(By.xpath('//label[.="'+tipoFecha+'"]//preceding-sibling::input[1]')).click();
        const fechaFormated = fecha.split('/');
        const day = parseInt(fechaFormated[0]);
        const month = parseInt(fechaFormated[1]);
        const year = fechaFormated[2];

        //await this.driver.sleep(1000);
        await this.driver.findElement(By.css('#years')).click();
        await this.driver.findElement(By.id(year)).click();
        

        const dicionaryMonths = {
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June": 6,
            "July": 7,
            "August": 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12
          };
        const datePickerMonth = await this.driver.findElement(By.css('[data-react-toolbox="month"] .theme__title___2Ue3-')).getText();
        const regex = /^[a-zA-Z]+/;
        const pickerMonth = datePickerMonth.match(regex)[0];
        const numberMonthPicker = dicionaryMonths[pickerMonth];
        
        let result = month - numberMonthPicker;
        while (result != 0) {
            if(result>0){
                const right = await this.driver.findElement(By.id('right'));
                await right.click();
                result--;
            }
            if(result<0){
                const left = await this.driver.findElement(By.id('left'));
                await left.click();
                result++;
            }
        }
        await this.driver.sleep(1999);
        const resultDays = await this.driver.findElements(By.css('div[data-react-toolbox="day"]'));
        await resultDays[day-1].click();

        await this.driver.findElement(By.xpath('//button[.="Ok"]')).click();
    }

    async selectAdult(count){
        const inputElement = await this.driver.findElement(By.css('[value="Adults (18+)"]'));
        await inputElement.click();
        const element = await this.driver.findElement(By.xpath('//li[.="Adults (18+)"]//following-sibling::li['+count+']'));
        await element.click();
    }
    async selectChildren(count){
        const inputElement = await this.driver.findElement(By.css('[value="Children (0-7)"]'));
        await inputElement.click();
        const element = await this.driver.findElement(By.xpath('//li[.="Children (0-7)"]//following-sibling::li['+count+']'));
        await element.click();
    }

    async filterColourPlanet(color){
        const inputElement = await this.driver.findElement(By.css('[value="Planet color"]'));
        await inputElement.click();
        const element = await this.driver.findElement(By.xpath('//li[.="'+color+'"]'));
        await element.click();
    }

    async countCard(){
        const cardsMenu = await this.driver.findElements(By.css('[data-react-toolbox="card"]'));
        return cardsMenu.length;
    }

    async selectCardBook(name){
        const titleCard = await this.driver.findElement(By.xpath('//h5[.="'+name+'"]//ancestor::div[@data-react-toolbox="card"]'));
        const cardBook = await titleCard.findElement(By.css('button[data-react-toolbox="button"]'));
        await cardBook.click();
    }
}

module.exports = HomePage;