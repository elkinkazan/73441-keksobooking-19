'use strict';

var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_OFFER = ['12:00', '13:00', '14:00'];
var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OBJECT_NUMBER = 8;
var MAX_X = 1100;
var MAX_Y = 630;
var MIN_Y = 130;
var PHOTOS_LENGTH = 3;
var FEAT_LENGTH = FEATURES_OFFER.length;
var CHECK_LENGTH = CHECK_OFFER.length;
var DISABLE_CLASS_1 = '.ad-form';
var DISABLE_CLASS_2 = '.map__filters';
var DISABLE_CLASS_3 = '.map';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
var ADDRESS_INPUT = document.querySelector('#address');
var MAP_PIN_MAIN_AFTER = getComputedStyle(MAP_PIN_MAIN, ':after');
var MAP_PINS = document.querySelector('.map__pins');
var pins = [];
var pageActivated = false;
var ROOM_NUMBER = document.querySelector('#room_number');
var CAPACITY = document.querySelector('#capacity');
var INPUT_TITLE = document.querySelector('#title');
var INPUT_PRICE = document.querySelector('#price');
var INPUT_TYPE = document.querySelector('#type');
var TIME_IN = document.querySelector('#timein');
var TIME_OUT = document.querySelector('#timeout');
var AVATAR = document.querySelector('#avatar');
var IMAGES = document.querySelector('#images');

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
        rooms: getRandomInteger(10) + 1,
        guests: getRandomInteger(3) + 1,
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

// var addClass = function (sectionName, className) {
//   var sectionNameList = document.querySelector(sectionName);
//   sectionNameList.classList.add(className);
// };

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

var generateCard = function (curArray) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var curOffer = curArray.offer;
  cardElement.querySelector('.popup__title').textContent = curOffer.title;
  cardElement.querySelector('.popup__text--address').textContent = curOffer.address;
  cardElement.querySelector('.popup__text--price').textContent = curOffer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerType(curOffer.type);

  if (curOffer.rooms === 1) {
    cardElement.querySelector('.popup__text--capacity').textContent = curOffer.rooms +
    ' комната для ';
  } else if (curOffer.rooms < 5) {
    cardElement.querySelector('.popup__text--capacity').textContent = curOffer.rooms +
    ' комнаты для ';
  } else {
    cardElement.querySelector('.popup__text--capacity').textContent = curOffer.rooms +
    ' комнат для ';
  }

  if (curOffer.guests === 1) {
    cardElement.querySelector('.popup__text--capacity').textContent += curOffer.guests + ' гостя';
  } else {
    cardElement.querySelector('.popup__text--capacity').textContent += curOffer.guests + ' гостей';
  }

  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + curOffer.checkin
  + ', выезд до ' + curOffer.checkout;
  cardElement.querySelector('.popup__description').textContent = curOffer.description;
  cardElement.querySelector('.popup__features').textContent = curOffer.features;
  cardElement.querySelector('.popup__avatar').src = curArray.author.avatar;
  displayPhoto(cardElement, curArray.offer.photos);
  cardElement.tabindex = 0;

  return cardElement;

};

var generateCardElement = function (arr) {
  var mapSection = document.querySelector('.map__filters-container');
  var cardfragment = document.createDocumentFragment();

  var card = generateCard(arr);
  cardfragment.appendChild(card);

  mapSection.before(cardfragment);

  card.addEventListener('click', function () {
    var mapCard = document.querySelector('.map__card');
    // var mapCardAfter = getComputedStyle(mapCard, ':after');
    // if (mapCard) {
    mapCard.remove();
    // }
  });

  card.addEventListener('keydown', function (evt) {
    var mapCard = document.querySelector('.map__card');
    if (evt.key === ENTER_KEY) {
      mapCard.remove();
    // }
    }
  });

  MAP_PINS.addEventListener('keydown', function (evt) {
    var mapCard = document.querySelector('.map__card');
    if (evt.key === ESC_KEY) {
      if (mapCard) {
        mapCard.remove();
      }
    }
  });
};


var generatePins = function () {
  pins = generateArray();
  var fragment = document.createDocumentFragment();
  var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var imgWidth = similarTemplate.querySelector('img').width;
  var imgHeight = similarTemplate.querySelector('img').height;

  for (var i = 0; i < OBJECT_NUMBER; i++) {
    var pin = generatePinView(imgWidth, imgHeight, similarTemplate, pins[i], i);
    fragment.appendChild(pin);
  }

  MAP_PINS.appendChild(fragment);

};


var activateAddress = function () {
  var clientRect = MAP_PIN_MAIN.getBoundingClientRect();
  ADDRESS_INPUT.value = Math.floor(clientRect.left + window.pageXOffset + clientRect.width / 2) + ', '
   + Math.floor(clientRect.top + window.pageYOffset + clientRect.height / 2);
  ADDRESS_INPUT.disabled = true;
};

var disactivateSection = function (exClass) {
  var chosenForm = document.querySelector(exClass);
  var chosenSection = chosenForm.querySelectorAll('fieldset');
  var chosenSectionLength = chosenSection.length;
  for (var a = 0; a < chosenSectionLength; a++) {
    chosenSection[a].disabled = true;
  }
};

var activateSection = function (exClass) {
  var chosenForm = document.querySelector(exClass);
  var chosenSection = chosenForm.querySelectorAll('fieldset');
  var chosenSectionLength = chosenSection.length;
  for (var a = 0; a < chosenSectionLength; a++) {
    chosenSection[a].disabled = false;
  }
};

var activate = function () {
  activateSection(DISABLE_CLASS_1);
  activateSection(DISABLE_CLASS_2);
  deleteClass(DISABLE_CLASS_3, 'map--faded');
  deleteClass(DISABLE_CLASS_1, 'ad-form--disabled');
  generatePins();
  roomNumberStart();
  AVATAR.accept = 'image/*';
  IMAGES.accept = 'image/*';
};

var onPinMainButtonMousedown = function (evt) {
  if ((!pageActivated) && (evt.button === 0)) {
    activate();
    pageActivated = true;
  }
};

var onPinMainButtonKeydown = function (evt) {
  if ((!pageActivated) && (evt.key === ENTER_KEY)) {
    activate();
    pageActivated = true;
  }
};

var onMainButtonMousedown = function (evt) {
  if ((pageActivated) && (evt.button === 0)) {
    var clientRect = MAP_PIN_MAIN.getBoundingClientRect();
    var PIN_TOP = MAP_PIN_MAIN_AFTER.top.slice(0, -2);
    var PIN_LEFT = MAP_PIN_MAIN_AFTER.left.slice(0, -2);
    ADDRESS_INPUT.value = Math.floor(clientRect.left + window.pageXOffset + Number(PIN_LEFT)) + ', '
    + Math.floor(clientRect.top + window.pageYOffset + Number(PIN_TOP));
  }
};

var roomNumberStart = function () {
  CAPACITY.options[0].disabled = true;
  CAPACITY.options[1].disabled = true;
  CAPACITY.options[2].disabled = false;
  CAPACITY.options[3].disabled = true;
};

var onRoomNumberChange = function (evt) {
  switch (evt.target.value) {
    case '1':
      CAPACITY.options[0].disabled = true;
      CAPACITY.options[1].disabled = true;
      CAPACITY.options[2].disabled = false;
      CAPACITY.options[3].disabled = true;
      break;
    case '2':
      CAPACITY.options[0].disabled = true;
      CAPACITY.options[1].disabled = false;
      CAPACITY.options[2].disabled = false;
      CAPACITY.options[3].disabled = true;
      break;
    case '3':
      CAPACITY.options[0].disabled = false;
      CAPACITY.options[1].disabled = false;
      CAPACITY.options[2].disabled = false;
      CAPACITY.options[3].disabled = true;
      break;
    case '100':
      CAPACITY.options[0].disabled = true;
      CAPACITY.options[1].disabled = true;
      CAPACITY.options[2].disabled = true;
      CAPACITY.options[3].disabled = false;
      break;
  }
};

