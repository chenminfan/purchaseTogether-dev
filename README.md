![](https://img.shields.io/github/watchers/chenminfan/minMInisMy.svg)

- [專案網站](https://chenminfan.github.io/purchaseTogether-dev/)
> （本網站僅供個人作品使用，不提供商業用途）

## 安裝
以下將會引導你如何安裝此專案到你的電腦上。

### 取得專案

```bash
git clone git@github.com:chenminfan/purchaseTogether-dev.git
```

### 安裝套件

```bash
npm install
```

### 運行專案

```bash
npm start
```

### 開啟專案
在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:3000/
```

## 資料夾說明

my-app
├── node_modules                   // 外部檔案配置相關
├── public                         // 放置靜態檔的資料夾
│
└── src                            // 放置即將被編譯檔案的資料夾
│    ├── assets
│        ├── image                 // 圖檔資源(img,icon)
│        ├── mixins                // bootstarp變數參數
│        └── style                 // Style 共用區
│    ├── components                // **元件**
│    ├    ├── common               // 共用元件
│    ├    │   backend              // 後台元件
│    ├    └── frontend             // 前台元件
│    ├── page                      // **功能頁面**
│    ├    │   backend              // 後台
│    │    └── frontend             // 前台
│    ├         ├── Home            // 首頁
│    ├         ├── Products        // 產品
│    ├         ├── ProductDetail   // 產品詳細
│    ├         ├── Track           // 追蹤商品
│    ├         ├── MemberLogin     // 會員登入
│    ├         ├── Member          // 會員資訊
│    ├         │                     （修改、修改密碼、註銷帳號、登出）
│    ├         ├── Order           // 訂單明細
│    ├         ├── Cart            // 購物車
│    ├         ├── CartCheckoutInfo// 購物車結帳資訊
│    ├         ├── Pay             // 購物車結帳
│    ├         ├── LoginBackend    // 後台登入
│    ├── data                      // API、小工具
│    │    ├── Api                  // 六角學院API 管理
│    │    │   Firebase             // 第三方API
│    │    └── utilities            // 小工具function
│    ├── provider                  // react provider
│    ├── typeTS                    // typescript定義型別
├── config-overrides.js            // react-app-rewired 路徑打包設定
├── .env                           // .evn第三方API相關設定
├── .gitignore                     // git需忽略的檔案
├── package-lock.json              //專案已安裝的套件
├── package.json                   //專案包運行指令、資訊及套件
└── README.md                      //說明文件或筆記
...

## 專案技術
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)｜![](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)｜![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)｜![](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)｜![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)｜![](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)｜![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)｜![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)｜![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)｜![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)｜![](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

- React v18.2.0
- Axios v1.7.7
- Typescript v4.9.5
- react-app-rewired v2.2.1
- react-hook-form v7.53.2
- (前台) Bootstrap v5.3.3
- (前台) BootstrapIcon v1.11.3
- (後台) Mui v6.1.3
...

## 程式套件
- React-lazy-load-image-component v1.6.2
...

## 第三方服務
- Google firebase v11.0.2
- unsplash 商品免費版權圖片支援
...

## Github Actions 說明
此專案有使用 Github Actions，所以發起 PR 時會自動執行以下動作：
- git tag
- 部署到 Github Pages
...

此專案有使用 Github Actions，打tag規則（vTags1_年/月/日/分/秒）：
- tag 備份
- 部署到 Github Pages

## 聯絡作者
mingfan1202@hotmail.com