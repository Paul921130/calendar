const ModuleName = 'calendar';
const ModuleDefaults = {
     dataSource: [  // 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
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
                initYearMonth: '2018-06',
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
        this.self = this;
        this.$this = this.$ele;
        this.opts = this.option;
    }
    init() {
        let self = this;
        console.log('moduleIn!!!!');
        this.getAjax();
        this.creatHtml();
        this.$this.find('.switchMode').on('click', function() {
            self.switch();
        });
        return this;
    }
///////////////////////////////////////////////////////////將數字轉為金額格式(每三位數一個",")
    formatNumber(num, precision, separator){
        let parts;
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
        return this;
    }

    calendar() {
        return this;
    }
    creatHtml(){
        let self = this;
        let calendarHtml='<div class="calendar_tabWrap">'+
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
        this.$this.append(calendarHtml);               
        return this;
    }


    getAjax(){
        let self = this;
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data1.json',
            }).done(function(dataSource) {
                //篩選日期重複的資料!!!!!!!!!!!!!!!//以及覆蓋新Key值!!!!!!!!!!
                let lookup = {};
                let items = dataSource;
                var dataSource = [];//[]用var
                    for (let item, i = 0; item = items[i++];) {
                      let date = item.date;
                      let statusChange=(item.state||item.status);
                      delete(item.state||item.status);
                      item.status= statusChange;

                      
                      let availableChange=(item.onsell||item.availableVancancy);
                      delete(item.onsell||item.availableVancancy);
                      item.availableVancancy= availableChange;

                      let totalChange=(item.totalVacnacy||item.total);
                      delete(item.totalVacnacy||item.total);
                      item.totalVacnacy=totalChange;

                      if (!(date in lookup)) {
                        lookup[date] = 1;
                        dataSource.push(item);
                    }
                }

                //篩選日期重複的資料!!!!!!!!!!!!!!!
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                });//將dataSource按照日期排序,由前至後(2016年開始);
                
                self.creatCalendar(dataSource);
                self.creatCalendarDay(dataSource);
                self.showMonthDate(dataSource);


                self.onClickNext(dataSource);
                self.onClickPrev(dataSource);
                self.onClickDate(dataSource);

                // self.inputData();//[{certain: true, date: "2018/06/15", price: 234567, onsell: 0, totalVacnacy: 20, …}]
            });
    }
    resetData(resetOpt){
        var self = this;
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data1.json',
            }).done(function(dataSource) {
                //篩選日期重複的資料!!!!!!!!!!!!!!!//以及覆蓋新Key值!!!!!!!!!!
                let lookup = {};
                let items = dataSource;
                var dataSource = [];
                    for (let item, i = 0; item = items[i++];) {
                      let date = item.date;
                      let statusChange=(item.state||item.status);
                      delete(item.state||item.status);
                      item.status= statusChange;
                      
                      let availableChange=(item.onsell||item.availableVancancy);
                      delete(item.onsell||item.availableVancancy);
                      item.availableVancancy= availableChange;

                      let totalChange=(item.totalVacnacy||item.total);
                      delete(item.totalVacnacy||item.total);
                      item.totalVacnacy=totalChange;

                      if (!(date in lookup)) {
                        lookup[date] = 1;
                        dataSource.push(item);
                    }
                }

                var dataSource = resetOpt.concat(dataSource);//將inputData的陣列與dataSource

                //篩選日期重複的資料!!!!!!!!!!!!!!!
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                });//將dataSource按照日期排序,由前至後(2016年開始);


                self.creatCalendar(dataSource);
                self.creatCalendarDay(dataSource);
                self.showMonthDate(dataSource);

                self.onClickNext(dataSource);
                self.onClickPrev(dataSource);
                self.onClickDate(dataSource);

                // self.inputData();//[{certain: true, date: "2018/06/15", price: 234567, onsell: 0, totalVacnacy: 20, …}]
            });
            // location.reload();
    };
    inputData(inputOpt){
        var self = this;
        $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data1.json',
            }).done(function(dataSource) {
                //篩選日期重複的資料!!!!!!!!!!!!!!!//以及覆蓋新Key值!!!!!!!!!!
                let lookup = {};
                let items = dataSource;
                var dataSource = [];
                    for (let item, i = 0; item = items[i++];) {
                      let date = item.date;
                      let statusChange=(item.state||item.status);
                      delete(item.state||item.status);
                      item.status= statusChange;

                      let availableChange=(item.onsell||item.availableVancancy);
                      delete(item.onsell||item.availableVancancy);
                      item.availableVancancy= availableChange;

                      let totalChange=(item.totalVacnacy||item.total);
                      delete(item.totalVacnacy||item.total);
                      item.totalVacnacy=totalChange;

                      if (!(date in lookup)) {
                        lookup[date] = 1;
                        dataSource.push(item);
                    }
                }

                var dataSource=inputOpt.concat(dataSource);//將inputData的陣列與dataSource

                //篩選日期重複的資料!!!!!!!!!!!!!!!
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                });//將dataSource按照日期排序,由前至後(2016年開始);
                
                self.onClickNext(dataSource);
                self.onClickPrev(dataSource);
                self.onClickDate(dataSource);
                // self.inputData();//[{certain: true, date: "2018/06/15", price: 234567, onsell: 0, totalVacnacy: 20, …}]
            });
    };
    creatCalendar(dataSource){
        let self = this;
        let calendarHtml='<table class="weekTable">'+
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
            this.$this.find('.calendar_weeksWrap').append(calendarHtml);               
            return this;
    }
    showMonthDate(dataSource){
        let self = this;
        // var $this = this.$ele;//class="calendar"

        //抓到useAge所設定的初始月份
        let initYearMonth=this.option.initYearMonth;
        //抓到useAge所設定的初始月份
        
        let goMonth =0;
        for (let i = 0 ;i <= 2 ; i++ ){
                let nextMonthMo=moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                console.log(nextMonthMo);
                let monthsTitle= '<li class="tab">'+
                                   '<a href="#" class="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                 '</li>';              
                self.$this.find('.ntb_tab').append(monthsTitle);
                self.$this.find(".tab:nth-child(1) a").addClass('currentMonth');
        };
        self.monthSelect(dataSource);
        self.bornCalendar(dataSource);
        self.bornList(dataSource);
        // //小箭頭跳currentMonth
        this.$this.find('.next').on('click', function() {
        // if($('.currentDays').hasClass('daysWithData')){
        //     alert('Hey!這一頁有data!!!');
        // }         
            if(self.$this.find(".tab:nth-child(3) a").hasClass('currentMonth')===false){
            self.$this.find('.currentMonth').parent().next().children().addClass('currentMonth');
            self.$this.find('.currentMonth').parent().prev().children().removeClass('currentMonth');
                self.monthSelect(dataSource);
                self.bornList(dataSource);
                self.bornCalendar(dataSource);
                }else {
                goMonth=goMonth + 3;
                self.$this.find('.ntb_tab').empty();
                self.$this.find(".tab a").removeClass('currentMonth');
                for (let i = goMonth;i <= goMonth+2 ; i++ ){
                    let nextMonthMo=moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                    console.log(nextMonthMo);
                    let monthsTitle= '<li class="tab">'+
                                       '<a href="#" class="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                     '</li>';
                    self.$this.find('.ntb_tab').append(monthsTitle);
                    self.$this.find(".tab a").attr('id','');
                    self.$this.find(".tab:nth-child(1) a").addClass('currentMonth');              
                };
                self.monthSelect(dataSource);
                self.bornList(dataSource);
                self.bornCalendar(dataSource);
                };
                self.nextMonth(dataSource);
                
        });//小箭頭跳currentMonth

        this.$this.find('.prev').on('click', function() {
            if(self.$this.find(".tab:nth-child(1) a").hasClass('currentMonth')!==true){
                self.$this.find('.currentMonth').parent().prev().children().addClass('currentMonth');
                self.$this.find('.currentMonth').parent().next().children().removeClass('currentMonth');
                self.monthSelect(dataSource);
                self.bornList(dataSource); 
                self.bornCalendar(dataSource);
            }else{
                goMonth= goMonth - 3;
                self.$this.find('.ntb_tab').empty();
                self.$this.find(".tab a").removeClass('currentMonth');
                for (let i = goMonth;i <= goMonth+2 ; i++ ){
                    let nextMonthMo=moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                    let monthsTitle='<li class="tab">'+
                                       '<a href="#" class="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'" id="" data-label="'+moment(initYearMonth).add(i, 'months').format("YYYYMM")+'">'+'<span>'+nextMonthMo+'</span>'+'</a>'+
                                    '</li>';
                     self.$this.find('.ntb_tab').append(monthsTitle);
                     self.$this.find(".tab a").attr('id','');
                     self.$this.find(".tab:nth-child(3) a").addClass('currentMonth');                 
                };             
                self.monthSelect(dataSource);
                self.bornList(dataSource); 
                self.bornCalendar(dataSource);
            };
            console.log(self.$this.find('.currentMonth').attr('data-label'));
            self.prevMonth(dataSource);
        });//小箭頭跳currentMonth        
        // 小箭頭跳currentMonth
        return this;
    }

    monthSelect(dataSource){
        let self = this;
            this.$this.find('.tab a').on('click', function() {
            self.$this.find('.tab a').removeClass('currentMonth');
            $(this).addClass('currentMonth');
            let nowMonth=self.$this.find(".currentMonth").textContent;
            self.bornCalendar(dataSource);
            self.bornList(dataSource);
        });
        return this; 
    }
    creatCalendarDay(dataSource){
        let self = this;
        let calendarDayHtml= '<tbody id="mainCalendar">'+
                                    '<tr class="days">'+
                                        '<td class="disabled">'+
                                        '<div class="day otherMonth" >'+'</div>'+//將Ajax抓的data(dataSource)作為參數傳入
                                        '</td>'+
                                        '<td class="disabled">'+
                                        '</td>'+
                                    '</tr>'+          
                                '</tbody>';
        this.$this.find('.weekTable').append(calendarDayHtml);     
        return this;
    };
    bornList(dataSource){                 
            let self = this;
            let today = new Date();
            // let year = today.getFullYear();      //本年
            // let month = today.getMonth() + 1;    //本月
            let year = parseInt(this.$this.find(".currentMonth").attr('data-label').substring(0, 4));      //本年 抓取currentMonth所代表的年分
            let month =parseInt(this.$this.find(".currentMonth").attr('data-label').substring(4, 10));    //本月 抓取currentMonth所代表的月份
            let day = today.getDate();           //本日
            //本月第一天是星期几（距星期日离开的天数）
            let startDay = new Date(year, month - 1, 1).getDay();
            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
            let nDays = new Date(year, month, 0).getDate();
            //开始画日历
            // let numRow = 0;  //记录行的个数，到达7的时候创建tr
            let i;        //日期
            let html = '';
            html += '<ul id="Body">';
            for (let j = 1; j < 31 ; j++) {
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
            this.$this.find('#calendar_list').html(html);
            // document.getElementById("calendar_list").innerHTML = html;
            
            let NumOfJData = dataSource.length;
            for (i=0; i<NumOfJData; i++){
                let self = this;
                // let $this = this.$ele;
                // let $smallBox = $this.find(".content_box2");
                let dataYear= dataSource[i].date.substring(0,4);
                let dataMonth= dataSource[i].date.substring(5,7);
                let dataDay= dataSource[i].date.substring(8,10);
                let dataDate=parseInt(dataYear + dataMonth + dataDay);
                let calendarDays=parseInt($('.currentLists').attr('date'));
                if(self.$this.find('.currentLists').hasClass(dataDate)){
                    //可賣為零時會出現undifined...............................
                    if(dataSource[i].availableVancancy==undefined)
                        {
                            dataSource[i].availableVancancy = 0;
                    };
                    if(dataSource[i].totalVacnacy==undefined)
                        {
                            dataSource[i].totalVacnacy = 0;
                    };
                    //可賣為零時會出現undifined...............................
                    let li_right="<div class='li_right'><span class='dataStatus'>"+(dataSource[i].status)+"</span><span class='price'>"+"$"+self.formatNumber(dataSource[i].price)+"起"+"</span></div>";
                    let li_left="<div class='li_left'></div>";
                    let li_middle="<div class='li_middle'><span>"+
                                "可賣:"+(dataSource[i].availableVancancy)+"</span><span>"
                                +"團位:"+(dataSource[i].totalVacnacy)
                                // +"</span><div class='lb_gpls'>行程一</div></div>"
                    // let dataAvailable="<span>"+"可賣:"+dataSource[i].availableVancancy+"</span>";
                    // let dataTotal="<span>"+"團位:"+dataSource[i].totalVacnacy+"</span>";

                    self.$this.find('.calendar_list .'+dataDate+'').addClass('daysWithData').removeClass('hideData');
                    self.$this.find('.calendar_list .'+dataDate+'').append(li_middle, li_right);
                    // $('.'+dataDate+'').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if(dataSource[i].status==='額滿' ||dataSource[i].status==='截止' ||dataSource[i].status==='後補'){
                        $('.calendar_list .'+dataDate+' .dataStatus').addClass('dataStatus_Or');
                    };
                    if(dataSource[i].status==='報名' ||dataSource[i].status==='預定'){
                        $('.calendar_list .'+dataDate+' .dataStatus').addClass('dataStatus_Gr');
                    };


                    //保證出團圖示
                    
                    if(dataSource[i].guaranteed==true){
                        let dataguarante= "<span class='listTip js_tip' style='display: inline;'><span class='ic-ln productreferf'></span>保證出團</span>";
                        $('.calendar_list .'+dataDate+' .li_middle').append(dataguarante);
                    }
                    //保證出團圖示
                };
                //日期對上星期幾!!!!
                let listDay= new Date(dataYear+","+dataMonth+","+dataDay);
                let weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
                let weekdayHtml="<span>"+weekdays[listDay.getDay()]+"</span>";
                self.$this.find('.calendar_list .'+dataDate+' .li_left .dayDate').append(weekdayHtml);          
                //日期對上星期幾!!!
            };

            //列表跳頁產出
            let listPage= '<div class="listPage">'+
                          '<a class="prevList"><span class="arrow-gl m-r-xs"></span>上一頁</a>'+
                          '<span class="num"><span class="current_page">1</span><span style="padding:0 3px;">/</span><span class="total"></span></span>'+
                          '<a class="nextList">下一頁<span class="arrow-gr m-lr-xs"></span></a>'+
                          '</div>';
            this.$this.find('#Body').append(listPage);
            //列表跳頁產出
            ///日期選擇function
             this.$this.find('.daysWithData').on('click', function() { 
             self.$this.find('.daysWithData').removeClass('daySelected');
             $(this).addClass('daySelected');
            });
            $( ".hideData" ).remove();
            self.listChange();       
    };

    listChange(){
        let self = this;
        //實現分頁思路:
        let pageSize=7;      //每頁顯示數據條數
        let currentPage=1;   //當前頁數
        let totalSize=this.$this.find(".calendar_list ul li").length; //獲取總數據
        let totalPage=Math.ceil(totalSize / pageSize); //計算總頁數
        this.$this.find(".calendar_list ul li:gt(6)").hide();//設置首頁顯示7條數據
        this.$this.find(".total").text(totalPage);//設置總頁數
        this.$this.find('.current_page').text(currentPage);//設置當前頁數
        //實現下一頁
        //如果列表沒有data,則刪去跳頁的連接
        if(totalPage==0){
            this.$this.find('.listPage').remove();
        };
        //如果列表沒有data,則刪去跳頁的連接

        this.$this.find(".nextList").click(function(){
            if(currentPage == totalPage||currentPage == 0){ //當前頁數==最後一頁，禁止下一頁
                   return false;
                }else{//不是最後一頁，顯示應該顯示的數據.
                    self.$this.find(".current_page").text(++currentPage);  //當前頁數先+1
                    let start=pageSize*(currentPage-1);
                    let end=pageSize*currentPage;
                    $.each(self.$this.find('.calendar_list ul li'),function(index,item){
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

        this.$this.find(".prevList").click(function(){
            if(currentPage == 1 ){//當前頁數==1，禁止上一頁
                 return false;
                }else{
                     self.$this.find(".current_page").text(--currentPage);  //當前頁數先-1
                     let start=pageSize*(currentPage-1);
                     let end=pageSize*currentPage;
                     $.each(self.$this.find('.calendar_list ul li'),function(index,item){
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
            let self = this;
            // let $this = this.$ele;//class="calendar"
            let today = new Date();
            // let year = today.getFullYear();      //本年
            // let month = today.getMonth() + 1;    //本月

            let year = parseInt(this.$this.find(".currentMonth").attr('data-label').substring(0, 4));      //本年 抓取currentMonth所代表的年分
            let month =parseInt(this.$this.find(".currentMonth").attr('data-label').substring(4, 10));    //本月 抓取currentMonth所代表的月份

            // let year = parseInt($(".currentMonth").attr('data-label').substring(0, 4));      //本年 抓取currentMonth所代表的年分
            // let month =parseInt($(".currentMonth").attr('data-label').substring(4, 10));    //本月 抓取currentMonth所代表的月份
            let day = today.getDate();           //本日
            //本月第一天是星期几（距星期日离开的天数）
            let startDay = new Date(year, month - 1, 1).getDay();
            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
            let nDays = new Date(year, month, 0).getDate();
            //开始画日历
            let numRow = 0;  //记录行的个数，到达7的时候创建tr
            let i;        //日期
            let html = '';
            html += '<table id="Body"><tbody>';
            //第一行
            html += '<tr>';
            for (i = 0; i < startDay; i++) {
                html += '<td class="disabled"></td>';
                numRow++;
            };     
            for (let j = 1; j < 37 ; j++) {
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
            this.$this.find('#mainCalendar').html(html);
            // document.getElementById("mainCalendar").innerHTML = html;
            
            let NumOfJData = dataSource.length;
            for (i=0; i<NumOfJData; i++){
                let self = this;
                // let $this = this.$ele;
                // let $smallBox = $this.find(".content_box2");
                let dataYear= dataSource[i].date.substring(0,4);
                let dataMonth= dataSource[i].date.substring(5,7);
                let dataDay= dataSource[i].date.substring(8,10);
                let dataDate=parseInt(dataYear + dataMonth + dataDay);
                let calendarDays=parseInt(this.$this.find('.currentDays').attr('date'));
                if(this.$this.find('.currentDays').hasClass(dataDate)){
                    // let self = this;
                    // let $this = this.$ele;
                    //可賣為零時會出現undifined...............................
                    if(dataSource[i].availableVancancy==undefined)
                        {
                            dataSource[i].availableVancancy = 0;
                    };
                    //可賣為零時會出現undifined...............................
                    if(dataSource[i].totalVacnacy==undefined)
                        {
                            dataSource[i].totalVacnacy = 0;
                    };
                    //可賣為零時會出現undifined...............................
                    //可賣為零時會出現undifined...............................

                    let dataPrice="<p class='price'>"+"$"+self.formatNumber(dataSource[i].price)+"起"+"</p>";
                    let dataStatus="<p class='dataStatus'>"+(dataSource[i].status)+"</p>";
                    let dataAvailable="<p>"+"可賣:"+(dataSource[i].availableVancancy)+"</p>";
                    let dataTotal="<p>"+"團位:"+(dataSource[i].totalVacnacy)+"</p>";
                    $('.calendar_weeksWrap .'+dataDate+'').addClass('daysWithData');
                    $('.calendar_weeksWrap .'+dataDate+'').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if(dataSource[i].status==='額滿' ||dataSource[i].status==='截止' ||dataSource[i].status==='後補'){
                        $('.'+dataDate+' .dataStatus').addClass('dataStatus_Or');
                    };
                    if(dataSource[i].status==='報名' ||dataSource[i].status==='預定'){
                        $('.'+dataDate+' .dataStatus').addClass('dataStatus_Gr');
                    };
                    //顯示當前這頁有多少data

                    //保證出團圖示
                    
                    if(dataSource[i].guaranteed==true){
                        let dataguarante= "<span class='tip js_tip' style='display: inline;'>保證出團</span>";
                        $('.calendar_weeksWrap .'+dataDate+'').append(dataguarante);
                    }
                    //保證出團圖示

                    // console.log(dataSource[i]);
                    //顯示當前這頁有多少data
                }

            };
            ///日期選擇function
             this.$this.find('.daysWithData').on('click', function() { 
                self.$this.find('.daysWithData').removeClass('daySelected');
                $(this).addClass('daySelected');
            });     
            

    };
//////////////////////////////////////////要刪去沒有資料的月份...//////////////////////////////////////////////
    monthWithoutData(){
        let self = this;
        // let $this = this.$ele;//class="calendar"
        if(this.$this.find('.currentDays').hasClass('daysWithData')==false){
            let ddddd=$('.currentMonth').attr('data-label');
            self.$this.find('.'+ddddd+'').remove();
            alert('ohoh!這頁沒有Data!!');
        };
    }
/////////////////////////////////////////要刪去沒有資料的月份...///////////////////////////////////////////////


    ////////////////////////////////////whenclick的callBackFunction區//////////////////////////////////////
    onClickNext(dataSource){
        let self = this;
        let $btn = this.$this.find(".next");
        var data = dataSource;
        let onClickNextCallBack=this.option.onClickNext;
        $btn.click( function($btn) {
            //如果現在是12月份 單純+1會出錯誤 以下是判斷式
            var $btn=this;
            let module= self.$this;
            let data =dataSource;
            onClickNextCallBack($btn, data, module);
        });
    };

    onClickPrev(dataSource){
        let self = this;
        let $btn = this.$this.find(".prev");
        let data = dataSource;
        let onClickPrevCallBack=this.option.onClickPrev;
        $btn.click( function($btn) {
            var $btn=this;
            let module= self.$this;
            let data = dataSource;
            onClickPrevCallBack($btn, data, module);
        });
    };
    onClickDate(dataSource){
        let self = this;
        let $dayData=this.$this.find('.daysWithData');
        let onClickDateCallBack=this.option.onClickDate;
        $dayData.click( function() {
            let $date=self.$this.find('.daySelected').attr('date');
            let data = dataSource;
            onClickDateCallBack($date, data);
        });
    };
    ////////////////////////////////////whenclick的callBackFunction區//////////////////////////////////////

    // 下一個有資料的月份
    nextMonth(){
        let self = this;
        let $this = this.$ele;
        return this;
    }

    // 上一個有資料的月份
    prevMonth(){
        let self = this;
        let $this = this.$ele;
        return this;
    }

    // 切換日曆或列表模式
    switch(){
        let self = this;
        // let $this = this.$ele;
        if(this.$this.find('.calendar_list').hasClass('hide')){
            self.$this.find(".switchMode").text("切換列表模式");
            }else{
                self.$this.find(".switchMode").text("切換月曆模式");
            }
        this.$this.find('.calendar_weeksWrap').toggleClass('hide');
        this.$this.find('.calendar_list').toggleClass('hide');
        if(this.$this.find('.calendar_list').hasClass('hide')){
            self.$this.find(".switchMode").text("切換列表模式");
        }else{
            self.$this.find(".switchMode").text("切換月曆模式");
        }
    }

    // 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份

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

export { ModuleName, ModuleDefaults, ModuleReturns, Module};