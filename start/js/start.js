const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const resultImg = document.querySelector('#resultImg');
const resultName = document.querySelector('.resultName');
const resultContent = document.querySelector('.resultDesc');
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let start = 1

/** 결과 이미지 및 글자 생성 */
function createResult(idx) {
    let img = "./img/image-" + idx + ".png"
    let m = document.createElement("img");
    let divName = document.createElement('div');
    let divContent = document.createElement('div');

    m.setAttribute("src", img);
    m.setAttribute("width", "100%");
    m.setAttribute("alt", "결과 이미지");

    divName.classList.add('my-3');
    divName.classList.add('mx-5');
    divName.innerHTML = infoList[idx].name;

    divContent.classList.add('my-3');
    divContent.classList.add('mx-5');
    divContent.innerHTML = infoList[idx].desc;

    resultImg.appendChild(m);
    resultName.appendChild(divName);
    resultContent.appendChild(divContent);
}

/** 결과값 연산하는 함수 */
function calResult() {
    let result = select.indexOf(Math.max(...select))
    return result;
}

/** answer을 눌렀을 때 나타내고 사라지게 하는 함수 */
function addAnswer(answerText, qIdx, idx) {
    let a = document.querySelector('.answerBox');
    let answer = document.createElement('Button');
    answer.classList.add('answerList');
    answer.classList.add('my-2');
    answer.classList.add('py-2');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        let children = document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = 'fadeOut 0.5s';
            children[i].style.animation = 'fadeOut 0.5s';
        }
        
        setTimeout(() => {
            let target = qnaList[qIdx].a[idx].type;
            for(let j=0; j<target.length; j++) {
                select[target[j]] += 1;
            }

            for(let i=0; i<children.length; i++) { // 다음 문답으로 넘어가는 코드
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
        console.log(qIdx);
    }, false);
}

/** 다음 answer로 넘어가기 위한 함수 */
function goNext(qIdx) {
    if(qIdx === endPoint) {
        begin(1, 0)
        console.log(select)
        return
    }

    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;

    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    let status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

/** 처음 section 에서 다음 section 로 넘어가기 위한 함수 */
function begin(start, move) {
    let sec1, sec2

    if(move) { // main -> qna
        sec1 = main
        sec2 = qna
    } else { // qna -> result
        sec1 = qna
        sec2 = result
    }

    if(start) {
        sec1.style.WebkitAnimation = 'fadeOut 1s';
        sec1.style.animation = 'fadeOut 1s';
        setTimeout(() => {
            sec2.style.WebkitAnimation = 'fadeIn 1s';
            sec2.style.animation = 'fadeIn 1s';
            setTimeout(() => {
                sec1.style.display = 'none' // 이전 화면을 끄고
                sec2.style.display = 'block' // 다음 화면을 보여준다
            }, 450)
            if(move) {
                let qIdx = 0;
                goNext(qIdx);
            } else {
                createResult(calResult())
            }
        }, 450)
        start = 0
    }
}