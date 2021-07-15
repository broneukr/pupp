






const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    if (!pageToScreenshot) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true
 });

    await browser.close();
  console.log(screenshot)


screenshot = 'data:image/png;base64,' + screenshot;

let data = {
    file: screenshot, upload_preset: 'o6oooo'
}

await axios.post('https://api.cloudinary.com/v1_1/o6/image/upload', data).then((response) => {
        console.log('worked', response);
screenshot = response
    }, (error) => {
        console.log('did not work', error);
    })


    return {
        statusCode: 200,
        body: JSON.stringify({x:screenshot})
    }

}
