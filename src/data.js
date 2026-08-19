export const profile = {
  name: '贾新鑫',
  nickname: '☆→葬爱の小鑫←☆',
  identity: ['AI视觉创作者', '新媒体运营', '文旅内容策划'],
  statement: '穿越2008的互联网浪漫，加载2026年的未来幻想。',
  positioning: '探索文化内容与AI视觉表达的数字创作者',
  level: 'Lv.24 创意探索者',
  status: '正在创造中...',
}

export const assets = {
  profileAvatar: '/media/profile/xin-avatar.jpg',
  xinExeProfile: '/media/profile/xin-exe-companion-transparent.png',
  xinExeCharacter: '/media/profile/xin-exe-companion-transparent.png',
}

export const profileEducation = [
  { period: '2025.09—至今', school: '北京体育大学', program: '体育人文社会学 · 硕士' },
  { period: '2026.03—2026.07', school: '中国传媒大学', program: '短视频与数字文化传播微专业' },
  { period: '2021.09—2025.06', school: '山西大学', program: '旅游管理 · 本科' },
]

export const profileExperiences = [
  { period: '2026.06—2026.08', icon: '🌍', title: '中国国家地理文创 · 新媒体运营实习', keywords: '直播运营 / 小红书运营 / 文创内容传播', detail: '参与直播间内容准备、商品笔记策划与文创产品传播，持续测试AI辅助内容生产。' },
  { period: '2025.04—2026.06', icon: '🏮', title: '山西知行融创旅游有限公司 · 文化内容策划', keywords: '旅游资源调研 / 内容整理 / 数字化转化', detail: '围绕文化资源、游客体验与文旅项目整理资料，推动内容从现场采集进入数字表达。' },
  { period: '2021—2025', icon: '⛰', title: '山西省文化和旅游厅 · 游客调研项目', keywords: '用户研究 / 数据收集 / 文旅项目支持', detail: '参与游客调研、数据整理和项目支持，建立从用户观察到文旅内容方案的工作方法。' },
  { period: '2026.07—2026.08', icon: '🎬', title: '校招宣传片导演组 · 现场创作', keywords: '兆易创新 / 大信会计事务所 / 宣传片拍摄', detail: '参与提词器、现场流程和导演组协作，理解一支片子如何从脚本落到镜头和节奏。' },
  { period: '2023.09—2024.10', icon: '🤖', title: 'AI文化创新项目 · 国家级银奖', keywords: '传统文化数据库 / AI设计 / 项目管理', detail: '中国国际大学生创新大赛国家级银奖项目，探索文化资源数字化、生成式视觉与产品转化。' },
]

export const profileSkills = [
  { name: 'AI视觉生成', score: 4, code: 'AI.VISUAL' },
  { name: 'AIGC视频创作', score: 3.5, code: 'AIGC.MOTION' },
  { name: '新媒体运营', score: 4, code: 'MEDIA.OPERATE' },
  { name: '直播表达', score: 4.5, code: 'LIVE.SIGNAL' },
  { name: '内容策划', score: 4.5, code: 'CONTENT.PLAN' },
  { name: '文化研究', score: 4.5, code: 'CULTURE.RESEARCH' },
]

export const profileTools = [
  { label: 'AI工具', items: ['ChatGPT', '即梦', '可灵', 'Midjourney', 'Nanobanana'] },
  { label: '设计工具', items: ['Photoshop', '可画'] },
  { label: '视频工具', items: ['剪映', 'AE'] },
]

export const navItems = [
  { id: 'home', label: '主页', emoji: '🏠' },
  { id: 'profile', label: '个人档', emoji: '⭐' },
  { id: 'diary', label: '日志', emoji: '📖' },
  { id: 'moments', label: '说说', emoji: '💬' },
  { id: 'albums', label: '相册', emoji: '📷' },
  { id: 'guestbook', label: '留言板', emoji: '💌' },
  { id: 'music', label: '音乐', emoji: '🎵' },
  { id: 'game', label: '小游戏', emoji: '🎮', action: 'game' },
]

