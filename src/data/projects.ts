import type { DesignProject, ResearchProject, Project } from "@/types/project";

export const designProjects: DesignProject[] = [
  {
    slug: "nccu-polsci-70th",
    title: "政大政治系 70 週年系慶 LOGO 設計",
    titleEn: "NCCU Political Science 70th Anniversary Logo",
    subtitle: "系所視覺識別設計",
    category: "design",
    tags: ["Logo Design", "Visual Identity", "Academic"],
    date: "2024",
    thumbnail: "/images/design/nccu-70th/01.png",
    featured: true,
    images: [
      "/images/design/nccu-70th/01.png",
      "/images/design/nccu-70th/02.png",
      "/images/design/nccu-70th/03.png",
      "/images/design/nccu-70th/04.png",
    ],
    description:
      "為國立政治大學政治學系創系 70 週年設計的系慶標誌，融合學術傳統與現代視覺語彙，呈現政治學系的歷史底蘊與前瞻精神。",
    client: "國立政治大學政治學系",
    role: "Visual Identity Designer",
  },
  {
    slug: "aes-2025",
    title: "2025 AES 亞洲選舉研究國際研討會視覺設計",
    titleEn: "2025 AES International Conference Visual Design",
    subtitle: "國際學術研討會視覺統籌",
    category: "design",
    tags: ["Conference Design", "Visual System", "Academic"],
    date: "2025",
    thumbnail: "/images/design/aes-2025/01.png",
    featured: true,
    images: [
      "/images/design/aes-2025/01.png",
      "/images/design/aes-2025/02.jpg",
      "/images/design/aes-2025/03.jpg",
      "/images/design/aes-2025/04.jpg",
      "/images/design/aes-2025/05.jpg",
      "/images/design/aes-2025/06.jpg",
      "/images/design/aes-2025/07.jpg",
      "/images/design/aes-2025/08.jpg",
    ],
    description:
      "為 2025 年亞洲選舉研究（AES）國際研討會打造整體視覺識別系統，涵蓋主視覺、議程手冊、會場指標與數位素材。",
    client: "亞洲選舉研究學會",
    role: "Lead Visual Designer",
  },
  {
    slug: "teds-2024",
    title: "2024 TEDS 國際學術研討會視覺設計",
    titleEn: "2024 TEDS International Conference Visual Design",
    subtitle: "學術研討會視覺規劃",
    category: "design",
    tags: ["Conference Design", "Print", "Academic"],
    date: "2024",
    thumbnail: "/images/design/teds-2024/01.png",
    featured: false,
    images: [
      "/images/design/teds-2024/01.png",
      "/images/design/teds-2024/02.png",
      "/images/design/teds-2024/03.png",
      "/images/design/teds-2024/04.jpg",
      "/images/design/teds-2024/05.jpg",
      "/images/design/teds-2024/06.jpg",
      "/images/design/teds-2024/07.jpg",
    ],
    description:
      "2024 年台灣選舉與民主化調查（TEDS）國際學術研討會視覺規劃，整合研究主題意象與國際學術會議的專業形象。",
    client: "TEDS 研究團隊",
    role: "Visual Designer",
  },
];

