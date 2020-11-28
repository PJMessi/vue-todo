import moment from 'moment'
import Vue from "vue";

Vue.filter('format_date', value => {
    if (!value) return value

    return moment(value).format('MMMM Do YYYY, h:mm a')
})