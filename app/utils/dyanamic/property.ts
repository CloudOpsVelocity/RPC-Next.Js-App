import { Main } from "@/app/validations/property";

function createPropertyString(data: Main): string {
  return `${data.propName} | ${data.bhkName} | Tower ${data.tower} | Floor ${data.atFloor} | Unit No. ${data.unitNumber} | ${data.facingName} | Area: ${data.sba} sq.ft`;
}

export { createPropertyString };
