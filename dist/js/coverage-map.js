$(document).ready(function() {
	//MAP
	ymaps.ready(initMap);

	
});


function initMap() {
	if ($('#coverage-map').length>0) {
		var icon = "img/content/label.png";

		destinations = {
            'Минск': [53.9045398,27.5615244],
            'Брест': [52.0976214, 23.7340503],
            'Витебск': [55.1848061, 30.201622],
            'Гродно': [53.6693538, 23.8131306],
            'Гомель': [52.4411761, 30.9878461]
        };

		var myMap = new ymaps.Map("coverage-map", {
	        center: destinations['Минск'],
	        zoom: 11,
	        controls: []
	    }); 
	            
	    var myPlacemark = new ymaps.Placemark([53.9045398,27.5615244],{
            	// balloonContentBody: 'Санкт-Петербург, ул. Седова, дом 11',
            },{
            // iconLayout: 'default#image',
            // iconImageHref: icon, 
            // iconImageSize: [50, 70],
            // iconImageOffset: [-25, -65]
    	});    

        //myMap.geoObjects.add(myPlacemark)

		myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 50 }}}));
        myMap.behaviors.disable('scrollZoom');
 

	    $('#js-toggle-map').on('change', function(){
		  	var city = $(this).find(":selected").val();
		  	//console.log(city);

		  	myMap.panTo(destinations[city], {
	            flying: false,
	        });
		});
    };
}