#!/usr/bin/env python3
"""Writes the translations that the model could not make, by hand.

The model is asked twice for a piece it keeps getting wrong: once with the
rest of the batch and once on its own. When it fails both times the piece
is left in English, and the guide shows a paragraph in a language it is not
in. These are those paragraphs, written by hand and put into the cache, so
that the next run finds them and leaves them alone.

Usage:
    python3 app/scripts/write_manual_translations.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / "app" / "scripts"))

import translate_guides as tg  # noqa: E402
from gemini_translate import Translator, is_formula, protect  # noqa: E402

# The translations, written by hand. The key is the locale, the value is the
# English piece and the translation of it.
TRANSLATIONS: dict[str, dict[str, str]] = {
    "ko": {
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧세무 평가 기관.⟦1⟧ 지방 세무서에서는 특정 주소의 평가 가치와 적용 세율을 공개합니다. 이를 통해 전국 평균이 아니라 실제 관할 지역에 근거한 추정치를 얻습니다.\n2. ⟦2⟧해당 주소의 보험료 견적.⟦3⟧ 견적은 무료이며, 숫자는 실제로 보험율을 정할 모델이 계산해 냅니다. 보험료만이 아니라 재건축 비용 금액이 제시됩니다.\n3. ⟦4⟧대출기관의 에스크로 추정액.⟦5⟧ 대출이 체결되면 대출기관이 자체 자료로 에스크로 납부액을 계산합니다. 이는 다음 해를 약속하는 것이 아니며, 세금 고지서와 보험 갱신서가 도착하면 바뀝니다.",
        "At a zero rate the formula degenerates, because dividing by r is undefined.\n"
        "The calculation handles that case explicitly rather than letting it produce\n"
        "a division by zero: with no interest, the balance grows by the deposits\n"
        "alone, which is exactly what happens.":
            "금리가 0%이면 r로 나누는 것이 정의되지 않으므로 공식이 성립하지 않습니다. "
            "계산은 이 경우를 나눗셈 오류로 빠뜨리지 않고 따로 처리합니다. 이자가 없으면 "
            "잔액은 납입액만큼만 늘어나며, 실제로 일어나는 일이기도 합니다.",

        "⟦0⟧Fees.⟦1⟧ An account charge is usually a percentage of the balance, so it\n"
        "  compounds too. Investor.gov's pages on fees and expenses explain the\n"
        "  structures in detail.\n"
        "- ⟦2⟧Taxes.⟦3⟧ The treatment of a retirement account and of investment gains\n"
        "  depends on the account type and on the person. The Internal Revenue\n"
        "  Service publishes the rules for the accounts it administers.\n"
        "- ⟦4⟧Volatility.⟦5⟧ A real investment balance falls in years when markets fall.\n"
        "  A fixed rate cannot represent that, and the tool does not try.\n"
        "- ⟦6⟧Contribution changes.⟦7⟧ Raising a contribution over time, or stopping\n"
        "  part-way, is outside the model. The contribution is constant across the\n"
        "  horizon.":
            "⟦0⟧수수료.⟦1⟧ 계좌 요금은 대개 잔액의 비율이므로 이것도 복리로 증가합니다. "
            "Investor.gov의 수수료와 비용에 관한 페이지가 그 구조를 자세히 설명합니다.\n"
            "- ⟦2⟧세금.⟦3⟧ 연금 계좌와 투자 수익의 취급은 계좌 종류와 본인 상황에 따라 "
            "달라집니다. 자신이 관리하는 계좌의 규정은 국세청(IRS)이 공표합니다.\n"
            "- ⟦4⟧변동성.⟦5⟧ 시장이 하락하는 해에는 실제 투자 잔액도 줄어듭니다. 고정 금리로는 "
            "그것을 나타낼 수 없으며, 이 도구도 그렇게 하려 하지 않습니다.\n"
            "- ⟦6⟧납입액 변경.⟦7⟧ 시간에 따라 납입액을 늘리거나 중간에 중단하는 것은 모델 범위 "
            "밖입니다. 이 기간 동안 납입액은 일정합니다.",

        "The rate is set locally, so no published figure is right for every address.\n"
        "The rent versus buy calculator can still start from a closer number than a\n"
        "national average: when the network can work out which state the request came\n"
        "from, it fills the property tax field with the average effective rate for that\n"
        "state — the tax actually paid as a share of the value of the home, published\n"
        "by the Tax Foundation for 2026 from the American Community Survey for 2024.":
            "세율은 지역별로 정해지므로 모든 주소에 맞는 공표 수치는 없습니다. 그래도 임차 대비 "
            "매수 계산기는 전국 평균보다 가까운 숫자로 시작할 수 있습니다. 네트워크에서 요청이 "
            "어느 주에서 왔는지 알아낼 수 있으면 해당 주의 평균 실효세율로 재산세 항목을 "
            "채웁니다. 이는 집값 대비 실제로 부담한 세액으로, 세금재정재단이 2024년 미국 공동체 "
            "조사를 바탕으로 2026년 수치를 공개한 것입니다.",

        "The Investor.gov pages on fees and expenses and on account types describe\n"
        "those differences. The Federal Reserve's H.15 series records what rates\n"
        "savings products have actually paid, which is useful for checking whether a\n"
        "quoted rate is in a plausible range.":
            "Investor.gov의 수수료·비용 페이지와 계좌 종류 페이지는 그 차이를 설명합니다. "
            "연방준비제도 H.15 통계는 예적상품이 실제로 지급한 금리를 기록하므로, 제시된 "
            "금리가 타당한 범위에 있는지 확인하는 데 도움이 됩니다.",

        "Take a rate from the H.15 series, put it into the calculator at annual\n"
        "compounding and then at monthly compounding, and read the difference in the\n"
        "final balance. That difference is the value of the more frequent credit, and\n"
        "it is a number rather than a rule of thumb.":
            "H.15 통계에서 금리 하나를 골라, 계산기에 연 단위 복리로 입력한 다음 월 단위 복리로 "
            "입력하고 최종 잔액의 차이를 읽어 보세요. 그 차이가 더 자주 복리 적용될 때의 가치이며, "
            "대략적인 기준이 아니라 정확한 숫자입니다.",

        "How is taxable income different from gross income?":
            "과세 대상 소득은 총소득과 어떻게 다른가요?",

        "Two rates come out of that, and they answer different questions. The marginal\n"
        "rate is the rate the next dollar meets, so at $83,900 of taxable income the\n"
        "next dollar is taxed at 22 percent. The effective rate is the whole tax\n"
        "divided by the whole income: the same reader, with gross income of $100,000\n"
        "and the standard deduction of $16,100, pays $13,170 in federal tax, which is\n"
        "about 13 percent of what they earned.":
            "여기서 두 가지 세율이 나오는데, 서로 다른 질문에 답합니다. 한계세율은 다음 1달러가 "
            "만나는 세율입니다. 따라서 과세 대상 소득이 $83,900일 때 다음 1달러에는 22세가 "
            "적용됩니다. 실효세율은 전체 세액을 전체 소득으로 나눈 값입니다. 같은 독자가 총소득 "
            "$100,000에 표준공제 $16,100을 적용하면 연방세 $13,170을 냅니다. 이는 소득의 약 "
            "13퍼센트입니다.",

        "The state tax is not a rate applied to the whole of the income. It is\n"
        "calculated the way a state calculates it, from published figures: the brackets,\n"
        "the standard deduction and the personal exemption of the state. Most of them\n"
        "come from the Tax Foundation tables for every state and the District of\n"
        "Columbia. For five states they come from the state itself, because what the\n"
        "state had published for 2026 was newer than the tables: California, Hawaii,\n"
        "Maine, Vermont and Arizona.":
            "주세는 전체 소득에 하나의 세율을 적용한 것이 아닙니다. 주가 계산하는 방식대로 "
            "공개된 수치로 계산합니다. 바로 그 주의 세율 구간, 표준공제와 개인 면세입니다. "
            "대부분은 세금재정재단이 모든 주와 콜럼비아 자치구에 대해 마련한 표에서 나옵니다. "
            "다섯 개의 주에서는 표보다 최신인 2026년 수치를 해당 주가 직접 공개했기 때문에 그 "
            "수치를 씁니다. 캘리포니아, 하와이, 메인, 버몬트, 애리조나입니다.",

        "This is why rate comparisons use total figures. The Freddie Mac Primary\n"
        "Mortgage Market Survey publishes the rate series most often used as a\n"
        "reference point, and Fannie Mae's research pages carry the equivalent\n"
        "commentary.":
            "그래서 금리 비교는 총액으로 합니다. 가장 널리 기준점으로 쓰이는 금리 시리즈를 "
            "퍼디 맥의 Primary Mortgage Market Survey가 공개하고, 파니 메이의 연구 페이지에는 "
            "이에 대응하는 설명이 실려 있습니다.",

        "Freddie Mac's Primary Mortgage Market Survey publishes the rate series most\n"
        "often used as a reference point, and Fannie Mae's research pages carry the\n"
        "equivalent commentary on the mortgage market. Neither is a quote for a\n"
        "specific borrower.":
            "퍼디 맥의 Primary Mortgage Market Survey가 가장 널리 쓰이는 기준 금리 시리즈를 "
            "공개하고, 파니 메이의 연구 페이지에는 이에 대응하는 주택 시장 설명이 실려 있습니다. "
            "어느 쪽도 특정 대출자를 위한 견적은 아닙니다.",

        "At wages above $200,000 for a single filer, a married filer filing separately,\n"
        "or a head of household, and above $250,000 for married filing jointly. The\n"
        "rate is 0.9% on the excess, and those thresholds are not indexed for inflation,\n"
        "so they have been the same since 2013.":
            "단독 신고자, 단독 신고하는 부부, 또는 가구주에게는 $200,000을 넘는 급여 구간에, "
            "부부가 함께 신고하는 경우에는 $250,000을 넘는 구간입니다. 초과분에 대해서는 "
            "0.9퍼센트가 적용되며, 이 기준은 물가에 연동되지 않아 2013년 이후 같은 값입니다.",

        "Social Security is a 6.2% charge on wages up to a taxable maximum, which is\n"
        "$184,500 for 2026. Wages above that ceiling are not charged again, which\n"
        "means the marginal rate on Social Security is 6.2% up to the ceiling and zero\n"
        "above it.":
            "사회보장세는 과세 가능한 상한까지의 급여에 6.2퍼센트이며, 그 상한은 2026년 기준 "
            "$184,500입니다. 상한을 넘는 급여에는 다시 부과되지 않으므로, 사회보장세의 한계세율은 "
            "상한까지 6.2퍼센트, 그 위에서는 0퍼센트입니다.",

        "Medicare is a 1.45% charge on all wages, with no ceiling at all. On top of it\n"
        "sits the Additional Medicare Tax: 0.9% on wages above $200,000 for a single\n"
        "filer, a married filer filing separately or a head of household, and above\n"
        "$250,000 for married filing jointly. Those thresholds are not indexed for\n"
        "inflation, so they have stayed at the same numbers since 2013. The Social\n"
        "Security Administration's Publication 15 sets out both the rates and the\n"
        "thresholds.":
            "메디케어는 상한 없이 모든 급여에 1.45퍼센트가 부과됩니다. 그 위에 추가 메디케어세가 "
            "얹힙니다. 단독 신고자, 단독 신고하는 부부, 가구주에게는 $200,000을 넘는 급여에, "
            "부부가 함께 신고하는 경우에는 $250,000을 넘는 급여에 0.9퍼센트가 적용됩니다. 이 기준은 "
            "물가에 연동되지 않아 2013년 이후 같은 숫자입니다. 사회보장관리국 간행물 15호에 세율과 "
            "기준이 모두 정리되어 있습니다.",

        "The state income tax in the calculator is the rate entered on the page,\n"
        "applied to taxable income. That is a simplification, and a deliberate one:\n"
        "most states tax at progressive rates, so a single percentage applied to the\n"
        "whole of taxable income sits above what a progressive state would collect and\n"
        "matches a flat-rate state exactly. The rate on the page is the only\n"
        "state-specific input in the calculation.":
            "계산기의 주세는 페이지에 입력한 세율을 과세 대상 소득에 적용한 값입니다. 이는 의도적인 "
            "단순화입니다. 대부분의 주는 누진세율로 과세하므로, 과세 대상 소득 전체에 하나의 "
            "백분율을 적용한 값은 누진세율로 거둔 금액보다 높고, 단일세율인과 정확히 일치합니다. "
            "페이지의 세율이 계산에 들어가는 유일한 주별 입력값입니다.",

        "A $5,000 HSA or FSA contribution in the same case reaches further. The federal\n"
        "tax is the same $4,420, and this time the payroll taxes move too: Social\n"
        "Security falls to $3,410 and Medicare to $797.50. The total tax is $10,572.50,\n"
        "the effective rate 17.62%, and the take-home amount $44,427.50 against\n"
        "$44,045.00 for the 401(k).":
            "같은 조건에서 $5,000을 HSA 또는 FSA에 납입하면 효과가 더 큽니다. 연방세는 똑같이 "
            "$4,420이고, 이번에는 급여세도 함께 낮아집니다. 사회보장세는 $3,410, 메디케어는 "
            "$797.50이 됩니다. 세금 합계는 $10,572.50, 실효세율은 17.62퍼센트, 수령액은 "
            "$44,427.50으로 401(k)의 $44,045.00보다 높습니다.",

        "It is an input. When the network can work out which state the request came from,\n"
        "the page fills the field with the average effective property tax rate for that\n"
        "state: the tax actually paid as a share of the value of the home, published by\n"
        "the Tax Foundation for 2026 from the American Community Survey for 2024. Property\n"
        "tax is set by local governments, so the rate in a particular county or city is\n"
        "usually different from the state average, and the field stays editable.":
            "입력값입니다. 네트워크에서 요청이 어느 주에서 왔는지 알아낼 수 있으면, 페이지가 그 주의 "
            "평균 실효 재산세율로 항목을 채웁니다. 이는 집값 대비 실제로 부담한 세액으로, 세금재정재단이 "
            "2024년 미국 공동체 조사를 바탕으로 2026년 수치를 공개한 것입니다. 재산세는 "
            "지방자치단체가 정하므로 특정 군이나 도시의 세율은 보통 주 평균과 다르며, 항목은 그대로 "
            "수정할 수 있습니다.",

        "The ⟦0⟧property tax⟦1⟧ figure is an input, and the page can fill it in. When the\n"
        "network can work out which state the request came from, the field is set to\n"
        "the average effective property tax rate for that state — the tax actually paid\n"
        "as a share of the value of the home, published by the Tax Foundation for 2026\n"
        "from the American Community Survey for 2024. It is a state figure, and\n"
        "property tax is set by local governments, so the rate in a particular county\n"
        "or city is usually a different number. The field stays editable, and what the\n"
        "reader types is what the comparison uses.":
            "⟦0⟧재산세⟦1⟧ 수치는 입력값이며, 페이지가 이를 채워 줄 수 있습니다. 네트워크에서 요청이 "
            "어느 주에서 왔는지 알아낼 수 있으면, 해당 항목은 그 주의 평균 실효 재산세율로 설정됩니다. "
            "이는 집값 대비 실제로 부담한 세액으로, 세금재정재단이 2024년 미국 공동체 조사를 바탕으로 "
            "2026년 수치를 공개한 것입니다. 주 단위 수치이며 재산세는 지방자치단체가 정하므로, 특정 "
            "군이나 도시의 세율은 보통 다른 숫자입니다. 항목은 그대로 수정할 수 있고, 독자가 입력한 "
            "값이 비교에 쓰입니다.",

        "The number is an assumption, and a reasonable one can be supported with data:\n"
        "the Federal Reserve Bank of St. Louis publishes long-run house price indices\n"
        "that are a reasonable starting point for calibration. But the spread between\n"
        "good and bad decades is enormous, and the arithmetic of a five-year horizon\n"
        "is entirely different from the arithmetic of thirty years.":
            "그 숫자는 가정이며, 타당한 가정은 자료로 뒷받침할 수 있습니다. 세인트루이스 연방준비은행이 "
            "장기 주택가격지수를 공개하는데, 보정을 시작점으로 삼기 괜찮은 자료입니다. 다만 좋은 "
            "십년과 나쁜 십년 사이의 격차는 크고, 5년 기간의 계산은 30년 기간의 계산과 전혀 다릅니다.",

        "On a mortgage with a single origination charge, the two are close. On one\n"
        "with several fees, they can be a long way apart.":
            "취급수수료가 하나뿐인 주택담보대출에서는 두 값이 가깝습니다. 여러 가지 수수료가 붙으면 "
            "두 값이 크게 벌어질 수 있습니다.",

        "Freddie Mac publishes the Primary Mortgage Market Survey, which is the\n"
        "benchmark most often used as a reference point, and Fannie Mae publishes\n"
        "equivalent research and commentary. Neither is a quote; they are the market\n"
        "context against which a quote is read.":
            "퍼디 맥은 가장 널리 기준점으로 쓰이는 Primary Mortgage Market Survey를 공개하고, 파니 "
            "메이는 이에 대응하는 연구와 설명을 공개합니다. 어느 쪽도 견적이 아니라, 견적의 크기를 "
            "판단하게 하는 시장 상황입니다.",
    },
    "ar": {
        "The rule of thumb is that money doubles roughly every so many years at a\ngiven rate. You can check that against the tool. Run 30 years at 7 percent\nwith no contributions and compare the result with the starting balance; run\nthe same calculation with a contribution and watch the doubling time change.\nThe tool exists so that the rule of thumb can be tested rather than\nbelieved.\n":
            "القاعدة التقريبية هي أن المال يتضاعف تقريبًا كل عدد معين من السنوات عند سعر فائدة معين. يمكنك التحقق من ذلك مقابل الأداة. شغّل 30 عامًا عند 7% من دون مساهمات وقارن النتيجة برصيد البداية؛ شغّل الحساب نفسه مع مساهمة وشاهد كيف يتغير وقت المضاعفة. الأداة موجودة لاختبار القاعدة التقريبية لاتصديقها. ",
        "The gap is $45,123 on a $10,000 starting balance, and it comes entirely from\nthe fact that compound interest is charged on a growing base.":
            "الفجوة تبلغ $45,123 على رصيد بداية قدره $10,000، وهي ناجمة بالكامل عن كون الفائدة المركبة تُحتسب على قاعدة متزايدة.",
        "The table that is used is the one of the filing status. The states that\npublish a head of household table of their own have it here, taken from their\nown forms: New York, New Jersey, Minnesota, Hawaii, Connecticut, Maryland,\nMaine, Montana, New Mexico, Oregon and California. Idaho treats a head of\nhousehold return as a joint return, so the joint schedule is the one that\napplies. Four more states publish no table but give a head of household its own\ndeduction or exemption, and those figures are here as well: Kansas, Oklahoma,\nWisconsin and Massachusetts. The rest are calculated with the single filer\nfigures.":
            "الجدول المستخدم هو جدول حالة الإقرار. الولايات التي تنشر جدولًا خاصًا برأس household موجود هنا، مأخوذًا من نماذجها الخاصة: نيويورك ونيوجيرسي ومينيسوتا وهايي وكونيتيكت وماريلاند ومين ومونتانا ونيومكسيو وأوريغون وكاليفورنيا. تعامل أيداهو إقرار رأس household كإقرار مشترك، لذلك ينطبق الجدول المشترك. لا تنشر أربع ولايات أخرى أي جدول لكنها تمنح رأس household خصمًا أو إعفاءً خاصًا به، وتظهر تلك الأرقام هنا أيضًا: كانساس وأوكلاهوما وwisconsin وماساتشوستس. يتم احتساب الباقي باستخدام أرقام المقدم الفردي.",
        "The gap is $45,123 on a $10,000 starting balance, and it comes entirely from\nthe fact that compound interest is charged on a growing base.":
            "الفجوة تبلغ $45,123 على رصيد بداية قدره $10,000، وهي ناجمة بالكامل عن كون الفائدة المركبة تُحتسب على قاعدة متزايدة.",
        "The table that is used is the one of the filing status. The states that\npublish a head of household table of their own have it here, taken from their\nown forms: New York, New Jersey, Minnesota, Hawaii, Connecticut, Maryland,\nMaine, Montana, New Mexico, Oregon and California. Idaho treats a head of\nhousehold return as a joint return, so the joint schedule is the one that\napplies. Four more states publish no table but give a head of household its own\ndeduction or exemption, and those figures are here as well: Kansas, Oklahoma,\nWisconsin and Massachusetts. The rest are calculated with the single filer\nfigures.":
            "الجدول المستخدم هو جدول حالة الإقرار. الولايات التي تنشر جدولًا خاصًا برأس household موجود هنا، مأخوذًا من نماذجها الخاصة: نيويورك ونيوجيرسي ومينيسوتا وهايي وكونيتيكت وماريلاند ومين ومونتانا ونيومكسيو وأوريغون وكاليفورنيا. تعامل أيداهو إقرار رأس household كإقرار مشترك، لذلك ينطبق الجدول المشترك. لا تنشر أربع ولايات أخرى أي جدول لكنها تمنح رأس household خصمًا أو إعفاءً خاصًا به، وتظهر تلك الأرقام هنا أيضًا: كانساس وأوكلاهوما وwisconsin وماساتشوستس. يتم احتساب الباقي باستخدام أرقام المقدم الفردي.",
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧مسؤول التقييم العقاري.⟦1⟧ ينشر مكتب التقييم المحلي القيمة المقدَّرة والمعدل المنطبق على عنوان محدد. ويقدّم ذلك تقديرًا يستند إلى الولاية القضائية الفعلية بدلاً من المتوسط الوطني.\n2. ⟦2⟧عرض تأمين للعنوان المحدد.⟦3⟧ عروض الأسعار مجانية، ويتولى النموذج الذي سيُسعّر وثيقة التأمين فعليًا إنتاج الرقم. الرقم المذكور هو تكلفة الاستبدال، لا القسط وحده.\n3. ⟦4⟧تقدير حساب Escrow لدى المُقرض.⟦5⟧ بعد إتمام القرض، يحسب المُقرض دفعة Escrow استنادًا إلى أرقامه الخاصة. وهي ليست وعدًا للسنة التالية، وستتغير عند وصول فاتورة الضرائب وتجديد التأمين.",
        "Capital gains rates, the surtaxes a few states charge high earners, and the\n"
        "  taxes of city and county governments.\n"
        "- The deduction for state and local income taxes paid, which many states allow\n"
        "  inside their itemised deductions.\n"
        "- Vermont publishes its rates for 2026 as preliminary figures, and it prints\n"
        "  the standard deduction and the personal exemption for 2026 with the form,\n"
        "  which comes out in 2027, so the amounts the state published last are the\n"
        "  ones used here.\n"
        "- The fall-away of the Maine standard deduction and the Maine personal\n"
        "  exemption as the Maine income rises. The deduction starts to shrink at\n"
        "  $102,250 for a single filer and is gone at $177,250, and the exemption\n"
        "  starts to shrink at $341,000.":
            "معدلات مكاسب رأس المال، والضرائب الإضافية التي تفرضها بضع ولايات على أصحاب "
            "الدخل المرتفع، وضرائب حاكميتي المدن والمقاطعات.\n"
            "- الخصم على ضرائب الدخل المحلية والولائية المدفوعة، وهو ما تسمح به ولايات كثيرة "
            "ضمن خصوماتها التفصيلية.\n"
            "- تنشر فيرمونت معدلاتها لعام 2026 كأرقام أولية، وتطبع مع النموذج الخصم القياسي "
            "والإعفاء الشخصي لعام 2026، وهو ما يصدر في 2027، لذا فالمبالغ التي نشرتها "
            "الولاية آخر مرة هي المستخدمة هنا.\n"
            "- انقضاء خصم مين القياسي وإعفاء مين الشخصي تدريجيًا مع ارتفاع دخل مين. يبدأ "
            "الخصم في الانكماش عند $102,250 لمقدّم الإقرار الضريبي المنفرد، ويختفي عند "
            "$177,250، ويبدأ الإعفاء في الانكماش عند $341,000.",

        "Amortization is the process by which a mortgage is repaid, and it produces\n"
        "one of the most counter-intuitive results in personal finance: a thirty-year\n"
        "loan is not thirty years of paying it off. It is about a decade of paying it\n"
        "off, followed by two decades of paying for the privilege of having paid it\n"
        "off.":
            "الإطفاء هو العملية التي يُسدد بها قرض عقاري، وهو ينتج إحدى أكثر النتائج "
            "المفارقة في التمويل الشخصي: فقرض مدته ثلاثون عامًا ليس ثلاثين عامًا من "
            "سداده. إنه نحو عشر سنوات من السداد، تتبعها عشرتان تُقضيان ثمنًا مقابل "
            "امتياز إتمامه.",

        "A 30-year loan spends its first decade with a balance that barely moves, and\n"
        "that decade is where nearly all of the interest is charged. This is why the\n"
        "term change above looks so dramatic: shortening the term does not merely\n"
        "reduce the rate at which interest is charged, it removes years from the\n"
        "front of the loan where the balance is highest.":
            "يقضي قرض مدته ثلاثون عامًا عقده الأول برصيد يكاد لا يتحرك، وهذا العقد هو "
            "نفسه الذي تُحمَّل فيه الفوائد كلها تقريبًا. ولهذا يبدو تغيير المدة أعلاه "
            "شديد الإبهار: فإن تقصير المدة لا يخفض معدل احتساب الفوائد فحسب، بل يحذف "
            "سنوات من مقدمة القرض حيث يكون الرصيد في أعلى مستوياته.",

        "The IRS excludes a 401(k) contribution from income, and it counts the same\n"
        "contribution as wages for Social Security and Medicare. IRS Tax Topic 401 puts\n"
        "it plainly: the amount is not included in wages subject to income tax, \"but\n"
        "those amounts remain subject to Social Security and Medicare taxes in the year\n"
        "they're withheld.\" Publication 525 says the same thing about elective\n"
        "deferrals.":
            "تستثني خدمة الإيرادات الداخلية مساهمة 401(k) من الدخل، لكنها تحسب المساهمة "
            "نفسها أجورًا لأغراض الضمان الاجتماعي والتأمين الصحي (Medicare). وتوضح "
            "IRS Tax Topic 401 الأمر بوضوح: لا يُدرَج المبلغ ضمن الأجور الخاضعة لضريبة "
            "الدخل، \"لكن تبقى هذه المبالغ خاضعة لضرائب الضمان الاجتماعي وMedicare في "
            "السنة التي تُخصم فيها.\" ويقول Publication 525 الشيء نفسه عن الاشتراكات "
            "الاختيارية.",

        "A great deal on a 30-year loan. Moving from 30 years to 15 years typically "
        "removes around half of the total interest. On a 15-year loan the remaining "
        "term is a smaller share of the original balance and the effect is "
        "correspondingly smaller.":
            "الفرق كبير جدًا في قرض مدته 30 عامًا. والانتقال من 30 عامًا إلى 15 عامًا "
            "يزيل عادةً نحو نصف إجمالي الفوائد. أما في القرض الذي مدته 15 عامًا فالمدة "
            "المتبقية جزء أصغر من الرصيد الأصلي، ويكون الأثر أصغر بالمقدار نفسه.",

        "Compound interest is one of the few ideas in finance that is genuinely\n"
        "simple to state and genuinely hard to feel. The\n"
        "⟦0⟧compound interest calculator⟦1⟧ on this\n"
        "site exists to make the arithmetic visible, because the arithmetic is what\n"
        "distinguishes this from a rule of thumb.":
            "الفائدة المركبة إحدى الأفكار القليلة في التمويل التي يسهل صياغتها فعلًا "
            "ويصعب الإحساس بها فعلًا. و⟦0⟧حاسبة الفائدة المركبة⟦1⟧ على هذا الموقع موجودة "
            "لأن تُظهر العملية الحسابية، فالعملية الحسابية هي ما يميّز هذا عن القاعدة "
            "التقديرية البسيطة.",

        "CFPB — Ask CFPB, consumer questions and answers":
            "CFPB — اسأل CFPB، أسئلة وإجابات المستهلكين",

        "They are part of PITI, so they are usually collected monthly into escrow. The "
        "annual amount is what the calculator reports; the monthly figure is the annual "
        "amount divided by twelve.":
            "وهي جزء من PITI، لذا تُحصَّل عادةً شهريًا في حساب الضمان. والحاسبة تُظهر المبلغ "
            "السنوي؛ والمبلغ الشهري هو المبلغ السنوي مقسومًا على اثني عشر.",

        "Taxable income is what is left after pre-tax deductions such as a 401(k), an HSA "
        "or an FSA, and after the standard or itemised deduction. The brackets apply to "
        "taxable income, not to the gross figure on the payslip.":
            "الدخل الخاضع للضريبة هو ما يتبقى بعد الخصومات قبل الضريبة مثل 401(k) أو HSA أو "
            "FSA، وبعد الخصم القياسي أو الخصم التفصيلي. وتُطبَّق الشرائح على الدخل الخاضع "
            "للضريبة، لا على إجمالي ما ورد في قسيمة الراتب.",

        "Does this include Social Security and Medicare?":
            "هل يشمل هذا الضمان الاجتماعي والتأمين الصحي (Medicare)؟",

        "⟦1⟧In the comparison:⟦0⟧ principal, interest, property tax, insurance, HOA,\n"
        "and the cost of the money used for the down payment, because it is not\n"
        "available for anything else while it sits in the house.":
            "⟦1⟧في المقارنة:⟦0⟧ أصل الدين، والفائدة، وضريبة العقار، والتأمين، ورسوم HOA، "
            "وتكلفة المال المستخدم في الدفعة الأولى، لأنه لا يتوفر لأي غرض آخر ما دام في البيت.",

        "Put both offers through the calculator with the same property tax, insurance\n"
        "and HOA inputs, and read three numbers: the monthly payment, the total\n"
        "interest and the payoff date. Then run the same loan with a larger down\n"
        "payment and see whether the total interest moves by more than the money\n"
        "released would earn elsewhere. That is a comparison rather than a feeling,\n"
        "and it is a comparison the arithmetic can settle.\n":
            "مرِّر العرضين على الحاسبة بمدخلات متطابقة لضريبة العقار والتأمين ورسوم HOA، واقرأ "
            "ثلاثة أرقام: الدفعة الشهرية، وإجمالي الفوائد، وتاريخ السداد. ثم شغّل القرض نفسه "
            "بدفعة أولى أكبر وانظر هل يتحرك إجمالي الفوائد بأكثر مما كان سيكسبه المال المحرَّر في "
            "مكان آخر. هذه مقارنة لا إحساس، ومقارنة يستطيع الحساب حسمها.",

        "The order the money leaves a wage: pre-tax deductions, 2026 federal brackets, "
        "Social Security, Medicare, state tax, effective versus marginal rate.":
            "الترتيب الذي يغادر به المال الأجر: الخصومات قبل الضريبة، وشرائح الضريبة الفيدرالية "
            "لعام 2026، والضمان الاجتماعي، والتأمين الصحي (Medicare)، وضريبة الولاية، والمعدل "
            "الفعّال في مقابل المعدل الحدّي.",

        "It reduces the federal income tax, and not the payroll taxes. The IRS treats a "
        "401(k) or 403(b) contribution as excluded from income but still counted as wages "
        "for Social Security and Medicare, so those two taxes are charged on it. An HSA "
        "or FSA contribution taken out of the paycheque is different: it comes off the "
        "base for the payroll taxes as well. That is why the calculator takes the two "
        "separately.":
            "يخفض ضريبة الدخل الفيدرالية، ولا يخفض ضرائب الرواتب. فمصلحة الضرائب الأمريكية "
            "تعتبر مساهمة 401(k) أو 403(b) مستثناة من الدخل، لكنها تظل ضمن الأجور لأغراض الضمان "
            "الاجتماعي والتأمين الصحي (Medicare)، ولذلك تُفرض عليه هاتان الضريبتان. أما مساهمة "
            "HSA أو FSA المخصومة من الراتب فالأمر مختلف: فهي تُخصم من القاعدة أيضًا لضرائب الرواتب. "
            "ولهذا تأخذ الحاسبة الاثنتين كلٍّ على حدة.",

        "How is the APR calculated?":
            "كيف يُحتسب معدل النسبة السنوية (APR)؟",

        "Should I compare lenders on APR?":
            "هل ينبغي أن أقارن بين المُقرضين على أساس نسبة APR؟",
        "The ⟦0⟧property tax⟦1⟧ figure is an input, and the page can fill it in. When the\nnetwork can work out which state the request came from, the field is set to\nthe average effective property tax rate for that state — the tax actually paid\nas a share of the value of the home, published by the Tax Foundation for 2026\nfrom the American Community Survey for 2024. It is a state figure, and\nproperty tax is set by local governments, so the rate in a particular county\nor city is usually a different number. The field stays editable, and what the\nreader types is what the comparison uses.":
            "⟦0⟧الضريبة على العقار⟦1⟧ هو مُدخَل، ويمكن للصفحة تعبئته. عندما تتمكن الشبكة من تحديد الولاية التي جاء منها الطلب، يُضبط الحقل على متوسط معدل ضريبة العقار الفعلي في تلك الولاية — أي الضريبة المدفوعة فعليًا كنسبة من قيمة المنزل، كما نشرتها مؤسسة Tax Foundation لعام 2026 استنادًا إلى American Community Survey لعام 2024. وهو رقم يخص الولاية، وتُحدَّد ضريبة العقار من قِبل الحكومات المحلية، لذا يكون المعدل في مقاطعة أو مدينة محددة عادةً رقمًا مختلفًا. يبقى الحقل قابلًا للتعديل، ويستخدم المقارنة ما يكتبه القارئ.",
        "The crossover gets later when the rent is low relative to the purchase\nprice, when the rate is high, when the horizon is short, and when the\nappreciation assumption is low or negative. It never arrives at all when\nrent is small relative to the purchase price, which is the arithmetic reason\na cash purchase in an expensive market can be the more expensive option\nover five years.":
            "يتأخر تقاطع الخيارين عندما يكون الإيجار منخفضًا بالنسبة إلى سعر الشراء، عندما يكون السعر مرتفعًا، عندما تكون الأفق الزمنية قصيرة، وعندما يكون افتراض نمو رأس المال منخفضًا أو سالبًا. لا يأتي التقاطع إطلاقًا عندما يكون الإيجار صغيرًا بالنسبة إلى سعر الشراء، وهذا هو السبب الحسابي الذي يجعل الشراء نقدًا في سوق مكلف قد يكون الخيارالأعلى تكلفة خلال خمس سنوات.",
    },
    "uk": {
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧Оцінювач податків.⟦1⟧ Місцева податкова інспекція публікує оціночну вартість і застосовну ставку для конкретної адреси. Це дає оцінку, засновану на фактичній юрисдикції, а не на національному середньому значенні.\n2. ⟦2⟧Кошторис страхування для конкретної адреси.⟦3⟧ Кошториси безкоштовні, а число розраховує модель, яка фактично встановить ціну поліса. Зазначений показник — це вартість заміни, а не лише страхова премія.\n3. ⟦4⟧Розрахунок ескроу від кредитора.⟦5⟧ Після оформлення кредиту кредитор розраховує платіж на ескроу на основі власних показників. Це не зобов’язання на наступний рік, і сума зміниться, коли надійдуть податковий рахунок і продовження страхування.",
        "Compound interest is one of the few ideas in finance that is genuinely\n"
        "simple to state and genuinely hard to feel. The\n"
        "⟦0⟧compound interest calculator⟦1⟧ on this\n"
        "site exists to make the arithmetic visible, because the arithmetic is what\n"
        "distinguishes this from a rule of thumb.":
            "Складний відсоток — одна з небагатьох ідей у фінансах, яку справді легко "
            "сформулювати і справді важко відчути. ⟦0⟧Калькулятор складного відсотка⟦1⟧ на "
            "цьому сайті існує для того, щоб показати арифметику: саме арифметика "
            "відрізняє це від правила великого пальця.",

        "The\n"
        "⟦0⟧compound interest calculator⟦1⟧\n"
        "computes the effective rate directly, and it is shown in the results next to\n"
        "the nominal rate so the two can be compared.":
            "⟦0⟧Калькулятор складного відсотка⟦1⟧ обчислює ефективну ставку напряму, і вона "
            "показана в результатах поруч із номінальною ставкою, щоб їх можна було порівняти.",

        "\nThe federal income tax on a year of earnings is a published table applied to a\n"
        "number that is assembled in a few steps. The\n"
        "⟦0⟧income tax calculator⟦1⟧ on this site performs\n"
        "those steps in order and shows the working. The 2026 figures it uses come from\n"
        "Rev. Proc. 2025-32, published in Internal Revenue Bulletin 2025-45 on\n"
        "3 November 2025.":
            "\nФедеральний податок на доходи за рік — це опублікована таблиця, застосована до "
            "числа, яке збирається у кілька кроків. ⟦0⟧Калькулятор податку на доходи⟦1⟧ на цьому "
            "сайті виконує ці кроки по черзі й показує розрахунок. Числа за 2026 рік він бере з "
            "Rev. Proc. 2025-32, опублікованої в Internal Revenue Bulletin 2025-45 "
            "3 листопада 2025 року.",
    },
    "tl": {
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧Ang tax assessor.⟦1⟧ Inilathala ng lokal na tanggapan ng tax assessor ang assessed\n   value at ang naaangkop na rate para sa isang partikular na address. Nagbibigay\n   ito ng estimate batay sa aktuwal na hurisdiksyon sa halip na pambansang\n   average.\n2. ⟦2⟧Ang insurance quote para sa partikular na address.⟦3⟧ Libreng ang mga quote, at ang\n   numero ay galing sa modelo na talagang gagawa ng presyo ng policy. Ang\n   numerong ibinigay ay ang replacement cost, hindi lamang ang premium.\n3. ⟦4⟧Ang escrow estimate ng lender.⟦5⟧ Kapag naitakda na ang loan, nagkakalkula ang lender\n   ng escrow payment batay sa sariling mga bilang. Ito ay hindi pangako para sa\n   susunod na taon, at magbabago ito kapag dumating ang tax bill at ang\n   pag-renew ng insurance.",
        "Pre-tax deductions come out first. A 401(k) contribution, an HSA\n"
        "   contribution and an FSA contribution are all taken out of the wage before\n"
        "   anything else. What each one does to the taxes is not the same, and the\n"
        "   section below sets out which is which.\n"
        "2. The standard deduction comes out of the remaining wages. For 2026 it is\n"
        "   $16,100 for a single filer, $32,200 for married filing jointly and $24,150\n"
        "   for head of household. What is left is taxable income, and that is the\n"
        "   amount the federal brackets are applied to.\n"
        "3. Federal income tax is computed on taxable income.\n"
        "4. Social Security is charged at 6.2% on the wages, up to the taxable maximum\n"
        "   of $184,500 for 2026.\n"
        "5. Medicare is charged at 1.45% on all wages, with no ceiling.\n"
        "6. The Additional Medicare Tax is charged at 0.9% on the wages above the\n"
        "   threshold for the filing status.\n"
        "7. State income tax is applied at the rate entered on the page.":
            "Una ang mga bawas bago ang tax. Ang ambag sa 401(k), ambag sa HSA, at ambag "
            "sa FSA ay lahat kinuha mula sa sahod bago ang anumang iba pa. Hindi "
            "magkapantay ang epekto ng bawat isa sa mga buwis, at nakasaad sa bahagi sa "
            "ibaba kung alin ang alin.\n"
            "2. Ang standard deduction ay kinuha mula sa natitirang sahod. Para sa 2026, "
            "ito ay $16,100 para sa isang mag-isyang single filer, $32,200 para sa "
            "mag-asawang married filing jointly, at $24,150 para sa head of household. "
            "Ang natitira ay taxable income, at ito ang halagang pinapatakbo ng mga "
            "bracket ng federal income tax.\n"
            "3. Ang federal income tax ay kinakalkula batay sa taxable income.\n"
            "4. Ang Social Security ay 6.2% ng sahod, hanggang sa taxable maximum na "
            "$184,500 para sa 2026.\n"
            "5. Ang Medicare ay 1.45% ng lahat ng sahod, walang ceiling.\n"
            "6. Ang Additional Medicare Tax ay 0.9% ng sahod na higit sa threshold para "
            "sa filing status.\n"
            "7. Ang state income tax ay ipinatutupad ayon sa rate na inilagay sa pahina.",

        "The state starts from the adjusted gross income, which is the gross income\n"
        "   less the pre-tax deductions.\n"
        "2. The state's own standard deduction comes off, where the state has one, and\n"
        "   so does the personal exemption where the state gives it as an exclusion.\n"
        "3. What is left is taxed with the state's own brackets, slice by slice: each\n"
        "   part of the income is taxed at the rate of the bracket it falls into, which\n"
        "   is why a progressive state costs more than a flat one.\n"
        "4. The credits come off the tax. A state that gives its exemption or its\n"
        "   standard deduction as a credit instead of an exclusion gets it here, and so\n"
        "   do the state earned income tax credit and the state child tax credit where\n"
        "   the model carries them.":
            "Nagsisimula ang estado mula sa adjusted gross income, na siya gross income\n"
            "   minus mga pre-tax deductions.\n"
            "2. Deduktahin ang sariling standard deduction ng estado kung mayroon ito, "
            "gayundin ang personal exemption kung ibinibigay ito ng estado bilang "
            "exclusion.\n"
            "3. Taxable sa sariling brackets ng estado ang natitira, bahagi kada bahagi: "
            "ang bawat bahagi ng kita ay taxa sa rate ng bracket kung saan ito "
            "nabibilang, kaya mas mahal ang isang progressive state kaysa sa isang flat "
            "state.\n"
            "4. Deduktahin ang mga credit sa tax. Kung ibinibigay ng isang estado ang "
            "exemption o standard deduction nito bilang credit sa halip na exclusion, "
            "makukuha ito rito, gayundin ang state earned income tax credit at state "
            "child tax credit kung kasama ang mga ito sa model.",

        "⟦1⟧(1 + nominal) = (1 + real) × (1 + inflation)⟦0⟧":
            "⟦1⟧(1 + nominal) = (1 + real) × (1 + inflation)⟦0⟧",

        "⟦1⟧real = (1 + nominal) / (1 + inflation) − 1⟦0⟧":
            "⟦1⟧real = (1 + nominal) / (1 + inflation) − 1⟦0⟧",
    },
    "zh": {
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧税务评估机构。⟦1⟧当地评估机构会公布特定地址的评估价值和适用税率。这项估算以实际管辖地区为依据，而不是使用全国平均值。\n2. ⟦2⟧针对特定地址的保险报价。⟦3⟧报价免费，而且该数字由实际为保单定价的模型生成。所报的数字是重建成本，而不只是保费。\n3. ⟦4⟧贷款机构的托管款估算。⟦5⟧贷款发放后，贷款机构会根据自己的数据计算托管款。这不是对下一年的保证，税收账单和保险续保后，托管款也会随之变动。",
    },

    "vi": {
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧Cơ quan định giá thuế.⟦1⟧ Văn phòng định giá địa phương công bố giá trị xác định và thuế suất áp dụng cho một địa chỉ cụ thể. Điều này cung cấp một ước tính dựa trên khu vực pháp lý thực tế thay vì mức trung bình toàn quốc.\n2. ⟦2⟧Báo giá bảo hiểm cho địa chỉ cụ thể.⟦3⟧ Báo giá miễn phí, và con số được tạo ra bởi mô hình sẽ thực sự định giá hợp đồng bảo hiểm. Con số được nêu là chi phí thay thế, không chỉ khoản bảo hiểm.\n3. ⟦4⟧Ước tính escrow của bên cho vay.⟦5⟧ Sau khi có khoản vay, bên cho vay tính khoản thanh toán escrow dựa trên số liệu của chính họ. Đây không phải là cam kết cho năm tiếp theo, và khoản này sẽ thay đổi khi hóa đơn thuế và gia hạn bảo hiểm đến.",
    },

    "pt": {
        "⟦0⟧The tax assessor.⟦1⟧ The local assessor's office publishes the assessed\n   value and the applicable rate for a specific address. That gives an\n   estimate grounded in the actual jurisdiction rather than in a national\n   average.\n2. ⟦2⟧An insurance quote for the specific address.⟦3⟧ Quotes are free, and the\n   number is produced by the model that will actually price the policy. Ask\n   for the replacement cost figure, not only the premium.\n3. ⟦4⟧The lender's escrow estimate.⟦5⟧ Once a loan is in place, the lender\n   computes an escrow payment based on its own figures. It is not a promise\n   for the following year, and it will move when the tax bill and the\n   insurance renewal arrive.":
            "⟦0⟧O assessor de imóveis.⟦1⟧ O escritório local do assessor de imóveis publica o valor\n   avaliado e a alíquota aplicável a um endereço específico. Isso fornece uma\n   estimativa baseada na jurisdição real, e não em uma média nacional.\n2. ⟦2⟧Uma cotação de seguro para o endereço específico.⟦3⟧ As cotações são gratuitas, e o\n   número é produzido pelo modelo que realmente precificará a apólice. O valor\n   informado é o custo de reposição, não apenas o prêmio.\n3. ⟦4⟧A estimativa de custódia do credor.⟦5⟧ Depois que o empréstimo é contratado, o credor\n   calcula um pagamento de custódia com base em seus próprios números. Isso\n   não é uma promessa para o ano seguinte, e o valor muda quando chegam a\n   conta de impostos e a renovação do seguro.",
    },

}


def normalise(text: str) -> str:
    """The piece as a plain sentence, so that a piece and its key match.

    The markers stand for the markup that is protected before the piece is
    sent away, and the emphasis marks are what they stand for. Both are
    taken off here, so that a key written one way finds the piece written
    the other way.
    """
    text = re.sub(r"⟦\d+⟧|\[\[\d+\]\]", " ", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.replace("*", " ")
    return " ".join(text.split())


def main() -> int:
    translator = Translator(verbose=False)
    guide = tg.GuideTranslator("ar", translator)

    # Every piece of every guide, with the key the cache holds it under.
    pieces: list[tuple[str, str, str]] = []
    for path in sorted(Path(ROOT / "app" / "src" / "content" / "guides").glob("*.mdx")):
        collected = guide.collect(path)
        for kind in ("front_pieces", "prose_pieces"):
            for piece in collected[kind]:
                if not piece.strip():
                    continue
                guarded = piece if is_formula(piece) else protect(piece, tg.PROSE_PATTERNS)[0]
                pieces.append((piece, guarded, path.name))

    written = 0
    for locale, entries in TRANSLATIONS.items():
        for source, translation in entries.items():
            needle = normalise(source)
            found = [item for item in pieces if normalise(item[0]) == needle]
            if not found:
                print(f"!! {locale}: no piece matches {needle[:70]!r}")
                continue
            for piece, guarded, name in found:
                path = translator._cache_path(locale, guarded, tg.CONTEXT)
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(translation, encoding="utf-8")
                written += 1
                print(f"{locale}: {name} -> {path.name}")
    print(f"wrote {written} translations by hand")
    return 0


if __name__ == "__main__":
    sys.exit(main())
