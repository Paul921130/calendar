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
    constructor(ele, options, options2) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
        this.option2= options2;
    }
    init() {
        var self = this;
        var $this = this.$ele;
        var opts = this.option;
        // console.log(ModuleDefaults.dataSource);
        console.log('moduleIn!!!!');
        this.getAjax();
        this.creatHtml();
        
        this.switch();
        console.log(self.formatNumber(11111111111112211));
        $('.switchMode').on('click', function() {
            self.switch();
        });
        // this.inputData();
         console.log('initConsolez:'+this.inputData());//uundefined
       

        // var nowYear=parseInt($(".currentMonth").attr('data-label').substring(0, 4));//抓取currentMonth所代表的年分
        // var nowMonth=parseInt($(".currentMonth").attr('data-label').substring(4, 10));//抓取currentMonth所代表的月份
        // console.log(nowYear);
        // console.log(nowMonth);
        
        return this;
    }
///////////////////////////////////////////////////////////將數字轉為金額格式(每三位數一個",")
    formatNumber(num, precision, separator){
        var parts;
            // 判断是否为数字
            if (!isNaN(parseFloat(num)) && isFinite(num)) {
                // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
                // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
                // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
                // 的值变成了 12312312.123456713
                num = Number(num);
                // 处理小数点位数
                num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
                // 分离数字的小数部分和整数部分
                parts = num.split('.');
                // 整数部分加[separator]分隔, 借用一个著名的正则表达式
                parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
                return parts.join('.');
            }
            return NaN;
    }
