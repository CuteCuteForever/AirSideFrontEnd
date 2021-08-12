export interface MiddleNavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: MiddleNavItem[];
}
