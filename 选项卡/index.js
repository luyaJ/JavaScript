window.onload = function init() {
    var li = document.getElementsByTagName("li");
    var img = document.getElementsByTagName("img");
    var i;

    for(i=0;i<li.length;i++){
        li[i].index = i;  //i=0,1,2,3
        li[i].onclick = function () {
            for(i=0;i<li.length;i++){
                li[i].className = '';
                img[i].style.display = 'none';
            }
            li[this.index].className = 'on';
            img[this.index].style.display = 'block';
        }
    }
}
