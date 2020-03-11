<template>
  <div class="search-page">
    <section class="section-stickysearch">
      <StickyDeskSearch
        :curent-search="searchCondition"
        class="stick-des tw-hidden md:tw-block"
      />
      <StickyMobiSearch
        :curent-search="searchCondition"
        class="stick-mob tw-flex md:tw-hidden"
      />
      <v-progress-linear
        :active="loading.search"
        :indeterminate="loading.search"
        absolute
        color="teal accent-4"
      ></v-progress-linear>
    </section>
    <section id="body-target" class="section-search-result tw-container">
      <div class="left-filter">
        <FilterComponent :filters="prepareFilter" />
      </div>
      <div class="center-search">
        <div class="sort-box">
          <SortAction class="tw-mb-2 tw-w-full" />
        </div>
        <div class="control-box">
          <DisplayControl class="tw-mb-8 tw-w-full" />
        </div>
        <div class="result-box">
          <div
            v-if="loading.search && flightList.length === 0"
            class="skeleton-ticket"
          >
            <v-skeleton-loader
              v-for="i in 5"
              :key="i + 'skeleton'"
              tile
              height="250"
              transition="scale-transition"
              type="card-avatar"
              class="tw-mb-4"
            >
            </v-skeleton-loader>
          </div>
          <div v-if="selectState === 'MISS_ALL'" class="pair-ticket">
            <PairTicket
              v-for="(ticket, i) in flightGrouping.PAIR"
              :key="i + 'retunr-ticket'"
              :ticket="ticket"
              class="tw-mb-4"
            />
          </div>
          <div
            v-if="
              selectState === 'MISS_DEPARTURE' || selectState === 'MISS_ALL'
            "
            class="departure-ticket"
          >
            <Ticket
              v-for="(ticket, i) in flightGrouping.DEPARTURE"
              :key="i + 'departure_ticket'"
              :ticket="ticket"
              action-btn-title="btn_select_departure"
              class="tw-mb-4"
            />
          </div>
          <div v-if="selectState === 'MISS_RETURN'" class="return-ticket">
            <Ticket
              v-for="(ticket, i) in flightGrouping.RETURN"
              :key="i + 'retunr-ticket'"
              :ticket="ticket"
              action-btn-title="btn_select_return"
              class="tw-mb-4"
            />
          </div>
        </div>
      </div>
      <div class="right-pro">
        <v-card class="tw-rounded-none">
          <v-card-text><ContactBanner /> </v-card-text>
        </v-card>
      </div>
    </section>
  </div>
