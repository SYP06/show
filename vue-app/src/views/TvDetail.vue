<template>
  <div id="container">
    <div>
      <div class="card">
        <div class="img">
          <img :src="'http://images.weserv.nl/?url=' + tvList.pic.normal" />
        </div>
        <div class="content">
          <h2 class="title">{{ tvList.title }}</h2>
          <p class="content-detail">{{ tvList.card_subtitle }}</p>
          <div class="rate" v-if="tvList.rating">
            <el-rate
              max:10
              :value="getRate(tvList.rating.value)"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </div>
        </div>
      </div>
      <div class="intro">
        <h3>剧集简介</h3>
        <div class="intro-detail">{{ tvList.intro }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tvList: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let url =
        "https://m.douban.com/rexxar/api/v2/tv/" +
        this.$route.params.id +
        "?ck=&for_mobile=1";
      this.axios
        .get(baseUrl + url)
        .then((res) => {
          console.log(res);
          this.tvList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getRate(num) {
      let value = num / 2;
      value = value * 10;
      value = Math.trunc(value);
      value = value / 10;
      return value;
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  .card {
    color: #ffffff;
    padding: 0.2rem;
    display: flex;
    background-color: rgb(48, 46, 76);
    .img {
      flex: 3;
      img {
        width: 100%;
      }
    }
    .content {
      margin-left: 0.2rem;
      flex: 5;
      .title {
        margin-bottom: 0.2rem;
      }
      .content-detail {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.3rem;
      }
      .rate {
        margin: 0.2rem 0;
      }
    }
  }
  .intro {
    padding: 0.2rem;
    h3 {
      margin: 0.1rem 0;
      color: #818181;
      font-size: 0.4rem;
    }
    .intro-detail {
      color: #191919;
      font-size: 0.3rem;
    }
  }
}

.total-introduce {
  height: auto;
  overflow: hidden;
  font-size: 26px;
  color: #666;
  margin-top: 30px;
  .intro-content {
    .merchant-desc {
      width: 100%;
      line-height: 40px;
    }
  }
  .unfold {
    display: block;
    float: right;
    width: 80px;
    height: 40px;
    z-index: 8;
    text-align: center;
    p {
      margin: 0;
      line-height: 40px;
      color: #0098ff;
    }
  }
}
.detailed-introduce {
  font-size: 26px;
  color: #666;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  .intro-content {
    //最大高度设为3倍的行间距
    max-height: 120px;
    line-height: 40px;
    word-wrap: break-word;
    word-break: break-all;
    background-color: #fff;
    color: #fff;
    overflow: hidden;
    .merchant-desc {
      width: 100%;
      line-height: 40px;
    }
    &::after,
    &::before {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      color: #666;
    }
    &::before {
      display: block;
      overflow: hidden;
      z-index: 1;
      max-height: 80px;
      background: #fff;
    }
    &::after {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      height: 120px;
      // 截取行数
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      box-sizing: border-box;
      // 行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]
      text-indent: -6em;
      // 尾部留空字符数
      padding-right: 3em;
    }
    .unfold {
      z-index: 8;
      width: 80px;
      height: 40px;
      outline: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      text-align: center;
      p {
        margin: 0;
        color: #0098ff;
      }
    }
  }
}
</style>