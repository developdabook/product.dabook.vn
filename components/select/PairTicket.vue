<template>
  <v-lazy
    :options="{
      threshold: 0.5
    }"
    min-height="250"
    transition="scale-transition"
    origin="center center"
  >
    <v-skeleton-loader
      ref="skeleton"
      :tile="false"
      :loading="loading"
      height="250"
      transition="scale-transition"
      type="card-avatar"
    >
      <div class="ticket-component">
        <v-card flat>
          <v-card-text class="ticket-box">
            <div class="ticket-info">
              <div class="round-item">
                <div class="round-date">
                  {{ ticket.DEPARTURE.formatStartDate }}
                </div>
                <div class="round-airline">
                  <div class="newtk-timeline">
                    <v-icon class="tw-text-xs tw-text-gray-600"
                      >mdi-dots-vertical-circle</v-icon
                    >
                    <span class="tw-flex-grow newtk-timeline-center">
                      <v-icon class="tw-text-sm rotate-180 tw-text-gray-600"
                        >mdi-airplane</v-icon
                      >
                    </span>
                    <v-icon class="tw-text-xs tw-text-gray-600"
                      >mdi-dots-vertical-circle</v-icon
                    >
                  </div>
                  <div class="detail-airline">
                    <p class="tw-text-sm tw-text-gray-700 tw-m-0 tw-mb-4">
                      <strong class="tw-mr-2">{{
                        ticket.DEPARTURE.start_time
                      }}</strong
                      ><strong class="tw-mr-2">{{
                        ticket.DEPARTURE.formatStartPoint.city
                      }}</strong
                      ><span class="tw-text-xs">{{
                        ticket.DEPARTURE.start_point
                      }}</span>
                    </p>
                    <div class=" tw-mb-4">
                      <v-chip
                        text-color="primary"
                        color="blue-grey lighten-5"
                        small
                        label
                        class="chip-info"
                      >
                        {{ ticket.DEPARTURE.formatTotalTime }}
                      </v-chip>

                      <v-tooltip top color="primary" z-index="999999">
                        <template v-slot:activator="{ on }">
                          <v-avatar
                            height="24"
                            width="24"
                            tile
                            color="blue-grey lighten-5"
                            class="tw-rounded"
                            v-on="on"
                          >
                            <img
                              :src="
                                `https://booking.kayak.com/rimg/provider-logos/airlines/v/${ticket.DEPARTURE.airline}.png?crop=false&width=92&height=92`
                              "
                            />
                          </v-avatar>
                        </template>
                        <span
                          >{{ ticket.DEPARTURE.formatIATA.name }}
                          <v-icon color="#FFF" small
                            >mdi-information-outline</v-icon
                          >
                        </span>
                      </v-tooltip>
                      <v-chip
                        small
                        color="blue-grey lighten-5"
                        text-color="#4A5568"
                        class="chip-info"
                      >
                        {{ ticket.DEPARTURE.formatDirect }}
                      </v-chip>
                      <v-chip
                        small
                        color="blue-grey lighten-5"
                        text-color="#4A5568"
                        class="chip-info"
                      >
                        {{ ticket.DEPARTURE.formatMinFare.class }}
                      </v-chip>
                    </div>
                    <p class="tw-text-sm tw-text-gray-700 tw-m-0">
                      <strong class="tw-mr-2">{{
                        ticket.DEPARTURE.end_time
                      }}</strong
                      ><strong class="tw-mr-2">{{
                        ticket.DEPARTURE.formatEndPoint.city
                      }}</strong
                      ><span class="tw-text-xs">{{
                        ticket.DEPARTURE.end_point
                      }}</span>
                    </p>
                  </div>
                  <div class="filter-action">
                    <v-tooltip top color="primary">
                      <template v-slot:activator="{ on }">
                        <v-checkbox
                          color="primary"
                          hide-details
                          class="tw-m-0"
                          v-on="on"
                        ></v-checkbox>
                      </template>
                      <span
                        >{{ $t('ticket_filter_by_ticket') }}
                        <v-icon color="#FFF" small
                          >mdi-information-outline</v-icon
                        >
                      </span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
              <v-divider class="ma-4">8h 3min</v-divider>
              <div class="round-item">
                <div class="round-date">
                  {{ ticket.RETURN.formatStartDate }}
                </div>
                <div class="round-airline">
                  <div class="newtk-timeline">
                    <v-icon class="tw-text-xs tw-text-gray-600"
                      >mdi-dots-vertical-circle</v-icon
                    >
                    <span class="tw-flex-grow newtk-timeline-center">
                      <v-icon class="tw-text-sm rotate-180 tw-text-gray-600"
                        >mdi-airplane</v-icon
                      >
                    </span>
                    <v-icon class="tw-text-xs tw-text-gray-600"
                      >mdi-dots-vertical-circle</v-icon
                    >
                  </div>
                  <div class="detail-airline">
                    <p class="tw-text-sm tw-text-gray-700 tw-m-0 tw-mb-4">
                      <strong class="tw-mr-2">{{
                        ticket.RETURN.start_time
                      }}</strong
                      ><strong class="tw-mr-2">{{
                        ticket.RETURN.formatStartPoint.city
                      }}</strong
                      ><span class="tw-text-xs">{{
                        ticket.RETURN.start_point
                      }}</span>
                    </p>
                    <div class=" tw-mb-4">
                      <v-chip
                        text-color="primary"
                        color="blue-grey lighten-5"
                        small
                        label
                        class="chip-info"
                      >
                        {{ ticket.RETURN.formatTotalTime }}
                      </v-chip>

                      <v-tooltip top color="primary" z-index="999999">
                        <template v-slot:activator="{ on }">
                          <v-avatar
                            height="24"
                            width="24"
                            tile
                            color="blue-grey lighten-5"
                            class="tw-rounded"
                            v-on="on"
                          >
                            <img
                              :src="
                                `https://booking.kayak.com/rimg/provider-logos/airlines/v/${ticket.RETURN.airline}.png?crop=false&width=92&height=92`
                              "
                            />
                          </v-avatar>
                        </template>
                        <span
                          >{{ ticket.RETURN.formatIATA.name }}
                          <v-icon color="#FFF" small
                            >mdi-information-outline</v-icon
                          >
                        </span>
                      </v-tooltip>
                      <v-chip
                        small
                        color="blue-grey lighten-5"
                        text-color="#4A5568"
                        class="chip-info"
                      >
                        {{ ticket.RETURN.formatDirect }}
                      </v-chip>
                      <v-chip
                        small
                        color="blue-grey lighten-5"
                        text-color="#4A5568"
                        class="chip-info"
                      >
                        {{ ticket.RETURN.formatMinFare.class }}
                      </v-chip>
                    </div>
                    <p class="tw-text-sm tw-text-gray-700 tw-m-0">
                      <strong class="tw-mr-2">{{
                        ticket.RETURN.end_time
                      }}</strong
                      ><strong class="tw-mr-2">{{
                        ticket.RETURN.formatEndPoint.city
                      }}</strong
                      ><span class="tw-text-xs">{{
                        ticket.RETURN.end_point
                      }}</span>
                    </p>
                  </div>
                  <div class="filter-action">
                    <v-tooltip top color="primary">
                      <template v-slot:activator="{ on }">
                        <v-checkbox
                          color="primary"
                          hide-details
                          class="tw-m-0"
                          v-on="on"
                        ></v-checkbox>
                      </template>
                      <span
                        >{{ $t('ticket_filter_by_ticket') }}
                        <v-icon color="#FFF" small
                          >mdi-information-outline</v-icon
                        >
                      </span>
                    </v-tooltip>
                  </div>
                </div>
                <v-divider class="ma-4 tw-border-gray-200"></v-divider>
                <div class="round-subinfo">
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        small
                        depressed
                        rounded
                        class="tw-normal-case tw-text-xs"
                        text
                        color="primary"
                        v-on="on"
                        @click="drawer.isDraw = true"
                        >{{ ticket.DEPARTURE.moreOption }}
                        <v-icon small>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <span
                      >{{ $t('ticket_show_more_tooltip') }}
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      ></span
                    >
                  </v-tooltip>
                  <v-chip
                    v-if="!totalMode || (totalMode && !totalPrice.isValid)"
                    small
                    color="red lighten-5"
                    text-color="red darken-4"
                  >
                    {{ $t('ticket_price_withnofee') }}
                    <v-icon small class="ml-2"
                      >mdi-information-outline</v-icon
                    ></v-chip
                  >
                  <v-chip
                    v-else
                    small
                    color="green lighten-5"
                    text-color="green accent-4"
                  >
                    {{ $t('ticket_price_withfee') }}
                    <v-icon small class="ml-2"
                      >mdi-information-outline</v-icon
                    ></v-chip
                  >
                </div>
              </div>
            </div>
            <div class="ticket-action">
              <div class="price-wrap">
                <div class="sub-action">
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn small text icon fab color="#4A5568" v-on="on">
                        <v-icon>mdi-heart-outline</v-icon>
                      </v-btn>
                    </template>
                    <span
                      >{{ $t('ticket_favorite') }}
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      >
                    </span>
                  </v-tooltip>
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn small text icon fab color="#4A5568" v-on="on">
                        <v-icon>mdi-share-all-outline</v-icon>
                      </v-btn>
                    </template>
                    <span
                      >{{ $t('ticket_share') }}
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      >
                    </span>
                  </v-tooltip>
                  <v-tooltip top color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn small text icon fab color="#4A5568" v-on="on">
                        <v-icon>mdi-information-outline</v-icon>
                      </v-btn>
                    </template>
                    <span
                      >{{ $t('ticket_click_viewmore') }}
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      >
                    </span>
                  </v-tooltip>
                </div>
                <div class="total-price">
                  <strong class="price-title">
                    <PriceValidation
                      :price="totalMode ? totalPrice.total : onlyPrice.total"
                  /></strong>
                </div>
              </div>
              <div class="select-action">
                <v-btn
                  color="primary"
                  depressed
                  rounded
                  class="select-btn"
                  @click="acceptSelectTicket"
                  >{{ $t('btn_select_pair') }}</v-btn
                >
              </div>
            </div>
          </v-card-text>
        </v-card>
        <section class="section-ticket-detail">
          <v-navigation-drawer
            v-model="drawer.isDraw"
            class="draw-70"
            temporary
            app
            fixed
            right
            bottom
            width="450px"
            height="100vh"
          >
            <PairTicketDetail
              :ticket="ticket"
              @change="selectTicket($event)"
              @close="drawer.isDraw = false"
            />
          </v-navigation-drawer>
        </section>
      </div>
    </v-skeleton-loader>
  </v-lazy>
