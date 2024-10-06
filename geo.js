document.addEventListener('DOMContentLoaded', function () {
    // Новости
    const newsItems = [
        "Парниковые газы и их влияние на климат.",
        "Как сократить выбросы углерода в повседневной жизни?",
        "Проблема смога в крупных городах.",
        "Как растения помогают в борьбе с загрязнением воздуха?",
        "Изменение климата и его последствия для здоровья."
    ];
    
    const newsBanner = document.getElementById('news-banner');
    newsItems.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        newsElement.textContent = item;
        newsBanner.appendChild(newsElement);
    });

    // Интересные факты
    const factsButton = document.getElementById('facts-button');
    const factsDiv = document.getElementById('facts');

    factsButton.addEventListener('click', function () {
        factsDiv.style.display = factsDiv.style.display === 'none' || !factsDiv.style.display ? 'block' : 'none';
        if (factsDiv.style.display === 'block') {
            factsDiv.innerHTML = `
                <p>1. Парниковые газы задерживают тепло в атмосфере.</p>
                <p>2. Углекислый газ является самым распространенным парниковым газом.</p>
                <p>3. Основные источники парниковых газов: транспорт, электроэнергия и сельское хозяйство.</p>
            `;
        }
    });

    // Геолокация
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Геолокация не поддерживается вашим браузером.");
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        initMap(lat, long); // Инициализируем карту с координатами пользователя
    }

    function initMap(lat, long) {
        const map = L.map('map').setView([lat, long], 12); // Устанавливаем уровень зума

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Добавляем маркер для местоположения пользователя
        L.marker([lat, long]).addTo(map).bindPopup("Вы находитесь здесь!").openPopup();

        // Пример данных по районам Алматы
        const districts = [
            { name: 'Алмалы', coords: [43.25014, 76.91681], pollution: 30 }, // Зеленый
            { name: 'Ауэзов', coords: [43.22722, 76.92683], pollution: 50 }, // Желтый
            { name: 'Бостандык', coords: [43.23756, 76.89592], pollution: 40 }, // Оранжевый
            { name: 'Жетысу', coords: [43.21085, 76.93022], pollution: 60 }, // Красный
            { name: 'Медеу', coords: [43.23624, 76.89432], pollution: 20 }, // Зеленый
            { name: 'Наурызбай', coords: [43.22709, 76.85212], pollution: 70 }, // Красный
            { name: 'Турксиб', coords: [43.28531, 76.89536], pollution: 80 } // Красный
        ];

        // Цвета для районов в зависимости от уровня загрязнения
        const colors = {
            20: 'green',   // Хорошее состояние
            30: 'lightgreen', // Умеренное состояние
            40: 'orange',  // Умеренно опасно
            50: 'yellow',  // Опасно
            60: 'red',     // Очень опасно
            70: 'darkred', // Критически опасно
            80: 'black'    // Ужасное состояние
        };

        // Добавляем районы на карту
        districts.forEach(district => {
            const color = colors[district.pollution] || 'gray';
            const polygon = L.polygon([
                [district.coords[0] + 0.01, district.coords[1] - 0.01], 
                [district.coords[0] - 0.01, district.coords[1] - 0.01],
                [district.coords[0] - 0.01, district.coords[1] + 0.01],
                [district.coords[0] + 0.01, district.coords[1] + 0.01]
            ], {
                color: color,
                fillColor: color,
                fillOpacity: 0.5
            }).addTo(map).bindPopup(`${district.name}: ${district.pollution}% загрязнения`);

            polygon.on('mouseover', function () {
                this.setStyle({ fillOpacity: 0.7 });
            });
            polygon.on('mouseout', function () {
                this.setStyle({ fillOpacity: 0.5 });
            });
        });
    }
});
