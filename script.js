// Theme Management
function initTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Initialize on load
initTheme();
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveScrollLink);
});

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Exclude logo link (contains an image)
        if (link.querySelector('img')) {
            link.classList.remove('border-b-2', 'border-primary');
            return;
        }

        // Split href to ignore query params or hashes (e.g. index.html#about -> index.html)
        const showHref = href.split(/[?#]/)[0];
        const hasHash = href.includes('#');

        // If it has a hash (like #about), we don't underline it on load (handled by scroll)
        if (hasHash) {
            link.classList.remove('border-b-2', 'border-primary');
            return;
        }

        // Check if the link's href matches the current path
        if (
            (showHref && currentPath.endsWith(showHref)) ||
            (currentPath === '/' && (showHref === 'index.html' || showHref === '')) ||
            (currentPath.endsWith('/') && showHref === 'index.html')
        ) {
            // Exclude buttons styled with bg-secondary
            if (!link.classList.contains('bg-secondary')) {
                link.classList.add('text-primary', 'border-b-2', 'border-primary');
                // Remove default gray text classes if present to ensure primary color shows
                link.classList.remove('text-gray-600', 'dark:text-gray-300', 'text-slate-600', 'dark:text-slate-300');
            }
        } else {
            if (!link.classList.contains('bg-secondary') && !link.classList.contains('bg-primary')) {
                link.classList.remove('border-b-2', 'border-primary', 'text-primary');
                // Re-add default gray colors if they were stripped? 
                // It's safer to just rely on the base class or specific handling.
                // But let's restore the gray-600/300 combo which seems standard now.
                if (!link.classList.contains('font-bold')) { // Assuming bold links might be special (like recruit CTA) logic handled elsewhere or ignored
                    link.classList.add('text-gray-600', 'dark:text-gray-300');
                }
            }
        }
    });
}

function updateActiveScrollLink() {
    // Only run this on index.html or root
    const currentPath = window.location.pathname;
    const isIndex = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/');

    if (!isIndex) return;

    // Adjust offset for sticky navbar
    const fromTop = window.scrollY + 100;
    const aboutSection = document.getElementById('about');

    if (!aboutSection) return;

    const navLinks = document.querySelectorAll('nav a[href*="#about"]');

    // Check intersection
    if (
        aboutSection.offsetTop <= fromTop &&
        aboutSection.offsetTop + aboutSection.offsetHeight > fromTop
    ) {
        navLinks.forEach(link => {
            link.classList.add('text-primary', 'border-b-2', 'border-primary');
            link.classList.remove('text-gray-600', 'dark:text-gray-300');
        });
    } else {
        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'border-b-2', 'border-primary');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
        });
    }
}

// Member Data
const memberData = {
    '김주한': {
        role: '기장',
        description: '@kjhclider',
        image: 'assets/images/members/kim_juhan.png'
    },
    '정선재': {
        role: '부기장',
        description: '@spxel__',
        image: 'assets/images/members/jeong_seonjae.png'
    },
    '이현준': {
        role: '부원',
        description: '@2hzxz_.n',
        image: 'assets/images/members/lee_hyunjun.png'
    },
    '이준서': {
        role: '부원',
        description: '@junn._.seoo',
        image: 'assets/images/members/lee_junseo.png'
    },
    '이윤형': {
        role: '부원',
        description: '@profittype271',
        image: 'assets/images/members/lee_yunhyeong.png'
    },
    '백종원': {
        role: '부원',
        description: '@jjongwon._.1729',
        image: 'assets/images/members/baek_jongwon.png'
    }
};

