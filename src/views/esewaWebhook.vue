<template>
  <div>
    <div class="page-content">
      <div class="page-info">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Apps</a></li>
            <li class="breadcrumb-item active" aria-current="page">Todo</li>
          </ol>
        </nav>
      </div>
      <div class="main-wrapper">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div
                class="alert no-m"
                :class="'alert-' + messageClass"
                role="alert"
              >
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isConfirmed: false,
      paymentStatus: this.$route.params.status,
      message: "",
      messageClass: ""
    };
  },

  created() {
      if (this.paymentStatus == 'success') {
          this.confirmPayment();
      } else {
          this.message = "Payment failed."
          this.messageClass = "danger"
      }
  },

  watch: {},

  methods: {
    ...mapActions(["fetchProfile"]),

    confirmPayment: async function () {
      try {
        this.message = "Payment is being confirmed....";
        this.messageClass = "info";

        const data = {
          referenceNumber: this.$route.query.refId,
          totalAmount: this.$route.query.amt,
          productId: this.$route.query.oid,
        };

        await axios.post("http://localhost:5000/customer/payments/esewa", data);

        await this.fetchProfile();

        this.isConfirmed = true;
        this.message = "Payment confirmed.";
        this.messageClass = "success"

      } catch (err) {
        this.message = "Payment could not be confirmed.";
        this.messageClass = "danger"
        console.log(err);
      }
    },
  },
};
</script>