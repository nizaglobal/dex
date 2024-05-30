import { style } from '@vanilla-extract/css'
import { buttonTextMedium } from 'nft/css/common.css'
import { loadingAsset } from 'nft/css/loading.css'
import { sprinkles, vars } from 'nft/css/sprinkles.css'

export const baseActivitySwitcherToggle = style([
  buttonTextMedium,
  sprinkles({
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '8',
  }),
  {
    lineHeight: '24px',
  },
])

export const activitySwitcherToggle = style([
  baseActivitySwitcherToggle,

  sprinkles({
    color: 'neutral2',
  }),
])

export const selectedActivitySwitcherToggle = style([
  baseActivitySwitcherToggle,
  sprinkles({
    color: 'black',
  }),
  {
    backgroundColor: vars.color.accent1,
    padding: '4px 8px',
    borderRadius: '8px',
  },
])

export const styledLoading = style([
  loadingAsset,
  {
    width: 58,
    height: 20,
  },
])
