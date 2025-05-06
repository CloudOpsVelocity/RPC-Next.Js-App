import React from "react";

type Props = {};

export default function page({}: Props) {
  class Device {
    static device: "mobile" | "desktop" = "mobile";
  }
  class DevicePlatForm extends Device {
    static platform: "ios" | "android" = "android";
  }
  class Laptop extends DevicePlatForm {
    private battery: string;
    constructor({ battery }: { battery: string }) {
      super();
      this.battery = battery;
    }
  }
  const laptop = new Laptop({
    battery: "80vh",
  });
  console.log(laptop);

  return <div className="mt-[10%]">{JSON.stringify(laptop)}</div>;
}
