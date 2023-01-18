function kakaoShare() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '십이간지로 보는 내 연애성향',
            imageUrl:
                './img/share.png',
            link: {
                mobileWebUrl: 'https://love12animal.netlify.app/',
                webUrl: 'https://love12animal.netlify.app/',
            },
        },
        buttons: [
            {
                title: '웹으로 이동',
                link: {
                    mobileWebUrl: 'https://love12animal.netlify.app/',
                    webUrl: 'https://love12animal.netlify.app/',
                },
            },
        ],
    });
}