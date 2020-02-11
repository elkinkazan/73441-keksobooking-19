'use strict';

var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OBJECT_NUMBER = 9;
var MAX_X = 1100;
var MAX_Y = 630;
var MIN_Y = 130;
var PHOTOS_LENGTH = 3;

var createPhotos = function () {
  var photos = [];

  for (var i = 0; i < PHOTOS_LENGTH; i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }

  return photos;
};

var getRandomInteger = function (max) {
  return Math.floor(Math.random() * max);
};

var generateArray = function () {
  var arr = [];

  for (var i = 0; i < OBJECT_NUMBER; i++) {
    var num1 = getRandomInteger(FEATURES_OFFER.length);
    var num2 = getRandomInteger(FEATURES_OFFER.length);
    var ph = getRandomInteger(PHOTOS_LENGTH);
    var currentObject = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Title' + (i + 1),
        address: '' + getRandomInteger(1000) + ',' + getRandomInteger(1000) + '',
        price: getRandomInteger(10000),
        type: TYPE_OFFER[getRandomInteger(TYPE_OFFER.length)],
        rooms: getRandomInteger(10),
        guests: getRandomInteger(10),
        checkin: CHECK_OFFER[getRandomInteger(CHECK_OFFER.length)],
        checkout: CHECK_OFFER[getRandomInteger(CHECK_OFFER.length)],
        features: FEATURES_OFFER.slice(Math.min(num1, num2), Math.max(num1, num2)),
        description: 'Description' + (i + 1),
        photos: createPhotos().slice(ph)
      },
      location: {
        x: getRandomInteger(MAX_X),
        y: getRandomInteger(MAX_Y - MIN_Y) + MIN_Y,
      },
    };
    arr[i] = currentObject;
  }
  return arr;
};

var deleteClass = function (sectionName, className) {
  var sectionNameList = document.querySelector(sectionName);
  sectionNameList.classList.remove(className);
};

var generatePinView = function (iWidth, iHeight, Template, currentElement) {
  var similarElement = Template.cloneNode(true);
  var locationX = currentElement.location.x + iWidth;
  var locationY = currentElement.location.y + iHeight;
  similarElement.style = 'left:' + locationX + 'px; top: ' + locationY + 'px;';
  similarElement.querySelector('img').src = currentElement.author.avatar;
  similarElement.querySelector('img').alt = currentElement.offer.title;
  return similarElement;
};

var offerType = function (oType) {
  var name = '';
  if (oType === 'flat') {
    name = 'Квартира';
  } else if (oType === 'bungalo') {
    name = 'Бунгало';
  } else if (oType === 'house') {
    name = 'Дом';
  } else if (oType === 'palace') {
    name = 'Дворец';
  }
  return name;
};

var displayPhoto = function (cElement, cArray) {
  var exampleImg = cElement.querySelector('.popup__photos');
  var imgFragment = document.createDocumentFragment();
  for (var i = 0; i < cArray.offer.photos.length; i++) {
    var imgTemplate = exampleImg.querySelector('img').cloneNode(true);
    imgTemplate.src = cArray.offer.photos[i];
    imgFragment.appendChild(imgTemplate);
  }
  exampleImg.appendChild(imgFragment);
  return exampleImg;
};

var generateCard = function (cTemplate, curArray) {
  var cardElement = cTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = curArray.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = curArray.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = curArray.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerType(curArray.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = curArray.offer.rooms +
  ' комнаты для ' + curArray.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + curArray.offer.checkin
  + ', выезд до ' + curArray.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = curArray.offer.description;
  cardElement.querySelector('.popup__features').textContent = curArray.offer.features;
  cardElement.querySelector('.popup__avatar').src = curArray.author.avatar;
  displayPhoto(cardElement, curArray);
  return cardElement;
};

var generatePins = function () {
  var currentArray = generateArray();
  var similarList = document.querySelector('.map__pins');
  var mapSection = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var cardfragment = document.createDocumentFragment();
  var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var imgWidth = similarTemplate.querySelector('img').width;
  var imgHeight = similarTemplate.querySelector('img').height;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  for (var i = 0; i < 8; i++) {
    var pin = generatePinView(imgWidth, imgHeight, similarTemplate, currentArray[i]);
    var card = generateCard(cardTemplate, currentArray[i]);
    fragment.appendChild(pin);
    cardfragment.appendChild(card);
  }
  similarList.appendChild(fragment);
  mapSection.appendChild(cardfragment);
};


generatePins();
deleteClass('.map', 'map--faded');
