// 이미지 파일 경로 형식 지정
const imagePrefix = "./assets/Wonyoung";
const imageExtension = ".jpg";

// 현재 이미지 번호를 저장할 변수
let currentIndex = 1;

// 총 이미지 개수
const maxImages = 65;

// DOM 요소 참조
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const numberElement = document.querySelector(".child-number");
const prevButton = document.querySelector(".child-previous");
const nextButton = document.querySelector(".child-next");

let showingImage1 = true;

function getImagePath(index) {
    const formatted = String(index).padStart(3, "0");
    return `${imagePrefix}${formatted}${imageExtension}`;
}

function preloadImage(index) {
    const img = new Image();
    img.src = getImagePath(index);
}

function switchImage(nextIndex, direction) {
    const outgoing = showingImage1 ? image1 : image2;
    const incoming = showingImage1 ? image2 : image1;

    // 방향에 따른 클래스 설정
    const outClass = direction === "left" ? "slide-out-left" : "slide-out-right";
    const inClass = direction === "left" ? "slide-in-right" : "slide-in-left";

    // 나가는 이미지
    outgoing.classList.remove("slide-in-left", "slide-in-right", "active");
    outgoing.classList.add(outClass);

    // 들어오는 이미지
    incoming.src = getImagePath(nextIndex);
    incoming.classList.remove("slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right", "active");
    void incoming.offsetWidth; // 리플로우
    incoming.classList.add(inClass, "active");

    currentIndex = nextIndex;
    numberElement.textContent = String(currentIndex).padStart(3, "0");
    showingImage1 = !showingImage1;

    preloadImage((currentIndex % maxImages) + 1);
    preloadImage(currentIndex - 1 === 0 ? maxImages : currentIndex - 1);
}

// 애니메이션 효과 적용
prevButton.addEventListener("click", () => {
    const prev = currentIndex - 1 === 0 ? maxImages : currentIndex - 1;
    switchImage(prev, "right");
});

nextButton.addEventListener("click", () => {
    const next = currentIndex % maxImages + 1;
    switchImage(next, "left");
});

// 초기화
image1.src = getImagePath(currentIndex);
image1.classList.add("active");
numberElement.textContent = String(currentIndex).padStart(3, "0");
preloadImage(currentIndex + 1);
preloadImage(maxImages);