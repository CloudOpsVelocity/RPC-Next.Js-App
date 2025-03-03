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
      <Banner heroSlides={data?.featured} data={data} />
      <Filters />
      <section className="py-20 container mx-auto px-4">
        {!data ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          Object.entries(data).map(
            ([category, properties]: any) =>
              properties.length > 0 && (
                <div key={category} className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property: any) => (
                      <div
                        key={property.projIdEnc}
                        className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <div className="relative h-64">
                          <Image
                            src={property.coverUrl.split(",")[0]}
                            alt={property.projName}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                            {property.projstatus}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">
                            {property.projName}
                          </h3>
                          <p className="text-muted-foreground flex items-center gap-2 mb-4">
                            <FaMapMarkerAlt /> {property.locality},{" "}
                            {property.city}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-sm">
                              <div className="font-semibold">Price Range</div>
                              <div>
                                ₹
                                {(
                                  parseInt(property.minPrice) / 10000000
                                ).toFixed(2)}{" "}
                                Cr - ₹
                                {(
                                  parseInt(property.maxPrice) / 10000000
                                ).toFixed(2)}{" "}
                                Cr
                              </div>
                            </div>
                            <div className="text-sm">
                              <div className="font-semibold">Property Type</div>
                              <div>{property.propTypes.join(", ")}</div>
                            </div>
                            <div className="text-sm">
                              <div className="font-semibold">Possession</div>
                              <div>
                                {new Date(
                                  property.possassionDate
                                ).getFullYear()}
                              </div>
                            </div>
                            <div className="text-sm">
                              <div className="font-semibold">RERA Status</div>
                              <div>{property.rerastatus}</div>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <Link
                              href={`/residential/projects/${property.city.toLowerCase()}/${property.locality.toLowerCase()}/${property.projName
                                .toLowerCase()
                                .replace(/ /g, "-")}-${property.projIdEnc}`}
                              className="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors"
                            >
                              View Details
                            </Link>
                            <a
                              href="tel:+91-8884440963"
                              className="flex-1 border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Enquire Now
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )
        )}
      </section>

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
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden relative mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
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
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Schedule a site visit or speak with our property experts to discover
            the perfect living space tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-medium transition-colors">
              Book a Site Visit
            </button>
            <a
              href="tel:+91-8884440963"
              className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
