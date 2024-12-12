import { Link } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import Confirm from "../common/Confirm";
import CartList from "./CartList";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { cartState, ICartState } from "../../store/cart";
import { IProduct, productsList } from "../../store/products";
import ProductsLoad from "../products/ProductsLoad";

const CartView = (): JSX.Element => {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const productsLoadable = useRecoilValueLoadable(productsList);
  let cartItem = cart.items;
  let cartId: number[] = [];
  let cartCount: number[] = [];
  if (cartItem) {
    // cartItem에서 ID를 추출
    cartId = Object.values(cartItem).map((item) => item.id);
    cartCount = Object.values(cartItem).map((item) => item.count);
  }

  // cartState에서 count 합계를 계산
  let matchingPrices: number[] = [];
  if (productsLoadable.state === "hasValue" && Array.isArray(productsLoadable.contents)) {
    const cartList = productsLoadable.contents as IProduct[];

    // cartId와 productsList의 id를 비교하여 매칭되는 price 추출
    matchingPrices = cartList
    .filter((product) => cartId.includes(product.id)) // cartId에 포함된 상품만 필터링
    .map((product, index) => (product.price * cartCount[index])); // 매칭된 상품의 price 추출
  }
  
  const totalCount = Object.values(matchingPrices || {}).reduce(
    (sum, item) => sum + item,
    0
  );
  const totalCountLocale = Number(totalCount.toFixed(0)).toLocaleString('en-US');
  // cart.items가 비어있는지 확인
  const isCartEmpty = !cart.items || Object.keys(cart.items).length === 0;
  const isLoading = productsLoadable.state === "loading";
  
  return (
    <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      {isLoading ? (
        <ProductsLoad limit={1} variant="items" />
      ) : (
        <>
          <BreadCrumb category="홈" crumb="장바구니" />
          <div className="mt-6 md:mt-14 px-2 lg:px-0">
            {isCartEmpty ? (
              // 장바구니에 물품이 없으면 이 부분이 출력
              <>
                <div>
                  <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
                  <Link to="/" className="btn btn-primary mt-10">
                    담으러 가기
                  </Link>
                </div>
                <div className="lg:flex justify-between mb-20">
                  <div></div>
                  <div className="self-start shrink-0 flex items-center mt-10 mb-20">
                    <span className="text-xl md:text-2xl">총 : $0</span>
                    <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
                      구매하기
                    </label>
                  </div>
                </div>
              </>
            ) : (
              // 장바구니에 물품이 있으면 CartList 컴포넌트 출력
              <div className="lg:flex justify-between mb-20">
                <div>
                  <CartList cart={cart} setCart={setCart}/>
                </div>
                <div className="self-start shrink-0 flex items-center mt-10 mb-20">
                  <span className="text-xl md:text-2xl">총 : ${totalCountLocale}</span>
                  <label htmlFor="confirm-modal" className="modal-button btn btn-primary ml-5">
                    구매하기
                  </label>
                </div>
              </div>
            )}
          </div>
          <Confirm />
        </>
      )}
      
    </section>
  );
};

export default CartView;
