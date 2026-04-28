import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionHeader, sectionMotion } from "./SectionHeader";
import { SwipeCarousel } from "../../../components/homepage/SwipeCarousel";

const destinations = [
  {
    title: "Accra",
    tag: "Capital City",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6qtAegiUZ8o-JgBhkozGmLfEv0XudsZkdA&s",
  },
  {
    title: "Cape Coast",
    tag: "Heritage Fortress",
    image: "https://destinationtourntravels.com/images/DynamicSlider/thumbnail/thumbnail_2_6_15_6_33_261.jpg",
  },
  {
    title: "Kumasi",
    tag: "Ashanti Culture",
    image: "https://media.tacdn.com/media/attractions-splice-spp-360x240/17/04/9e/1a.jpg",
  },
  {
    title: "Mole Safari Reserve",
    tag: "Northern Wildlife",
    image: "https://i0.wp.com/www.paperinkandpassports.com/wp-content/uploads/2018/03/My-Post-2.jpg?resize=1024%2C576&ssl=1",
  },
  {
    title: "Nzulezo Stilt Village",
    tag: "Western Coast",
    image: "https://www.travelanddestinations.com/wp-content/uploads/2021/01/Find-a-destination-hp-btn-kophiphi.jpg",
  },
  {
    title: "Wli Waterfalls",
    tag: "Volta Adventure",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/desttvimg/mmt/destination/t_ufs/m_Bali_tv_destination_img_1_l_771_1158.jpg",
  },
  {
    title: "Aburi Botanical Gardens",
    tag: "Eastern Hills",
    image: "https://www.exploreworldwide.com/medialibraries/explore/explore-media/destinations/destination-header.jpg?ext=.jpg&width=1920&format=webp&quality=80&v=201705021127%201920w",
  },
  {
    title: "Elmina Castle",
    tag: "Central Heritage",
    image: "https://images.squarespace-cdn.com/content/v1/65cfd1369377d32bcd0051fa/1713964352006-GG68CSEC76Z06G1JZBFQ/Accra+City+Tour-+Sheeda+Travel+Tribe.jpg",
  },
  {
    title: "Paga Crocodile Pond",
    tag: "Upper East Culture",
    image: "https://static.where-e.com/Ghana/Eastern_Region/Yilo_Krobo/Boti-Waterfalls_29ed4b174910d37754b951b3d40920ad.jpg",
  },
  {
    title: "Wechiau Hippo Sanctuary",
    tag: "Upper West Safari",
    image: "https://continenttours.com/wp-content/uploads/2022/04/Independence-Square-5.jpg",
  },
  {
    title: "Ahafo Forest Lodge",
    tag: "Ahafo Retreat",
    image: "https://source.unsplash.com/featured/1200x900/?ahafo,ghana,forest,lodge",
  },
  // {
  //   title: "Bono Shrine Village",
  //   tag: "Bono Traditions",
  //   image: "https://source.unsplash.com/featured/1200x900/?bono,ghana,shrine,culture",
  // },
  // {
  //   title: "Techiman Market",
  //   tag: "Bono East Trade",
  //   image: "https://source.unsplash.com/featured/1200x900/?techiman,ghana,market,trade",
  // },
  // {
  //   title: "Gambaga Stone Shelter",
  //   tag: "North East Heritage",
  //   image: "https://source.unsplash.com/featured/1200x900/?gambaga,ghana,heritage,stone",
  // },
  // {
  //   title: "Kyabobo National Park",
  //   tag: "Oti Wilderness",
  //   image: "https://source.unsplash.com/featured/1200x900/?kyabobo,ghana,national-park,forest",
  // },
  // {
  //   title: "Damongo Savannah Camp",
  //   tag: "Savannah Escape",
  //   image: "https://source.unsplash.com/featured/1200x900/?damongo,ghana,savannah,camp",
  // },
  // {
  //   title: "Bia Forest Reserve",
  //   tag: "Western North Trails",
  //   image: "https://source.unsplash.com/featured/1200x900/?bia-forest,ghana,trail,forest",
  // },
];

export function DestinationsSection() {
  const [reverseDrag, setReverseDrag] = useState(false);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const loopedDestinations = useMemo(() => [...destinations, ...destinations, ...destinations], []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const updateReverseDrag = () => setReverseDrag(query.matches);

    updateReverseDrag();
    query.addEventListener?.("change", updateReverseDrag);

    return () => query.removeEventListener?.("change", updateReverseDrag);
  }, []);

  useEffect(() => {
    const track = carouselRef.current;

    if (!track) {
      return;
    }

    track.scrollLeft = track.scrollWidth / 3;
  }, []);

  const resetScrollPosition = (nextScrollLeft) => {
    const track = carouselRef.current;

    if (!track) {
      return;
    }

    const previousBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = "auto";
    track.scrollLeft = nextScrollLeft;
    track.style.scrollBehavior = previousBehavior;
  };

  const handleLoopScroll = () => {
    const track = carouselRef.current;

    if (!track) {
      return;
    }

    const segmentWidth = track.scrollWidth / 3;

    if (track.scrollLeft <= segmentWidth * 0.5) {
      resetScrollPosition(track.scrollLeft + segmentWidth);
    } else if (track.scrollLeft >= segmentWidth * 1.5) {
      resetScrollPosition(track.scrollLeft - segmentWidth);
    }
  };

  const scrollCarousel = (direction) => {
    const track = carouselRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.firstElementChild;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || "0");
    const scrollAmount = firstCard ? firstCard.getBoundingClientRect().width + gap : track.clientWidth * 0.85;

    track.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8"
      initial="hidden"
      variants={sectionMotion}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader
        action={
          <div className="hidden items-center gap-3 md:flex">
            <button
              aria-label="Scroll destinations left"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary hover:text-primary"
              onClick={() => scrollCarousel(-1)}
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Scroll destinations right"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary hover:text-primary"
              onClick={() => scrollCarousel(1)}
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        }
        eyebrow="Featured"
        title="Popular Destinations"
      />
      <SwipeCarousel
        ref={carouselRef}
        reverseDrag={reverseDrag}
        className="md:[&>*]:min-w-[39%] xl:[&>*]:min-w-[26%]"
        items={loopedDestinations}
        onScroll={handleLoopScroll}
        renderItem={(destination, index) => (
          <motion.div
            className="group relative min-h-[400px] min-w-[71vw] snap-start overflow-hidden cursor-pointer md:min-h-[300px] md:min-w-[39%] xl:min-w-[26%]"
            key={`${destination.title}-${index}`}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() =>
              navigate(`/destination/${destination.title}`, {
                state: { destination },
              })
            }
          >
            <img
              alt={destination.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
              src={destination.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-transparent" />
            <div className="absolute bottom-0 p-5">
              <p className="font-display text-2xl font-bold text-white">{destination.title}</p>
              <span className="mt-2 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {destination.tag}
              </span>
            </div>
          </motion.div>
        )}
      />
    </motion.section>
  );
}
