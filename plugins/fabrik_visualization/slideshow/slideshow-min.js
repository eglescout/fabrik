/*! Fabrik */

var FbSlideshowViz=new Class({Implements:[Options],options:{},initialize:function(e,i){this.setOptions(i);var s={slidesToShow:1,slidesToScroll:1,autoplay:0!==this.options.slideshow_delay,autoplaySpeed:this.options.slideshow_delay,arrows:!0,dots:!1,cssEase:"linear",infinite:!0,speed:this.options.slideshow_duration},o=JSON.parse(this.options.slideshow_options);jQuery.extend(s,o);var t=jQuery(".slider");if(this.options.slideshow_thumbnails){jQuery.extend(s,{asNavFor:".slider-nav"}),t.slick(s),jQuery(".slider-nav").slick({slidesToShow:3,slidesToScroll:1,arrows:!0,dots:!0,centerMode:!0,focusOnSelect:!0,asNavFor:".slider"})}else{jQuery.extend(s,{}),t.slick(s)}t.on("wheel",function(e){e.preventDefault(),e.originalEvent.deltaY<0?jQuery(this).slick("slickNext"):jQuery(this).slick("slickPrev")}),jQuery(".slider_loading").hide(),t.slick("setPosition"),this.mediaScan()},mediaScan:function(){"undefined"!=typeof Slimbox&&Slimbox.scanPage(),"undefined"!=typeof Lightbox&&Lightbox.init(),"undefined"!=typeof Mediabox&&Mediabox.scanPage()}});