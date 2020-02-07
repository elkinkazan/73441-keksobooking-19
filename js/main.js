'use strict';

var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OBJECT_NUMBER = 9;
// var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_X = 1100;
var MAX_Y = 630;
var MIN_Y = 130;

var getPhotos = function (num) {
  if (num === 0) {
    num = 1;
  }
  return 'http://o0.github.io/assets/images/tokyo/hotel' + num + '.jpg';
};

var getRandomInteger = function (max) {
  return Math.floor(Math.random() * max);
};

var generateArray = function () {
  var arr = [];
  for (var i = 0; i < OBJECT_NUMBER; i++) {
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
        features: FEATURES_OFFER.slice(0, getRandomInteger(FEATURES_OFFER.length - 1)),
        description: 'Description' + (i + 1),
        //  photos: PHOTOS[getRandomInteger(PHOTOS.length - 1)],
        photos: getPhotos(getRandomInteger(3))
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

var generateDOMElement = function () {
  var currentArray = generateArray();
  var similarList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var imgWidth = similarTemplate.querySelector('img').width;
  var imgHeight = similarTemplate.querySelector('img').height;
  for (var i = 0; i < 8; i++) {
    var similarElement = similarTemplate.cloneNode(true);
    var locationX = currentArray[i].location.x + imgWidth;
    var locationY = currentArray[i].location.y + imgHeight;
    similarElement.style = 'left:' + locationX + 'px; top: ' + locationY + 'px;';
    similarElement.style.src = currentArray[i].author.avatar;
    similarElement.style.alt = currentArray[i].offer.title;
    fragment.appendChild(similarElement);
  }
  similarList.appendChild(fragment);
};

generateDOMElement();
deleteClass('.map', 'map--faded');
