<template>
  <div>
    <div class="page-content">
      <div class="page-info">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Packages</li>
          </ol>
        </nav>
      </div>
      <div class="main-wrapper">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  Packages
                </h5>
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr v-if="packages.length==0">
                        <td colspan="5" v-if="packagesListBeingUpdated"><i class="fas fa-spinner fa-spin ml-2"></i> Loading...</td>
                        <td colspan="5" v-else>No packages found...</td>
                      </tr>

                      <tr
                        v-else
                        v-for="paymentPackage in packages"
                        :key="paymentPackage._id"
                      >
                        <td>{{ paymentPackage.name }}</td>
                        <td>Rs {{ paymentPackage.price }}</td>
                        <td>{{ paymentPackage.duration }} Months</td>
                        <td>{{ paymentPackage.description }}</td>
                        <td>
                          <span
                            v-if="activePackageId == paymentPackage._id"
                            class="badge badge-success"
                            >Active</span
                          >

                          <button
                            v-if="!activePackageId"
                            type="button"
                            class="btn btn-primary btn-xs"
                            @click="subscribe(paymentPackage, 'esewa')"
                          >
                            Subscribe with esewa
                          </button>

                          <button
                            v-if="!activePackageId"
                            type="button"
                            class="btn btn-primary btn-xs ml-2"
                            @click="subscribeWithKhalti(paymentPackage)"
                          >
                            Subscribe with Khalti
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import KhaltiCheckout from "khalti-web";

export default {
  name: "Package",

  data() {
    return {
      
    };
  },

  created() {
    /** Fetching the packages. */
    this.fetchPackages();
  },

  computed: {
    ...mapGetters(["authUser", "packages"]),

    /** Returns the id of the package the customer is subscribed to. */
    activePackageId: function () {
      const subscriptions = this.authUser.subscriptions
      if (!subscriptions) return null;

      const subscription = this.authUser.subscriptions[0];
      if (!subscription) return null;

      return subscription.paymentPackage;
    },
  },

  methods: {
    ...mapActions(["fetchPackages", "fetchProfile", "confirmKhaltiPayment", "packagesListBeingUpdated"]),

    subscribe(paymentPackage, gateway) {
      if (gateway == "esewa") {
        this.subscribeWithEsewa(paymentPackage);
      } else if (gateway == "khalti") {
        this.subscribeWithKhalti(paymentPackage);
      }
    },

    subscribeWithEsewa(paymentPackage) {
      const packageAmount = paymentPackage.price;
      const taxAmount = 0;
      const serviceCharge = 0;
      const deliveryCharge = 0;
      const totalAmount =
        packageAmount + taxAmount + serviceCharge + deliveryCharge;

      const esewa = {
        amt: packageAmount,
        psc: serviceCharge,
        pdc: deliveryCharge,
        txAmt: taxAmount,
        tAmt: totalAmount,
        pid: paymentPackage._id,
        scd: process.env.VUE_APP_ESEWA_MERCHANT_ID,
        su: `${process.env.VUE_APP_URL}/#/webhooks/esewa/success`,
        fu: `${process.env.VUE_APP_URL}/#/webhooks/esewa/failed`,
      };

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

      for (var key in esewa) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", esewa[key]);
        form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();
    },

    subscribeWithKhalti(paymentPackage) {
      let vm = this

      let khaltiConfig = {
        publicKey: process.env.VUE_APP_KHALTI_MERCHANT_ID,
        productIdentity: paymentPackage._id,
        productName: paymentPackage.name,
        productUrl: `${process.env.VUE_APP_URL}/#/packages`,
        amount: paymentPackage.price*100,
        eventHandler: {
          onSuccess(payload) {
            vm.confirmKhaltiPayment(payload)            

          },
          onError(error) {
            console.log(error);
            vm.$Toast.fire({
              icon: 'error',
              title: 'Subscription failed'
            })
          },
          onClose() {
            console.log("widget is closing");
          },
        },
      }

    
      let checkout = new KhaltiCheckout(khaltiConfig);
      checkout.show({ amount: khaltiConfig.amount });
    },
  },
};
</script>