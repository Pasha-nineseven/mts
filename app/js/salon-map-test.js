$(document).ready(function() {
	//MAP
	if($('#salon-map').length)
		ymaps.ready(initPharmaciesListMap);


	// Настройки меток для одиночных карт
	var bigPlacemark = {
		iconLayout: 'default#image',
		iconImageHref: 'img/content/m-label.png',
		iconImageSize: [50, 70],
    	iconImageOffset: [-25, -65]
	},
	normalPlacemark = {
		iconLayout: 'default#image',
		iconImageHref: 'img/content/m-label.png',
		iconImageSize: [50, 70],
    	iconImageOffset: [-25, -65]
	};

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

	// listCount = cities.length;
	// console.log(listCount);
			
	for (var i = 0; i < cities.length; i++) {
		createSelectCities(cities[i]);
	}

	if ($(window).width() <= 1023)
		myMap.setCenter([52.093904, 23.704880]);

	function createSelectCities (group) {
			// Кластер для геообъектов группы
			cluster = new ymaps.Clusterer({
				clusterDisableClickZoom: false,
				gridSize: 64,
				preset: group.name,
				clusterIcons: [
				{
					href:'img/content/cluster.png',
					size:[36,53],
					offset:[-17, -48]
				}],
				clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
					'<div style="font-size: 13px; line-height: 42px; color: #FFFFFF; text-align: center">{{ properties.geoObjects.length }}</div>'),
				//clusterIconOffset: [-17, -48]
			});
			// Добавляем кластер на карту.
			myMap.geoObjects.add(cluster);

			//Создаем список меток
			for (var j = 0; j < group.items.length; j++) {
				createList(group.items[j], cluster, list);
				//console.log(group.items[j]);
			}
	}

	// Создаем список
	function createList (item, cluster, list) {

		// Создаем единицу списка
		var listItem = $('<a href="#" class="salon-select__item" data-city="' + item.city + '" data-id="' + item.id + '"><div class="salon-select__title">' + item.address + '</div><div class="ph-list__address">г. ' + item.city + ' </div><div class="ph-list__phones"><span>' + item.phone1 + ', </span></div>' + '</div><div class="ph-list__single-map" id="singleMap_' + item.id + '"></div></a>'),
		
		// Создание макета содержимого балуна.
		balloonContentLayout = ymaps.templateLayoutFactory.createClass(
		'<div class="ph-balloon"><h6>' + item.address + '</h6><div class="ph-balloon__address">г. ' + item.city + '</div><div class="ph-balloon__phones"><span>' + item.phone1 + ', </span></div>' + '</div></div>'),

		// Два вида иконок для меток
		defaultOptions = {
			balloonPanelMaxMapArea: 0,
			iconLayout: 'default#image',
			iconImageHref: 'img/content/m-label.png',
			iconImageSize: [50, 70],
        	iconImageOffset: [-25, -65]
		},
		activeOptions = {
			balloonContentLayout: balloonContentLayout,
			balloonPanelMaxMapArea: 0,
			iconLayout: 'default#image',
			iconImageHref: 'img/content/m-label.png',
			iconImageSize: [50, 70],
        	iconImageOffset: [-25, -65]
		},
		
		// Создаем метку
		placemark = new ymaps.Placemark(item.center, {
		}, defaultOptions);

		// Добавляем метку в кластер
		cluster.add(placemark);
		// Добавляем аптеку в список
		listItem.appendTo(list)
		// При клике по пункту списка показываем активную метку
		.bind('click', function (e) {
			e.preventDefault();
			var plPos = placemark.geometry.getCoordinates(),
					plPosOffset = [plPos[0] - 0.005, plPos[1] - 0.04],
					clusterObjects = cluster.getGeoObjects(),
					currentIcon = placemark._geoObjectComponent._options._options.iconImageHref;

					if (myMap.balloon.isOpen()) {
						myMap.balloon.close();
					}

					for (var o = 0; o < clusterObjects.length; o++) {
						if (clusterObjects[o]._geoObjectComponent._options._options.iconImageHref !== currentIcon) {
							clusterObjects[o].options.set(defaultOptions);
						}
					}

					placemark.options.set(activeOptions);

					myMap.setCenter(plPosOffset, 13, {
						checkZoomRange: true,
						duration: 500
					});

				return false;
		});

		// Вешаем обработчик на метку
		placemark.events.add('click', function (e) {
			var currentIcon = e.get('target')._geoObjectComponent._options._options.iconImageHref;

			for (var o = 0; o < cluster.getGeoObjects().length; o++) {
				if (cluster.getGeoObjects()[o]._geoObjectComponent._options._options.iconImageHref !== currentIcon) {
					cluster.getGeoObjects()[o].options.set(defaultOptions);
				}

			}
			//console.log(cluster.getGeoObjects()[0]);
			e.get('target').options.set(activeOptions);
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

