// http://www.websocket.org/echo.html

const wsUri = "ws://127.0.0.1:5000";
connect_websocket()

function connect_websocket(){
    websocket = new WebSocket(wsUri);

    websocket.onopen = (e) => {
    $("#output").html("");
    writeToScreen("CONNECTED");
    };

    websocket.onclose = (e) => {
    $("#output").html("");
    writeToScreen("DISCONNECTED");
    };

    websocket.onmessage = (e) => {
    // writeToScreen(`<span>RESPONSE: ${e.data}</span>`);
        $("#currentStatus").val(e.data)
        if ((e.data).includes("originalSentence")){
            textarea_content_change(e.data);
        }
    };

    websocket.onerror = (e) => {
    writeToScreen(`<span class="error">ERROR:</span> ${e.data}`);
    };
}


function doSend(message) {
    // writeToScreen(`SENT: ${message}`);
    websocket.send(message);
}

function writeToScreen(message) {
    output.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
}

function login(){
    jObject = {};
    jObject["cmd"] = "setUserID";
    jObject["userId"] = $("#account").val();
    command = JSON.stringify(jObject)
    console.log(command)
    doSend(command);
}

function button_normal_mode(){
    jObject = {};
    jObject["cmd"] = "setRecordingMode";
    jObject["mode"] = "Normal";
    command = JSON.stringify(jObject)
    doSend(command);
}

function button_continuous_mode(){
    jObject = {};
    jObject["cmd"] = "setRecordingMode";
    jObject["mode"] = "Continuous";
    command = JSON.stringify(jObject)
    doSend(command);
}

function button_inquiry_mode(){
    jObject = {};
    jObject["cmd"] = "setRecordingMode";
    jObject["mode"] = "Inquiry";
    command = JSON.stringify(jObject)
    doSend(command);
}





function change_select(select_item){
    $(".setContextField").hide();

    switch (select_item.value) {
        case "getStatus":
            $("#labelFunctionHint").text("取得狀態，比如初始化完畢、辨識中、辨識完等");
            break;
        case "setContext":
            $("#labelFunctionHint").text("設置相關狀態，請填入下方表單代號，病床號碼等資訊");
            $(".setContextField").show();
            break;
        case "speechToIntent":
            $("#labelFunctionHint").text("語音轉意圖，APP會開始收音，並將語音辨識為文字，收音完成後會進行理解");
            break;
        case "finish":
            $("#labelFunctionHint").text("完成辨識，進行理解");
            break;
        case "speechToText":
            $("#labelFunctionHint").text("聽寫模式，APP會開始收音，並將語音辨識為文字");
            break;
        case "textToIntent":
            $("#labelFunctionHint").text("文字轉意圖");
            break;
        case "learning":
            $("#labelFunctionHint").text("學習機制");
            break;
        case "logOff":
            $("#labelFunctionHint").text("登出華碩醫療語音APP");
            break;
        case "resetContext":
            $("#labelFunctionHint").text("清掉狀態");
            break;
        case "showMsg":
            $("#labelFunctionHint").text("顯示訊息");
            break;
        case "background":
            $("#labelFunctionHint").text("將華碩醫療語音APP退到背景");
            break;
        case "foreground":
            $("#labelFunctionHint").text("將華碩醫療語音APP叫到前景");
            break;
        case "shutdown":
            $("#labelFunctionHint").text("關閉華碩醫療語音APP");
            break;
        case "connect":
            $("#labelFunctionHint").text("對華碩醫療語音APP進行連線");
            break;
        case "disconnect":
            $("#labelFunctionHint").text("在準備斷線時，會送出此命令，App收到命令會進行視窗最小化的動作");
            break;
        case "getRecordingMode":
            $("#labelFunctionHint").text("獲取華碩醫療語音APP當下的語音模式");
            break;
        default:
            $("#labelFunctionHint").text("");
            break;
      }
}


function function_select(){
    command = command_creator($("#otherFunction").val())
    command = JSON.stringify(command)
    console.log(command)
    if (command){
        doSend(command);
    }
    
}


