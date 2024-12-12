# React Shop

# 보안이 필요한 구현 부분

- Skeleton UI 구현 부족
- useRecoilValueLoadable, useRecoilStateLoadable 정확한 용도에 대한 이해 필요
- 타입스크립트 이해 필요

## 디렉토리 구조

```
.
├── .github               # Github setting folder
├── .vscode               # VSCode setting folder
├── .api
├── public                # Public folder
├── src
│   ├── assert
│   │   ├── css
│   │   └── img
│   │       ├── carousel
│   │       ├── favicon
│   │       └── svg
│   ├── components        # all components
│   │   ├── carts
│   │   ├── common
│   │   ├── layout
│   │   └── products
│   ├── constants
│   ├── helpers
│   ├── router
│   ├── store
│   ├── views             # Next JS pages
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitattributes
├── .gitignore            # Ignore Git commit
├── .prettierrc           # Formatting code setting
├── index.html
├── package-lock.json     # Same packages with others
├── package.json          # Package information
├── postcss.config.js     # PostCSS setting
├── README.md             # README file
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vercel.json
├── vite.json
└── tsconfig.node.json
```

## Cart

## Vercel

### 배포 단계

-

### 배포 주소

- vercel.json은 서버에서 CSR(Client Side Rendering) 시에 라우팅 주소를 알 수 없기 때문에 rewrite로 주소를 루트로 보내어 Client의 Routing 시스템을 사용하도록 유도합니다.
- https://react-shop-five-roan.vercel.app/
