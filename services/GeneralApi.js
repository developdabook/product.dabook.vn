import axios from 'axios'
// import https from 'https'

const general = {
  async GetLocation(searchData) {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.skyscanner.com.vn/g/autosuggest-flights/VN/vi-VN/${searchData}?isDestination=false&enable_general_search_v2=true`
      )
      return response.data
    } catch {
      return ''
    }
  }
}
export default general
