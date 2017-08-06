window.onload = function () {
    var box = document.getElementById('box');
    var oSpan = document.getElementsByClassName('span')[0];
    var list = box.getElementsByClassName('list')[0];  //这两处都需要用[0]
    var li = document.getElementsByTagName('li');

    oSpan.onclick = function (e) {
        //阻止冒泡
        e = e || event;
        if(e.stopPropagation()){
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE
        }
        oSpan.className = 'spanAdd';
        list.style.display = 'block';
    }
    for(var i=0;i<li.length;i++){
        li[i].onclick = function () {
            oSpan.innerHTML = this.innerHTML + '<i></i>';
        }
    }
    //点击box以外的部分，ul隐藏，文字和三角恢复默认样式
    document.onclick = function () {
        this.getElementsByTagName('span')[0].className = 'span';
        list.style.display = 'none';
    }
}