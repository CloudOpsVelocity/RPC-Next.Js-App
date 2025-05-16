import React from "react";
import Styles from "@/app/styles/seach/searchCrad.module.css";
import { ApprovedNamesSectionData } from "./searchData";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { sqftToAcres } from "@/app/utils/landarea";
import { useQuery } from "react-query";

type Props = {
  approvedNamesData: ApprovedNamesSectionData;
};

const DownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: any;
  Icon?: React.JSX.Element;
}) => {
  return value ? (
    <h4 className={Styles.downSectionCardMainCon}>
      <span className={Styles.downSectionCardIconSpan}>
        {Icon ?? ""} {label}:
      </span>
      <span className={Styles.downSectionCardValue}>{value}</span>
    </h4>
  ) : null;
};

function SearchCardApprovedNames({ approvedNamesData }: Props) {
  const {
    landArea,
    type,
    ca,
    sba,
    propertyAge,
    propTypeName,
    pa,
    maxSba,
    minSba,
    minCa,
    maxCa,
    noOfUnits,
    parking,
    balcony,
    bathroom,
    ownership,
    coverParking,
    propTypeId,
    minPa,
    maxPa,
    propStatus,
    towerData,
    availableFor,
    projAuthority,
    approvedById,
  } = approvedNamesData;

  const isPlot = propTypeId == 32;
  const isRent = type === "Rent";
  const formatter = new Intl.NumberFormat("en-in", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getApprovedFirstName = (item: string) => {
    if (item.includes(" - ")) {
      return item.split(" - ")[0];
    } else if (item.includes(" – ")) {
      return item.split(" – ")[0];
    } else if (item.includes("–")) {
      return item.split("–")[0];
    } else if (item.includes("-")) {
      return item.split("-")[0];
    }
  };
  const getListingApprovedByName = () => {
    const proJAuth = approvedById ? approvedById.split(",") : [];
    const resultedValue = proJAuth.map((item: string) => {
      return getApprovedFirstName(item);
    });
    return resultedValue.join(",");
  };
  const getApproveNamesProj = () => {
    const proJAuth = projAuthority ? projAuthority.split(",") : [];
    const resultedValue = proJAuth.map((item: string) => {
      return getApprovedFirstName(item);
    });
    return resultedValue.join(",");
  };

  // const { data: approvedData } = useQuery({
  //   queryKey: ["projAuth"],
  //   enabled: false,
  // });

  // const getApproveNames = () => {
  //   let idsString = approvedById ? approvedById.split(",") : [];
  //   if (!approvedData) return "N/A";
  //   const authorityNames = [];
  //   for (const item of approvedData as any) {
  //     if (idsString.includes(item.cid.toString())) {
  //       authorityNames.push(getApprovedFirstName(item.constDesc));
  //     }
  //   }

  //   return authorityNames.join(", ");
  // };

  // console.log(minPa, maxPa, minSba, maxSba);

  return (
    <div className={Styles.searchCardApprovedNamesMainCon}>
      {type === "proj" ? (
        <>
          <DownSectionCard
            label={isPlot ? "Plot Area" : "Super Builtup Area"}
            value={
              isPlot
                ? minPa !== null && maxPa && minPa === maxPa
                  ? `${formatNumberWithSuffix(minPa, false)} sqft`
                  : `${formatNumberWithSuffix(
                      minPa,
                      false
                    )}-${formatNumberWithSuffix(maxPa, false)} sqft`
                : minSba === maxSba
                ? `${formatNumberWithSuffix(minSba, false)} sqft`
                : `${formatNumberWithSuffix(
                    minSba,
                    false
                  )}-${formatNumberWithSuffix(maxSba, false)} sqft`
            }
          />

          {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
          {/* <br /> */}
          {!isPlot && (
            <DownSectionCard
              label="Carpet Area"
              value={
                minCa === maxCa
                  ? `${formatNumberWithSuffix(minCa, false)} sqft`
                  : `${formatNumberWithSuffix(
                      minCa,
                      false
                    )}-${formatNumberWithSuffix(maxCa, false)} sqft`
              }
            />
          )}

          {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
          {landArea !== undefined && landArea !== 0 && (
            <DownSectionCard
              label={type == "proj" ? "Land Area" : "Property Age"}
              value={
                type == "proj"
                  ? `${formatter.format(sqftToAcres(landArea))} Acres`
                  : `${propertyAge ?? 0} Years`
              }
            />
          )}

          <DownSectionCard
            label={"No. of Units"}
            value={formatNumberWithSuffix(noOfUnits, false)}
          />
          <DownSectionCard
            label={"Approved By"}
            value={projAuthority ? getApproveNamesProj() : null}
          />

          {!isPlot && (
            <DownSectionCard label={"Elevation"} value={`${towerData}`} />
          )}
        </>
      ) : (
        <>
          {propTypeName != "Plot" ? (
            <>
              <DownSectionCard
                label="Super Builtup Area"
                value={`${formatNumberWithSuffix(sba, false)} sq.ft`}
              />
              <DownSectionCard
                label="Carpet Area"
                value={`${formatNumberWithSuffix(ca, false)} sq.ft`}
              />

              {propStatus !== "Under Construction" && (
                <DownSectionCard
                  label={"Property age"}
                  value={propertyAge ?? "N/A"}
                />
              )}
            </>
          ) : (
            <DownSectionCard
              label="Total Area"
              value={`${formatNumberWithSuffix(pa, false)} sq.ft`}
            />
          )}
          <DownSectionCard label={"OwnerShip"} value={ownership} />
          {isRent && (
            <DownSectionCard label={"Available For"} value={availableFor} />
          )}

          <div className="flex flex-nowrap xl:gap-x-4">
            <DownSectionCard
              label={"Approved By"}
              value={getListingApprovedByName() ?? null}
            />

            <DownSectionCard
              label={"Bathrooms"}
              value={bathroom && `${bathroom} No's`}
            />
            <DownSectionCard
              label={"Balcony"}
              value={balcony && `${balcony} No's`}
            />
            {propTypeName != "Plot" && (
              <DownSectionCard
                label={"Parkings"}
                value={parking && `${parking} No's (${coverParking})`}
              />
            )}

            {isRent && (
              <DownSectionCard label={"Security Deposit"} value={`4,333`} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchCardApprovedNames;
