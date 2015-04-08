/**
 * Created by Liuchenling on 4/9/15.
 */
require.config({
    baseUrl: "lib",
    shim: [

    ]
});

require(['counter'], function() {
    console.log('all modules loaded!');
});