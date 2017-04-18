<template>
  <div id="header" class="header">
    <div class="pull-right">
      <div class="btn-group" style="padding-top:10px;">
        <a type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          <span class="glyphicon glyphicon-user"></span> 王俊  <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a id="updatePassword">修改密码</a></li>
          <li><a id="loginOut">退出</a></li>
        </ul>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

</script>
<style type="text/css">
  .dropdown-menu{
    min-width: 100px;
    max-width: 130px;
    overflow: hidden;
  }
  .dropdown-menu > li > a{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header{
    position: absolute;
    top: 0;
    left: 300px;
    right: 0;
    height: 56px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    /*overflow-x: hidden;*/
  }
  .header .pull-right{
    padding-right: 48px;
  }
</style>
