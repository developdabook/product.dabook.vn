import axios from 'axios'
const checkout = {
  async Reservation(payload) {
    try {
      const response = await axios.post(
        `${process.env.CRAWL_FLIGHT_API}/dabook/public/api/tickets`,
        payload
      )
      return response.data
    } catch (error) {
      return error
    }
  }
}
export default checkout
