const ModuleName = 'calendar';
const ModuleDefaults = {
    
};
const ModuleReturns = ['output', 'methods'];

class Module {
    constructor(ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
    }
    init() {
        var self = this;
        var $this = this.$ele;
        var opts = this.option;

        console.log('moduleIn!!!!');
        this.creatHtml();  
        // this.getAjax();
        
        return this;
    }

    methods() {
        return this;
    }

    calendar() {
        return this;
    }
    creatHtml(){
        var self = this;
        var $this = this.$ele;//class="calendar"
        var calendarHtml='<div class="calendars_tabWrap">'+
                            '<a href="#" class="prev on">'+'</a>'+
                            '<ul class="ntb_tab">'+
                               '<li class="tab">'+
                                   '<a href="#">'+'<span>'+'2017 7月'+'</span>'+'</a>'+
                               '</li>'+            
                               '<li class="tab">'+
                                   '<a href="#">'+'<span>'+'2017 8月'+'</span>'+'</a>'+
                               '</li>'+
                               '<li class="tab">'+
                                   '<a href="#">'+'<span>'+'2017 9月'+'</span>'+'</a>'+
                               '</li>'+                                                
                            '</ul>'+
                            '<a href="#" class="next on">'+'</a>'+
                        '</div>'+
                        '<div class="calendars_weeksWrap">'+
                            '<th>'+'星期日'+'</th>'+
                            '<th>'+'星期一'+'</th>'+
                            '<th>'+'星期二'+'</th>'+
                            '<th>'+'星期三'+'</th>'+
                            '<th>'+'星期四'+'</th>'+
                            '<th>'+'星期五'+'</th>'+
                            '<th>'+'星期六'+'</th>'+
                        '</div>'+
                        '<ul class="calendars_daysWrap">'+
                            '<li class="calendars_days disabled">'+'</li>'+
                            '<li class="calendars_days hasData">'+
                                '<div class="date">'+
                                    '<span class="num">'+'1'+'</span>'+
                                    '<span class="weekday">'+'星期四'+'</span>'+
                                '</div>'+
                                '<span class="status">'+'候補'+'</span>'+
                                '<span class="sell">'+'可賣：0'+'</span>'+
                                '<span class="group">'+'團位：0'+'</span>'+
                                '<span class="tip">'+'<i class="ic-ln productreferf">'+'</i>'+'保證出團'+'</span>'+
                                '<span class="price">'+'$4,999'+'</span>'+
                            '</li>'+
                            '<li class="calendars_days hasData">'+
                                '<div class="date">'+
                                    '<span class="num">'+'1'+'</span>'+
                                    '<span class="weekday">'+'星期五'+'</span>'+
                                '</div>'+
                                '<span class="status">'+'候補'+'</span>'+
                                '<span class="sell">'+'可賣：0'+'</span>'+
                                '<span class="group">'+'團位：0'+'</span>'+
                                '<span class="tip">'+'<i class="ic-ln productreferf">'+'</i>'+'保證出團'+'</span>'+
                                '<span class="price">'+'$4,999'+'</span>'+
                            '</li>'+
                        '</ul>';
                     
        $this.append(calendarHtml);                
        return this;
    }
    getAjax(){
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data4.json',
            }).done(function( dataSource ) {
                // alert(dataSource[0]);
                console.log(dataSource);
                var NumOfJData = dataSource.length;
                console.log(NumOfJData);
                var i = 0;
                 $.each(dataSource, function() {
                $("#JSON_table").append("<tr>" +
                                        "<td>" + dataSource[i].date   + "</td>" +
                                        "<td>" + dataSource[i].price   + "</td>" +
                                        "<td>" + dataSource[i].status   + "</td>" +
                                        "<td><p>總人數:" + dataSource[i].totalVacnacy   + "</p></td>" +
                                        "<td><p>剩餘人數:" + dataSource[i].availableVancancy   + "</p></td>" +
                                        "</tr>");
                i++;
              });
            });
        return this;
    }

    // 下一個有資料的月份
    nextMonth(){
        return this;
    }

    // 上一個有資料的月份
    prevMonth(){
        return this;
    }

    // 切換日曆或列表模式
    switch(){
        return this;
    }

    // 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份
    inputData(){
        return this;
    }

    // 重設資料時，月曆、tab重新產出
    resetData(){
        return this;
    }

    // destroy calendar，destroy時連class new出來的實例物件也要刪除
    destroy(){
        return this;
    }  
};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };