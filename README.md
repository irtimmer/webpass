# WebPass
WebPass is a web extension for [zx2c4's pass](https://www.passwordstore.org/).
It can autofill passwords from your password store into website login pages.

## Requirements
- Web extension compatible browser like Chrome or Firefox
- GPG installed and available in your PATH
- Python 3 installed as default Python interpreter

## Installation
The WebPass extension requires the installation of a native messaging host.
Download *host/webpass* and change *path* in *host/\*.json* so it refers to *host/webpass*.
Copy *host/webpass.chrome.json* or *host/webpass.firefox.json*, depending on your browser to finish the installation:

- Linux/BSD
  - Chrome/Chromium
    - User: `~/.config/{google-chrome,chromium}/NativeMessagingHosts/webpass.json`
    - System: `/etc/{opt/chrome,chromium}/native-messaging-hosts/webpass.json`
  - Firefox
    - User: `~/.mozilla/native-messaging-hosts/webpass.json`
    - System: `/usr/{lib,lib64,share}/mozilla/native-messaging-hosts/webpass.json`
- MacOS
  - Chrome/Chromium
    - Per-user: `~/Library/Application Support/{Google/Chrome,Chromium}/NativeMessagingHosts/webpass.json`
    - System-wide: `/Library/{Google/Chrome,Chromium}/NativeMessagingHosts/webpass.json`
  - Firefox
    - `/Library/Application Support/Mozilla/NativeMessagingHosts/webpass.json`

The extensions can be made by running `make`.
Install *webpass.xpi* (Firefox) or *webpass.crx* (Chrome/Chromium) into your browser.

## Copyright and license
Copyright 2017 Iwan Timmer.  
Distributed under the GNU GPL v2 or later. For full terms see the LICENSE file.
