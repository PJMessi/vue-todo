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
              <div class="card-body">
                <h5 class="card-title">
                  Packages<a
                    href="#"
                    class="card-title-helper blockui-transactions"
                    ><i class="material-icons">refresh</i></a
                  >
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
                      <tr v-for="paymentPackage in packages" :key="paymentPackage._id">
                        <td>{{paymentPackage.name}}</td>
                        <td>Rs {{paymentPackage.price}}</td>
                        <td>{{paymentPackage.duration}} Months</td>
                        <td>{{paymentPackage.description}}</td>
                        <td>
                            <span v-if="activePackageId == paymentPackage._id" class="badge badge-success">Active</span>
                            <button v-if="!activePackageId" type="button" class="btn btn-primary btn-xs" @click="subscribe(paymentPackage, 'esewa')">Subscribe</button>
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

export default {
  name: "Package",

  data() {
      return {
          esewa: {
            amt: 100,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: 100,
            pid: "5fce2a1578ed5d24341569df",
            scd: "EPAYTEST",
            su: "http://localhost:8080/#/webhooks/esewa/success",
            fu: "http://localhost:8080/#/webhooks/esewa/failed"
        }
      }
  },

  created() {
    this.fetchPackages();
  },

  computed: {
    ...mapGetters(["authUser", "packages"]),

    activePackageId: function() {
        const subscription = this.authUser.subscriptions[0]
        if (!subscription) return null

        return subscription.paymentPackage
    }
  },

  methods: {
    ...mapActions(["fetchPackages"]),

    subscribe(paymentPackage, gateway) {
        if (gateway == 'esewa') {
            this.subscribeWithEsewa(paymentPackage)
        } 
    },

    subscribeWithEsewa(paymentPackage) {
        const packageAmount = paymentPackage.price
        const taxAmount = 0
        const serviceCharge = 0
        const deliveryCharge = 0
        const totalAmount = packageAmount + taxAmount + serviceCharge + deliveryCharge

        const esewa = {
            amt: packageAmount,
            psc: serviceCharge,
            pdc: deliveryCharge,
            txAmt: taxAmount,
            tAmt: totalAmount,
            pid: paymentPackage._id,
            scd: "EPAYTEST",
            su: "http://localhost:8080/#/webhooks/esewa/success",
            fu: "http://localhost:8080/#/webhooks/esewa/failed"
        }

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

        for(var key in esewa) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", esewa[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }
  },
};
</script>