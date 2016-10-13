//收藏
var ShouCang = {
    GetShouCangList: function () {
        CommonRightControl.shoucangList(ShouCang.getShouCangListCallBack);
    },
    getShouCangListCallBack: function (data) {
        $(".cl-c").empty();
        $(".cl-c").append(data.value);
    },
    DelShoucang: function (productid, uid) {
        CommonRightControl.delShoucang(productid, uid, ShouCang.delShouCangCallBack);
    },
    delShouCangCallBack: function (data) {
        if (data.value > 0) {
            CommonRightControl.shoucangList(ShouCang.getShouCangListCallBack);
        }
    },
    PromotionToJson: function (productid) {
        //myArray = [];
        CommonRightControl.PromotionToJson(productid, function (data) {
            sp++;
            var json = eval("(" + data.value + ")");
            if (json.IsPromotionAction == "true") {
                var arr = json.Promotion;
                $.each(arr, function (i) {
                    if (arr[i].Title == "满 赠") {
                        $.each(model, function (k) {
                            if (model[k] != undefined && arr[i].Code.toString() == model[k].SkuId && model[k].Prices == 0) {
                                $("#Por" + productid).after("<dt><span><i>" + arr[i].Title + "</i></span>" + arr[i].Value + "</dt>");
                                //myArray.push(d[k].SkuId);
                                model.splice(k, 1);
                            }
                        });
                    } else if (arr[i].Title == "满 送") {
                        $.each(model, function (k) {
                            if (model[k] != undefined && arr[i].Code.toString() == model[k].SkuId && model[k].Prices == 0) {
                                $("#Por" + productid).after("<dt><span><i>" + arr[i].Title + "</i></span>" + arr[i].Value + "</dt>");
                                //myArray.push(d[k].SkuId);
                                model.splice(k, 1);
                            }
                        });
                    } else if (arr[i].Title == "单品限购") {
                        $("#Por" + productid).after("<dt><span><i>" + arr[i].Title + "</i></span>" + arr[i].Value + "</dt>");
                        $.each(model, function (k) {
                            if (model[k] != undefined && arr[i].Code.toString() < model[k].Num && model[k].SkuId == productid) {
                                $("#time" + productid).after("<p class=\"notice\">您选择的商品限量销售，请修改购买数量！</p>");
                            }
                        });
                    }
                    else if (arr[i].Title == "限 购") {
                        $("#Por" + productid).after("<dt><span><i>" + arr[i].Title + "</i></span>" + arr[i].Value + "</dt>");
                        $.each(model, function (k) {
                            if (model[k] != undefined && arr[i].Code.toString() < model[k].Num && model[k].SkuId == productid) {
                                $("#time" + productid).after("<p class=\"notice\">您选择的商品限量销售，请修改购买数量！</p>");
                            }
                        });
                    }
                    else {
                        $("#Por" + productid).after("<dt><span><i>" + arr[i].Title + "</i></span>" + arr[i].Value + "</dt>");
                        //$.each(d, function (k) {
                        //    if (arr[i].Code.toString() == d[k].SkuId && d[k].Prices == 0) {
                        //        $("#Por" + productid).after("<dt><span><i>" + arr[i].Title + "</i></span>" + arr[i].Value + "</dt>");
                        //    }
                        //});
                    }
                });
                // if (model.length > 0) {
                //     var htmlSubtotal = "";
                //     htmlSubtotal += "<i class=\"icon-zp\"></i>";
                //     htmlSubtotal += "<p>";
                //     $(model).each(function (i, j) {
                //         //if (j.Prices == 0 && $.inArray(j.SkuId, myArray) < 0) {
                //         if (j.Prices == 0 && j.Activity == 6) {
                //             htmlSubtotal += j.Name + " x" + j.Num + "<br>";
                //         }
                //     });
                //     htmlSubtotal += "</p>";
                //     $("#Subtotal").prepend(htmlSubtotal);
                // }
            }
            //if (myArray != null && myArray != "" && myArray != undefined) {
            //    $(d).each(function (i, j) {
            //        if (j.Prices == 0 && $.inArray(j.SkuId, myArray) < 0) {
            //            var l = j.SkuId;
            //        }
            //    });
            //}
            //排除营销规则以外的其他赠品   
            if (sp == sd) {
                if (model.length > 0) {
                    var htmlSubtotal = "";
                    htmlSubtotal += "<i class=\"icon-zp\"></i>";
                    htmlSubtotal += "<p>";
                    $(model).each(function (i, j) {
                        //if (j.Prices == 0 && $.inArray(j.SkuId, myArray) < 0) {
                        if (j.Prices == 0 && (j.Activity == 6 || j.Activity == 16)) {
							zengpingT = true;
                            htmlSubtotal += j.Name + " x" + j.Num + "<br>";
                        }
                    });
                    htmlSubtotal += "</p>";
					if (zengpingT)
                        $("#Subtotal").prepend(htmlSubtotal);
                }
            }
        });

    }

};
var zengpingT = false;
var model;
var sd = 0;
var sp = 0;
var myArray = new Array();
//加入购物车
var ShopCart = {
    //请求的域名
    newDomain: "http://shopping.zhongjiu.cn/open/",
    //读取购物车数据
    readShopCar: function () {
        //alert(0);
        $.ajax({
            type: "GET",
            async: false,
            url: ShopCart.newDomain + "sku.aspx?typId=0",
            dataType: "jsonp",
            jsonp: "callbackparam",
            success: function (json) {
                if (json != null && json != "") {
                    var ct = json[0];
                    ShopCart.buildTopProductList(ct);
                    ShopCart.buildRightProductList(ct);
                }
            }
        });
    },
    //添加商品到购物车
    AddShopCart: function (productcode) {
        $.ajax({
            type: "GET",
            async: false,
            url: "http://shopping.zhongjiu.cn/open/sku.aspx?typId=1&activeId=&skuid=" + productcode,
            dataType: "jsonp",
            jsonp: "callbackparam",
            success: function (josndata) {
                if (josndata != null && josndata != "" && josndata[0].CartCacheBaselist != null) {
                    ShopCart.buildTopProductList(josndata[0]);
                    ShopCart.buildRightProductList(josndata[0]);
                    alert("添加成功！");
                }
            },
            error: function () {
                ShopCart.readShopCar();
                alert("添加购物车失败！");
            }
        });
    },
    //删除购物车商品
    RemoveShopCar: function (code, activityId) {
        $.ajax({
            type: "GET",
            async: false,
            url: ShopCart.newDomain + "/sku.aspx?typId=2&skuId=" + code + "&activeId=" + activityId,
            dataType: "jsonp",
            jsonp: "callbackparam",
            jsonpCallback: "success_jsonpCallback2",
            success: function (json) {
                if (json != null && json != "") {
                    var ct = json[0];
                    ShopCart.buildTopProductList(ct);
                    ShopCart.buildRightProductList(ct);
                }
            }
        });
    },

    AddsShopCart: function (type, productcode) {
        var $Inp = $("#num input");
        var nums = parseInt($Inp.val());
        var iMaxNum = parseInt($("#maxNum").text());
		if (nums <= 0) {
            alert("请选购商品数量");
            return;
        }
        if (iMaxNum > 0) {
            if (nums > iMaxNum) {
                alert("每个ID限量" + iMaxNum + "套");
            } else {
                if (nums == 0) {
                    nums = 1;
                }
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "http://shopping.zhongjiu.cn/open/sku.aspx?typId=1&activeId=&skuid=" + productcode + "&num=" + nums,
                    dataType: "jsonp",
                    jsonp: "callbackparam",
                    success: function (josndata) {
                        if (josndata != null && josndata != "" && josndata[0].CartCacheBaselist != null) {
                            ShopCart.buildTopProductList(josndata[0]);
                            ShopCart.buildRightProductList(josndata[0]);
                            if (type == 0) {
                                alert("添加成功！");
                            } else {
                                window.location.href = "http://shopping.zhongjiu.cn/";
                            }
                        }
                    },
                    error: function () {
                        alert("添加购物车失败！");
                        ShopCart.readShopCar();
                    }
                });
            }
        }
    },

    //构建购物车右侧列表
    buildRightProductList: function (ct) {
        var data = ct.CartCacheBaselist;
        var cout = 0;
        var totalmoney = 0;
        var html = '';
        var totalHtml = "";
        if (data != null && data.length > 0) {
            $("#cartlistno").empty();
            $("#cartlistno").hide();
            $('#cartlist').empty();
            $("#total").empty();
            html += " <dl>";
            $(data).each(function (i, d) {

                //'d.price!=0' removed by fu,wenyu on 2014/11/05. confirmed with wang, xiaoming
                if (d.Activity != 8) {
                    cout += d.Num;
                    totalmoney += (d.Prices * d.Num);
                }
            });

            model = data;
            $(data).each(function (i, d) {
                if (d.Activity != 8 && d.Prices != 0) {
                    html += "<dd id=\"Por" + d.SkuId + "\">";
                    html += "<a href=\"" + d.SkuSrc + "\" target=\"_blank\"><img src=\"" + d.ImageSrc + "\" alt=\"" + d.Name + "\"/></a>";
                    html += "<h6><a href=\"" + d.SkuSrc + "\" target=\"_blank\" title=\"\">" + d.Name + "</a></h6>";
                    html += "<p id=\"time" + d.SkuId + "\"><a onclick=\"javascript:ShopCart.RemoveShopCar('" + d.SkuId + "','" + d.Activity + "');\" href=\"javascript:void(0)\" class=\"op-del\">删除</a><b>￥<em>" + d.Prices + "</em></b>x" + d.Num + "</p>";
                    //html += "<p class=\"notice\">您选择的商品限量销售，请修改购买数量！</p>";
                    html += "</dd>";
                    ShouCang.PromotionToJson(d.SkuId, data);
                    sd++;
                    //html += "<dt><span><i>满减</i></span>满199元减10元</dt>";
                }else if (d.Activity == 16 && d.Prices == 0) {
                    ShouCang.PromotionToJson(d.SkuId, data);
                    sd++;
                }
            });
            html += " <dt id='Subtotal'>小计:<b>￥" + totalmoney.toFixed(2) + "</b></dt>";
            html += "</dl>";
            totalHtml += "<ul class=\"clearfix\">";
            totalHtml += " <li>共计: <b>" + cout + "</b> 件商品</li>";
            totalHtml += "<li>总额：￥<b>" + ct.TotalPrices.toFixed(2) + "</b></li>";
            totalHtml += "<li>优惠：￥<b>" + ct.JianPrices.toFixed(2) + "</b> </li>";
            totalHtml += "<li>合计：￥<b>" + ct.PayPricesFree.toFixed(2) + "</b></li>";
            totalHtml += "</ul>";
            totalHtml += "<a href=\"http://shopping.zhongjiu.cn/\">去购物车结算</a>";
            $('#cartlist').append(html);
            $("#total").append(totalHtml);
            if ($("#OpenShopCar").children("span").length > 0) {
                $("#OpenShopCar").find("span").html("<i>" + cout + "</i>");
            } else {
                $("#OpenShopCar").prepend("<span><i>" + cout + "</i></span>");
            }
            $('#cartlist').show();
            $("#total").show();
            if ($("#OpenShopCar").children("span").length > 0) {
                $("#OpenShopCar").find("span").html("<i>" + cout + "</i>");
            } else {
                $("#OpenShopCar").prepend("<span><i>" + cout + "</i></span>");
            }
            //$('#cart_no').hide();
        } else {
            if ($("#OpenShopCar").children("span").length > 0) {
                $("#OpenShopCar").find("span").remove();
            }
            $('#cartlist').empty();
            $("#total").empty();
            $('#cartlistno').empty();
            var html = "";
            html += "<dl>";
            html += "<dd>";
            html += " 购物车是空的，<br />赶快去挑选心仪的商品吧~<br />";
            html += "<a href='http://mall.zhongjiu.cn/' target='_blank'>去首页看看</a>";
            html += "</dd>";
            html += "</dl>";
            $('#cartlistno').append(html);
            $('#cartlistno').show();
            $("#total").hide();
        }
    },
    //构建顶部购物车列表
    buildTopProductList: function (ct) {
        var data = ct.CartCacheBaselist;
        var cout = 0;
        var totalmoney = 0;
        var html = '';
        if (data != null && data.length > 0) {
            $(data).each(function (i, d) {
                // if (d.Activity != 8 && d.Prices != 0) {
                cout += d.Num;
                totalmoney += (d.Prices * d.Num);
                // }
            });
            html += "<dt><h3><i class='icon-car'></i><a title='' href='http://shopping.zhongjiu.cn' target='_blank'>我的购物车</a><span class='icon-count'><i id='countId'>" + cout + "</i></span><i class='arrow'></i></h3></dt>";
            html += " <dd class='shopCartWrap dd'> <div class='con'><h4 class='something'>最新加入的商品</h4><ul class='goods-list clearfix'>";
            $(data).each(function (i, d) {
                if (d.Activity != 8 && d.Prices != 0) {
                    html += "<li><p><a title='' href='" + d.SkuSrc + "' target='_blank'><img alt='" + d.Name + "' src='" + d.ImageSrc + "'/></a></p><div class='detail'><h5><a title='' href='" + d.SkuSrc + "' target='_blank'>" + d.Name + "</a></h5><p><em class='op' onclick=\"ShopCart.RemoveShopCar('" + d.SkuId + "','" + d.Activity + "')\">删除</em><em class='pr'>￥" + d.Prices + "</em>× " + d.Num + "</p></div></li>";
                } else {
                    html += "<li><p><a title='' href='" + d.SkuSrc + "' target='_blank'><img alt='" + d.Name + "' src='" + d.ImageSrc + "'/></a></p><div class='detail'><h5><a title='' href='" + d.SkuSrc + "' target='_blank'>" + d.Name + "</a></h5><p><em class='pr'>￥" + d.Prices + "</em>× " + d.Num + "</p></div></li>";
                }
            });
            html += "</ul>";
            html += "<p class='sum'>共<em class='highlight'>" + cout + "</em>件商品<em>共计</em><big class='highlight'>￥" + totalmoney + "</big></p><p class='go-acc clearfix'><a title='' href='http://shopping.zhongjiu.cn' target='_blank'>去购物车结算</a></p>";
            html += "</div></dd>";
            $('.shopcar').html(html);
        } else {
            $('.shopcar').html(" <dt><h3><i class='icon-car'></i><a title='' href='http://shopping.zhongjiu.cn' target='_blank'>我的购物车</a><span class='icon-count'><i id='countId'>0</i></span><i class='arrow'></i></h3> </dt><dd class='shopCartWrap dd'><div class='con'><h4 class='nothing'><i></i>购物车中还没有商品，赶紧选购吧！</h4></div></dd>");
        }
    }

};
//优惠券
var Coupon = {
    GetCouponList: function () {
        CommonRightControl.CouponList(Coupon.CouponListCallBack);
    },
    CouponListCallBack: function (data) {
        $(".cp-c").empty();
        $(".cp-c").append(data.value);
    }
};

$(document).ready(function () {
    ShopCart.readShopCar();
    $('#myStat').circliful();
});