</template>
<script>
import { clone } from 'lodash'
import SearchApi from '@/services/SearchApi'
import skyGroup from '@/localdb/skygroup'
import airlines from '@/localdb/airlines'
export default {
  name: 'SearchPage',
  layout: 'unauthen',
  components: {
    StickyDeskSearch: () =>
      import(
        /* webpackPrefetch: true */ '@/components/search/StickyDeskSearch'
      ),
    StickyMobiSearch: () =>
      import(
        /* webpackPrefetch: true */ '@/components/search/StickyMobiSearch'
      ),
    Ticket: () =>
      import(/* webpackPrefetch: true */ '@/components/select/Ticket'),
    PairTicket: () =>
      import(/* webpackPrefetch: true */ '@/components/select/PairTicket'),
    FilterComponent: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/FilterComponent'),
    SortAction: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/SortAction'),
    DisplayControl: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/DisplayControl'),
    ContactBanner: () =>
      import(/* webpackPrefetch: true */ '@/components/search/ContactBanner')
  },
  key(route) {
    return route.fullPath
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
    selectState() {
      return this.$store.getters['checkout/selectState']
    },
    searchCondition() {
      return this.$store.getters['search/getSearchCondition']
    },
    isRoundTrip() {
      return this.$store.getters['search/isRoundTrip']
    },
    isFilter() {
      return this.$store.getters['search/isFilter']
    },
    sortCondition() {
      return this.$store.getters['search/getSortCondition']
    },
    filterCondition() {
      return this.$store.getters['search/getFilterCondition']
    },
    flightReFormat() {
      try {
        let newFlightList = []
        newFlightList = this.flightList.map((element) => ({
          ...this.getSmalestPriceFare(element),
          ...this.getTotalTime(element),
          ...this.getSkyCode(element),
          ...this.getLocationAndType(element),
          formatDirect:
            element.stop_num === 1 || element.stop_num === 0
              ? 'Direct'
              : `${element.stop_num} Stop`,
          moreOption:
            typeof element.fare_options === 'undefined' ||
            element.fare_options.length === 1
              ? 'Show detail'
              : `More options (${element.fare_options.length})`
        }))
        return newFlightList
      } catch (error) {
        return []
      }
    },
    flightFilter() {
      try {
        if (this.isFilter) {
          let filterResult = this.flightReFormat
          if (typeof this.filterCondition.airlines !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return this.filterCondition.airlines.includes(el.airline)
            })
          }
          if (typeof this.filterCondition.skyteams !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return this.filterCondition.skyteams.includes(el.SkyGroup)
            })
          }
          if (typeof this.filterCondition.prices !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return (
                parseInt(el.formatMinFare.total_fare) >=
                  parseInt(this.filterCondition.prices[0]) &&
                parseInt(el.formatMinFare.total_fare) <=
                  parseInt(this.filterCondition.prices[1])
              )
            })
          }
          if (typeof this.filterCondition.departureStart !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return (
                el.type === 'DEPARTURE' &&
                this.$moment(el.start_time, 'HH:mm').isAfter(
                  this.$moment(this.filterCondition.departureStart[0], 'hh')
                ) &&
                this.$moment(el.start_time, 'HH:mm').isBefore(
                  this.$moment(this.filterCondition.departureStart[1], 'hh')
                )
              )
            })
          }
          if (typeof this.filterCondition.departureEnd !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return (
                el.type === 'DEPARTURE' &&
                this.$moment(el.end_time, 'HH:mm').isAfter(
                  this.$moment(this.filterCondition.departureEnd[0], 'hh')
                ) &&
                this.$moment(el.end_time, 'HH:mm').isBefore(
                  this.$moment(this.filterCondition.departureEnd[1], 'hh')
                )
              )
            })
          }
          if (typeof this.filterCondition.arrivedStart !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return (
                el.type === 'RETURN' &&
                this.$moment(el.start_time, 'HH:mm').isAfter(
                  this.$moment(this.filterCondition.arrivedStart[0], 'hh')
                ) &&
                this.$moment(el.start_time, 'HH:mm').isBefore(
                  this.$moment(this.filterCondition.arrivedStart[1], 'hh')
                )
              )
            })
          }
          if (typeof this.filterCondition.arrivedEnd !== 'undefined') {
            filterResult = filterResult.filter((el) => {
              return (
                el.type === 'RETURN' &&
                this.$moment(el.end_time, 'HH:mm').isAfter(
                  this.$moment(this.filterCondition.arrivedEnd[0], 'hh')
                ) &&
                this.$moment(el.end_time, 'HH:mm').isBefore(
                  this.$moment(this.filterCondition.arrivedEnd[1], 'hh')
                )
              )
            })
          }
          return filterResult
        } else {
          return this.flightReFormat
        }
      } catch (error) {
        return this.flightReFormat
      }
    },
    flightSort() {
      try {
        if (this.sortCondition === '') {
          return this.flightFilter
        } else {
          const sortResult = this.flightFilter
          if (this.sortCondition === 'LOWEST_PRICE') {
            sortResult.sort((a, b) => {
              return (
                parseInt(a.formatMinFare.total_fare) -
                parseInt(b.formatMinFare.total_fare)
              )
            })
          } else if (this.sortCondition === 'LOWEST_TIME') {
            sortResult.sort((a, b) => {
              return this.$moment(a.TotalTime, 'HH:mm').isBefore(
                this.$moment(b.TotalTime, 'HH:mm')
                  ? -1
                  : this.$moment(a.TotalTime, 'HH:mm').isSame(
                      this.$moment(b.TotalTime, 'HH:mm') ? 0 : 1
                    )
              )
            })
          } else if (this.sortCondition === 'CHECKIN_TIME') {
            sortResult.sort((a, b) => {
              return this.$moment(a.start_time, 'HH:mm').isBefore(
                this.$moment(b.start_time, 'HH:mm')
                  ? -1
                  : this.$moment(a.start_time, 'HH:mm').isSame(
                      this.$moment(b.start_time, 'HH:mm') ? 0 : 1
                    )
              )
            })
          }

          return sortResult
        }
      } catch (error) {
        return this.flightFilter
      }
    },
    flightGrouping() {
      try {
        const newFlightList = {
          DEPARTURE: [],
          RETURN: [],
          PAIR: {},
          PAIR_MULTI: []
        }
        if (!this.isRoundTrip) {
          this.flightSort.forEach((a) => {
            newFlightList[a.type] = newFlightList[a.type] || []
            newFlightList[a.type].push(a)
          })
        } else {
          this.flightSort.forEach((a) => {
            try {
              if (
                a.pair_index === null ||
                typeof a.pair_index === 'undefined'
              ) {
                newFlightList[a.type] = newFlightList[a.type] || []
                newFlightList[a.type].push(a)
              } else {
                newFlightList.PAIR[`PAIR_${a.pair_index}`] =
                  newFlightList.PAIR[`PAIR_${a.pair_index}`] || {}
                newFlightList.PAIR[`PAIR_${a.pair_index}`][`${a.type}`] = a
                newFlightList.PAIR_MULTI[`PAIR_MULTI_${a.pair_index}`] =
                  newFlightList.PAIR_MULTI[`PAIR_MULTI_${a.pair_index}`] || []
                newFlightList.PAIR_MULTI[`PAIR_MULTI_${a.pair_index}`].push(a)
              }
            } catch (error) {}
          })
          Object.keys(newFlightList.PAIR).forEach((el) => {
            const item = newFlightList.PAIR[`${el}`]
            if (Object.keys(item).length === 1) {
              newFlightList[Object.keys(item)[0]].push(
                item[Object.keys(item)[0]]
              )
              delete newFlightList.PAIR[`${el}`]
            }
          })
        }
        return newFlightList
      } catch (error) {
        return {
          DEPARTURE: [],
          RETURN: [],
          PAIR: {}
        }
      }
    },
    prepareFilter() {
      try {
        const filters = {
          airlines: []
        }
        filters.airlines = airlines.filter((el) => {
          return (
            this.flightList.filter((re) => {
              return re.airline === el.iata_code
            }).length > 0
          )
        })
        filters.prices = this.flightReFormat.reduce(
          (lastVal, currentVal) => {
            lastVal.min =
              lastVal.min <= currentVal.formatMinFare.total_fare
                ? lastVal.min
                : currentVal.formatMinFare.total_fare
            lastVal.max =
              lastVal.max >= currentVal.formatMinFare.total_fare
                ? lastVal.max
                : currentVal.formatMinFare.total_fare
            return lastVal
          },
          { min: 0, max: 0 }
        )
        return filters
      } catch (error) {
        return []
      }
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
          SearchApi.DeleteSectionId(this.searchCondition)
          this.loadingStep = 'FINISH_4'
        }, 30000)
      } catch (error) {
        this.loading.search = false
      }
    },
    getSmalestPriceFare(ticket) {
      try {
        if (ticket.fare_options == null || ticket.fare_options.length === 0) {
          ticket.total_fare = 0
          ticket.formatTotalFare = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(0)
          ticket.formatMinFare = {
            Description: 'NONE',
            total_fare: 0
          }
          ticket.formatMinFee = [
            {
              breakdown: [],
              fare_option: 'NONE',
              label: 'ALL',
              total: 0,
              type: 'ALL'
            }
          ]
        } else {
          const smallestOption = ticket.fare_options
            .filter(function(x) {
              return x.total_fare > 0
            })
            .sort(function(a, b) {
              return a.total_fare > b.total_fare
            })[0]
          ticket.total_fare = smallestOption.total_fare
          ticket.formatTotalFare = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(smallestOption.total_fare)
          ticket.formatMinFare = smallestOption
          try {
            ticket.formatMinFee = ticket.fees.filter((el) => {
              return el.fare_option === ticket.formatMinFare.description
            })
          } catch (error) {
            ticket.formatMinFee = [
              {
                breakdown: [],
                fare_option: 'NONE',
                label: 'ALL',
                total: 0,
                type: 'ALL'
              }
            ]
          }
          ticket.formatTotalFarePrice =
            ticket.formatMinFare.total_fare +
            ticket.formatMinFee.filter((el) => {
              return el.type === 'ALL' || el.type === 'ADT'
            })[0].total
        }
        return ticket
      } catch (error) {}
    },
    getSkyCode(ticket) {
      try {
        const skyTeam = skyGroup.find((element) => {
          return (
            element.iata_codes.findIndex((el) => el === ticket.airline) !== -1
          )
        })
        const IATA = airlines.find((element) => {
          return element.iata_code === ticket.airline
        })
        return {
          SkyGroup: typeof skyTeam === 'undefined' ? '' : skyTeam.skyGroup,
          formatIATA: typeof IATA === 'undefined' ? '' : IATA
        }
      } catch (error) {}
    },
    getTotalTime(ticket) {
      try {
        if (ticket.segments == null || ticket.segments.length === 0) {
          ticket.TotalFlyTime = 0
          ticket.TotalTime = 0
          ticket.formatTotalTime = '00h'
          ticket.formatStartDate = ''
          return ticket
        }
        let TotalFlyTime = ''
        let TotalTime = ''
        ticket.segments.forEach((element) => {
          TotalFlyTime = this.$moment.utc(
            this.$moment(
              `${element.end_date} ${element.end_time}`,
              'DD-MM-YYYY HH:mm'
            ).diff(
              this.$moment(
                `${element.start_date} ${element.start_time}`,
                'DD-MM-YYYY HH:mm'
              )
            )
          )
        })
        TotalTime = this.$moment.utc(
          this.$moment(
            `${ticket.segments[ticket.segments.length - 1].end_date} ${
              ticket.segments[ticket.segments.length - 1].end_time
            }`,
            'DD-MM-YYYY HH:mm'
          ).diff(
            this.$moment(
              `${ticket.segments[0].start_date} ${ticket.segments[0].start_time}`,
              'DD-MM-YYYY HH:mm'
            )
          )
        )
        ticket.TotalFlyTime = clone(TotalFlyTime.format('HH:mm'))
        const tempFormatTotalTime = ticket.TotalFlyTime.toString().split(':')
        ticket.formatTotalTime =
          tempFormatTotalTime[0] + 'h ' + tempFormatTotalTime[1] + 'm '
        ticket.TotalTime = clone(TotalTime.format('HH:mm'))
        ticket.formatStartDate = this.$moment(
          ticket.segments[0].start_date,
          'DD-MM-YYYY'
        ).format('ddd, Do MMM YYYY')
        return ticket
      } catch (error) {}
    },
    getLocationAndType(ticket) {
      try {
        if (ticket.start_point === this.searchCondition.from.airportCode) {
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
      } catch (error) {}
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
    @apply tw-w-4/5;
  }
  .left-filter {
    @apply tw-sticky tw-flex tw-bg-transparent tw-w-1/5 tw-text-sm;
  }
  .stick-desk {
    @apply tw-block;
  }
  .stick-mob {
    @apply tw-hidden;
  }
}
@screen lg {
  .center-search {
    @apply tw-w-3/5;
  }
  .right-pro {
    @apply tw-sticky tw-flex tw-bg-transparent tw-w-1/5 tw-text-sm;
  }
  .right-pro {
    @apply tw-bg-white;
  }
}
</style>
