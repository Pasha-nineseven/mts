$(document).ready(function() {
	//MAP
	ymaps.ready(initMap);
});


function initMap() {
	if ($('#step-map').length>0) {
		var icon = "img/content/с-label.png";

		var myMap = new ymaps.Map("step-map", {
	        center:[53.9045398,27.5615244],
	        zoom: 11,
	        controls: []
	    }); 
	            
	    var myPlacemark = new ymaps.Placemark([53.9045398,27.5615244],{
            	// balloonContentBody: 'Адрес',
            },{
            iconLayout: 'default#image',
            iconImageHref: "img/content/c-label.png", 
            iconImageSize: [36,53],
            iconImageOffset: [-17, -48]
    	}); 

        var clusterIcons=[{
			href:'img/content/cluster.png',
			size:[36,53],
			offset:[-17, -48]
		}],

		clusterer = new ymaps.Clusterer({
			clusterIcons:clusterIcons,
		    gridSize: 64, 
		    groupByCoordinates: false,
		    hasBalloon: false,
		    margin: 10,
		    maxZoom: 10,
		    minClusterSize: 2,
		    showInAlphabeticalOrder: false,
		    viewportMargin: 128,
		    zoomMargin: 0, 
		    clusterDisableClickZoom: true 
		}),
		 
		getPointData = [
			{balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>'},
			{balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>'},
			{balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>'},
			{balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>'},
			{balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>'},
			{balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>'},
		],
		 
		getPointOptions = function () {
			return {
				//preset: 'islands#redDotIcon'
				iconLayout: 'default#image',
	            iconImageHref: "img/content/c-label.png", 
	            iconImageSize: [36,53],
            	iconImageOffset: [-17, -48]
			};
		},
		 
		points = [[53.93850609, 27.664864554],[53.9045398,27.5615244],[53.87621345,27.1375208],[53.8859275,27.63224889],[53.92759137,27.56272603],[53.96537647,27.51842159],],
		geoObjects = [];
		 
		for(var i = 0, len = points.length; i < len; i++) {
			geoObjects[i] = new ymaps.Placemark(points[i], getPointData[i], getPointOptions());
		}
		 

		myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 50 }}}));
    	myMap.behaviors.disable('scrollZoom');
		 
		clusterer.add(geoObjects);
		myMap.geoObjects.add(clusterer);

    };
}