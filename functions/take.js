
const axios = require('axios')





const chromium = require('chrome-aws-lambda');

exports.handler = async (event, context) => {

    const pageToScreenshot = JSON.parse(event.body).url

    if (!pageToScreenshot) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const browser = await chromium.puppeteer.launch({
deviceScaleFactor: 2,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();

    await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    var screenshot = await page.screenshot({ encoding: 'base64', fullPage: true
 });

    await browser.close();
  console.log(screenshot)


screenshot = 'data:image/png;base64,' + screenshot;

let data = {
    file: screenshot, upload_preset: 'o6oooo'
}

await axios.post('https://api.cloudinary.com/v1_1/o6/image/upload', data).then((response) => {
response = response.data.public_id
        console.log( response);
screenshot = response
    }, (error) => {
        console.log('did not work', error);
    })

         var TT=(-1*Number(String(Date.now()/1000)).toFixed(0))
         var o = {}
         o[TT] = screenshot
return await axios.patch(`https://iiilll.firebaseio.com/.json`, o)

    return {
        statusCode: 200,
        body: JSON.stringify(screenshot)
    }

}
