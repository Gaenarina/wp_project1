let map;
let markers = []; // 마커를 저장할 배열
var marker;
const button = document.getElementById('load');
const proxyUrl = "https://cors-anywhere-bilm.onrender.com/";
const apiKey = "uisrk38ueHb%2FnFn0onI%2BfI8wX8vaZ6yWQajuTXeWqJMbzXV9%2F3NrrDudb%2FHTUw4YH5LVDkeRsAvH0ZTbx2hQCw%3D%3D";//배포용 인증키
//const apiKey_2 = "u20eAPwTGoCjnvtulzHI6NOTjgn%2F1JGe8IkIFg3xvSKQJxSGevojmyKi3hv1bGU9s56CeLhdGz9GHjYgdEwOtA%3D%3D"; //앱 테스트용 인증키
//const apiKey_3 = "C8ABXT8aA2t7B9k4Zq2jBEzGwIUVayTMMBjgJGi3RtTivaMsMqL2fzptP3sbDxZ261fEOI409pvQl24PAweMwQ%3D%3D"; // 앱 테스트용 인증키
const baseUrl = "http://apis.data.go.kr/B551011/KorService1/areaCode1";
const baseUrl_2 = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1";
const baseUrl_3 = "http://apis.data.go.kr/B551011/KorService1/detailIntro1";
const a_list = [1, 2, 3, 4, 5, 6, 7, 8, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const cityNames = {
    "1": "서울",
    "2": "인천",
    "3": "대전",
    "4": "대구",
    "5": "광주",
    "6": "부산",
    "7": "울산",
    "8": "세종",
    "31": "경기",
    "32": "강원",
    "33": "충북",
    "34": "충남",
    "35": "경북",
    "36": "경남",
    "37": "전북",
    "38": "전남",
    "39": "제주"
};

const guOptions = {};
const guCodes = {};
const t_list = [12, 14, 28, 32, 38, 39];

const types = {
    "12": "관광지",
    "14": "문화시설",
    "28": "레포츠",
    "32": "숙박",
    "38": "쇼핑",
    "39": "음식"
};

const markerImages = {
    "12": "./images/nature.png",
    "14": "./images/art.png",
    "28": "./images/reports.png",
    "32": "./images/sleep.png",
    "38": "./images/shopping.png",
    "39": "./images/food.png"
};

const guCoordinates = {
    "서울": {
        "강남구": new kakao.maps.LatLng (37.4968488, 127.0679394 ),
        "강동구": new kakao.maps.LatLng(37.5499, 127.1465),
        "강북구": new kakao.maps.LatLng(37.6482, 127.0164),
        "강서구": new kakao.maps.LatLng(37.5526, 126.8505),
        "관악구": new kakao.maps.LatLng(37.4655, 126.9444),
        "광진구": new kakao.maps.LatLng(37.5388, 127.0834),
        "구로구": new kakao.maps.LatLng(37.4958, 126.8579),
        "금천구": new kakao.maps.LatLng(37.4600, 126.9013),
        "노원구": new kakao.maps.LatLng(37.6543, 127.0767),
        "도봉구": new kakao.maps.LatLng(37.6670, 127.0277),
        "동대문구": new kakao.maps.LatLng(37.5836, 127.0491),
        "동작구": new kakao.maps.LatLng(37.4971, 126.9444),
        "마포구": new kakao.maps.LatLng(37.5616, 126.9086),
        "서대문구": new kakao.maps.LatLng(37.5833, 126.9357),
        "서초구": new kakao.maps.LatLng(37.4836, 127.0328),
        "성동구": new kakao.maps.LatLng(37.5509, 127.0409),
        "성북구": new kakao.maps.LatLng(37.6023, 127.0253),
        "송파구": new kakao.maps.LatLng(37.5048, 127.1145),
        "양천구": new kakao.maps.LatLng(37.5274, 126.8559),
        "영등포구": new kakao.maps.LatLng(37.5254, 126.8968),
        "용산구": new kakao.maps.LatLng(37.5305, 126.9804),
        "은평구": new kakao.maps.LatLng(37.6176, 126.9249),
        "종로구": new kakao.maps.LatLng(37.6009, 126.9836),
        "중구": new kakao.maps.LatLng(37.5577, 126.9942),
        "중랑구": new kakao.maps.LatLng(37.5955, 127.0957)
    },

    "인천": {
        "중구": new kakao.maps.LatLng (37.4643, 126.5904),
        "동구": new kakao.maps.LatLng (37.4753,126.6369),
        "미추홀구":  new kakao.maps.LatLng (37.4419, 126.6883),
        "연수구": new kakao.maps.LatLng (37.4172, 126.6788),
        "남동구": new kakao.maps.LatLng (37.4020, 126.6523),
        "부평구": new kakao.maps.LatLng (37.4971, 126.7245),
        "계양구": new kakao.maps.LatLng (37.5722, 126.7186),
        "서구": new kakao.maps.LatLng  (37.4818, 126.6453)
    },
    "제주": {
        "제주시": new kakao.maps.LatLng (33.4996, 126.5312),
        "서귀포시": new kakao.maps.LatLng (33.2479, 126.5093)
    }
}

window.onload = init;

function init() {
    initMap();
    loadGuOptions();
    button.addEventListener('click', find);
}

function initMap() {
    const mapContainer = document.getElementById("map");
    const mapOption = {
        center: new kakao.maps.LatLng(37.5636, 126.98),
        level: 9 // 좀 더 확대
    };
    map = new kakao.maps.Map(mapContainer, mapOption);
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.text();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function parseXml(xmlString) {
    return new DOMParser().parseFromString(xmlString, "text/xml");
}

async function loadGuOptions() {
    for (const areaCode of a_list) {
        const data = await fetchData(proxyUrl + `${baseUrl}?serviceKey=${apiKey}&areaCode=${areaCode}&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AppTest`);
        if (data) {
            const xmlDoc = parseXml(data);
            const guItems = xmlDoc.querySelectorAll('item');

            if (guItems.length > 0) {
                const cityName = cityNames[areaCode];
                const guList = [];
                const guCodeList = [];

                guItems.forEach(item => {
                    const guElement = item.querySelector("name");
                    const codeOfgu = item.querySelector("code");

                    if (guElement) guList.push(guElement.textContent);
                    if (codeOfgu) guCodeList.push(codeOfgu.textContent);
                });

                guOptions[cityName] = guList;
                guCodes[cityName] = guCodeList;
            }
        }
    }
}

document.getElementById("si").addEventListener("change", function() {
    const selectedSi = this.value;
    const guSelect = document.getElementById("gu");
    guSelect.innerHTML = '<option value="">구 선택</option>';

    if (selectedSi && guOptions[selectedSi]) {
        guOptions[selectedSi].forEach(gu => {
            if (gu !== "북제주군" && gu !== "남제주군") {
                const option = new Option(gu, gu);
                guSelect.appendChild(option);
            }
        });
    }
});

async function find() {
    const selectedSi = document.getElementById("si").value;
    const selectedGu = document.getElementById("gu").value;
    const selectedType = document.getElementById("type").value;

    if (!selectedSi || !selectedGu || !selectedType) {
        alert("모든 항목을 선택하세요.");
        return;
    }

    const areaCode = Object.keys(cityNames).find(key => cityNames[key] === selectedSi);
    const typeCode = Object.keys(types).find(key => types[key] === selectedType);
    const guCode = guCodes[selectedSi][guOptions[selectedSi].indexOf(selectedGu)];

    if (areaCode && typeCode && guCode) {
        await loadTourOptions(areaCode, guCode, typeCode);
    }
}


async function loadTourOptions(areaCode, guCode, typeCode) {
    clearMarkers(); // 기존 마커 삭제
    const t_data = await fetchData(proxyUrl + `${baseUrl_2}?serviceKey=${apiKey}&pageNo=1&numOfRows=1000&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=${typeCode}&areaCode=${areaCode}&sigunguCode=${guCode}`);
    
    if (t_data) {
        const xmlDoc = parseXml(t_data);
        const tourItems = xmlDoc.querySelectorAll("item");

        const tourlistDiv = document.getElementById("tourlist"); // 출력할 DIV 선택
        tourlistDiv.innerHTML = ""; // 기존 관광지 정보 초기화

        let bounds = new kakao.maps.LatLngBounds(); // 지도 중심을 계산하기 위한 영역 설정

        tourItems.forEach(item => {
            const title = item.querySelector("title").textContent;
            const address = item.querySelector("addr1").textContent;
            const lng = item.querySelector("mapx").textContent;
            const lat = item.querySelector("mapy").textContent;
            const contentTypeId = item.querySelector("contenttypeid").textContent;
            const contentId = item.querySelector("contentid").textContent;

            const markerImageUrl = markerImages[contentTypeId];
            const markerImage = new kakao.maps.MarkerImage(markerImageUrl, new kakao.maps.Size(30, 30));
            const markerPosition = new kakao.maps.LatLng(lat, lng);
            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
                clickable: true,
                zIndex: 5
            });

            marker.setMap(map); // 지도에 마커 표시
            markers.push(marker); // 마커 배열에 추가
            bounds.extend(markerPosition); // 중심 계산을 위한 영역 확장

            // tourlistDiv를 전달
            displayTourInfo(title, address, marker, contentId, contentTypeId, tourlistDiv);
        });

        // 지도 중심 설정
        const selectedSi = document.getElementById("si").value;
        const selectedGu = document.getElementById("gu").value;

        if (guCoordinates[selectedSi] && guCoordinates[selectedSi][selectedGu]) {
            const center = guCoordinates[selectedSi][selectedGu];
            map.setCenter(center); // 해당 군구의 중심으로 이동
            if (selectedSi === "제주") {
                map.setLevel(11);
            }
        } else {
            map.setBounds(bounds); // 기본적으로 마커들로 이동
        }
    }
}

