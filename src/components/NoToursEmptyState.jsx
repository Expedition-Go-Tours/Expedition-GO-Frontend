import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { NoToursAnimation } from './NoToursAnimation';
import { FeaturedExperiencesCard } from './homepage/FeaturedExperiencesCard';
import { useSearchFallback } from '@/hooks/useSearchFallback';
import './NoToursEmptyState.css';

export function NoToursEmptyState({ location = '', onBrowseAll, onSecondary, secondaryLabel }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useSearchFallback(location);

  const nearby = data?.nearbyLocations ?? [];
  const recommended = data?.recommended ?? [];
  const alsoLike = data?.youMayAlsoLike ?? [];
  const place = location || t('empty.thisPlace', { defaultValue: 'this destination' });

  const Rail = ({ title, tours }) => (
    <section className="no-tours-section">
      <h3 className="no-tours-rail-title">{title}</h3>
      <div className="no-tours-rail">
        {tours.map((tour, i) => (
          <div className="no-tours-rail-item" key={tour.slug || `${tour.title}-${i}`}>
            <FeaturedExperiencesCard {...tour} variant="allTours" />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="no-tours">
      <div className="no-tours-hero">
        <NoToursAnimation />
        <h2 className="no-tours-title">{t('empty.title', { defaultValue: "We're not quite there yet" })}</h2>
        <p className="no-tours-sub">
          {t('empty.body', {
            location: place,
            defaultValue:
              'Our team is working hard to bring {{location}} to Expedition-Go. In the meantime, explore handpicked experiences and nearby destinations we think you’ll love.',
          })}
        </p>
        <div className="no-tours-actions">
          <button
            type="button"
            className="no-tours-btn no-tours-btn--primary"
            onClick={onBrowseAll || (() => navigate('/tours'))}
          >
            {t('empty.browseAll', { defaultValue: 'Browse all experiences' })}
          </button>
          {onSecondary ? (
            <button type="button" className="no-tours-btn no-tours-btn--ghost" onClick={onSecondary}>
              {secondaryLabel || t('empty.clearFilters', { defaultValue: 'Clear filters' })}
            </button>
          ) : (
            nearby.length > 0 && (
              <a href="#no-tours-nearby" className="no-tours-btn no-tours-btn--ghost">
                {t('empty.exploreNearby', { defaultValue: 'Explore nearby' })}
              </a>
            )
          )}
        </div>
      </div>

      {nearby.length > 0 && (
        <section id="no-tours-nearby" className="no-tours-section">
          <h3 className="no-tours-rail-title">{t('empty.nearbyTitle', { defaultValue: 'Close by' })}</h3>
          <div className="no-tours-chips">
            {nearby.map((loc) => (
              <button
                key={`${loc.city}-${loc.country || ''}`}
                type="button"
                className="no-tours-chip"
                onClick={() => navigate(`/tours?near=${encodeURIComponent(loc.city)}`)}
              >
                {loc.coverPhoto && <img src={loc.coverPhoto} alt="" loading="lazy" />}
                <span className="no-tours-chip-body">
                  <span className="no-tours-chip-city">
                    <MapPin size={13} aria-hidden="true" /> {loc.city}
                  </span>
                  <span className="no-tours-chip-meta">
                    {t('empty.experiencesCount', { count: loc.tourCount, defaultValue: '{{count}} experiences' })}
                    {loc.distanceKm ? ` · ${loc.distanceKm} km` : ''}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {recommended.length > 0 && (
        <Rail title={t('empty.recommendedTitle', { defaultValue: 'Recommended for you' })} tours={recommended} />
      )}
      {alsoLike.length > 0 && (
        <Rail title={t('empty.alsoLikeTitle', { defaultValue: 'You may also like' })} tours={alsoLike} />
      )}
    </div>
  );
}
