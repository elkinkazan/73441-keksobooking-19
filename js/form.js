'use strict';

(function () {
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');
  var ADDRESS_INPUT = document.querySelector('#address');
  var CAPACITY = document.querySelector('#capacity');
  var INPUT_PRICE = document.querySelector('#price');
  var INPUT_TYPE = document.querySelector('#type');
  var ROOM_NUMBER = document.querySelector('#room_number');
  var INPUT_TITLE = document.querySelector('#title');
  var TIME_IN = document.querySelector('#timein');
  var TIME_OUT = document.querySelector('#timeout');

  var activateAddress = function () {
    var clientRect = MAP_PIN_MAIN.getBoundingClientRect();
    ADDRESS_INPUT.value = Math.floor(clientRect.left + window.pageXOffset + clientRect.width / 2) + ', ' +
      Math.floor(clientRect.top + window.pageYOffset + clientRect.height / 2);
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
    ROOM_NUMBER.addEventListener('change', onRoomNumberChange);
    INPUT_TITLE.addEventListener('invalid', onInputTitleInvalid);
    INPUT_PRICE.addEventListener('invalid', onInputPriceInvalid);
    INPUT_TYPE.addEventListener('change', onInputTypeChange);
    TIME_IN.addEventListener('change', onTimeInChange);
    TIME_OUT.addEventListener('change', onTimeOutChange);
  };

  disactivateSection('.ad-form');
  disactivateSection('.map__filters');

  activatePage();
  activateAddress();
})();
