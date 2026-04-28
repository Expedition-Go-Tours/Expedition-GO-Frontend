import { motion } from "framer-motion";
import { sectionMotion } from "./SectionHeader";

const galleryImages = [
  "https://www.easytrackghana.com/images/photos2/mobile/kwame-nkrumah-monument-accra.jpg",
  "https://cdn.getyourguide.com/img/tour/8606bdea4f22deb8e6630ea38cbb8a76828d42039064325642b134b297f08802.jpg/68.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/97/c9/40/caption.jpg?w=500&h=400&s=1",
  "https://cdn.tripspoint.com/uploads/photos/9492/accra-city-tour-with-nyna-graceland-travels_Pf8ln.jpeg",
];

export function WhyGhanaSection() {
  return (
    <motion.section
      className="bg-forest py-16 text-white"
      initial="hidden"
      variants={sectionMotion}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-200">
            Why Ghana?
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
            The Gateway to West Africa
          </h2>
          <p className="mt-5 max-w-2xl text-emerald-50/90">
            From the golden sands of Kokrobite to the ancient walls of Cape Coast Castle,
            Ghana offers a mosaic of culture, history, and natural beauty unlike anywhere
            else on earth.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["Rich Heritage", "World-Class Culture", "Eco Tourism", "Warm Hospitality"].map(
              (pill) => (
                <span
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50"
                  key={pill}
                >
                  {pill}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              className="overflow-hidden rounded-[1.75rem]"
              key={image}
              whileHover={{ scale: 1.03 }}
            >
              <img
                alt={`Ghana experience ${index + 1}`}
                className="h-40 w-full object-cover md:h-48"
                src={image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}