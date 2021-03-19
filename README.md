# 老爸的私房錢 (expense tracker)
此專案提供了記錄支出的功能，您可以藉由登入與註冊功能來建立您專屬的記帳本
## 功能列表
- 依類別、年份與月份搜尋
- 支出項目的新增、編輯和刪除功能
- 可使用信箱註冊及登入
- 可使用 Facebook 帳號登入
## 環境建置與需求 (prerequisites)
#### 環境
- Node.js 10.15.3

#### 套件
- bcryptjs: "^2.4.3",
- body-parser: "^1.19.0",
- connect-flash: "^0.1.1",
- dotenv: "^8.2.0",
- express: "^4.17.1",
- express-handlebars: "^5.2.0",
- express-session: "^1.17.1",
- method-override: "^3.0.0",
- mongoose: "^5.11.13",
- passport: "^0.4.1",
- passport-facebook: "^3.0.0",
- passport-local: "^1.0.0"

## 安裝與執行 (installation and execution)
1. 使用 git 下載本專案
```
git clone https://github.com/asdfg44l/expense-tracker.git
```
2. 移動至本專案資料夾
```
cd expense-tracker
```
3. 安裝套件
```
npm install
```
4. 使用種子資料 (請務必執行)
```
npm run seed
```
5. 啟動專案
```
npm run dev
```