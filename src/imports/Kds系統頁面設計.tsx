import svgPaths from "./svg-hgg5k7ekhs";

function Container() {
  return (
    <div className="bg-white h-[42px] relative rounded-[10px] shrink-0 w-[69.938px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[32px] left-[13px] not-italic text-[#c10007] text-[24px] text-nowrap top-[5px] tracking-[0.0703px]">T14</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[36px] relative shrink-0 w-[147px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[36px] left-[0.06px] not-italic text-[30px] text-white top-0 tracking-[-0.3545px] w-[121px]">#1014</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[42px] items-center left-[16px] top-[12px] w-[171.164px]" data-name="Container">
      <Container />
      <Text />
    </div>
  );
}

function Icon() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%_20.83%_8.33%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-5.26%_-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 17.5">
              <path d={svgPaths.p212e0500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(0,0,0,0.1)] relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_116_3049)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #FFE2E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 5V10L13.3333 11.6667" id="Vector_2" stroke="var(--stroke-0, #FFE2E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_116_3049">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#ffe2e2] text-[20px] text-nowrap top-[0.5px]">924:34</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 bg-[rgba(193,0,7,0.5)] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[8px] py-0 relative size-full">
          <Icon1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[690.41px] top-[15px] w-[158.25px]" data-name="Container">
      <Button />
      <Container3 />
    </div>
  );
}

