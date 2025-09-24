import { NavGroup } from '@/types/nav.type'
import {

  LayoutDashboard,

  Package,
  Users,

  Settings,
  UserCog,
  Wrench,
  Palette,
  Bell,
  Monitor,
  HelpCircle,
  KeyRound,
} from 'lucide-react'

export const sidebarData: NavGroup[] = [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: LayoutDashboard,
        },
        {
          title: 'Package',
          url: '/admin/package',
          icon: Package,
        },
        {
          title: 'Users',
          url: '/admin/users',
          icon: Users,
        },
        {
          title: 'Secured by Clerk',
          icon: KeyRound, 
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
  
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ]

