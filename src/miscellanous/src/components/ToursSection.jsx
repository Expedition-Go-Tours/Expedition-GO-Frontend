import { motion } from "framer-motion";
import { Route, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Modal } from "@/components/ui/modal";
import { SectionHeader, sectionMotion } from "./SectionHeader";
import { SwipeCarousel } from "../../../components/homepage/SwipeCarousel";

const recommendedTours = [
  {
    title: "Ashanti Royal Festival Retreat",
    subtitle: "3 days · Palace visit · Kente weaving",
    price: "$260",
    image: "https://www.easytrackghana.com/images/photos2/mobile/brothers-wearing-kente-cloth-ghana.jpg",
  },
  {
    title: "Greater Accra Coastal Escape",
    subtitle: "2 days · Beach dining · Sunset boardwalk",
    price: "$135",
    image: "https://coupons.com.gh/uploads/4a37289208ee11b3b41352732c2b1e50.webp",
  },
  {
    title: "Northern Savannah Safari",
    subtitle: "4 days · Wildlife viewing · Village market",
    price: "$320",
    image: "https://i.pinimg.com/736x/7b/7b/08/7b7b08cc2e3d48ce7e0f08fd5afe4993.jpg",
  },
  {
    title: "Western Beach & Forest Expedition",
    subtitle: "3 days · Seaside hikes · Waterfall trails",
    price: "$280",
    image: "https://www.responsiblevacation.com/imagesclient/L_323113.jpg",
  },
  {
    title: "Volta Mountain & River Discovery",
    subtitle: "2 days · Volta Lake · Waterfall views",
    price: "$195",
    image: "https://www.easytrackghana.com/images/photos2/mobile/pavilion-on-volta-river.jpg",
  },
  {
    title: "Eastern Cocoa & Hills Trek",
    subtitle: "2 days · Farm tours · Hilltop views",
    price: "$170",
    image: "https://cdn.getyourguide.com/img/tour/64b68221b0938.jpeg/68.jpg",
  },
  {
    title: "Central Island & Heritage Cruise",
    subtitle: "2 days · River cruise · Historical forts",
    price: "$210",
    image: "https://www.travelandleisure.com/thmb/uhbxQ0JxdimbwS0gRHcV2VeVjSY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-norwegian-cruise-line-CRUISEHI1121-63afc86ee6744fd98923b5bebbc91b62.jpg",
  },
  {
    title: "Upper East Cultural Safari",
    subtitle: "3 days · Mud mosque tour · Local crafts",
    price: "$230",
    image: "https://ghanaculture.gov.gh/wp-content/uploads/2025/03/upper-east4.jpg",
  },
  {
    title: "Upper West Grasslands Adventure",
    subtitle: "3 days · Wa markets · Savannah camp",
    price: "$225",
    image: "https://pcweb2.azureedge.net/-/media/pn-np/sk/grasslands/WET4/2024/rattlesnake/hike-640-24.jpg?modified=20240913190853",
  },
  {
    title: "Ahafo Gold Heritage Journey",
    subtitle: "2 days · Forest lodge · Mining stories",
    price: "$180",
    image: "https://sportal365images.com/process/smp-images-production/pulse.com.gh/17032026/9a2a8479-ed60-4b5f-b1b1-77b924c965eb.jpg?operations=autocrop(700:467)",
  },
  {
    title: "Bono Shrine & Riverwalk",
    subtitle: "2 days · Traditional shrines · River village",
    price: "$160",
    image: "https://viewghana.com/wp-content/uploads/2022/02/Bono_Region_Ghana_overview.jpg",
  },
  {
    title: "Bono East Lake & Farm Stay",
    subtitle: "3 days · Lake views · Agritourism tours",
    price: "$205",
    image: "https://beyondthereturn.com/wp-content/uploads/2023/09/Kintampo-Waterfalls-2.jpg",
  },
  {
    title: "North East Savannah & Wildlife",
    subtitle: "4 days · Wildlife reserves · Local festival",
    price: "$340",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrc91DG5IfH7ATcTSGV4xr7O_p6nnStwFJyBRqyNOx3F6mNJ8069QGZMsbUwUU0qsJsn70AUHSFJPG-JtfAAAN0aJbEGlVE3yt1ci1RvD-wd1br0Wcll6RIiHHMFOK0Rvh0x1ZnvxYxA/s1600/Mwiba_Zebra.jpg",
  },
  {
    title: "Oti River Valley Canoe Trip",
    subtitle: "2 days · Canoeing · Hilltop lodges",
    price: "$175",
    image: "https://app.advcollective.com/_next/image?url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fattractions-splice-spp-720x480%2F13%2F16%2F54%2Fb3.jpg&w=3840&q=75",
  },
  {
    title: "Savannah Sunset Safari",
    subtitle: "3 days · Sunset drives · Local village stay",
    price: "$285",
    image: "https://t4.ftcdn.net/jpg/02/12/67/41/360_F_212674128_5qp2ISyxFh7cMtlWrSwkF3siFkwzkR7f.jpg",
  },
  {
    title: "Western North Waterfall Hike",
    subtitle: "3 days · Forest hikes · Hidden falls",
    price: "$250",
    image: "https://www.blueridgeoutdoors.com/wp-content/uploads/2016/05/SocoFalls-Reddit.jpg",
  },
];

