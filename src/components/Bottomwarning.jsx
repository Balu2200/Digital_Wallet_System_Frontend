import {Link} from "react-router-dom";

const Bottomwarning = ({label, buttonText, to}) => {
  return (
    <div className="flex">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer font-medium" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}

export default Bottomwarning;