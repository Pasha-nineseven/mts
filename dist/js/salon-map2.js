// Группы объектов
var m_objects = [{
    items: [
        {
            center: [53.93850609, 27.664864554],
            name: "Минск, ул.Колесникова, 35",
            balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Колесникова, 35</div><div class="label-metro">м.Каменная горка</div>',
        },
        {
            center: [53.9045398,27.5615244],
            name: "Минск, ул.Бурдейного, 35, пом.7",
            balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Бурдейного, 35, пом.7</div><div class="label-metro">м.Каменная горка</div>',
        },
        {
            center: [53.87621345,27.1375208],
            name: "Минск, ул.Якуба Коласа, 5",
            balloonContentBody: '<div class="label-time">пн-вс 10:00-12:00</div><div class="label-address">Минск, ул.Якуба Коласа, 5</div><div class="label-metro">м.Каменная горка</div>',
        }
    ]
}];

ymaps.ready(init);

function init() {
    // Создание экземпляра карты.
    var myMap = new ymaps.Map("salon-map", {
        center:[53.9045398,27.5615244],
        zoom: 11,
        controls: []
    }); 
    // Контейнер для меню.
    var menu = $('<div class="salon-select__list"/>');
        
    for (var i = 0, l = m_objects.length; i < l; i++) {
        createMenuGroup(m_objects[i]);
    }

    function createMenuGroup (group) {
        // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, {}),

        // Добавляем коллекцию на карту.
            myMap.geoObjects.add(collection);
 
        for (var j = 0, m = group.items.length; j < m; j++) {
            createMenu(group.items[j], collection);
        }
    }

    function createMenu (item, collection) {
        // Пункт подменю.
        var menuItem = $('<a href="#" class="salon-select__item">' + item.name + '</a>'),
        // Создаем метку.
            placemark = new ymaps.Placemark(item.center, { 
                    balloonContent: item.balloonContentBody
                },{
                iconLayout: 'default#image',
                iconImageHref: "/img/content/c-label.png", 
                iconImageSize: [50, 70],
                iconImageOffset: [-25, -65]
            });

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        menuItem.appendTo(menu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
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
            });

            getPointOptions = function () {
                return {
                    //preset: 'islands#redDotIcon'
                    iconLayout: 'default#image',
                    iconImageHref: "/img/content/c-label.png", 
                    iconImageSize: [50, 70],
                    iconImageOffset: [-25, -65]
                };
            },
            geoObjects = [];
                 
            for(var i = 0, len = item.length; i < len; i++) {
                geoObjects[i] = new ymaps.Placemark(item[i].center, getPointOptions());
            };


            clusterer.add(geoObjects);
            myMap.geoObjects.add(clusterer);

            //console.log(geoObjects)
    }

    

    // Добавляем меню.
    menu.appendTo($('.salon-select'));
    // Выставляем масштаб карты чтобы были видны все группы.
    //myMap.setBounds(myMap.geoObjects.getBounds());

    

    myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 50 }}}));
    myMap.behaviors.disable('scrollZoom');
}