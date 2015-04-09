/*! Ling 09-04-2015 */
define(['jQuery'], function($) {
    console.log('this is module counter!');
    console.log($);
    $.fn.counter = function(opts) {
        var innerHTML = '<span class="decor top"></span><span class="decor bottom"></span><span class="from top"><span></span><span class="shadow"></span></span><span class="from bottom"><span></span><span class="shadow"></span></span><span class="to top"><span></span><span class="shadow"></span></span><span class="to bottom"><span></span><span class="shadow"></span></span>';
        var self = $(this);
        self.html(innerHTML);
        var counter = self.data('counter') || opts.counter || 60,
            intval = (self.data('intval') || opts.intval || 1) * 1000,
            step = self.data('step') || opts.step || 1,
            loop = self.data('loop') || opts.loop || false,
            top = self.data('top') || opts.top,
            firstIntval = (self.data('firstIntval') || opts.firstIntval || intval) * 1000;

        var firstFlag = true;
        var getSec = getNumFunc(counter, top, step, loop);

        (function calcValues() {
            var _oldSec = getSec(false);
            var _newSec = getSec(true);
            //console.log(_newSec, _oldSec);

            self.find('.to')
                .addClass('hide')
                .removeClass('to')
                .addClass('from')
                .removeClass('hide')
                .addClass('n')
                .find('span:not(.shadow)').each(function (i, el) {
                    $(el).text(_newSec);
                });

            self.find('.from:not(.n)')
                .addClass('hide')
                .addClass('to')
                .removeClass('from')
                .removeClass('hide')
                .find('span:not(.shadow)').each(function (i, el) {
                    $(el).text(_newSec);
                });

            self.find('.n').removeClass('n');
            if(_newSec > 0 || (_newSec <= 0 && loop))
                setTimeout(calcValues, firstFlag ? firstIntval : intval);
            firstFlag = false;
        })();


        /**
         * 1. 输入开始的数字start
         * 2. 每次获取都-1或者-intval
         * 3. <=0时 如果loop恢复到top, 否则返回0
         * @param start
         * @param top
         * @param isLoop
         */
        function getNumFunc(start, top, step, isLoop){
            top = top || start;
            var num = start;
            return function(next){
                if(next) num -= step;
                if(num < 0){
                    num = isLoop ? num + top : 0;
                }
                return num;
            }
        }
    };


    //$(function(){
    //    //#day, #hour, #minute,
    //    $('#sec').each(function(i, node){
    //        $(node).counter();
    //    });
    //});


    var END_DATE = '2015-05-16 10:00:00',
        timestamp_end = parseInt(new Date(END_DATE).getTime()) / 1000,
        now = parseInt(new Date().getTime() / 1000),
        time_intval = timestamp_end - now;
    var day, hour, minute, second;
    if(time_intval <= 0){
        day = hour = minute = second = 0;
    }else{
        day = parseInt(time_intval / 86400);
        hour = parseInt((time_intval - day * 86400 ) / 3600);
        minute = parseInt((time_intval - day * 86400 - hour * 3600) / 60);
        second = parseInt(time_intval - day * 86400 - hour * 3600 - minute * 60);
        //console.log(day, hour, minute, second);
        $('#sec').counter({
            counter: second,
            intval: 1, //单位是秒
            loop: true,
            top: 60,
            firstIntval: 1
        });
        $('#minute').counter({
            counter: minute,
            intval: 60,
            loop: true,
            top: 60,
            firstIntval: second
        });
        $('#hour').counter({
            counter: hour,
            intval: 60 * 60,
            loop: true,
            top: 24,
            firstIntval: minute * 60 + second
        });
        $('#day').counter({
            counter: day,
            intval: 60 * 60 * 24,
            loop: false,
            firstIntval: hour * 3600 + minute * 60 + second
        });
    }


});