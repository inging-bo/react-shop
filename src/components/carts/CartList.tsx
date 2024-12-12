import { Link } from "react-router-dom";
import { addToCart, ICartState, removeFromCart} from "../../store/cart";
import { IProduct, productsList } from "../../store/products";
import { useRecoilValueLoadable } from "recoil";

const CartList = ({ cart, setCart }: { cart: ICartState; setCart: (cart: ICartState) => void; }): JSX.Element => {
  const productsLoadable = useRecoilValueLoadable(productsList);
  let cartItem = cart.items;
  let cartId: number[] = [];
  let cartCount: number[] = [];
  
  if (cartItem) {
    // cartItem에서 ID를 추출
    cartId = Object.values(cartItem).map((item) => item.id);
    cartCount = Object.values(cartItem).map((item) => item.count);
  }
  
  // cart 상태 업데이트
  const handleAddToCart = (item: IProduct) => {
    setCart(addToCart(cart, { id: item.id, count: 1 })); // addToCart 함수 사용
  };

  // store/cart.ts를 참고하세요.
  const removeFromCartHandler = (id: string) => {
    setCart(removeFromCart(cart, id));
  };

  return (
    <>
      {cartId.map((id, index) => {
        // `cartCount`에서 동일한 인덱스를 사용해 count 값을 가져옴
        const count = cartCount[index];

        // 선택한 상품 데이터 찾기
        const product =
          productsLoadable.state === "hasValue"
            ? productsLoadable.contents.find((product: IProduct) => product.id === Number(id)) // id를 number로 변환
            : null;

        if (!product) return <div></div>; // product가 없다면 렌더링하지 않음
        
      return (
        <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0" key={product.id}>
          <Link to={`/product/${product.id}`}>
            <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-48"
              />
            </figure>
          </Link>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              <Link to={`/product/${product.id}`} className="link link-hover">{product.title}</Link>
            </h2>
            <p className="mt-2 mb-4 text-3xl">
              ${Number((product.price * count).toFixed(0))} <span className="text-2xl">(${product.price.toFixed(0)})</span>
            </p>
            <div className="card-actions">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => removeFromCartHandler(product.id.toString())} >-</button>
                <button className="btn btn-ghost no-animation">{count}</button>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>+</button>
              </div>
            </div>
          </div>
        </div>
      );
    })}
    </>
  );
};

export default CartList;
