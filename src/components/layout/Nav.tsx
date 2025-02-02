import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { cartState } from "../../store/cart";
import { IProduct, productsList } from "../../store/products";

export default function Nav() {
    const [searchTerm, setSearchTerm] = useState("")
    const [count, setCount] = useRecoilState(cartState)
    const [isInputVisible, setInputVisible] = useState(false);
    const [filteredList, setFilteredList] = useState<IProduct[]>([]);
    const productsLoadable = useRecoilValueLoadable(productsList);
    const navigate = useNavigate();
    const [hiddenItems, setHiddenItems] = useState<Set<number>>(new Set());

    const handleButtonClick = (id: number) => {
        // 해당 항목을 숨김 처리
        navigate(`/product/${id}`);
        setHiddenItems((prev) => new Set(prev.add(id)));
    };
    // 데이터 로드 및 필터링
    useEffect(() => {
        let isMounted = true;

        if (productsLoadable.state === "hasValue") {
        const products = productsLoadable.contents as IProduct[];

        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (isMounted) {
            setFilteredList(filtered);
        }
        }

        return () => {
        isMounted = false; // 언마운트 시 플래그 업데이트
        };
    }, [searchTerm, productsLoadable]);

    const toggleInputVisibility = () => {
        setInputVisible((prev) => !prev);
      };
    
    // cartState에서 count 합계를 계산
    const totalCount = Object.values(count.items || {}).reduce(
        (sum, item) => sum + item.count,
        0
    );


    
    // 초기 상태를 확인하여 로컬스토리지에서 테마를 가져오거나 "light"로 설정
    const [isChecked, setIsChecked] = useState(() => {
        return localStorage.getItem("theme") === "light";
    });

    // 체크박스를 클릭했을 때 호출되는 함수
    const handleChange = (e) => {
        const newTheme = e.target.checked ? "light" : "dark"; // 체크박스가 체크되면 light, 아니면 dark
        setIsChecked(e.target.checked); // 체크박스 상태 업데이트
        document.documentElement.setAttribute("data-theme", newTheme); // data-theme 속성 변경
        document.documentElement.setAttribute("class", newTheme); // data-theme 속성 변경
        localStorage.setItem("theme", newTheme); // 로컬스토리지에 저장
    };

    // 페이지 로드 시 테마 적용 (테마 상태가 바뀔 때마다 실행)
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isChecked ? "light" : "dark");
        document.documentElement.setAttribute("class", isChecked ? "light" : "dark");
    }, [isChecked]);

    // 로컬스토리지 변경 시 상태 업데이트

    return (
        <div className="fixed z-10 w-full navbar shadow-lg bg-white dark:bg-neutral text-neutral-content">
            <div className="flex w-full xl:container xl:m-auto">
                <label htmlFor="side-menu" className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                <h1 className="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
                    <Link to="/" className="text-lg text-gray-700 dark:text-white font-bold whitespace-nowrap">
                        React Shop
                    </Link>
                </h1>
                <div className="flex-none hidden md:flex md:flex-1 ml-2">
                    <Link to="/fashion" className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white">
                        패션
                    </Link>
                    <Link to="/accessory" className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white">
                        액세서리
                    </Link>
                    <Link to="/digital" className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white">
                        디지털
                    </Link>
                </div>
                <div className="flex items-center px-2">
                    <label className="swap swap-rotate mr-2 sm:mr-4">
                        <input type="checkbox" className="js-theme" checked={isChecked} onChange={handleChange} />
                        <svg className="swap-off fill-white w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg>
                        <svg className="swap-on fill-black w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg>
                    </label>
                    <div className="dropdown">
                        <button type="button" className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search" onClick={toggleInputVisibility}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-gray-700 dark:stroke-white" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                        <input type="text" placeholder="검색" className={`fixed left-0 top-4 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput ${isInputVisible ? "translate-y-full !opacity-100": "-z-10"}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        {searchTerm && /^[a-zA-Z\s]+$/.test(searchTerm) && filteredList.length > 0 && (
                            <ul className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-600">
                                {filteredList.map((product) => (
                                    // 클릭된 항목은 숨겨짐
                                    !hiddenItems.has(product.id) && (
                                        <li key={product.id} onClick={() => handleButtonClick(product.id)}>
                                            <button
                                                type="button"
                                                className="text-left js-searchedItem w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                            >
                                                <span className="text-gray-600 dark:text-white line-clamp-2">
                                                    {product.title}
                                                </span>
                                            </button>
                                        </li>
                                    )
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link to="/cart" className="btn btn-ghost w-10 sm:w-12 ml-1">
                        <span className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-gray-700 dark:stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            <span className="inline-flex items-center justify-center absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2">{totalCount}</span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}