$(document).ready(function() {
	flexibility(document.documentElement);
	// $("body").on("click", ".test", function(e){
	// 	e.preventDefault();
	// })

	// if ($('.masking-svg').length>0) {
	// 	var $masking_svg = $('.masking-svg').drawsvg({
	//       	duration: 3000,
	//       	easing: 'linear'
	//     });

	// 	$masking_svg.drawsvg('animate');
	// }

	if (window.location.hash === '#msg') {
	    $.magnificPopup.open({
			items: {
			    src: '#msg'
			},
			type: 'inline',
			removalDelay: 500,
			fixedContentPos: false,
			callbacks: {
				// beforeOpen: function() {
				// 	this.st.mainClass = this.st.el.attr('data-effect');
				// },
				open: function(){
					$('body').addClass('noscroll');
			    },
			    close: function() {
	                 $('body').removeClass('noscroll');
	            }
			},
		});
	}


	if ( $('.info-item__media').length ){
		$('.info-item__media').each(function (i) {
			$(this).paintBrush({
				ratioSpeed: 4,
				ratioRadius: 15,
			});
		});

	}


	//TOP SUBMENU
	$("body").on("click", ".js-top-links__link--submenu", function(e){
		e.preventDefault();
		$('.top-links__submenu').fadeOut(200);
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
                    breakpoint: 650,
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
	});

	$("body").on("click", ".toggle-all", function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.accordeon__item').toggleClass('active');
		$('.accordeon__info').slideToggle();
	});

	$("body").on("click", ".accordeon-inner__question", function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.accordeon-inner__answer').slideToggle();
	});

	//MENU-MOBILE
    $('body').on('click','.js-menu-btn', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.menu-mobile').toggleClass('active');
		$('.menu-mobile__bg').fadeToggle();
		$('body').toggleClass('fixed');
	});

	$('body').on('click','.menu-mobile__bg', function(e){
		e.preventDefault();
		$('.menu-btn').removeClass('active');
		$('.menu-mobile').removeClass('active');
		$(this).fadeOut();
		$('body').removeClass('fixed');
	});

	//FOOTER-MENU-MOBILE
	var $select = $('<select class="fs"></select>');
	$('.page-footer-menu-box').prepend($select);
	$('a.page-footer-menu__title').each(function(){
	  	var $anchor = $(this);
	  	var $option = $('<option></option>');
	  	$option.val($anchor.attr('data-title'));
	  	$option.text($anchor.text());
	  	$select.append($option);
	});
	$select.change(function(){
	  	$('.page-footer-menu__list').hide();
    	$('#' + $(this).val()).show();
	  	console.log($select.val());
	});

	//SELECT-CUSTOM
	if ($('.fs').length>0) {
		setTimeout(function() {
		 	$('.fs').styler();
		}, 100)
		
	}

	//TOOLTIP
	if ($('.tooltip').length>0) {
		$('.tooltip').tooltipster({
			animation: 'fade',
   			delay: 100,
		});
	};
	if ($('.tooltip-content').length>0) {
		$ ( '.tooltip-content' ). tooltipster ({ 
    		functionInit : function ( instance , helper ) { var content = $ ( helper . origin ). find ( '.tooltip_content' ). detach (); 
        		instance . content ( content );
        	},
        	distance: 0,
        	contentAsHTML:true,
        	interactive: true,
        });
	};



	//PHONE-MASK
	if ($('.js-mask').length>0) {
		$(".js-mask").mask("(99) 9-99-99-99");
	};


	//FILE-UPLOAD
	//if ($('.input-file')>length>0) {
		$('.input-file').on('change', function (event) {
		    var file = this.files[0];
		    if(file){
				$('.button').remove();
		        $(this).siblings('.input-file-text')
		        	.html(
		        		this.value.replace(/C:\\fakepath\\/i, '')
		        		+ ' ('
		        		+ Number(file.size/1024/1024).toPrecision(2)
		        		+ 'Mb)'
		    		)
		    }else{
		        $(this).siblings('.input-file-text').html('Прикрепить документ').removeClass('active');
		    }
		});
	//}


	//MOBILE-TARIFF ACCORDEON
	$("body").on("click", ".tariff-mobile__link", function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.tariff-mobile__toggle').slideToggle();
	})

	mainNewsSliderStart();
	mainHitSliderStart();


	$('.js-popup-inline').magnificPopup({
		type: 'inline',
		removalDelay: 500,
		fixedContentPos: false,
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			},
			open: function(){
				$('body').addClass('noscroll');
		    },
		    close: function() {
                 $('body').removeClass('noscroll');
            }
		},
	});
});


