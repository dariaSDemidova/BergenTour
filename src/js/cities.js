    // document.addEventListener('DOMContentLoaded', function() {
    //     const citiesSelect = document.getElementById('cities-select');
    
    //     fetch('https://nominatim.openstreetmap.org/search?country=Kazakhstan&city=&format=json&limit=50')
    //         .then(response => response.json())
    //         .then(data => {
    //             data.forEach(city => {
    //                 const option = document.createElement('option');
    //                 option.value = city.display_name;
    //                 option.textContent = city.display_name;
    //                 citiesSelect.appendChild(option);
    //             });
    //         })
    //         .catch(error => console.error('Error fetching city data:', error));
    // });
    

    document.addEventListener('DOMContentLoaded', function() {
        const citiesSelect = document.getElementById('cities-select');
    
        const query = `
            [out:json];
            area["ISO3166-1"="KZ"][admin_level=2];
            node["place"="city"](area);
            out body;
        `;
        
        const apiUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.elements.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.tags.name;
                    option.textContent = city.tags.name;
                    citiesSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching city data:', error));
    });
    