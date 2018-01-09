/* global NODE_ENV, ga */
import qs from 'qs';
import {getDistance} from '../common/math';

export const IS_PROD = !(window.location.origin.match('dev.') || window.location.origin.match('herokuapp.') || window.location.origin.match('.bstd') || NODE_ENV === 'development');

export function getQuery(location) {
  return qs.parse(location.search.replace(/^\?/, ''));
}

export function changeQuery(history, location, query) {
  return history.push(`${location.pathname}?${qs.stringify({
    ...getQuery(location),
    ...query
  })}`);
}

export function setQuery(history, location, query) {
  return history.push(`${location.pathname}?${qs.stringify(query)}`);
}

export function getMapped(obj, map) {
  let res = {};
  Object.keys(obj).forEach((key) => {
    res[map[key]] = obj[key];
  });
  return res;
}

export function timeout(f, time) {
  return {
    id: setTimeout(f, time),
    func: f,
    endTime: (new Date().getTime()) + time
  };
}
export function finishTimeout(timeout) {
  if(!timeout) return;
  clearTimeout(timeout && timeout.id);
  if((new Date().getTime()) < timeout.endTime) {
    timeout.func && timeout.func();
  }
}

export function getAPI(api, {prod, dev}) {
  switch (api) {
    case null: {
      if(!IS_PROD) {
        return dev;
      }
      else {
        return prod;
      }
    }
    case 'prod': {
      return prod;
    }
    case 'dev': {
      return dev;
    }
    default: {
      return api;
    }
  }
}

export const validators = {
  isEmail: (value) => {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
  },
  isName: (value) => {
    return (/^[А-яЁё\-\s]*$/i.test(value));
  },
  isPhone: (value, code) => {
    switch (code) {
      case '375': {
        return (/\(\d\d\) \d\d\d \d\d \d\d/.test(value));
      }
      default: {
        return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/.test(value));
      }
    }

  },
  isCard: (value) => {
    return (/^[0-9]{5}$/.test(value));
  },
  isDate: (value) => {
    if(device.mobile()) {
      return (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value));
    }
    return (/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(value));
  },
};

export function loop(number, start, length) {
  // const end = start + length - 1;
  // const numberOffset = start - number;
  //TODO упрощенная версия
  if(number < start) return length - 1;
  if(number >= length) return start;
  return number;
}

export const SCROLLBAR_WIDTH = getScrollbarWidth();
function getScrollbarWidth() {
  let outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

  document.body.appendChild(outer);

  let widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = "scroll";

  // add innerdiv
  let inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  let widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}

export function arrayToObject(array, field = "id", deep = false) {
  let res = {};
  array.forEach((item) => {
    res[item[field]] = deep ? normalizeData(item, field) : item;
  });
  return res;
}
export function normalizeData(obj, field = "id", deep = false) {
  let res = {};
  Object.keys(obj).forEach((key) => {
    if(obj[key] instanceof Array) {
      if(!isObject(obj[key][0]) || obj[key].length === 0) {
        res[key] = obj[key];
      }
      else {
        res[key] = arrayToObject(obj[key], field, deep);
      }
    }
    else if(obj[key] instanceof Object) {
      res[key] = normalizeData(obj[key], field);
    }
    else {
      res[key] = obj[key];
    }
  });
  return res;
}


export function isArray(obj) {
  return obj instanceof Array;
}

export function isObject(obj) {
  return !(obj instanceof Array) && (obj instanceof Object)
}

/* global lucy, ga */
export function trackField({name, value}) {
  IS_PROD && typeof lucy !== 'undefined' && typeof lucy.trackInput === 'function' && lucy.trackInput({ name, value });
}
export function trackPageLoad() {
  IS_PROD && typeof lucy !== 'undefined' && typeof lucy.trackPageLoad === 'function' && lucy.trackPageLoad();
}
export function trackData(data) {
  IS_PROD && typeof lucy !== 'undefined' && typeof lucy.trackData === 'function' && lucy.trackData(data);
}
export function trackAction(data) {
  IS_PROD && typeof lucy !== 'undefined' && typeof lucy.trackAction === 'function' && lucy.trackAction({
    ...data,
    href: window.location.href
  });
}
export function fbEvent(...args) {
  IS_PROD && typeof fbq === 'function' && fbq(...args);
}
export function googleEvent(...args) {
  IS_PROD && typeof ga === 'function' && ga(...args);
}

export function getCoords(address) {
  return new Promise((resolve, reject) => {
    (new google.maps.Geocoder()).geocode(
      {address},
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        } else {
          reject(status);
        }
      });
  });
}

export function getNearestCoords(coords, coordsList) {
  return coordsList
    .map((coordsItem) => {
      return {
        item: coordsItem,
        distanceTo: getDistance(coords, coordsItem)
      }
    })
    .sort((a, b) => a.distanceTo - b.distanceTo)
    [0];
}

export function sortBy(field) {
  return function(a, b){
    let textA = a[field].toUpperCase();
    let textB = b[field].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }
}

export function getAge(dateString) {
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function isoDate(string) {
  if(device.mobile()) {
    return string;
  }
  let dateElems = string && string.split('.');
  return `${dateElems[2]}-${dateElems[1]}-${dateElems[0]}`;
}

export function generateId(length = 8) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const getRelativeDate = ({initialDate, year, day} = {}) => {
  let date = initialDate || new Date();
  year && date.setFullYear( date.getFullYear() + year );
  day && date.setDate( date.getDate() + day );
  return date;
};