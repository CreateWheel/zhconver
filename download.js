const http = require('http')
const https = require('https')
const { writeFileSync, existsSync, mkdirSync } = require('fs')
const { join, parse } = require('path')

const tmpPath = join(__dirname, 'tmp')

mkdirSync(tmpPath, { recursive: true })

const openccDictionaryUrl = 'https://api.github.com/repos/BYVoid/OpenCC/contents/data/dictionary'

;(async () => {
  const result = (await request(openccDictionaryUrl)).toString('utf8')
  const json = JSON.parse(result)
  for (const item of json) {
    const { base } = parse(item.download_url)
    download(item.download_url, join(tmpPath, base))
  }
})()

/**
 * request
 * @param {string} url
 */
function request(url) {
  const protocol = url.startsWith('https') ? https : http

  return new Promise((resolve, reject) => {
    const req = protocol.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download file: ${res.statusMessage}`))
        return
      }
      const data = []
      res.on('data', (chunk) => {
        data.push(chunk)
      })

      res.on('end', () => {
        const buffer = Buffer.concat(data)
        resolve(buffer)
      })
    })
    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}

/**
 * download file
 * @param {string} url
 * @param {string} filePath
 */
async function download(url, filePath) {
  if (existsSync(filePath)) return
  const buffer = await request(url)
  writeFileSync(filePath, buffer)
}
