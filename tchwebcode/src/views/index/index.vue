<template>
  <!-- 底部导航   首页 -->
  <div>
    <header class="index_header">
      <p class="header_left">基地直播</p>
      <p class="header_cen">淘厨汇农业电商平台</p>
      <router-link class="header_right_a" to="/search/search">
        <img src="../../assets/images/icon/search.png" alt>
      </router-link>
    </header>

    <!-- 内容 -->
    <div class="con">
      <!-- banner -->
      <div class="banner">
        <swiper class="banner_swiper" :options="banner_swiper" v-if="banner.length">
          <swiper-slide class="banner_slide" v-for="banner in banner" :key="banner.index">
            <img :src="big_img+banner.Image_Url" alt>
          </swiper-slide>
          <div class="swiper-pagination point" slot="pagination"></div>
        </swiper>
      </div>

      <!-- 导航 -->
      <ul class="nav_ul">
        <li class="nav_li">
          <router-link to="/index_nav/year_reserve">
            <div class="nav_div">
              <img src="../../assets/images/icon/Reserve.png" alt>
            </div>
            <p class="nav_p">年货预定</p>
          </router-link>
        </li>
        <li class="nav_li">
          <router-link to="/index_nav/fresh_good">
            <div class="nav_div">
              <img src="../../assets/images/icon/fresh.png" alt>
            </div>
            <p class="nav_p">新鲜好货</p>
          </router-link>
        </li>
        <li class="nav_li">
          <router-link to="/index_nav/popularity_recommendation">
            <div class="nav_div">
              <img src="../../assets/images/icon/Popularity_Recommend.png" alt>
            </div>
            <p class="nav_p">人气推荐</p>
          </router-link>
        </li>
        <li class="nav_li">
          <router-link to="/index_nav/preferential_recommendation">
            <div class="nav_div">
              <img src="../../assets/images/icon/Discount_Recommend.png" alt>
            </div>
            <p class="nav_p">特惠推荐</p>
          </router-link>
        </li>
      </ul>

      <div class="interval"></div>

      <!-- 喇叭 -->
      <div class="horn_box">
        <img class="horn_img" src="../../assets/images/icon/horn.png" alt>
        <div class="horn_con">
          <swiper
            class="banner_swiper horn"
            :options="horn_swiper"
            v-if="horn.length"
            ref="horn_id"
          >
            <swiper-slide class="banner_slide horn_slide" v-for="horn in horn" :key="horn.index">
              <router-link
                class="horn_a"
                :to="{path:'/detail/notice_details',query:{Message_ID:horn.Message_ID}}"
              >{{horn.Create_AdminName}}</router-link>
            </swiper-slide>
          </swiper>
        </div>
        <!-- <router-link class="horn_details" to="">{{horn[0].Create_AdminName}}</router-link> -->
        <router-link
          class="horn_details"
          :to="{path:'/detail/notice_details',query:{Message_ID:horn.Message_ID}}"
          v-for="(horn,index) in horn"
          :key="horn.index"
          v-if="index==realIndex"
        >详情</router-link>
      </div>

      <div class="interval"></div>

      <!-- 直播 -->
      <div class="modular">
        <!-- 标题 -->
        <div class="title">
          <div class="title_left">
            <span class="title_span"></span>
            <p class="titel_p">原生态基地直播</p>
          </div>
          <div class="title_right">
            <router-link class="title_a" to="/base">
              <p class="index_right_p">更多基地</p>
              <img class="index_right_img" src="../../assets/images/icon/more.png" alt>
            </router-link>
          </div>
        </div>
        <!-- 内容 -->
        <div class="modular_con">
          <div class="list" v-for="broadcast in broadcast" :key="broadcast.index">
            <router-link
              class="list_a"
              :to="{path:'/base_detail',query:{baseID:broadcast.Business_ID}}"
            >
              <img class="list_img" :src="big_img+broadcast.Business_LogoUrl" alt>
              <p class="list_name">{{broadcast.Business_Name}}</p>
              <p class="list_p">{{broadcast.Business_AddressInfo}}</p>
              <div class="list_label">直播中</div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="interval"></div>

      <!-- 限时预定 -->
      <div class="modular limit_time" v-if="reserve.RType_IsHomeShow">
        <!-- 标题 -->
        <div class="title">
          <div class="title_left">
            <span class="title_span"></span>
            <p class="titel_p">限时预定</p>

            <!-- 时间 -->
            <div class="limited_time">
              <p class="limited_time_p">{{reserve.RType_Num}}</p>
              <p class="time_surplus">
                <span>{{differ_hour}}</span>:
                <span>{{differ_minute}}</span>:
                <span>{{differ_second}}</span>
              </p>
            </div>
          </div>
          <div class="title_right">
            <router-link class="title_a" to="/index_nav/year_reserve">
              <p class="index_right_p">更多预定</p>
              <img class="index_right_img" src="../../assets/images/icon/more.png" alt>
            </router-link>
          </div>
        </div>
        <!-- 内容 -->
        <div class="modular_con">
          <ul class="year_list">
            <li class="year_li" v-for="reserve_details in reserve.Reservation_Info" :key="reserve_details.index">
              <router-link class="yaer_list_a" :to="{path:'/detail/product_detailed',query:{product_id:reserve_details.Product_ID}}">
                <div class="year_img">
                  <img :src="big_img+reserve_details.Product_Info.Image_Url" alt>
                </div>
                <p class="year_p">{{reserve_details.Product_Info.Product_Name}}</p>
                <div class="year_monye">
                  <span class="new_money">￥{{reserve_details.Product_Info==undefined?((reserve_details.Product_Info.Product_Sku[0].Sku_PriceCash * reserve_details.Reser_Deposit).toFixed(2)):0}}</span>
                  <span class="old_money">￥{{reserve_details.Product_Info==undefined?(reserve_details.Product_Info.Product_Sku[0].Sku_PriceCash):0}}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="interval"></div>

      <!-- 新鲜好货 -->
      <div class="modular fresh">
        <!-- 标题 -->
        <div class="title">
          <div class="title_left">
            <span class="title_span"></span>
            <p class="titel_p">新鲜好货</p>
          </div>
          <div class="title_right">
            <router-link class="title_a" to="/index_nav/fresh_good">
              <p class="index_right_p">更多好货</p>
              <img class="index_right_img" src="../../assets/images/icon/more.png" alt>
            </router-link>
          </div>
        </div>
        <!-- 内容 -->
        <div class="modular_con">
          <swiper class="banner_swiper" :options="fresh_swiper" v-if="fresh.length">
            <swiper-slide class="fresh_slide" v-for="fresh in fresh" :key="fresh.index">
              <router-link class="yaer_list_a fresh_a" :to="{path:'/detail/product_detailed',query:{product_id:fresh.Product_ID}}">
                <div class="year_img fresh_img">
                  <img :src="big_img+fresh.Image_Url" alt>
                </div>
                <p class="year_p">{{fresh.Product_Name}}</p>
                <div class="year_monye">
                  <span class="new_money">￥{{fresh.Product_PriceCash}}</span>
                </div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="interval"></div>

      <!-- 人气推荐 -->
      <div class="modular">
        <!-- 标题 -->
        <div class="title">
          <div class="title_left">
            <span class="title_span"></span>
            <p class="titel_p">人气推荐</p>
          </div>
          <div class="title_right">
            <router-link class="title_a" to="/index_nav/popularity_recommendation">
              <p class="index_right_p">更多推荐</p>
              <img class="index_right_img" src="../../assets/images/icon/more.png" alt>
            </router-link>
          </div>
        </div>
        <!-- 内容 -->
        <div class="modular_con">
          <!-- 每个商品 -->
          <div class="Recommend_shop" v-for="(popularity,index) in popularity" v-if="index < 5" :key="popularity.index">
            <router-link
              class="Recommend_shop_a"
              :to="{path:'/detail/product_detailed',query:{product_id:popularity.Product_ID}}"
            >
              <div class="Recommend_shop_left">
                <img :src="big_img+popularity.Image_Url" alt>
              </div>
              <div class="Recommend_shop_right">
                <p class="Recommend_shop_name">{{popularity.Product_Name}}</p>
                <div class="Recommend_shop_p">
                  <p>{{popularity.Product_Explain}}</p>
                </div>
                <div class="recommend_money">
                  <span class="new_money">¥{{(popularity.Product_PriceCash*0.9).toFixed(2)}}</span>
                  <span
                    class="old_money"
                  >￥{{popularity.Product_PriceCash}}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../assets/css/index.css";
