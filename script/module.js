const ModuleName = 'calendar';
const ModuleDefaults = {
                dataSource: 
                [  // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
                    {
                        "guaranteed": true, // {boolean}
                        "date": "2016/12/15", // {string} YYYY/MM/DD
                        "price": "234567", // {string|number} XXXXXX | 近期上架
                        "availableVancancy": 0, // {number}
                        "totalVacnacy": 20, // {number}
                        "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
                    },
                    // ...
                ],
                // 輸入一開始要在哪一個月份 [string] YYYYMM，若輸入的年月沒有資料，
                // 就要找相近的年月，若前一個月後一個月都有資料，就顯示資料比數比較多的那一個月
                initYearMonth: '201705',
                // 設定各資料的key
                dataKeySetting: {
                    // 保證出團
                    'guaranteed': 'guaranteed',
                    // 狀態
                    'status': 'status',
                    // 可賣團位
                    'available': 'availableVancancy',
                    // 團位
                    'total': 'totalVacnacy',
                    // 價格
                    'price': 'price'
                },
                // 點上一個月時
                // @param $btn {$object} jquery 物件
                // @param $data {array} 上一個月的資料
                // @param module {object} 此模組實例物件
                onClickPrev: function( $btn, data, module ) {
                    console.log($btn, data, module);
                },
                // 點下一個月時
                onClickNext: function( $btn, data, module ) {
                    console.log($btn, data, module);
                },
                // 點日期時
                onClickDate: function( $date, data ){
                    console.log($date, data);
                }
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
        console.log(ModuleDefaults.dataSource)
        console.log('moduleIn!!!!');
        this.creatHtml();  
        this.getAjax();
        
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
                            '<div class="ntb_gpbt yellow">'+
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
                        '</div>'+
                        '<div class="calendars_weeksWrap">'+
                        '</div>';//要記得用"+"連起來呦
                        // '<ul class="calendars_daysWrap">'+
                        //     '<li class="calendars_days disabled">'+'</li>'+
                        //     '<li class="calendars_days hasData">'+
                        //         '<div class="date">'+
                        //             '<span class="num">'+'1'+'</span>'+
                        //             '<span class="weekday">'+'星期四'+'</span>'+
                        //         '</div>'+
                        //         '<span class="status">'+'候補'+'</span>'+
                        //         '<span class="sell">'+'可賣：0'+'</span>'+
                        //         '<span class="group">'+'團位：0'+'</span>'+
                        //         '<span class="tip">'+'<i class="ic-ln productreferf">'+'</i>'+'保證出團'+'</span>'+
                        //         '<span class="price">'+'$4,999'+'</span>'+
                        //     '</li>'+
                        //     '<li class="calendars_days hasData">'+
                        //         '<div class="date">'+
                        //             '<span class="num">'+'1'+'</span>'+
                        //             '<span class="weekday">'+'星期五'+'</span>'+
                        //         '</div>'+
                        //         '<span class="status">'+'候補'+'</span>'+
                        //         '<span class="sell">'+'可賣：0'+'</span>'+
                        //         '<span class="group">'+'團位：0'+'</span>'+
                        //         '<span class="tip">'+'<i class="ic-ln productreferf">'+'</i>'+'保證出團'+'</span>'+
                        //         '<span class="price">'+'$4,999'+'</span>'+
                        //     '</li>'+
                        // '</ul>';     
        $this.append(calendarHtml);                
        return this;
    }
    getAjax(){
        var self = this;
        var $this = this.$ele;//class="calendar"
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data4.json',
            }).done(function(dataSource) {
                // alert(dataSource[0]);
                dataSource = dataSource.sort(function (a, b) {
                 return a.date > b.date ? 1 : -1;
                });//將dataSource按照日期排序,由前至後(2016年開始);
                self.creatCalendar(dataSource);
                console.log(dataSource);
                var NumOfJData = dataSource.length;
                console.log(NumOfJData);
            });
        return this;
    }
    creatCalendar(dataSource){
        var self = this;
        var $this = this.$ele;//class="calendar"
        var calendarHtml='<table class="weekTable">'+
                                '<thead>'+
                                    '<tr class="week">'+
                                        '<th>'+'星期日'+'</th>'+
                                        '<th>'+'星期一'+'</th>'+
                                        '<th>'+'星期二'+'</th>'+
                                        '<th>'+'星期三'+'</th>'+
                                        '<th>'+'星期四'+'</th>'+
                                        '<th>'+'星期五'+'</th>'+
                                        '<th>'+'星期六'+'</th>'+
                                    '</tr>'+
                                '</thead>'+
                                '<tbody>'+
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+dataSource[0].date+'</div>'+//將Ajax抓的data(dataSource)作為參數傳入
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+dataSource[1].date+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+dataSource[2].date+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                    '</tr>'+  
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                    '</tr>'+  
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                    '</tr>'+
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                    '</tr>'+      
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth">'+'</div>'+
                                        '</td>'+
                                    '</tr>'+            
                                '</tbody>'+
                            '</table>';
            $this.find('.calendars_weeksWrap').append(calendarHtml);                
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