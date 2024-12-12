# React Shop

# 보안이 필요한 구현 부분

- Skeleton UI 구현 부족
- useRecoilValueLoadable, useRecoilStateLoadable 정확한 용도에 대한 이해 필요
- 타입스크립트 이해 필요

## 디렉토리 구조

- 여러분의 디렉토리 구조를 도식화 해보세요. 아래는 예시입니다.

```
.
├── .github               # Github setting folder
├── .vscode               # VSCode setting folder
├── public                # Public folder
│   └── assets
│       └── images        # Images
├── src
│   ├── components        # all components
│   ├── pages             # Next JS pages
│   ├── styles            # PostCSS style folder with Tailwind
│   └── utils             # Utility folder
├── .eslintignore         # Ignore ESLint
├── .eslintrc             # ESLint settings
├── .gitignore            # Ignore Git commit
├── .nvmrc                # Specification of NPM
├── .prettierignore       # Ignore prettier
├── .prettierrc           # Formatting code setting
├── LICENSE               # License file
├── lint-staged.config.js # Lint information
├── next-env.d.ts         # NextJS environment definition file
├── next.config.js        # NextJS configuration
├── package-lock.json     # Same packages with others
├── package.json          # Package information
├── postcss.config.js     # PostCSS setting
├── SECURITY.md           # Security
├── README.md             # README file
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Cart

Cart 기능을 구현하면서 기록한 내용을 남깁니다.

- addCart : cart에 아이템의 데이터를 추가하는 Recoil 함수 입니다.

..
..

## Vercel

### 배포 단계

-

### 배포 주소

- vercel.json은 서버에서 CSR(Client Side Rendering) 시에 라우팅 주소를 알 수 없기 때문에 rewrite로 주소를 루트로 보내어 Client의 Routing 시스템을 사용하도록 유도합니다.
- https://react-shop-oinochoe.vercel.app/
