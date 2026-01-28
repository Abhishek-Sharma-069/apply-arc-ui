import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Product Designer with 5+ years of experience',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  };

  skills = ['UI/UX Design', 'Prototyping', 'User Research', 'Figma', 'Adobe XD', 'HTML/CSS'];
}
