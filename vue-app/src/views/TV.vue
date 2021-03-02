<template>
  <div id="container">
    <ul class="tv-list">
      <li class="tv-item" v-for="item in tvList" :key="item.id" @click="goDetail(item.id)">
        <div class="img">
          <img :src="'https://images.weserv.nl/?url=' + item.cover.url" />
        </div>
        <div class="content">
          <h3>{{ item.title }}</h3>

          <div class="rate" v-if="item.rating">
            <el-rate
              class=""
              :value="getRate(item.rating.value)"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
          <p>{{ item.info }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tvList: [],
      start: 0,
      isFinish: true,
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.listenScroll();
  },
  methods: {
    getData() {
      if (this.isFinish) {
        this.isFinish = false;
        let baseUrl = "https://bird.ioliu.cn/v2?url=";
        let tvUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=ios&for_mobile=1&start=${this.start}&count=10`;
        this.axios
          .get(baseUrl + tvUrl)
          .then((res) => {
            console.log(res);
            this.tvList = [
              ...this.tvList,
              ...res.data.subject_collection_items,
            ];
            this.isFinish = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getRate(num) {
      let value = num / 2;
      value = value * 10;
      value = Math.trunc(value);
      value = value / 10;
      return value;
    },
    listenScroll() {
      let htmlDom = document.documentElement;
      let deviceHeight = 0;
      let scrollHeight = 0;
      let fullHeight = 0;
      window.onscroll = () => {
        fullHeight = htmlDom.offsetHeight;
        deviceHeight = htmlDom.clientHeight;
        scrollHeight = htmlDom.scrollTop;
        if (
          deviceHeight + scrollHeight > fullHeight - 10 &&
          this.start < 50 &&
          this.isFinish === true
        ) {
          this.start += 10;
          this.getData();
        }
      };
    },
    goDetail(id){
      this.$router.push('/detail/'+id)
    }
  },
};
</script>
<style lang="scss" scoped>
.tv-list {
  .tv-item {
    display: flex;
    padding: 0.2rem;
    border-bottom: 0.02rem solid #cccccc;
    .img {
      flex: 3;
      img {
        width: 100%;
      }
    }
    .content {
      flex: 5;
      padding: 0.2rem;
      h3 {
        font-weight: bolder;
        margin-bottom: 0.25rem;
      }
      .rate {
        padding: 0.2rem 0;
      }
    }
  }
}
</style>