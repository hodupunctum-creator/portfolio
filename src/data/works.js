// 작품 아카이브 데이터 (노션 '송다혜 포트폴리오' > Projects 에서 가져옴).
// 여기에 작품을 추가·수정하면 목록과 상세 페이지에 바로 반영됩니다.
// - id: 주소에 쓰이는 고유값 (/works/:id)
// - tag: 노션 제목 앞의 [ ] 분류
// - category: 'creative'(창작활동) 또는 'other'(기타 활동). 목록에서 이 순서대로 묶이고 번호도 카테고리마다 01부터 매겨집니다.
// - org: 소속 / period: 진행 기간 (노션에 적힌 경우만)
// - description: 상세 페이지 본문. 문단은 \n으로 나눕니다.
// - role, outcome: 역할·성과 목록
// - links: 참고 링크 [{ label, url }]
// - cover: 이미지 경로. public/works/ 폴더에 넣고 '/works/파일명.jpg' 형태로 적으세요.
//          비워두면 color 값으로 채운 표지가 표시됩니다.
// - coverRatio: (선택) 표지 비율. 기본은 16 / 9, 정사각형이면 '1 / 1'
// - images: 상세 페이지에 보여줄 추가 이미지 경로 목록
// - excerpt: (선택) 상세 페이지에 인용할 글 전문 { title, text: [줄 목록], credit }

