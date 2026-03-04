import server from "@/utils/request";
import type { ApiResponse } from "@/types/api";


type MenuType = 'menu' | 'button';
export interface MenuListItem {
  id: string;
  path: string;
  name: string;
  title: string;
  icon: string;
  component: string;
  parentId: string;
  sort: number;
  isVisible: boolean;
  keepAlive: boolean;
  type: MenuType;
  children?: MenuListItem[]; // 递归引用自身
}
export const reqMenuList = () =>
  server.get<ApiResponse<MenuListItem[]>>('/menus/user-menus');