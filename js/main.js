'use strict';

var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OBJECT_NUMBER = 9;
var MAX_X = 1100;
var MAX_Y = 630;
var MIN_Y = 130;
var PHOTOS_LENGTH = 3;
var FEAT_LENGTH = FEATURES_OFFER.length;
var CHECK_LENGTH = CHECK_OFFER.length;

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
    var featNum1 = getRandomInteger(FEAT_LENGTH);
    var featNum2 = getRandomInteger(FEAT_LENGTH);
    var photoNum = getRandomInteger(PHOTOS_LENGTH);
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
        checkin: CHECK_OFFER[getRandomInteger(CHECK_LENGTH)],
        checkout: CHECK_OFFER[getRandomInteger(CHECK_LENGTH)],
        features: FEATURES_OFFER.slice(Math.min(featNum1, featNum2), Math.max(featNum1, featNum2)),
        description: 'Description' + (i + 1),
        photos: createPhotos().slice(photoNum)
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
  var imgElement = similarElement.querySelector('img');
  similarElement.style = 'left:' + locationX + 'px; top: ' + locationY + 'px;';
  imgElement.src = currentElement.author.avatar;
  imgElement.alt = currentElement.offer.title;
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
  var imgExampleImg = exampleImg.querySelector('img');
  exampleImg.querySelector('img').src = cArray[0];
  var imgFragment = document.createDocumentFragment();
  var photoLength = cArray.length;
  for (var i = 1; i < photoLength; i++) {
    var imgTemplate = imgExampleImg.cloneNode(true);
    imgTemplate.src = cArray[i];
    imgFragment.appendChild(imgTemplate);
  }
  exampleImg.appendChild(imgFragment);
  return exampleImg;
};

var generateCard = function (cTemplate, curArray) {
  var cardElement = cTemplate.cloneNode(true);
  var curOffer = curArray.offer;
  cardElement.querySelector('.popup__title').textContent = curOffer.title;
  cardElement.querySelector('.popup__text--address').textContent = curOffer.address;
  cardElement.querySelector('.popup__text--price').textContent = curOffer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerType(curOffer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = curOffer.rooms +
  ' комнаты для ' + curOffer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + curOffer.checkin
  + ', выезд до ' + curOffer.checkout;
  cardElement.querySelector('.popup__description').textContent = curOffer.description;
  cardElement.querySelector('.popup__features').textContent = curOffer.features;
  cardElement.querySelector('.popup__avatar').src = curArray.author.avatar;
  displayPhoto(cardElement, curArray.offer.photos);
  return cardElement;
};

var generatePins = function () {
  var currentArray = generateArray();
  var similarList = document.querySelector('.map__pins');
  var mapSection = document.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  var cardfragment = document.createDocumentFragment();
  var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var imgWidth = similarTemplate.querySelector('img').width;
  var imgHeight = similarTemplate.querySelector('img').height;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  for (var i = 0; i < 8; i++) {
    if (!(currentArray[i].offer.rooms === 0 || currentArray[i].offer.guests === 0)) {
      var pin = generatePinView(imgWidth, imgHeight, similarTemplate, currentArray[i]);
      var card = generateCard(cardTemplate, currentArray[i]);
      fragment.appendChild(pin);
      cardfragment.appendChild(card);
    }
  }
  similarList.appendChild(fragment);
  mapSection.before(cardfragment);
};


generatePins();
deleteClass('.map', 'map--faded');
