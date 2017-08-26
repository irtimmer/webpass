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

class PassSearch {
  constructor(input, results) {
    this.input = input;
    this.results = results;

    this.input.addEventListener("input", this.onInput.bind(this));
  }

  onInput(event) {
    if (this.input.value.length == 0) {
      while (this.results.firstChild)
        this.results.removeChild(this.results.firstChild);
      
      return;
    }

    browser.runtime.sendNativeMessage("webpass", {
      cmd: "find",
      query: this.input.value
    }, (response) => {
      while (this.results.firstChild)
        this.results.removeChild(this.results.firstChild);

      for (let result of response.results) {
        let item = document.createElement("li");
        let button = document.createElement("button");

        button.textContent = result;
        button.addEventListener("click", this.onClick.bind(this));

        item.appendChild(button);
        this.results.appendChild(item);
      }
    });
  }

  onClick(event) {
    browser.runtime.sendMessage({ "action": "login", "name": event.target.textContent });
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  new PassSearch(document.getElementById("search"), document.getElementById("results"));
});
