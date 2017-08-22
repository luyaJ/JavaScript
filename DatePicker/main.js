(function () {
    var datepicker = window.datepicker;
    var monthDate;
    var $wrapper;

    //渲染函数
    datepicker.buildUI = function(year,month) {
        monthDate = datepicker.getMonthDate(year,month);

        var html = '<div class="ui-header">' +
            '<a href="#" class="ui-btn ui-prev-btn">&lt;</a>' +
            '<a href="#" class="ui-btn ui-next-btn">&gt;</a>' +
            '<span class="ui-curr-month">' +
                monthDate.year + '-' +
                monthDate.month + '</span>' +
            '</span>' +
        '</div>' +
        '<div class="ui-body">' +
             '<table>' +
                 '<thead>' +
                    '<tr>' +
                        '<th>一</th>' +
                        '<th>二</th>' +
                        '<th>三</th>' +
                        '<th>四</th>' +
                        '<th>五</th>' +
                        '<th>六</th>' +
                        '<th>日</th>' +
                    '</tr>' +
                 '</thead>' +
                 '<tbody>';

                    for(var i=0 ; i<monthDate.days.length ; i++){
                        var date = monthDate.days[i];
                        if(i%7 === 0){
                            html += '<tr>'; //每周第一天
                        }
                        html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
                        if(i%7 === 6){
                            html += '</tr>'; //每周最后一天
                        }
                    }
                    html += '</tbody>' +
             '</table>'+
        '</div>';
        return html;
    };

    datepicker.render = function(direction) {
        var year,month;
        if(monthDate){
            year = monthDate.year;
            month = monthDate.month;
        }

        if(direction === 'prev'){
            month--;
            if(month === 0){
                month = 12;
                year--;
            }
        }
        if(direction === 'next'){
            if(month === 12 && year === (new Date()).getFullYear()){
                return;
            }
            month++;
        }

        var html = datepicker.buildUI(year,month);
        $wrapper = document.querySelector('ui-wrapper');
        if(!$wrapper){
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-wrapper';
        }
        $wrapper.innerHTML = html;

    };

    //初始化函数
    datepicker.init = function(input) {
        datepicker.render();

        var $input = document.querySelector(input);
        var isOpen = false;

        $input.addEventListener('click',function () {
            if(isOpen){
                $wrapper.classList.remove('ui-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-wrapper-show');
                //相对 输入框 绝对定位
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 5 + 'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        },false);

        $wrapper.addEventListener('click',function (e) {
            var $target = e.target;
            if(!$target.classList.contains('ui-btn'))
                return;
            //上一月
            if($target.classList.contains('ui-prev-btn')){
                datepicker.render('prev');
            } else if($target.classList.contains('ui-next-btn')){
                datepicker.render('next');
            }

        },false);

        $wrapper.addEventListener('click',function (e) {
            var $target = e.target;
            if($target.tagName.toLowerCase() !== 'td') return;

            var date = new Date(monthDate.year,monthDate.month - 1,$target.dataset.date);

            $input.value = format(date);
            //点击一个日期时，输入框显示时间，并把日历收起来
            $wrapper.classList.remove('ui-wrapper-show');
            isOpen = false;

        },false);

    };


    function format(date) {
        ret = '';

        var padding = function(num) {
            if (num <= 9) {
                return '0' + num;
            } else{
                return num;
            }

        }
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }

})();