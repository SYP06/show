<template>
  <div>
    <aplayer :audio="audio" :lrcType="3" />
    <ul>
      <li class="title">
        <span class="index">序号</span>
        <span class="name">歌曲名</span>
        <span class="singer">歌手</span>
      </li>
      <li
        class="title"
        v-for="(item, index) in musicList"
        :key="item.index"
        @click="getMusic(item.id)"
      >
        <span class="index">{{ index + 1 }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="singer">{{ item.ar[0].name }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";

Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true,
});
export default {
  data() {
    return {
      musicList: [],
      audio: [
        {
          name: "花火が瞬く夜に",
          artist: "羽肿",
          url: "http://m10.music.126.net/20210302104035/fc156ce3478ecf367025b2c096d033cb/ymusic/38e6/c33b/f417/0b3f28550a9c96b02ff1835d7668e35d.mp3",
          cover: 'http://p2.music.126.net/f7Nd9FSzVZMkTPWDW_rnOg==/736672800839982.jpg', // prettier-ignore
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let url = "https://bird.ioliu.cn/netease/playlist?id=5381722575";
      this.axios.get(url).then((res) => {
        console.log(res);
        this.musicList = res.data.playlist.tracks;
      });
    },
    getMusic(id) {
      let musicUrl = "https://bird.ioliu.cn/netease/song?id=" + id;
      this.axios
        .get(musicUrl)
        .then((res) => {
          console.log(res);
          this.audio={
            name:res.data.data.name,
            artist:res.data.data.ar[0].name,
            url:res.data.data.mp3.url ,
            cover:res.data.data.al.picUrl,
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  display: flex;
  justify-content: space-around;
  .index {
    flex: 1;
  }
  .name {
    flex: 4;
  }
  .singer {
    flex: 2;
  }
}
</style>