export function ToursSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const carouselRef = useRef(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [favoritedTours, setFavoritedTours] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoritedTours');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleTourFavorite = (tour, e) => {
    e.stopPropagation();
    if (!user) {
      setShowSignInModal(true);
      return;
    }
    
    const isFavorited = favoritedTours.includes(tour.title);
    const updated = isFavorited
      ? favoritedTours.filter(t => t !== tour.title)
      : [...favoritedTours, tour.title];
    
    setFavoritedTours(updated);
    localStorage.setItem('favoritedTours', JSON.stringify(updated));
  };

  const handleTourClick = (tour) => {
    navigate(`/tour/${encodeURIComponent(tour.title)}`, { state: { tour } });
  };

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const scrollAmount = 400;
    const maxScrollLeft = scrollWidth - clientWidth;

    if (direction === "left") {
      carouselRef.current.scrollLeft =
        scrollLeft <= 10 ? maxScrollLeft : scrollLeft - scrollAmount;
      return;
    }

    carouselRef.current.scrollLeft =
      scrollLeft >= maxScrollLeft - 10 ? 0 : scrollLeft + scrollAmount;
  };

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      initial="hidden"
      variants={sectionMotion}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader
        eyebrow="Curated Trips"
        description="Swipe through handpicked itineraries built for culture, nature, and easy weekend escapes."
        title="Recommended Tours"
      />
      
      <div>
        <div className="mb-4 hidden justify-end gap-3 md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
            aria-label="Scroll carousel left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
            aria-label="Scroll carousel right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <SwipeCarousel
          ref={carouselRef}
          className="md:[&>*]:min-w-[39%] xl:[&>*]:min-w-[26%]"
          items={recommendedTours}
          renderItem={(tour, index) => (
          <motion.article
            className="min-w-[73vw] snap-start overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft md:min-w-[39%] xl:min-w-[26%] cursor-pointer"
            key={`${tour.title}-${index}`}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            onClick={() => handleTourClick(tour)}
          >
            <div className="relative h-72 overflow-hidden">
              <img
                alt={tour.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                src={tour.image}
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur-sm">
                Recommended
              </div>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-950">{tour.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tour.subtitle}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                    {tour.price}
                  </div>
                  <button
                    onClick={(e) => toggleTourFavorite(tour, e)}
                    className="rounded-full p-2 hover:bg-slate-100 transition"
                    aria-label={favoritedTours.includes(tour.title) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors ${
                        favoritedTours.includes(tour.title)
                          ? 'fill-red-500 text-red-500'
                          : 'text-slate-400 hover:text-red-500'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                <Route className="h-4 w-4" />
                View itinerary
              </button>
            </div>
          </motion.article>
        )}
      />
      </div>

      <Modal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign In Required"
        description="Please sign in to your account to add tours to your favorites."
        onConfirm={() => navigate('/signin')}
        confirmText="Sign In"
        cancelText="Cancel"
      />
    </motion.section>
  );
}
