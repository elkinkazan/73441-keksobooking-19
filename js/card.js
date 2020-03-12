'use strict';

(function () {

  var MAP_PINS = document.querySelector('.map__pins');

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

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + curOffer.checkin +
      ', выезд до ' + curOffer.checkout;
    cardElement.querySelector('.popup__description').textContent = curOffer.description;
    cardElement.querySelector('.popup__features').textContent = curOffer.features;
    cardElement.querySelector('.popup__avatar').src = curArray.author.avatar;
    displayPhoto(cardElement, curArray.offer.photos);
    cardElement.tabindex = 0;

    return cardElement;

  };

  var generateCardElement = function (arr) {
    if (arr) {
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
        if (evt.key === window.data.ENTER_KEY) {
          mapCard.remove();
        }
      });

      MAP_PINS.addEventListener('keydown', function (evt) {
        var mapCard = document.querySelector('.map__card');
        if (evt.key === window.data.ESC_KEY) {
          if (mapCard) {
            mapCard.remove();
          }
        }
      });
    }
  };

  window.card = {
    generateElement: generateCardElement,
    generate: generateCard,
  };
})();
