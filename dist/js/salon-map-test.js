$(document).ready(function() {
	//MAP
	if($('#salon-map').length){
		ymaps.ready(initPharmaciesListMap);

		//Показать Количество
		var citiesCount = cities.length;
		$('.salon-select__count span').text(+citiesCount);
	}

});

// Карта списка аптек
function initPharmaciesListMap() {

	// Создание экземпляра карты.
	var myMap = new ymaps.Map('salon-map', {
			center: [52.110080, 23.670247],
			zoom: 13,
			controls: []
	}); 
	// Контейнер для меню.
	list = $('.salon-select__list');
	
	for (var i = 0; i < cities.length; i++) {
		createSelectCities(cities[i]);
	}

	for (var j = 0; j < cities.length; j++) {
		createList(cities[j], cluster, list);
	}

	if ($(window).width() <= 1023)
		myMap.setCenter([52.093904, 23.704880]);

	function createSelectCities () {
		// Кластер для геообъектов группы
		cluster = new ymaps.Clusterer({
			clusterDisableClickZoom: false,
			gridSize: 64,
			clusterIcons: [{
				href:'img/content/cluster.png',
				size:[36,53],
				offset:[-17, -48]
			}],
			clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
				'<div style="font-size: 13px; line-height: 42px; color: #FFFFFF; text-align: center">{{ properties.geoObjects.length }}</div>'),
		});
		// Добавляем кластер на карту.
		myMap.geoObjects.add(cluster);

		//Создаем список меток
		// for (var j = 0; j < cities.length; j++) {
		// 	createList(cities[j], cluster, list);
		// }
	}

	// Создаем список
	function createList (item, cluster, list) {
		if(item.metro)
			metroDiv = '<div class="salon-select__metro">' + item.metro + '</div>';

		// Создаем единицу списка
		var listItem = $('<a href="#" class="salon-select__item" data-city="' + item.city + '" data-id="' + item.id + '">\
							  	<div class="salon-select__title">' + item.city + ', ' + item.address + '</div>' + metroDiv +'\
							  	<div class="salon-select__time">'+ item.time +'</div>\
						  </a>'
		),
		
		// Создание макета содержимого балуна.
		balloonContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="ph-balloon">\
				<div class="label-time">' + item.time + '</div>\
				<div class="label-address">' + item.city + ', ' + item.address + '</div>' + metroDiv +'\
			</div>'
		),

		//Вид иконок для меток
		defaultOptions = {
			balloonContentLayout: balloonContentLayout,
			balloonPanelMaxMapArea: 0,
			iconLayout: 'default#image',
			iconImageHref: item.iconWay,
			iconImageSize: [36, 53],
    		iconImageOffset: [-17, -48],
    		id: item.id,
		},
		
		// Создаем метку
		placemark = new ymaps.Placemark(item.center, {
		}, defaultOptions);

		// Добавляем метку в кластер
		cluster.add(placemark);
		// Добавляем города в список
		listItem.appendTo(list)
		// При клике по пункту списка показываем активную метку
		.bind('click', function (e) {
			e.preventDefault();

			var plPos = placemark.geometry.getCoordinates(),
			plPosOffset = [plPos[0] - 0.005, plPos[1] - 0.04],
			clusterObjects = cluster.getGeoObjects();

			if (myMap.balloon.isOpen()) {
				myMap.balloon.close();
			}


			//Открываем балун
			setTimeout(function(){
			  	myMap.balloon.open(item.center,
			  		'<div class="ph-balloon">\
						<div class="label-time">' + item.time + '</div>\
						<div class="label-address">' + item.city + ', ' + item.address + '</div>\
						<div class="salon-select__metro">' + item.metro + '</div>\
					</div>', {
			        //closeButton: false
			    });
			}, 600);

			myMap.setCenter(plPosOffset, 13, {
				checkZoomRange: true,
				duration: 500
			});

			$('.salon-select__item').removeClass('active');
			$('[data-id='+item.id+']').addClass('active');



		});


		// myMap.events.add(['boundschange','datachange','objecttypeschange'], function(e){
		// 	console.log(placemark.length);
		// });

		mapBounds = myMap.getBounds();
		mapBotLeft = mapBounds[0],
		mapTopRight = mapBounds[1];

		console.log(mapBotLeft);
		console.log(mapTopRight);

		// Создаем прямоугольник с помощью вспомогательного класса.
		myRectangle = new ymaps.Rectangle([
		// Задаем координаты диагональных углов прямоугольника.
		mapBotLeft,
		mapTopRight
		], {
		//Свойства

		}, {
		// Опции.
		// Цвет и прозрачность заливки.
		fillColor: '#7df9ff33',
		// Дополнительная прозрачность заливки..
		// Итоговая прозрачность будет не #33(0.2), а 0.1(0.2*0.5).
		fillOpacity: 0.5,
		// Цвет обводки.
		strokeColor: '#0000FF',
		// Прозрачность обводки.
		strokeOpacity: 0.5,
		// Ширина линии.
		strokeWidth: 2,
		// Радиус скругления углов.
		// Данная опция принимается только прямоугольником.
		borderRadius: 6
		});
		myMap.geoObjects.add( myRectangle );







		// Вешаем обработчик на метку
		placemark.events.add('click', function (e) {
			console.log(item.id);

			$('.salon-select__item').removeClass('active');
			$('[data-id='+item.id+']').addClass('active');

			var activeEl = $('[data-id='+item.id+']');

		 	$('.salon-select__list').scrollTo(activeEl, {
			  	axis: 'y',
			  	duration: 100,
			});

		});
	}


	// Закрываем все балуны при клике по карте
	myMap.events.add('click', function() {
		myMap.balloon.close();
	});
	// Запрещаем зум скроллом
	myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 50 }}}));
    myMap.behaviors.disable('scrollZoom');

    //Показать все метки на карте
    myMap.setBounds(myMap.geoObjects.getBounds());

	// Запрещаем перетаскивание карты на телефоне(перетаскивание остается двумя пальцами)
	if ($(window).width() <= 767)
		myMap.behaviors.disable('drag');

	// Добавляем список
	list.appendTo($('.salon-select'));
}

