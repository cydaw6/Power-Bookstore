


/*			test scraping Puppeteer		*/


//--------------------

//https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial
// https://www.py4u.net/discuss/277159

require('./globals')();
const puppeteer = require('puppeteer');

module.exports = function() {
    this.c_pptr_amazon = async function (isbn) {
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
        // Amazon
        await page.goto(`https://www.amazon.fr/dp/${isbn}`);
        // Titre
        const [x] = await page.$x('//*[@id="productTitle"]');
        const title = await (await x.getProperty('textContent')).jsonValue();
        // Author
        const [x1] = await page.$x('//*[@id="bylineInfo"]/span/span[1]/a[1]');
        const author = await (await x1.getProperty('textContent')).jsonValue();
        // new price
        const [x7] = await page.$x('//*[@id="newBuyBoxPrice"]');
        const new_price = parseFloat((await (await x7.getProperty('textContent')).jsonValue()).replace(',', '.'));
        // image
        const [img] = await page.$x('//*[@id="imgBlkFront"]');
        const thumbnail = await (await img.getProperty('src')).jsonValue();
    
        // Get link of used books
        const [el3] = await page.$x('//*[@id="tmmSwatches"]/ul/li[4]/span/span[3]/span[1]/span/a');
        const link = await el3.getProperty('href');
        const usedBLink = await link.jsonValue();
        // Navigate to the link we got
        await page.goto(`${(await usedBLink)}`);
        // waiting for our divs to come
        await page.waitForSelector('#aod-offer');
        // used price format
        let [used_prices_by_condition, allusedPrices] = await page.evaluate((new_price) => {
            let results = [];
            let allusedPrices = [];
            let used_prices_by_condition = {}
            let items = document.querySelectorAll('#aod-offer');
            
            for (const item of items) {
                let condition = item.querySelector('h5').innerText.replace("D'occasion - ", '');
                let usedPrice = parseFloat((item.querySelector('span.a-offscreen').innerText).replace(',', '.'));
                let deliveryPrice = parseFloat(item.querySelector('#ddmDeliveryMessage').innerText
                                    .split(':')[0]
                                    .replace(',', '.')
                                    .replace(/[^0-9.-]/g, '')
                                    );
                                    //
                let totalPrice = usedPrice+deliveryPrice;
                if((usedPrice) < new_price){
                    results.push({
                        condition: condition,
                        //price: usedPrice,
                        //deliveryPrice: deliveryPrice,
                        totalPrice: totalPrice,
                    });
                    allusedPrices.push(totalPrice);
                    if(!(condition in used_prices_by_condition)){
                        used_prices_by_condition[condition] = [];
    
                    }
                    used_prices_by_condition[condition].push(totalPrice);
                }
            }
            
            return [used_prices_by_condition, allusedPrices];
        }, new_price);
    
        browser.close();
    
        let book            = BookShell();
        book.title          = title;
        book.authors        = [author];
        book.selling_price  = new_price; 
        book.thumbnail      = thumbnail;
        book.used_prices    = {
            organized: used_prices_by_condition,
            recap: {
                    min: parseFloat(Math.min(...allusedPrices).toLocaleString("en-EN")),
                    max: parseFloat(Math.max(...allusedPrices).toLocaleString("en-EN")),
                    avg:  parseFloat((allusedPrices.reduce((a, b) => a + b) / allusedPrices.length).toLocaleString("en-EN")),
                    number: allusedPrices.length
                }
        },
        book.ref_origin = "Amazon"
    
        return [book];	
    }

}


/*
(async function t(){
    console.log((await (c_puppeteer('2253129453'))));
})();
*/

