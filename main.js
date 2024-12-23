let imgButton;
let hoverText; // 텍스트를 저장할 DOM 요소

function setup() {
  createCanvas(windowWidth, windowHeight); // 캔버스 크기를 화면 크기에 맞춤
  

  // 이미지 버튼 생성
  imgButton = createImg('bt.svg'); // 이미지 경로 설정
  imgButton.mousePressed(goToNewPage); // 클릭 시 `goToNewPage` 함수 호출
  
  hoverText = createDiv('시작!'); // 텍스트 생성
  hoverText.style('font-family', 'Pretendard, sans-serif');
  hoverText.style('font-size', '16px');
  hoverText.style('color', 'white');
  hoverText.style('background-color', 'rgba(0, 0, 0, 0.7)');
  hoverText.style('padding', '5px 10px');
  hoverText.style('border-radius', '5px');
  hoverText.style('opacity', '0'); // 기본적으로 숨김
  hoverText.style('position', 'absolute');
  hoverText.style('pointer-events', 'none'); // 마우스 이벤트 방지
  
  // 부모를 화면 전체 기준으로 설정
  hoverText.position(windowWidth / 2, windowHeight / 2); // 중앙 위치
  hoverText.style('transform', 'translate(-50%, -50%)'); // 완전한 중앙 배치

  // 반응형 크기 설정 및 중앙 배치
  resizeButton();

  // 이미지 버튼 호버 효과
  imgButton.mouseOver(showHoverText); // 마우스 올릴 때
  imgButton.mouseOut(hideHoverText); // 마우스 나갈 때
}

function goToNewPage() {
  window.location.href = 'index2.html'; // 이동할 페이지의 경로 설정
}

function resizeButton() {
  let buttonWidth = windowWidth * 0.1;  // 화면 너비의 10%로 버튼 크기 설정
  let buttonHeight = buttonWidth;       // 가로세로 비율을 유지하기 위해 높이를 너비와 동일하게 설정
  
  imgButton.size(buttonWidth, buttonHeight); // 버튼 크기 설정
  
  // 버튼을 화면 중앙에 배치
  imgButton.position(windowWidth / 2 - buttonWidth / 2, windowHeight / 1.5 - buttonHeight / 2);
  
  // 텍스트 위치를 버튼 위로 이동
  hoverText.style('left', `${windowWidth / 2 - buttonWidth / 2}px`);
  hoverText.style('top', `${windowHeight / 1.5 - buttonHeight}px`); // 버튼 바로 위
}

function showHoverText() {
  imgButton.style('transform', 'scale(1.2)'); // 이미지 확대
  imgButton.style('transition', 'transform 0.3s ease'); // 부드러운 확대
  // hoverText.style('opacity', '1'); // 텍스트 표시 기능 제거
}

function hideHoverText() {
  imgButton.style('transform', 'scale(1)'); // 원래 크기로 복구
  // hoverText.style('opacity', '0'); // 텍스트 숨김 기능 제거
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 캔버스 크기 조정
  resizeButton(); // 버튼 크기 및 위치 재조정
}
