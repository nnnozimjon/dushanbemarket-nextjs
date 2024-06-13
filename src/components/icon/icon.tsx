import React, { SVGProps } from "react";
import { cn } from "../../utils";

export interface IIcons {
  "2user": React.ReactNode;
  "3user": React.ReactNode;
  activity: React.ReactNode;
  addUser: React.ReactNode;
  arrowDown: React.ReactNode;
  arrowDown2: React.ReactNode;
  arrowDown3: React.ReactNode;
  arrowDownCircle: React.ReactNode;
  arrowDownSquare: React.ReactNode;
  arrowLeft: React.ReactNode;
  arrowLeft2: React.ReactNode;
  arrowLeft3: React.ReactNode;
  arrowLeftCircle: React.ReactNode;
  arrowLeftSquare: React.ReactNode;
  arrowRight: React.ReactNode;
  arrowRight2: React.ReactNode;
  arrowRight3: React.ReactNode;
  arrowRightCircle: React.ReactNode;
  arrowRightSquare: React.ReactNode;
  arrowUp: React.ReactNode;
  arrowUp2: React.ReactNode;
  arrowUp3: React.ReactNode;
  arrowUpCircle: React.ReactNode;
  arrowUpSquare: React.ReactNode;
  bag: React.ReactNode;
  bag2: React.ReactNode;
  bookmark: React.ReactNode;
  buy: React.ReactNode;
  calendar: React.ReactNode;
  call: React.ReactNode;
  calling: React.ReactNode;
  callMissed: React.ReactNode;
  callSilent: React.ReactNode;
  camera: React.ReactNode;
  category: React.ReactNode;
  chat: React.ReactNode;
  chat2: React.ReactNode;
  closeSquare: React.ReactNode;
  danger: React.ReactNode;
  delete: React.ReactNode;
  discount: React.ReactNode;
  discovery: React.ReactNode;
  document: React.ReactNode;
  download: React.ReactNode;
  edit: React.ReactNode;
  editSquare: React.ReactNode;
  filter: React.ReactNode;
  filter2: React.ReactNode;
  folder: React.ReactNode;
  game: React.ReactNode;
  graph: React.ReactNode;
  heart: React.ReactNode;
  hide: React.ReactNode;
  home: React.ReactNode;
  image: React.ReactNode;
  image2: React.ReactNode;
  infoCircle: React.ReactNode;
  infoSquare: React.ReactNode;
  location: React.ReactNode;
  lock: React.ReactNode;
  login: React.ReactNode;
  logout: React.ReactNode;
  message: React.ReactNode;
  moreCircle: React.ReactNode;
  moreSquare: React.ReactNode;
  notification: React.ReactNode;
  paper: React.ReactNode;
  paperDownload: React.ReactNode;
  paperFail: React.ReactNode;
  paperNegative: React.ReactNode;
  paperPlus: React.ReactNode;
  paperUpload: React.ReactNode;
  password: React.ReactNode;
  play: React.ReactNode;
  plus2: React.ReactNode;
  profile: React.ReactNode;
  scan: React.ReactNode;
  search: React.ReactNode;
  send: React.ReactNode;
  setting: React.ReactNode;
  shieldDone: React.ReactNode;
  shieldField: React.ReactNode;
  show: React.ReactNode;
  star: React.ReactNode;
  swap: React.ReactNode;
  ticket: React.ReactNode;
  ticketStar: React.ReactNode;
  tickSquare: React.ReactNode;
  timeCircle: React.ReactNode;
  timeSquare: React.ReactNode;
  unlock: React.ReactNode;
  upload: React.ReactNode;
  video: React.ReactNode;
  voice: React.ReactNode;
  voice2: React.ReactNode;
  volumeDown: React.ReactNode;
  volumeUp: React.ReactNode;
  wallet: React.ReactNode;
  work: React.ReactNode;
  minus: React.ReactNode;
  plus: React.ReactNode;
  shippingCargo: React.ReactNode;
  shippingExpress: React.ReactNode;
  shippingRegular: React.ReactNode;
  shippingEconomy: React.ReactNode;
  home2: React.ReactNode;
  alif: React.ReactNode;
  dc: React.ReactNode;
  money: React.ReactNode;
  logo: React.ReactNode;
  duck: React.ReactNode;
  "train-toy": React.ReactNode;
  "bear-toy": React.ReactNode;
  "abc-toy": React.ReactNode;
  shirt: React.ReactNode;
  "washing-machine": React.ReactNode;
  airpods: React.ReactNode;
}

interface Props extends SVGProps<SVGSVGElement> {
  name: keyof IIcons;
  variant?: "outline" | "primary";
  slot?: "start" | "end" | "primary" | "secondary";
}

export function Icon({
  name,
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <svg
      width={cn(24, props.width)}
      height={cn(24, props.height)}
      className={cn(className)}
      viewBox={"0 0 25 24"}
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <use href={`/${variant}.svg#${name}`} />
    </svg>
  );
}
