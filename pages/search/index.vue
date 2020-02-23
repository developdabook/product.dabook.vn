<template>
  <div class="search-page">
    <section class="section-stickysearch">
      <StickyDeskSearch class="stick-des tw-hidden md:tw-block" />
      <StickyMobiSearch class="stick-mob tw-flex md:tw-hidden" />
      <v-progress-linear
        :active="loading.search"
        :indeterminate="loading.search"
        absolute
        color="teal accent-4"
      ></v-progress-linear>
    </section>
    <section id="body-target" class="section-search-result tw-container">
      <div class="left-filter"><FilterComponent /></div>
      <div class="center-search">
        <div class="sort-box">
          <SortAction class="tw-mb-8 tw-w-full" />
        </div>
        <div class="result-box">
          <div class="pair-ticket">
            <PairTicket
              v-for="(ticket, i) in flightGrouping.PAIR"
              :ticket="ticket"
              :key="i + 'retunr-ticket'"
              class="tw-mb-4"
            />
          </div>
          <div class="departure-ticket">
            <Ticket
              v-for="(ticket, i) in flightGrouping.DEPARTURE"
              :ticket="ticket"
              :key="i + 'departure_ticket'"
              action-btn-title="Select departure ticket"
              class="tw-mb-4"
            />
          </div>
          <div class="return-ticket">
            <Ticket
              v-for="(ticket, i) in flightGrouping.RETURN"
              :ticket="ticket"
              :key="i + 'retunr-ticket'"
              action-btn-title="Select return ticket"
              class="tw-mb-4"
            />
          </div>
        </div>
      </div>
      <div class="right-pro">
        <ContactBanner />
      </div>
    </section>
  </div>