function openMemberModal(name) {
    const modal = document.getElementById('member-modal');
    const title = document.getElementById('modal-name');
    const role = document.getElementById('modal-role');
    const description = document.getElementById('modal-description');
    const image = document.getElementById('modal-image');

    if (memberData[name]) {
        title.textContent = name;
        role.textContent = memberData[name].role;
        description.textContent = memberData[name].description;
        if (memberData[name].image) {
            image.src = memberData[name].image;
        } else {
            image.src = ''; // Fallback or clear
        }
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeMemberModal() {
    const modal = document.getElementById('member-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('member-modal');
    if (e.target === modal) {
        closeMemberModal();
    }
});

// 타임라인 데이터 (PDF 내용 반영)
const timelineData = {
    '1-1': [
        { date: '3/19', activity: "과학동아리 최종조직 및 활동 계획 수립" },
        { date: '3/26', activity: "알고리즘 세미나 1- 자료 구조" },
        { date: '4/2', activity: "알고리즘 세미나 2- 그래프 이론과 경로 탐색" },
        { date: '4/9', activity: "알고리즘 세미나 3- 동적 계획법" },
        { date: '4/16', activity: "알고리즘 문제 풀이 실습" },
        { date: '5/7', activity: "인공지능 세미나 1- 머신러닝의 기초" }
    ],
    '1-2': [
        { date: '5/14', activity: "인공지능 세미나 2- 딥러닝과 신경망" },
        { date: '5/21', activity: "인공지능 세미나 3- 생성형 AI와 대형 언어 모델" },
        { date: '5/28', activity: "AI 모델 구현 실습 1" },
        { date: '6/4', activity: "AI 모델 구현 실습 2" },
        { date: '6/11', activity: "데이터 분석 세미나 1- 판다스를 이용한 데이터 처리" },
        { date: '7/9', activity: "데이터 분석 세미나 2- 데이터 시각화" },
        { date: '7/16', activity: "개인별 프로젝트 주제 선정 및 계획 수립" },
        { date: '7/28', activity: "여름방학 집중 활동- 프로젝트 개발 1" }
    ],
    '2-1': [
        { date: '8/13', activity: "여름방학 집중 활동- 프로젝트 개발 2" },
        { date: '8/20', activity: "프로젝트 중간 점검 및 피드백" },
        { date: '8/27', activity: "웹 개발 세미나 1- HTML/CSS 기초" },
        { date: '9/3', activity: "웹 개발 세미나 2- JavaScript 기초" },
        { date: '9/10', activity: "웹 프레임워크 실습 1" },
        { date: '9/24', activity: "웹 프레임워크 실습 2" }
    ],
    '2-2': [
        { date: '10/8', activity: "데이터베이스 세미나 및 실습" },
        { date: '10/22', activity: "API 설계 및 서버 구축 실습" },
        { date: '11/5', activity: "클라우드 서비스 배포 실습" },
        { date: '11/12', activity: "n8n 세미나 및 실습" },
        { date: '11/19', activity: "n8n 세미나 및 실습" },
        { date: '12/10', activity: "n8n 프로젝트 준비" },
        { date: '12/17', activity: "동아리 활동 평가회" }
    ]
};

// 2. 모달 열기 함수
function openTimelineModal() {
    const modal = document.getElementById('timeline-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // 네 HTML 구조상 flex가 필요할 수 있어
        document.body.style.overflow = 'hidden';
        switchTimelineTab('1-1'); // 처음 열 때 1학기 상반기 보여줌
    }
}

// 3. 모달 닫기 함수
function closeTimelineModal() {
    const modal = document.getElementById('timeline-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// 4. 탭 전환 및 내용 표시 함수 (네 HTML의 switchTimelineTab과 매칭)
function switchTimelineTab(period) {
    const content = document.getElementById('timeline-content');
    
    // 모든 탭의 스타일 초기화 (기존 강조 제거)
    const tabs = document.querySelectorAll('[id^="tab-"]');
    tabs.forEach(tab => {
        tab.classList.remove('border-primary', 'text-primary');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    // 선택된 탭 강조
    const activeTab = document.getElementById(`tab-${period}`);
    if (activeTab) {
        activeTab.classList.add('border-primary', 'text-primary');
        activeTab.classList.remove('border-transparent', 'text-gray-500');
    }

    // 내용 렌더링
    if (content && timelineData[period]) {
        content.innerHTML = `
            <div class="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-8">
                ${timelineData[period].map(item => `
                    <div class="relative">
                        <div class="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-surface-dark"></div>
                        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <span class="text-primary font-bold text-sm">${item.date}</span>
                            <h4 class="text-gray-900 dark:text-white font-semibold mt-1">${item.activity}</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// 활동 상세 데이터
const activityData = [
    {
        title: "21기를 위한 선배들의 세미나",
        image: "assets/images/post0.png",
        content: `
            1학기 초에 이루어지는 세미나는 Na’PLACE에서 더 풍부하고 수준 높은 동아리 활동을 위한 첫걸음입니다!

            <br><br>
            <strong class="text-lg text-gray-900 dark:text-white">잠깐, 세미나 (Seminar) 란?</strong>
            <br>
            세미나는 특정 주제에 대해 참가자들이 자료를 준비하고 발표 및 토론을 통해 깊이 있게 공부하는 소규모 학습 모임입니다. 일방적으로 듣기만 하는 강의와 달리, 참가자 간의 상호작용과 토론이 중심이 되는 것이 특징입니다.

            <br><br>
            서로 지식을 쌓아나가는 뜻 깊은 시간이였답니다.

            <div class="mt-6 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 text-left">
                
                <p class="text-primary dark:text-orange-400 font-bold text-lg mb-2">
                    📘 딥러닝을 위한 수학 세미나, ‘딥위수 세미나’
                </p>
                <ul class="list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300 ml-1">
                    <li>미적분, 다변수 함수의 미분 개념 세미나</li>
                    <li>선형대수학 기초 세미나</li>
                    <li>확률과 통계 세미나</li>
                </ul>

                <p class="text-primary dark:text-orange-400 font-bold text-lg mb-2">
                    💻 알고리즘 세미나
                </p>
                <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-1">
                    <li>파이썬 자료 구조 세미나</li>
                    <li>그래프와 경로 탐색 알고리즘</li>
                </ul>

            </div>
        `
    },
    {
        title: "BOJ 알고리즘 문제 풀이 발표",
        image: "assets/images/post1.png",
        content: "BOJ 문제를 풀며 성취감을 느낀 경험, 이 접근법을 친구들과 공유하고 싶었던 경험이 있으신가요?\\n\\n21기는 이 활동에서 분할 정복 알고리즘, 누적합, 이분 탐색, Convex Hall 등 다양한 알고리즘을 설명하는 발표를 각자 진행했습니다.\\n\\n또한 이 알고리즘이 쓰인 BOJ 문제 풀이를 공유하는 시간을 가졌습니다."
    },
    {
        title: "딥러닝 세미나",
        image: "assets/images/post2.png",
        content: "딥러닝(Deep Learning)은 다층 인공신경망을 기반으로 한 기계학습 방법론이에요. 특징 설계를 사람이 직접 정의하지 않고, 오차 역전파와 최적화를 통해 복잡한 비선형 함수 근사는 수행함으로써 고차원 문제에서 탁월한 표현 학습 능력을 보이게 합니다.\\n\\n2학기 초에 진행된 딥러닝 세미나에서는 함께 머신러닝, 인공신경망, 퍼셉트론의 한계(XOR 문제)와 이를 극복하는 다층 퍼셉트론(MLP)까지의 이론적 흐름을 학습했습니다.\\n\\n또 Google Colab으로 PyTorch를 활용해 MLP를 직접 구현하는 실습도 진행했습니다."
    },
    {
            title: "자신만의 인공지능 모델",
            image: "assets/images/post3.png",
            content: `
                딥러닝 세미나에서 뉴럴 네트워크의 작동방식 + Python의 여러 라이브러리로 구현하는 방법을 배웠다면, 원하는 AI를 구현해볼 차례가 아닐까요?
                <br><br>
                21기 2명씩 3팀을 이루어 사회 문제를 해결할, 특정 직업에 도움이 되는, 또는 그냥 재미로 (!) AI 모델을 직접 학습하고 완성했습니다!

                <div class="mt-6 mb-6 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 text-left">
                    
                    <p class="text-primary dark:text-orange-400 font-bold text-lg mb-3">
                        21기가 만든 AI 모델
                    </p>
                    <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-1">
                        <li>AI Generated Image와 Real Image 분류 모델</li>
                        <li>축구 장면의 파울 여부를 판단하는 이미지 분류 모델</li>
                        <li>동물 분류 이미지 모델</li>
                    </ul>

                </div>
                마지막 모델은 친구들 이미지를 업로드해 가장 닮은 동물 찾아내는 용도로 변질됐다는건 안비밀..
            `
        },
    {
        title: "n8n 프로젝트",
        image: "assets/images/post4.png",
        content: "웹사이트, 앱을 만들기 위해 백엔드 작업을 하고 싶지만… 혹시 그 방법을 잘 모르시나요? 아니면 Java와 같은 언어 사용이 어려운가요?\\n\\n그러면 답은 n8n입니다! 텍스트 코딩을 배우기 전에 대부분 스크래치나 엔트리를 하죠?\\nn8n도 비슷한데요. 코드를 쓰지 않아도 화면에서 노드를 이어 붙여 워크플로우를 만들 수 있어서, 프로그래밍을 모르는 사람도 백엔드 개발을 할 수 있도록 해주는 툴이 n8n입니다.\\n\\n21기 위주로 n8n 사용법을 함께 공부하고, 간단한 프로젝트도 제작해보았습니다."
    },
    {
        title: "동아리 학술 발표회",
        image: "assets/images/activity_presentation.png",
        content: "이진수 태고, 몬티홀 게임(도박), 수학 등식 리듬 게임과 같이 여러 수학적 이론들을 전산학과 융합 하여 게임을 제작하였습니다."
    }
];
