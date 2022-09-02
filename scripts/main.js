class WeatherApp {

    static dragged = null;

    constructor() {
        this.APPID = "1be4f38ab943b366bfbf42919abf5ba5";
        this.URL = "http://api.openweathermap.org/data/2.5/weather?";
        this.initEventListeners();
    }

    get template() {
        return `
            <div class="weather">
                <div class="weather__wrapper">
                    <div class="weather__inner">
                        <div class="weather__container weather__container_day">
                            <div class="weather__header">
                                <svg class="menu__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                </svg>
                                <span class="weather__heading"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="menu__icon menu__icon_open">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <main class="weather-content">
                                <div class="weather-content__inner">
                                    <div class="weather-content__row">
                                        <div class="weather-content__elem">
                                            <i id="mainIcon" class="wi weather-content__icon_main"></i>
                                        </div>
                                        <div id="degree" class="weather-content__elem"></div>
                                        <div id="description" class="weather-content__elem"></div>
                                    </div>
                                    <div class="weather-content__row">
                                        <span id="wind" class="weather-content__elem weather-content__elem_supp"></span>
                                        <span id="humidity" class="weather-content__elem weather-content__elem_supp"></span>
                                        <span id="pressure" class="weather-content__elem weather-content__elem_supp"></span>
                                        <span id="visibility" class="weather-content__elem weather-content__elem_supp"></span>
                                        <span id="dew" class="weather-content__elem weather-content__elem_supp"></span>
                                    </div>  
                                </div>
                            </main>
                            <div class="menu">
                                <div class="menu__wrapper">
                                    <div class="menu__inner">
                                        <div class="weather__header">
                                            <span class="weather__heading">Settings</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="menu__icon menu__icon_close">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m-15 0l15 15"/>
                                            </svg>
                                        </div>
                                        <ul class="menu__list"></ul>
                                        <div class="menu-searchbar">
                                            <input class="menu-searchbar__input menu-searchbar__text" type="text" name="city" placeholder="city, country code:">
                                            <button class="menu-searchbar__button" type="button" value="поиск">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="menu__icon menu__icon_search">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    }

    render() {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = this.template;
        document.body.append(wrapper.firstElementChild);
    }

    initEventListeners() {
        document.addEventListener("click", this.onOpenMenuClick);
        document.addEventListener("click", this.onCloseMenuClick);
        document.addEventListener('DOMContentLoaded', this.handleSearchButtonClick);
        document.addEventListener("DOMContentLoaded", this.deleteMenuItem);
        document.addEventListener('DOMContentLoaded', this.fetchMenu);
        document.addEventListener("DOMContentLoaded", this.onHandleDragEvent);
        document.addEventListener("click", this.onHandleDragEvent);
        document.addEventListener("DOMContentLoaded", this.getNavigationData);
        document.addEventListener("DOMContentLoaded", this.handleMenuItemClick);
    }

    handleDragStart = (ev) => {
        const {target} = ev;
        WeatherApp.dragged = target;
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/html', target.innerHTML);
        target.children[0].style.opacity = '0.6';
        target.children[0].style.borderStyle = 'dashed';
    }

    handleDragEnd = (ev) => {
        const {target} = ev;
        const listItems = [...document.querySelectorAll('.menu__item')];
        listItems.forEach(item => {
            item.classList.remove('menu__item_over');
            [...item.children].forEach(child => child.style.borderStyle = 'none');
        });
        target.children[0].style.opacity = '1';
        target.children[0].style.borderStyle = 'solid';
    }

    handleDragOver = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
        return false;
    }

    handleDragEnter = (ev) => {
        const {target} = ev;
        target.classList.add('menu__item_over');
    }

    handleDragLeave = (ev) => {
        const {target} = ev;
        target.classList.remove('menu__item_over');
    }

    handleDrop = (ev) => {
        const {target} = ev;
        const listItem = target.closest("[draggable='true']");
        ev.stopPropagation();
        if (WeatherApp.dragged !== listItem) {
            WeatherApp.dragged.innerHTML = listItem.innerHTML;
            listItem.innerHTML = ev.dataTransfer.getData('text/html');
        }
        return false;
    }

    onHandleDragEvent = () => {
        const listItems = [...document.querySelectorAll("[draggable='true']")];
        listItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart);
            item.addEventListener('dragover', this.handleDragOver);
            item.addEventListener('dragenter', this.handleDragEnter);
            item.addEventListener('dragleave', this.handleDragLeave);
            item.addEventListener('dragend', this.handleDragEnd);
            item.addEventListener('drop', this.handleDrop);
        })
    }

    animateFlyout = (element, animationName, cb) => {
        const node = document.querySelector(element);
        node.classList.add(`${element.substring(1)}_animated`, `${element.substring(1)}_${animationName}`);
        switch (animationName) {
            case 'active':
                node.classList.remove(`${element.substring(1)}_inactive`);
                break;
            case 'inactive':
                node.classList.remove(`${element.substring(1)}_active`);
                break;
        }

        function handleAnimationEnd(ev) {
            ev.stopPropagation();
            node.removeEventListener('animationend', handleAnimationEnd);
            if (typeof cb === 'function') cb();
        }

        node.addEventListener('animationend', handleAnimationEnd)
    }

    onOpenMenuClick = (ev) => {
        const {target} = ev;
        const openBtn = target.closest(".menu__icon_open");
        if (!openBtn) return;
        const menu = '.menu';
        this.animateFlyout(menu, 'active');
    };

    onCloseMenuClick = (ev) => {
        const {target} = ev;
        const openBtn = target.closest(".menu__icon_close");
        if (!openBtn) return;
        const menu = `.menu`;
        this.animateFlyout(menu, 'inactive');
    };

    getListItem = (item) => {
        const {city: city, country: country, id} = item;
        const resString = `${city}, ${country}`;
        return `
        <li draggable="true">
            <div class="menu__item" data-location='${JSON.stringify({city, country})}' data-id="${id}">
                <svg class="menu__icon menu__icon_drag" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
                </svg>
                <span class="menu__text">${resString}</span>
                <svg class="menu__icon menu__icon_delete" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                </svg>
            </div>
        </li>
        `
    }

    getSearchValue = () => {
        const node = document.querySelector('.menu-searchbar__input');
        const regExp = new RegExp(/\s+|,\s?/g);
        const inputValue = node.value;
        if (node.value !== undefined) {
            const city = inputValue.split(regExp)[0].substring(0, 1).toUpperCase().concat(inputValue.split(regExp)[0].substring(1));
            const country = inputValue.split(regExp)[1].toUpperCase() || '';
            return {
                city: city,
                country: country
            };
        }
        console.log(inputValue.split(regExp));

    }

    updateList = (menu) => {
        const localStorage = window.localStorage;
        localStorage.setItem('menu', JSON.stringify(menu));
    };

    getCachedList = () => {
        const localStorage = window.localStorage;
        return JSON.parse(localStorage.getItem('menu')) || [];
    }

    deleteMenuItem = () => {
        const list = document.querySelector('.menu__list');
        list.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const {target} = ev;
            const deleteButton = target.closest('.menu__icon_delete');
            if (!deleteButton) return;
            const currItem = target.closest(".menu__item");
            const {id: currItemID} = currItem.dataset;
            let cachedList = this.getCachedList();
            let listCopy = [...cachedList];
            const filteredList = listCopy.filter(item => item.id !== parseInt(currItemID));
            list.removeChild(currItem.parentNode);
            this.updateList(filteredList);

        }, true)
    }

    fetchMenu = () => {
        const list = document.querySelector('.menu__list');
        const node = document.querySelector('.menu-searchbar__input');
        let cachedList = this.getCachedList();

        const getList = () => {
            return cachedList.map(item => {
                return item ? this.getListItem(item) : '';
            }).join('');
        }

        list.innerHTML = getList();
        node.value = '';
        return cachedList;
    }

    createMenuItem() {
        const cachedList = this.getCachedList();
        const searchInputValue = this.getSearchValue();
        const getID = () => new Date().getTime();
        const list = document.querySelector('.menu__list');
        const node = document.querySelector('.menu-searchbar__input');
        const wrapper = document.createElement('div');

        let listItemObject = {
            id: getID(),
            ...searchInputValue,
        }
        cachedList.push(listItemObject);
        this.updateList(cachedList);
        wrapper.innerHTML = this.getListItem(listItemObject);
        list.appendChild(wrapper.firstElementChild);
        node.value = '';
    }

    handleMenuItemClick = () => {
        const list = document.querySelector(".menu__list");

        list.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const target = ev.target;
            const menuItem = target.closest('.menu__text');
            const {location} = menuItem.parentNode.dataset;
            const {city, country} = JSON.parse(location);
            const menu = `.menu`;

            const getWeatherData = () => {

                const options = {
                    city: [city, country.toLowerCase()],
                    units: "metric",
                    lang: "en",
                    APPID: this.APPID,
                };

                const url = this.URL.concat(this.createQuery(options));

                const params = {
                    main: 'main',
                    weather: 'weather',
                    wind: 'wind',
                    visibility: "visibility",
                    sys: "sys",
                }

                fetch(url)
                    .then(response => response.json())
                    .then((data) => {
                        this.displayData(data, params);
                        this.animateFlyout(menu, 'inactive');
                    })
                    .catch(function (e) {
                        console.warn(e.message);
                    });
            }
            getWeatherData();
        }, true)

    }

    handleSearchButtonClick = () => {
        const searchButton = document.querySelector('.menu-searchbar__button');
        let that = this;
        searchButton.addEventListener('click', () => {
            const {city, country} = that.getSearchValue();
            const menu = `.menu`;
            if (!searchButton) return;
            this.createMenuItem();

            const getWeatherData = () => {

                const options = {
                    city: [city, country.toLowerCase()],
                    units: "metric",
                    lang: "en",
                    APPID: this.APPID,
                };
                const url = this.URL.concat(this.createQuery(options));

                const params = {
                    main: 'main',
                    weather: 'weather',
                    wind: 'wind',
                    visibility: "visibility",
                    sys: "sys",
                }

                fetch(url)
                    .then(response => response.json())
                    .then((data) => {
                        this.displayData(data, params);
                        this.animateFlyout(menu, 'inactive');
                    })
                    .catch(function (e) {
                        console.warn(e.message);
                    });
            }
            getWeatherData();
        })

    }

    createQuery = (paramObj) => {
        let obj = paramObj;
        let queryArr = [];

        for (let key of Object.keys(obj)) {
            if (obj.hasOwnProperty(key)) {
                if (key === "city") {
                    let oldKey = key;
                    key = "q";
                    queryArr.push(`${key}=${obj[oldKey]}`);
                } else {
                    queryArr.push(`${key}=${obj[key]}`);
                }
            }
        }
        return queryArr.join("&");
    }

    getNavigationData = () => {

        const getLocation = () => {
            let options = {
                enableHighAccuracy: true,
                timeout: Infinity,
                maximumAge: 0,
            };
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition, showWarning, options);
            } else {
                console.warn("The acquisition of the geolocation information failed because the page didn't have the permission to do it.");
            }
        }

        const showWarning = (error) => {
            switch (error.code) {
                case error.POSITION_UNAVAILABLE:
                    console.warn(" The acquisition of the geolocation failed because one or several internal sources of position returned an internal error.");
                    break;
                case error.TIMEOUT:
                    console.warn("Geolocation information was not obtained in the allowed time.");
                    break;
            }
        }

        const getPosition = async (navObject) => {
            const {latitude, longitude} = navObject.coords;
            const options = {
                lat: latitude,
                lon: longitude,
                units: "metric",
                lang: "en",
                APPID: this.APPID,
            };
            const url = this.URL.concat(this.createQuery(options));
            const params = {
                main: 'main',
                weather: 'weather',
                wind: 'wind',
                visibility: "visibility",
                sys: "sys",
            }

            await fetch(url)
                .then(response => response.json())
                .then((data) => {
                    this.displayData(data, params);
                })
                .catch(function (e) {
                    console.warn(e.message);
                });
        }
        getLocation();
    }

    displayLocation = (city, country) => {
        let node = document.querySelector(".weather__heading");
        node.textContent = `${city}, ${country}`;
    }

    setTemperature = (temperature) => {
        const node = document.querySelector("#degree");
        let na = document.createElement("i");
        na.classList.add("wi", "wi-na");

        if (temperature === undefined) {
            node.innerHTML = "";
            node.appendChild(na);
        } else {
            node.innerHTML = `${Math.round((temperature))}<span>&deg;</span>`;
        }
    }

    setIconCode = (icon, id) => {
        const node = document.querySelector("#mainIcon");
        const container = document.querySelector(".weather__container");
     
        node.className = 'weather-content__icon_main';
        if (icon === undefined) {
            node.classList.add("wi-na");
        } else if (icon.indexOf("n") !== -1) {
            node.classList.add("wi", `wi-owm-night-${id}`);
            container.classList.remove("weather__container_day");
            container.classList.add("weather__container_night");
        } else {
            node.classList.add("wi", `wi-owm-day-${id}`);
            container.classList.add("weather__container_day");
            container.classList.remove("weather__container_night");
        }
    }

    setDescription = (des, feels) => {
        let description = document.querySelector("#description");
        let na = document.createElement("i");
        na.classList.add("wi", "wi-na");

        if (des === undefined) {
            description.innerHTML = "";
            description.appendChild(na);
        } else {
            description.innerHTML = `<strong>${des}</strong><br><br>Feels like ${Math.round((feels))}<span>&deg;</span>`;
        }
    }

    setWindSpeedStrength = (speed, degree) => {
        const node = document.querySelector("#wind");
        const na = document.createElement("i");
        const windIcon = document.createElement("i");
        windIcon.classList.add('wi', 'wi-dir', 'wi-wind', 'weather-content__icon', 'weather-content__icon_supp');
        na.classList.add("wi", "wi-na");

        if (speed === undefined) {
            node.innerHTML = "";
            node.appendChild(na);
        } else {
            node.textContent = `${speed.toFixed(1)} m/s, ${this.defineWindDirection(degree.toFixed(0))}, (${this.defineWindStrength(speed.toFixed(1))})`;
            node.insertAdjacentElement('afterbegin', windIcon);
            this.setWindDirection(windIcon, degree);

        }
    }

    defineWindDirection = (deg) => {
        switch (!isNaN(deg)) {
            case 0 <= deg && deg <= 11:
                return "N";
            case 12 <= deg && deg <= 33:
                return "NNE";
            case 34 <= deg && deg <= 56:
                return "NE";
            case 57 <= deg && deg <= 78:
                return "ENE";
            case 79 <= deg && deg <= 101:
                return "E";
            case 102 <= deg && deg <= 123:
                return "ESE";
            case 124 <= deg && deg <= 146:
                return "SE";
            case 147 <= deg && deg <= 168:
                return "SSE";
            case 169 <= deg && deg <= 191:
                return "S";
            case 192 <= deg && deg <= 213:
                return "SSW";
            case 214 <= deg && deg <= 236:
                return "SW";
            case 237 <= deg && deg <= 258:
                return "WSW";
            case 259 <= deg && deg <= 281:
                return "W";
            case 282 <= deg && deg <= 303:
                return "WNW";
            case 304 <= deg && deg <= 326:
                return "NW";
            case 327 <= deg && deg <= 348:
                return "NNW";
            case 349 <= deg && deg <= 360:
                return "N";
            default:
                return undefined;
        }
    }

    defineWindStrength = (speed) => {
        switch (!isNaN(speed)) {
            case 0 <= speed && speed <= 0.2:
                return "calm";
            case 0.3 <= speed && speed <= 1.5:
                return "light air";
            case 1.6 <= speed && speed <= 3.3:
                return "light breeze";
            case 3.4 <= speed && speed <= 5.4:
                return "gentle breeze";
            case 5.5 <= speed && speed <= 7.9:
                return "moderate breeze";
            case 8 <= speed && speed <= 10.7:
                return "fresh breeze";
            case 10.8 <= speed && speed <= 13.8:
                return "strong breeze";
            case 13.9 <= speed && speed <= 17.1:
                return "high wind";
            case 17.2 <= speed && speed <= 20.7:
                return "gale";
            case 20.8 <= speed && speed <= 24.4:
                return "strong gale";
            case 24.5 <= speed && speed <= 28.4:
                return "storm";
            case 28.5 <= speed && speed <= 32.6:
                return "violent storm";
            case 33 < speed:
                return "hurricane";
            default:
                return undefined;
        }
    }

    setWindDirection = (icon, degree) => {
        let node = document.querySelector(".wi-dir");
        degree = degree === 360 ? (degree + 180) - 360 : degree + 180;

        if (degree === undefined) {
            node.classList.remove("wi-wind");
            node.classList.add("wi-na");
            node.style.transform = "none";
        } else {
            node.classList.remove("wi-na");
            node.classList.add("wi-wind");
            node.style.transform = `rotate(${degree.toFixed(0)}deg)`;
        }
    }

    setHumidity = (humidity) => {
        let node = document.querySelector("#humidity");
        let na = document.createElement("i");
        const humidityIcon = document.createElement("i");
        humidityIcon.classList.add('wi', 'wi-humidity', 'weather-content__icon', 'weather-content__icon_supp');
        na.classList.add("wi", "wi-na");

        if (humidity === undefined) {
            node.innerHTML = "";
            node.appendChild(na);
        } else {
            node.innerHTML = `Humidity:&nbsp;${humidity}<span>&percnt;</span>`;
            node.insertAdjacentElement('afterbegin', humidityIcon);
        }
    }

    setPressure = (pressure) => {
        let node = document.querySelector("#pressure");
        let na = document.createElement("i");
        const pressureIcon = document.createElement("i");
        pressureIcon.classList.add('wi', 'wi-barometer', 'weather-content__icon', 'weather-content__icon_supp')
        na.classList.add("wi", "wi-na");

        if (pressure === undefined) {
            node.innerHTML = "";
            node.appendChild(na);
        } else {
            node.textContent = `Pressure: ${pressure.toFixed(0)} hPa`;
            node.insertAdjacentElement('afterbegin', pressureIcon);
        }
    }

    setVisibility = (visibility) => {
        let node = document.querySelector("#visibility");
        let na = document.createElement("i");
        const visibilityIcon = document.createElement("i");
        visibilityIcon.classList.add('wi', 'wi-train', 'weather-content__icon', 'weather-content__icon_supp');
        na.classList.add("wi", "wi-na");

        if (visibility === undefined) {
            node.innerHTML = "";
            node.appendChild(na);
        } else {
            node.textContent = `Visibility: ${(visibility / 1000).toFixed(1)} km`;
            node.insertAdjacentElement('afterbegin', visibilityIcon);
        }
    }

    setDewPoint = (temp, humidity) => {

        const node = document.querySelector("#dew");
        let na = document.createElement("i");
        const dewPointIcon = document.createElement("i");
        dewPointIcon.classList.add('wi', 'wi-raindrop', 'weather-content__icon', 'weather-content__icon_supp');
        na.classList.add("wi", "wi-na");

        const a = 17.625;
        const b = 243.04;
        const T = temp;
        const f = (a * T) / (b + T) + Math.log(humidity / 100);
        const dewPoint = (b * f) / (a - f);


        if (temp === undefined || humidity === undefined) {
            node.innerHTML = "";
            node.appendChild(na);
        } else {
            node.innerHTML = `Dew point: ${Math.round(dewPoint)}<span>&deg;</span>`;
            node.insertAdjacentElement('afterbegin', dewPointIcon);
        }
    }

    displayData = (data, params) => {
        const {main, weather, wind, sys} = params;
        const {temp, pressure, humidity, feels_like} = data[main];
        const {icon, id, description} = data[weather][0];
        const {speed, deg} = data[wind];
        const {country} = data[sys];
        const {visibility} = data;
        const {name} = data;

        this.displayLocation(name, country);
        this.setIconCode(icon, id);
        this.setTemperature(temp);
        this.setDescription(description, feels_like);
        this.setWindSpeedStrength(speed, deg);
        this.setHumidity(humidity);
        this.setPressure(pressure);
        this.setVisibility(visibility);
        this.setDewPoint(temp, humidity);
    }

}

const newWeatherApp = new WeatherApp();
newWeatherApp.render();

