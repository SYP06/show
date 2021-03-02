<template>
  <div class="container" :style="{ backgroundColor: curMenu.bgColor }">
    <div
      class="list"
      v-for="item in list"
      :key="item.path"
      @click="change(item)"
    >
      <router-link :to="item.path">{{ item.name }}</router-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [
        {
          path: "/",
          name: "电视剧",
          bgColor: "rgb(72, 191, 196)",
        },
        {
          path: "/music",
          name: "音乐",
          bgColor: "rgb(139, 114, 206)",
        },
        {
          path: "/book",
          name: "畅销书",
          bgColor: " rgb(122, 127, 146)",
        },
        {
          path: "/chat",
          name: "聊天",
          bgColor: " rgb(111, 148, 230)",
        },
      ],
    };
  },
  computed: {
    ...mapState(["curMenu"]),
  },
  created(){
    console.log(this.$route.path);
    this.list.forEach(value => {
      if(value.path == this.$route.path){
        this.setCurMenu(value)
      }
    });
  },
  methods: {
    ...mapMutations(["setCurMenu"]),
    change(obj) {
      this.setCurMenu(obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 1rem;
  background-color: rgb(72, 191, 196);
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 1rem;
  display: flex;
  justify-content: space-around;
  a {
      color:#000000;
    &.router-link-exact-active{
      color: #f1f1f1;
      font-size:0.5rem;
    }
  }
}
</style>