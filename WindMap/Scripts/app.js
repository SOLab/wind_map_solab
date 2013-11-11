$(function () {
    $(function () {
        
        setHeight();
        initMap();

        $(window).resize(function () {
            setHeight();
        });

        $('#myDropdown').ddslick({
            data: ddData,
            width: '100%',
            selectText: "Выберите ветрогенератор",
            truncateDescription: true,
            onSelected: function (data) {
                var val = +data['selectedData']['value'];
                $('.diameter').html(windTower[val]['diameter'] + ' м');
                $('.height').html(windTower[val]['height'] + ' м');
                $('.speed').html(windTower[val]['speed'] + ' м/с');
                $('.power').html(windTower[val]['power'] + ' МВт/год');
                $('.info').html(windTower[val]['info']);
            }
        });
    });
    function setHeight() {
        $('body').innerHeight($(window).height());
        $('#map').css({ 'min-height': $('body').height()*0.8 });
        $('#wrapper').css({ 'min-height': $('body').height()+5 });
        $('.container').css({ 'min-height': $('body').height() });
    }
    function initMap() {

        var map = new L.map("map").setView([60.0525, 28.4163], 8);
        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var legend = L.control({ position: 'bottomright' });

        var grades = ['0.0&ndash;4.0', '4.0&ndash;8.0', '8.0&ndash;12.0', '>12.0'],
            colors = ['#F1EEF6', '#BDC9E1', '#74A9CF', '#0570B0'],
            cities = ['Санкт-Петербург', 'Озерки', 'Выборг', 'Котка', 'Кунда'];
        var spb_point    = [59.9396, 30.3147],
            ozerki_point = [60.2098, 29.0181],
            vyborg_point = [60.7102, 28.7461],
            kotka_point  = [60.4681, 26.9459],
            kunda_point  = [59.4998, 26.5349];

        var arr1 = [[5, 10, 12, 30, 4, 6, 22, 20, 13, 2, 15, 4, 10, 2, 1, 3],
                    [11, 13, 10, 1, 8, 4, 3, 3, 6, 5, 0, 0, 1, 2, 7, 5],
                    [5, 1, 2, 0, 4, 0, 4, 0, 2, 6, 8, 0, 0, 4, 0, 0],
                    [0, 1, 2, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0]];
 
        var arr2 = [[11, 9, 13, 9, 11, 17, 12, 11, 7, 5, 9, 4, 4, 12, 16, 10],
                    [9, 5, 3, 7, 4, 1, 2, 1, 10, 4, 3, 2, 0, 5, 4, 3],
                    [1, 5, 4, 3, 1, 0, 3, 5, 0, 5, 1, 4, 0, 4, 5, 6],
                    [1, 0, 0, 0, 0, 4, 2, 2, 0, 3, 3, 1, 3, 3, 1, 1]];

        var arr3 = [[6, 13, 17, 26, 15, 22, 10, 17, 9, 5, 5, 4, 1, 1, 8, 15],
                    [4, 6, 8, 4, 5, 10, 5, 0, 2, 2, 3, 3, 5, 4, 3, 0],
                    [1, 6, 1, 0, 5, 1, 5, 1, 3, 4, 4, 2, 5, 5, 5, 3],
                    [0, 0, 0, 4, 1, 0, 0, 0, 3, 1, 3, 1, 2, 2, 3, 2]];

        var arr4 = [[8, 12, 5, 14, 8, 2, 15, 8, 11, 16, 10, 13, 8, 6, 21, 11],
                    [2, 0, 2, 1, 8, 8, 4, 10, 3, 2, 9, 4, 9, 8, 5, 2],
                    [1, 0, 1, 5, 1, 1, 6, 1, 1, 1, 1, 6, 2, 4, 2, 5],
                    [0, 3, 1, 0, 0, 2, 1, 4, 0, 1, 0, 0, 1, 0, 0, 2]];

         var arr5 = [[6, 9, 12, 5, 13, 19, 8, 6, 11, 16, 9, 11, 6, 9, 9, 13],
                     [1, 7, 0, 3, 8, 8, 1, 1, 10, 1, 6, 3, 0, 10, 1, 9],
                     [1, 0, 5, 1, 6, 4, 4, 3, 6, 0, 2, 4, 5, 5, 3, 6],
                     [2, 2, 0, 4, 0, 0, 2, 0, 1, 3, 1, 3, 1, 2, 0, 1]];

         legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info_legend legend');                
            div.innerHTML += '<p>Скорость ветра:</p>';
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    grades[i] + ' м/с<br>';
            }
            return div;
        }

        legend.addTo(map);

        var spb     = new L.layerGroup();
        var ozerki  = new L.layerGroup();
        var vyborg  = new L.layerGroup();
        var kotka   = new L.layerGroup();
        var kunda   = new L.layerGroup(); 

        windRouse(arr1, spb_point, spb, cities[0]);
        windRouse(arr2, ozerki_point, ozerki, cities[1]);
        windRouse(arr3, vyborg_point, vyborg, cities[2]);
        windRouse(arr4, kotka_point, kotka, cities[3]);
        windRouse(arr5, kunda_point, kunda, cities[4]);

        function windRouse(arr, center, rouse, sity) {
            var r = 1000;    // zoom
            var dir = 0;    // start angle      
            var radius;     // radius semicircle

            var marker = L.marker(center).addTo(map);
            marker.bindPopup("<b>" + sity + "</b>").openPopup();

            rouse.clearLayers();
            for (var j = 3; j >= 0; j--) {
                var windlayer = new L.FeatureGroup();

                for (var i = 0; i < 16; i++) {
                    var temp = radius;
                    switch (j) {
                        case 0: radius = r * (arr[0][i]); break;
                        case 1: radius = r * (arr[0][i] + arr[1][i]); break;
                        case 2: radius = r * (arr[0][i] + arr[1][i] + arr[2][i]); break;
                        case 3: radius = r * (arr[0][i] + arr[1][i] + arr[2][i] + arr[3][i]); break;
                    }

                    var circle = L.circle(center, radius, {
                        weight: 1,
                        color: colors[j],
                        opacity: 0.4,
                        fillColor: colors[j],
                        fillOpacity: 0.8
                    }).setDirection(dir + i * 22.5, 22.5);

                    circle.on({
                        'mouseover': function () {
                            this.setStyle({ fillOpacity: 1 })
                        },
                        'mouseout': function () {
                            this.setStyle({ fillOpacity: 0.8 })
                        }
                    });

                    windlayer.bindPopup('Ветер ' + grades[j] + ' м/с').addLayer(circle);

                    windlayer.on({
                        'mouseover': function () {
                            this.setStyle({ opacity: 1 })
                        },
                        'mouseout': function () {
                            this.setStyle({ opacity: 0.4 })
                        }
                    });
                }

                rouse.addLayer(windlayer);
            }
            rouse.addTo(map);
        }
    }

    var ddData = [    
    {
        text: "Vestas V80-2.0 MW",
        value: 0,
        selected: true,
        truncateDescription: true,
        description: "Rotor diameter: 80 m <br/>" +
                     "Swept area: 5,027 m²"
    },
    {
        text: "Vestas V90-3.0 MW",
        value: 1,
        selected: false,        
        description: "Rotor diameter: 90 m <br/>"+
                     "Swept area: 6,362 m²"
    },
    {
        text: "Vestas V100-2.6 MW",
        value: 2,
        selected: false,
        truncateDescription: true,
        description: "Rotor diameter: 100 m <br/>" +
                     "Swept area: 7,854 m²"
    },
    {
        text: "Vestas V164-8.0 MW",
        value: 3,
        selected: false,
        truncateDescription: true,
        description: "Rotor diameter: 164 m <br/>" +
                     "Swept area: 21,124 m²"
    }
    ];

    var windTower = [    
    {
        diameter: '80',
        height: '80',
        speed: '4.5',
        power: '3410.67',
        info:   "Rated power: 2,000 kW <br/>" +
                "Cut-in wind speed: 3.5 m/s <br/>" +
                "Rated wind speed: 14.5 m/s <br/>" +
                "Cut-out wind speed: 25 m/s <br/>" +
                "Wind class: IEC IA <br/>" +
                "Operating temperature range: standard turbine -20°C to 40°C, low temperature turbine -30°C to 40°C"
    },
    {
        diameter: '90',
        height: '80',
        speed: '4.5',
        power: '4316.62',
        info:   "Rated power: 3,000 kW <br/>" +
                "Cut-in wind speed: 3.5 m/s <br/>" +
                "Rated wind speed: 15 m/s <br/>" +
                "Cut-out wind speed: 25 m/s <br/>" +
                "Wind Class: IEC IA and IEC IIA <br/>" +
                "Operating temperature range: standard range -20°C to 40°C, low temperature option -30°C to 40°C"
    },
    {
        diameter: '100',
        height: '80',
        speed: '4.5',
        power: '5329.16',
        info:   "Rated power: 2,600 kW <br/>" +
                "Cut-in wind speed: 3.5 m/s <br/>" +
                "Rated wind speed: 14 m/s <br/>" +
                "Cut-out wind speed: 23 m/s <br/>" +
                "Re-cut in wind speed: 20 m/s <br/>" +
                "Wind class: IEC IIB <br/>" +
                "Operating temperature range: standard range -20°C to 40°C, low temperature option -30°C to 40°C"
    },
    {
        diameter: '164',
        height: '80',
        speed: '4.5',
        power: '14333.32',
        info:   "Rated power: 8,000 kW <br/>" +
                "Cut-in wind speed: 4 m/s <br/>" +
                "Operational rotor speed: 4.8 - 12.1 rpm <br/>" +
                "Nominal rotor speed: 10.5 rpm <br/>" +
                "Operational temperature range: -10 to +25ºC <br/>" +
                "Extreme temperature range: -15 to +35ºC"
    }
    ];

    


    function log(msg) {
        console.log(msg);
    }
});