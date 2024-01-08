
        let mymap = L.map('map').setView([52.2298, 21.0118], 11);
        let districtDictPrice={
            "Warszawa, Bemowo": {sum: 0,count: 0},
            "Warszawa, Białołęka":{sum: 0,count: 0},
            "Warszawa, Bielany":{sum: 0,count: 0},
            "Warszawa, Mokotów": {sum: 0,count: 0},
            "Warszawa, Ochota":{sum: 0,count: 0},
            "Warszawa, Praga-Południe":{sum: 0,count: 0},
            "Warszawa, Praga-Północ":{sum: 0,count: 0},
            "Warszawa, Rembertów":{sum: 0,count: 0},
            "Warszawa, Śródmieście":{sum: 0,count: 0},
            "Warszawa, Targówek":{sum: 0,count: 0},
            "Warszawa, Ursus":{sum: 0,count: 0},
            "Warszawa, Ursynów":{sum: 0,count: 0},
            "Warszawa, Wawer":{sum: 0,count: 0},
            "Warszawa, Wesoła":{sum: 0,count: 0},
            "Warszawa, Wilanów":{sum: 0,count: 0},
            "Warszawa, Włochy":{sum: 0,count: 0},
            "Warszawa, Wola":{sum: 0,count: 0},
            "Warszawa, Żoliborz":{sum: 0,count: 0},
            "Warszawa":{sum: 0,count: 0}
        }
        function switchSign(markerName){
            if(markerName=='WesoĹ‚a') return "Warszawa, Wesoła"
            if(markerName=='RembertĂłw') return "Warszawa, Rembertów"
            if(markerName=='Praga PoĹ‚udnie') return "Warszawa, Praga-Południe"
            if(markerName=='TargĂłwek') return "Warszawa, Targówek"
            if(markerName=='BiaĹ‚oĹ‚Ä™ka') return "Warszawa, Białołęka"
            if(markerName=='Ĺ»oliborz') return "Warszawa, Żoliborz"
            if(markerName=='Wola') return "Warszawa, Wola"
            if(markerName=='Wawer') return "Warszawa, Wawer"
            if(markerName=='Bielany') return "Warszawa, Bielany"
            if(markerName=='Bemowo') return "Warszawa, Bemowo"
            if(markerName=='WĹ‚ochy') return "Warszawa, Włochy"
            if(markerName=='Ochota') return "Warszawa, Ochota"
            if(markerName=='Ursus') return "Warszawa, Ursus"
            if(markerName=='MokotĂłw') return "Warszawa, Mokotów"
            if(markerName=='UrsynĂłw') return "Warszawa, Ursynów"
            if(markerName=='WilanĂłw') return "Warszawa, Wilanów"
            if(markerName=='ĹšrĂłdmieĹ›cie') return "Warszawa, Śródmieście"
            if(markerName=='Praga PĂłĹ‚noc') return "Warszawa, Praga-Północ"
            if(markerName=='Warszawa') return "Warszawa"
        }
        function switchSign2(markerName){
            if(markerName=='Wesoła') return "WesoĹ‚a"
            if(markerName=='Rembertów') return "RembertĂłw"
            if(markerName=='Praga-Południe') return "Praga PoĹ‚udnie"
            if(markerName=='Targówek') return "TargĂłwek"
            if(markerName=='Białołęka') return "BiaĹ‚oĹ‚Ä™ka"
            if(markerName=='Żoliborz') return "Ĺ»oliborz"
            if(markerName=='Wola') return "Wola"
            if(markerName=='Wawer') return "Wawer"
            if(markerName=='Bielany') return "Bielany"
            if(markerName=='Bemowo') return "Bemowo"
            if(markerName=='Włochy') return "WĹ‚ochy"
            if(markerName=='Ochota') return "Ochota"
            if(markerName=='Ursus') return "Ursus"
            if(markerName=='Mokotów') return "MokotĂłw"
            if(markerName=='Ursynów') return "UrsynĂłw"
            if(markerName=='Wilanów') return "WilanĂłw"
            if(markerName=='Śródmieście') return "ĹšrĂłdmieĹ›cie"
            if(markerName=='Praga-Północ') return "Praga PĂłĹ‚noc"
            if(markerName=='Warszawa') return "Warszawa"
        }
        function updateDistrictData(property) {
            let location = property.location;
            let price_per_square = property.price_per_square.replace('zł/m²', '').replaceAll(' ','').replaceAll(',','.');
            districtDictPrice[location].sum += parseFloat(price_per_square);
            districtDictPrice[location].count++;
        }
        function calculateAveragePrice(location) {
            if (districtDictPrice[location].count > 0) {
                return districtDictPrice[location].sum / districtDictPrice[location].count;
            } else {
                return 0;
            }
        }
        function  countOffer(location){
            return districtDictPrice[location].count
        }

         function handleFileSelect() {
        let fileInput = document.getElementById('fileInput');
        let file = fileInput.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
            let fileContent = e.target.result;
            try {

          let jsonData = JSON.parse(fileContent);
          let propertyList = document.getElementById('propertyList');


          propertyList.innerHTML = '';
            console.log(jsonData);
            jsonData.forEach(innerArray => {
          innerArray.forEach(property => {
            updateDistrictData(property);

             let listItem = document.createElement('li');
             listItem.classList.add('list-group-item');
             console.log(property.url[0]);
                listItem.innerHTML = `
                  <p><strong>Title:</strong> <span id="title">${property.title}</span></p>
                  <p><strong>Date:</strong> <span id="date">${property.date}</span></p>
                  <p><strong>Location:</strong> <span id="location">${property.location}</span></p>
                  <p><strong>Price:</strong> <span id="price">${property.price}</span></p>
                  <p><strong>Area:</strong> <span id="area">${property.area}</span></p>
                  <p><strong>Price per Square:</strong> <span id="price-per-square">${property.price_per_square}</span></p>
                  <p><a href=${property.url[0] == "/" ? `https://www.olx.pl${property.url}` : `${property.url}`} target="_blank">Link do oferty</a></p>
                `;

              propertyList.appendChild(listItem);

          });});

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mymap);

        L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {
        var marker = L.marker(latlng);

        var name = switchSign(decodeURIComponent(feature.properties.name));
        marker.bindPopup(`${name}<br>Average Price per square: ${calculateAveragePrice(switchSign(feature.properties.id)).toFixed(2)} zł<br>offer count: ${countOffer(switchSign(feature.properties.id))}`);

        return marker;
             }
        }).addTo(mymap);
                 }catch (error) {
                  console.error('Error parsing JSON file:', error);
                }
              };
              reader.readAsText(file);
            } else {
              console.log("No file selected");
            }
          }

        const customSelect = document.querySelector('.custom-select');
            customSelect.addEventListener('click', function () {
                this.classList.toggle('open');
            });

            const checkboxes = document.querySelectorAll('.options-container input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    updateSelectTriggerText();
                });
            });

            function updateSelectTriggerText() {
                const selectedCheckboxes = Array.from(checkboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);

                const selectTrigger = document.querySelector('.select-trigger');
                selectTrigger.textContent = selectedCheckboxes.length > 0 ? selectedCheckboxes.join(', ') : 'Wybierz lokalizacje';
        }


    document.addEventListener('DOMContentLoaded', function () {

        var propertyList = document.getElementById('propertyList');
        var sortSelect = document.getElementById('sort-select');


        let optionsContainer = document.getElementById('options-container');

        optionsContainer.addEventListener('change', function () {
            let propertyList = document.getElementById('propertyList');
            let selectTriggerText = document.querySelector('.select-trigger').textContent;

            let selectedLocations = selectTriggerText;

            let allListItems = propertyList.querySelectorAll('li');

            allListItems.forEach(function (listItem) {
                let locationElement = listItem.querySelector('#location');
                let locationValue = locationElement.textContent.split(",");
                let showOffer = selectedLocations.includes(locationValue[locationValue.length - 1]);
                listItem.style.display = showOffer ? 'block' : 'none';
            });
            if(selectTriggerText=='Wybierz lokalizacje'){
                allListItems.forEach(function (lisItem){
                    lisItem.style.display='block';
                });
            }

            let selectedLocationsArr = selectTriggerText.replaceAll(" ", "").split(",");
            let selectedDistricts = selectedLocationsArr.map(selectedLocation =>
              switchSign2(selectedLocation.replaceAll(" ", ""))
            ).filter(districtName => districtName !== 'undefined');

            let filteredFeatures = geojsonData.features.filter(feature =>
                selectedDistricts.includes(decodeURIComponent(feature.properties.name))
            );

            mymap.eachLayer(layer => {
                if (layer instanceof L.GeoJSON) {
                    layer.clearLayers();
                    layer.addData({
                        type: "FeatureCollection",
                        features: filteredFeatures
                    });
                }
            });
        });
        function convertPrice(priceString) {
            return parseFloat(priceString.replace(/\s+/g, '').replace('zł', ''));
        }

        function convertDate(dateString) {
            var dateParts = dateString.split(' ');
            if(dateParts[0]=="Dzisiaj"){
                let today = new Date();
                dateParts[2]=today.getFullYear();
                monthIndex=today.getMonth();
                dateParts[0]=today.getDate();
            }else {
                var months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
                var dateParts = dateString.split(' ');
                var monthIndex = months.indexOf(dateParts[1]);
            }
            return new Date(parseInt(dateParts[2]), monthIndex, parseInt(dateParts[0]));
        }


        sortSelect.addEventListener('change', function () {
            var selectedSortOption = sortSelect.value;

            var allListItems = Array.from(propertyList.querySelectorAll('li'));

            allListItems.sort(function (a, b) {
                switch (selectedSortOption) {
                    case 'highest-price':
                        return convertPrice(b.querySelector('#price').textContent.trim()) - convertPrice(a.querySelector('#price').textContent.trim());
                    case 'lowest-price':
                        return convertPrice(a.querySelector('#price').textContent.trim()) - convertPrice(b.querySelector('#price').textContent.trim());
                    case 'newest':
                        var dateA = convertDate(a.querySelector('#date').textContent.trim());
                        var dateB = convertDate(b.querySelector('#date').textContent.trim());
                        return dateB - dateA;
                    default:
                        return 0;
                }
            });

            propertyList.innerHTML = '';

            allListItems.forEach(function (listItem) {
                propertyList.appendChild(listItem);
            });
        });
});