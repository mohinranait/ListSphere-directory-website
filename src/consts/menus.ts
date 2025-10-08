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

