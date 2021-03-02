<template>
  <div class="container" :style="{ backgroundColor: curMenu.bgColor }">
    <img class="home" src="../assets/home.png" @click="goHome" />
    <span>{{ curMenu.name }}</span>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["curMenu"]),
  },
  methods: {
    ...mapMutations(["setCurMenu"]),
    goHome() {
      this.$router.push('/');
      this.setCurMenu ({
        name: "电视剧",
        bgColor: "rgb(72, 191, 196)",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  color: #f1f1f1;
  z-index: 9999999;
  height: 1rem;
  background-color: rgb(140, 223, 226);
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 1rem;
  text-align: center;
  .home {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>