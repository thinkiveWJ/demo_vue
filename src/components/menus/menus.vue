<template>
  <div id="menus" class="menus">
    <div class="logo">
      <img src="./logo.jpg">
    </div>
    <ul class="nav nav-pills nav-stacked">
      <li v-for="item in menus" class="" @click="showMenu(item, $event)">
        <router-link :to="item.url">{{item.menuName}}  <span class="glyphicon glyphicon-chevron-down pull-right"></span></router-link>
        <ul class="nav nav-pills nav-stacked menu-box">
          <li v-for="itemChild in item.menus" @click.stop="showMenu(itemChild, $event)">
            <router-link :to="itemChild.url">{{itemChild.menuName}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script type='text/ecmascript-6'>
//  import $ from 'jQuery';
//  import 'jQueryRotate';
  export default{
    data () {
      return {

      }
    },
    props: {
      menus: {

      }
    },
    updated (){
      $(".menus > ul li ul").hide();
      $(".menus > ul li:eq(0) ul").show();
      $(".menus > ul li:eq(0)").addClass("active").siblings().removeClass("active");
      $(".menus > ul li:eq(0) .glyphicon").rotate({animateTo: -180});
      $(".menu-box li:eq(0)").addClass("on").siblings().removeClass("on");
      $(".menus > ul li:eq(0) .menu-box").slideDown();
    },
    methods: {
      showMenu (item, event) {
        var el = event.currentTarget;
        if($(el).hasClass("active") || $(el).hasClass("on")){
          return;
        }
        if(item['menus'].length > 0){
          $(el).addClass("active").siblings().removeClass("active");
          $(".menus .menu-box").slideUp();
          $(".menus .glyphicon").rotate({animateTo: 0});
          $(el).find(".glyphicon").rotate({animateTo: -180});
          $(el).find(".menu-box li:eq(0)").addClass("on").siblings().removeClass("on");
          $(el).find(".menu-box").slideDown();
        }else{
          $(el).addClass("on").siblings().removeClass("on");
        }
      }
    }
  };
</script>
<style type='text/css' rel='stylesheet'>
  .menus{
    position: absolute;
    width: 300px;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    left: 0;
    bottom: 0;
    top: 0;
  }
  .menus .logo {
    width: 299px;
    height: 55px;
  }
  .menus .logo img{
    width: 100%;
    height: 100%;
    border: none;
  }
  .menus .menu-box li.on{
    background: #eeeeee;
  }
  .nav-stacked > li{
    border-top: 1px solid #ddd;
  }
  .nav-stacked > li + li{
    margin-top: -1px;
    border-bottom: 1px solid #ddd;
  }
  .nav-stacked > li.last{
    border-bottom: none;
  }
  .menus li.active .menu-box{
    display: block;
    text-indent: 48px;
  }
  .menus .menu-box{
    display: none;
  }

</style>
