const main = document.querySelector('#main');
const qna = document.querySelector('#qna');


function addAnswer(answerText, qIdx) {
    let a = document.querySelector('.answerBox');
    let answer = document.createElement('Button');
    answer.classList.add('answerList');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i=0; i<children.length; i++) {
            children[i].disabled = true;
            children[i].style.display = "none";
        }
        goNext(++qIdx);
        console.log(qIdx);
    }, false);
}

function goNext(qIdx) {
    let q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;

    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
}

function begin() {
    main.style.WebkitAnimation = 'fadeOut 1s';
    main.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        qna.style.WebkitAnimation = 'fadeIn 1s';
        qna.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            main.style.display = 'none' // 메인화면을 끄고
            qna.style.display = 'block' // qna화면을 보여준다
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450)
}