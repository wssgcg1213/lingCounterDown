/**
 * Created by Liuchenling on 4/9/15.
 */
require.config({
    baseUrl: "lib",
    paths: {
        'jQuery': 'jquery211'
    },
    shim: {
        'jQuery':{
            exports: '$'
        }
    }
});

require(['counter'], function() {
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

    console.log('all modules loaded!');
});