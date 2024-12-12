import { Link, useNavigate } from "react-router-dom";
import { CATEGORY, MENUS } from "../../constants/category";

const Drawer = (): JSX.Element => {
  const navigate = useNavigate();
  
  const handleButtonClick = (id: string) => {
    // 해당 항목을 숨김 처리
    navigate(`/${id}`);
  };
  return (
    <div className="drawer-side">
      <label htmlFor="side-menu" className="drawer-overlay"></label>
      <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
        <li>
          <label onClick={() => handleButtonClick(CATEGORY.FASHION)} htmlFor="side-menu" className="!text-gray-700 active:!text-white dark:!text-white">
            {MENUS.FASHION}
          </label>
        </li>
        <li>
          <label onClick={() => handleButtonClick(CATEGORY.ACCESSORY)} htmlFor="side-menu" className="!text-gray-700 active:!text-white dark:!text-white">
            {MENUS.ACCESSORY}
          </label>
        </li>
        <li>
          <label onClick={() => handleButtonClick(CATEGORY.DIGITAL)} htmlFor="side-menu" className="!text-gray-700 active:!text-white dark:!text-white">
            {MENUS.DIGITAL}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
