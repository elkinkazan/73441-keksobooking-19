'use strict';

(function () {
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
  var MAP_PIN_MAIN_AFTER = getComputedStyle(MAP_PIN_MAIN, ':after');
  var MAP_PINS = document.querySelector('.map__pins');
  var pins = [];
  var pageActivated = false;
  var AVATAR = document.querySelector('#avatar');
  var IMAGES = document.querySelector('#images');
  var CAPACITY = document.querySelector('#capacity');
  var ADDRESS_INPUT = document.querySelector('#address');
  var PHOTOS_LENGTH = 3;

  var deleteClass = function (sectionName, className) {
    var sectionNameList = document.querySelector(sectionName);
    sectionNameList.classList.remove(className);
  };

  var activateSection = function (exClass) {
    var chosenForm = document.querySelector(exClass);
    var chosenSection = chosenForm.querySelectorAll('fieldset');
    var chosenSectionLength = chosenSection.length;
    for (var a = 0; a < chosenSectionLength; a++) {
      chosenSection[a].disabled = false;
    }
  };


  var createPhotos = function () {
    var photos = [];

    for (var i = 0; i < PHOTOS_LENGTH; i++) {
      photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
    }

    return photos;
  };

  var roomNumberStart = function () {
    CAPACITY.options[0].disabled = true;
    CAPACITY.options[1].disabled = true;
    CAPACITY.options[2].disabled = false;
    CAPACITY.options[3].disabled = true;
  };

  var activate = function () {
    activateSection('.ad-form');
    activateSection('.map__filters');
    deleteClass('.map', 'map--faded');
    deleteClass('.ad-form', 'ad-form--disabled');
    generatePins();
    roomNumberStart();
    AVATAR.accept = 'image/*';
    IMAGES.accept = 'image/*';
  };

  var generateArray = function () {
    var arr = [];

    for (var i = 0; i < window.data.OBJECT_NUMBER; i++) {
      var featNum1 = window.data.getRandomInteger(window.data.FEAT_LENGTH);
      var featNum2 = window.data.getRandomInteger(window.data.FEAT_LENGTH);
      var photoNum = window.data.getRandomInteger(window.data.PHOTOS_LENGTH);
      var currentObject = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Title' + (i + 1),
          address: '' + window.data.getRandomInteger(1000) + ',' + window.data.getRandomInteger(1000) + '',
          price: window.data.getRandomInteger(10000),
          type: window.data.TYPE_OFFER[window.data.getRandomInteger(window.data.TYPE_OFFER.length)],
          rooms: window.data.getRandomInteger(10) + 1,
          guests: window.data.getRandomInteger(3) + 1,
          checkin: window.data.CHECK_OFFER[window.data.getRandomInteger(window.data.CHECK_LENGTH)],
          checkout: window.data.CHECK_OFFER[window.data.getRandomInteger(window.data.CHECK_LENGTH)],
          features: window.data.FEATURES_OFFER.slice(Math.min(featNum1, featNum2), Math.max(featNum1, featNum2)),
          description: 'Description' + (i + 1),
          photos: createPhotos().slice(photoNum)
        },
        location: {
          x: window.data.getRandomInteger(window.data.MAX_X),
          y: window.data.getRandomInteger(window.data.MAX_Y - window.data.MIN_Y) + window.data.MIN_Y,
        },
      };
      arr[i] = currentObject;
    }
    return arr;
  };


  var generatePinView = function (iWidth, iHeight, Template, currentElement, index) {
    var similarElement = Template.cloneNode(true);
    var locationX = currentElement.location.x + iWidth;
    var locationY = currentElement.location.y + iHeight;
    var imgElement = similarElement.querySelector('img');
    similarElement.style = 'left:' + locationX + 'px; top: ' + locationY + 'px;';
    imgElement.src = currentElement.author.avatar;
    imgElement.alt = currentElement.offer.title;
    similarElement.id = index;
    similarElement.tabindex = 0;
    return similarElement;
  };

  var generatePins = function () {
    pins = generateArray();
    var fragment = document.createDocumentFragment();
    var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var imgWidth = similarTemplate.querySelector('img').width;
    var imgHeight = similarTemplate.querySelector('img').height;

    for (var i = 0; i < window.data.OBJECT_NUMBER; i++) {
      var pin = generatePinView(imgWidth, imgHeight, similarTemplate, pins[i], i);
      fragment.appendChild(pin);
    }

    MAP_PINS.appendChild(fragment);

  };

  var onPinMainButtonMousedown = function (evt) {
    if ((!pageActivated) && (evt.button === 0)) {
      activate();
      pageActivated = true;
    }
  };

  var onPinMainButtonKeydown = function (evt) {
    if ((!pageActivated) && (evt.key === window.data.ENTER_KEY)) {
      activate();
      pageActivated = true;
    }
  };

  var onMainButtonMousedown = function (evt) {
    if ((pageActivated) && (evt.button === 0)) {
      var clientRect = MAP_PIN_MAIN.getBoundingClientRect();
      var PIN_TOP = MAP_PIN_MAIN_AFTER.top.slice(0, -2);
      var PIN_LEFT = MAP_PIN_MAIN_AFTER.left.slice(0, -2);
      ADDRESS_INPUT.value = Math.floor(clientRect.left + window.pageXOffset + Number(PIN_LEFT)) + ', ' +
        Math.floor(clientRect.top + window.pageYOffset + Number(PIN_TOP));
    }
  };

  var onMapPinClick = function (evt) {
    if (evt.target.parentNode.id !== '') {
      window.card.generateElement(pins[evt.target.parentNode.id]);
    }
  };

  var onMapPinKeydown = function (evt) {
    if ((evt.target.id !== '') && (evt.key === window.data.ENTER_KEY)) {
      window.card.generateElement(pins[evt.target.id]);
    }
  };

  MAP_PIN_MAIN.addEventListener('mousedown', onPinMainButtonMousedown);
  MAP_PIN_MAIN.addEventListener('mousedown', onMainButtonMousedown);
  MAP_PIN_MAIN.addEventListener('keydown', onPinMainButtonKeydown);
  MAP_PINS.addEventListener('click', onMapPinClick);
  MAP_PINS.addEventListener('keydown', onMapPinKeydown);
})();
