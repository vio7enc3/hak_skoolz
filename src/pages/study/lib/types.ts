export interface IPlayCard {
  bgColor: string;
  title: string;
  btnText: string;
  btnDisabled?: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> & {
    title?: string | undefined;
  };
  to?: string;
}