async function displayTourInfo(title, address, marker, contentId, contentTypeId, tourlistDiv) {
    const moreInfo = await fetchData(proxyUrl + `${baseUrl_3}?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&contentTypeId=${contentTypeId}`);

    const infowindow = new kakao.maps.InfoWindow({
        content: `<div style='width:200px; height:80px; padding:5px; background-color: #a3c353; color: #fff;'>
                  <h3 style="font-size:15px; font-weight: bold;">[${title}]</h3>
                  <p style="padding:3px; font-size:11px">•${address}</p>
                  </div>`,
        zIndex: 7,
        removable: true
    });

    // 클릭 이벤트로 인포윈도우를 여는 부분
    kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });

    const div = document.createElement("div");
    div.setAttribute("class", "tourlist");
    div.innerHTML = `<b style="margin-right: 10px;">${title}</b><input class="btn btn-success" type="button" value="장소 상세보기" style="font-size:11px;" 
                         onclick="window.open('http://www.google.co.kr/maps/search/${title}')"/><br>🧭주소: ${address}<br>`;

    if (moreInfo) {
        const xmlDoc = parseXml(moreInfo);
        const moreInfos = xmlDoc.querySelectorAll("item");

        moreInfos.forEach(item => {
            if(contentTypeId === "12"){
                const openDate = item.querySelector("opendate").textContent || "정보 없음";
                const restDate = item.querySelector("restdate").textContent || "정보 없음";
                const useTime = item.querySelector("usetime").textContent || "정보 없음";
                const parking = item.querySelector("parking").textContent || "정보 없음";
                div.innerHTML += "<p>🚩개장일: " + openDate+ "<br>🕑이용시간: " + useTime + "<br>🅿️주차: " + parking + "<br>🚨휴무일: " + restDate + "</p>";
            } else if (contentTypeId === "14") {
                const restdateCulture = item.querySelector("restdateculture").textContent || "정보 없음";
                const parkingCulture = item.querySelector("parkingculture").textContent || "정보 없음";
                const parkingFee = item.querySelector("parkingfee").textContent || "정보 없음";
                const usetimeCulture = item.querySelector("usetimeculture").textContent || "정보 없음";
                const useFee = item.querySelector("usefee").textContent || "정보 없음";
                div.innerHTML += "<p>🕑이용시간: " + usetimeCulture + "<br>💰이용 요금: "+ useFee + "<br>🅿️주차: "+parkingCulture+"<br>💰주차 요금: " +parkingFee+ "<br>🚨휴무일: " + restdateCulture + "</p>";
            } else if (contentTypeId === "28") {
                const openPeriod = item.querySelector("openperiod").textContent || "정보 없음";
                const reservation = item.querySelector("reservation").textContent || "정보 없음";
                const parkingLeports = item.querySelector("parkingleports").textContent || "정보 없음";
                const usefeeLeports = item.querySelector("usefeeleports").textContent || "정보 없음";
                const usetimeLeports = item.querySelector("usetimeleports").textContent || "정보 없음";
                div.innerHTML += "<p>🚩개장 기간: " + openPeriod + "<br🎫예약: "+ reservation + "<br>💰이용 요금: " + usefeeLeports +"<br>🕑이용시간: "+usetimeLeports + "<br>🅿️주차: " +parkingLeports + "</p>";
            }
            else if (contentTypeId === "32") {
                const checkintime = item.querySelector("checkintime").textContent || "정보 없음";
                const checkouttime = item.querySelector("checkouttime").textContent || "정보 없음";
                const reservationlodging = item.querySelector("reservationlodging").textContent || "정보 없음";
                const infocenterlodging = item.querySelector("infocenterlodging").textContent || "정보 없음";
                const parkinglodging = item.querySelector("parkinglodging").textContent || "정보 없음";
                div.innerHTML += "<p>✅체크인:" + checkintime + "<br>☑️체크아웃: " + checkouttime+ "<br>🎫예약: "+reservationlodging+ "<br>ℹ️문의 및 안내: " + infocenterlodging + "<br>🅿️주차: " + parkinglodging + "</p>";
            }
            else if (contentTypeId === "38") {
                const chkbabycarriageshopping = item.querySelector("chkbabycarriageshopping").textContent || "정보 없음";
                const chkpetshopping = item.querySelector("chkpetshopping").textContent || "정보 없음";
                const opentime = item.querySelector("opentime").textContent || "정보 없음";
                const restdateshopping = item.querySelector("restdateshopping").textContent || "정보 없음";
                const parkingshopping = item.querySelector("parkingshopping").textContent || "정보 없음";
                div.innerHTML += "<p>🕑운영 시간: " + opentime + "<br>🐕애완동물 출입: " +chkpetshopping+"<br>🚼유모차 대여: " +chkbabycarriageshopping + "<br>🅿️주차: "+parkingshopping + "<br>🚨휴무일: "+restdateshopping + "</p>";
            }else if (contentTypeId === "39") {
                const opentimefood = item.querySelector("opentimefood").textContent || "정보 없음";
                const restdatefood = item.querySelector("restdatefood").textContent || "정보 없음";
                const treatmenu = item.querySelector("treatmenu").textContent || "정보 없음";
                const parkingfood = item.querySelector("parkingfood").textContent || "정보 없음";
                div.innerHTML += "<p>🕑운영 시간: " + opentimefood + "<br>🥄취급메뉴: " + treatmenu + "<br>🅿️주차: " + parkingfood + "<br>🚨휴무일: " + restdatefood + "</p>";
            }
        });
    }

    // 생성된 요소를 tourlistDiv에 추가
    tourlistDiv.appendChild(div);
}


