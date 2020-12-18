<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
      if (this.$route.params.status == 'success') {
          this.confirmEsewaPayment(this.$route.query);

      } else {
          this.$Toast.fire({
            icon: 'error',
            title: 'Subscription failed'
          })
      }
      this.$router.push('/packages')
  },

  watch: {},

  computed: {
    ...mapGetters(['paymentStatus'])
  },

  methods: {
    ...mapActions(["confirmEsewaPayment"])
  },
};
</script>