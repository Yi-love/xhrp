'use strict';
export const root = window;
export const document = window.document;
export const originAnchor = document.createElement('a');
export const location = window.location;
originAnchor.href = location.href;
export const escape = window.encodeURIComponent;
export const head = document.head || document.getElementsByTagName('head')[0];
export const XMLHttpRequest = window.XMLHttpRequest;