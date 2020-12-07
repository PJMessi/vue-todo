<template>
    <div>
        Payment status: {{$route.params.status}}
    </div>
</template>

<script>
import axios from 'axios'
export default {
    
    created() {
        this.submitPaymentData()
    },

    methods: {
        submitPaymentData: async function() {

            const data = {                
                referenceNumber: this.$route.query.refId,
                totalAmount: this.$route.query.amt,
                productId: this.$route.query.oid
            }

            console.log(data)
            
            try {
                const res = await axios.post('http://localhost:5000/customer/payments/esewa', data)
                console.log(res)

            } catch (err) {
                console.log(err)
            }

        }
    }

}
</script>