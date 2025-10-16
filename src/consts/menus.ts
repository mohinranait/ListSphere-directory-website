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
  Layers2,
  User2,
  Key,
  Heart,
  ListStart,
  Plus,
  Badge,
} from 'lucide-react'

// Admin sidebar menus
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
              title: 'Categories',
              url: '/admin/categories',
              icon: Layers2 ,
            },
            {
              title: 'Icons',
              url: '/admin/icons',
              icon: Monitor,
            },
           
          ],
        },
        
      ],
    },
  ]

// User profile sidebar menus
export const proifleMenus = {
  profils:[
    {
        title: 'Profile',
        url: '/profile',
        icon: User2,
    },
    {
        title: 'Change Password',
        url: '/profile/change-password',
        icon: Key,
    },
    {
        title: 'Favorites',
        url: '/profile/favorites',
        icon: Heart,
    },
  ],
  listers:[
    {
        title: 'Add Listing',
        url: '/profile/add-listing',
        icon: Plus,
    },
    {
        title: 'Manage Listing',
        url: '/profile/listing',
        icon: ListStart,
    },
    {
        title: 'Subscribetion',
        url: '/profile/subscribetion',
        icon: Badge,
    },
  ],
}