var onInputTitleInvalid = function (evt) {
  var target = evt.target;
  if (target.validity.tooShort) {
    target.setCustomValidity('Минимальное значение - 30 символов');
  } else if (target.value.length > 100) {
    target.setCustomValidity('Максимальное значение - 100 символов');
  } else {
    target.setCustomValidity('');
  }
};

var onInputPriceInvalid = function (evt) {
  var targetPrice = evt.target;
  if (targetPrice.value > 1000000) {
    targetPrice.setCustomValidity('Максимальное значение - 1000000');
  } else {
    targetPrice.setCustomValidity('');
  }
};

var onInputTypeChange = function () {
  var inputTypeValue = INPUT_TYPE.value;
  if (inputTypeValue === 'bungalo') {
    INPUT_PRICE.placeholder = '0';
    INPUT_PRICE.min = 0;
    if (INPUT_PRICE.value < 0) {
      INPUT_PRICE.setCustomValidity('Минимальное значение - 0');
    }
  } else if (inputTypeValue === 'flat') {
    INPUT_PRICE.placeholder = '1000';
    INPUT_PRICE.min = 1000;
    if (INPUT_PRICE.value < 1000) {
      INPUT_PRICE.setCustomValidity('Минимальное значение - 1000');
    }
  } else if (inputTypeValue === 'house') {
    INPUT_PRICE.placeholder = '5000';
    INPUT_PRICE.min = 5000;
    if (INPUT_PRICE.value < 5000) {
      INPUT_PRICE.setCustomValidity('Минимальное значение - 5000');
    }
  } else if (inputTypeValue === 'palace') {
    INPUT_PRICE.placeholder = '10000';
    INPUT_PRICE.min = 10000;
    if (INPUT_PRICE.value < 10000) {
      INPUT_PRICE.setCustomValidity('Минимальное значение - 10000');
    }
  } else {
    INPUT_PRICE.setCustomValidity('');
  }
};

var onTimeInChange = function (evt) {
  TIME_OUT.value = evt.target.value;
};

var onTimeOutChange = function (evt) {
  TIME_IN.value = evt.target.value;
};

var activatePage = function () {
  MAP_PIN_MAIN.addEventListener('mousedown', onPinMainButtonMousedown);
  MAP_PIN_MAIN.addEventListener('mousedown', onMainButtonMousedown);
  MAP_PIN_MAIN.addEventListener('keydown', onPinMainButtonKeydown);
  MAP_PINS.addEventListener('click', onMapPinClick);
  MAP_PINS.addEventListener('keydown', onMapPinKeydown);
  ROOM_NUMBER.addEventListener('change', onRoomNumberChange);
  INPUT_TITLE.addEventListener('invalid', onInputTitleInvalid);
  INPUT_PRICE.addEventListener('invalid', onInputPriceInvalid);
  INPUT_TYPE.addEventListener('change', onInputTypeChange);
  TIME_IN.addEventListener('change', onTimeInChange);
  TIME_OUT.addEventListener('change', onTimeOutChange);
};

var onMapPinClick = function (evt) {
  if (evt.target.parentNode.id !== '') {
    generateCardElement(pins[evt.target.parentNode.id]);
  }
};

var onMapPinKeydown = function (evt) {
  if ((evt.target.id !== '') && (evt.key === ENTER_KEY)) {
    generateCardElement(pins[evt.target.id]);
  }
};

disactivateSection(DISABLE_CLASS_1);
disactivateSection(DISABLE_CLASS_2);

activatePage();
activateAddress();
