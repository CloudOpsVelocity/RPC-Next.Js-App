// interface PropertyDetails {
//   label: string;
//   value: string;
//   // Add more properties as needed
// }

import {
  Block,
  Marble,
  TotalLandArea,
  TowerIcon,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property";

// interface PropertyConfig {
//   [propertyType: string]: {
//     [purpose: string]: {
//       [status: string]: PropertyDetails[];
//     };
//   };
// }

// const propertyConfig: PropertyConfig = {
//   Apartment: {
//     R: {
//       R: [{ label: "Unit Type", value: "1 BHK" }],
//       U: [{ label: "Unit Type", value: "1 BHK" }],
//     },
//     S: {
//       R: [{ label: "Unit Type", value: "1 BHK" }],
//       U: [{ label: "Unit Type", value: "1 BHK" }],
//     },
//   },
//   Villa: {
//     R: {},
//   },
// };

// function getPropertyDetails(
//   propertyType: string,
//   purpose: string,
//   status: string
// ): PropertyDetails[] | undefined {
//   return propertyConfig[propertyType]?.[purpose]?.[status];
// }

// // Usage:
// const detailsToDisplay = getPropertyDetails("Apartment", "R", "U");
// if (detailsToDisplay) {
//   detailsToDisplay.forEach((detail) => {
//     console.log(`${detail.label}: ${detail.value}`);
//   });
// }
import React from "react";
type PropertyDetail = {
  title: string;
  value: string | number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
export function generatePropertyDetails(
  data: Main,
  propertyType: string,
  cg: string,
  availablityStatus: string
): PropertyDetail[] {
  let propertyDetails: PropertyDetail[] = [];
  switch (propertyType.trim()) {
    case "Apartment":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Marble },
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        { title: "Tower", value: data.tower, Icon: TowerIcon },
        { title: "Floor", value: data.atFloor, Icon: Marble },
        { title: "Block", value: data.block, Icon: Block },
        { title: "Unit Number", value: data.unitNumber, Icon: Marble },
        { title: "Facing", value: data.facingName, Icon: Marble },
        {
          title: "Super built-up Area",
          value: `${data.sba} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${data.ca} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      break;
    case "Villa":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Marble },
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        { title: "Elevation", value: data.atFloor, Icon: TowerIcon },
        { title: "Unit Number", value: data.unitNumber, Icon: Marble },
        { title: "Facing", value: data.facingName, Icon: Marble },
        {
          title: "Plot Area",
          Icon: TotalLandArea,
          value: `${data.plotArea} sq.ft`,
        },
        {
          title: "Super built-up Area",
          value: `${data.sba} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${data.ca} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Balcony Size",
          value: `${data.ba} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Terrace Area",
          value: `${data.ta} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Villa property details
      break;
    case "Villament":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Marble },
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        { title: "Tower", value: data.tower, Icon: TowerIcon },

        { title: "Unit Number", value: data.unitNumber, Icon: Marble },
        { title: "Facing", value: data.facingName, Icon: Marble },

        {
          title: "Super built-up Area",
          value: `${data.sba} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${data.ca} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Garden Area",
          value: `${data.ga} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Terrace Area",
          value: `${data.ta} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Balcony Size",
          value: `${data.ba} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Villament property details
      break;
    case "Plot":
      // Logic for Plot property details
      break;
    case "Row House":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Marble },
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        { title: "Elevation", value: data.atFloor, Icon: TowerIcon },
        { title: "Unit Number", value: data.unitNumber, Icon: Marble },
        { title: "Facing", value: data.facingName, Icon: Marble },
        {
          title: "Plot Area",
          Icon: TotalLandArea,
          value: `${data.plotArea} sq.ft`,
        },
        {
          title: "Super built-up Area",
          value: `${data.sba} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${data.ca} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Balcony Size",
          value: `${data.ba} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Terrace Area",
          value: `${data.ta} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Rowhouse property details
      break;
    default:
      // Default property details
      break;
  }

  return propertyDetails;
}
