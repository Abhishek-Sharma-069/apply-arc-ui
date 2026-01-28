import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './messages.html',
  styleUrls: ['./messages.css'],
})
export class Messages {
  conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      company: 'Google',
      lastMessage: 'Thanks for your interest! We will review your application...',
      time: '2 hours ago',
      unread: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    {
      id: 2,
      name: 'Mike Johnson',
      company: 'Meta',
      lastMessage: 'Can you tell us more about your experience with...',
      time: '5 hours ago',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Apple',
      lastMessage: 'We are excited to move forward with the next round...',
      time: '1 day ago',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    },
  ];
}
