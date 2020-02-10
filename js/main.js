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
    var num1 = getRandomInteger(FEATURES_OFFER.length - 1);
    var num2 = getRandomInteger(FEATURES_OFFER.length - 1);
    var ph = getRandomInteger(PHOTOS_LENGTH - 1);
    var currentObject = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Title' + (i + 1),
        address: '' + getRandomInteger(1000) + ',' + getRandomInteger(1000) + '',
        price: getRandomInteger(10000),
        type: TYPE_OFFER[getRandomInteger(TYPE_OFFER.length - 1)],
        rooms: getRandomInteger(10),
        guests: getRandomInteger(10),
        checkin: CHECK_OFFER[getRandomInteger(CHECK_OFFER.length - 1)],
        checkout: CHECK_OFFER[getRandomInteger(CHECK_OFFER.length - 1)],
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
  similarElement.style.src = currentElement.author.avatar;
  similarElement.style.alt = currentElement.offer.title;
  return similarElement;
};

var generateDOMElement = function () {
  var currentArray = generateArray();
  var similarList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var imgWidth = similarTemplate.querySelector('img').width;
  var imgHeight = similarTemplate.querySelector('img').height;

  for (var i = 0; i < 8; i++) {
    var pin = generatePinView(imgWidth, imgHeight, similarTemplate, currentArray[i]);
    fragment.appendChild(pin);
  }

  similarList.appendChild(fragment);
};

generateDOMElement();
deleteClass('.map', 'map--faded');
