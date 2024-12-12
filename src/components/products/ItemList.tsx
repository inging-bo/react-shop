import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import ProductsLoad from "./ProductsLoad";
import { Category, MENUS } from "../../constants/category";
import { productsList, IProduct } from "../../store/products";

export default function ItemList(props: { category: string; limit?: number }) {
  const productsLoadable = useRecoilValueLoadable(productsList);

  const filteredDocs = productsLoadable.state === "hasValue"
    ? productsLoadable.contents.filter((doc: IProduct) => 
        Category[doc.category] === props.category
      )
    : [];

  const isLoading = productsLoadable.state === "loading";

  // 제한된 상품 계산
  const limitedDocs = props.limit ? filteredDocs.slice(0, props.limit) : filteredDocs;

  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
        {props.category}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
        {isLoading ? (
          <ProductsLoad limit={props.limit || filteredDocs.length} />
        ) : limitedDocs.length > 0 ? (
          limitedDocs.map((doc: IProduct) => (
            <Link
              to={`/product/${doc.id}`}
              key={doc.id}
              className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
            >
              <figure className="flex h-80 bg-white overflow-hidden">
                <img
                  src={doc.image}
                  alt="상품 이미지"
                  className="transition-transform duration-300"
                />
              </figure>
              <div className="card-body bg-gray-100 dark:bg-gray-700">
                <p className="card-title text-base">{doc.title}</p>
                <p className="text-base">${doc.price.toFixed(0)}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>해당 카테고리에 제품이 없습니다.</div>
        )}
      </div>
    </>
  );
}