function OrderCard() {
  return (
    <div className="bg-[#e7000b] h-[66px] relative shrink-0 w-[864.664px]" data-name="OrderCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container1 />
        <Container4 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[54px]">1x</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Beef Noodle Soup</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">牛肉麵</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text2 />
      <Container5 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[8px] rounded-[6px] top-[438px] w-[416.328px]" data-name="Container">
      <Container6 />
      <Button1 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Cucumber Salad</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">拍黃瓜</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text5 />
      <Container8 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container9 />
      <Button2 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Egg Fried Rice</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">蛋炒飯</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text8 />
      <Container11 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon4 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container12 />
      <Button3 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[52px]">1x</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Kung Pao Chicken</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">宮保雞丁</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text11 />
      <Container14 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon5 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container15 />
      <Button4 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Steamed Fish</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">清蒸石斑</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text14 />
      <Container17 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon6 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container18 />
      <Button5 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[54px]">1x</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Beef Noodle Soup</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">牛肉麵</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text17 />
      <Container20 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon7 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container21 />
      <Button6 />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[54px]">1x</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Lamp Noodle Soup</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">羊肉肉麵</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text21 />
      <Text22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text20 />
      <Container23 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon8 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container24 />
      <Button7 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[54px]">1x</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Chicken Noodle Soup</p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">雞肉麵</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text24 />
      <Text25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[60px] left-[9px] top-[9px] w-[334.328px]" data-name="Container">
      <Text23 />
      <Container26 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[359.33px] p-[2px] rounded-[14px] size-[48px] top-[11px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon9 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[78px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container27 />
      <Button8 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[8px] top-[8px] w-[416.328px]">
      <Container10 />
      <Container13 />
      <Container16 />
      <Container13 />
      <Container19 />
      <Container22 />
      <Container25 />
      <Container28 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[47.67px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Cucumber Salad</p>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">拍黃瓜</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text27 />
      <Text28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text26 />
      <Container29 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon10 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[440.33px] rounded-[6px] top-[8px] w-[416.328px]" data-name="Container">
      <Container30 />
      <Button9 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[47.67px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Beef Noodle Soup</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">牛肉麵</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text30 />
      <Text31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text29 />
      <Container32 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon11 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[440.33px] rounded-[6px] top-[94px] w-[416.328px]" data-name="Container">
      <Container33 />
      <Button10 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[47.67px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Steamed Fish</p>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">清蒸石斑</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text33 />
      <Text34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text32 />
      <Container35 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon12 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[440.33px] rounded-[6px] top-[180px] w-[416.328px]" data-name="Container">
      <Container36 />
      <Button11 />
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[47.67px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text36() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Egg Fried Rice</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">蛋炒飯</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text36 />
      <Text37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text35 />
      <Container38 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon13 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[440.33px] rounded-[6px] top-[266px] w-[416.328px]" data-name="Container">
      <Container39 />
      <Button12 />
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[47.67px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Steamed Fish</p>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">清蒸石斑</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text39 />
      <Text40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text38 />
      <Container41 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon14 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[440.33px] rounded-[6px] top-[352px] w-[416.328px]" data-name="Container">
      <Container42 />
      <Button13 />
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[47.67px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text42() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Dim Sum</p>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[28px] relative shrink-0 w-[278.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">點心拼盤</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[278.328px]" data-name="Container">
      <Text42 />
      <Text43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[334.328px]" data-name="Container">
      <Text41 />
      <Container44 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[358.33px] p-[2px] rounded-[14px] size-[48px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon15 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute border border-[rgba(0,0,0,0.1)] border-solid h-[78px] left-[440.33px] rounded-[6px] top-[438px] w-[416.328px]" data-name="Container">
      <Container45 />
      <Button14 />
    </div>
  );
}

function OrderCard1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-[864.664px]" data-name="OrderCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Frame />
        <Container31 />
        <Container34 />
        <Container37 />
        <Container40 />
        <Container43 />
        <Container46 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white h-[770px] left-0 rounded-[14px] top-0 w-[868.664px]" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <OrderCard />
        <OrderCard1 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ffc9c9] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-white h-[42px] relative rounded-[10px] shrink-0 w-[69.352px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[32px] left-[13px] not-italic text-[#c10007] text-[24px] text-nowrap top-[5px] tracking-[0.0703px]">T15</p>
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[36px] left-[-0.02px] not-italic text-[30px] text-white top-0 tracking-[-0.3545px] w-[114px]">#1015</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[42px] items-center left-[16px] top-[12px] w-[169.844px]" data-name="Container">
      <Container47 />
      <Text44 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%_20.83%_8.33%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-5.26%_-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 17.5">
              <path d={svgPaths.p212e0500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[rgba(0,0,0,0.1)] relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <Container49 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_116_3049)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #FFE2E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 5V10L13.3333 11.6667" id="Vector_2" stroke="var(--stroke-0, #FFE2E2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_116_3049">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text45() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#ffe2e2] text-[20px] text-nowrap top-[0.5px]">905:34</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 bg-[rgba(193,0,7,0.5)] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[8px] py-0 relative size-full">
          <Icon17 />
          <Text45 />
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[36px] items-center left-[248.09px] top-[15px] w-[158.25px]" data-name="Container">
      <Button15 />
      <Container50 />
    </div>
  );
}

function OrderCard2() {
  return (
    <div className="bg-[#e7000b] h-[66px] relative shrink-0 w-[422.336px]" data-name="OrderCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container48 />
        <Container51 />
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48.34px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[55px]">1x</p>
    </div>
  );
}

function Text47() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Beef Noodle Soup</p>
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[28px] relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">牛肉麵</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[262.336px]" data-name="Container">
      <Text47 />
      <Text48 />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[318.336px]" data-name="Container">
      <Text46 />
      <Container52 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[342.34px] p-[2px] rounded-[14px] size-[56px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon18 />
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[77px] relative shrink-0 w-[406.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container53 />
        <Button16 />
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48.34px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text50() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Steamed Fish</p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[28px] relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">清蒸石斑</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[262.336px]" data-name="Container">
      <Text50 />
      <Text51 />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[318.336px]" data-name="Container">
      <Text49 />
      <Container55 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[342.34px] p-[2px] rounded-[14px] size-[56px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon19 />
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-[#f8fafc] h-[77px] relative shrink-0 w-[406.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container56 />
        <Button17 />
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48.34px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text53() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Steamed Fish</p>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[28px] relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">清蒸石斑</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[262.336px]" data-name="Container">
      <Text53 />
      <Text54 />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[318.336px]" data-name="Container">
      <Text52 />
      <Container58 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button18() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[342.34px] p-[2px] rounded-[14px] size-[56px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon20 />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[77px] relative shrink-0 w-[406.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container59 />
        <Button18 />
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48.34px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text56() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Egg Fried Rice</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[28px] relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">蛋炒飯</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[262.336px]" data-name="Container">
      <Text56 />
      <Text57 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[318.336px]" data-name="Container">
      <Text55 />
      <Container61 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[342.34px] p-[2px] rounded-[14px] size-[56px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon21 />
    </div>
  );
}

function Container63() {
  return (
    <div className="bg-[#f8fafc] h-[77px] relative shrink-0 w-[406.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container62 />
        <Button19 />
      </div>
    </div>
  );
}

function Text58() {
  return (
    <div className="absolute h-[30px] left-0 top-[2px] w-[48px]" data-name="Text">
      <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[30px] left-[48.34px] not-italic text-[30px] text-black text-right top-0 tracking-[0.3955px] translate-x-[-100%] w-[48px]">1x</p>
    </div>
  );
}

function Text59() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-0 not-italic text-[#0a0a0a] text-[24px] text-nowrap top-0 tracking-[0.0703px]">Wonton Soup</p>
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[28px] relative shrink-0 w-[262.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_JP:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#0f172b] text-[20px] text-nowrap top-0 tracking-[-0.4492px]">餛飩湯</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[60px] items-start left-[56px] top-0 w-[262.336px]" data-name="Container">
      <Text59 />
      <Text60 />
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute h-[60px] left-[8px] top-[8px] w-[318.336px]" data-name="Container">
      <Text58 />
      <Container64 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p12dd8dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="absolute bg-[#096] content-stretch flex items-center justify-center left-[342.34px] p-[2px] rounded-[14px] size-[56px] top-[10px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.1)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon22 />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[77px] relative shrink-0 w-[406.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container65 />
        <Button20 />
      </div>
    </div>
  );
}

function OrderCard3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-[422.336px]" data-name="OrderCard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-0 pl-[8px] pr-0 pt-[8px] relative rounded-[inherit] size-full">
        <Container54 />
        <Container57 />
        <Container60 />
        <Container63 />
        <Container66 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white h-[770px] left-[884.66px] rounded-[14px] top-0 w-[426.336px]" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <OrderCard2 />
        <OrderCard3 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ffc9c9] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container67() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1311px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Card />
        <Card1 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[165.43px] size-[32px] top-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M20 24L12 16L20 8" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button21() {
  return (
    <div className="absolute bg-white border-2 border-[rgba(0,0,0,0)] border-solid h-[80px] left-0 rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[426.328px]" data-name="Button">
      <Icon23 />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[231.43px] not-italic text-[#0a0a0a] text-[20px] text-center text-nowrap top-[24px] tracking-[-0.4492px] translate-x-[-50%]">PREV</p>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[32px] relative shrink-0 w-[134.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[32px] left-[-0.11px] not-italic text-[#314158] text-[24px] top-0 tracking-[0.0703px] w-[143px]">PAGE 8 / 36</p>
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[24px] relative shrink-0 w-[115.492px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#717182] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[116px]">94 Total Orders</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56px] items-center justify-center left-[442.33px] top-[12px] w-[426.336px]" data-name="Container">
      <Text61 />
      <Text62 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-[227.59px] size-[32px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M12 24L20 16L12 8" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="absolute bg-[#0f172b] h-[80px] left-[884.66px] rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[426.336px]" data-name="Button">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[192.75px] not-italic text-[20px] text-center text-nowrap text-white top-[26px] tracking-[-0.4492px] translate-x-[-50%]">NEXT</p>
      <Icon24 />
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[80px] relative shrink-0 w-[1311px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button21 />
        <Container68 />
        <Button22 />
      </div>
    </div>
  );
}

function GridMode() {
  return (
    <div className="basis-0 bg-[rgba(236,236,240,0.1)] grow h-[898px] min-h-px min-w-px relative shrink-0" data-name="GridMode">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pl-[16px] pr-0 py-[16px] relative size-full">
          <Container67 />
          <Container69 />
        </div>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[33.6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.6001 33.6001">
        <g id="Icon">
          <path d={svgPaths.p3d594800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.80001" />
          <path d={svgPaths.p91a8cf0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.80001" />
          <path d={svgPaths.pbb7e400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.80001" />
          <path d={svgPaths.p32880e00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.80001" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="absolute bg-[#030213] content-stretch flex h-[67.2px] items-center justify-center left-[10.22px] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[-1.6px] w-[74.55px]" data-name="Button">
      <Icon25 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p6c1d480} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M9.33333 2.66667V29.3333" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p48aa700} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[12px] rounded-[16px] top-[88px] w-[71px]" data-name="Button">
      <Icon26 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M4 16H4.01333" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M4 24H4.01333" id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M4 8H4.01333" id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M10.6667 16H28" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M10.6667 24H28" id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M10.6667 8H28" id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[12px] rounded-[16px] top-[176px] w-[71px]" data-name="Button">
      <Icon27 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1f3ed880} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p76546be} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pc532a80} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p22e99500} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute content-stretch flex h-[64px] items-center justify-center left-[12px] rounded-[16px] top-[264px] w-[71px]" data-name="Button">
      <Icon28 />
    </div>
  );
}

function Container70() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[95px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button23 />
        <Button24 />
        <Button25 />
        <Button26 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p8271400} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M4 4V10.6667H10.6667" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button27() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px opacity-30 relative rounded-[16px] shrink-0 w-[71px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#ffc9c9] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Icon29 />
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[16px] relative shrink-0 w-[42.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px">Revoke</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[84px] relative shrink-0 w-[71px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Button27 />
        <Text63 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-white h-[898px] relative shrink-0 w-[96px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pl-px pr-0 py-[24px] relative size-full">
        <Container70 />
        <Container71 />
      </div>
    </div>
  );
}

function Section() {
  return <div className="h-[898px] shrink-0 w-0" data-name="Section" />;
}

export default function Kds() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="KDS 系統頁面設計">
      <GridMode />
      <Sidebar />
      <Section />
    </div>
  );
}