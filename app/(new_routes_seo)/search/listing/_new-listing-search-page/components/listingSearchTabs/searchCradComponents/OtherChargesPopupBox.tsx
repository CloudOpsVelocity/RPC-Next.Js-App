import { useAtomValue } from "jotai";
import { FaRupeeSign } from "react-icons/fa"; // Optional: Use this icon to represent currency
import { projSearchStore } from "@/app/(new_routes_seo)/search/store/projSearchStore";


const OtherChargesPopupBox = ({data}:{data:any}) => {
  const state = useAtomValue(projSearchStore);

  const formatNumber = (value: string | undefined): string => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN").format(Number(value));
  };


  const otherChargesList = () => {
    const content:any = data.otherCharges;

        const formattedContent = [
          { label: "Price", value: `₹${formatNumber(content.price)}` },
          ...(content.clubHouseCharge
            ? [
                {
                  label: "Club house Subscription",
                  value:
                    content.clubHouseCharge === "A"
                      ? "Lifetime"
                      : content.clubHouseTill
                      ? `₹${formatNumber(content.clubHouseCharge)} for ${
                          content.clubHouseTill
                        } years`
                      : "Already Included",
                },
              ]
            : []),
          ...(content.securetyType && content.securetyType !== "NA"
            ? [
                {
                  label: "Security Deposit",
                  value: `${
                    content.securetyType === "F"
                      ? formatNumber(content.security.toString())
                      : formatNumber(
                          (content.securityMonth * content.price).toString()
                        )
                  }`,
                },
              ]
            : []),
          {
            label: "Maintenance & Corpus Fund",
            value:
              content.mncCharge === "NA"
                ? "Already Included"
                : formatNumber(content.mncCharge),
          },
          {
            label: "Tax & Government Charges",
            value:
              content.taxGovtCharge === "NA"
                ? "Already Included"
                : formatNumber(content.taxGovtCharge),
          },
          {
            label: "Ownership Transfer Fees",
            value:
              content.ownershipCharge === "NA"
                ? "Already Included"
                : formatNumber(content.ownershipCharge),
          },
          {
            label: "Legal Charges",
            value:
              content.legalCharge === "NA"
                ? "Already Included"
                : formatNumber(content.legalCharge),
          },
          {
            label: "Electricity Charges",
            value:
              content.elctCharge === "NA"
                ? "Already Included"
                : content.elctCharge === "A"
                ? "As Per Actuals"
                : formatNumber(content.elctCharge),
          },
          {
            label: "Water Charges",
            value:
              content.waterCharge === "NA"
                ? "Already Included"
                : content.waterCharge === "A"
                ? "As Per Actuals"
                : formatNumber(content.waterCharge),
          },
          {
            label: "Maintenance Charges",
            value:
              content.maintananceChargess === "NA"
                ? "Already Included"
                : content.maintananceChargess === "A"
                ? "As Per Actuals"
                : formatNumber(content.maintananceChargess),
          },
          ...(content.otherCharge
            ? content.otherCharge.split(",").map((charge: string) => {
                const [type, amount] = charge
                  .split("|")
                  .map((part) => part.trim());
                return { label: type, value: formatNumber(amount) };
              })
            : []),
        ].filter((charge) => charge.value);
        const total = formattedContent.reduce((acc, charge) => {
          const numericValue = parseFloat(charge.value.replace(/[₹,]/g, ""));
          return acc + (isNaN(numericValue) ? 0 : numericValue);
        }, 0);

        return {
            data: formattedContent,
            total: formatNumber(total),
        }
  }

  const content:any = otherChargesList();

  if(!content) return;

  if (!content || content.data.length === 0) {
    return <div>No charges available</div>;
  }



  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-btnPrimary">
            <th className="px-4 py-2 text-left text-white font-semibold">
              Type of Charge
            </th>
            <th className="px-4 py-2 text-right text-white font-semibold">
              Price Range (In Rupees)
            </th>
          </tr>
        </thead>
        <tbody>
          {content.data.map((charge: any, index: number) => (
            <tr
              key={`${charge.label}`}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 text-gray-700">{state.cg === "R" && charge.label === "Price" ? "Price/Month" : charge.label}</td>
              <td className="px-4 py-2 text-right text-gray-900 font-medium flex items-center justify-end">
                {/* <FaRupeeSign className="mr-1 text-green-600" /> */}
                {isNaN(charge.value.replace(",", '')) ? charge.value : `₹ ${charge.value}`}
              </td>
            </tr>
          ))}
          {/* Example: Total Row */}
          <tr className="bg-gray-100 font-semibold">
            <td className="px-4 py-2"> {state.cg === "R" ? "Total Price" : "Total Selling Price"}</td>
            <td className="px-4 py-2 text-right flex items-center justify-end">
              <FaRupeeSign className="mr-1 text-green-600" />
              {/* Replace this with actual total value if available */}
              {content.total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OtherChargesPopupBox;
