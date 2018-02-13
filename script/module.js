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
        // console.log(ModuleDefaults.dataSource);
        console.log('moduleIn!!!!');
        this.creatHtml();
        this.getAjax();
        this.showMonthDate();

        var nowYear=parseInt($(".currentMonth").attr('data-label').substring(0, 4));//抓取currentMonth所代表的年分
        var nowMonth=parseInt($(".currentMonth").attr('data-label').substring(4, 10));//抓取currentMonth所代表的月份
        console.log(nowYear);
        console.log(nowMonth);
        
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
                                '</ul>'+
                                '<a href="#" class="next on">'+'</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="calendars_weeksWrap">'+
                        '</div>';//要記得用"+"連起來呦    
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
                self.creatCalendarDay(dataSource);
                self.bornCalendar(dataSource);
                var NumOfJData = dataSource.length;
                // for (var i = 0; i < NumOfJData; i++) {
                //     console.log(dataSource[i].date);
                // };  //所有資料的日期都跑一次
                console.log(NumOfJData);
                console.log(dataSource[0]);
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
                            '</table>';
            $this.find('.calendars_weeksWrap').append(calendarHtml);               
            return this;
    }
    showMonthDate(){
        var self = this;
        var $this = this.$ele;//class="calendar"
        var goMonth =1;
        for (var i = 0 ;i <= 2 ; i++ ){
                var nextMonthMo=moment().add(i, 'months').format("YYYY MMM");
                console.log(nextMonthMo);
                var monthsTitle= '<li class="tab">'+
                                   '<a href="#" class="'+moment().add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment().add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                 '</li>';              
                $this.find('.ntb_tab').append(monthsTitle);
                $(".tab:nth-child(1) a").addClass('currentMonth');
                // $(".tab:nth-child(1) a").attr('id','currentMonth');
                // self.monthSelect();
                // self.getNowMonth();
        };
        self.monthSelect();
        // //小箭頭跳currentMonth
        $('.next').on('click', function() {         
            if($(".tab:nth-child(3) a").hasClass('currentMonth')===false){
            $this.find('.currentMonth').parent().next().children().addClass('currentMonth');
            $this.find('.currentMonth').parent().prev().children().removeClass('currentMonth');
                self.monthSelect();
                self.getNowMonth();
                self.bornCalendar(); 
                }else {
                // var goMonth =Math.abs(parseInt($('.currentMonth').attr('data-label'))-201801);
                $this.find('.ntb_tab').empty();
                $(".tab a").removeClass('currentMonth');
                for (var i = goMonth ;i <= goMonth  + 2 ; i++ ){
                    var nextMonthMo=moment().add(i, 'months').format("YYYY MMM");
                    console.log(nextMonthMo);
                    var monthsTitle= '<li class="tab">'+
                                       '<a href="#" class="'+moment().add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment().add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                     '</li>';
                    $this.find('.ntb_tab').append(monthsTitle);
                    $(".tab a").attr('id','');
                    $(".tab:nth-child(1) a").addClass('currentMonth');              
                };
                self.monthSelect();
                self.getNowMonth();
                self.bornCalendar();
                console.log(goMonth);
                };
                goMonth++;
                console.log($('.currentMonth').attr('data-label'));
        });//小箭頭跳currentMonth


        $('.prev').on('click', function() {
            if($(".tab:nth-child(1) a").hasClass('currentMonth')!==true){
                $this.find('.currentMonth').parent().prev().children().addClass('currentMonth');
                $this.find('.currentMonth').parent().next().children().removeClass('currentMonth');
                self.monthSelect();
                self.getNowMonth();
                self.bornCalendar(); 
            }else{
                // var goMonth =Math.abs(parseInt($('.currentMonth').attr('data-label'))-201801);
                $this.find('.ntb_tab').empty();
                $(".tab a").removeClass('currentMonth');
                for (var i = (goMonth-2) ;i <= (goMonth-2) + 2 ; i++ ){
                    var nextMonthMo=moment().add(i, 'months').format("YYYY MMM");
                    // console.log(nextMonthMo);
                    var monthsTitle='<li class="tab">'+
                                       '<a href="#" class="'+moment().add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment().add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                    '</li>';
                     $this.find('.ntb_tab').append(monthsTitle);
                     $(".tab a").attr('id','');
                     // $(".tab:nth-child(1) a").attr('id','currentMonth');
                     $(".tab:nth-child(1) a").addClass('currentMonth');                 
                };
             
                self.monthSelect();
                self.getNowMonth();
                self.bornCalendar();
                console.log(goMonth);
                // return this;
            }
            goMonth--;
            console.log($('.currentMonth').attr('data-label'));
        });//小箭頭跳currentMonth        

        // 小箭頭跳currentMonth


        // 小箭頭跳頁click
        // $('.next').on('click', function() {   
        //         $this.find('.ntb_tab').empty();
        //         $(".tab a").removeClass('currentMonth');
        //         for (var i = goMonth ;i <= goMonth + 2 ; i++ ){
        //             var nextMonthMo=moment().add(i, 'months').format("YYYY MMM");
        //             console.log(nextMonthMo);
        //             var monthsTitle= '<li class="tab">'+
        //                                '<a href="#" class="'+moment().add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment().add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
        //                              '</li>';
        //             $this.find('.ntb_tab').append(monthsTitle);
        //             $(".tab a").attr('id','');
        //             // $(".tab:nth-child("+(goMonth+1)+") a").attr('id','currentMonth');
        //             // $(".tab:nth-child("+(goMonth+1)+") a").addClass('currentMonth'); 
        //             // $(".tab:nth-child(1) a").attr('id','currentMonth');
        //             $(".tab:nth-child(1) a").addClass('currentMonth');              
        //         };
        //         goMonth++; 
        //         self.monthSelect();
        //         self.getNowMonth();
        //         self.bornCalendar();
            
        // });//顯示下個月的title
        // $('.prev').on('click', function() {
        //         $this.find('.ntb_tab').empty();
        //         $(".tab a").removeClass('currentMonth');
        //         for (var i = goMonth-2 ;i <= (goMonth-2) + 2 ; i++ ){
        //             var nextMonthMo=moment().add(i, 'months').format("YYYY MMM");
        //             // console.log(nextMonthMo);

        //             var monthsTitle='<li class="tab">'+
        //                                '<a href="#" class="'+moment().add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment().add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
        //                             '</li>';
        //              $this.find('.ntb_tab').append(monthsTitle);
        //              $(".tab a").attr('id','');
        //              // $(".tab:nth-child(1) a").attr('id','currentMonth');
        //              $(".tab:nth-child(1) a").addClass('currentMonth');                 
        //         };
        //         goMonth--;
        //         self.monthSelect();
        //         self.getNowMonth();
        //         self.bornCalendar();
        // });
        // 顯示上個月的title
        // 小箭頭跳頁click
        return this;
    }

    monthSelect(){
        var self = this;
        var $this = this.$ele;//class="calendar"
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data4.json',
            }).done(function(dataSource) {
            $this.find('.tab a').on('click', function() {
            $this.find('.tab a').removeClass('currentMonth');
            $(this).addClass('currentMonth');
            var nowMonth=$(".currentMonth").textContent;
            // console.log('現在是'+nowMonth);
            // self.getNowMonth();
            // console.log(dataSource[0]);
            self.bornCalendar(dataSource);
        });
    });
        
        return this; 
    }
    getNowMonth(){
        // var self = this;
        // var $this = this.$ele;//class="calendar"
        // var nowYear=parseInt($(".currentMonth").attr('data-label').substring(0, 4));//抓取currentMonth所代表的年分
        // var nowMonth=parseInt($(".currentMonth").attr('data-label').substring(4, 10));//抓取currentMonth所代表的月份
        // // // console.log(nowYear);
        // // // console.log(nowMonth);
    }
    creatCalendarDay(dataSource){
        var self = this;
        var $this = this.$ele;//class="calendar"
        var calendarDayHtml= '<tbody id="mainCalendar">'+
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth" >'+'</div>'+//將Ajax抓的data(dataSource)作為參數傳入
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '</td>'+
                                    '</tr>'+          
                                '</tbody>';
        $('.weekTable').append(calendarDayHtml);
        // console.log(moment().add(1, 'days').format("D"));
        // self.bornCalendar(dataSource);
                
        return this;
    }
  


    bornCalendar(dataSource){
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data4.json',
            }).done(function(dataSource) {
            dataSource = dataSource.sort(function (a, b) {
                 return a.date > b.date ? 1 : -1;//資料依照日期排序       
            });//將dataSource按照日期排序,由前至後(2016年開始)
            
            //篩選日期重複的資料!!!!!!!!!!!!!!!
                var lookup = {};
                var items = dataSource;
                    var dataSource = [];

                    for (var item, i = 0; item = items[i++];) {
                      var date = item.date;

                      if (!(date in lookup)) {
                        lookup[date] = 1;
                        dataSource.push(item);
                    }
                }
                // console.log(dataSource);
            //篩選日期重複的資料!!!!!!!!!!!!!!!
                     
            var self = this;
            var $this = this.$ele;//class="calendar"
            var today = new Date();
            // var year = today.getFullYear();      //本年
            // var month = today.getMonth() + 1;    //本月
            var year = parseInt($(".currentMonth").attr('data-label').substring(0, 4));      //本年 抓取currentMonth所代表的年分
            var month =parseInt($(".currentMonth").attr('data-label').substring(4, 10));    //本月 抓取currentMonth所代表的月份
            var day = today.getDate();           //本日
            //本月第一天是星期几（距星期日离开的天数）
            var startDay = new Date(year, month - 1, 1).getDay();
            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
            var nDays = new Date(year, month, 0).getDate();
            //开始画日历
            var numRow = 0;  //记录行的个数，到达7的时候创建tr
            var i;        //日期
            var html = '';
            html += '<table id="Body"><tbody>';
            //第一行
            html += '<tr>';
            for (i = 0; i < startDay; i++) {
                html += '<td class="disabled"></td>';
                numRow++;
            };     
            for (var j = 1; j < 37 ; j++) {
                //為什麼是37啊!!!!!!!!!!!!!!!!!
                //如果是今天则显示红色
                if (j == day) {
                    html += '<td class="currentDays '+year+'0'+month+'0'+j+'" date="'+year+month+j+'">';
                    html += j;    //开始加日期
                }
                else if( j!==day && j<= nDays) {
                    if(j<10 && month<10){
                        html += '<td class="currentDays '+year+'0'+month+'0'+j+'" date="'+year+'0'+month+'0'+j+'">';
                        html += j;
                    }else if(j>=10 && month<10){
                        html += '<td class="currentDays '+year+'0'+month+j+'" date="'+year+month+j+'">';
                        html += j;
                    }else if(j<10 && month>=10){
                        html += '<td class="currentDays '+year+month+'0'+j+'" date="'+year+month+j+'">';
                        html += j;
                    }else{
                        html += '<td class="currentDays '+year+month+j+'" date="'+year+month+j+'">';
                        html += j;
                    }    //开始加日期
                }else{
                    html += '<td class="disabled">';
                }
                html += '</td>';
                numRow++;
                if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                    numRow = 0;
                    html += '</tr><tr>';
                }
            };
            html += '</tbody></table>';
            document.getElementById("mainCalendar").innerHTML = html;
            
            var NumOfJData = dataSource.length;
            for (i=0; i<NumOfJData; i++){
                var self = this;
                var $this = this.$ele;
                // var $smallBox = $this.find(".content_box2");
                var dataYear= dataSource[i].date.substring(0,4);
                var dataMonth= dataSource[i].date.substring(5,7);
                var dataDay= dataSource[i].date.substring(8,10);
                var dataDate=parseInt(dataYear + dataMonth + dataDay);
                var calendarDays=parseInt($('.currentDays').attr('date'));
                if($('.currentDays').hasClass(dataDate)){
                    // var self = this;
                    // var $this = this.$ele;
                    var dataPrice="<p class='price'>"+"$"+dataSource[i].price+"起"+"</p>";
                    var dataStatus="<p class='dataStatus'>"+dataSource[i].status+"</p>";
                    var dataAvailable="<p>"+"可賣:"+dataSource[i].availableVancancy+"</p>";
                    var dataTotal="<p>"+"團位:"+dataSource[i].totalVacnacy+"</p>";
                    $('.'+dataDate+'').addClass('daysWithData');
                    $('.'+dataDate+'').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if(dataSource[i].status==='額滿' ||dataSource[i].status==='截止' ||dataSource[i].status==='後補'){
                        $('.'+dataDate+' .dataStatus').addClass('dataStatus_Or');
                    };
                    if(dataSource[i].status==='報名' ||dataSource[i].status==='預定'){
                        $('.'+dataDate+' .dataStatus').addClass('dataStatus_Gr');
                    };
                    // console.log(dataSource[i].status);
                    // console.log($(self));
                    // console.log('找到你了');
                }

            };
            ///日期選擇function
             $('.daysWithData').on('click', function() { 
                $('.daysWithData').removeClass('daySelected');
                $(this).addClass('daySelected');
            });
            //
        });       
    };

   


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