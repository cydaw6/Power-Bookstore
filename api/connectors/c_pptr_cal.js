
/*    Chasse aux livres      */




/*			test scraping Puppeteer		*/


//--------------------

//https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial
// https://www.py4u.net/discuss/277159

require('./globals')();
const puppeteer = require('puppeteer');

module.exports = function() {
    this.c_pptr_cal = async function (isbn) {
        const browser = await puppeteer.launch({
            headless: true, 
            args:['--no-sandbox',
            '--disable-setuid-sandbox'],
            userDataDir: './myUserDataDir',
            defaultViewport: {
                width: 1752,
                height: 980
            }
        });
        const page = await browser.newPage();
        // Chasse aux livres
        await page.goto(`https://www.chasse-aux-livres.fr/prix/${isbn}`);
        page.waitForXPath('//*[@id="offers-table"]');
        page.waitForXPath('//*[@id="recap-new"]/div[2]/a');
        // new price
        const [x] = await page.$x('//*[@id="recap-new"]/div[2]/a');
        const priceN = parseFloat((await (await x.getProperty('textContent')).jsonValue()).replace(',', '.'));
        // title
        const [x2] = await page.$x('//*[@id="book-title-and-details"]/h1');
        const title = await (await x2.getProperty('textContent')).jsonValue();
        // authors
        const [x3] = await page.$x('//*[@id="creators"]/span/a');
        const author = await (await x3.getProperty('textContent')).jsonValue();
        // isbn-10
        const [x4] = await page.$x('//*[@id="isbn10-1"]/p');
        const isbn_10 = await (await x4.getProperty('textContent')).jsonValue();
        // isbn-13
        const [x5] = await page.$x('//*[@id="ean"]/p');
        const isbn_13 = await (await x5.getProperty('textContent')).jsonValue();
        
        let [allusedPrices,used_prices_by_condition] = await page.evaluate((priceN) => {
            let results = [];
            let items = document.querySelectorAll('table#offers-table > tbody > tr');
            let used_prices_by_condition = {}
            let allusedPrices = [];
    
            for (const item of items) {
                let rowprice = item.querySelectorAll('td');
                let condition = rowprice[1].innerText;
                let priceNdelivery = parseFloat(rowprice[4].innerText.replace(',', '.'));
    
    
                if(priceNdelivery < priceN){
                    results.push({
                        condition: condition,
                        priceNdelivery,
                        // price: usedPrice,
                        //deliveryPrice: deliveryPrice,
                        //totalPrice: totalPrice,
                    });
                    allusedPrices.push(priceNdelivery);
                    if(!(condition in used_prices_by_condition)){
                        used_prices_by_condition[condition] = [];
                    }
                    used_prices_by_condition[condition].push(priceNdelivery);
                }
            }
            return [allusedPrices,used_prices_by_condition];
        }, priceN); 
        
        browser.close();
        
        let book = BookShell();
        book.title = title;
        book.authors = [author];
        book.isbn_10 = isbn_10;
        book.isbn_13 = isbn_13;
        book.selling_price = priceN;
        book.used_prices = {
            organized : used_prices_by_condition,
            recap :{
                min: parseFloat(Math.min(...allusedPrices).toLocaleString("en-EN")),
                    max: parseFloat(Math.max(...allusedPrices).toLocaleString("en-EN")),
                    avg:  parseFloat((allusedPrices.reduce((a, b) => a + b) / allusedPrices.length).toLocaleString("en-EN")),
                    number: allusedPrices.length
            }
        };
        book.ref_origin = "Chasse aux livres";
    
        return book;
    }
}


/*
(async function t(){
    console.log((await (c_puppeteer('2253129453'))));
})();
*/

