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
    console.log('all modules loaded!');
});