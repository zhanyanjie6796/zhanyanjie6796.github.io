# Gemini Nano in Chrome 使用說明

## Gemini Nano in Chrome User Guide

本文檔說明如何在 Chrome 瀏覽器中使用內建的 **Gemini Nano** AI 功能，包括模型下載、API 使用方式，以及相關配置。

---

## 目錄 (Table of Contents)

1. [概述 (Overview)](#概述-overview)
2. [系統需求 (System Requirements)](#系統需求-system-requirements)
3. [啟用 Chrome Flags (Enable Chrome Flags)](#啟用-chrome-flags)
4. [模型下載 (Model Download)](#模型下載-model-download)
5. [模型位置與大小 (Model Location and Size)](#模型位置與大小-model-location-and-size)
6. [模型更新 (Model Update)](#模型更新-model-update)
7. [Prompt API 使用方式 (Prompt API Usage)](#prompt-api-使用方式-prompt-api-usage)
8. [語言支援檢查 (Language Availability Check)](#語言支援檢查-language-availability-check)
9. [除錯與日誌查看 (Debugging and Log Viewing)](#除錯與日誌查看-debugging-and-log-viewing)
10. [快速測試範例 (Quick Test Example)](#快速測試範例-quick-test-example)
11. [Gemini Nano 助手網頁應用 (Gemini Nano Web Bot Application)](#gemini-nano-助手網頁應用-gemini-nano-web-bot-application)
12. [相關資源 (Related Resources)](#相關資源-related-resources)

---

## 概述 (Overview)

**Chrome Built-in AI APIs** 是 Google Chrome 瀏覽器內建的 AI 功能，允許開發者在瀏覽器中直接使用 **Gemini Nano** 大型語言模型（Large Language Model, LLM）。這項技術讓 AI 運算可以在用戶的本機裝置上完成，無需依賴雲端伺服器，從而提供更好的隱私保護與更快的回應速度。

主要功能包括：
- **本地 AI 運算 (On-Device AI Inference)**：模型在用戶裝置上運行，資料不需上傳至雲端
- **Prompt API**：用於與語言模型互動的 JavaScript API
- **多語言支援 (Multi-Language Support)**：支援英文、日文、繁體中文等多種語言
- **模型自動下載 (Automatic Model Download)**：首次使用时會自動下載模型至本機

---

## 系統需求 (System Requirements)

| 項目 (Item) | 需求 (Requirement) |
|------------|-------------------|
| 瀏覽器 (Browser) | Google Chrome 最新版 或 Chrome Canary（實驗版本） |
| 硬碟空間 (Disk Space) | 至少 4-5 GB 可用空間 |
| 記憶體 (Memory) | 建議 8GB 以上 |
| GPU 記憶體 (GPU Memory) | 約占用 4GB |
| 網路連線 (Network) | 首次下載模型需要穩定的網路連線 |

---

## 啟用 Chrome Flags

在開始使用前，需要啟用相關的 Chrome 實驗性功能（Experimental Features）。

### 需要啟用的 Flags

| Flag 名稱 (Flag Name) | 說明 (Description) |
|----------------------|-------------------|
| `chrome://flags/#prompt-api-for-gemini-nano` | 啟用 Gemini Nano 的 Prompt API |

### 啟用步驟 (Steps)

1. 在 Chrome 位址列輸入 `chrome://flags/#prompt-api-for-gemini-nano` 並按 Enter
2. 找到 **Prompt API for Gemini Nano** 選項
3. 將下拉選單改為 **Enabled**（啟用）
4. 重新啟動瀏覽器（Relaunch Browser）

> **注意 (Note)**：Chrome 與 Chrome Canary 需要分別設定 flags。

---

## 模型下載 (Model Download)

### 使用 LanguageModel.create() 下載模型

首次使用時，需要下載 Gemini Nano 模型。可以使用以下 JavaScript 程式碼在瀏覽器主控臺（Console）中執行：

```javascript
const session = await LanguageModel.create({
  monitor(m) {
    m.addEventListener('downloadprogress', (e) => {
      console.log(`Downloaded ${e.loaded * 100}%`);
    });
  },
});
```

### 下載進度監控 (Download Progress Monitoring)

- `monitor` 參數用於監控下載進度
- `downloadprogress` 事件會在下載過程中觸發
- `e.loaded` 表示已下載的數據量（比例值 0-1）

---

## 模型位置與大小 (Model Location and Size)

### 查看模型資訊

在 Chrome 位址列輸入 `chrome://on-device-internals/` 可以查看已下載模型的詳細資訊。

### 模型存放路徑 (Model Storage Path)

**Google Chrome（穩定版）**
```
File path: C:\Users\[使用者名稱]\AppData\Local\Google\Chrome\User Data\OptGuideOnDeviceModel\[版本號]
```

**Google Chrome Canary（實驗版本）**
```
File path: C:\Users\[使用者名稱]\AppData\Local\Google\Chrome SxS\User Data\OptGuideOnDeviceModel\[版本號]
```

> **注意 (Note)**：Chrome 穩定版與 Chrome Canary 的模型存放位置不同，請根據使用的版本確認路徑。

### 模型大小 (Model Size)

- **約 4GB**：Gemini Nano 模型檔案大小約為 4GB
- 下載並解壓縮後可能需要 4-5GB 的硬碟空間

---

## 模型更新 (Model Update)

### 檢查模型更新

1. 在 Chrome 位址列輸入 `chrome://components/`
2. 找到與 Gemini Nano 相關的組件
3. 確保模型下載成功後才會顯示相關項目

> **注意 (Note)**：只有在模型下載成功後，`chrome://components/` 中才會出現相關的更新項目。

---

## Prompt API 使用方式 (Prompt API Usage)

### API 文檔 (API Documentation)

官方文檔：[Prompt API - Chrome Developer](https://developer.chrome.com/docs/ai/prompt-api?hl=zh-tw)

### 基本用法 (Basic Usage)

```javascript
// 建立 LanguageModel 會話
const session = await LanguageModel.create();

// 發送提示並獲取回應
const result = await session.prompt("請用繁體中文介紹 Gemini Nano。");

// 輸出 AI 回應
console.log("AI 回答：", result);

// 結束會話（可選）
// session.destroy();
```

### API 說明 (API Description)

| 方法/屬性 (Method/Property) | 說明 (Description) |
|---------------------------|-------------------|
| `LanguageModel.create()` | 建立新的語言模型會話（Session） |
| `session.prompt()` | 發送提示並獲取完整的回應字串 |
| `session.promptStreaming()` | 發送提示並獲取串流式回應 |
| `monitor` 參數 | 用於監控下載進度等事件 |

---

## 語言支援檢查 (Language Availability Check)

### 檢查語言可用性

在使用模型前，建議先檢查所需語言是否可用：

```javascript
// 檢查英文和日文支援
await LanguageModel.availability({ languages: ["en", "ja"] });

// 檢查繁體中文支援
await LanguageModel.availability({ languages: ["zh-Hant"] });
```

### 語言代碼 (Language Codes)

| 語言 (Language) | 代碼 (Code) |
|----------------|------------|
| 英文 (English) | `en` |
| 日文 (Japanese) | `ja` |
| 繁體中文 (Traditional Chinese) | `zh-Hant` |

### 相關文檔 (Related Documentation)

[開始使用內建 AI 技術 - Chrome Developer](https://developer.chrome.com/docs/ai/get-started?hl=zh-tw#model_download)

---

## 除錯與日誌查看 (Debugging and Log Viewing)

### 查看優化指南日誌 (Optimization Guide Logs)

在 Chrome 位址列輸入以下網址查看相關日誌：

```
chrome://optimization-guide-internals/
```

### 查看除錯頁面 (Debug Pages)

```
chrome://chrome-urls/?host=chrome://optimization-guide-internals/#internal-debug-pages
```

### 日誌用途 (Log Purpose)

- 確認模型下載狀態
- 檢查模型是否支援指定語言
- 排查初始化問題

---

## 快速測試範例 (Quick Test Example)

以下是一個簡單的測試函數，可以在瀏覽器主控臺中執行：

```javascript
async function runSimpleTest() {
  try {
    const session = await LanguageModel.create();
    console.log("AI 正在思考中，請稍候...");

    // 使用 prompt() 而不是 promptStreaming()
    // 它會回傳一個完整的字串
    const result = await session.prompt("請用繁體中文,簡單的介紹 Gemini Nano。");

    // 這裡會一次顯示所有內容，不會換行或清空
    console.log("AI 回答：", result);

    // session.destroy();
  } catch (e) {
    console.error("執行失敗：", e);
  }
}

runSimpleTest();
```

### 執行步驟 (Execution Steps)

1. 打開 Chrome 瀏覽器
2. 按 F12 開啟開發者工具（Developer Tools）
3. 切換到主控臺（Console）標籤
4. 貼上上述程式碼並按 Enter 執行
5. 查看控制台輸出的 AI 回應

---

## Gemini Nano 助手網頁應用 (Gemini Nano Web Bot Application)

### 線上演示 (Online Demo)

我們提供了一個完整的網頁對話機器人範例：**GeminiNanoWebBot**

- **網址 (URL)**：[https://zhanyanjie6796.github.io/GeminiNanoWebBot/index.html](https://zhanyanjie6796.github.io/GeminiNanoWebBot/index.html)

### 功能特色 (Features)

| 功能 (Feature) | 說明 (Description) |
|---------------|-------------------|
| 即時對話 (Real-time Chat) | 支援與 Gemini Nano 的即時文字對話 |
| 模型狀態檢查 (Model Status Check) | 自動檢查模型是否已下載 |
| 自動下載提示 (Auto Download Prompt) | 如果模型未下載，會自動提示並開始下載 |
| 下載進度顯示 (Download Progress Display) | 顯示模型下載進度條 |
| 繁體中文支援 (Traditional Chinese Support) | 預設使用繁體中文進行對話 |
| 隱私保護 (Privacy Protection) | 所有運算在本地完成，資料不上傳雲端 |

### 系統提示詞 (System Prompt)

```javascript
"你是一個有用的 AI 助手，請一律使用繁體中文 (Traditional Chinese) 回答使用者的所有問題。"
```

### 更新日誌 (Update Log)

- **2025/05/15 04:43**：如果瀏覽器無法初始化，自動提示下載模型

### 注意事項 (Notes)

- 模型下載完成後才能執行對話功能
- GPU 大概占用 4GB 記憶體
- 需要支援 Chrome Built-in AI 的瀏覽器版本

---

## 相關資源 (Related Resources)

| 資源 (Resource) | 連結 (Link) |
|----------------|------------|
| Prompt API 文檔 | [https://developer.chrome.com/docs/ai/prompt-api?hl=zh-tw](https://developer.chrome.com/docs/ai/prompt-api?hl=zh-tw) |
| 內建 AI API 文檔 | [https://developer.chrome.com/docs/ai/built-in-apis?hl=zh-tw](https://developer.chrome.com/docs/ai/built-in-apis?hl=zh-tw) |
| 開始使用內建 AI | [https://developer.chrome.com/docs/ai/get-started?hl=zh-tw](https://developer.chrome.com/docs/ai/get-started?hl=zh-tw) |
| GeminiNanoWebBot 演示 | [https://zhanyanjie6796.github.io/GeminiNanoWebBot/index.html](https://zhanyanjie6796.github.io/GeminiNanoWebBot/index.html) |

---

## 常見問題 (FAQ)

### Q1: 模型下載失敗怎麼辦？

確保網路連線穩定，並確認 Chrome 位址列輸入 `chrome://flags/#prompt-api-for-gemini-nano` 已啟用。

### Q2: 如何確認模型已下載完成？

在 Chrome 位址列輸入 `chrome://on-device-internals/` 查看模型狀態。

### Q3: 為什麼 AI 沒有回應？

檢查是否已下載模型，並確認瀏覽器版本支援 Chrome Built-in AI APIs。

### Q4: 模型會占用多少空間？

模型檔案約 4GB，下載後可能需要 4-5GB 的硬碟空間。

---

## 版本資訊 (Version Information)

| 項目 (Item) | 版本 (Version) |
|------------|---------------|
| 模型版本 (Model Version) | 2025.8.8.1141 |
| 筆記更新日期 (Note Update Date) | 2026/05/15 |

---

> **免責聲明 (Disclaimer)**：本文件僅供參考，Chrome 瀏覽器功能可能隨版本更新而變更。請以官方文檔為準。
