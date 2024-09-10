"use client";
import { Paper, RangeSlider, Slider } from "@mantine/core";
const paritalUnitParser = (data: any) => {
  let result: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      result[element.phaseId] = {};

      for (const key in element.propTypeOverview) {
        if (
          Object.prototype.hasOwnProperty.call(element.propTypeOverview, key)
        ) {
          result[element.phaseId][mapPropTypeToKey(key)] = {};
          element.propTypeOverview[key].priceList.forEach(
            ({ bhkOrDimension, minPrice, maxPrice }: any) => {
              result[element.phaseId][mapPropTypeToKey(key)][bhkOrDimension] = {
                minPrice: minPrice,
                maxPrice: maxPrice,
                minSba: "N/A",
                maxSba: "N/A",
                minCa: "N/A",
                maxCa: "N/A",
                unitDataDtoList: [],
              };
            }
          );
        }
      }
    }
  }

  return result;
};
function Demo() {
  return (
    <Paper>
      <Demo1 />
    </Paper>
  );
}

export default Demo;

function mapPropTypeToKey(propType: string): string {
  switch (propType) {
    case "apt":
      return "apartment";
    case "rowHouse":
      return "rowhouse";
    case "villa":
      return "villa";
    case "vlmt":
      return "villament";
    case "plot":
      return "plot";
    default:
      return "unknown";
  }
}

function Demo1() {
  const parsedData = paritalUnitParser(fakeDataForTesting);
  return <>{JSON.stringify(parsedData)}</>;
}

