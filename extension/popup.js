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
    this.selectionIndex = -1;

    this.input.addEventListener("input", this.onInput.bind(this));
    this.input.addEventListener("keydown", this.onKeyDown.bind(this));
    this.input.addEventListener("blur", this.onBlur.bind(this));
    browser.tabs.query({ currentWindow: true, active: true }, this.onTabs.bind(this));
  }

  search(query) {
    if (!query) {
      while (this.results.firstChild)
        this.results.removeChild(this.results.firstChild);
      
      return;
    }

    browser.runtime.sendNativeMessage("webpass", {
      cmd: "find",
      query: query
    }, (response) => {
      while (this.results.firstChild)
        this.results.removeChild(this.results.firstChild);

      for (let result of response.results) {
        let domain = result.split('/').reverse()[0];

        let item = document.createElement("li");
        let button = document.createElement("button");
        let favicon = document.createElement("img");
        let label = document.createElement("span");

        favicon.setAttribute("src", "https://s2.googleusercontent.com/s2/favicons?domain=" + domain);
        label.textContent = result;
        button.addEventListener("click", this.onClick.bind(this));

        button.appendChild(favicon);
        button.appendChild(label);
        item.appendChild(button);
        this.results.appendChild(item);
      }
    });
  }

  onTabs(tabs) {
    if (tabs[0] && tabs[0].url)
      this.search(new URL(tabs[0].url).hostname);
  }

  onInput(event) {
    this.search(this.input.value.length > 0 ? this.input.value : null);
  }

  onClick(event) {
    browser.runtime.sendMessage({ "action": "login", "name": event.target.textContent });
    window.close();
  }

  onBlur(event) {
    if (this.results.children[this.selectionIndex])
      this.results.children[this.selectionIndex].className = null;

    this.selectionIndex = -1;
  }

  onKeyDown(event) {
    if (event.keyCode == 0x0d && this.results.children[this.selectionIndex]) {
      browser.runtime.sendMessage({ "action": "login", "name": this.results.children[this.selectionIndex].textContent });
      window.close();
    } else if (event.keyCode == 0x26 && this.selectionIndex > 0)
      this.selectionIndex--;
    else if (event.keyCode == 0x28 && this.selectionIndex < this.results.childElementCount - 1)
      this.selectionIndex++;
    else
      return;

    for (let e of this.results.getElementsByClassName('focus'))
      e.className = null;

    this.results.children[this.selectionIndex].className = "focus";
    event.preventDefault();
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  new PassSearch(document.getElementById("search"), document.getElementById("results"));
});
