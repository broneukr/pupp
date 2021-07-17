const axios = require('axios')
const imgbbUploader = require("imgbb-uploader")
const chromium = require('chrome-aws-lambda')

exports.handler = async event => {
//console.log(event.body)
    const pageToScreenshot = event.body//JSON.parse(event.body).url
    
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
    var screenshot = await page.screenshot({
        encoding: 'base64',
        fullPage: true
    });
    await browser.close()
//     await imgbbUploader({ apiKey: "af7cad64d90d19e2a26889f92f6b3ed8", base64string: screenshot, name: "i" })
//         .then((response) => screenshot = { vi: response.url_viewer, hi: response.url, th: response.thumb.url, di: response.display_url })
// screenshot = 'data:image/png;base64,' + screenshot;

// let data = {
//     file: screenshot, upload_preset: 'oooo6o'
// }

// await axios.post('https://api.cloudinary.com/v1_1/o6/image/upload', data).then((response) => {
// response = "https://res.cloudinary.com/o6/"+response.data.public_id
        
// screenshot = response
//     }, (error) => {
//         console.log('did not work', error);
//     })
//     var o = {}
//     o[(-1 * Number(String(Date.now() / 1000)).toFixed(0))] = screenshot
//     await axios.patch(`https://iiilll.firebaseio.com/.json`, o)
//await axios.get(`https://api.telegram.org/bot1722678219:AAHLkfPXiaWUcaQR1FlobJ0Ue0JIZti9C6w/sendPhoto?caption=${screenshot.vi}&chat_id=528494103&photo=`+screenshot.di)
    return {
        statusCode: 200,
        body: JSON.stringify(screenshot)
    }
}
