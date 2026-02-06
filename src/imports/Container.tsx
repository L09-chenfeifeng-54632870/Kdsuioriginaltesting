function Icon() {
  return (
    <div className="absolute left-[26px] size-[32px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M20 24L12 16L20 8" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[56px] opacity-50 relative rounded-[8px] shrink-0 w-[134.383px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[87.5px] not-italic text-[#0a0a0a] text-[20px] text-center text-nowrap top-[14px] tracking-[-0.4492px] translate-x-[-50%]">Prev</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[21.5px] items-start left-[36.14px] top-[13px] w-[5.203px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[#90a1b9] text-[18px] text-center text-nowrap tracking-[-0.4395px]">/</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-white h-[47px] relative rounded-[10px] shrink-0 w-[80px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[28px] left-[25.24px] not-italic text-[#45556c] text-[20px] text-center top-[9px] tracking-[-0.4492px] translate-x-[-50%] w-[15px]">1</p>
        <Text />
        <p className="absolute font-['Inter:Black',sans-serif] font-black leading-[28px] left-[53.84px] not-italic text-[#45556c] text-[20px] text-center top-[9px] tracking-[-0.4492px] translate-x-[-50%] w-[17px]">2</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[78.08px] size-[32px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M12 24L20 16L12 8" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[56px] relative rounded-[8px] shrink-0 w-[136.078px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-[48.5px] not-italic text-[#0a0a0a] text-[20px] text-center text-nowrap top-[14px] tracking-[-0.4492px] translate-x-[-50%]">Next</p>
        <Icon1 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-[#f1f5f9] relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[37px] items-center pb-0 pl-[442px] pr-[-42.797px] pt-px relative size-full">
          <Button />
          <Text1 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}