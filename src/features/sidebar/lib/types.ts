import { CabinetType } from '@/entities/app/model/types';
import { UserType } from '@/entities/session/model/types';

interface ConditionArgs {
  cabinetType: CabinetType;
  userType: UserType;
}

interface NavItemBase {
  icon: string;
  // activeIcon: FunctionComponent<
  //   SVGProps<SVGSVGElement> & {
  //     title?: string | undefined;
  //   }
  // >;
  label: string;
  condition?: (args: ConditionArgs) => boolean;
}

interface NavItemWithTo extends NavItemBase {
  to: string;
}

export interface SubNavItem {
  label: string;
  to: string;
  condition?: (args: ConditionArgs) => boolean;
}

interface NavItemAccordion extends NavItemBase {
  items: SubNavItem[];
}

export type NavItem = NavItemWithTo | NavItemAccordion;
