import { httpClient } from '@/share/httpClient'
const checkout = {
  async Reservation(payload) {
    try {
      const response = await httpClient.post(
        `/dabook/public/api/tickets`,
        payload,
        {
          crossdomain: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      return response.data
    } catch (error) {
      return error
    }
  }
}
export default checkout
