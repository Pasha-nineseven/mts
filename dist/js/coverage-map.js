$(document).ready(function() {
	//MAP
	ymaps.ready(initMap);
});


function initMap() {
	if ($('#coverage-map').length>0) {
		var icon = "img/content/label.png";

		var myMap = new ymaps.Map("coverage-map", {
	        center:[53.9045398,27.5615244],
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
        myMap.behaviors.disable('scrollZoom')     
    };
}