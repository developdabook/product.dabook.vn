import moment from 'moment'
import { httpClient } from '@/share/httpClient'
const search = {
  async SearchFlights(searchData) {
    try {
      const response = await httpClient.get(
        `/dabook/public/api/flights/search?itinerary=1&origin=${searchData.from.airportCode}&destination=${searchData.to.airportCode}&date=${searchData.departure}&date1=${searchData.arrived}&adults=${searchData.passenger.ADULT}&children=${searchData.passenger.CHILD}&infants=${searchData.passenger.INFANT}`
      )
      return response.data
    } catch (error) {
      return []
    }
  },
  async GetSectionId(searchData) {
    try {
      const response = await httpClient.post(
        `/dabook/public/api/flights/search?itinerary=1&origin=${searchData.from.airportCode}&destination=${searchData.to.airportCode}&date=${searchData.departure}&date1=${searchData.arrived}&adults=${searchData.passenger.ADULT}&children=${searchData.passenger.CHILD}&infants=${searchData.passenger.INFANT}`,
        {},
        {
          crossdomain: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      return response.data
    } catch (error) {
      return error
    }
  },
  async DeleteSectionId(searchData) {
    try {
      const response = await httpClient.delete(
        `/dabook/public/api/flights/search?itinerary=1&origin=${searchData.from.airportCode}&destination=${searchData.to.airportCode}&date=${searchData.departure}&date1=${searchData.arrived}&adults=${searchData.passenger.ADULT}&children=${searchData.passenger.CHILD}&infants=${searchData.passenger.INFANT}`
      )
      return response.data
    } catch (error) {
      return error
    }
  },
  async SearchFlightsOneWay(searchData) {
    try {
      const response = await httpClient.get(
        `/dabook/public/api/flights/search?itinerary=1&origin=${
          searchData.from.airportCode
        }&destination=${searchData.to.airportCode}&date=${moment(
          searchData.departure,
          'DD-MM-YYYY'
        ).format('DD-MM-YYYY')}&date1=&adults=${
          searchData.passenger.ADULT
        }&children=${searchData.passenger.CHILD}&infants=${
          searchData.passenger.INFANT
        }`
      )
      return response.data
    } catch (error) {
      return []
    }
  },
  async GetSectionIdOneway(searchData) {
    try {
      const response = await httpClient.post(
        `/dabook/public/api/flights/search?itinerary=1&origin=${
          searchData.from.airportCode
        }&destination=${searchData.to.airportCode}&date=${moment(
          searchData.departure,
          'DD-MM-YYYY'
        ).format('DD-MM-YYYY')}&date1=&adults=${
          searchData.passenger.ADULT
        }&children=${searchData.passenger.CHILD}&infants=${
          searchData.passenger.INFANT
        }`
      )
      return response.data
    } catch (error) {
      return error
    }
  },
  async DeleteSectionIdOneway(searchData) {
    try {
      const response = await httpClient.delete(
        `/dabook/public/api/flights/search?itinerary=1&origin=${
          searchData.from.airportCode
        }&destination=${searchData.to.airportCode}&date=${moment(
          searchData.departure,
          'DD-MM-YYYY'
        ).format('DD-MM-YYYY')}&date1=&adults=${
          searchData.passenger.ADULT
        }&children=${searchData.passenger.CHILD}&infants=${
          searchData.passenger.INFANT
        }`
      )
      return response.data
    } catch (error) {
      return error
    }
  }
}
export default search