</style>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css"; //在全局没引入，这里记得要！
import { swiper, swiperSlide } from "vue-awesome-swiper";

import bus from "../../assets/js/bus.js"; //非组件传值

export default {
  data() {
    return {
      banner: "", //banner
      horn: "", //喇叭
      broadcast: "", //直播
      reserve: "", //预定
      // 限时预定的时分秒
      differ_hour: "0",
      differ_minute: "0",
      differ_second: "0",

      fresh: "", //新鲜好货
      popularity: "", //人气推荐

      //  当前公告的index
      realIndex: 0,

      //图片接口
      big_img: localStorage.big_img, //大
      middle_img: localStorage.middle_img, //中
      small_img: localStorage.small_img, //小

      // banner  swiper
      banner_swiper: {
        observeParents: true,
        observer: true,
        loop: true,
        speed: 1000, //切换速度
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      // 喇叭   swiper
      horn_swiper: {
        observeParents: true,
        observer: true,
        loop: true,
        speed: 1000, //切换速度
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        direction: "vertical", //垂直
        imulateTouch: false, //禁止鼠标模拟
        allowTouchMove: false, //禁止触摸滑动
        on: {
          slideChange: () => {
            let horn_id = this.$refs.horn_id.swiper;
            if (horn_id == null) {
              this.realIndex = 0;
            } else {
              let i = horn_id.realIndex;
              this.realIndex = i;
            }
          }
        }
      },
      // 新鲜好货   swiper
      fresh_swiper: {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created: function() {
    // localStorage.provesignin = 0
    // 到这个页面就把 Tabbar 组件 的 page 传过去，改变底部导航的选择状态，不然返回时，选择状态一直带首页
    this.change_bottom_selection();

    // 获取banner
    this.get_banner();
    // 获取公告
    this.get_horn();
    // 首页直播
    this.get_broadcast();
    // 限时预定
    this.get_reserve();
    // 新鲜好货
    this.get_fresh();
    // 人气推荐
    this.get_popularity();
  },
  mounted: function() {
    
  },
  methods: {
    // 到这个页面就把 Tabbar 组件 的 page 传过去，改变底部导航的选择状态，不然返回时，选择状态一直带首页
    change_bottom_selection: function() {
      bus.$emit("change_selection", 0);
    },
    get_banner: function() {
      var _this = this;
      axios
        .get(localStorage.weburl + "/Home/GetShopBanner")
        .then(res => {
          _this.banner = res.data.Return_Data.PageData;
          // console.log(res)
        })
        .catch(error => {
          console.log(error);
        }); //查询失败返回的值
    },
    get_horn: function() {
      var _this = this;
      axios
        .get(localStorage.weburl + "/Home/GetMessage?PageIndex=0")
        .then(res => {
          _this.horn = res.data.Return_Data.PageData;
          // console.log(_this.horn)
        })
        .catch(error => {
          console.log(error);
        }); //查询失败返回的值
    },
    get_broadcast: function() {
      var _this = this;
      axios
        .get(localStorage.weburl + "/Home/GetHomeBusiness")
        .then(res => {
          _this.broadcast = res.data.Return_Data;
          console.log(_this.broadcast)
        })
        .catch(error => {
          console.log(error);
        }); //查询失败返回的值
    },
    get_reserve: function() {
      var _this = this;
      axios
        .get(localStorage.weburl + "/Home/ResterInfo_HomeShow")
        .then(res => {
          //axios.get('http://192.168.2.180/Home/ResterInfo_HomeShow').then(res => {
          _this.reserve = res.data.Return_Data;
          this.set_reserve_time();
        })
        .catch(error => {
          console.log(error);
        }); //查询失败返回的值
    },
    get_fresh: function() {
      var _this = this;
      axios
        .get(localStorage.weburl + "/Home/GetHomeProdcut?page=1&type=1")
        .then(res => {
          _this.fresh = res.data.Return_Data;
          // console.log(_this.fresh)
        })
        .catch(error => {
          console.log(error);
        }); //查询失败返回的值
    },
    get_popularity: function() {
      var _this = this;
      axios.get(localStorage.weburl + "/Home/GetHomeProdcut?page=1&type=2").then(res => {
          _this.popularity = res.data.Return_Data;
          // console.log(res.data.Return_Data)
      }).catch(error => {
        console.log(error); //查询失败返回的值
      }); 
    },
    // 倒计时
    set_reserve_time() {
      var _this = this;
      var end_time = new Date(this.reserve.RType_EndTime.replace("T", " "));
      var index_reserve_time = setInterval(function() {
        var current_time = new Date();
        current_time = (end_time - current_time) / 1000;

        // 小时
        _this.differ_hour = parseInt(current_time / 3600);

        // 分钟
        _this.differ_minute = parseInt(
          (current_time - _this.differ_hour * 3600) / 60
        );

        // 秒
        _this.differ_second = parseInt(
          current_time - _this.differ_hour * 3600 - _this.differ_minute * 60
        );

        if (_this.differ_hour <= 9) {
          _this.differ_hour = "0" + _this.differ_hour;
        }
        if (_this.differ_minute <= 9) {
          _this.differ_minute = "0" + _this.differ_minute;
        }
        if (_this.differ_second <= 9) {
          _this.differ_second = "0" + _this.differ_second;
        }
      }, 1000);

      // end_time-start_time 相减为毫秒，所以除以1000转换成秒
      // var differ_time = end_time-start_time
    }
  }
};
</script>