// Items.tsx
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../common/Breadcrumb";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { productsList, IProduct } from "../../store/products";
import Rating from "../common/Rating";
import { cartState, addToCart } from "../../store/cart"; // cartState와 addToCart 함수 import
import ProductsLoad from "./ProductsLoad";
const Items = (): JSX.Element => {
  const { id } = useParams<{ id: string }>(); // URL에서 상품 ID 가져오기
  const [cart, setCart] = useRecoilState(cartState); // cartState 업데이트

  // Recoil을 사용하여 상품 리스트 로드
  const productsLoadable = useRecoilValueLoadable(productsList);
  const isLoading = productsLoadable.state === "loading";
  
  // 선택한 상품 데이터 찾기
  const selectedProduct =
  productsLoadable.state === "hasValue"
  ? productsLoadable.contents.find((product: IProduct) => product.id === Number(id)) // id를 number로 변환
  : null;
  
  // if (!selectedProduct) {
  //   return <ProductsLoad limit={1} variant="items" />;
  // }

  // cart 상태 업데이트
  const handleAddToCart = (item: IProduct) => {
    setCart(addToCart(cart, { id: item.id, count: 1 })); // addToCart 함수 사용
  };

  return (
    isLoading ? (
      <ProductsLoad limit={1} variant="items" />
    ) : (
      selectedProduct ? (
        <div>
          <div className="text-sm breadcrumbs">
            <BreadCrumb category={selectedProduct.category} crumb={selectedProduct.title} />
          </div>
          <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
            <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
              <img
                className="object-contain w-full h-72"
                src={selectedProduct.image}
                alt={selectedProduct.title}
              />
            </figure>
            <div className="card-body px-1 lg:px-12">
              <h2 className="card-title">
                {selectedProduct.title}
                <span className="badge badge-accent ml-2">NEW</span>
              </h2>
              <p>{selectedProduct.description}</p>
              <Rating rate={selectedProduct.rating.rate} count={selectedProduct.rating.count} />
              <p className="mt-2 mb-4 text-3xl">${selectedProduct.price.toFixed(0)}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(selectedProduct)} // cart 상태 업데이트
                >
                  장바구니에 담기
                </button>
                <Link to={"/cart"} className="btn btn-outline ml-1">
                  장바구니로 이동
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>없다</div>
      )
    )
  );
};

export default Items;
