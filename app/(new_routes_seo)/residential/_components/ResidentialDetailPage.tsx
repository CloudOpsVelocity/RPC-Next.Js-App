import {
  FaHome,
  FaShieldAlt,
  FaBuilding,
  FaBolt,
  FaThumbsUp,
  FaHandSparkles,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Banner from "./Banner";
import Filters from "./Filters";

import { FaChevronRight } from "react-icons/fa6";
import ResidentialCardSection from "./ResidentialcardSection";
import RequestCallBackModal from "@/app/components/molecules/popups/req";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homeowner",
    image: "/api/placeholder/60/60",
    content:
      "The quality of construction and attention to detail in our new villa exceeded our expectations. The team was professional from start to finish.",
  },
  {
    name: "Rahul Mehta",
    role: "Investor",
    image: "/api/placeholder/60/60",
    content:
      "I've invested in multiple properties with GetRight, and their projects consistently deliver excellent returns. Vajra Elegance is their best yet.",
  },
  {
    name: "Ananya Patel",
    role: "Resident",
    image: "/api/placeholder/60/60",
    content:
      "Living in a GetRight property means enjoying top-notch amenities and exceptional community living. Couldn't be happier with our decision.",
  },
];

export default function ResidentialPage({ data }: { data: any }) {
  return (
    <div className="min-h-screen bg-background">
      <nav
        aria-label="residential Breadcrumbs"
        className="w-full  px-[8px] sm:px-[10px] lg:px-[14px] py-[6px] md:py-[10px] mt-[70px] xl:py-4 bg-gray-100 rounded-md          shadow-sm max-w-[100%] overflow-x-auto "
      >
        <ol className="flex items-center space-x-1 md:space-x-3  text-sm text-gray-600 pr-[10px] ">
          <li>
            <Link
              rel="noopener noreferrer"
              href="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-200"
            >
              <FaHome className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <FaChevronRight
            className="h-4 w-4 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <li className="ml-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-all duration-200 text-nowrap first-letter:capitalize ">
            residential
          </li>
        </ol>
      </nav>

      {/*    <Banner heroSlides={data?.featured} data={data} /> */}
      <Filters />
      <ResidentialCardSection data={data} />
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose Our Residential Properties
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHome className="h-8 w-8" />,
                title: "Premium Locations",
                description:
                  "Prime spots in the most sought-after neighborhoods with excellent connectivity to tech parks, schools, and healthcare facilities.",
              },
              {
                icon: <FaShieldAlt className="h-8 w-8" />,
                title: "Security First",
                description:
                  "24/7 security systems with CCTV surveillance, intercom facility, and controlled access for complete peace of mind.",
              },
              {
                icon: <FaHandSparkles className="h-8 w-8" />,
                title: "Modern Amenities",
                description:
                  "State-of-the-art facilities including clubhouse, swimming pool, gym, children's play area, and smart home features.",
              },
              {
                icon: <FaBolt className="h-8 w-8" />,
                title: "Energy Efficient",
                description:
                  "Sustainable design with solar water heating, rainwater harvesting, and energy-efficient lighting to reduce utility costs.",
              },
              {
                icon: <FaBuilding className="h-8 w-8" />,
                title: "Quality Construction",
                description:
                  "Built with premium materials, earthquake-resistant structure, and superior workmanship that stands the test of time.",
              },
              {
                icon: <FaThumbsUp className="h-8 w-8" />,
                title: "Customer Satisfaction",
                description:
                  "Our properties consistently exceed expectations with transparent processes and excellent after-sales service.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-card hover:shadow-lg transition-all"
              >
                <div className="mb-6 text-primary bg-primary/10 inline-block p-4 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden relative mr-4">
                    {/* <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-black/80 max-w-xl mx-auto mb-8">
            Schedule a site visit or speak with our property experts to discover
            the perfect living space tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button  className="bg-btnPrimary text-primary  px-6 py-3 rounded-lg font-medium transition-colors">
              Book a Site Visit
            </button> */}
           {/*  <Link
              rel="noopener noreferrer"
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_URL}/${`get-in-touch`}`}
              className="bg-btnPrimary text-primary  px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Book a Site Visit
            </Link> */}
            <Link
              rel="noopener noreferrer"
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_URL}/${`get-in-touch`}`}
              className="bg-btnPrimary text-primary  px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
   
    </div>
    
  );
}
