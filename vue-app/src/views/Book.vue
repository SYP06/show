<template>
  <div id="container"
    v-loading.fullscreen="loading" 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="picture">
      <el-carousel :interval="4000" type="card" height="200px" indicator-position="none">
        <el-carousel-item v-for="item in bookList" :key="item.id">
          <img :src="'http://images.weserv.nl/?url=' + item.cover.url" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="虚构类" name="fiction"></el-tab-pane>
        <el-tab-pane label="非虚构类" name="nonfiction"></el-tab-pane>
        <ul>
          <li v-for="item in bookList" :key="item.id" class="details">
            <div class="img">
              <img :src="'http://images.weserv.nl/?url=' + item.cover.url" />
            </div>
            <div class="details-item">
              <h3>{{ item.title }}</h3>
              <el-rate
                class="rate"
                :value="getRate(item.rating.value)"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
              <p>{{ item.info }}</p>
            </div>
          </li>
        </ul>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookList: [],
      activeName: "fiction",
      loading:false,
      start:0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let url =
        'https://m.douban.com/rexxar/api/v2/subject_collection/book_'+this.activeName +'/items?os=ios&start='+this.start+'&count=10';
      this.axios
        .get(baseUrl + url)
        .then((res) => {
          console.log(res);
          this.bookList =res.data.subject_collection_items;
          this.loading = false;

        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick() {
      this.getData()
    },
    getRate(num){
      let value = num/2;
      value = value *10;
      value = Math.trunc(value);
      value = value/10;
      return value
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  .picture {
    margin-top: 1.2rem;
    img {
      width: 100%;
    }
  }
  .content {
    padding: 0.2rem;
    .details {
      display: flex;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 0.2rem;
      .rate{
        margin: 0.2rem 0;
      }
      .img {
        flex: 3;
        img {
          width: 100%;
        }
      }
      .details-item {
        margin-left: 0.2rem;
        flex: 5;
      }
    }
  }
}
</style>