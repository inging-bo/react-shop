import { atom } from "recoil";
import { CART_ITEM } from "../constants/category";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartState {
  readonly items?: Record<string, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart", // Recoil 상태 key
  default: { items: {} }, // 기본값으로 빈 카트를 설정
  effects: [
    // 로컬스토리지에서 카트 상태를 불러오고, 변경된 상태는 로컬스토리지에 저장
    ({ setSelf, onSet }) => {
      const storedCart = localStorage.getItem(CART_ITEM);
      if (storedCart) {
        setSelf(JSON.parse(storedCart));
      }
      onSet((newValue) => {
        localStorage.setItem(CART_ITEM, JSON.stringify(newValue));
      });
    },
  ],
});

// addToCart 함수 구현
export const addToCart = (cart: ICartState, item: ICartInfo) => {
  const currentItems = cart.items || {}; // 현재 카트의 아이템

  // 이미 존재하는 아이템인지 확인
  const existingItem = currentItems[item.id];

  const updatedItems = {
    ...currentItems, // 기존 아이템 복사
    [item.id]: {
      id: item.id, // 상품 ID
      count: (existingItem?.count || 0) + item.count, // 기존 수량 + 추가된 수량
    },
  };

  return {
    ...cart, // 기존 카트 상태 유지
    items: updatedItems, // 업데이트된 아이템 반영
  };
};

// removeFromCart 함수 구현
export const removeFromCart = (cart: ICartState, id: string) => {
  const updatedItems = { ...cart.items };
  const itemToRemove = updatedItems[id];

  if (itemToRemove) {
    if (itemToRemove.count === 1) {
      delete updatedItems[id]; // 수량이 1이면 아이템 제거
    } else {
      updatedItems[id] = {
        ...itemToRemove,
        count: itemToRemove.count - 1, // 수량 감소
      };
    }
  }

  return { ...cart, items: updatedItems }; // 업데이트된 카트 상태 리턴
};
