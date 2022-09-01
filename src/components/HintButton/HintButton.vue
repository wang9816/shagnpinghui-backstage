<template>

<!--    <el-tooltip :enterable="false" :hide-after="3000" effect="light" :content="title" placement="top" :open-delay="timeD">
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </el-tooltip>-->

  <a href="javascript:;" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>

</template>

<script  type="text/ecmascript-6">

export default {
  name:"HintButton",
  data(){
    return {
      timeD:1000
    }
  },
  props:['title'],
  mounted() {

  }

}

</script>

<style scoped>
a{
  margin: auto 5px;
}
</style>
