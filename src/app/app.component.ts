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
    });
  }
}
