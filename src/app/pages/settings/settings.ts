import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings {
  settings = [
    {
      section: 'Account',
      options: [
        { label: 'Email Notifications', enabled: true },
        { label: 'Push Notifications', enabled: true },
        { label: 'SMS Updates', enabled: false },
      ],
    },
    {
      section: 'Privacy',
      options: [
        { label: 'Profile Visibility', enabled: true },
        { label: 'Search Engine Indexing', enabled: false },
        { label: 'Share Statistics', enabled: true },
      ],
    },
  ];

  toggleSetting(option: any) {
    option.enabled = !option.enabled;
  }
}
