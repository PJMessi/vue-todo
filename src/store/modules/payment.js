import axios from 'axios';

const state = {
    // payment process status.
    paymentStatus: ''
};

const getters = {
    // returns the payment process status.
    paymentStatus: state => state.paymentStatus
};

const actions = {
    /**
     * Makes api request to confirm the khalti payment.
     * @param {*} param0 
     * @param {*} khaltiPayload 
     */
    confirmKhaltiPayment: async function({commit}, khaltiPayload) {
        commit('updatePaymentStatus', 'confirming')

        axios.post(`${process.env.VUE_APP_API_BASE_URL}/customer/payments/khalti`, khaltiPayload)
        .then(res => {
            console.log(res)
            commit('updatePaymentStatus', 'success')
        })
        .catch(err => {
            console.log(err)
            commit('updatePaymentStatus', 'failed')
        })
    },

    /**
     * Makes api request to confirm the esewa payment.
     * @param {*} param0 
     * @param {*} khaltiPayload 
     */
    confirmEsewaPayment: async function({commit}, esewaPayload) {
        commit('updatePaymentStatus', 'confirming')

        axios.post(`${process.env.VUE_APP_API_BASE_URL}/customer/payments/esewa`, esewaPayload)
        .then(res => {
            console.log(res)
            commit('updatePaymentStatus', 'success')
        })
        .catch(err => {
            console.log(err)
            commit('updatePaymentStatus', 'failed')
        })
    }
};

const mutations = {
    /** Updates the payment status. */
    updatePaymentStatus(state, newStatus) {
        state.paymentStatus = newStatus
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};