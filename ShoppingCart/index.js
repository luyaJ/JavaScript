window.onload = function () {
    //兼容低版本IE
    if(document.getElementsByClassName){
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName("*");
            for(var i=0 ; i<els.length ; i++){
                if(els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0){
                    //'aaa' , 'aaa bbb' , 'ccc aaa bbb' , 'bbb aaa' 前后有空格的方式也要考虑进去
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }
    var cartTable = document.getElementById('cartTable');
    var tr = cartTable.children[1].rows; //获得cartTable下的tbody下的所有行tr
    var checkInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all');
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    
    var selected = document.getElementById('selected'); //已选商品
    var foot = document.getElementById('foot');
    var selectedViewList = document.getElementById('selectedViewList');

    var deleteAll = document.getElementById('deleteAll');


    //计算
    function getTotal() {
        var selected = 0;
        var price = 0;
        var HTMLstr = " "; //字符串的累加和拼接

        for(var i = 0 ; i < tr.length ; i++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
                tr[i].className = 'on';
                HTMLstr += '<div><img src="'+ tr[i].getElementsByTagName('img')[0].src +'"/><span class="del" index="' + i + '">取消选择</span></div>';
            } else {
                tr[i].className = '';
            }
        }
        selectedTotal.innerHTML = selected;
        priceTotal.innerHTML = price.toFixed(2);
        selectedViewList.innerHTML = HTMLstr;

        if(selected == 0){
            foot.className = 'foot';
        }
    }

    //小计
    function getSubTotal(tr) {
        var tds = tr.cells;
        var price = parseFloat(tds[2].innerHTML);
        var count =  parseFloat(tr.getElementsByTagName('input')[1].value);
        var SubTotal = parseFloat(price * count);
        tds[4].innerHTML = SubTotal.toFixed(2);
    }

    //遍历所有的checkbox
    for(var i = 0 ; i < checkInputs.length ; i++){
        checkInputs[i].onclick = function () {
            if(this.className === 'check-all check'){ //如果点击全选
                for(var j = 0 ; j < checkInputs.length ; j++){
                    checkInputs[j].checked = this.checked;
                }
            }
            if(this.checked == false){ //如果有一个没有勾选上
                for(var k = 0 ; k < checkAllInputs.length ; k++){
                    checkAllInputs[k].checked = false;
                }
            }
            getTotal(); //每次勾选一个复选框，就调用一次
        }
    }
    
    //商品预览浮层
    selected.onclick = function () {
        if(foot.className == 'foot'){
            if(selectedTotal.innerHTML != 0){
                foot.className = 'foot show';
            }
        } else {
            foot.className = 'foot';
        }
    }

    //取消选择和事件代理
    selectedViewList.onclick = function (e) {
        e = e || window.event; //兼容ie
        var el = e.srcElement; //通过console.log(e)看
        if(el.className == 'del'){
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
        }
    }

    //增减商品数量
    for(var i = 0 ; i < tr.length ; i++){
        tr[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            var cls = el.className;
            var input = this.getElementsByTagName('input')[1];
            var val = parseInt(input.value);
            var reduce = this.getElementsByTagName('span')[1];
            switch (cls){
                case 'add':
                    input.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if(val > 1){
                        input.value = val - 1;
                    }
                    if(input.value <= 1){
                        reduce.innerHTML = '';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定要删除嘛？');
                    if(conf){
                        this.parentNode.removeChild(this); //删掉自己这一行
                    }
                    break;
                default:
                    break;
            }
            getTotal();
        }

        //input
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value); //保证得到的一定是一个数字
            var tr = this.parentNode.parentNode;
            var reduce = tr.getElementsByTagName('span')[1];
            if(isNaN(val) || val < 1){
                val = 1;
            }
            this.value = val;
            if(val <= 1){
                reduce.innerHTML = '';
            } else {
                reduce.innerHTML = '-';
            }
            getSubTotal(tr);
            getTotal();
        }
    }
    
    //删除所有商品行
    deleteAll.onclick = function () {
        if(selectedTotal.innerHTML != '0'){
            var conf = confirm('确定要删除嘛？');
            if(conf){
                for(var i = 0 ; i < tr.length ; i++){
                    var input = tr[i].getElementsByTagName('input')[0];
                    if(input.checked){
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        }
    }

    //页面一进去，商品默认全选
    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();
}