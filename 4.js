let img; // 배경 이미지
let maskGraphics; // 검정 레이어용 그래픽
let button; // 첫 번째 버튼
let nextPageButton; // 체크박스 3개 선택 후 활성화되는 버튼
let currentText = "🎅선물을 숨기는 산타 슈니즈를 찾아보세요!🎅"; // 첫 번째 이미지 텍스트

let startTime;
let totalTime = 25; // 타이머 시간 (초)
let barWidth;
let timerEnded = false; // 타이머가 끝났는지 여부

let checkboxes = []; // 체크박스 배열
let allChecked = false; // 모든 체크박스 상태

let checkboxLabels = ["🎅 슈리", "🎅 웬디", "🎅 유시"]; // 체크박스 라벨
let checkboxColors = ["#FF0000", "#FFFF00", "#0000FF"]; // 빨강, 초록, 파랑
let nextPageButtonLabel = "다음으로이동"; // Next Page 버튼 라벨

function preload() {
  img = loadImage("img4.png"); // 첫 번째 이미지 경로
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis(); // 타이머 시작 시간

  textFont('DungGeunMo2'); // 폰트 설정

  // 검정 레이어 생성
  maskGraphics = createGraphics(windowWidth, windowHeight);
  maskGraphics.fill(0);
  maskGraphics.rect(0, 0, windowWidth, windowHeight);

  // 첫 번째 버튼 생성
  button = createImg("swuz.svg", "Go to 3.html");
  button.position(20, 20);
  button.mousePressed(goToNewPage); // 버튼 클릭 시 페이지 이동
  button.style("cursor", "pointer");
  button.size(60, 60);

// 체크박스 생성 및 라벨 설정
for (let i = 0; i < checkboxLabels.length; i++) {
  let checkbox = createCheckbox("", false); // 빈 체크박스 생성
  checkbox.style("font-size", "16px");
  checkbox.style("color", "white");
  checkbox.style("cursor", "pointer");
  checkbox.position(windowWidth - 100, 100 + i * 40);
  checkbox.changed(checkAllBoxes);
  checkboxes.push(checkbox);

  // 라벨 텍스트에 스타일 적용
  let label = createDiv(); // 새 라벨 div 생성
  label.position(windowWidth - 75, 100 + i * 40); // 체크박스 옆에 위치
  label.style("font-size", "16px");
  label.style("color", checkboxColors[i]); // 단어별 색상 적용
  label.style("cursor", "pointer");
  label.html( checkboxLabels[i]); // 이모지와 텍스트 추가
}

  // Next Page 버튼 생성 (초기 비활성화 상태)
  nextPageButton = createButton(nextPageButtonLabel);
  nextPageButton.position(windowWidth - 100, 230);
  nextPageButton.style("font-size", "13px");
  nextPageButton.style("opacity", "0.5");
  nextPageButton.style("cursor", "not-allowed");
  nextPageButton.mousePressed(() => {
    if (allChecked) goToNewPage();
  });

  // Next Page 버튼의 텍스트에 폰트 적용
  nextPageButton.elt.style.fontFamily = "'DungGeunMo2', sans-serif";
}

function draw() {
  // 배경에 이미지 그리기
  let imgRatio = img.width / img.height;
  let newWidth = width * 0.8;
  let newHeight = newWidth / imgRatio;

  if (newHeight > height * 0.8) {
    newHeight = height * 0.8;
    newWidth = newHeight * imgRatio;
  }

  image(img, (width - newWidth) / 2, (height - newHeight) / 2, newWidth, newHeight);

  // 검정 레이어 덮기
  image(maskGraphics, 0, 0);
  
  // 반응형 텍스트 크기 설정
  let responsiveTextSize = width / 30;
  fill(255);
  textSize(responsiveTextSize);
  textAlign(CENTER, TOP);
  text(currentText, width / 2, 20);

  // 남은 시간 계산
  let elapsedTime = (millis() - startTime) / 1000;
  let remainingTime = totalTime - elapsedTime;
  remainingTime = max(0, remainingTime);

  // 진행 바 길이 및 색상 계산
  let progress = remainingTime / totalTime;
  barWidth = windowWidth / 5;
  let currentWidth = progress * barWidth;

  // 둥근 바 그리기
  let red = map(progress, 0, 1, 255, 0);
  let green = map(progress, 0, 1, 0, 255);
  
  noStroke();
  fill(red, green, 0);
  rect(windowWidth - barWidth / 2 - 20, 30, currentWidth / 2, 10, 5); // 너비와 높이를 절반으로 줄임
  
  stroke(255);
  noFill();
  rect(windowWidth - barWidth / 2 - 20, 30, barWidth / 2, 10, 5); // 너비와 높이를 절반으로 줄임

  if (remainingTime <= 0 && !timerEnded) {
    timerEnded = true;
    frameRate(30);
  }
}

function mouseDragged() {
  if (!timerEnded) {
    maskGraphics.erase();
    maskGraphics.circle(mouseX, mouseY, 50);
    maskGraphics.noErase();
  }
}

function checkAllBoxes() {
  allChecked = checkboxes.every((checkbox) => checkbox.checked());
  if (allChecked) {
    nextPageButton.style("opacity", "1");
    nextPageButton.style("cursor", "pointer");
  } else {
    nextPageButton.style("opacity", "0.5");
    nextPageButton.style("cursor", "not-allowed");
  }
}

function goToNewPage() {
  window.location.href = "index.html"; // 페이지 이동
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  maskGraphics = createGraphics(windowWidth, windowHeight);
  maskGraphics.fill(0);
  maskGraphics.rect(0, 0, windowWidth, windowHeight);

  // 체크박스 및 버튼 위치 갱신
  checkboxes.forEach((checkbox, i) => {
    checkbox.position(windowWidth - 100, 100 + i * 40);
  });
  nextPageButton.position(windowWidth - 100, 250);
}
