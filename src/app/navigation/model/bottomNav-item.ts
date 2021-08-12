export interface BottomNavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: BottomNavItem[];
}
