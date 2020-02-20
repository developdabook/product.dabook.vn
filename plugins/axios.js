// main.js
import Vue from 'vue'
import axios from 'axios'

const baseURL = process.env.CRAWL_FLIGHT_API
Vue.prototype.$kxios = axios.create({ baseURL })
