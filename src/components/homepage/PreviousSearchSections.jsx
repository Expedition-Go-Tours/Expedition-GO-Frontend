/**
 * @file PreviousSearchSections.jsx
 * @description Search-history rails at the bottom of the personalized homepage.
 *   Surfaces the two most recent previous searches as tour carousels:
 *     - most recent   → "Continue your search in X" / "Pick up where you left off."
 *     - the one before → "Previously searched in Y" / "Your earlier destination search."
 *   Only rendered while a location is active and there is history.
 */
import { useTranslation } from 'react-i18next';
import { useLocationSearch } from '@/contexts/LocationSearchContext';
import { PreviousSearchRail } from './PreviousSearchRail';

export function PreviousSearchSections() {
  const { t } = useTranslation();
  const { hasActiveSearch, previousLocations } = useLocationSearch();

  if (!hasActiveSearch || previousLocations.length === 0) return null;

  // Matches the prototype: the two most recent previous searches. History never
  // contains the current location, so no filtering is needed — filtering here
  // could silently drop a valid rail.
  const rails = previousLocations.slice(0, 2);

  if (rails.length === 0) return null;

  return (
    <div className="mt-[60px] border-t border-slate-200 pt-1">
      {rails.map((loc, i) => (
        <PreviousSearchRail
          key={loc}
          location={loc}
          title={
            i === 0
              ? t('sections.continueSearchIn', {
                  location: loc,
                  defaultValue: 'Continue your search in {{location}}',
                })
              : t('sections.previouslySearchedIn', {
                  location: loc,
                  defaultValue: 'Previously searched in {{location}}',
                })
          }
          note={
            i === 0
              ? t('sections.pickUpWhereYouLeftOff', { defaultValue: 'Pick up where you left off.' })
              : t('sections.earlierDestinationSearch', { defaultValue: 'Your earlier destination search.' })
          }
        />
      ))}
    </div>
  );
}
