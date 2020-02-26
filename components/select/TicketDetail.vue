<template>
  <div class="flight-detail">
    <v-tabs v-model="tab" show-arrows>
      <v-tab class="tab-title">Flight</v-tab>
      <v-tab class="tab-title">Price</v-tab>
      <v-tab class="tab-title">Điều kiện</v-tab>
      <v-tab-item>
        <v-timeline dense class="tw-my-4 flight-timeline">
          <v-timeline-item small icon="mdi-bag-carry-on-check">
            <v-alert
              color="info"
              dense
              text
              class="tw-text-xs tw-border-dashed"
            >
              <strong>
                Chuyến bay khởi hành lúc
                {{ `${ticket.StartTime} , ${ticket.formatStartDate}` }}</strong
              >
              Vui lòng di chuyển tới sân bay và làm thủ tục trước khi bay ít
              nhất 45 phút
            </v-alert>
          </v-timeline-item>
          <v-timeline-item
            v-for="(seg, i) in ticket.Segments"
            :key="i + 'Segment'"
            small
            color="blue-grey lighten-5"
          >
            <template v-slot:icon>
              <v-tooltip top color="primary" z-index="999999">
                <template v-slot:activator="{ on }">
                  <v-avatar height="20" width="20" v-on="on">
                    <img
                      :src="
                        `https://booking.kayak.com/rimg/provider-logos/airlines/v/${seg.Airline}.png?crop=false&width=92&height=92`
                      "
                    />
                  </v-avatar>
                </template>
                <span
                  >{{ ticket.formatIATA.name }}
                  <v-icon color="#FFF" small
                    >mdi-information-outline</v-icon
                  ></span
                >
              </v-tooltip>
            </template>
            <v-card class="my-4 py-4 tw-shadow" color="#FFF">
              <FlightSegment
                :segment="seg"
                :total-time="ticket.formatTotalTime"
              />
            </v-card>
          </v-timeline-item>
          <v-timeline-item small icon="mdi-bag-checked">
            <v-alert color="info" dense text class="tw-text-xs tw-border-dashed"
              ><strong>Hành trình kết thúc lúc {{ ticket.EndTime }}</strong>
              Cảm ơn quý khách đã sử dụng dịch vụ của Đại Minh
            </v-alert>
          </v-timeline-item>
        </v-timeline>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="tw-my-4">
          <v-card-text>
            <v-radio-group v-model="fareOptionSelected">
              <div
                v-for="(fare, i) in ticket.FareOptions"
                :key="i + 'flightDetail'"
                class="fare-option-body"
              >
                <v-radio :value="fare" hide-details class="tw-m-0"
                  ><template v-slot:label>
                    <div class="tw-flex tw-flex-row tw-justify-start">
                      <strong class="class-info">
                        {{ fare.Description }} class</strong
                      ><strong class="teal--text tw-text-sm">{{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(fare.Totalfare)
                      }}</strong>
                    </div>
                  </template></v-radio
                >
                <span class="seat-info"
                  >{{ fare.SeatsAvailable }} seats available</span
                >
              </div>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="tw-my-4">
          <v-card-text class="tw-pt-4">
            <div class="tab-condition">
              Giá hiển thị luôn bao gồm khoản ước tính của toàn bộ thuế và cước
              phí bắt buộc, nhưng nhớ kiểm tra TẤT CẢ chi tiết vé, giá cuối cùng
              và các điều khoản và điều kiện trên trang web đặt vé trước khi bạn
              đặt vé.
              <ul>
                <li>
                  Kiểm tra phụ phí Một số hãng hàng không / đại lý tính thêm phí
                  hành lý, bảo hiểm hoặc sử dụng thẻ tín dụng và bao gồm phí
                  dịch vụ.
                  <nuxt-link to="/help/airlinefees" target="_blank"
                    >Xem phí của hãng hàng không
                  </nuxt-link>
                </li>
                <li>
                  Kiểm tra các điều khoản & điều kiện cho các hành khách trong
                  độ tuổi từ 12-16 Các giới hạn có thể áp dụng với hành khách
                  nhỏ tuổi đi một mình.
                </li>
              </ul>
            </div>
            <ContactBanner class="tw-shadow-none" /> </v-card-text
        ></v-card>
      </v-tab-item>
    </v-tabs>
    <div class="detail-action">
      <div class="tw-mr-4">
        <strong class="price-select teal--text">
          <PriceValidation :price="fareOptionSelected.Totalfare" />
        </strong>
      </div>
      <v-btn
        depressed
        small
        color="primary"
        class="detail-action-btn"
        @click="selectFareOption"
        >Select option</v-btn
      >
      <v-btn
        depressed
        small
        text
        color="primary"
        class="detail-action-btn"
        @click="close"
        >Close</v-btn
      >
    </div>
  </div>
</template>
<script>
// import _ from 'lodash'
import GeneralApi from '@/services/GeneralApi'
export default {
  name: 'TicketDetail',
  components: {
    PriceValidation: () => import('@/components/generals/PriceValidation'),
    FlightSegment: () => import('@/components/select/FlightSegment'),
    ContactBanner: () => import('@/components/search/ContactBanner')
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: null,
      fareOptionSelected: this.ticket.MinFare
    }
  },
  // watch: {
  //   ticket(newVal) {
  //     this.fareOptionSelected = _.clone(newVal.MinFare)
  //   }
  // },
  methods: {
    getAirPort(payload) {
      GeneralApi.GetAirPort(payload).then((result) => {
        return result
      })
    },
    async getIATABrandName(payload) {
      const IATABrandName = await GeneralApi.GetIATABrandName(payload)
      return IATABrandName
    },
    selectFareOption() {
      this.$emit('change', this.fareOptionSelected)
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="postcss">
.flight-detail {
  @apply tw-text-sm tw-p-4 tw-relative !important;
}
.tab-title {
  @apply tw-text-gray-800 tw-font-normal tw-normal-case !important;
}
.flight-timeline:before {
  left: calc(12px - 1px) !important;
  width: 1px !important;
}
.flight-timeline .v-timeline-item.theme--light .v-timeline-item__body {
  max-width: calc(100% - 12px) !important;
}
.flight-timeline .v-timeline-item.theme--light .v-timeline-item__divider {
  min-width: 24px !important;
}
.fare-option-body {
  @apply tw-flex tw-flex-col tw-justify-start tw-my-2;
}
.class-info {
  @apply tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0 tw-mr-2;
}
.seat-info {
  @apply tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0 tw-ml-1;
}
.tab-condition {
  @apply tw-text-gray-800 tw-text-xs;
}
.tab-condition ul {
  list-style: initial !important;
}
.detail-action {
  width: 100%;
  @apply tw-fixed tw-bottom-0 tw-right-0 tw-flex tw-justify-end tw-items-start tw-py-2 tw-mr-4 tw-bg-white tw-border-t;
}
.detail-action-btn {
  @apply tw-font-normal tw-normal-case;
}
.price-select {
  @apply tw-text-sm tw-font-bold tw-flex-grow tw-text-right tw-m-0 tw-p-0;
}
@screen md {
  .flight-timeline:before {
    left: calc(24px - 1px) !important;
    width: 1px !important;
  }
  .flight-timeline .v-timeline-item.theme--light .v-timeline-item__body {
    max-width: calc(100% - 24px) !important;
  }
  .flight-timeline .v-timeline-item.theme--light .v-timeline-item__divider {
    min-width: 48px !important;
  }
}
</style>
