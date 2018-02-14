/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _module = __webpack_require__(4);

var root = function (root) {
	if ((typeof root === 'undefined' ? 'undefined' : _typeof(root)) === 'object' && (root.self === root || root.global === global) && root) {
		return root;
	}
}(self || global || {});

var $ = function ($) {
	if (typeof $ === 'function') {
		return $;
	} else {
		throw 'You must import jQuery';
	}
}(root.jQuery);

$.fn[_module.ModuleName] = function () {
	var module = void 0;
	var args = Array.prototype.slice.call(arguments, 0);
	var method = args[0];
	var options = args.slice(1).length <= 0 ? undefined : args.slice(1, args.length);;
	var isReturnMethod = this.length === 1 && typeof method === 'string' && _module.ModuleReturns.indexOf(method) !== -1;
	var methodRunner = function methodRunner(method, options, uesReturn) {
		var $this = $(this);
		var module = $this.data(_module.ModuleName);
		if (!!module) {
			if (typeof method == 'string' && !uesReturn) {
				module[method].apply(module, options);
			} else if (typeof method == 'string' && !!uesReturn) {
				return module[method].apply(module, options);
			} else {
				throw 'unsupported options!';
			}
		} else {
			throw 'You must run first this plugin!';
		}
	};
	if (isReturnMethod) {
		return methodRunner.call(this, method, options, isReturnMethod);
	} else {
		return this.each(function () {
			var $this = $(this);
			var module = $this.data(_module.ModuleName);
			var opts = null;
			if (!!module) {
				methodRunner.call(this, method, options);
			} else {
				opts = $.extend(true, {}, _module.ModuleDefaults, (typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' && method, (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options);
				module = new _module.Module(this, opts);
				$this.data(_module.ModuleName, module);
				module.init();
			}
		});
	}
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleName = 'calendar';
var ModuleDefaults = {
    dataSource: [// 資料來源的輸入接口 [ array | string ] 如果是 string的話，請輸入網址
    {
        "guaranteed": true, // {boolean}
        "date": "2016/12/15", // {string} YYYY/MM/DD
        "price": "234567", // {string|number} XXXXXX | 近期上架
        "availableVancancy": 0, // {number}
        "totalVacnacy": 20, // {number}
        "status": "報名" // {string} 報名(#24a07c) | 後補(#24a07c) | 預定(#24a07c) | 截止(#ff7800) | 額滿(#ff7800) | 關團(#ff7800)
    }],
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
    onClickPrev: function onClickPrev($btn, data, module) {
        console.log($btn, data, module);
    },
    // 點下一個月時
    onClickNext: function onClickNext($btn, data, module) {
        console.log($btn, data, module);
    },
    // 點日期時
    onClickDate: function onClickDate($date, data) {
        console.log($date, data);
    }
};
var ModuleReturns = ['output', 'methods'];

var Module = function () {
    function Module(ele, options) {
        _classCallCheck(this, Module);

        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
    }

    _createClass(Module, [{
        key: "init",
        value: function init() {
            var self = this;
            var $this = this.$ele;
            var opts = this.option;
            // console.log(ModuleDefaults.dataSource);
            console.log('moduleIn!!!!');
            this.creatHtml();
            this.getAjax();
            this.switch();

            // var nowYear=parseInt($(".currentMonth").attr('data-label').substring(0, 4));//抓取currentMonth所代表的年分
            // var nowMonth=parseInt($(".currentMonth").attr('data-label').substring(4, 10));//抓取currentMonth所代表的月份
            // console.log(nowYear);
            // console.log(nowMonth);

            return this;
        }
    }, {
        key: "methods",
        value: function methods() {
            return this;
        }
    }, {
        key: "calendar",
        value: function calendar() {
            return this;
        }
    }, {
        key: "creatHtml",
        value: function creatHtml() {
            var self = this;
            var $this = this.$ele; //class="calendar"
            var calendarHtml = '<div class="calendar_tabWrap">' + '<div class="ntb_gpbt yellow">' + '<a href="#" class="prev on">' + '</a>' + '<ul class="ntb_tab">' + '</ul>' + '<a href="#" class="next on">' + '</a>' + '</div>' + '</div>' + '<div class="calendar_weeksWrap">' + '</div>' + '<div class="calendar_list hide" id="calendar_list">' + '</div>'; //要記得用"+"連起來呦    
            $this.append(calendarHtml);
            return this;
        }
    }, {
        key: "getAjax",
        value: function getAjax() {
            var self = this;
            var $this = this.$ele; //class="calendar"
            $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data2.json'
            }).done(function (dataSource) {
                //篩選日期重複的資料!!!!!!!!!!!!!!!//以及覆蓋新Key值!!!!!!!!!!
                var lookup = {};
                var items = dataSource;
                var dataSource = [];

                for (var item, i = 0; item = items[i++];) {
                    var date = item.date;
                    var statusChange = item.state || item.status;
                    delete (item.state || item.status);
                    item.status = statusChange;

                    var availableChange = item.onsell || item.availableVancancy;
                    delete (item.onsell || item.availableVancancy);
                    item.availableVancancy = availableChange;

                    var totalChange = item.totalVacnacy || item.total;
                    delete (item.totalVacnacy || item.total);
                    item.totalVacnacy = totalChange;

                    if (!(date in lookup)) {
                        lookup[date] = 1;
                        dataSource.push(item);
                    }
                }

                // console.log(dataSource);
                //篩選日期重複的資料!!!!!!!!!!!!!!!
                // alert(dataSource[0]);
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                }); //將dataSource按照日期排序,由前至後(2016年開始);

                // return (dataSource);
                self.showMonthDate(dataSource);
                self.creatCalendar(dataSource);
                self.creatCalendarDay(dataSource);

                self.bornCalendar(dataSource);
                self.bornList(dataSource);
            });
            return this;
        }
    }, {
        key: "creatCalendar",
        value: function creatCalendar(dataSource) {
            var self = this;
            var $this = this.$ele; //class="calendar"
            var calendarHtml = '<table class="weekTable">' + '<thead>' + '<tr class="week">' + '<th>' + '星期日' + '</th>' + '<th>' + '星期一' + '</th>' + '<th>' + '星期二' + '</th>' + '<th>' + '星期三' + '</th>' + '<th>' + '星期四' + '</th>' + '<th>' + '星期五' + '</th>' + '<th>' + '星期六' + '</th>' + '</tr>' + '</thead>' + '</table>';
            $this.find('.calendar_weeksWrap').append(calendarHtml);
            return this;
        }
    }, {
        key: "showMonthDate",
        value: function showMonthDate(dataSource) {
            var self = this;
            var $this = this.$ele; //class="calendar"
            var initYearMonth = this.option.initYearMonth; //抓到useAge所設定的初始月份
            console.log(initYearMonth);
            var goMonth = 1;
            for (var i = 0; i <= 2; i++) {
                var nextMonthMo = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                console.log(nextMonthMo);
                var monthsTitle = '<li class="tab">' + '<a href="#" class="' + moment(initYearMonth).add(i, 'months').format("YYYYMM") + '" id="" data-label="' + moment(initYearMonth).add(i, 'months').format("YYYYMM") + '">' + '<span>' + nextMonthMo + '</span>' + '</a>' + '</li>';
                $this.find('.ntb_tab').append(monthsTitle);
                $(".tab:nth-child(1) a").addClass('currentMonth');
                // $(".tab:nth-child(1) a").attr('id','currentMonth');
                // self.monthSelect();
                // self.getNowMonth();
            };
            self.monthSelect(dataSource);
            // //小箭頭跳currentMonth
            $('.next').on('click', function () {
                if ($(".tab:nth-child(3) a").hasClass('currentMonth') === false) {
                    $this.find('.currentMonth').parent().next().children().addClass('currentMonth');
                    $this.find('.currentMonth').parent().prev().children().removeClass('currentMonth');
                    self.monthSelect(dataSource);
                    self.getNowMonth();
                    self.bornList(dataSource);
                    self.bornCalendar(dataSource);
                } else {
                    // var goMonth =Math.abs(parseInt($('.currentMonth').attr('data-label'))-201801);
                    $this.find('.ntb_tab').empty();
                    $(".tab a").removeClass('currentMonth');
                    for (var i = goMonth; i <= goMonth + 2; i++) {
                        var nextMonthMo = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                        console.log(nextMonthMo);
                        var monthsTitle = '<li class="tab">' + '<a href="#" class="' + moment(initYearMonth).add(i, 'months').format("YYYYMM") + '" id="" data-label="' + moment(initYearMonth).add(i, 'months').format("YYYYMM") + '">' + '<span>' + nextMonthMo + '</span>' + '</a>' + '</li>';
                        $this.find('.ntb_tab').append(monthsTitle);
                        $(".tab a").attr('id', '');
                        $(".tab:nth-child(1) a").addClass('currentMonth');
                    };
                    self.monthSelect(dataSource);
                    self.getNowMonth();
                    self.bornList(dataSource);
                    self.bornCalendar(dataSource);
                    console.log(goMonth);
                };
                goMonth++;
                console.log($('.currentMonth').attr('data-label'));
            }); //小箭頭跳currentMonth


            $('.prev').on('click', function () {
                if ($(".tab:nth-child(1) a").hasClass('currentMonth') !== true) {
                    $this.find('.currentMonth').parent().prev().children().addClass('currentMonth');
                    $this.find('.currentMonth').parent().next().children().removeClass('currentMonth');
                    self.monthSelect(dataSource);
                    self.getNowMonth();
                    self.bornList(dataSource);
                    self.bornCalendar(dataSource);
                } else {
                    // var goMonth =Math.abs(parseInt($('.currentMonth').attr('data-label'))-201801);
                    $this.find('.ntb_tab').empty();
                    $(".tab a").removeClass('currentMonth');
                    for (var i = goMonth - 2; i <= goMonth - 2 + 2; i++) {
                        var nextMonthMo = moment(initYearMonth).add(i, 'months').format("YYYY MMM");
                        // console.log(nextMonthMo);
                        var monthsTitle = '<li class="tab">' + '<a href="#" class="' + moment(initYearMonth).add(i, 'months').format("YYYYMM") + '" id="" data-label="' + moment(initYearMonth).add(i, 'months').format("YYYYMM") + '">' + '<span>' + nextMonthMo + '</span>' + '</a>' + '</li>';
                        $this.find('.ntb_tab').append(monthsTitle);
                        $(".tab a").attr('id', '');
                        // $(".tab:nth-child(1) a").attr('id','currentMonth');
                        $(".tab:nth-child(1) a").addClass('currentMonth');
                    };
                    self.monthSelect(dataSource);
                    self.getNowMonth();
                    self.bornList(dataSource);
                    self.bornCalendar(dataSource);
                    console.log(goMonth);
                    // return this;
                }
                goMonth--;
                console.log($('.currentMonth').attr('data-label'));
            }); //小箭頭跳currentMonth        

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
    }, {
        key: "monthSelect",
        value: function monthSelect(dataSource) {
            var self = this;
            var $this = this.$ele; //class="calendar"
            $this.find('.tab a').on('click', function () {
                $this.find('.tab a').removeClass('currentMonth');
                $(this).addClass('currentMonth');
                var nowMonth = $(".currentMonth").textContent;
                self.bornCalendar(dataSource);
                self.bornList(dataSource);
            });
            // });

            return this;
        }
    }, {
        key: "getNowMonth",
        value: function getNowMonth() {
            // var self = this;
            // var $this = this.$ele;//class="calendar"
            // var nowYear=parseInt($(".currentMonth").attr('data-label').substring(0, 4));//抓取currentMonth所代表的年分
            // var nowMonth=parseInt($(".currentMonth").attr('data-label').substring(4, 10));//抓取currentMonth所代表的月份
            // console.log(nowYear);
            // console.log(nowMonth);
        }
    }, {
        key: "creatCalendarDay",
        value: function creatCalendarDay(dataSource) {
            var self = this;
            var $this = this.$ele; //class="calendar"
            var calendarDayHtml = '<tbody id="mainCalendar">' + '<tr class="days">' + '<td class="disabled">' + '<div class="day otherMonth" >' + '</div>' + //將Ajax抓的data(dataSource)作為參數傳入
            '</td>' + '<td class="disabled">' + '</td>' + '</tr>' + '</tbody>';
            $('.weekTable').append(calendarDayHtml);
            // console.log(moment().add(1, 'days').format("D"));
            // self.bornCalendar(dataSource);    
            return this;
        }
    }, {
        key: "bornList",
        value: function bornList(dataSource) {
            // $.ajax({
            //        dataType: "json",
            //        method: 'GET',
            //        url: './json/data2.json',
            //    }).done(function(dataSource) {
            //    dataSource = dataSource.sort(function (a, b) {
            //         return a.date > b.date ? 1 : -1;//資料依照日期排序       
            //    });//將dataSource按照日期排序,由前至後(2016年開始)

            //    //篩選日期重複的資料!!!!!!!!!!!!!!!
            //        var lookup = {};
            //        var items = dataSource;
            //            var dataSource = [];

            //            for (var item, i = 0; item = items[i++];) {
            //              var date = item.date;
            //              var statusChange=(item.state||item.status);
            //              delete(item.state||item.status);//刪除原本JSON中的state Key值
            //              item.status= statusChange;//插入新的Key值

            //              var totalChange=(item.totalVacnacy||item.total);
            //              delete(item.totalVacnacy||item.total);
            //              item.totalVacnacy=totalChange;

            //              var availableChange=(item.onsell||item.availableVancancy);
            //              delete(item.onsell||item.availableVancancy);
            //              item.availableVancancy= availableChange;

            //              if (!(date in lookup)) {
            //                lookup[date] = 1;
            //                dataSource.push(item);
            //            }
            //        }
            // console.log(dataSource);
            //篩選日期重複的資料!!!!!!!!!!!!!!!

            var self = this;
            var $this = this.$ele; //class="calendar"
            var today = new Date();
            // var year = today.getFullYear();      //本年
            // var month = today.getMonth() + 1;    //本月
            var year = parseInt($(".currentMonth").attr('data-label').substring(0, 4)); //本年 抓取currentMonth所代表的年分
            var month = parseInt($(".currentMonth").attr('data-label').substring(4, 10)); //本月 抓取currentMonth所代表的月份
            var day = today.getDate(); //本日
            //本月第一天是星期几（距星期日离开的天数）
            var startDay = new Date(year, month - 1, 1).getDay();
            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
            var nDays = new Date(year, month, 0).getDate();
            //开始画日历
            // var numRow = 0;  //记录行的个数，到达7的时候创建tr
            var i; //日期
            var html = '';
            html += '<ul id="Body">';
            for (var j = 1; j < 31; j++) {
                //為什麼是37啊!!!!!!!!!!!!!!!!!
                //如果是今天则显示红色
                if (j == day) {
                    html += '<li class="currentLists hideData ' + year + '0' + month + '0' + j + '" date="' + year + month + j + '">';
                    html += '<div class="li_left"><div class="dayDate">' + j + '</div></div>'; //开始加日期
                } else if (j !== day && j <= nDays) {
                    if (j < 10 && month < 10) {
                        html += '<li class="currentLists hideData ' + year + '0' + month + '0' + j + '" date="' + year + '0' + month + '0' + j + '">';
                        html += '<div class="li_left"><div class="dayDate">' + j + '</div></div>';
                    } else if (j >= 10 && month < 10) {
                        html += '<li class="currentLists hideData ' + year + '0' + month + j + '" date="' + year + month + j + '">';
                        html += '<div class="li_left"><div class="dayDate">' + j + '</div></div>';
                    } else if (j < 10 && month >= 10) {
                        html += '<li class="currentLists hideData ' + year + month + '0' + j + '" date="' + year + month + j + '">';
                        html += '<div class="li_left"><div class="dayDate">' + j + '</div></div>';
                    } else {
                        html += '<li class="currentLists hideData ' + year + month + j + '" date="' + year + month + j + '">';
                        html += '<div class="li_left"><div class="dayDate">' + j + '</div></div>';
                    } //开始加日期
                }
                html += '</li>';
            };
            html += '</ul>';
            document.getElementById("calendar_list").innerHTML = html;

            var NumOfJData = dataSource.length;
            for (i = 0; i < NumOfJData; i++) {
                var self = this;
                var $this = this.$ele;
                // var $smallBox = $this.find(".content_box2");
                var dataYear = dataSource[i].date.substring(0, 4);
                var dataMonth = dataSource[i].date.substring(5, 7);
                var dataDay = dataSource[i].date.substring(8, 10);
                var dataDate = parseInt(dataYear + dataMonth + dataDay);
                var calendarDays = parseInt($('.currentLists').attr('date'));
                if ($('.currentLists').hasClass(dataDate)) {
                    // var self = this;
                    // var $this = this.$ele;

                    var dataPrice = "<span class='price'>" + "$" + dataSource[i].price + "起" + "</span>";
                    var dataStatus = "<span class='dataStatus'>" + dataSource[i].status + "</span>";

                    var li_right = "<div class='li_right'><span class='dataStatus'>" + dataSource[i].status + "</span><span class='price'>" + "$" + dataSource[i].price + "起" + "</span></div>";
                    var li_left = "<div class='li_left'></div>";
                    var li_middle = "<div class='li_middle'><span>" + "可賣:" + dataSource[i].availableVancancy + "</span><span>" + "團位:" + dataSource[i].totalVacnacy + "</span><div class='lb_gpls'>行程一</div></div>";
                    // var dataAvailable="<span>"+"可賣:"+dataSource[i].availableVancancy+"</span>";
                    // var dataTotal="<span>"+"團位:"+dataSource[i].totalVacnacy+"</span>";


                    $('.calendar_list .' + dataDate + '').addClass('daysWithData').removeClass('hideData');
                    $('.calendar_list .' + dataDate + '').append(li_middle, li_right);
                    // $('.'+dataDate+'').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if (dataSource[i].status === '額滿' || dataSource[i].status === '截止' || dataSource[i].status === '後補') {
                        $('.calendar_list .' + dataDate + ' .dataStatus').addClass('dataStatus_Or');
                    };
                    if (dataSource[i].status === '報名' || dataSource[i].status === '預定') {
                        $('.calendar_list .' + dataDate + ' .dataStatus').addClass('dataStatus_Gr');
                    };
                };
                //日期對上星期幾!!!!
                var listDay = new Date(dataYear + "," + dataMonth + "," + dataDay);
                var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
                var weekdayHtml = "<span>" + weekdays[listDay.getDay()] + "</span>";
                $('.calendar_list .' + dataDate + ' .li_left .dayDate').append(weekdayHtml);
                //日期對上星期幾!!!
            };
            ///日期選擇function
            $('.daysWithData').on('click', function () {
                $('.daysWithData').removeClass('daySelected');
                $(this).addClass('daySelected');
            });
            $(".hideData").remove();
            // }); 
            // this.getWeekday();      
        }
    }, {
        key: "getWeekday",
        value: function getWeekday() {
            // var listDate=$('.currentLists').attr('date');
            // console.log('')
            // console.log('getWeekday work'+listDate);
        }
    }, {
        key: "bornCalendar",
        value: function bornCalendar(dataSource) {
            // $.ajax({
            //         dataType: "json",
            //         method: 'GET',
            //         url: './json/data2.json',
            //     }).done(function(dataSource) {
            //     dataSource = dataSource.sort(function (a, b) {
            //          return a.date > b.date ? 1 : -1;//資料依照日期排序       
            //     });//將dataSource按照日期排序,由前至後(2016年開始)

            //     //篩選日期重複的資料!!!!!!!!!!!!!!!
            //         var lookup = {};
            //         var items = dataSource;
            //             var dataSource = [];

            //             for (var item, i = 0; item = items[i++];) {
            //               var date = item.date;
            //               var statusChange=(item.state||item.status);
            //               delete(item.state||item.status);
            //               item.status= statusChange;

            //               var totalChange=(item.totalVacnacy||item.total);
            //               delete(item.totalVacnacy||item.total);
            //               item.totalVacnacy=totalChange;

            //               var availableChange=(item.onsell||item.availableVancancy);
            //               delete(item.onsell||item.availableVancancy);
            //               item.availableVancancy= availableChange;


            //               if (!(date in lookup)) {
            //                 lookup[date] = 1;
            //                 dataSource.push(item);
            //             }
            //         }
            // console.log(dataSource);
            //篩選日期重複的資料!!!!!!!!!!!!!!!

            var self = this;
            var $this = this.$ele; //class="calendar"
            var today = new Date();
            // var year = today.getFullYear();      //本年
            // var month = today.getMonth() + 1;    //本月
            var year = parseInt($(".currentMonth").attr('data-label').substring(0, 4)); //本年 抓取currentMonth所代表的年分
            var month = parseInt($(".currentMonth").attr('data-label').substring(4, 10)); //本月 抓取currentMonth所代表的月份
            var day = today.getDate(); //本日
            //本月第一天是星期几（距星期日离开的天数）
            var startDay = new Date(year, month - 1, 1).getDay();
            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
            var nDays = new Date(year, month, 0).getDate();
            //开始画日历
            var numRow = 0; //记录行的个数，到达7的时候创建tr
            var i; //日期
            var html = '';
            html += '<table id="Body"><tbody>';
            //第一行
            html += '<tr>';
            for (i = 0; i < startDay; i++) {
                html += '<td class="disabled"></td>';
                numRow++;
            };
            for (var j = 1; j < 37; j++) {
                //為什麼是37啊!!!!!!!!!!!!!!!!!
                //如果是今天则显示红色
                if (j == day) {
                    html += '<td class="currentDays ' + year + '0' + month + '0' + j + '" date="' + year + month + j + '">';
                    html += j; //开始加日期
                } else if (j !== day && j <= nDays) {
                    if (j < 10 && month < 10) {
                        html += '<td class="currentDays ' + year + '0' + month + '0' + j + '" date="' + year + '0' + month + '0' + j + '">';
                        html += j;
                    } else if (j >= 10 && month < 10) {
                        html += '<td class="currentDays ' + year + '0' + month + j + '" date="' + year + month + j + '">';
                        html += j;
                    } else if (j < 10 && month >= 10) {
                        html += '<td class="currentDays ' + year + month + '0' + j + '" date="' + year + month + j + '">';
                        html += j;
                    } else {
                        html += '<td class="currentDays ' + year + month + j + '" date="' + year + month + j + '">';
                        html += j;
                    } //开始加日期
                } else {
                    html += '<td class="disabled">';
                }
                html += '</td>';
                numRow++;
                if (numRow == 7) {
                    //如果已经到一行（一周）了，重新创建tr
                    numRow = 0;
                    html += '</tr><tr>';
                }
            };
            html += '</tbody></table>';
            document.getElementById("mainCalendar").innerHTML = html;

            var NumOfJData = dataSource.length;
            for (i = 0; i < NumOfJData; i++) {
                var self = this;
                var $this = this.$ele;
                // var $smallBox = $this.find(".content_box2");
                var dataYear = dataSource[i].date.substring(0, 4);
                var dataMonth = dataSource[i].date.substring(5, 7);
                var dataDay = dataSource[i].date.substring(8, 10);
                var dataDate = parseInt(dataYear + dataMonth + dataDay);
                var calendarDays = parseInt($('.currentDays').attr('date'));
                if ($('.currentDays').hasClass(dataDate)) {
                    // var self = this;
                    // var $this = this.$ele;
                    var dataPrice = "<p class='price'>" + "$" + dataSource[i].price + "起" + "</p>";
                    var dataStatus = "<p class='dataStatus'>" + dataSource[i].status + "</p>";
                    var dataAvailable = "<p>" + "可賣:" + dataSource[i].availableVancancy + "</p>";
                    var dataTotal = "<p>" + "團位:" + dataSource[i].totalVacnacy + "</p>";
                    $('.calendar_weeksWrap .' + dataDate + '').addClass('daysWithData');
                    $('.calendar_weeksWrap .' + dataDate + '').append(dataStatus, dataAvailable, dataTotal, dataPrice);
                    if (dataSource[i].status === '額滿' || dataSource[i].status === '截止' || dataSource[i].status === '後補') {
                        $('.' + dataDate + ' .dataStatus').addClass('dataStatus_Or');
                    };
                    if (dataSource[i].status === '報名' || dataSource[i].status === '預定') {
                        $('.' + dataDate + ' .dataStatus').addClass('dataStatus_Gr');
                    };
                }
            };
            ///日期選擇function
            $('.daysWithData').on('click', function () {
                $('.daysWithData').removeClass('daySelected');
                $(this).addClass('daySelected');
            });
            //
            // });       
        }
    }, {
        key: "nextMonth",


        // 下一個有資料的月份
        value: function nextMonth() {
            return this;
        }

        // 上一個有資料的月份

    }, {
        key: "prevMonth",
        value: function prevMonth() {
            return this;
        }

        // 切換日曆或列表模式

    }, {
        key: "switch",
        value: function _switch() {
            $('.switchMode').on('click', function () {
                $('.calendar_weeksWrap').toggleClass('hide');
                $('.calendar_list').toggleClass('hide');
            });
            return this;
        }

        // 加資料時如果有相同日期的資料，以後輸入為主，輸入時如果輸入沒有的月份，模組會加上該月份

    }, {
        key: "inputData",
        value: function inputData() {
            return this;
        }

        // 重設資料時，月曆、tab重新產出

    }, {
        key: "resetData",
        value: function resetData() {
            return this;
        }

        // destroy calendar，destroy時連class new出來的實例物件也要刪除

    }, {
        key: "destroy",
        value: function destroy() {
            return this;
        }
    }]);

    return Module;
}();

;

exports.ModuleName = ModuleName;
exports.ModuleDefaults = ModuleDefaults;
exports.ModuleReturns = ModuleReturns;
exports.Module = Module;

/***/ })
/******/ ]);