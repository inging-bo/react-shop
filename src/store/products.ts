import { selector } from "recoil";
import CONSTANTS from "../constants/constants";

// 제품 데이터 타입 정의
interface IRating {
  readonly rate?: number;
  readonly count?: number;
}
export interface IProduct {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly image: string;
  readonly rating: IRating;
}

// 제품 목록을 가져오는 셀렉터
export const productsList = selector<IProduct[]>({
  key: "productsList", // 고유한 셀렉터 키
  get: async () => {
    try {
      const response = await fetch("/products.json");
      return (await response.json()) || [];
    } catch (error) {
      console.log(`Error: \n${error}`);
      return [];
    }
  },
});
