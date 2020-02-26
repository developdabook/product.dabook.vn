<template>
  <v-lazy
    :options="{
      threshold: 0.5
    }"
    min-height="250"
    transition="slide-x-transition"
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
                <div class="round-date">{{ ticket.formatStartDate }}</div>
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
                      <strong class="tw-mr-2">{{ ticket.StartTime }}</strong
                      ><strong class="tw-mr-2">{{
                        ticket.formatStartPoint.city
                      }}</strong
                      ><span class="tw-text-xs">{{ ticket.StartPoint }}</span>
                    </p>
                    <div class=" tw-mb-4">
                      <v-chip
                        text-color="primary"
                        color="blue-grey lighten-5"
                        small
                        label
                        class="chip-info"
                      >
                        {{ ticket.formatTotalTime }}
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
                                `https://booking.kayak.com/rimg/provider-logos/airlines/v/${ticket.Airline}.png?crop=false&width=92&height=92`
                              "
                            />
                          </v-avatar>
                        </template>
                        <span
                          >{{ ticket.formatIATA.name }}
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
                        {{ ticket.formatDirect }}
                      </v-chip>
                      <v-chip
                        small
                        color="blue-grey lighten-5"
                        text-color="#4A5568"
                        class="chip-info"
                      >
                        {{ ticket.MinFare.Description }}
                      </v-chip>
                    </div>
                    <p class="tw-text-sm tw-text-gray-700 tw-m-0">
                      <strong class="tw-mr-2">{{ ticket.EndTime }}</strong
                      ><strong class="tw-mr-2">{{
                        ticket.formatEndPoint.city
                      }}</strong
                      ><span class="tw-text-xs">{{ ticket.EndPoint }}</span>
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
                        >Lọc theo chuyến bay này
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
                        >{{ ticket.moreOption }}
                        <v-icon small>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <span
                      >Click để hiển thị chi tiết thông tin chuyến bay và option
                      giá
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      ></span
                    >
                  </v-tooltip>
                  <v-chip small color="red lighten-5" text-color="red darken-4">
                    Lưu ý giá trên chưa bao gồm phụ phí
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
                      >Lưu chuyến bay ưa thích của bạn
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
                      >Chia sẻ chuyến bay với người thân của bạn
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
                      >Click để xem chi tiết
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      >
                    </span>
                  </v-tooltip>
                </div>
                <div class="total-price">
                  <strong class="price-title">
                    <PriceValidation :price="ticketSelected.fare.Totalfare"
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
                  >{{ actionBtnTitle }}</v-btn
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
            <TicketDetail
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
  name: 'Ticket',
  components: {
    PriceValidation: () => import('@/components/generals/PriceValidation'),
    TicketDetail: () => import('@/components/select/TicketDetail')
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
      ticketSelected: {
        ticket: this.ticket,
        fare: this.ticket.MinFare,
        fee: []
      },
      timeOut: null
    }
  },
  mounted() {
    this.loading = true
    this.timeOut = setTimeout(() => {
      this.loading = false
    }, 600)
  },
  beforeDestroy() {
    clearTimeout(this.timeOut)
  },
  methods: {
    selectTicket(payload) {
      this.ticketSelected.fare = payload
      this.acceptSelectTicket()
    },
    acceptSelectTicket() {
      const ticket = {}
      ticket[this.ticketSelected.ticket.type] = this.ticketSelected
      this.$store.dispatch('checkout/updateTicketSelected', ticket)
      this.$router.push({
        path: 'checkout',
        query: {
          section: this.$store.getters['search/getSection']
        }
      })
    }
  }
}
</script>
<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
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
