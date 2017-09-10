![百度地图开发指南](http://lbsyun.baidu.com/index.php?title=jspopular/guide/introduction)

## 创建地图实例：

1. 引用百度地图API文件

```
src="http://api.map.baidu.com/api?v=2.0&ak=密钥"
```

2. 创建地图实例

```js
var map = new BMap.Map("container");
```

3. 创建点坐标

```js
var point = new BMap.Point(116.404,39.915); //116.404表示经度，39.915表示纬度
```

4. 地图初始化

```js
map.centerAndZoom(point,15);
```

在创建地图实例后，我们需要对其进行初始化，BMap.Map.centerAndZoom()方法要求设置中心点坐标和地图级别。 地图必须经过初始化才可以执行其他操作。

5. 地图配置与操作

下面示例显示一个地图，等待两秒钟后，它会移动到新中心点。panTo()方法将让地图平滑移动至新中心点，如果移动距离超过了当前地图区域大小，则地图会直跳到该点。

```js
var map = new BMap.Map("container");
var point = new BMap.Point(116.404,39.915);
map.centerAndZoom(point,15);
window.setTimeout(function(){
    map.panTo(new BMap.Point(116.409,39.918));
},2000);
```

## 控件

* 平移缩放控件 --NavigationControl(PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。)
* 缩略地图控件 --OverviewMapControl(默认位于地图右下方，是一个可折叠的缩略地图。)
* 比例尺控件 --ScaleControl(默认位于地图左下方，显示地图的比例关系。)
* 版权控件 --CopyrightControl(默认位于地图左下方。)
* 定位控件 --GeolocationControl(针对移动端开发，默认位于地图左下方。)

### 向地图添加控件

使用`Map.addControl()`方法向地图添加控件

```js
var map = new BMap.Map("container");
map.centerAndZoom(new BMap.Point(116.404,39.915),11);
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.MapTypeControl());
map.setCurrentCity("北京"); //仅当设置城市信息时，MapTypeControl的切换功能才能可用
```

### 控制控件位置

`anchor`表示控件的停靠在地图的哪个角，允许值：

* BMAP_ANCHOR_TOP_LEFT 表示控件定位于地图的左上角
* BMAP_ANCHOR_TOP_RIGHT
* BMAP_ANCHOR_BOTTOM_LEFT
* BMAP_ANCHOR_BOTTOM_RIGHT

`offset`表示控件位置的偏移:

```js
var navigationControl = new BMap.NavigationControl();
navigationControl.setAnchor(BMAP_ANCHOR_TOP_LEFT); //设置控件定位于地图的左上角
navigationControl.setOffset(new BMap.Size(20,20));
map.addControl(navigationControl);
```

### 修改控件配置

NavigationControl控件就提供了如下类型：
* BMAP_NAVIGATION_CONTROL_LARGE 表示显示完整的平移缩放控件。
* BMAP_NAVIGATION_CONTROL_SMALL 表示显示小型的平移缩放控件。
* BMAP_NAVIGATION_CONTROL_PAN 表示只显示控件的平移部分功能。
* BMAP_NAVIGATION_CONTROL_ZOOM 表示只显示控件的缩放部分功能。

```js
var opts = {type: BMap_NAVIGATION_CONTROL_SMALL}
map.addControl(new BMap.NavigationControl(opts));
```