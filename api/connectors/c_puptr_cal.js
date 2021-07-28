
/*    Chasse aux livres      */




/*			test scraping Puppeteer		*/


//--------------------

//https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial
// https://www.py4u.net/discuss/277159


const puppeteer = require('puppeteer');
let currr;
async function c_puppeteer (isbn) {
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
    page.waitForTimeout(1500);
    const [x] = await page.$x('//*[@id="recap-new"]/div[2]/a');
    const priceN = parseFloat((await (await x.getProperty('textContent')).jsonValue()).replace(',', '.'));
    
    let [prices,pricesByCondition] = await page.evaluate((priceN) => {
        let results = [];

        let items = document.querySelectorAll('table#offers-table > tbody > tr');
        let pricesByCondition = {}

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
                if(!(condition in pricesByCondition)){
                    pricesByCondition[condition] = [];
                }
                pricesByCondition[condition].push(priceNdelivery);
            }
            
        }
        
        return [results,pricesByCondition];
    }, priceN); 
    
   

    
    browser.close();
	console.log({
        priceN,
        prices,
        pricesByCondition
    });

	
}


c_puppeteer('2253129453');
