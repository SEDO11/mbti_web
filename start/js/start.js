const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const resultImg = document.querySelector('#resultImg');
const resultName = document.querySelector('.resultName');
const resultContent = document.querySelector('.resultDesc');
const endPoint = 12;
const select = [];

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

/** 결과값을 토대로 해당 사용자가 뭐에 해당하는지 연산하는 함수 */
function calResult() {
    let pointArray = [
        { name: 'mouse', value: 0, key: 0},
        { name: 'cow', value: 0, key: 1},
        { name: 'tiger', value: 0, key: 2},
        { name: 'rabbit', value: 0, key: 3},
        { name: 'dragon', value: 0, key: 4},
        { name: 'snake', value: 0, key: 5},
        { name: 'horse', value: 0, key: 6},
        { name: 'sheep', value: 0, key: 7},
        { name: 'monkey', value: 0, key: 8},
        { name: 'chick', value: 0, key: 9},
        { name: 'dog', value: 0, key: 10},
        { name: 'pig', value: 0, key: 11}
    ]

    for(let i=0; i<endPoint; i++) {
        let target = qnaList[i].a[select[i]];
        for(let j=0; j<target.type.length; j++) {
            for(let k=0; k<endPoint; k++) {
                if (target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                    break
                }
            }
        }
    }

    let resultArray = pointArray.sort(function (a, b) {
        if(a.value > b.value) {
            return -1;
        }
        if(a.value < b.value) {
            return 1;
        }
        return 0;
    })

    let resultword = resultArray[0].key;
    console.log(resultArray);
    return resultword;
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
            select[qIdx] = idx;
            for(let i=0; i<children.length; i++) {;
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
        console.log(select);
        for(let i in select) {
            let target = qnaList[i].a[select[i]].type;
            console.log(target);
        }
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

    if(move) {
        sec1 = main
        sec2 = qna
    } else {
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
                sec1.style.display = 'none' // 메인화면을 끄고
                sec2.style.display = 'block' // qna화면을 보여준다
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