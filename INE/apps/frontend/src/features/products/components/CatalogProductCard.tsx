import AddOutlined from '@mui/icons-material/AddOutlined';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import type { CatalogListItem, TrackedProduct } from '../../../types/product';
import { productPath, trackAction } from '../productInfo';

type CatalogProductCardProps = {
  product: CatalogListItem;
  tracked: Map<string, TrackedProduct>; // this product's tracked options, by option id
  onTrack: (product: CatalogListItem) => void;
};

// Only what the catalogue knows: name, store id, brand, category, SKU and, once fetched, the number of options.
export function CatalogProductCard({ product, tracked, onTrack }: CatalogProductCardProps) {
  const trackedLabels = [...tracked.values()].map(item => item.optionLabel);
  const optionCount = Number.isFinite(product.optionCount) ? product.optionCount : null;
  const action = trackAction(tracked.size, optionCount);
  const meta = [product.brand, product.category].filter(Boolean).join(' · ');

  return (
    <Card
      component="article"
      aria-label={product.name}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
        minWidth: 0,
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        boxShadow: 'none',
      }}
    >
      <div>
        <Link
          component={RouterLink}
          to={productPath(product.storeProductId)}
          underline="hover"
          color="text.primary"
          sx={{
            fontWeight: 700,
            display: 'block',
            overflowWrap: 'anywhere',
            lineHeight: 1.35,
            fontSize: '1.05rem',
            letterSpacing: '-0.02em',
          }}
        >
          {product.name}
        </Link>
        <Typography variant="caption" component="p" sx={{ color: 'text.secondary', mt: 0.5 }}>
          ID {product.storeProductId}
          {meta && ` · ${meta}`}
        </Typography>
        {product.sku && (
          <Typography variant="caption" component="p" sx={{ color: 'text.secondary' }}>
            SKU {product.sku}
          </Typography>
        )}
      </div>

      <Stack direction="row" useFlexGap spacing={0.75} sx={{ flexWrap: 'wrap', minHeight: 32 }}>
        {optionCount !== null && (
          <Chip
            size="small"
            variant="outlined"
            sx={{ backgroundColor: '#F3F4F6', borderColor: '#D1D5DB', color: 'text.primary', fontWeight: 500 }}
            label={`${optionCount} ${optionCount === 1 ? 'option' : 'options'}`}
          />
        )}
        {tracked.size > 0 ? (
          <Chip
            size="small"
            color="primary"
            icon={<CheckOutlined />}
            label={tracked.size === 1 ? `Tracking ${trackedLabels[0]}` : `Tracking ${tracked.size} options`}
            title={trackedLabels.join(', ')}
            sx={{ fontWeight: 600 }}
          />
        ) : (
          <Chip
            size="small"
            variant="outlined"
            label="Not tracked"
            sx={{ backgroundColor: '#F3F4F6', borderColor: '#D1D5DB', color: 'text.primary', fontWeight: 500 }}
          />
        )}
      </Stack>

      <Button
        variant={tracked.size > 0 ? 'outlined' : 'contained'}
        size="small"
        startIcon={action.disabled ? <CheckOutlined /> : <AddOutlined />}
        disabled={action.disabled}
        onClick={() => onTrack(product)}
        aria-label={`${action.label}: ${product.name}`}
        sx={{
          mt: 'auto',
          alignSelf: 'stretch',
          justifyContent: 'center',
          fontWeight: 600,
          borderRadius: 10,
          minHeight: 36,
          ...(tracked.size > 0 ? { borderColor: 'divider', color: 'text.primary', backgroundColor: '#F9FAFB' } : {}),
        }}
      >
        {action.label}
      </Button>
    </Card>
  );
}
