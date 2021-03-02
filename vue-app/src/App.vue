<template>
  <div id="app">
    <common-header></common-header>
    <div id="container">
      <router-view />
    </div>
    <common-footer></common-footer>
  </div>
</template>
<script>
import commonHeader from'../src/components/commonHeader'
import commonFooter from '../src/components/commonFooter'
export default {
  components:{
     commonHeader,
     commonFooter
  }
}
</script>
<style lang="scss" scope>
#container{
  margin-top: 1rem;
  margin-bottom: 1rem;

}
</style>
