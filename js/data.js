'use strict';

(function () {

  var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_OFFER = ['12:00', '13:00', '14:00'];
  var FEATURES_OFFER = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OBJECT_NUMBER = 8;
  var MAX_X = 1100;
  var MAX_Y = 630;
  var MIN_Y = 130;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var FEAT_LENGTH = FEATURES_OFFER.length;
  var CHECK_LENGTH = CHECK_OFFER.length;

  var getRandomInteger = function (max) {
    return Math.floor(Math.random() * max);
  };

  window.data = {
    TYPE_OFFER: TYPE_OFFER,
    CHECK_OFFER: CHECK_OFFER,
    FEATURES_OFFER: FEATURES_OFFER,
    OBJECT_NUMBER: OBJECT_NUMBER,
    MAX_X: MAX_X,
    MAX_Y: MAX_Y,
    MIN_Y: MIN_Y,
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    FEAT_LENGTH: FEAT_LENGTH,
    CHECK_LENGTH: CHECK_LENGTH,
    getRandomInteger: getRandomInteger,
  };
})();
