import {
  Block,
  Marble,
  TotalLandArea,
  TowerIcon,
} from "@/app/images/commonSvgs";
import { Main } from "@/app/validations/property";
import { Console } from "console";

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
  switch (propertyType?.trim()) {
    case "Apartment":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Marble },
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        { title: "Tower", value: data.tower, Icon: TowerIcon },
        {
          title: "Floor",
          value: data.atFloor === 0 ? "G" : data.atFloor,
          Icon: Marble,
        },
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
          // propertyDetails
          //   .push
          //   // Add Rent, Ready to Move specific details
          //   ();
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
        {
          title: "Elevation",
          value: `${data.isBasement ? "B+" : ""}G+${data.atFloor}`,
          Icon: TowerIcon,
        },
        { title: "Unit Number", value: data.unitNumber, Icon: Marble },
        { title: "Facing", value: data.facingName, Icon: Marble },

        {
          title: "Plot Area",
          value: `${data.sba} sq.ft`,
          Icon: TotalLandArea,
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
          title: "Garden Area",
          value: data.ga && `${data.ga} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Terrace Area",
          value: data.ta && `${data.ta} sq.ft`,
          Icon: TotalLandArea,
        },

        {
          title: "Balcony Size",
          value: data.ba && `${data.ba} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(2, 1);
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          // propertyDetails
          //   .push
          //   // Add Rent, Ready to Move specific details
          //   ();
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
          value: data.ga && `${data.ga} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Terrace Area",
          value: data.ta && `${data.ta} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Balcony Size",
          value: data.ba && `${data.ba} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(2, 1);
        propertyDetails.splice(2, 0, {
          Icon: Marble,
          title: "Floor",
          value: data.atFloor,
        });
        if (availablityStatus === "R") {
          propertyDetails.push();
        } else if (availablityStatus === "U") {
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
      propertyDetails = [
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        { title: "Unit Number", value: data.unitNumber, Icon: Marble },
        { title: "Facing", value: data.facingName, Icon: Marble },
        {
          title: "Plot Area",
          Icon: TotalLandArea,
          value: `${data.plotArea} sq.ft`,
        },
        {
          title: "Length of Plot ",
          value: `${data.length} ft.`,
          Icon: TotalLandArea,
        },
        {
          title: "Breadth of Plot",
          value: `${data.width} ft.`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          // propertyDetails
          //   .push
          //   // Add Rent, Ready to Move specific details
          //   ();
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
      // Logic for Plot property details
      break;
    case "Row House":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Marble },
        { title: "Property Type", value: data.propTypeName, Icon: Marble },
        { title: "Phase", value: data.phaseName, Icon: Marble },
        {
          title: "Elevation",
          value: `${data.isBasement ? "B+" : ""}G+${data.atFloor}`,
          Icon: TowerIcon,
        },
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
          title: "Garden Area",
          value: data.ga && `${data.ga} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Terrace Area",
          value: data.ta && `${data.ta} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Balcony Size",
          value: data.ba && `${data.ba} sq.ft`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(2, 1);

        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          // propertyDetails
          //   .push
          //   // Add Rent, Ready to Move specific details
          //   ();
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
    case "Independent House/Building":
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
        propertyDetails.splice(2, 1);
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          // propertyDetails
          //   .push
          //   // Add Rent, Ready to Move specific details
          //   ();
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
    default:
      break;
  }

  return propertyDetails;
}
