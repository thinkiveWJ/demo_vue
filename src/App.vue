<template>
  <div id="demo">
    <v-menus :menus="menus"></v-menus>
    <v-header></v-header>
    <div style="position: absolute;top: 55px;left: 300px;right:0;bottom:0;overflow: auto;">
        <router-view></router-view>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import menus from "components/menus/menus";
  import header from "components/header/header"
  const ERR_OK = 0;
  export default {
    data () {
      return {
        menus: this.menus
      };
    },
    created () {
      this.$http.get("/api/menus").then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.menus = Object.assign({}, this.menus, response.data);
        }
      });
    },
    components: {
      "v-menus": menus,
      "v-header": header
    },
    methods: {

    }
  };
</script>

<style type="text/css">

</style>