//ACTION-TABS
$('.actions-filter__item').click(function(e){
	e.preventDefault();
	var tab_id = $(this).attr('data-tab');

	$('.actions-filter__item').removeClass('active');
	$('.tab-content').removeClass('active');

	$(this).addClass('active');
	$("#"+tab_id).addClass('active');
});


//MAIN TABS
$(function() {
  	var $tabButtonItem = $('.tab-button li'),
      	$tabSelect = $('#tab-select'),
      	$tabContents = $('.tab-contents'),
      	activeClass = 'is-active';

	$tabButtonItem.first().addClass(activeClass);
	$tabContents.not(':first').hide();

	$tabButtonItem.find('a').on('click', function(e) {
	    var target = $(this).attr('href');

	    $tabButtonItem.removeClass(activeClass);
	    $(this).parent().addClass(activeClass);
	    $tabSelect.val(target);
	    $tabContents.hide();
	    $(target).show();
	    e.preventDefault();
	});

	$tabSelect.on('change', function() {
	    var target = $(this).val(),
	        targetSelectNum = $(this).prop('selectedIndex');

	    $tabButtonItem.removeClass(activeClass);
	    $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
	    $tabContents.hide();
	    $(target).show();
	});


	if ($( ".js-input-date" ).length>0) {
		$( ".js-input-date" ).datepicker({
			dateFormat : "dd.mm.yy",
			minDate: new Date($('#hiddendelivdate').val()),
			monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		});
	}


	//MOBILE-SEARCH
	$("body").on("click", ".menu-mobile-top-search__link", function(e){
		e.preventDefault();
		$('.menu-mobile-top-search__form').slideToggle();
	});

	//MOBILE SUBMENU
	$("body").on("click", ".js-submenu-link", function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.mobile-submenu').slideToggle(200);
	});

	






	//MOBILE-ASIDE-TOGGLE
	$("body").on("click", ".js-page-aside-mobile__toggle", function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.page-aside-mobile__list').slideToggle();
	});
});



$(window).resize(function () {
	mainNewsSliderStart();
	mainHitSliderStart();
});

// $(window).load(function(){

// });


// functions
$(function(){
    $('.tab-select-outer-single select').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });
});

function mainNewsSliderStart() {
	var $m_a = $('.main-actions__slider');
	if ($('.main-actions__slider').length>0) {
		if($(window).width() < 750) {
			$m_a.not('.slick-initialized').slick({
			  	infinite: true,
			  	slidesToShow: 1,
	            slidesToScroll: 1,
	            arrows: false,
	            lazyLoad: 'progressive',
	            useTransform:true,
	            "accessibility": false,
	            infinite:true,
	            dots:true,
			});
		} else{
			if($m_a.hasClass('slick-initialized')) {
				$m_a.slick("unslick");
			}
		}
	}
}

function mainHitSliderStart() {
	var $m_a = $('.main-hit__slider');
	if ($('.main-hit__slider').length>0) {
		if($(window).width() < 1024) {
			$m_a.not('.slick-initialized').slick({
			  	infinite: true,
			  	slidesToShow: 2,
	            slidesToScroll: 1,
	            arrows: false,
	            lazyLoad: 'progressive',
	            useTransform:true,
	            "accessibility": false,
	            infinite:true,
	            dots:true,
	            responsive: [
				    {
				      breakpoint: 650,
				      settings: {
				        slidesToShow: 1,
	            		slidesToScroll: 1,
				      }
				    },
				]
			});
		} else{
			if($m_a.hasClass('slick-initialized')) {
				$m_a.slick("unslick");
			}
		}
	}
}


function isScrolledIntoView(elem){
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


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
		<li><a href="text-aside.html">Text-aside</a></li> \
		<li><a href="text.html">Text</a></li> \
		<li><a href="text2.html">Text-2</a></li> \
		<li><a href="text3.html">Text-3</a></li> \
		<li><a href="action1.html">Action-1</a></li> \
		<li><a href="action2.html">Action-2</a></li> \
		<li><a href="forma-fiz.html">Forma fiz</a></li> \
		<li><a href="map-coverage.html">Map-coverage</a></li> \
		<li><a href="map-salon.html">Map-salon</a></li> \
		<li><a href="country-list.html">Country-list</a></li> \
		<li><a href="country.html">Country</a></li> \
		<li><a href="tarify.html">Tarify</a></li> \
		<li><a href="tariff.html">Tariff1</a></li> \
		<li><a href="tariff2.html">Tariff2</a></li> \
		<li><a href="step1.html">Step1</a></li> \
		<li><a href="step2.html">Step2</a></li> \
		<li><a href="step3.html">Step3</a></li> \
		<li><a href="services.html">Services</a></li> \
		<li><a href="index.html">Index</a></li> \
	</ol> \
</div>');