export const works = [
  {
    id: 'winter-island-reading',
    title: '작은 공연이 열리는 겨울섬',
    tag: '낭독',
    category: 'creative',
    org: '',
    period: '2025.12',
    summary: "'작은 공연이 열리는 겨울섬' 낭독 참여",
    description: "'작은 공연이 열리는 겨울섬' 낭독 참여",
    role: ['낭독'],
    outcome: [],
    links: [],
    cover: '',
    color: '#3d3a40',
    images: []
  },
  {
    id: 'qyeon-1',
    title: '<큐연> 1호',
    tag: '잡지 공저',
    category: 'creative',
    org: '큐연',
    period: '2023.07',
    summary: '퀴어 문학을 담는 비정기 간행물 <큐연> 1호에 단편소설 <여름에게> 게재',
    description: '<큐연>은 퀴어 문학을 담는 비정기 간행물이다. 1호에는 2022년 1월부터 6월까지 큐연 커뮤니티에 참여한 구성원들의 시와 소설, 에세이 등 여러 장르의 글이 실렸다. 원고 필자와 큐연 멤버 9인의 인터뷰도 함께 묶였다.\n소설 <여름에게>를 게재했다.\n처음 큐연 커뮤니티에 참여할 때, 나에게 퀴어성이 있는가 고민했다. 당시에는 당사자가 아니라고 생각해서 조심스러웠다. 용기를 내어 참여했고, 소설을 쓰며 그 고민은 \'퀴어란 무엇일까\'라는 질문으로 이어졌다. 나름의 답은 찾지 못했지만, 넓은 방식의 퀴어성에 대해 쓰고 싶다는 마음을 찾았다. 큐연 커뮤니티는 다른 사람들이 생각하는 퀴어와 퀴어성을 알아갈 수 있는 자리였다.',
    role: ['단편소설 <여름에게> 집필'],
    outcome: [],
    links: [],
    cover: '/works/qyeon-1.jpg',
    color: '#b90020',
    images: []
  },
  {
    id: 'yeonhui-residency-2023',
    title: '2023 연희문학창작촌 입주 작가',
    tag: '입주 작가',
    category: 'creative',
    org: '연희문학창작촌',
    period: '2023.04 ~ 05',
    summary: '2023 연희문학창작촌 입주 작가 공모 선정',
    description: '2023 연희문학창작촌 입주 작가 공모 선정',
    role: ['입주 작가'],
    outcome: [],
    links: [],
    cover: '',
    color: '#3d3a40',
    images: []
  },
  {
    id: 'yeoreumnun-farewell-footprints',
    title: '<이별발자국> 소개글 및 커버 사진',
    tag: '여름눈',
    category: 'creative',
    org: '개인',
    period: '2022.12 ~ 2023.01',
    summary: '밴드 여름눈의 두 번째 싱글 <이별발자국> 앨범 커버 사진 촬영 및 곡 소개글 집필',
    description: '<이별발자국>은 밴드 여름눈이 2023년 1월 발매한 두 번째 싱글이다. 커버에 쓰인 사진을 촬영했고, 소개글을 작성했다.\n사진은 2019년에 찍은 아이슬란드 레이캬비크의 눈 내리는 아침이다.\n소개글은 노래 속 화자가 상대에게 쓴 편지라고 상상하며 적었다.',
    role: ['앨범 커버 사진 촬영', '곡 소개글 집필'],
    outcome: [],
    links: [],
    excerpt: {
      title: '곡 소개글 전문',
      text: [
        '나는 사랑이란 찰나의 교차점이라고 생각해.',
        '앞으로 나아가던 우리라는 평행선이 어느 순간 만나 교차한 지점이 사랑이었던 거야.',
        '흐르기만 하는 평행선 위에서 몸을 틀어 만나게 된 하나의 점. 찰나의 영원.',
        '영원이라는 말은 끝없이 늙어가는 내일이 된다.',
        '비가 내려. 부드러워진 바닥 위로 뭉크러지는 세계를 봐. 네가 두고 간 발자국.',
        '시간 위에 고정된 얼룩처럼 영원히 닦이지 않는 마음.',
        '흐를수록 얼룩은 완벽해져가고 점점 늙어가는 시간 속에서',
        '항상 앞으로만 걷는 우리는 영원히 출발하고 있는 상태.',
        '가끔씩 눈으로 얼룩을 더듬으며 오른발과 왼발은 절대 서로 닿을 수 없다는 것을 깨닫지. 발자국 위로 겹쳐지는 너와의 추억은 하나의 이름처럼 느껴지고,',
        '우리는 만났던 날보다 더 많은 날을 살아갈 거야.',
        '너와 나의 겹쳐졌던 영원을 기억하며,',
        '계속되는 출발 위에서 슬픔은 있어도 절망은 없어.'
      ],
      credit: ''
    },
    cover: '/works/yeoreumnun-farewell-footprints.jpg',
    coverRatio: '1170 / 1806',
    color: '#2b2730',
    images: []
  },
  {
    id: 'yeoreumnun-south-wind-cover',
    title: '<남쪽 바람이 불면> 커버 사진',
    tag: '여름눈',
    category: 'creative',
    org: '개인',
    period: '2022.10.17',
    summary: '밴드 여름눈 <남쪽 바람이 불면> 커버 사진 촬영',
    description: '밴드 여름눈 <남쪽 바람이 불면> 커버 사진 촬영',
    role: ['커버 사진 촬영'],
    outcome: [],
    links: [],
    cover: '',
    color: '#a3362f',
    images: []
  },
  {
    id: 'moni-photo-exhibition',
    title: '네 이름은 모니?',
    tag: '개인 사진전',
    category: 'creative',
    org: '개인',
    period: '2022.09.09 ~ 2022.10.31',
    summary: '카페 [푸르토아]에서, 친구가 임시보호 중인 강아지, 모니의 입양홍보를 위한 사진전을 개최함',
    description: '카페 [푸르토아]에서, 친구가 임시보호 중인 강아지, 모니의 입양홍보를 위한 사진전을 개최함',
    role: ['사진 기획 및 배치'],
    outcome: ['약 1달간 전시를 개최함'],
    links: [],
    cover: '',
    color: '#5c1420',
    images: []
  },
  {
    id: 'gwanak-youth-hospitality',
    title: '환대의 감각',
    tag: '관악청년교류단',
    category: 'creative',
    org: '관악문화재단',
    period: '2021.8.26 ~ 2021.8.30',
    summary: '[관악청년교류단]에 참여하며, 느꼈던 지역 문화에 대한 이해를 개인적 에세이로 풀어냄',
    description: '[관악청년교류단]에 참여하며, 느꼈던 지역 문화에 대한 이해를 개인적 에세이로 풀어냄',
    role: ['관악청년교류단의 일원으로 참여하였으며, 후기를 기획하고 적음'],
    outcome: ['관악문화재단 블로그에 총 3개의 게시글을 게시함'],
    links: [{ label: '블로그 게시글 1', url: 'https://m.blog.naver.com/gwanakcf/222484332304' }, { label: '블로그 게시글 2', url: 'https://m.blog.naver.com/gwanakcf/222485530290' }, { label: '블로그 게시글 3', url: 'https://m.blog.naver.com/gwanakcf/222488709403' }],
    cover: '',
    color: '#b90020',
    images: []
  },
  {
    id: '500photographs',
    title: '500photographs’ 프로젝트',
    tag: '사진전',
    category: 'creative',
    org: '291 포토그랩스',
    period: '2021.06 ~ 진행중',
    summary: '291포토그랩스 500photographs’ 프로젝트에 사진 작가로 참여 중',
    description: '291포토그랩스 500photographs’ 프로젝트에 사진 작가로 참여 중',
    role: ['참여 작가'],
    outcome: [],
    links: [],
    cover: '',
    color: '#a3362f',
    images: []
  },
  {
    id: 'endless-crumbs',
    title: '두고 온 것들의 끝없는 부스러기',
    tag: '개인 작업',
    category: 'creative',
    org: '개인',
    period: '2021.01 ~ 2021.12',
    summary: '여행 일기와 사진을 엮어 개인 소장용 포토 에세이를 제작함',
    description: '여행 일기와 사진을 엮어 개인 소장용 포토 에세이를 제작함',
    role: ['구성 및 기획, 편집 제작 등 작업 일체를 담당함'],
    outcome: [],
    links: [],
    cover: '',
    color: '#8a1a2b',
    images: []
  },
  {
    id: 'gwanak-planner-diary',
    title: '초보문화기획자의 근무일지 : 도와줘요! 기획요정',
    tag: '업무',
    category: 'creative',
    org: '관악문화재단',
    period: '2020.06 ~ 2020.12',
    summary: '초보 문화 기획자가 쓰는 에세이 형식의 근무일지. 초보 문화 기획자의 시선으로 <N개의 서울> 사업을 기록함',
    description: '초보 문화 기획자가 쓰는 에세이 형식의 근무일지. 초보 문화 기획자의 시선으로 <N개의 서울> 사업을 기록함',
    role: ['사업 결과자료집 기획 및 원고를 작성', '매주 화요일, 목요일마다 재단 블로그에 업로드함'],
    outcome: [],
    links: [{ label: '블로그 게시글 1', url: 'https://m.blog.naver.com/gwanakcf/222166618608' }, { label: '블로그 게시글 2', url: 'https://m.blog.naver.com/gwanakcf/222175302096' }],
    cover: '',
    color: '#a3362f',
    images: []
  },
  {
    id: 'female-detective-anthology',
    title: '여자-형사와 그 변주들',
    tag: '문집',
    category: 'creative',
    org: '개인',
    period: '2020.4 ~ 2020.12',
    summary: '페미니즘 장르영화 비평 <여자-형사와 그 변주들> 강의에 참여한 수강생의 비평을 엮은 비평집',
    description: '페미니즘 장르영화 비평 <여자-형사와 그 변주들> 강의에 참여한 수강생의 비평을 엮은 비평집',
    role: ['총 7명이 함께 진행함 (기획자 1명, 참여자 5명, 기획, 편집 및 참여자 1명)', '강의 수강생인 참여자로 참여'],
    outcome: ['A4 3장 분량의 영화 비평 1편을 게시함'],
    links: [],
    cover: '',
    color: '#2b2730',
    images: []
  },
  {
    id: 'the-meolli-ghost',
    title: '춤추는 미술관의 유령',
    tag: '독립잡지 더멀리',
    category: 'creative',
    org: '더멀리',
    period: '2017.02',
    summary: '독립잡지 <더 멀리> 12호에 엽편 소설을 투고하여 게재됨',
    description: '독립잡지 <더 멀리> 12호에 엽편 소설을 투고하여 게재됨',
    role: ['원고 작성'],
    outcome: [],
    links: [],
    cover: '',
    color: '#5c1420',
    images: []
  },
  {
    id: 'digital-education-whitepaper-2023',
    title: '2023디지털교육백서',
    tag: '업무',
    category: 'other',
    org: '내일날씨',
    period: '',
    summary: '2023 디지털교육백서 국문, 영문 제작',
    description: '2023 디지털교육백서 국문, 영문 제작',
    role: ['프로젝트 PM, 편집, 교정교열'],
    outcome: [],
    links: [],
    cover: '',
    color: '#b90020',
    images: []
  },
  {
    id: 'ku-sejong-newsletter',
    title: 'KU세종 48호, 49호, 2024 영문 소식지',
    tag: '업무',
    category: 'other',
    org: '내일날씨',
    period: '',
    summary: 'KU세종 48호, 49호, 2024 영문 소식지 제작',
    description: 'KU세종 48호, 49호, 2024 영문 소식지 제작',
    role: ['프로젝트 PM, 편집, 교정교열'],
    outcome: [],
    links: [],
    cover: '',
    color: '#2b2730',
    images: []
  },
  {
    id: 'chungho-people',
    title: '청호피플 338호, 339호',
    tag: '업무',
    category: 'other',
    org: '내일날씨',
    period: '',
    summary: '청호피플 338호, 339호 제작',
    description: '청호피플 338호, 339호 제작',
    role: ['취재, 원고 작성, 데이터 정리'],
    outcome: [],
    links: [],
    cover: '',
    color: '#5c1420',
    images: []
  },
  {
    id: 'agri-tech-guide',
    title: '농업기술길잡이 12종',
    tag: '업무',
    category: 'other',
    org: '내일날씨',
    period: '',
    summary: '농업기술길잡이 12종 교정교열',
    description: '농업기술길잡이 12종 교정교열',
    role: ['교정교열, 디자인 검수'],
    outcome: [],
    links: [],
    cover: '',
    color: '#8a1a2b',
    images: []
  },
  {
    id: 'podcast-what-do-you-do',
    title: '<뭐하고 사세요? 35회차>',
    tag: '팟캐스트',
    category: 'other',
    org: '개인',
    period: '2022.07.01',
    summary: '[좀좀따리리좀]의 팟캐스트 <뭐하고 사세요?> 시리즈에 게스트로 참여함',
    description: '[좀좀따리리좀]의 팟캐스트 <뭐하고 사세요?> 시리즈에 게스트로 참여함',
    role: ['‘뭐 하고 사세요?’, ‘뭘 쓰며 사세요?’, ‘뭐 하고 살고 싶으세요?’라는 세 가지 주제로 이야기를 나눔'],
    outcome: ['약 한 시간 십 분 동안의 이야기를 나눔'],
    links: [],
    cover: '',
    color: '#3d3a40',
    images: []
  },
  {
    id: 'buyeo-art-fair-staff',
    title: '부여 아트페어 현장 운영 스태프',
    tag: '현장 운영',
    category: 'other',
    org: '부여 아트페어',
    period: '2021.09.03 ~ 09.12',
    summary: '부여 아트페어 현장 운영 스태프',
    description: '부여 아트페어 현장 운영 스태프',
    role: ['현장 운영 스태프'],
    outcome: [],
    links: [],
    cover: '',
    color: '#5c1420',
    images: []
  },
  {
    id: 'project-112',
    title: '112 프로젝트',
    tag: '당신을 위한 책 추천',
    category: 'other',
    org: '두잇커뮤니티',
    period: '2021.01 ~ 2021.12',
    summary: '각 달마다 중요한 날을 꼽아 그에 맞는 책을 읽고, 10~11개의 질문을 생성함. 질문을 통해 토론을 진행함',
    description: '각 달마다 중요한 날을 꼽아 그에 맞는 책을 읽고, 10~11개의 질문을 생성함. 질문을 통해 토론을 진행함\n가이드북 속의 질문을 바탕으로 독서모임에 참가하고 싶지만 수줍은 사람, 책을 어떻게 읽어야 하는지 어려운 사람, 코로나 시대에 대면 독서모임에 참여하기 어려운 사람 등을 위해 독서 길잡이 가이드북을 만들었음',
    role: ['구성 및 기획, 회계, 원고작성, 서기를 담당함'],
    outcome: [],
    links: [],
    cover: '',
    color: '#8a1a2b',
    images: []
  },
  {
    id: 'kookmin-publishing-intern',
    title: '국민출판사 인턴',
    tag: '인턴',
    category: 'other',
    org: '국민출판사',
    period: '2015.12 ~ 2016.01',
    summary: '국민출판사 인턴 활동',
    description: '국민출판사 인턴 활동',
    role: ['인턴'],
    outcome: [],
    links: [],
    cover: '',
    color: '#2b2730',
    images: []
  }
];

// 카테고리 정의. 순서대로 목록에 표시됩니다.
export const categories = [
  { id: 'creative', label: '창작활동' },
  { id: 'other', label: '기타 활동' }
];

// 카테고리 순서로 정렬한 작품 목록 (각 작품에 카테고리 안에서의 번호 number를 붙임)
export const orderedWorks = categories.flatMap(category =>
  works
    .filter(work => work.category === category.id)
    .map((work, i, list) => ({ ...work, number: i + 1, categoryLabel: category.label, categoryTotal: list.length }))
);
