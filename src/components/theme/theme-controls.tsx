"use client";

import { useThemeStore } from "@/store/theme-store";
import { SliderWithInput } from "./slider-with-input";
// import ShadowControl from "./shadow-control";
import { ThemeStyleProps } from "@/types/theme";
import ControlSection from "./control-section";

export function ThemeControls() {
  const { mode, styles, updateStyle } = useThemeStore();
  const currentStyles = styles[mode];

  const unitMap: Partial<Record<keyof ThemeStyleProps, string>> = {
    radius: "rem",
    "letter-spacing": "em",
    "shadow-blur": "px",
    "shadow-spread": "px",
    "shadow-offset-x": "px",
    "shadow-offset-y": "px",
  };

  const handleUpdate = (key: keyof ThemeStyleProps, value: string | number) => {
    const unit = unitMap[key];
    const finalValue = typeof value === "number" && unit ? `${value}${unit}` : String(value);
    updateStyle(mode, key, finalValue);
  };

  return (
    <div className="container mx-auto grid grid-cols-2 gap-4">
      <ControlSection title="Radius" expanded>
        <SliderWithInput
          value={parseFloat(currentStyles.radius?.replace("rem", "") || "0.625")}
          onChange={(value) => handleUpdate("radius", value)}
          min={0}
          max={2}
          step={0.1}
          label="Radius"
          unit="rem"
        />
      </ControlSection>
      <ControlSection title="Spacing" expanded>
        <SliderWithInput
          value={parseFloat(currentStyles["letter-spacing"]?.replace("em", "") || "0")}
          onChange={(value) => handleUpdate("letter-spacing", value)}
          min={-0.1}
          max={0.1}
          step={0.01}
          label="Letter Spacing"
          unit="em"
        />
      </ControlSection>

      {/*<div className="col-span-2">*/}
      {/*    <ShadowControl*/}
      {/*        shadowColor={currentStyles["shadow-color"] || "hsl(0 0% 0%)"}*/}
      {/*        shadowOpacity={parseFloat(currentStyles["shadow-opacity"] || "0.1")}*/}
      {/*        shadowBlur={parseFloat(currentStyles["shadow-blur"]?.replace("px", "") || "3")}*/}
      {/*        shadowSpread={parseFloat(currentStyles["shadow-spread"]?.replace("px", "") || "0")}*/}
      {/*        shadowOffsetX={parseFloat(currentStyles["shadow-offset-x"]?.replace("px", "") || "0")}*/}
      {/*        shadowOffsetY={parseFloat(currentStyles["shadow-offset-y"]?.replace("px", "") || "1")}*/}
      {/*        onChange={handleUpdate}*/}
      {/*    />*/}
      {/*</div>*/}
    </div>
  );
}