///////////////////////////////////////////////////////////將數字轉為金額格式(每三位數一個",")    
    methods() {
        this.destroy();
        this.nextMonth();
        this.prevMonth();
         this.switch();
        return this;
    }

    calendar() {
        this.destroy();
        this.nextMonth();
         this.switch();
        this.prevMonth();
        return this;
    }
    creatHtml(){
        var self = this;
        var $this = this.$ele;//class="calendar"
        var calendarHtml='<div class="calendar_tabWrap">'+
                            '<div class="ntb_gpbt yellow">'+
                                '<a href="#" class="prev on">'+'</a>'+
                                '<ul class="ntb_tab">'+                                            
                                '</ul>'+
                                '<a href="#" class="next on">'+'</a>'+
                            '</div>'+
                        '</div>'+
                        '<div class="calendar_weeksWrap">'+
                        '</div>'+
                        '<div class="calendar_list hide" id="calendar_list">'+
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
                url: './json/data2.json',
            }).done(function(dataSource) {

                //篩選日期重複的資料!!!!!!!!!!!!!!!//以及覆蓋新Key值!!!!!!!!!!
                var lookup = {};
                var items = dataSource;
                var dataSource = [];


                //inputData
                // console.log(self.inputData());
                // dataSource= dataSource.concat(self.inputData());
                //inputData
                    for (var item, i = 0; item = items[i++];) {
                      var date = item.date;
                      var statusChange=(item.state||item.status);
                      delete(item.state||item.status);
                      item.status= statusChange;

                      
                      var availableChange=(item.onsell||item.availableVancancy);
                      delete(item.onsell||item.availableVancancy);
                      item.availableVancancy= availableChange;

                      var totalChange=(item.totalVacnacy||item.total);
                      delete(item.totalVacnacy||item.total);
                      item.totalVacnacy=totalChange;

                      if (!(date in lookup)) {
                        lookup[date] = 1;
                        dataSource.push(item);
                    }
                }
                self.inputData(dataSource);
                
                // console.log(dataSource);
                //篩選日期重複的資料!!!!!!!!!!!!!!!
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                });//將dataSource按照日期排序,由前至後(2016年開始);
                // self.inputData(dataSource);
             
                console.log(dataSource);

                self.creatCalendar(dataSource);
                self.creatCalendarDay(dataSource);
                self.showMonthDate(dataSource);

                // self.nextMonth(dataSource);
                // self.prevMonth(dataSource);
                // self.bornCalendar(dataSource);
                // self.bornList(dataSource);
            });
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
            $this.find('.calendar_weeksWrap').append(calendarHtml);               
            return this;
    }
    showMonthDate(dataSource){
        var self = this;
        var $this = this.$ele;//class="calendar"
        var initYearMonth=this.option.initYearMonth;//抓到useAge所設定的初始月份
        console.log(initYearMonth);
        var goMonth =0;
        for (var i = 0 ;i <= 2 ; i++ ){
                var nextMonthMo=moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                console.log(nextMonthMo);
                var monthsTitle= '<li class="tab">'+
                                   '<a href="#" class="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                 '</li>';              
                $this.find('.ntb_tab').append(monthsTitle);
                $(".tab:nth-child(1) a").addClass('currentMonth');
        };
        self.monthSelect(dataSource);
        self.bornCalendar(dataSource);
        self.bornList(dataSource);
        // //小箭頭跳currentMonth
        $('.next').on('click', function() {         
            if($(".tab:nth-child(3) a").hasClass('currentMonth')===false){
            $this.find('.currentMonth').parent().next().children().addClass('currentMonth');
            $this.find('.currentMonth').parent().prev().children().removeClass('currentMonth');
                self.monthSelect(dataSource);
                self.bornList(dataSource);
                self.bornCalendar(dataSource);
                }else {
                goMonth=goMonth + 3;
                $this.find('.ntb_tab').empty();
                $(".tab a").removeClass('currentMonth');
                for (var i = goMonth;i <= goMonth+2 ; i++ ){
                    var nextMonthMo=moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                    console.log(nextMonthMo);
                    var monthsTitle= '<li class="tab">'+
                                       '<a href="#" class="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                     '</li>';
                    $this.find('.ntb_tab').append(monthsTitle);
                    $(".tab a").attr('id','');
                    $(".tab:nth-child(1) a").addClass('currentMonth');              
                };
                self.monthSelect(dataSource);
                self.bornList(dataSource);
                self.bornCalendar(dataSource);
                console.log(goMonth);
                };
               
                console.log($('.currentMonth').attr('data-label'));
        });//小箭頭跳currentMonth

        $('.prev').on('click', function() {
            if($(".tab:nth-child(1) a").hasClass('currentMonth')!==true){
                $this.find('.currentMonth').parent().prev().children().addClass('currentMonth');
                $this.find('.currentMonth').parent().next().children().removeClass('currentMonth');
                self.monthSelect(dataSource);
                self.bornList(dataSource); 
                self.bornCalendar(dataSource);
            }else{
                goMonth= goMonth - 3;
                $this.find('.ntb_tab').empty();
                $(".tab a").removeClass('currentMonth');
                for (var i = goMonth;i <= goMonth+2 ; i++ ){
                    var nextMonthMo=moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                    var monthsTitle='<li class="tab">'+
                                       '<a href="#" class="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                    '</li>';
                     $this.find('.ntb_tab').append(monthsTitle);
                     $(".tab a").attr('id','');
                     $(".tab:nth-child(3) a").addClass('currentMonth');                 
                };             
                self.monthSelect(dataSource);
                self.bornList(dataSource); 
                self.bornCalendar(dataSource);
                console.log(goMonth);
            };
            
            console.log($('.currentMonth').attr('data-label'));
        });//小箭頭跳currentMonth        
        // 小箭頭跳currentMonth
        return this;
    }

    monthSelect(dataSource){
        var self = this;
        var $this = this.$ele;//class="calendar"
            $this.find('.tab a').on('click', function() {
            $this.find('.tab a').removeClass('currentMonth');
            $(this).addClass('currentMonth');
            var nowMonth=$(".currentMonth").textContent;
            self.bornCalendar(dataSource);
            self.bornList(dataSource);
        });
        return this; 
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
     
        return this;
    }
    
    bornList(dataSource){                 
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
            // var numRow = 0;  //记录行的个数，到达7的时候创建tr
            var i;        //日期
            var html = '';
            html += '<ul id="Body">';
            for (var j = 1; j < 31 ; j++) {
                //為什麼是37啊!!!!!!!!!!!!!!!!!
                //如果是今天则显示红色
                if (j == day) {
                    html += '<li class="currentLists hideData '+year+'0'+month+'0'+j+'" date="'+year+month+j+'">';
                    html += '<div class="li_left"><div class="dayDate">'+j+'</div></div>';    //开始加日期
                }
                else if( j!==day && j<= nDays) {
                    if(j<10 && month<10){
                        html += '<li class="currentLists hideData '+year+'0'+month+'0'+j+'" date="'+year+'0'+month+'0'+j+'">';
                        html += '<div class="li_left"><div class="dayDate">'+j+'</div></div>';
                    }else if(j>=10 && month<10){
                        html += '<li class="currentLists hideData '+year+'0'+month+j+'" date="'+year+month+j+'">';
                        html += '<div class="li_left"><div class="dayDate">'+j+'</div></div>';
                    }else if(j<10 && month>=10){
                        html += '<li class="currentLists hideData '+year+month+'0'+j+'" date="'+year+month+j+'">';
                        html += '<div class="li_left"><div class="dayDate">'+j+'</div></div>';
                    }else{
                        html += '<li class="currentLists hideData '+year+month+j+'" date="'+year+month+j+'">';
                        html += '<div class="li_left"><div class="dayDate">'+j+'</div></div>';
                    }    //开始加日期
                }
                html += '</li>';
            };
            html += '</ul>';
            document.getElementById("calendar_list").innerHTML = html;
            
            var NumOfJData = dataSource.length;
            for (i=0; i<NumOfJData; i++){
                var self = this;
                var $this = this.$ele;
                // var $smallBox = $this.find(".content_box2");
                var dataYear= dataSource[i].date.substring(0,4);
                var dataMonth= dataSource[i].date.substring(5,7);
                var dataDay= dataSource[i].date.substring(8,10);
                var dataDate=parseInt(dataYear + dataMonth + dataDay);
                var calendarDays=parseInt($('.currentLists').attr('date'));
                if($('.currentLists').hasClass(dataDate)){
                    var li_right="<div class='li_right'><span class='dataStatus'>"+(dataSource[i].status)+"</span><span class='price'>"+"$"+self.formatNumber(dataSource[i].price)+"起"+"</span></div>";
                    var li_left="<div class='li_left'></div>";
                    var li_middle="<div class='li_middle'><span>"+
                                "可賣:"+(dataSource[i].availableVancancy)+"</span><span>"
                                +"團位:"+(dataSource[i].totalVacnacy)
                                +"</span><div class='lb_gpls'>行程一</div></div>"
                    // var dataAvailable="<span>"+"可賣:"+dataSource[i].availableVancancy+"</span>";
                    // var dataTotal="<span>"+"團位:"+dataSource[i].totalVacnacy+"</span>";


                    $('.calendar_list .'+dataDate+'').addClass('daysWithData').removeClass('hideData');
                    $('.calendar_list .'+dataDate+'').append(li_middle, li_right);
                    // $('.'+dataDate+'').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if(dataSource[i].status==='額滿' ||dataSource[i].status==='截止' ||dataSource[i].status==='後補'){
                        $('.calendar_list .'+dataDate+' .dataStatus').addClass('dataStatus_Or');
                    };
                    if(dataSource[i].status==='報名' ||dataSource[i].status==='預定'){
                        $('.calendar_list .'+dataDate+' .dataStatus').addClass('dataStatus_Gr');
                    };  
                };
                //日期對上星期幾!!!!
                var listDay= new Date(dataYear+","+dataMonth+","+dataDay);
                var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
                var weekdayHtml="<span>"+weekdays[listDay.getDay()]+"</span>";
                $('.calendar_list .'+dataDate+' .li_left .dayDate').append(weekdayHtml);              
                //日期對上星期幾!!!
            };
            ///日期選擇function
             $('.daysWithData').on('click', function() { 
             $('.daysWithData').removeClass('daySelected');
             $(this).addClass('daySelected');
            });
             $( ".hideData" ).remove();
            self.listChange();       
    };

    listChange(){
        //實現分頁思路:
        var pageSize=7;      //每頁顯示數據條數
        var currentPage=1;   //當前頁數
        var totalSize=$(".calendar_list ul li").length; //獲取總數據
        var totalPage=Math.ceil(totalSize / pageSize); //計算總頁數
        $(".calendar_list ul li:gt(6)").hide(); //設置首頁顯示7條數據
        $(".total").text(totalPage);  //設置總頁數
        $(".current_page").text(currentPage); //設置當前頁數
        //實現下一頁
        $(".nextList").click(function(){
            if(currentPage == totalPage||currentPage == 0){ //當前頁數==最後一頁，禁止下一頁
                   return false;
                }else{//不是最後一頁，顯示應該顯示的數據.
                    $(".current_page").text(++currentPage);  //當前頁數先+1
                    var start=pageSize*(currentPage-1);
                    var end=pageSize*currentPage;
                    $.each($('.calendar_list ul li'),function(index,item){
                            if(index >=start && index < end){
                                $(this).show();
                                }
                                else{
                                    $(this).hide();
                                    }
                        });
                    }
            });    
            //實現上一頁
        $(".prevList").click(function(){
            if(currentPage == 1 ){//當前頁數==1，禁止上一頁
                 return false;
                }else{
                     $(".current_page").text(--currentPage);  //當前頁數先-1
                     var start=pageSize*(currentPage-1);
                     var end=pageSize*currentPage;
                     $.each($('.calendar_list ul li'),function(index,item){
                           if(index >=start && index < end){
                                $(this).show();
                                }
                                else{
                                    $(this).hide();
                                    }
                         });
                    }
            });
    }
   
    bornCalendar(dataSource){                 
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
                    //可賣為零時會出現bug...............................
                    if(dataSource[i].availableVancancy==undefined)
                        {
                            dataSource[i].availableVancancy = 0;
                    };
                    //可賣為零時會出現bug...............................

                    var dataPrice="<p class='price'>"+"$"+self.formatNumber(dataSource[i].price)+"起"+"</p>";
                    var dataStatus="<p class='dataStatus'>"+(dataSource[i].status)+"</p>";
                    var dataAvailable="<p>"+"可賣:"+(dataSource[i].availableVancancy)+"</p>";
                    var dataTotal="<p>"+"團位:"+(dataSource[i].totalVacnacy)+"</p>";
                    $('.calendar_weeksWrap .'+dataDate+'').addClass('daysWithData');
                    $('.calendar_weeksWrap .'+dataDate+'').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if(dataSource[i].status==='額滿' ||dataSource[i].status==='截止' ||dataSource[i].status==='後補'){
                        $('.'+dataDate+' .dataStatus').addClass('dataStatus_Or');
                    };
                    if(dataSource[i].status==='報名' ||dataSource[i].status==='預定'){
                        $('.'+dataDate+' .dataStatus').addClass('dataStatus_Gr');
                    };
                }

            };
            ///日期選擇function
             $('.daysWithData').on('click', function() { 
                $('.daysWithData').removeClass('daySelected');
                $(this).addClass('daySelected');
            });     
    };

    // 下一個有資料的月份
    nextMonth(dataSource){
        var self = this;
        var $this = this.$ele;
        console.log('nextMonth');
        console.log(dataSource);
        return this;
    }

    // 上一個有資料的月份
    prevMonth(dataSource){
        var self = this;
        var $this = this.$ele;
        console.log('prevMonth');
        console.log(dataSource);
        return this;
    }

    // 切換日曆或列表模式
    switch(){
        var self = this;
        var $this = this.$ele;
        if($('.calendar_list').hasClass('hide')){
            $(".switchMode").text("切換列表模式");
            }else{
                $(".switchMode").text("切換月曆模式");
            }
        
            $('.calendar_weeksWrap').toggleClass('hide');
            $('.calendar_list').toggleClass('hide');
            if($('.calendar_list').hasClass('hide')){
            $(".switchMode").text("切換列表模式");
            }else{
                $(".switchMode").text("切換月曆模式");
            }
        return this;
    }

    // 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份
    inputData(inputOpt, dataSource){
        var self = this;
        var $this = this.$ele;
        var dataSource=dataSource;
        // var inputOpt;
        
        console.log(inputOpt);
        // dataSource = inputOpt.concat(dataSource);
        // console.log(dataSource);
        return dataSource;
        // return this;
    }

    // 重設資料時，月曆、tab重新產出
    resetData(){
        return this;
    }

    // destroy calendar，destroy時連class new出來的實例物件也要刪除
    destroy(){
        $('.calendar').empty();
        return this;
    }

};

export { ModuleName, ModuleDefaults, ModuleReturns, Module };