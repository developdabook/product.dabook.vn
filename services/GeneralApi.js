import { httpClient } from '@/share/httpClient'

const http = require('https')

const general = {
  async GetLocation(searchData) {
    try {
      const response = await httpClient.get(
        `https://www.skyscanner.com.vn/g/autosuggest-flights/VN/vi-VN/${searchData}?isDestination=false&enable_general_search_v2=true`
      )
      return response.data
    } catch {
      return ''
    }
  },
  async GetAirPortByCode(code) {
    const result = await requestAirPortByCode(code)
    return result
  }
}
export default general
function requestAirPortByCode(code) {
  return new Promise(function(resolve, reject) {
    const options = {
      method: 'GET',
      hostname: 'airport-info.p.rapidapi.com',
      port: null,
      path: `/airport?iata=${code}`,
      headers: {
        'x-rapidapi-host': 'airport-info.p.rapidapi.com',
        'x-rapidapi-key': '8ab2eecdf8msh32413bb47b8113fp1bad5djsn22f964df583a'
      }
    }

    const req = http.request(options, function(res) {
      const chunks = []

      res.on('data', function(chunk) {
        chunks.push(chunk)
      })

      res.on('end', function() {
        const body = Buffer.concat(chunks)
        resolve(JSON.parse(body.toString()))
      })
    })

    req.end()
  })
}