function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null); // 마커를 지도에서 제거
    });
    markers = []; // 마커 배열 초기화
}

function go_top(orix,oriy,desx,desy) {
	var Timer;
	if (document.body.scrollTop == 0) {
		var winHeight = document.documentElement.scrollTop;
	} else {
		var winHeight = document.body.scrollTop;
	}
	if(Timer) clearTimeout(Timer);
	startx = 0;
	starty = winHeight;
	if(!orix || orix < 0) orix = 0;
	if(!oriy || oriy < 0) oriy = 0;
	var speed = 5;
	if(!desx) desx = 0 + startx;
	if(!desy) desy = 0 + starty;
	desx += (orix - startx) / speed;
	if (desx < 0) desx = 0;
	desy += (oriy - starty) / speed;
	if (desy < 0) desy = 0;
	var posX = Math.ceil(desx); var posY = Math.ceil(desy);
	window.scrollTo(posX, posY);
	if((Math.floor(Math.abs(startx -orix)) < 1) && (Math.floor(Math.abs(starty-oriy)) < 1)) {
		clearTimeout(Timer);
		window.scroll(orix, oriy);
	} else if (posX != orix || posY != oriy) {
		Timer = setTimeout("go_top("+orix+","+oriy+","+desx+","+desy+")", 15);
	}else {
		clearTimeout(Timer);
	}
}