export const stats = [
  ['3344521', '访问量'],
  ['188', '今日访客'],
  ['999+', '点赞'],
  ['99', '相册'],
]

export { statusData, statusData as moments } from './statusData'

export const diaries = [
  {
    id: 'log-01',
    number: 'LOG 01',
    icon: '🏛',
    title: '2000份问卷背后的旅行故事',
    type: '文旅用户研究项目',
    organization: '',
    period: '2021.09 - 2025.06',
    lead: '在成为一个内容创作者之前，我想先了解“人为什么出发”。',
    paragraphs: [
      '本科期间，我参与山西文旅相关游客调研项目，长期参与游客问卷调查、数据收集与用户分析工作。',
      '从城市景区到旅游目的地，从游客反馈到行为记录，我通过大量一线调研，尝试理解游客对于旅行体验、文化内容以及目的地选择背后的真实需求。',
      '累计完成2000余份游客问卷收集与整理。',
      '这段经历让我第一次意识到：',
      '好的内容并不是从创作者的想象开始，而是从对用户的理解开始。',
      '旅行不是简单的移动，而是人与地方之间产生连接的过程。',
    ],
    media: [{ type: 'image', src: '/media/diary/log-01-research.jpg', alt: '游客问卷调研现场' }],
    skills: ['用户研究', '数据整理', '需求分析', '文旅观察'],
  },
  {
    id: 'log-02',
    number: 'LOG 02',
    icon: '🏔',
    title: '打开山西隐藏地图',
    type: '文旅资源调研与数字化整理',
    organization: '山西知行融创旅游有限公司',
    period: '2025.04 - 2026.06',
    lead: '有些文化故事，藏在地图没有标注的地方。',
    paragraphs: [
      '保研后的实践阶段，我加入山西知行融创旅游有限公司，参与文旅项目内容收集、旅游资源整理以及项目材料制作。',
      '期间参与山西省旅游资源普查工作，深入沁县、文水、岚县等地区开展实地外业调查，完成多个村落旅游资源点的信息采集与线上资料整理。',
      '从田野调查到资料数字化整理，我逐渐理解：',
      '文旅内容的第一步，不是传播，而是发现。',
      '只有真正了解一片土地，才能讲好它的故事。',
    ],
    media: [{ type: 'image', src: '/media/diary/log-02-shanxi-resource.jpg', alt: '山西旅游资源普查现场' }],
    skills: ['文旅项目实践', '文化资源整理', '内容策划支持', '数字化转化'],
  },
  {
    id: 'log-03',
    number: 'LOG 03',
    icon: '🤖',
    title: '如果AI遇见山西，会生成什么？',
    type: 'AIGC文化创新项目',
    organization: '',
    period: '2023.09 - 2024.10',
    lead: '当传统文化遇见人工智能，会产生怎样的新表达？',
    paragraphs: [
      '在AI文化创新项目中，我开始尝试探索人工智能与地方文化内容结合的可能。',
      '项目围绕山西文化资源展开，通过AIGC技术辅助内容创作，将传统文化元素与数字视觉表达结合，探索文化内容在新时代传播中的更多可能。',
      '从创意构思、内容设计，到AI工具应用与成果呈现，我逐渐认识到：',
      'AI并不是创作者的替代品，而是一种帮助我们拓展想象边界的新工具。',
      '该项目获得：',
    ],
    achievement: '🏆 中国国际大学生创新大赛国家级银奖',
    media: [{ type: 'video', src: '/media/diary/log-03-ai-culture-mobile.mp4', alt: 'AI文化创新项目视频' }],
    skills: ['AIGC创作', '文化创新', '项目策划', 'AI工具应用'],
  },
  {
    id: 'log-04',
    number: 'LOG 04',
    icon: '🌍',
    title: '我被国家地理“捕获”的夏天',
    type: '中国国家地理新媒体运营实习',
    organization: '',
    period: '2026.06 - 2026.08',
    lead: '第一次站在内容生产的一线，我开始思考一个文化IP如何被年轻人看见。',
    paragraphs: [
      '在中国国家地理文创实习期间，我参与文创产品及线下展览相关内容运营工作。',
      '作为直播主播，我参与多场直播活动，负责产品讲解、直播流程执行以及用户互动；同时参与小红书账号运营，进行选题策划、素材整理、笔记优化等工作。',
      '在内容运营过程中，我尝试使用AI工具辅助图片优化与文案创作，提高内容生产效率。',
      '这段经历让我了解到：',
      '一个好的文化内容，不仅需要价值，也需要找到与用户沟通的方式。',
    ],
    media: [
      { type: 'image', src: '/media/diary/log-04-xiaohongshu.jpg', alt: '中国国家地理小红书内容截图' },
      { type: 'image', src: '/media/diary/log-04-live.jpg', alt: '中国国家地理直播现场截图' },
    ],
    skills: ['新媒体运营', '直播表达', '内容策划', 'AI辅助创作'],
  },
  {
    id: 'log-05',
    number: 'LOG 05',
    icon: '🎬',
    title: '我把一个故事交给了AI',
    type: 'AIGC创意短片《戒不掉》',
    organization: '中国传媒大学短视频与数字文化传播微专业项目',
    period: '2026.05',
    lead: '如果时间可以重来一次，你最想回到哪一天？',
    paragraphs: [
      '在学习短视频与数字文化传播期间，我与团队共同完成 AIGC 创意短片《戒不掉》的策划与制作。',
      '作品以当代青年面临的职场压力、生活内耗以及亲情疏离为背景，尝试用“时间循环+亲情救赎”的故事设定，将现实情感与科幻元素结合。',
      '在项目过程中，我参与从创意构思、内容策划，到AIGC技术应用和视频制作的完整流程探索。',
      '我们利用AIGC工具辅助完成视觉场景构建、氛围设计与创意表达，让人工智能成为影像创作中的新型工具。',
      '《戒不掉》希望通过一个带有奇幻色彩的故事，传递一个简单的主题：',
      '不要等到时间重来，才发现那些重要的人一直在身边。',
      '这次创作让我进一步认识到：',
      '技术可以创造新的表达方式，但真正打动人的，永远是故事背后的情感。',
    ],
    media: [{ type: 'video', src: '/media/diary/log-05-quit-loop-mobile.mp4', alt: 'AIGC创意短片《戒不掉》' }],
    skills: ['AIGC视频创作', '短视频策划', '剧情内容设计', '团队协作', 'AI视觉表达'],
  },
  {
    id: 'log-06',
    number: 'LOG 06',
    icon: '🎬',
    title: '这次，我站在镜头后面',
    type: '企业宣传片导演组实践',
    organization: '兆易创新 / 大信会计事务所校招宣传片',
    period: '2026.07 - 2026.08',
    lead: '从观看别人创造，到参与创造一个故事。',
    paragraphs: [
      '参与企业校招宣传片拍摄项目，以导演组成员身份参与前期沟通、拍摄执行以及现场协作。',
      '第一次进入商业影像制作现场，我开始理解一个完整视频项目背后的流程：',
      '从创意策划，到现场执行，再到最终呈现，每一个环节都需要团队协作。',
      '这段经历让我认识到：',
      '影像不仅是记录，也是连接品牌与受众的重要方式。',
    ],
    media: [{ type: 'image', src: '/media/diary/log-06-director-set.jpg', alt: '企业宣传片导演组拍摄现场' }],
    skills: ['视频制作流程', '导演组协作', '项目执行', '影像表达'],
  },
]

export { albumData as albums } from './albumData'

export const guestMessages = [
  { name: 'AI设计观察员', time: '刚刚', text: '这个空间很有意思，像在旧互联网里打开了一扇通往未来的窗口。' },
  { name: '互联网HR', time: '5分钟前', text: '能看到设计、运营和文化研究之间的连接，不只是作品堆叠。' },
  { name: '文化探索者', time: '今天 15:20', text: '传统文化和AI结合很酷，期待看到更多现场采集与生成实验。' },
]