const fakeDataForTesting = [
  {
    phaseId: 11,
    phaseName: "Phase one",
    launchDate: "Tue Aug 04 00:00:00 IST 2020",
    possassionDate: "Fri Aug 27 00:00:00 IST 2027",
    landArea: 597881,
    rerastatus: "Recieved",
    reraId: "qaz/wsx/dfsdfdf/3243554456",
    propTypeOverview: {
      rowHouse: {
        elevation: 4,
        unitTypes: ["5 BHK", "1 BHK", "2 BHK"],
        landarea: "45896",
        unitCount: 4562,
        minPrice: 3456,
        maxPrice: 8900000,
        basePrice: "9687",
        priceList: [
          {
            bhkOrDimension: "1 BHK",
            minPrice: "5560000",
            maxPrice: "8900000",
          },
          {
            bhkOrDimension: "5 BHK",
            minPrice: "6500000",
            maxPrice: "7800000",
          },
          {
            bhkOrDimension: "1 BHK",
            minPrice: "5560000",
            maxPrice: "8900000",
          },
          {
            bhkOrDimension: "5 BHK",
            minPrice: "6500000",
            maxPrice: "7800000",
          },
          {
            bhkOrDimension: "2 BHK",
            minPrice: "3456",
            maxPrice: "6789",
          },
        ],
      },
      apt: {
        elevation: 3,
        unitTypes: ["1 BHK"],
        landarea: "458962.63",
        unitCount: 1132,
        minPrice: 4500000,
        maxPrice: 6820000,
        basePrice: "7893.56",
        priceList: [
          {
            bhkOrDimension: "1 BHK",
            minPrice: "4500000",
            maxPrice: "6820000",
          },
        ],
      },
      plot: {
        unitTypes: ["50_20", "35_20", "40_30", "55_66"],
        landarea: "45896",
        unitCount: 121,
        minPrice: 450000,
        maxPrice: 15000000,
        basePrice: "5656",
        priceList: [
          {
            bhkOrDimension: "35_20",
            minPrice: "450000",
            maxPrice: "690000",
          },
          {
            bhkOrDimension: "50_20",
            minPrice: "7400000",
            maxPrice: "9600000",
          },
          {
            bhkOrDimension: "40_30",
            minPrice: "9600000",
            maxPrice: "15000000",
          },
          {
            bhkOrDimension: "55_66",
            minPrice: "4500000",
            maxPrice: "9600000",
          },
        ],
      },
      vlmt: {
        elevation: 1,
        unitTypes: [
          "5 BHK",
          "5.5 BHK",
          "5+ BHK",
          "3 BHK",
          "2 BHK",
          "3 BHK + Servant",
          "3.5 BHK",
          "5.5 BHK + Servant",
          "2.5 BHK",
          "1 BHK",
          "4 BHK",
          "4.5 BHK + Servant",
          "1.5 BHK",
          "3.5 BHK + Servant",
          "4.5 BHK",
          "1 RK",
        ],
        landarea: "1234",
        unitCount: 1234,
        minPrice: 788,
        maxPrice: 788768,
        basePrice: "3456",
        priceList: [
          {
            bhkOrDimension: "1 RK",
            minPrice: "967",
            maxPrice: "1900",
          },
          {
            bhkOrDimension: "1 BHK",
            minPrice: "3456",
            maxPrice: "8900",
          },
          {
            bhkOrDimension: "1.5 BHK",
            minPrice: "8900",
            maxPrice: "56789",
          },
          {
            bhkOrDimension: "2 BHK",
            minPrice: "9077",
            maxPrice: "89000",
          },
          {
            bhkOrDimension: "2.5 BHK",
            minPrice: "6789",
            maxPrice: "7890",
          },
          {
            bhkOrDimension: "3 BHK",
            minPrice: "6789",
            maxPrice: "8900",
          },
          {
            bhkOrDimension: "3 BHK + Servant",
            minPrice: "5600",
            maxPrice: "6789",
          },
          {
            bhkOrDimension: "3.5 BHK",
            minPrice: "8900",
            maxPrice: "45677",
          },
          {
            bhkOrDimension: "3.5 BHK + Servant",
            minPrice: "7777",
            maxPrice: "8900",
          },
          {
            bhkOrDimension: "4 BHK",
            minPrice: "8888",
            maxPrice: "45677",
          },
          {
            bhkOrDimension: "4.5 BHK",
            minPrice: "2345",
            maxPrice: "6790",
          },
          {
            bhkOrDimension: "4.5 BHK + Servant",
            minPrice: "89666",
            maxPrice: "678989",
          },
          {
            bhkOrDimension: "5 BHK",
            minPrice: "8799",
            maxPrice: "568787",
          },
          {
            bhkOrDimension: "5.5 BHK",
            minPrice: "78687",
            maxPrice: "788768",
          },
          {
            bhkOrDimension: "5.5 BHK + Servant",
            minPrice: "788",
            maxPrice: "7878",
          },
          {
            bhkOrDimension: "5+ BHK",
            minPrice: "8787",
            maxPrice: "87878",
          },
        ],
      },
      villa: {
        elevation: 6,
        unitTypes: ["5 BHK", "1 BHK", "4 BHK", "3 BHK", "1 RK"],
        landarea: "45892.33",
        unitCount: 986,
        minPrice: 4589,
        maxPrice: 96300,
        basePrice: "9687",
        priceList: [
          {
            bhkOrDimension: "1 RK",
            minPrice: "5600",
            maxPrice: "8900",
          },
          {
            bhkOrDimension: "1 BHK",
            minPrice: "4589",
            maxPrice: "9630",
          },
          {
            bhkOrDimension: "3 BHK",
            minPrice: "9800",
            maxPrice: "63990",
          },
          {
            bhkOrDimension: "4 BHK",
            minPrice: "9800",
            maxPrice: "96300",
          },
          {
            bhkOrDimension: "5 BHK",
            minPrice: "9600",
            maxPrice: "78000",
          },
        ],
      },
    },
  },
  {
    phaseId: 12,
    phaseName: "Phase 2",
    launchDate: "Wed Mar 11 00:00:00 IST 2020",
    possassionDate: "Thu Aug 19 00:00:00 IST 2027",
    landArea: 0,
    rerastatus: "Applied",
    reraId: "PMR/BNM/ASC/65498565",
    propTypeOverview: {},
  },
];
