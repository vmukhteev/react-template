/* global NODE_ENV, ga */

export function googleEvent(...args) {
  if(NODE_ENV === 'production') {
    ga(...args);
  }
}

export function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return pair[1] ? decodeURIComponent(pair[1]) : null;
    }
  }
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

export function triggerEvent(el,eventName){
  let event;
  if(document.createEvent){
    event = document.createEvent('Event');
    event.initEvent(eventName,true,true);
  }else if(document.createEventObject){// IE < 9
    event = document.createEventObject();
    event.eventType = eventName;
  }
  event.eventName = eventName;
  if(el.dispatchEvent){
    el.dispatchEvent(event);
  }else if(el.fireEvent && htmlEvents['on'+eventName]){// IE < 9
    el.fireEvent('on'+event.eventType,event);// can trigger only real event (e.g. 'click')
  }else if(el[eventName]){
    el[eventName]();
  }else if(el['on'+eventName]){
    el['on'+eventName]();
  }
}

export function getAPI(api, {prod, dev}) {
  switch (api) {
    case null: {
      if(window.location.origin.match('dev.') || NODE_ENV === 'development') {
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
    return (/^[А-яЁё\-]*$/i.test(value));
  },
  isPhone: (value) => {
    return (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/.test(value));
  },
  isCard: (value) => {
    return (/^[0-9]{5}$/.test(value));
  },
  isDate: (value) => {
    return (/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(value));
  },
};