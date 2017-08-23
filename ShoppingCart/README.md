## 购物车

笔记。

### table对象集合

* `rows[]` -- 返回包含表格中所有行的一个数组。

```js
var tr = cartTable.children[1].rows; //获得cartTable下的tbody下的所有行tr
```

* `cells[]` -- 返回包含表格中所有单元格的一个数组。

```js
price += parseFloat(tr[i].cells[4].innerHTML); //获得tr下的第五个td
```

### Number对象

`toFixed()` 方法可把 `Number` 四舍五入为指定小数位数的数字。

```js
priceTotal.innerHTML = price.toFixed(2);  //这里四舍五入为两位小数
```

### String对象

`indexOf()` 方法可返回某个指定的字符串值在字符串中首次出现的位置。(返回0,1,2...-1)

```js
if(els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0){
```

### 事件 ie兼容

```js
e = e || window.event;
```