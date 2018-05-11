import { defineCustomElements } from '@ionic/core';
import { IonicWindow } from './types/interfaces';


export function setupIonic() {
  return function() {
    const win = (window as IonicWindow);
    const Ionic = (win.Ionic = win.Ionic || {});

    Ionic.ael = function ngAddEventListener(elm, eventName, cb, opts) {
      if (elm.__zone_symbol__addEventListener) {
        elm.__zone_symbol__addEventListener(eventName, cb, opts);
      } else {
        elm.addEventListener(eventName, cb, opts);
      }
    };

    Ionic.rel = function ngRemoveEventListener(elm, eventName, cb, opts) {
      if (elm.__zone_symbol__removeEventListener) {
        elm.__zone_symbol__removeEventListener(eventName, cb, opts);
      } else {
        elm.removeEventListener(eventName, cb, opts);
      }
    };

    Ionic.raf = function ngRequestAnimationFrame(cb: any) {
      if (win.__zone_symbol__requestAnimationFrame) {
        win.__zone_symbol__requestAnimationFrame(cb);
      } else {
        win.requestAnimationFrame(cb);
      }
    };

    defineCustomElements(win);
  };
}
