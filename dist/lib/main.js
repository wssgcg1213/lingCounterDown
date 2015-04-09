/*! Ling 09-04-2015 */
require.config({baseUrl:"lib",paths:{jQuery:"jquery211"},shim:{jQuery:{exports:"$"}}}),require(["counter"],function(){console.log("all modules loaded!")});