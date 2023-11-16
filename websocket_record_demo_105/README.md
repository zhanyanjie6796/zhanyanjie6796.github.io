### 使用前，請詳讀

1. 由於目前瀏覽器對於抓取及處理聲音方面越來越嚴格，所以需將網站 host 在 HTTP/HTTPS server 上才可以正常運行，頁面也才可正常取得系統的錄音裝置清單
2. 請使用 chrome 瀏覽器來確保功能能正常運作
3. 若於本地端開發，可以使用 vscode live server 之類的套件，快速開發
4. convert-bits-worklet.js 該檔案若需經過 webpack 之類的打包工具，需額外使用像是 [worklet-loader](https://www.npmjs.com/package/worklet-loader?activeTab=readme)...之類的套件進行引用，由於各個專案不同，請自行搜尋相關方式，或聯絡本公司來進行協助；若不想過於麻煩，替代方案可直接將 convert-bits-worklet.js 檔案放置在 public 資料夾底下(參考下方資料夾結構範例)，使其不進行打包，並在 ASRRecorder.js 中修改該行路徑 `await this.audioContext.audioWorklet.addModule("./convert-bits-worklet.js");`


```bash
- public/
  - index.html
  - convert-bits-worklet.js # <== 可以不用打包，直接引用
- src/
  - components/
    ...
  - views/
    ...
  - utils/
    - ASRRecorder.js
    ...
  ...
```

可能會遇到的問題：
1. Connecting AudioNodes from AudioContexts with different sample-rate is currently not supported. 此問題目前會發生在 firefox 上，是官方的 issue。
2. AbortError: The user aborted a request. 此問題目前原因是因為 convert-bits-worklet.js 沒抓取到，請將其與 index.html 放在同一層資料夾底下，或是修改 ASRRecorder.js 中的 addModule 路徑，請參考使用前，請詳讀的第四點。

