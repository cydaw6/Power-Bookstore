


/*			test scraping Puppeteer		*/


//--------------------

//https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial


const puppeteer = require('puppeteer');
let currr;
async function run (url) {
    const browser = await puppeteer.launch({headless: true, args:['--no-sandbox',
	'--disable-setuid-sandbox']});
	const page = await browser.newPage();
	
	await page.goto(url);
	
	const [img] = await page.$x('//*[@id="imgBlkFront"]');
	const txti = await img.getProperty('src');
	const thumbnail = await txti.jsonValue();
	
	const [x] = await page.$x('//*[@id="productTitle"]');
	const txt = await x.getProperty('textContent');
	const titre = await txt.jsonValue();
	
	await page.waitForXPath('//*[@id="newBuyBoxPrice"]');
	const [x2] = await page.$x('//*[@id="newBuyBoxPrice"]');
	const txt2 = await x2.getProperty('textContent');
	const prixNeuf = await txt2.jsonValue();
	
	browser.close();
	console.log({titre, prixNeuf, thumbnail});
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


run('https://www.amazon.fr/dp/2253129453');

