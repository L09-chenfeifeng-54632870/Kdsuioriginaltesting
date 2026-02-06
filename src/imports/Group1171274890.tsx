import svgPaths from "./svg-ssspvjrr1y";
import imgLogo1 from "figma:asset/b8f6e95143c0e9b4b54a068565ae8f43e31e8ea3.png";

function Group2() {
  return (
    <div className="absolute inset-[31.71%_87.22%_29.27%_11.67%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="face-agent">
          <path d={svgPaths.p2cb99140} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[26.83%_51.18%_24.39%_11.67%]">
      <Group2 />
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal inset-[26.83%_51.18%_24.39%_13.33%] leading-[20px] opacity-80 text-[14px] text-nowrap text-white tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`support@posking.ca   |   604-808-6721 (Vancouver)   |   647-519-8366 (Toronto)`}</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[31.71%_45%_29.27%_53.89%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="account-tie-woman">
          <path d={svgPaths.p7566b00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[26.83%_10.07%_24.39%_53.89%]">
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal inset-[26.83%_10.07%_24.39%_55.56%] leading-[20px] opacity-80 text-[0px] text-[14px] text-nowrap text-white tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span>{`sales@posking.ca   |   `}</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>604-</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>270</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>-</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>9898</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>{` (Vancouver)`}</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>{`   |   `}</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>647-891-3999 (Toronto)</span>
      </p>
      <Group3 />
    </div>
  );
}

function Setting() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Setting">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_161_10956)" id="Setting">
          <path d={svgPaths.p11355600} fill="var(--fill-0, #1B1B1B)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_161_10956">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0" data-name="Icon-Wrapper">
      <Setting />
    </div>
  );
}

function Component24P() {
  return (
    <div className="absolute bg-white content-stretch flex inset-[17.07%_0.9%_14.63%_97.15%] items-center justify-center overflow-clip p-[11px] rounded-[100px] shadow-[1px_1px_1px_0px_rgba(0,0,0,0.25)]" data-name="24p">
      <IconWrapper />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[17.07%_0.9%_14.63%_93.26%]">
      <Component24P />
      <p className="absolute font-['Roboto:Regular',sans-serif] font-normal inset-[36.59%_3.82%_26.83%_93.26%] leading-[normal] text-[14px] text-right text-white" style={{ fontVariationSettings: "'wdth' 100" }}>{`1.5.39 `}</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_91.17%_0_0]">
      <div className="absolute inset-[0_91.17%_0_0]" data-name="logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo1} />
      </div>
    </div>
  );
}

export default function Group6() {
  return (
    <div className="relative size-full">
      <div className="absolute backdrop-blur-[75px] backdrop-filter bg-[rgba(37,35,35,0.5)] inset-0 shadow-[0px_20px_100px_0px_rgba(0,0,0,0.1)]" />
      <Group4 />
      <Group5 />
      <Group1 />
      <Group />
    </div>
  );
}