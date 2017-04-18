$(function(){
    // $(window).parents().find("#contentFrame").load(function () {
        var main = window.top.$("#iframeBox"),
            w = main.width(),
            h = main.height();
        main.find("html").css({height: h,width: w,overflow: "auto"});
    // });
});
/**
 * 初始化控件
 */
function _initControl(){
    $("select[data-xtype='chosen']").chosen();
}
/***
 * 搜索框中的时间与时间段的关系
 * @param id 开始时间
 * @param id2 结束时间
 * @param id3 select下拉框
 */
function dateSearch(id, id2, id3){
    $(id).datepicker({
        format: 'yyyy-mm-dd',
        language: 'cn',
        autoclose:true,
    }).on("changeDate",function(e){
        var startTime = e.date;
        if(startTime && id3){
            $(id3).data("chosen").selectedItem("");
        }
        $(id2).datepicker('setStartDate',startTime);
    });
    $("#endDate").datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose:true,
    }).on("changeDate",function(e){
        var endTime = e.date;
        if(endTime && id3){
            $(id3).data("chosen").selectedItem("");
        }
        $('#startDate').datepicker('setEndDate',endTime);
    });
    if(id3){
        $(id3).change(function(){
            var value = $(this).val();
            if(value){
                $("#endDate,#startDate").val("");
            }
        });
    }
}

/**
 * 填充表格数据
 * @param id ele
 * @param data 入参
 * @param result 出参
 * */
function fillTableData(id, data, result, callback){
    var data=[
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        function(result, i){
            return '<a type="button" class="btn btn-default">按钮'+result[i]["a"]+'</a>';
        }

    ];
    var result = [
        {
            a: "1",
            b: "2",
            c: "3",
            d: "4",
            e: "5",
            f: "6",
            g: "7",
            h: "8",
            i: "9",
            j: "10",
            k: "11"
        },
        {
            a: "1",
            b: "2",
            c: "3",
            d: "4",
            e: "5",
            f: "6",
            g: "7",
            h: "8",
            i: "9",
            j: "10",
            k: "11"
        },
        {
            a: "3",
            b: "2",
            c: "3",
            d: "4",
            e: "5",
            f: "6",
            g: "7",
            h: "8",
            i: "9",
            j: "10",
            k: "11"
        }
    ];
    var str = "";
    $(id).html("");
    var resultLen = result.length,
         dataLen = data.length;
    for(var i = 0; i < resultLen; i ++){
        str += '<tr>'
            +'     <td><input name="check_item" type="checkbox"></td>';
        for(var  j = 0; j < dataLen; j ++ ){
            if(typeof (data[j]) !== "function"){
                str += '<td>' + result[i][data[j]] + '</td>';
            }else{
                str += '<td>'+ data[j](result,i) + '</td>';
            }
        }
        str += '  </tr>';
    }
    $(id).html(str);
    if(callback && typeof callback ==="function"){
        callback();
    }
}
/***
 *
 * @param id 分页的容器
 * @param currentPage 当前页数
 * @param numberOfPages
 * @param totalPages
 * @param callback
 */
function page(id, currentPage, numberOfPages, totalPages, callback){
    var options = {
        bootstrapMajorVersion:3,//版本号。3代表的是第三版本
        currentPage: (currentPage ? currentPage: 1), //当前页数
        numberOfPages: (numberOfPages ? numberOfPages: 1), //显示页码数标个数
        totalPages: (totalPages ? totalPages: 1),
        itemTexts: function (type, page, current) {
            //图标的更改显示可以在这里修改。
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "尾页";
                case "page":
                    return  page;
            }
        },
        onPageClicked: function (e, originalEvent, type, page) {
            //单击当前页码触发的事件。若需要与后台发生交互事件可在此通过ajax操作。page为目标页数。
            if(callback && typeof callback == "function"){
                callback(e, originalEvent, type, page);
            }
        }
    };
    $(id).bootstrapPaginator(options)
}
/**
 * 全选 table列表下的
 * @param id  全选的id
 * @param id2 单个集合的父类的id
 */
function checkAll(id, id2){
    $(id).click(function() {
        if($(this).is(":checked")){
            $(id2+" input[type='checkbox']").prop("checked",true);
        }else{
            $(id2+" input[type='checkbox']").prop("checked",false);
        }
    });
    $(id2).on('click', " input[type='checkbox']", function() {
        for (var i = 0; i < $(id2 +" input[type='checkbox']").length; i++) {
            if($(id2 +" input[type='checkbox']")[i].checked != true){
                $(id).prop("checked", false);
                return;
            }else{
                $(id).prop("checked", true);
            }
        }
    });
}
/**
 * 帶label的全選
 * @param id
 * @param id2
 */
function checkLabelAll(id, id2){
    window.top.$(id).click(function() {
        if($(this).find("input[type='checkbox']").is(":checked")){
            window.top.$(id2+" input[type='checkbox']").prop("checked",true);
        }else{
            window.top.$(id2+" input[type='checkbox']").prop("checked",false);
        }
    });
    window.top.$(id2).on('click', " input[type='checkbox']", function() {
        for (var i = 0; i < window.top.$(id2 +" input[type='checkbox']").length; i++) {
            if(window.top.$(id2 +" input[type='checkbox']")[i].checked != true){
                window.top.$(id+" input[type='checkbox']").prop("checked", false);
                return;
            }else{
                window.top.$(id+" input[type='checkbox']").prop("checked", true);
            }
        }
    });
}


window.top.ajaxIsloadingIndex = 0;
var str = '<div class="content-load">' +
                '<div class="content-load-box">' +
                    '<img src="../images/ajaxLoading.gif"/>' +
                    '<h3 class="title">正在努力加载中。。。</h3>' +
                '</div>' +
            '</div>';
window.top.$(document).ajaxStart(function() {
    if (window.top.ajaxIsloadingIndex == 0) {
        window.top.$('body').append(str)
    }
    window.top.ajaxIsloadingIndex++
});
window.top.$(document).ajaxStop(function() {
    window.top.ajaxIsloadingIndex--;
    if (window.top.ajaxIsloadingIndex == 0) {
        window.top.$('.content-load').fadeOut(function() {
            $(this).remove();
        });
    }
});
/**
 *
 * @param url 请求路径
 * @param data  请求数据
 * @param callback  回调函数
 */
function post(url, data, callback){
    window.top.$.ajax({
        url: url,
        data: JSON.stringify(data),
        type: "post",
        timeout: "60000",
        dataType: "json",
        contentType: "application/json",
        success: function(result){
            if(!result && !window.top.$("#dialog.in")){
                window.top.$("#dialog-error .modal-title").html("");
                window.top.$("#dialog-error .modal-body").html("");
                window.top.$("#dialog-error").modal();
                return;
            }
            typeof(callback) == "function" && callback(result);
        }
    }).fail(function(err,xhr){
        if(err &&( err.status==0 || err.status==200)){
            return;
        }
        window.top.ajaxIsloadingIndex = 0;
        window.top.$('.content-load').fadeOut(function() {
            $(this).remove();
        });
    });
}
/**
 * 检验密码格式
 * @param password
 * @returns {boolean}
 */
function testPassword(password){
    var pattern = /^[a-zA-Z\d]{6,20}$/;
    return pattern.test(password);
}