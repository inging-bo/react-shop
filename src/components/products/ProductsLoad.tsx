/**
 * API 통신을 할 때 로딩중인지를 탐색하고 로딩 중이라면 Skeleton UI를 노출 시켜 보세요.
 */
interface ProductsLoadProps {
  limit: number;
  variant?: "default" | "items";  // 'default'는 기본 로딩, 'items'는 상세한 로딩
}

const ProductsLoad = ({ limit, variant = "default" }: ProductsLoadProps): JSX.Element => {
  return (
    <>
      {0 < limit ? (
        Array.from(Array(limit)).map((elm, index) => {
          return (
            <div key={index} className={`card bordered animate-pulse ${variant === "items" ? "mt-3" : ""}`}>
              <div className={`rounded bg-gray-100 ${variant === "items" ? "h-96" : "h-80"}`}>
                {/* 다른 스타일을 적용하거나 내용 추가 */}
              </div>

              {/* variant가 "items"일 때는 상세 로딩 UI 출력 */}
              {variant === "default" && (
                <div className="card-body">
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-100 rounded"></div>
                    <div className="h-6 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-100 rounded w-1/4"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>제품이 없습니다.</div>
      )}
    </>
  );
};

export default ProductsLoad;

