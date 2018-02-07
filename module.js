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
            console.log(ModuleDefaults.dataSource);
            console.log('moduleIn!!!!');
            this.creatHtml();
            this.getAjax();

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
            var calendarHtml = '<div class="calendars_tabWrap">' + '<div class="ntb_gpbt yellow">' + '<a href="#" class="prev on">' + '</a>' + '<ul class="ntb_tab">' + '<li class="tab">' + '<a href="#">' + '<span>' + '2017 7月' + '</span>' + '</a>' + '</li>' + '<li class="tab">' + '<a href="#">' + '<span>' + '2017 8月' + '</span>' + '</a>' + '</li>' + '<li class="tab">' + '<a href="#">' + '<span>' + '2017 9月' + '</span>' + '</a>' + '</li>' + '</ul>' + '<a href="#" class="next on">' + '</a>' + '</div>' + '</div>' + '<div class="calendars_weeksWrap">' + '</div>'; //要記得用"+"連起來呦
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
    }, {
        key: "getAjax",
        value: function getAjax() {
            var self = this;
            var $this = this.$ele; //class="calendar"
            $.ajax({
                dataType: "json",
                method: 'GET',
                url: './json/data4.json'
            }).done(function (dataSource) {
                // alert(dataSource[0]);
                dataSource = dataSource.sort(function (a, b) {
                    return a.date > b.date ? 1 : -1;
                }); //將dataSource按照日期排序,由前至後(2016年開始);

                // var startDate = new Date("2017/01/01");
                // var endDate = new Date("2018/06/06");
                // var dataSource=dataSource.filter( startDate > dataSource.date && dataSource.date > endDate);

                self.creatCalendar(dataSource);
                var NumOfJData = dataSource.length;
                for (var i = 0; i < NumOfJData; i++) {
                    console.log(dataSource[i].date);
                };
                console.log(NumOfJData);
            });
            return this;
        }
    }, {
        key: "creatCalendar",
        value: function creatCalendar(dataSource) {
            var self = this;
            var $this = this.$ele; //class="calendar"
            var calendarHtml = '<table class="weekTable">' + '<thead>' + '<tr class="week">' + '<th>' + '星期日' + '</th>' + '<th>' + '星期一' + '</th>' + '<th>' + '星期二' + '</th>' + '<th>' + '星期三' + '</th>' + '<th>' + '星期四' + '</th>' + '<th>' + '星期五' + '</th>' + '<th>' + '星期六' + '</th>' + '</tr>' + '</thead>' + '<tbody>' + '<tr class="days">' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + //將Ajax抓的data(dataSource)作為參數傳入
            '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + dataSource[0].price + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + dataSource[1].price + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + dataSource[2].price + '</div>' + '</td>' + '</tr>' + '<tr class="days">' + '<td class="currentDays">' + '<div class="day otherMonth">' + dataSource[2].price + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '</tr>' + '<tr class="days">' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '</tr>' + '<tr class="days">' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '</tr>' + '<tr class="days">' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '</tr>' + '<tr class="days">' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="currentDays">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '<td class="disabled">' + '<div class="day otherMonth">' + '</div>' + '</td>' + '</tr>' + '</tbody>' + '</table>';
            $this.find('.calendars_weeksWrap').append(calendarHtml);
            return this;
        }
        // 下一個有資料的月份

    }, {
        key: "nextMonth",
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