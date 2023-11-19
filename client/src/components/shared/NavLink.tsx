// styled navigation component

import { Link } from "react-router-dom";

type Props = {
  to: string;
  color: string;
  bg: string;
  text: string;
  onClick?: () => Promise<void>;
}

export const NavigationLink = (props: Props) => {
  return <Link className="navlink" to={props.to} onClick={props.onClick} style={{background: props.bg, color: props.color}} >
    {props.text}
  </Link>
}