export const researchProjects: ResearchProject[] = [
  {
    slug: "power-conflict-survival",
    title: "國力、衝突與政治生存：國際爭端何時對執政者有利？",
    titleEn:
      "Power, Conflict, and Political Survival: When Do International Disputes Benefit Leaders?",
    subtitle: "社會科學統計方法期末報告",
    category: "research",
    tags: ["International Relations", "Diversionary Theory", "Rally Effect"],
    date: "2024",
    thumbnail: "", // TODO: Add real image
    featured: true,
    abstract:
      "本研究以轉移焦點理論與聚旗效應為理論基礎，重新檢視國際衝突對民主國家執政黨連任與否的影響，並進一步引入「國力」作為調節變數。透過橫斷面年度資料的邏輯斯迴歸模型分析全球總統/半總統制民主國家（1875–2020），實證結果顯示國際衝突強度與國力單獨來看皆與連任機率呈正向關係，但交互項效果有待進一步驗證。",
    venue: "社會科學統計方法課程報告",
    institution: "國立政治大學政治學系",
    coAuthors: ["莊旻叡"],
    slidesUrl: "/images/academic/power-conflict/slides.pdf",
    pdfUrl: "/images/academic/power-conflict/report.pdf",
    methodology: ["Binary Logistic Regression", "Interaction Effects", "Cross-national Comparison"],
    keyFindings: [
      "國際衝突強度與國力單獨來看皆與執政黨連任機率呈顯著正向關係",
      "引入「國力」作為調節變數，探索其如何影響轉移焦點政策的效果",
      "分析對象涵蓋全球總統/半總統制民主國家（V-Dem Electoral Democracy Index > 0.5）",
    ],
  },
  {
    slug: "housing-survey-bias",
    title: "住戶的門神、訪員的惡夢：住宅型態與接觸偏誤對民調投票高估的結構性影響",
    titleEn:
      "How Housing Types Lead to Selection Bias in Face-to-Face Surveys",
    subtitle: "2025臺灣政治學年會｜國立政治大學｜陳逸龍、莊旻叡",
    category: "research",
    tags: ["Survey Methodology", "Selection Bias", "Election Studies"],
    date: "2025",
    thumbnail: "", // TODO: Add real image
    featured: true,
    abstract:
      "調查實務上，越來越多社區大樓成為訪員訪問困難的主要因素。本研究探討住宅型態（公寓大廈門禁系統）如何系統性地導致接觸偏誤，透過個體層次確認選樣偏誤與投票行為的內生性關係，再以村里層次驗證大樓比例對民調投票率誤差的結構性影響。使用 TEDS2024 與政府開放資料平台各村里人口統計資料進行分析。",
    venue: "2025臺灣政治學年會",
    venueEn: "2025 Annual Conference of the Taiwanese Political Science Association",
    institution: "國立政治大學",
    coAuthors: ["陳逸龍", "莊旻叡"],
    slidesUrl: "/images/academic/housing-bias/slides.pdf",
    methodology: [
      "Heckman Selection Model",
      "Agent-Based Model",
      "Village-level Regression",
    ],
    keyFindings: [
      "電梯大樓＋有警衛的受訪者被低度代表，訪問成功率顯著較低",
      "大樓受訪者投票的可能性較高，導致民調系統性高估投票率",
      "村里大樓比例越高，民調投票率誤差越大",
    ],
  },
  {
    slug: "villain-democracy",
    title: "Villain of Democracy? Pro-China and Democracy Support",
    subtitle: "2025 中研院國際政治學前沿議題小型研討會",
    category: "research",
    tags: ["Democracy", "Cross-Strait Relations", "Public Opinion"],
    date: "2025",
    thumbnail: "", // TODO: Add real image
    featured: false,
    abstract:
      "How Selective Exposure to Pro-China Media Mediates the Link between China Attitudes and Democracy Support. This study examines whether pro-China attitudes are associated with lower support for democracy in Taiwan, using China Threat Election and Democratization Study (TEDS) 2024 panel data. Drawing on Cultivation Theory, Selective Exposure Theory, and Hypothesizing Theory, it explores how pro-China media consumption mediates the relationship between China attitudes and democratic support.",
    venue: "2025 中研院國際政治學前沿議題小型研討會",
    venueEn: "2025 Academia Sinica Frontiers in Political Science Seminar",
    institution: "中央研究院政治學研究所",
    coAuthors: ["Min-Jui Chuang"],
    posterUrl: "/images/academic/villain-democracy/poster.png",
    methodology: ["Logistic Regression", "Causal Mediation Analysis", "Survey Analysis"],
    keyFindings: [
      "Individuals with a more favorable view of China are significantly more likely to choose pro-China media",
      "Exposure to such media further weakens support for democracy",
      "The indirect effect of pro-China attitudes through media exposure is significant",
    ],
  },
  {
    slug: "jsqps-housing-bias",
    title: "How Housing Types Lead to Selection Bias in FTF Survey?",
    titleEn: "Structural Barriers and Nonresponse Bias: How Housing Type Effects on Voter Turnout Estimation in Face-to-Face Surveys",
    subtitle: "2026 JSQPS Winter Meeting, Waseda University",
    category: "research",
    tags: ["Survey Methodology", "Selection Bias", "Comparative"],
    date: "2026",
    thumbnail: "", // TODO: Add real image
    featured: true,
    abstract:
      "Face-to-face surveys, though the gold standard, face a crisis as urbanization and gated communities boost access barriers. This study focuses on voter turnout, a variable with a verifiable 'true value', to measure the impact. Using village-level regression on TEDS and Central Election Commission data, it tests if high-rise residents have lower turnout rates and whether the representation gap introduces systematic bias. The Heckman Selection Model reveals that selection bias in non-high-rise samples is more pronounced.",
    venue: "2026 JSQPS 日本計量数理政治学会 Winter Meeting",
    venueEn: "2026 JSQPS Winter Meeting",
    institution: "早稲田大学",
    coAuthors: ["Yi-Long Chen", "Min-Jui Chuang"],
    posterUrl: "/images/academic/jsqps-2026/poster.png",
    methodology: [
      "Heckman Selection Model",
      "Village-level Regression",
      "Proportion Error Analysis",
    ],
    keyFindings: [
      "High-rise residents have lower survey contact rates due to security barriers",
      "The Topic Effect is more pronounced in the high-rise sample",
      "Result: Significant Topic Effect found mainly in high-rise samples",
    ],
  },
];

export const allProjects: Project[] = [...designProjects, ...researchProjects];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return allProjects.filter((p) => p.featured);
}
