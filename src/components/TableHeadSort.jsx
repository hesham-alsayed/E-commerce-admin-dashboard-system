import { BiSortAlt2 } from "react-icons/bi";
import { HiOutlineArrowNarrowDown, HiOutlineArrowNarrowUp } from "react-icons/hi";

export const renderIcon = (type) => {
  if (type === "asc") return <HiOutlineArrowNarrowUp size={20} />;
  if (type === "desc") return <HiOutlineArrowNarrowDown size={20} />;
  return <BiSortAlt2 size={20} />; 
};
