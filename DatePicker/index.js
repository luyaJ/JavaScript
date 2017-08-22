(function () {
    var datepicker = {};

    datepicker.getMonthDate = function(year,month) {
        var ret = []; //当前月份的日期

        if(!year || !month){ //如果没有传年份或者月份，就获取当前日期
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        var firstDay = new Date(year,month-1,1); //当月第一天
        var firstDayWeekDay = firstDay.getDay(); //判断firstDay是周几
        if(firstDayWeekDay === 0) firstDayWeekDay = 7; //如果是周日，赋予7

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year,month-1,0); //上一个月的最后一天(数值越界，当月的第0天，即为上月的最后一天)
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); //保存上月最后一天的日期

        var preMonthDayCount = firstDayWeekDay - 1; //当月的第一天如果是周一，就不用显示上月的日期；当月的第一天如果是周二，则要显示一个上月的日期；如果是周日，就显示6个。

        var lastDay = new Date(year,month,0); //本月最后一天
        var lastDate = lastDay.getDate(); //保存本月最后一天

        //获取当月日期
        for(var i=0 ; i<7*6 ; i++){ //获取当月的每一天
            var date = i - preMonthDayCount + 1; //比如有一个上个月的数据，则2号，i=2
            var showDate = date; //应该显示哪一天
            var thisMonth = month; //显示当月
            //如果是上一月
            if(date <= 0){
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if(date > lastDate){
                //下一月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }
            //如果month为一月
            if(thisMonth === 0) thisMonth = 12;
            if(thisMonth === 13) thisMonth = 1;

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }
        return {
            year: year,
            month: month,
            days: ret
        };
    };

    window.datepicker = datepicker;

})();