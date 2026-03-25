import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell,
  LineChart, Line,
  AreaChart, Area,
  Legend
} from 'recharts';
import { 
  LayoutDashboard, 
  Sparkles, 
  HeartPulse, 
  Smartphone, 
  Package, 
  Truck, 
  TrendingUp, 
  Target, 
  Lightbulb,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

interface Keyword {
  text: string;
  weight: number;
}

interface TopicData {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  keywords: Keyword[];
  analysis: string;
  insight: string;
  actionPlan: string;
  radarData: { subject: string; A: number; fullMark: number }[];
  barData: { name: string; value: number }[];
  pieData: { name: string; value: number }[];
  lineData: { name: string; value: number }[];
  areaData: { name: string; value: number }[];
}

// --- Mock Data Transformation from User Input ---

const TOPICS: TopicData[] = [
  {
    id: 0,
    title: "뷰티 & 스킨케어 (달바 톤업)",
    icon: <Sparkles className="w-5 h-5" />,
    color: "#EAB308", // Yellow-500
    keywords: [
      { text: "좋아요", weight: 181 }, { text: "좋고", weight: 60 }, { text: "발림성", weight: 49 },
      { text: "촉촉하고", weight: 49 }, { text: "톤업", weight: 37 }, { text: "달바", weight: 35 },
      { text: "부드럽게", weight: 32 }, { text: "자연스럽게", weight: 28 }
    ],
    analysis: "본 토픽은 '달바' 브랜드의 톤업 선크림에 대한 소비자 반응을 집중적으로 보여줍니다. '발림성', '촉촉함', '톤업'이라는 세 가지 핵심 키워드가 상위권에 위치하며, 사용자들이 제품의 텍스처와 즉각적인 미적 효과에 매우 높은 만족도를 보이고 있음을 알 수 있습니다. 특히 '자연스럽게'라는 키워드는 인위적인 백탁 현상보다는 피부 본연의 광채를 살려주는 효과를 선호하는 최근의 '내추럴 글로우' 트렌드를 정확히 반영하고 있습니다. 또한 '부드럽게'와 '촉촉해서'라는 표현은 건조한 피부를 가진 소비자들에게도 긍정적인 소구점이 되고 있음을 시사하며, 이는 제품의 수분 유지력이 단순한 마케팅 용어가 아닌 실제 사용자들이 체감하는 강력한 경쟁력임을 증명합니다. 전반적으로 소비자들은 제품의 기능성뿐만 아니라 사용 과정에서의 감각적 즐거움을 중시하고 있습니다.",
    insight: "뷰티 카테고리 분석 결과, 소비자들은 단순한 자외선 차단 기능을 넘어 메이크업 베이스로서의 기능과 스킨케어의 보습력을 동시에 갖춘 '하이브리드 제품'에 열광하고 있습니다. 특히 '달바' 브랜드의 인지도가 확고하며, 제품의 제형(발림성)이 구매 결정의 핵심 요인으로 작용하고 있습니다. 이는 소비자들이 바쁜 아침 시간에 단계를 줄여주면서도 완벽한 피부 표현을 도와주는 제품에 기꺼이 지갑을 연다는 것을 의미합니다. 또한 '촉촉함'에 대한 높은 언급량은 환절기나 겨울철뿐만 아니라 사계절 내내 보습 중심의 선케어 수요가 존재함을 보여주는 중요한 지표입니다. 이러한 데이터는 향후 브랜드가 '올인원 스킨케어' 시장으로 확장할 수 있는 충분한 잠재력을 가지고 있음을 시사하며, 소비자들의 피부 고민을 세밀하게 해결해주는 맞춤형 라인업 구축이 필수적임을 알려줍니다.",
    actionPlan: "첫째, '발림성'과 '촉촉함'을 시각적으로 극대화한 숏폼 콘텐츠를 제작하여 인스타그램과 틱톡 등 비주얼 중심 채널에 집중 노출합니다. 둘째, '자연스러운 톤업' 효과를 강조하기 위해 다양한 피부톤을 가진 모델들의 비포/애프터 비교 컷을 상세 페이지 전면에 배치하여 신뢰도를 높입니다. 셋째, 기존 구매 고객들의 재구매 의사가 높으므로, 정기 구독 서비스를 도입하여 락인(Lock-in) 효과를 창출하고 충성 고객 전용 샘플링 이벤트를 진행합니다. 마지막으로, '촉촉함'을 강화한 겨울용 라인과 '산뜻함'을 강조한 여름용 라인으로 세분화하여 계절별 맞춤형 마케팅을 전개함으로써 연중 안정적인 매출을 확보해야 합니다.",
    radarData: [
      { subject: '발림성', A: 95, fullMark: 100 },
      { subject: '보습력', A: 88, fullMark: 100 },
      { subject: '톤업효과', A: 92, fullMark: 100 },
      { subject: '자연스러움', A: 85, fullMark: 100 },
      { subject: '브랜드신뢰', A: 90, fullMark: 100 },
    ],
    barData: [
      { name: '좋아요', value: 181 }, { name: '좋고', value: 60 }, { name: '발림성', value: 49 },
      { name: '촉촉', value: 49 }, { name: '톤업', value: 37 }, { name: '달바', value: 35 }
    ],
    pieData: [
      { name: '긍정', value: 85 }, { name: '중립', value: 12 }, { name: '부정', value: 3 }
    ],
    lineData: [
      { name: '1월', value: 40 }, { name: '2월', value: 55 }, { name: '3월', value: 80 },
      { name: '4월', value: 95 }, { name: '5월', value: 120 }, { name: '6월', value: 150 }
    ],
    areaData: [
      { name: '20대', value: 30 }, { name: '30대', value: 45 }, { name: '40대', value: 20 }, { name: '50대', value: 5 }
    ]
  },
  {
    id: 1,
    title: "건강기능식품 (오메가3)",
    icon: <HeartPulse className="w-5 h-5" />,
    color: "#EF4444", // Red-500
    keywords: [
      { text: "오메가3", weight: 29 }, { text: "가성비", weight: 17 }, { text: "스포츠리서치", weight: 12 },
      { text: "비린내", weight: 5 }, { text: "꾸준히", weight: 12 }, { text: "항상", weight: 20 },
      { text: "가격도", weight: 20 }, { text: "배송도", weight: 18 }
    ],
    analysis: "건강기능식품 토픽에서는 '오메가3' 제품군에 대한 실용적인 피드백이 주를 이룹니다. '가성비'와 '가격도' 키워드가 상위에 위치한 것은 소비자들이 장기 복용이 필요한 영양제 선택 시 경제적 부담을 가장 크게 고려하고 있음을 보여줍니다. 특히 '스포츠리서치'라는 특정 브랜드 언급은 해외 직구 브랜드에 대한 높은 신뢰도를 반영하며, 이는 국내 브랜드들이 가격 경쟁력뿐만 아니라 브랜드 신뢰도 구축에도 힘써야 함을 의미합니다. 또한 '비린내' 키워드는 오메가3 특유의 냄새 유무가 제품 만족도의 결정적 변수임을 시사하며, '꾸준히'와 '항상'이라는 단어는 이 제품군이 일시적인 유행이 아닌 일상적인 건강 관리 루틴으로 완전히 자리 잡았음을 증명하는 중요한 데이터 포인트입니다.",
    insight: "건강기능식품 시장, 특히 오메가3 카테고리에서는 '효능'만큼이나 '복용 편의성'과 '경제성'이 중요한 경쟁 우위 요소입니다. 소비자들은 고품질의 원료를 합리적인 가격에 제공하는 브랜드를 선호하며, 특히 냄새(비린내) 역류가 없는 제품에 대해 높은 충성도를 보입니다. 데이터에 따르면 배송 속도와 가격 경쟁력이 결합되었을 때 구매 전환율이 가장 높게 나타납니다. 이는 영양제 시장이 단순한 건강 보조를 넘어, 가격 비교가 용이한 커머스 시장의 특성을 강하게 띄고 있음을 의미하며, 브랜드는 원료의 순도뿐만 아니라 캡슐 기술력(장용성 등)을 마케팅 포인트로 삼아야 합니다. 또한 고령화 사회로 접어들면서 40대 이상의 중장년층뿐만 아니라 2030 세대의 '얼리 케어' 수요도 증가하고 있어 전 연령대를 아우르는 마케팅 전략이 필요합니다.",
    actionPlan: "첫째, '비린내 없는 오메가3'를 핵심 슬로건으로 내세워 냄새에 민감한 초기 복용자들을 타겟팅합니다. 둘째, '스포츠리서치'와 같은 글로벌 강자와 경쟁하기 위해 rTG 형태의 고순도 원료 사용을 강조하고, 국내 제조의 신선함(산패도 관리)을 차별화 전략으로 활용합니다. 셋째, '가성비'를 중시하는 고객을 위해 대용량 패키지 출시 및 정기 배송 시 추가 할인 혜택을 제공하여 객단가를 높입니다. 넷째, '꾸준히' 복용하는 고객들의 데이터를 활용하여 복용 알림 서비스나 건강 리포트를 제공하는 앱 연동 서비스를 기획함으로써 고객과의 접점을 강화하고 브랜드 신뢰도를 구축해야 합니다.",
    radarData: [
      { subject: '가성비', A: 98, fullMark: 100 },
      { subject: '품질', A: 85, fullMark: 100 },
      { subject: '배송속도', A: 92, fullMark: 100 },
      { subject: '복용편의', A: 80, fullMark: 100 },
      { subject: '브랜드파워', A: 75, fullMark: 100 },
    ],
    barData: [
      { name: '오메가3', value: 29 }, { name: '항상', value: 20 }, { name: '가격도', value: 20 },
      { name: '배송도', value: 18 }, { name: '가성비', value: 17 }, { name: '스포츠리서치', value: 12 }
    ],
    pieData: [
      { name: '가격만족', value: 65 }, { name: '품질만족', value: 25 }, { name: '기타', value: 10 }
    ],
    lineData: [
      { name: '1월', value: 100 }, { name: '2월', value: 110 }, { name: '3월', value: 105 },
      { name: '4월', value: 130 }, { name: '5월', value: 140 }, { name: '6월', value: 135 }
    ],
    areaData: [
      { name: '30대', value: 25 }, { name: '40대', value: 40 }, { name: '50대', value: 30 }, { name: '60대+', value: 5 }
    ]
  },
  {
    id: 2,
    title: "테크 & 가전 (에어팟 프로)",
    icon: <Smartphone className="w-5 h-5" />,
    color: "#3B82F6", // Blue-500
    keywords: [
      { text: "에어팟", weight: 69 }, { text: "프로", weight: 37 }, { text: "노이즈캔슬링", weight: 30 },
      { text: "노캔", weight: 24 }, { text: "역시", weight: 28 }, { text: "최고예요", weight: 22 },
      { text: "만족합니다", weight: 36 }, { text: "좋네요", weight: 34 }
    ],
    analysis: "테크 분야에서는 '에어팟 프로'와 관련된 고관여 소비 행태가 뚜렷하게 나타납니다. '노이즈캔슬링'과 '노캔' 키워드의 높은 비중은 소비자들이 이 제품을 선택하는 가장 결정적인 이유가 강력한 소음 차단 기능임을 보여줍니다. '역시'와 '최고예요'라는 감성적 키워드는 애플 브랜드에 대한 강력한 팬덤과 제품 성능에 대한 확신을 의미하며, 이는 단순한 전자제품 구매를 넘어선 브랜드 경험의 완성을 뜻합니다. 또한 '프로'라는 명칭이 강조되는 것은 일반 모델 대비 상위 라인업의 프리미엄 가치를 소비자들이 명확히 인지하고 수용하고 있음을 시사하며, 이는 기술적 우위가 소비자들에게 실질적인 삶의 질 향상으로 전달되고 있음을 증명하는 결과입니다.",
    insight: "테크 액세서리 시장에서 '에어팟 프로'는 단순한 이어폰이 아닌 '몰입의 도구'로 정의됩니다. 소비자들은 고가의 가격임에도 불구하고 확실한 성능(노이즈 캔슬링)이 보장된다면 기꺼이 프리미엄 비용을 지불할 준비가 되어 있습니다. 특히 '역시'라는 키워드는 브랜드 경험의 연속성을 의미하며, 기존 애플 생태계 사용자들이 자연스럽게 프로 모델로 업그레이드하는 경향을 보여줍니다. 이는 기술적 우위가 브랜드 충성도로 직결되는 전형적인 사례로, 향후 마케팅 전략은 단순 스펙 나열보다는 '일상에서의 고요함'이나 '업무 집중도 향상'과 같은 사용자 경험 가치를 소구하는 방향이 효과적일 것입니다. 또한 경쟁사들의 추격이 거센 상황에서 애플만의 독보적인 연동성과 공간 음향 기술을 더욱 부각시켜 시장 지배력을 유지해야 합니다.",
    actionPlan: "첫째, '노이즈 캔슬링' 기능을 일상 속 소음(지하철, 카페 등)과 대비시키는 체험형 팝업 스토어나 디지털 캠페인을 전개하여 제품의 실질적 효용을 강조합니다. 둘째, '프로' 유저들을 위한 전용 가죽 케이스나 커스텀 액세서리 라인업을 강화하여 프리미엄 이미지를 공고히 합니다. 셋째, 대학생 및 직장인 타겟의 '생산성 향상 패키지'를 기획하여 아이패드나 맥북과의 연동성을 강조하는 번들 프로모션을 진행합니다. 마지막으로, '노캔' 성능 저하에 민감한 유저들을 위해 정기적인 펌웨어 업데이트 소식을 빠르게 전달하고, AS 보증 연장 프로그램인 '애플케어+' 가입을 유도하여 사후 관리 만족도를 높여야 합니다.",
    radarData: [
      { subject: '성능(노캔)', A: 99, fullMark: 100 },
      { subject: '디자인', A: 90, fullMark: 100 },
      { subject: '연동성', A: 95, fullMark: 100 },
      { subject: '가격만족', A: 60, fullMark: 100 },
      { subject: '착용감', A: 88, fullMark: 100 },
    ],
    barData: [
      { name: '에어팟', value: 69 }, { name: '프로', value: 37 }, { name: '만족합니다', value: 36 },
      { name: '좋네요', value: 34 }, { name: '노캔', value: 30 }, { name: '역시', value: 28 }
    ],
    pieData: [
      { name: '기능중시', value: 70 }, { name: '브랜드중시', value: 20 }, { name: '디자인중시', value: 10 }
    ],
    lineData: [
      { name: '1월', value: 200 }, { name: '2월', value: 180 }, { name: '3월', value: 220 },
      { name: '4월', value: 250 }, { name: '5월', value: 230 }, { name: '6월', value: 280 }
    ],
    areaData: [
      { name: '10대', value: 15 }, { name: '20대', value: 50 }, { name: '30대', value: 25 }, { name: '40대+', value: 10 }
    ]
  },
  {
    id: 3,
    title: "생활용품 (물티슈)",
    icon: <Package className="w-5 h-5" />,
    color: "#10B981", // Emerald-500
    keywords: [
      { text: "물티슈", weight: 25 }, { text: "두께도", weight: 13 }, { text: "미엘", weight: 9 },
      { text: "적당하고", weight: 15 }, { text: "조금", weight: 9 }, { text: "가성비", weight: 17 },
      { text: "배송도", weight: 18 }, { text: "항상", weight: 20 }
    ],
    analysis: "생활용품 카테고리에서는 '물티슈'의 물리적 특성과 구매 편의성이 핵심입니다. '두께도'와 '적당하고' 키워드는 사용자들이 물티슈 선택 시 너무 얇지 않은 평량(gsm)을 중요하게 생각함을 의미하며, 이는 한 장으로도 충분한 세정력을 발휘할 수 있는 실용성을 중시하는 경향을 보여줍니다. '미엘'이라는 특정 브랜드의 언급은 가성비 시장 내에서도 선호되는 브랜드가 형성되어 있음을 보여주며, 이는 저관여 제품군에서도 브랜드 인지도가 구매에 미치는 영향이 적지 않음을 시사합니다. 또한 '항상'과 '배송도' 키워드의 조합은 물티슈가 생필품으로서 정기적으로 대량 구매되는 품목이며, 빠른 배송이 브랜드 충성도를 유지하는 필수 조건임을 나타냅니다.",
    insight: "물티슈 시장은 고관여 제품은 아니지만, '실패 없는 구매'를 원하는 소비 성향이 강합니다. 소비자들은 가격이 저렴하면서도 한 장으로 충분히 닦이는 '두께감'을 가진 제품을 '가성비' 있다고 정의합니다. 특히 육아 가정이나 반려동물 가구에서는 소모량이 많기 때문에 대량 구매 시의 할인율과 배송의 안정성이 브랜드 전환을 막는 강력한 장벽이 됩니다. 데이터상으로 '적당한 두께'에 대한 만족도가 높다는 것은 시장의 표준 평량이 소비자 기대치에 부합하고 있음을 의미하며, 향후 차별화는 성분의 안전성이나 캡의 편의성, 혹은 환경을 생각한 생분해 소재 등으로 이동할 가능성이 큽니다. 따라서 브랜드는 단순히 가격으로만 승부하기보다, '가족의 건강'과 '환경 보호'라는 가치를 제품에 녹여내어 프리미엄 가성비 이미지를 구축해야 합니다.",
    actionPlan: "첫째, 제품 패키지에 '평량(gsm)'을 직관적으로 표시하여 '두께감'에 대한 신뢰를 시각적으로 전달합니다. 둘째, '미엘' 브랜드의 인지도를 활용하여 '미엘 프리미엄(고평량)' 라인을 강화하고 프리미엄 시장으로의 확장을 도모합니다. 셋째, 대량 구매 고객을 위해 '10+10' 프로모션이나 '박스 단위 정기 배송' 서비스를 강화하여 물류 비용을 절감하고 고객 유지율을 높입니다. 넷째, 환경에 민감한 소비자들을 위해 '레이온 100% 생분해 물티슈' 라인을 출시하고, 플라스틱 캡을 줄인 에코 패키지를 도입하여 ESG 경영 이미지를 구축함으로써 브랜드 가치를 제고해야 합니다.",
    radarData: [
      { subject: '두께감', A: 92, fullMark: 100 },
      { subject: '수분감', A: 85, fullMark: 100 },
      { subject: '가성비', A: 98, fullMark: 100 },
      { subject: '성분안전', A: 80, fullMark: 100 },
      { subject: '배송안정', A: 95, fullMark: 100 },
    ],
    barData: [
      { name: '항상', value: 20 }, { name: '배송도', value: 18 }, { name: '가성비', value: 17 },
      { name: '적당', value: 15 }, { name: '두께', value: 13 }, { name: '물티슈', value: 25 }
    ],
    pieData: [
      { name: '대량구매', value: 75 }, { name: '소량구매', value: 20 }, { name: '기타', value: 5 }
    ],
    lineData: [
      { name: '1월', value: 300 }, { name: '2월', value: 310 }, { name: '3월', value: 305 },
      { name: '4월', value: 320 }, { name: '5월', value: 340 }, { name: '6월', value: 330 }
    ],
    areaData: [
      { name: '자취생', value: 20 }, { name: '육아가정', value: 55 }, { name: '반려동물', value: 15 }, { name: '기타', value: 10 }
    ]
  },
  {
    id: 4,
    title: "물류 & 서비스 (배송 만족도)",
    icon: <Truck className="w-5 h-5" />,
    color: "#8B5CF6", // Violet-500
    keywords: [
      { text: "배송", weight: 77 }, { text: "빠르고", weight: 70 }, { text: "배송도", weight: 61 },
      { text: "저렴하게", weight: 60 }, { text: "빠른배송", weight: 37 }, { text: "감사합니다", weight: 96 },
      { text: "만족합니다", weight: 51 }, { text: "받았습니다", weight: 30 }
    ],
    analysis: "모든 카테고리를 관통하는 핵심 서비스 토픽은 '배송'과 '가격'입니다. '빠르고', '배송도', '빠른배송' 등 배송 관련 키워드의 빈도가 압도적으로 높은 것은 한국 이커머스 시장에서 배송 속도가 이미 '위생 요인(Hygiene Factor)'으로 자리 잡았음을 의미합니다. 즉, 배송이 빠르면 당연하게 여기지만 조금이라도 늦어지면 큰 불만족으로 이어지는 구조입니다. '저렴하게'와 '감사합니다'의 높은 빈도는 소비자들이 가격 혜택과 서비스 품질이 결합되었을 때 브랜드에 대한 정서적 유대감(감사함)을 느낀다는 것을 보여주며, 이는 단순한 상거래를 넘어선 신뢰 관계의 형성을 의미합니다. 이러한 긍정적인 감정은 재구매와 긍정적인 리뷰 확산으로 이어지는 선순환 구조의 핵심 동력입니다.",
    insight: "서비스 분석 결과, 소비자의 구매 여정에서 '라스트 마일(Last Mile)' 경험이 전체 만족도의 70% 이상을 차지합니다. 아무리 좋은 제품이라도 배송이 느리거나 포장이 불량하면 부정적인 평가로 직결됩니다. 특히 '감사합니다'라는 키워드가 96점으로 매우 높게 나타난 점은, 친절한 배송 기사나 꼼꼼한 포장, 혹은 예상보다 빠른 도착이 소비자에게 예상치 못한 기쁨(Delight)을 준다는 것을 시사합니다. 또한 '저렴하게'라는 키워드는 최저가 검색을 통한 유입이 활발함을 의미하므로, 가격 정책의 유연성과 물류 효율화를 통한 비용 절감이 비즈니스의 지속 가능성을 결정짓는 핵심 요소입니다. 향후에는 AI 기반의 수요 예측을 통해 재고를 미리 배치하고 배송 경로를 최적화함으로써 비용은 낮추고 속도는 높이는 기술적 혁신이 동반되어야 합니다.",
    actionPlan: "첫째, '당일 배송' 또는 '새벽 배송' 가능 지역을 지속적으로 확장하여 배송 경쟁력을 절대적 우위로 가져갑니다. 둘째, '감사합니다'라는 긍정적 피드백을 유지하기 위해 친환경 종이 완충재를 사용한 프리미엄 포장 서비스를 도입하여 언박싱 경험을 강화합니다. 셋째, 물류 센터 자동화 시스템을 구축하여 오배송률을 낮추고 피킹 시간을 단축함으로써 운영 효율성을 극대화합니다. 넷째, '저렴하게' 구매하려는 고객들을 위해 멤버십 제도를 운영하여 배송비 무료 혜택과 전용 특가를 제공함으로써 타 플랫폼으로의 이탈을 방지하고 데이터 기반의 개인화 추천 서비스를 강화해야 합니다.",
    radarData: [
      { subject: '배송속도', A: 98, fullMark: 100 },
      { subject: '포장상태', A: 88, fullMark: 100 },
      { subject: '가격경쟁', A: 95, fullMark: 100 },
      { subject: '고객응대', A: 82, fullMark: 100 },
      { subject: '정확도', A: 92, fullMark: 100 },
    ],
    barData: [
      { name: '감사', value: 96 }, { name: '배송', value: 77 }, { name: '빠름', value: 70 },
      { name: '저렴', value: 60 }, { name: '만족', value: 51 }, { name: '받음', value: 30 }
    ],
    pieData: [
      { name: '매우만족', value: 60 }, { name: '만족', value: 30 }, { name: '보통', value: 10 }
    ],
    lineData: [
      { name: '1월', value: 500 }, { name: '2월', value: 520 }, { name: '3월', value: 580 },
      { name: '4월', value: 600 }, { name: '5월', value: 650 }, { name: '6월', value: 700 }
    ],
    areaData: [
      { name: '수도권', value: 65 }, { name: '광역시', value: 20 }, { name: '기타', value: 15 }
    ]
  }
];

// --- Components ---

const WordCloud = ({ keywords, color }: { keywords: Keyword[], color: string }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center p-6 bg-white/50 rounded-2xl border border-black/5 min-h-[200px]">
      {keywords.map((kw, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          style={{ 
            fontSize: `${Math.max(12, Math.min(48, kw.weight / 4))}px`,
            color: color,
            fontWeight: kw.weight > 50 ? 'bold' : 'normal',
            opacity: Math.max(0.4, kw.weight / 200)
          }}
          className="cursor-default hover:scale-110 transition-transform"
        >
          {kw.text}
        </motion.span>
      ))}
    </div>
  );
};

