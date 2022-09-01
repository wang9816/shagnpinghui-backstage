<template>
  <div class="dashboard-container">
   <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from "@/views/dashboard/Card"
import Sale from "@/views/dashboard/Sale"
import Observe from "@/views/dashboard/Observe";
export default {
  name: 'Dashboard',
  components:{
    Card,
    Sale,
    Observe
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
   /* this.$store.dispatch('getData')*/
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 5px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
