/*
 * This file is part of WebPass.
 * Copyright (C) 2017 Iwan Timmer
 *
 * WebPass is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * WebPass is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

"use strict";

const APP_NAME = "webpass";

var browser = browser || chrome;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "login") {
    browser.runtime.sendNativeMessage("webpass", {
      cmd: "show",
      name: request.name
    }, (response) => {
      browser.tabs.executeScript({ file: '/inject.js', allFrames: true }, function() {
        let login = {
          username: response.meta.login,
          password: response.password
        };
        browser.tabs.executeScript({code: 'document.webpass.login(' + JSON.stringify(login) + ');'});
      });
    });
  }
});
