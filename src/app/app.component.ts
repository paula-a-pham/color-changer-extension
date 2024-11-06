/// <reference types="chrome" />
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'color-changer';

  changeColor(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        console.error('Error querying tabs: ', chrome.runtime.lastError);
        alert('Error querying tabs');
        return;
      }

      const currentTab = tabs[0].id;

      chrome.runtime.sendMessage(
        { action: 'COLOR_CHANGE_REQUEST', tabId: currentTab },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(
              'Error sending message to background : ',
              chrome.runtime.lastError
            );
            alert('Error sending message to background please try again');
            return;
          }

          if (!response) {
            console.error('No response received from the background file.');
            alert('No response received from the background file.');
            return;
          }

          if (response.status) {
            alert('Color changed successfully.');
          } else {
            console.error(response.errorMessage);
            alert(response.errorMessage);
            return;
          }
        }
      );
    });
  }
}
