'use strict';
import {XMLHttpRequest} from './dom.js';

export function abortXhr(promise , map){
  if ( typeof promise === 'undefined' ) {
    return false;
  }
  let request;
  for ( let req in map ){
    if ( map[req].promise === promise ){
      request = map[req].request;
      break;
    }
  }
  if ( request && (request.readyState !== XMLHttpRequest.UNSENT || request.jsonp) ){
    request.abort();
    return true;
  }
  return false;
}