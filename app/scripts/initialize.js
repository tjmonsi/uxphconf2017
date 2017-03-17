document.addEventListener('DOMContentLoaded', function() {
  // do your setup here
  UXPH.Core = document.getElementById('core-component');
  console.log(UXPH.Core);
  registerService();
  /**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function registerService () {
  'use strict';
  console.log('registering')

  // Ensure we only attempt to register the SW once.
  var isAlreadyRegistered = false;

  var URL = '/service-worker.js';
  var SCOPE = '/';

  var register = function () {
    if (!isAlreadyRegistered) {
      isAlreadyRegistered = true;

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(URL, {
          scope: SCOPE
        }).then(function (registration) {
          registration.onupdatefound = function () {
            // The updatefound event implies that registration.installing is set; see
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function () {
              switch (installingWorker.state) {
                case 'installed':
                  if (!navigator.serviceWorker.controller) {
                    UXPH.Core.showMessage(
                      'Caching complete! Future visits will work offline.');
                  }
                  break;

                case 'redundant':
                  console.error(Error('The installing service worker became redundant.'));
                  Raven.captureMessage('The installing service worker became redundant.');
              }
            };
          };
        }).catch(function (e) {
          // KORERO.Analytics.trackError('navigator.serviceWorker.register() error', e);
          Raven.captureMessage('Service worker registration failed:', e);
          console.error('Service worker registration failed:', e);
        });
      }
    }
  };

  // Check to see if the service worker controlling the page at initial load
  // has become redundant, since this implies there's a new service worker with fresh content.
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.onstatechange = function (event) {
      if (event.target.state === 'redundant') {
        // Define a handler that will be used for the next io-toast tap, at which point it
        // be automatically removed.
        var tapHandler = function () {
          window.location.reload();
        };

        if (UXPH.Core && UXPH.Core.showMessage) {
          UXPH.Core.showMessage(
            'A new version of this app is available.', tapHandler, 'Refresh',
            null, 0); // duration 0 indications shows the toast indefinitely.
        } else {
          tapHandler(); // Force reload if user never was shown the toast.
        }
      }
    };
  }

  register();
}

});
