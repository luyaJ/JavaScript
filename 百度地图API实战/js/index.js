window.onload = function () {

    //tab切换
    var sidebar_filter = document.getElementById('sidebar-filter');
    var sidebar_hotel = document.getElementById('sidebar-hotel');
    var list = document.getElementById('list');
    var hotel = document.getElementById('hotel');
    var list_li = list.getElementsByTagName('li');
    var list_span = list.getElementsByTagName('span');

    //百度地图引用
    var map = new BMap.Map("map-cont",{enableMapClick:false});
    var point = new BMap.Point(116.404,39.915);
    map.centerAndZoom(point,15);
    map.enableScrollWheelZoom(true); //开启滚轮放大缩小
    var navigationControl = new BMap.NavigationControl();
    navigationControl.setAnchor(BMAP_ANCHOR_TOP_LEFT); //设置控件定位于地图的左上角
    navigationControl.setOffset(new BMap.Size(20,20));
    map.addControl(navigationControl);


    for(var i=0;i<list_li.length;i++){
        list_span[i].clicked = false;
        list_span[i].index = i;
        list_span[i].onclick = function(){
            var div = list_li[this.index].getElementsByTagName('div');
            if(this.clicked){
                div[0].style.display = 'none';
                this.clicked = false;
            } else {
                div[0].style.display = 'block';
                this.clicked = true;
            }
        }
    }
    sidebar_filter.onclick = function () {
        list.style.display = 'block';
        sidebar_filter.className = 'select';
        sidebar_hotel.className = '';
        hotel.style.display = 'none';
    };
    sidebar_hotel.onclick = function () {
        list.style.display = 'none';
        sidebar_hotel.className = 'select';
        sidebar_filter.className = '';
        hotel.style.display = 'block';
    };

    //js加载数据
    function insertData(err,hotelInfo){
        hotel.innerHTML = '';
        if(!err){
            var html = '';
            for(var i=0 ; i<hotelInfo.length ; i++){
                html += hotel_html.replace(/\{\{imgSrc\}\}/g,hotelInfo[i].img.big)
                    .replace(/\{\{name\}\}/g,hotelInfo[i].name)
                    .replace(/\{\{address\}\}/g,hotelInfo[i].address)
                    .replace(/\{\{price\}\}/g,'&yen;' + hotelInfo[i].price);
            }
            hotel.innerHTML = html;
        }
    }

    function addMarker(point){
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }

    var url = 'http://api.map.baidu.com/geosearch/v3/nearby?ak=BNeD8z3LaX3G2tTlO4PoR5HlsKRviy6B&geotable_id=135736&location=116.395884,39.932154&radius=100000'
    getHotelInfo(url,function (err,hotelInfo) {
        insertData(err,hotelInfo);
        if(!err){
            for(var i=0 ; i<hotelInfo.length ; i++){
                var point = new BMap.Point(hotelInfo[i].location[0],hotelInfo[i].location[1]);
                addMarker(point);
            }
        }
    });



}