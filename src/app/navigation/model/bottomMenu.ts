import { BottomNavItem } from './bottomNav-item';

export let bottomMenu: BottomNavItem[] = [
  {
    displayName: 'Settings',
    iconName: 'settings',
    children: [
      {
        displayName: 'RFID',
        iconName: 'settings_overscan',
        route: 'rfid'
      },
      {
        displayName: 'Antenna',
        iconName: 'settings_input_antenna',
        route: 'antenna'
      }
    ]
  }
];