function command_creator(selectedItem){
    isByNetSDK = false;
    switch (selectedItem) {
        case "getStatus":
            jObject = {};
            jObject["cmd"] = "getStatus";
            return jObject;
        case "setContext":
            statusObject = {};
            statusObject["Formid"] = $("#Formid").val();
            statusObject["BedNo"] = $("#BedNo").val();
            statusObject["SubFormid"] = $("#SubFormid").val();
            jObject = {};
            jObject["status"] = statusObject;
            jObject["cmd"] = "setContext";
            return jObject;

        case "speechToIntent":
            HIS_String = "";
            HIS_Info = "";
        
            jObject = {};
            jObject["cmd"] = "speechToIntent";
            jObject["language"] = "medical";
            return jObject;

        case "finish":
                jObject = {};
                jObject["cmd"] = "finish";
                return jObject;

        case "speechToText":
                jObject = {};
                jObject["cmd"] = "speechToText";
                jObject["language"] = "medical";
                return jObject;

        case "textToIntent":
                jObject = {};
                jObject["cmd"] = "textToIntent";
                jObject["msg"] = "XX表單病床XX號病人意識清醒";
                return jObject;
        case "learning":
                jObject = {};
                jObject2 = {};
                jObject2["uuid"] = "27d9ac46-c7dd-4e5a-aa1b-71ca9e4b19d8";
                jObject2["org"] = "你好台北市天氣";
                jObject2["revised"] = "你好台北市的天氣";
                jObject["status"] = jObject2;
                jObject["cmd"] = "learning";
                return jObject;
        case "logOff":
                jObject = {};
                jObject["cmd"] = "logOff";
                return jObject;
        case "resetContext":
                jObject = {};
                jObject["cmd"] = "resetContext";
                return jObject;
        case "showMsg":
                jObject = {};
                jObject["cmd"] = "showMsg";
                jObject["msg"] = "資料已回傳成功，請至表單確認，並記得按下儲存喔!";
                return jObject;
        case "background":
                jObject = {};
                jObject["cmd"] = "background";
                return jObject;
        case "foreground":
                jObject = {};
                jObject["cmd"] = "forground";
                return jObject;
        case "shutdown":
                jObject = {};
                jObject["cmd"] = "shutdown";
                return jObject;
        case "connect":
            try {
                if (websocket == null) {
                    connect_websocket()
                }
                else if (websocket.readyState == 1) {
                    try {
                        websocket.close();
                    }
                    catch
                    { }
                    connect_websocket()
                }
                else {
                    connect_websocket()
                }
            }
            catch
            { }
            break;
        case "disconnect":
                jObject = {};
                jObject["cmd"] = "disconnect";
                return jObject;
        case "getRecordingMode":
                jObject = {};
                jObject["cmd"] = "getRecordingMode";
                return jObject;
        default:
            console.log("unknown command");
            break;
    }
}



function textarea_content_change(str) {
    checkbox_initialization()
    data = JSON.parse(str);

    // semantic analysis
    if (data.resultJson.beliefs){
        result = JSON.parse(data.resultJson.beliefs)
        $("#MedicalRecord").val(result["outputResult"]["medicalRecord"]);
    }
    

    $("#Transcript").val(data['resultJson']['originalSentence']);


    if (data['resultJson']['originalSentence'].includes("發炎")){
        $("#inflamedButton").prop("checked", true);
    }

    if (data['resultJson']['originalSentence'].includes("腫脹")){
        $("#swellingButton").prop("checked", true);
    }

    if (data['resultJson']['originalSentence'].includes("清醒")){
        $("#sobrietyButton").prop("checked", true);
    }

    if (data['resultJson']['originalSentence'].includes("昏迷")){
        $("#comaButton").prop("checked", true);
    }

    if (data['resultJson']['originalSentence'].includes("出血")){
        $("#bleedingButton").prop("checked", true);
    }

    if (data['resultJson']['originalSentence'].includes("結石")){
        $("#stoneButton").prop("checked", true);
    }
}



function checkbox_initialization(){
      //initialization
      $("#inflamedButton").prop("checked", false);
      $("#swellingButton").prop("checked", false);
      $("#sobrietyButton").prop("checked", false);
      $("#comaButton").prop("checked", false);
      $("#bleedingButton").prop("checked", false);
      $("#stoneButton").prop("checked", false);
}