</template>
<script>
import _ from 'lodash'
import SearchApi from '@/services/SearchApi'
import skyGroup from '@/localdb/skygroup'
import airlines from '@/localdb/airlines'
export default {
  name: 'SearchPage',
  layout: 'unauthen',
  components: {
    StickyDeskSearch: () => import('@/components/search/StickyDeskSearch'),
    StickyMobiSearch: () => import('@/components/search/StickyMobiSearch'),
    Ticket: () => import('@/components/select/Ticket'),
    PairTicket: () => import('@/components/select/PairTicket'),
    FilterComponent: () => import('@/components/filter/FilterComponent'),
    SortAction: () => import('@/components/filter/SortAction'),
    ContactBanner: () => import('@/components/search/ContactBanner')
  },
  data() {
    return {
      flightList: [],
      loading: {
        search: false
      },
      loadingStep: 1,
      intervalTick: null
    }
  },
  computed: {
    searchCondition() {
      return this.$store.getters['search/getSearchCondition']
    },
    isRoundTrip() {
      return this.$store.getters['search/isRoundTrip']
    },
    flightReFormat() {
      let newFlightList = []
      newFlightList = this.flightList.map((element) => ({
        ...this.getSmalestPriceFare(element),
        ...this.getTotalTime(element),
        ...this.getSkyCode(element),
        ...this.getLocationAndType(element),
        formatDirect:
          element.StopNum === 1 || element.StopNum === 0
            ? 'Direct'
            : `${element.StopNum} Stop`,
        moreOption:
          element.FareOptions.length === 1
            ? 'Show detail'
            : `More options (${element.FareOptions.length})`
      }))
      return newFlightList
    },
    flightGrouping() {
      const newFlighList = {
        DEPARTURE: [],
        RETURN: [],
        PAIR: {}
      }
      if (!this.isRoundTrip) {
        this.flightReFormat.forEach((a) => {
          newFlighList[a.type] = newFlighList[a.type] || []
          newFlighList[a.type].push(a)
        })
      } else {
        this.flightReFormat.forEach((a) => {
          if (a.PairIndex === null || typeof a.PairIndex === 'undefined') {
            newFlighList[a.type] = newFlighList[a.type] || []
            newFlighList[a.type].push(a)
          } else {
            newFlighList.PAIR[`PAIR_${a.PairIndex}`] =
              newFlighList.PAIR[`PAIR_${a.PairIndex}`] || {}
            newFlighList.PAIR[`PAIR_${a.PairIndex}`][`${a.type}`] = a
          }
        })
      }
      return newFlighList
    }
  },
  mounted() {
    this.searchingFlight()
  },
  beforeDestroy() {
    clearInterval(this.intervalTick)
  },
  methods: {
    searchingFlight() {
      try {
        let counting = 0
        this.loading.search = true
        this.flightList = []
        SearchApi.GetSectionId(this.searchCondition).then(() => {
          this.loadingStep = 'PREPARE_1'
          SearchApi.SearchFlights(this.searchCondition)
            .then((result) => {
              if (result.data.length > 0) {
                this.flightList = result.data.filter((datar) => {
                  return datar !== null
                })
                if (this.flightList.length > 0) {
                  this.loading.search = false
                  this.loadingStep = 'SEARCHING_2'
                  counting++
                  if (counting === 10) {
                    this.loadingStep = 'CATCHING_3'
                  }
                }
              }
              if (
                result.status.QL &&
                result.status.BH &&
                result.status.VN &&
                result.status.VJ
              ) {
                clearInterval(this.intervalTick)
                this.loadingStep = 'FINISH_4'
              }
            })
            .catch(() => {})
        })
        this.intervalTick = setInterval(() => {
          this.loadingStep = 'PREPARE_1'
          SearchApi.SearchFlights(this.searchCondition)
            .then((result) => {
              if (result.data.length > 0) {
                this.flightList = result.data.filter((datar) => {
                  return datar !== null
                })
                if (this.flightList.length > 0) {
                  this.loading.search = false
                  this.loadingStep = this.loadingStep = 'SEARCHING_2'
                  counting++
                  if (counting === 10) {
                    this.loadingStep = 'CATCHING_3'
                  }
                }
              }
              if (
                result.status.QL &&
                result.status.BH &&
                result.status.VN &&
                result.status.VJ
              ) {
                clearInterval(this.intervalTick)
                this.loadingStep = 'FINISH_4'
              }
            })
            .catch(() => {})
        }, 3000)
        setTimeout(() => {
          clearInterval(this.intervalTick)
          this.loadingStep = 'FINISH_4'
        }, 60000)
      } catch (error) {
        this.loading.search = false
      }
    },
    getSmalestPriceFare(ticket) {
      if (ticket.FareOptions == null || ticket.FareOptions.length === 0) {
        ticket.Totalfare = 0
        ticket.formatTotalFare = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(0)
        ticket.MinFare = {
          Description: 'Avaible',
          Totalfare: 0
        }
      } else {
        const smallestOption = ticket.FareOptions.reduce((acc, loc) =>
          acc.Totalfare < loc.Totalfare ? acc : loc
        )
        ticket.TotalFare = smallestOption.Totalfare
        ticket.formatTotalFare = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(smallestOption.Totalfare)
        ticket.MinFare = smallestOption
      }
      return ticket
    },
    getSkyCode(ticket) {
      const skyTeam = skyGroup.find((element) => {
        return (
          element.iata_codes.findIndex((el) => el === ticket.Airline) !== -1
        )
      })
      const IATA = airlines.find((element) => {
        return element.iata_code === ticket.Airline
      })
      return {
        SkyGroup: typeof skyTeam === 'undefined' ? '' : skyTeam.skyGroup,
        formatIATA: typeof IATA === 'undefined' ? '' : IATA
      }
    },
    getTotalTime(ticket) {
      if (ticket.Segments == null || ticket.Segments.length === 0) {
        ticket.TotalFlyTime = 0
        ticket.TotalTime = 0
        ticket.formatTotalTime = '00h'
        ticket.formatStartDate = ''
        return ticket
      }
      let TotalFlyTime = ''
      let TotalTime = ''
      ticket.Segments.forEach((element) => {
        TotalFlyTime = this.$moment.utc(
          this.$moment(
            `${element.EndDate} ${element.EndTime}`,
            'DD-MM-YYYY HH:mm'
          ).diff(
            this.$moment(
              `${element.StartDate} ${element.StartTime}`,
              'DD-MM-YYYY HH:mm'
            )
          )
        )
      })
      TotalTime = this.$moment.utc(
        this.$moment(
          `${ticket.Segments[ticket.Segments.length - 1].EndDate} ${
            ticket.Segments[ticket.Segments.length - 1].EndTime
          }`,
          'DD-MM-YYYY HH:mm'
        ).diff(
          this.$moment(
            `${ticket.Segments[0].StartDate} ${ticket.Segments[0].StartTime}`,
            'DD-MM-YYYY HH:mm'
          )
        )
      )
      ticket.TotalFlyTime = _.clone(TotalFlyTime.format('HH:mm'))
      const tempFormatTotalTime = ticket.TotalFlyTime.toString().split(':')
      ticket.formatTotalTime =
        tempFormatTotalTime[0] + 'h ' + tempFormatTotalTime[1] + 'm '
      ticket.TotalTime = _.clone(TotalTime.format('HH:mm'))
      ticket.formatStartDate = this.$moment(
        ticket.Segments[0].StartDate,
        'DD-MM-YYYY'
      ).format('ddd, Do MMM YYYY')
      return ticket
    },
    getLocationAndType(ticket) {
      if (ticket.StartPoint === this.searchCondition.from.airportCode) {
        return {
          type: 'DEPARTURE',
          formatStartPoint: this.searchCondition.from,
          formatEndPoint: this.searchCondition.to
        }
      } else {
        return {
          type: 'RETURN',
          formatStartPoint: this.searchCondition.to,
          formatEndPoint: this.searchCondition.from
        }
      }
    }
  }
}
</script>
<style lang="postcss">
.search-page {
  @apply tw-bg-gray-300;
}
.section-stickysearch {
  z-index: 2;
  @apply tw-sticky tw-top-0;
}
.section-search-result {
  @apply tw-my-8 tw-mx-auto tw-flex tw-flex-row tw-justify-start tw-items-start tw-mb-0;
}
.center-search {
  @apply tw-w-full tw-px-4 tw-m-0;
}
.right-pro {
  @apply tw-hidden;
}
.stick-desk {
  @apply tw-hidden;
}
.stick-mob {
  @apply tw-flex;
}
@screen md {
  .center-search {
    @apply tw-w-3/5;
  }
  .left-filter,
  .right-pro {
    @apply tw-sticky tw-flex tw-bg-transparent tw-w-1/5 tw-text-sm;
  }
  .right-pro {
    @apply tw-bg-white;
  }
  .stick-desk {
    @apply tw-block;
  }
  .stick-mob {
    @apply tw-hidden;
  }
}
</style>
