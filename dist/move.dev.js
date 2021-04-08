"use strict";

function move(obj, json, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var flag = true;

    for (var attr in json) {
      var iCur = 0;

      if (attr === 'opacity') {
        iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        iCur = parseFloat(getStyle(obj, attr));
      }

      var iSpeed = (json[attr] - iCur) / 10;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

      if (iCur !== json[attr]) {
        flag = false;

        if (attr === 'opacity') {
          obj.style.opacity = (iSpeed + iCur) / 100;
          obj.style.filter = 'alpha(opacity=' + (iSpeed + iCur) + ')';
        } else {
          obj.style[attr] = iSpeed + iCur + 'px';
        }
      }
    }

    if (flag) {
      clearInterval(obj.timer);
      fn && fn();
    }
  }, 1000 / 60);
}

function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj)[attr];
}