$(document).ready(function() {
	flexibility(document.documentElement);
	// $("body").on("click", ".test", function(e){
	// 	e.preventDefault();
	// })


	//TOP SUBMENU
	$("body").on("click", ".js-top-links__link--submenu", function(e){
		e.preventDefault();

		$(this).parents('.top-links__item--sub,.cabinet-toggle').find('.top-links__submenu').fadeToggle(200);
	});
	$(document).click(function (e){
		var div = $(".top-links__item--sub,.cabinet-toggle");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
			$('.top-links__submenu').fadeOut(100);
		}
	});


	//MAIN SLIDER
	if ($('.main-slider').length>0) {
		$('.main-slider').slick({
			// infinite: false,
			slidesToShow: 1,
			fade: true,
			lazyLoad: 'progressive',
			dots:true,
			useTransform:true,
			equalizeHeight: false,
			"accessibility": false,
			adaptiveHeight: true,
			nextArrow: $('.main-slider__right'),
  			prevArrow: $('.main-slider__left'),
  			responsive: [
			    {
			      	breakpoint: 768,
			      	settings: {
				        infinite: false,
						slidesToShow: 1,
						fade: true,
						lazyLoad: 'progressive',
						useTransform:true,
						"accessibility": false,
						nextArrow: $('.main-slider__right'),
			  			prevArrow: $('.main-slider__left'),
			  			dots:true,
			  			arrows:true,
			    	}
			    },
		    ]
		});
	}


	if ($('.main-news-slider').length>0) {
        $('.main-news-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: true,
            lazyLoad: 'progressive',
            useTransform:true,
            "accessibility": false,
            infinite:false,
            dots:true,
            appendArrows: '.slider-nav',
			appendDots: '.slider-nav',
            responsive: [
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    }



    //ACCORDEON
	$("body").on("click", ".accordeon__link", function(e){
		e.preventDefault();
		$(this).parents('.accordeon__item').toggleClass('active');
		$(this).next('.accordeon__info').slideToggle();
	})






	//MENU-MOBILE
    $('body').on('click','.js-menu-btn', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.menu-mobile').slideToggle();
		$('.menu-mobile__bg').fadeToggle();
	});

	$('body').on('click','.menu-mobile__bg', function(e){
		e.preventDefault();
		$('.menu-btn').removeClass('active');
		$('.menu-mobile').slideUp();
		$(this).fadeOut();
	});


	//FOOTER-MENU-MOBILE
	var $select = $('<select class="fs"></select>');
	$('.page-footer-menu-box').prepend($select);
	// Cycle over menu links
	$('a.page-footer-menu__title').each(function(){
	  	var $anchor = $(this);
	  	// Create an option
	  	var $option = $('<option></option>');
	  	// Deal with selected options depending on current page
	  	// if($anchor.hasClass('selected')) {
	   //  	$option.prop('selected', true);
	  	// }
	  	// $option.first().prop("selected", "selected");
	  	// Option's value is the href
	  	$option.val($anchor.attr('data-title'));
	  	// Option's text is the text of link
	  	$option.text($anchor.text());
	  	// Append option to <select>
	  	$select.append($option);
	});
	$select.change(function(){
	  	$('.page-footer-menu__list').hide();
    	$('#' + $(this).val()).show();
	  	console.log($select.val());
	});



	//SELECT-CUSTOM
	if ($('.fs').length>0) {
		$('.fs').styler();
	}

});




$(window).resize(function () {

});

// $(window).load(function(){

// });

// functions


// links pages
$('body').append(
	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
	<style> \
		#pages { padding: 10px 20px 0 50px; font-size: 18px; } \
		#pages a { text-decoration: none; } \
		#pages li { margin: 5px 0; } \
	</style> \
	<ol id="pages"> \
		<li><a href="text.html">Text</a></li> \
		<li><a href="index.html">Index</a></li> \
	</ol> \
</div>');
