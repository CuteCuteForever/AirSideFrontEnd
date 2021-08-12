export interface TopNavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: TopNavItem[];
}