</template>
<script>
export default {
  name: 'PairTicket',
  components: {
    PriceValidation: () => import('@/components/generals/PriceValidation'),
    PairTicketDetail: () =>
      import(/* webpackPrefetch: true */ '@/components/select/PairTicketDetail')
  },
  props: {
    ticket: {
      type: [Object, Array],
      required: true
    },
    actionBtnTitle: {
      type: String,
      default: 'Book this ticket'
    }
  },
  data() {
    return {
      drawer: {
        isDraw: false
      },

      loading: false,
      isActive: false,
      ticketSelected: {
        PAIR: {
          ticket: [this.ticket.DEPARTURE, this.ticket.RETURN],
          fare: this.ticket.DEPARTURE.formatMinFare,
          fee: this.ticket.DEPARTURE.fees
        }
      },
      timeOut: null
    }
  },

  computed: {
    totalPrice() {
      try {
        const ticketFare =
          'fee' in this.ticketSelected.PAIR
            ? this.ticketSelected.PAIR.fee.filter(
                (el) => el.fare_option === this.ticketSelected.PAIR.fare.class
              )
            : []
        return {
          total:
            ticketFare.length !== 0
              ? ticketFare.reduce(function(total, currentValue) {
                  return total + currentValue.total
                }, 0)
              : this.ticketSelected.PAIR.fare.fare,
          isValid: true
        }
      } catch (error) {
        return {
          total: this.ticketSelected.PAIR.fare.fare,
          isValid: false
        }
      }
    },
    onlyPrice() {
      try {
        const ticketFare =
          'fee' in this.ticketSelected.PAIR
            ? this.ticketSelected.PAIR.fee.filter(
                (el) => el.fare_option === this.ticketSelected.PAIR.fare.class
              )
            : []
        return {
          total:
            ticketFare.length !== 0
              ? ticketFare.reduce(function(total, currentValue) {
                 return total >= currentValue.total_fare
                    ? total
                    : currentValue.total_fare
                  // return total + currentValue.total_fare
                }, 0)
              : this.ticketSelected.PAIR.fare.fare,
          isValid: true
        }
      } catch (error) {
        return {
          total: this.ticketSelected.PAIR.fare.fare,
          isValid: false
        }
      }
    },
    totalMode() {
      return this.$store.getters['search/getTotalMode']
    },
    selectState() {
      return this.$store.getters['checkout/selectState']
    }
  },
  watch: {
    ticket(newVal, oldVal) {
      try {
        this.ticketSelected.PAIR.ticket = [newVal.DEPARTURE, newVal.RETURN]
        this.ticketSelected.PAIR.fare = newVal.DEPARTURE.formatMinFare
        this.ticketSelected.PAIR.fee = newVal.DEPARTURE.fees
      } catch (error) {}
    }
  },
  mounted() {
    this.loading = true
    this.timeOut = setTimeout(() => {
      this.loading = false
    }, 100)
  },
  beforeDestroy() {
    clearTimeout(this.timeOut)
  },
  methods: {
    selectTicket(payload) {
      try {
        this.ticketSelected.PAIR.fare = payload
        this.acceptSelectTicket()
      } catch (error) {}
    },
    acceptSelectTicket() {
      try {
        this.$store.dispatch('checkout/updateTicketSelected', {
          ticket: this.ticketSelected,
          type: 'PAIR'
        })
        if (this.selectState === 'DONE') {
          this.$router.push({
            path: 'checkout',
            query: {
              section: this.$store.getters['search/getSection']
            }
          })
        }
      } catch (error) {}
    }
  }
}
</script>
<style lang="postcss">
.ticket-component {
  @apply tw-p-1 tw-bg-white tw-border tw-border-teal-500;
}
.ticket-component:hover {
  @apply tw-shadow-lg;
}
.ticket-box {
  @apply tw-flex tw-flex-col tw-justify-start tw-items-stretch tw-p-0;
}
.ticket-info {
  @apply tw-w-full tw-p-4;
}
.newtk-timeline {
  @apply tw-flex tw-flex-col tw-justify-between tw-items-center tw-px-2 tw-py-1;
}
.round-airline {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-stretch;
}
.round-date {
  @apply tw-text-gray-600 tw-text-xs tw-px-2;
}
.newtk-timeline-center {
  width: 1px;
  min-height: 3rem;
  @apply tw-bg-gray-400 tw-inline-block tw-flex tw-justify-center tw-items-center;
}
.detail-airline {
  @apply tw-flex-grow tw-flex tw-flex-col tw-justify-between tw-items-stretch;
}
.filter-action {
  @apply tw-flex tw-justify-center tw-items-center;
}
.round-subinfo {
  @apply tw-px-4;
}
.ticket-action {
  @apply tw-w-full tw-flex tw-flex-col tw-justify-between tw-items-stretch tw-p-4;
}
.select-btn {
  @apply tw-w-full tw-normal-case tw-font-normal !important;
}
.price-title {
  @apply tw-text-2xl tw-text-gray-800;
}
.price-wrap {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center;
}
.chip-info {
  @apply tw-m-1;
}
@screen md {
  .ticket-component {
    @apply tw-p-4 tw-bg-white tw-border tw-border-teal-500;
  }
  .ticket-box {
    @apply tw-flex tw-flex-row tw-justify-start tw-items-stretch;
  }
  .ticket-info {
    @apply tw-w-2/3;
  }
  .ticket-action {
    @apply tw-w-1/3 tw-border-l tw-border-gray-200;
  }
  .price-wrap {
    @apply tw-flex tw-flex-col tw-justify-between tw-items-center tw-flex-grow;
  }
  .total-price {
    @apply tw-flex-grow tw-flex tw-justify-center tw-items-center;
  }
}
</style>
