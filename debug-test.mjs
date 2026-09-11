import puppeteer from 'puppeteer-core'
import path from 'node:path'

const CHROME = 'C:\\Users\\ASHAN\\.cache\\puppeteer\\chrome\\win64-146.0.7680.66\\chrome-win64\\chrome.exe'
const URL = 'http://[::1]:5174/'
const OUT = 'C:\\Users\\ASHAN\\AppData\\Local\\Temp\\claude\\C--Users-ASHAN-Desktop-gen-ai-GroMart\\5899437d-589a-4325-9bc8-2c56a6981f53\\scratchpad'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: `C:\\Users\\ASHAN\\AppData\\Local\\Temp\\gromark-debug-${Date.now()}`,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  const errors = []
  page.on('pageerror', (err) => errors.push(err.message))
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`) })

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 1500))

  const shopInfo = await page.evaluate(() => {
    const shop = document.querySelector('#shop')
    if (!shop) return { found: false }
    const articles = shop.querySelectorAll('article')
    const grid = shop.querySelector('.grid')
    const gridStyle = grid ? getComputedStyle(grid) : null
    return {
      found: true,
      articleCount: articles.length,
      shopHTML_len: shop.innerHTML.length,
      gridOpacity: gridStyle ? gridStyle.opacity : null,
      gridTransform: gridStyle ? gridStyle.transform : null,
      shopText: shop.innerText.slice(0, 300),
    }
  })
  console.log('SHOP_INFO_NO_SCROLL:', JSON.stringify(shopInfo, null, 2))

  await page.evaluate(() => document.querySelector('#shop').scrollIntoView())
  await new Promise((r) => setTimeout(r, 800))
  await page.screenshot({ path: path.join(OUT, 'debug1-shop-after-scroll.png') })

  const shopInfo2 = await page.evaluate(() => {
    const shop = document.querySelector('#shop')
    const articles = shop.querySelectorAll('article')
    const grid = shop.querySelector('.grid')
    const gridStyle = grid ? getComputedStyle(grid) : null
    return {
      articleCount: articles.length,
      gridOpacity: gridStyle ? gridStyle.opacity : null,
      gridTransform: gridStyle ? gridStyle.transform : null,
    }
  })
  console.log('SHOP_INFO_AFTER_SCROLL:', JSON.stringify(shopInfo2, null, 2))

  // Now click Fruits & Vegetables category
  const catBtns = await page.$$('#categories button')
  console.log('CATEGORY_BUTTON_COUNT:', catBtns.length)
  if (catBtns.length > 0) {
    await catBtns[0].click()
    await new Promise((r) => setTimeout(r, 800))
    await page.screenshot({ path: path.join(OUT, 'debug2-after-category-click.png') })
    const afterClick = await page.evaluate(() => {
      const shop = document.querySelector('#shop')
      const articles = shop.querySelectorAll('article')
      const heading = shop.querySelector('h2')?.textContent
      return { articleCount: articles.length, heading }
    })
    console.log('AFTER_CATEGORY_CLICK:', JSON.stringify(afterClick, null, 2))
  }

  console.log('ERRORS:', JSON.stringify(errors))
} finally {
  await browser.close()
}
