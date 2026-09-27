import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PageHeader } from '../../../components/common/PageHeader';
import { SectionCard } from '../../../components/common/SectionCard';
import { NotificationsSection } from '../components/NotificationsSection';
import { ScrapingSection } from '../components/ScrapingSection';
import { SystemSection } from '../components/SystemSection';

// INE Dashboard uses a fixed monochrome appearance so the UI remains consistent.
export function SettingsPage() {

  return (
    <>
      <PageHeader title="Settings" subtitle="Appearance for this browser, and what the server reports." />
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' }, alignItems: 'start' }}>
        <Box sx={{ gridColumn: { xs: 'auto', lg: '1 / -1' } }}>
          <SectionCard
            title="Appearance"
            description="INE Dashboard uses a clean black-and-white interface for the browser."
            action={
              <ToggleButtonGroup exclusive size="small" value="light" aria-label="Colour theme">
                <ToggleButton value="light" disabled>
                  Monochrome
                </ToggleButton>
              </ToggleButtonGroup>
            }
          />
        </Box>
        <SystemSection />
        <ScrapingSection />
        <NotificationsSection />
      </Box>
    </>
  );
}