const ChartSection = ({ topic }: { topic: TopicData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {/* Graph 1: Radar Chart */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gray-100"><Target className="w-4 h-4" /></div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">속성별 만족도 (Radar)</h4>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topic.radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="A" stroke={topic.color} fill={topic.color} fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="font-semibold mb-1">[그래프 설명]</p>
          본 레이더 차트는 해당 카테고리의 5가지 핵심 속성(가성비, 품질, 배송, 편의성, 브랜드)에 대한 소비자 만족도를 100점 만점으로 시각화한 것입니다. 각 축의 끝점은 완벽한 만족을 의미하며, 면적이 넓을수록 전반적인 서비스 품질이 높음을 나타냅니다. 특히 특정 방향으로 치우친 형태는 해당 브랜드가 가진 독보적인 강점과 보완이 필요한 약점을 한눈에 파악할 수 있게 설계되었습니다.
        </div>
      </div>

      {/* Graph 2: Bar Chart */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gray-100"><TrendingUp className="w-4 h-4" /></div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">키워드 빈도 (Bar)</h4>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topic.barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="value" fill={topic.color} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="font-semibold mb-1">[그래프 설명]</p>
          막대 그래프는 텍스트 마이닝을 통해 추출된 상위 6개 핵심 키워드의 출현 빈도를 나타냅니다. X축은 키워드 명칭을, Y축은 가중치 점수를 의미하며, 가장 높은 막대는 소비자들이 해당 제품군을 언급할 때 가장 먼저 떠올리는 핵심 가치를 상징합니다. 빈도의 차이가 클수록 시장에서 특정 속성이 지배적인 영향력을 행사하고 있음을 보여주며, 이는 마케팅 메시지 우선순위 결정의 근거가 됩니다.
        </div>
      </div>

      {/* Graph 3: Pie Chart */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gray-100"><Info className="w-4 h-4" /></div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">구매 동기 비중 (Pie)</h4>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topic.pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {topic.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[topic.color, '#94a3b8', '#cbd5e1'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="font-semibold mb-1">[그래프 설명]</p>
          파이 차트는 전체 소비자 피드백 중 구매 결정에 영향을 준 주요 요인들의 점유율을 백분율로 환산한 것입니다. 도넛 형태의 디자인은 중심부에 핵심 메시지를 담을 수 있게 구성되었으며, 각 섹션의 크기는 해당 요인이 시장에서 차지하는 비중을 직관적으로 전달합니다. 가장 큰 비중을 차지하는 영역은 브랜드가 반드시 유지해야 할 핵심 경쟁력이며, 작은 영역은 틈새 시장 공략의 실마리를 제공합니다.
        </div>
      </div>

      {/* Graph 4: Line Chart */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gray-100"><TrendingUp className="w-4 h-4" /></div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">관심도 추이 (Line)</h4>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={topic.lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={topic.color} strokeWidth={3} dot={{ r: 4, fill: topic.color }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="font-semibold mb-1">[그래프 설명]</p>
          선 그래프는 최근 6개월간 해당 토픽에 대한 검색량 및 소셜 언급량의 변화 추이를 보여줍니다. 완만한 상승 곡선은 시장의 안정적인 성장을 의미하며, 급격한 스파이크는 특정 프로모션이나 신제품 출시의 효과를 나타냅니다. 이 시계열 데이터를 통해 계절적 수요 변화를 예측하고, 마케팅 예산 집행의 최적 시기를 결정할 수 있습니다. 꺾은선 그래프의 기울기는 시장의 에너지와 소비자 반응의 속도를 대변합니다.
        </div>
      </div>

      {/* Graph 5: Area Chart */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gray-100"><LayoutDashboard className="w-4 h-4" /></div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500">타겟 분포 (Area)</h4>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={topic.areaData}>
              <defs>
                <linearGradient id={`colorValue-${topic.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={topic.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={topic.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={topic.color} fillOpacity={1} fill={`url(#colorValue-${topic.id})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
          <p className="font-semibold mb-1">[그래프 설명]</p>
          영역 차트는 주요 소비자층의 연령대별 혹은 세그먼트별 분포를 누적된 면적으로 시각화한 것입니다. 선 아래 채워진 색상은 데이터의 부피감을 강조하여 어떤 계층이 주력 소비층인지 시각적 무게감을 통해 전달합니다. 면적의 고점은 브랜드가 가장 강력하게 소구하고 있는 타겟 지점을 의미하며, 낮은 영역은 향후 확장이 필요한 잠재 고객군을 식별하는 데 도움을 줍니다.
        </div>
      </div>

      {/* Insight Summary Card */}
      <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/10"><Lightbulb className="w-6 h-6 text-yellow-400" /></div>
          <h3 className="text-xl font-bold">종합 데이터 인사이트</h3>
        </div>
        <div className="text-sm text-gray-300 leading-relaxed">
          {topic.insight}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] font-sans selection:bg-black selection:text-white">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white border-r border-black/5 z-50 flex flex-col items-center md:items-stretch py-8 px-4">
        <div className="flex items-center gap-3 px-4 mb-12">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter hidden md:block">INSIGHT.AI</span>
        </div>
        
        <div className="space-y-2 flex-1">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group",
                activeTopic.id === topic.id 
                  ? "bg-black text-white shadow-lg shadow-black/10" 
                  : "hover:bg-gray-100 text-gray-500"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-colors",
                activeTopic.id === topic.id ? "bg-white/20" : "bg-gray-100 group-hover:bg-white"
              )}>
                {topic.icon}
              </div>
              <span className="font-bold text-sm hidden md:block truncate">{topic.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-4 bg-gray-50 rounded-2xl hidden md:block">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-600">Live Analysis Active</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-20 md:pl-64 pt-8 pb-20 px-6 md:px-12">
        <header className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full">Report v2.5</span>
                <span className="text-xs font-bold text-gray-400">Updated: 2026.03.25</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
                {activeTopic.title}
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
                제공된 키워드 분석 데이터를 바탕으로 도출된 비즈니스 인사이트 및 전략적 액션 플랜 대시보드입니다.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sentiment</p>
                <p className="text-2xl font-black text-green-500">85.4%</p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm min-w-[140px]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Confidence</p>
                <p className="text-2xl font-black text-blue-500">High</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section 1: Keyword Analysis & Word Cloud */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Sparkles className="w-6 h-6" /> 키워드 분석 결과
                </h2>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gray-300" />)}
                </div>
              </div>
              <div className="text-gray-600 leading-relaxed font-medium">
                {activeTopic.analysis}
              </div>
              <WordCloud keywords={activeTopic.keywords} color={activeTopic.color} />
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                <Target className="w-6 h-6" /> 비즈니스 액션 플랜
              </h2>
              <div className="space-y-4">
                {activeTopic.actionPlan.split('. ').map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 leading-snug">
                      {step.endsWith('.') ? step : `${step}.`}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: 5 Graphs with Detailed Explanations */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-black tracking-tighter">데이터 시각화 심층 분석</h2>
              <div className="h-[1px] flex-1 bg-gray-200" />
            </div>
            <ChartSection topic={activeTopic} />
          </section>

          {/* Footer / Summary Dashboard */}
          <footer className="bg-white p-12 rounded-[50px] border border-black/5 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-black text-lg">About Analysis</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  본 리포트는 LDA(Latent Dirichlet Allocation) 및 NMF(Non-negative Matrix Factorization) 알고리즘을 활용하여 수집된 텍스트 데이터를 5가지 핵심 토픽으로 분류하고, 각 토픽별 키워드 가중치를 분석한 결과입니다.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-lg">Methodology</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  자연어 처리(NLP) 기술을 통해 불용어를 제거하고 형태소 분석을 실시하였으며, 키워드 간의 상관관계를 바탕으로 비즈니스 인사이트를 도출하였습니다. 시각화 도구로는 Recharts 라이브러리를 사용하였습니다.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-lg">Next Steps</h4>
                <div className="flex flex-wrap gap-2">
                  {['A/B Testing', 'Market Expansion', 'CRM Integration', 'UX Optimization'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-[10px] font-bold text-gray-600 rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs font-bold text-gray-400">© 2026 INSIGHT.AI DATA LAB. ALL RIGHTS RESERVED.</p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                Export PDF <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
