var prvtype = "good";
var detail = {
    bindData: function (Type, ProductId, PageIndex, PageSize) {
        prvtype = Type;
        ProductDetailControl.GetCommentList(ProductId, Type, PageIndex, PageSize, detail.bindDataCallBack);
    },
    bindDataCallBack: function (data) {
        if (data.value != '') {
            var dValue = eval('(' + data.value + ')');
            if (dValue.DataListStr != "") {
                if (prvtype == "all") {
                    $.each($("ul[attr='ulall']"), function (i, d) {
                        d.innerHTML = dValue.DataListStr;
                    });
                    //$("#ulall").html(dValue.DataListStr);
                }
                if (prvtype == "good") {
                    $.each($("ul[attr='ulgood']"), function (i, d) {
                        d.innerHTML = dValue.DataListStr;
                    });
                    //$("#ulgood").html(dValue.DataListStr);
                }
                if (prvtype == "average") {
                    $.each($("ul[attr='ulaverage']"), function (i, d) {
                        d.innerHTML = dValue.DataListStr;
                    });
                    //$("#ulaverage").html(dValue.DataListStr);
                }
                if (prvtype == "badreview") {
                    $.each($("ul[attr='ulbadreview']"), function (i, d) {
                        d.innerHTML = dValue.DataListStr;
                    });
                    //$("#ulbadreview").html(dValue.DataListStr);
                }
            }
            if (dValue.DataPageStr != "") {
                $('div[class="page clearfix"]').html(dValue.DataPageStr);
            }
        }

    }
};
