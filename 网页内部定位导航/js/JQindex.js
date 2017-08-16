$(document).ready(function () {
   $(window).scroll(function () {
       var top = $(document).scrollTop();
       var menu = $("#menu");
       var items = $("#content").find(".item");

       var currentId = ""; //当前所在的楼层id
       items.each(function () {
           var m = $(this);
           var itemTop = m.offset().top;
           if(top > (itemTop-200)){
                currentId = "#" + m.attr("id");
           } else {
               return false; //跳出each
           }

           var currentLink = menu.find(".on");
           if(currentId && currentLink.attr("href") != currentId){
               currentLink.removeClass('on');
               menu.find("[href=" + currentId +"]").addClass('on');
           }
       });
   });
});