import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Jobs } from './pages/jobs/jobs';
import { Profile } from './pages/profile/profile';
import { Analytics } from './pages/analytics/analytics';
import { Messages } from './pages/messages/messages';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'jobs', component: Jobs },
  { path: 'profile', component: Profile },
  { path: 'analytics', component: Analytics },
  { path: 'messages', component: Messages },
  { path: 'settings', component: Settings },
];
