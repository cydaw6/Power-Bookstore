


/*			test scraping Puppeteer		*/


//--------------------

//https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial


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


	// Amazon
	await page.goto(`https://www.amazon.fr/dp/${isbn}`);
    // Titre
	const [x] = await page.$x('//*[@id="productTitle"]');
	const title = await (await x.getProperty('textContent')).jsonValue();
	// new price
	const [x2] = await page.$x('//*[@id="newBuyBoxPrice"]');
	const priceN = parseFloat((await (await x2.getProperty('textContent')).jsonValue()).replace(',', '.'));
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
    await page.waitForSelector('#all-offers-display-scroller');
    // https://www.py4u.net/discuss/277159
    const delay = 3000;
    let preCount = 0;
    let postCount = 0;
    do {
        preCount = await getCount(page);
        await scrollDown(page);
        await page.waitFor(delay);
        postCount = await getCount(page);
    } while (postCount > preCount);







    // waiting for our divs to come
    await page.waitForSelector('#aod-offer');
    // used price format
    let usedPrices = await page.evaluate((priceN) => {
        let results = [];
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
            if((usedPrice) < priceN){
                results.push({
                    condition: condition,
                    price: usedPrice,
                    deliveryPrice: deliveryPrice,
                    totalPrice: totalPrice,
                });
            }
        }
        
        return results;
    }, priceN);


    
	
    browser.close();
	console.log({
        title, 
        priceN, 
        thumbnail, 
        usedPrices
        });

    //await page.waitForXPath('//*[@id="newBuyBoxPrice"]'); // would have to wait for worldcat because price requested trough network (it load)
	
}
//run('https://www.amazon.fr/dp/2253168688').then(console.log).catch(console.error);
/*
run('https://www.worldcat.org/isbn/2253129453')
.then((value) => {
	//let v = value.rawtxt;
	let
	console.log(`Worldcat - Titre ${value.titre} - Amazon price (USD) :`);
	
	//renvoyer la réponse json ici
}).catch(console.error);
*/


c_puppeteer('2253129453');


async function getCount(page) {
    return await page.$$eval('#all-offers-display-scroller', a => a.length);
  }
  
  async function scrollDown(page) {
    await page.$eval('#all-offers-display-scroller:last-child', e => {
      e.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
    });
  }