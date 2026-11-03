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
    },
    "uk": {
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
        "⟦1⟧(1 + nominal) = (1 + real) × (1 + inflation)⟦0⟧":
            "⟦1⟧(1 + nominal) = (1 + real) × (1 + inflation)⟦0⟧",

        "⟦1⟧real = (1 + nominal) / (1 + inflation) − 1⟦0⟧":
            "⟦1⟧real = (1 + nominal) / (1 + inflation) − 1⟦0⟧",
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
