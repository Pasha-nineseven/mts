(function ($) {
    jQuery.expr[':'].Contains = function(a,i,m){
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };
    function filterList(header, list) {
        var form = $(".map-change-form"),
            input = $(".map-change-salon__input");

        $(input)
        .change( function () {
            var filter = $(this).val();
            if(filter) {
                $matches = $(".salon-select__item").find('.salon-select__title:Contains(' + filter + ')').parent();
                $('.salon-select__item', list).not($matches).fadeOut(100);
                $matches.slideDown();
            } else {
                $(list).find(".salon-select__item").fadeIn(100);
            }

            

            setTimeout(function(){
                var citiesCount = $('.salon-select__item:visible').length;
                //console.log(citiesCount);
                $('.salon-select__count span').text(+citiesCount);

                $('.salon-select__count i').text(num2str(+citiesCount, ['офис', 'офиса', 'офисов']));
            }, 300);

            toggleSubmit(this);

            return false;
        })
        .keyup( function () {
            $(this).change();

            setTimeout(function(){
                var citiesCount = $('.salon-select__item:visible').length;
                //console.log(citiesCount);
                $('.salon-select__count span').text(+citiesCount);

                $('.salon-select__count i').text(num2str(+citiesCount, ['офис', 'офиса', 'офисов']));
            }, 300);

            toggleSubmit(this);
             
        })
        .blur(function(){   
            toggleSubmit(this);               
        });
    }
    $(function () {
        filterList($(".map-change-form"), $(".salon-select__list"));
    });
}(jQuery));

function toggleSubmit(input){
    if( !input.value ) {
        $('.map-change-salon__submit').show();
    } else {
        $('.map-change-salon__submit').hide();
    } 
}

function num2str(n, text_forms) {
    n      = Math.abs(n) % 100;
    var n1 = n % 10;
    
    if (n > 10 && n < 20) {
        return text_forms[2];
    }
    
    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }
    
    if (n1 == 1) {
        return text_forms[0];
    }
    
    return text_forms[2];
}