


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


	// Worldcat
	await page.goto(`https://www.worldcat.org/isbn/${isbn}`);
    //await page.waitForXPath('//*[@id="newBuyBoxPrice"]');
    // Titre
	const [x] = await page.$x('//*[@id="bibdata"]/h1');
	const title = await (await x.getProperty('textContent')).jsonValue();
    // Author
    const [x1] = await page.$x('//*[@id="bib-author-cell"]/a[1]');
    const author = await (await x1.getProperty('textContent')).jsonValue();
    // publisher
    const [x2] = await page.$x('//*[@id="bib-publisher-cell"]');
    const publisher = await (await x2.getProperty('textContent')).jsonValue();
    // collection
    const [x3] = await page.$x('//*[@id="bib-hotSeriesTitles-cell"]/a[2]');
    const collection = await (await x3.getProperty('textContent')).jsonValue();
    // isbn 
    const [x4] = await page.$x('//*[@id="details-standardno"]/td');
    const isbnvalues = (await (await x4.getProperty('textContent')).jsonValue()).split(' ');

    /*
    // publisher
    const [x2] = await page.$x('//*[@id="bib-publisher-cell"]');
    const publisher = await (await x1.getProperty('textContent')).jsonValue();
    // language
    const [x3] = await page.$x('//*[@id="bylineInfo"]/span/span[1]/a[1]');
    const language = await (await x1.getProperty('textContent')).jsonValue();
    // isbn10
    const [x4] = await page.$x('//*[@id="bylineInfo"]/span/span[1]/a[1]');
    const isbn10 = await (await x1.getProperty('textContent')).jsonValue();
    // isbn13
    const [x5] = await page.$x('//*[@id="bylineInfo"]/span/span[1]/a[1]');
    const isbn13 = await (await x1.getProperty('textContent')).jsonValue();
    // number of pages
    const [x6] = await page.$x('//*[@id="bylineInfo"]/span/span[1]/a[1]');
    const pages = await (await x1.getProperty('textContent')).jsonValue();


	// new price
	const [x7] = await page.$x('//*[@id="newBuyBoxPrice"]');
	const priceN = parseFloat((await (await x7.getProperty('textContent')).jsonValue()).replace(',', '.'));
    */
	// image
	const [img] = await page.$x('//*[@id="cover"]/img');
    const thumbnail = await (await img.getProperty('src')).jsonValue();
   

    
    browser.close();
	console.log({
        isbn_13: isbnvalues[0],
        isbn_10: isbnvalues[1],
        title,
        author,
        publisher,
        collection,
        thumbnail,
        refOrigin: 'worldcat'

        });

	
}


c_puppeteer('2253129453');
