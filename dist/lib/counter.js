/*! Ling 09-04-2015 */
define(["jQuery"],function(a){console.log("counter module loaded!"),a.fn.counter=function(b){function c(a,b,c,d){b=b||a;var e=a;return function(a){return a&&(e-=c),0>e&&(e=d?e+b:0),e}}var d='<span class="decor top"></span><span class="decor bottom"></span><span class="from top"><span></span><span class="shadow"></span></span><span class="from bottom"><span></span><span class="shadow"></span></span><span class="to top"><span></span><span class="shadow"></span></span><span class="to bottom"><span></span><span class="shadow"></span></span>',e=a(this);e.html(d);var f=e.data("counter")||b.counter||60,g=1e3*(e.data("intval")||b.intval||1),h=e.data("step")||b.step||1,i=e.data("loop")||b.loop||!1,j=e.data("top")||b.top,k=1e3*(e.data("firstIntval")||b.firstIntval||g),l=!0,m=c(f,j,h,i);!function n(){var b=(m(!1),m(!0));e.find(".to").addClass("hide").removeClass("to").addClass("from").removeClass("hide").addClass("n").find("span:not(.shadow)").each(function(c,d){a(d).text(b)}),e.find(".from:not(.n)").addClass("hide").addClass("to").removeClass("from").removeClass("hide").find("span:not(.shadow)").each(function(c,d){a(d).text(b)}),e.find(".n").removeClass("n"),(b>0||0>=b&&i)&&setTimeout(n,l?k:g),l=!1}()}});