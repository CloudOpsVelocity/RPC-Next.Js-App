"use client";

import { useState, useEffect } from "react";
import {
  FaHome,
  FaShieldAlt,
  FaBuilding,
  FaBolt,
  FaThumbsUp,
  FaHandSparkles,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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

// Property filter options
const propertyTypes = ["All", "Villa", "Apartment", "Villament", "Plot"];
const priceRanges = [
  "All",
  "Under ₹80 Lakhs",
  "₹80L - ₹1.2 Cr",
  "Above ₹1.2 Cr",
];
const locations = [
  "All",
  "Kengeri",
  "Electronic City",
  "Whitefield",
  "Sarjapur Road",
];
// Hero section slides
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    title: "Modern Living Spaces",
    subtitle:
      "Discover exceptional residential properties designed for contemporary lifestyles.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
    title: "Vajra Elegance",
    subtitle:
      "Premium apartments in Kengeri with luxury amenities and smart features.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    title: "Exceptional Quality",
    subtitle: "Built with premium materials and attention to every detail.",
  },
];
export default function ResidentialPage({ data }: { data: any }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [isSticky, setIsSticky] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  // Handle sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Slider */}
      <section className="relative h-[90vh] w-full">
        {data?.featured?.map((slide: any, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.coverUrl.split(",")[0]}
              alt={slide.name}
              fill
              className="object-cover brightness-75"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background/90">
              <div className="container mx-auto h-full flex items-end pb-32 px-4">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md animate-fadeIn">
                    {slide.projName}
                  </h1>
                  <p className="text-lg md:text-2xl opacity-90 drop-shadow-md animate-slideUp">
                    {`${slide.locality}, ${slide.city}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {data?.featured?.map((_: any, index: number) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSlide ? "bg-primary w-6" : "bg-white/50"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
          onClick={() =>
            setActiveSlide(
              (activeSlide - 1 + (data?.featured?.length || 0)) %
                (data?.featured?.length || 1)
            )
          }
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
          onClick={() =>
            setActiveSlide((activeSlide + 1) % (data?.featured?.length || 1))
          }
        >
          <FaChevronRight />
        </button>
      </section>

      {/* Quick Search Section */}
      <section className="relative   container mx-auto -mt-16 px-4">
        <div className="bg-card shadow-xl rounded-xl p-6 z-[500] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Property Type
              </label>
              <select
                className="w-full p-3 border rounded-lg bg-background"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {propertyTypes?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select className="w-full p-3 border rounded-lg bg-background">
                {locations?.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Budget</label>
              <select className="w-full p-3 border rounded-lg bg-background">
                {priceRanges?.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-primary hover:bg-primary/90  p-3 rounded-lg font-medium flex items-center justify-center gap-2">
                <FaSearch /> Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-20 container mx-auto px-4">
        {!data ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          Object.entries(data || {})?.map(
            ([category, properties]: any) =>
              properties.length > 0 && (
                <div key={category} className="mb-16">
                  <h2 className="text-3xl font-bold mb-8">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties?.map((property: any) => (
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
                              className="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90  text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors"
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

      {/* Features Section */}
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
            ]?.map((feature, index) => (
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

      {/* Testimonials Section */}
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

      {/* Call to Action */}
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
            <button
              className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
              onClick={() => setShowEnquiryForm(true)}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setShowEnquiryForm(false)}
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-6">
              Enquire About Our Properties
            </h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-background"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg bg-background"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg bg-background"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Property Type
                </label>
                <select className="w-full p-3 border rounded-lg bg-background">
                  {propertyTypes.slice(1)?.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg bg-background resize-none h-24"
                  placeholder="Your requirements"
                ></textarea>
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-white p-3 rounded-lg font-medium transition-colors">
                Submit Enquiry
              </button>
            </form>

            <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg">
                <FaPhone className="h-4 w-4" /> Call
              </button>
              <button className="flex items-center justify-center gap-2 p-2 bg-green-600 text-white rounded-lg">
                <FaWhatsapp className="h-4 w-4" /> WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 p-2 bg-red-600 text-white rounded-lg">
                <FaEnvelope className="h-4 w-4" /> Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
