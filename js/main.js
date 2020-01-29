// "author": {
// "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число
// от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
// }
'use strict';

var authors = [
  {avatar: 'img/avatars/user01.png'},
  {avatar: 'img/avatars/user02.png'},
  {avatar: 'img/avatars/user03.png'},
  {avatar: 'img/avatars/user04.png'},
  {avatar: 'img/avatars/user05.png'},
  {avatar: 'img/avatars/user06.png'},
  {avatar: 'img/avatars/user07.png'},
  {avatar: 'img/avatars/user08.png'}
];

//"offer": {
//  "title": строка, заголовок предложения
//  "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//  "price": число, стоимость
//  "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//  "rooms": число, количество комнат
//  "guests": число, количество гостей, которое можно разместить
//  "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//  "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//  "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//  "description": строка с описанием,
//  "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//  },

var offer = {
  title: '',
  address: '',
  price: 0,
  type: ['palace', 'flat', 'house', 'bungalo'],
  rooms: 0,
  guests: 0,
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: '',
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
};

var location = {
  x: '',
  y: 130,
};
