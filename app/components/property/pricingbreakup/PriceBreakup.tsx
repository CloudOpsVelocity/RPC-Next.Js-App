"use client";
import React from "react";
import { Drawer } from "@mantine/core";
import styles from "./PriceBreakup.module.css";
import Card from "./Card";
import {
  ApplicablePricing,
  MoneyIcon,
  SellingIcon,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property";
import SellingPrice from "./SellingPrice";
import { usePricingPop } from "@/app/hooks/property/usePricingPop";
export default function PriceBreakup({
  otherPrice,
  price,
  type,
}: {
  otherPrice: Main["otherPrice"];
  price: number;
  type: string;
}) {
  const filterOtherDetails =
    otherPrice &&
    Object?.keys(otherPrice).filter(
      (item) =>
        ![
          "otherCharge",
          "price",
          "securetyType",
          "clubHouseTill",
          "securityMonth",
          "security",
        ].includes(item)
    );

  const sum = filterOtherDetails?.reduce(
    (a, b) =>
      b !== "price" &&
      !(b === "clubHouseCharge" && otherPrice.clubHouseCharge === "A") &&
      otherPrice[b] !== "NA" &&
      otherPrice[b] !== "A"
        ? Number(a) +
          (b === "otherCharge"
            ? parseOtherCharge(otherPrice[b])
            : Number(otherPrice[b] || "0"))
        : Number(a),
    0
  );

  function parseOtherCharge(otherChargeString: string): number {
    let sum = 0;

    if (otherChargeString) {
      const charges: string[] = otherChargeString.split(",");
      charges.forEach((charge: string) => {
        const parts: string[] = charge.split("|");
        if (parts.length === 2) {
          const value: number = parseFloat(parts[1].trim());
          if (!isNaN(value)) {
            sum += value;
          }
        }
      });
    }

    return sum;
  }
  const otherChangeTotal = parseOtherCharge(otherPrice?.otherCharge);
  const chargesArray = otherPrice?.otherCharge?.split(",");
  const [opened, { open, close }] = usePricingPop();

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Price breakup"
      position="right"
      zIndex={1000}
      classNames={{
        close: styles.close,
        title: styles.title,
      }}
      size={"35%"}
      className="!relative"
    >
      <div className="space-y-8">
        <Card
          title={type + " Price"}
          Icon={SellingIcon}
          type="price"
          data={"₹ " + price}
        />
        <Card
          title="applicable charges"
          Icon={ApplicablePricing}
          type="applicableprice"
          data={filterOtherDetails}
          otherPrice={otherPrice}
        />

        {otherPrice?.otherCharge && (
          <Card
            title="Other charges"
            Icon={MoneyIcon}
            type="otherprice"
            data={chargesArray}
            otherPrice={otherPrice}
          />
        )}
        <SellingPrice
          price={sum + price + otherChangeTotal}
          otherPrice={otherPrice}
          type={type}
        />
      </div>

      {/* Drawer content */}
    </Drawer>
  );
}
