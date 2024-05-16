import { ChainId } from '@uniswap/sdk-core'
import { Trans } from 'i18n'
import { useState } from 'react'
import { useSwapAndLimitContext } from 'state/swap/hooks'
import styled from 'styled-components'
import { isIFramed } from 'utils/isIFramed'

import { sendAnalyticsEvent } from 'analytics'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'
import { RowBetween, RowFixed } from '../Row'
import SwapBuyFiatButton from './SwapBuyFiatButton'
import { SwapTab } from './constants'
import { SwapHeaderTabButton } from './styled'

import OptionModal from 'pages/Swap/Options'
import OptionsImage from '../../assets/images/options.png'

const StyledSwapHeader = styled(RowBetween)`
  margin-bottom: 12px;
  padding-right: 4px;
  color: ${({ theme }) => theme.neutral2};
`

const HeaderButtonContainer = styled(RowFixed)<{ compact: boolean }>`
  gap: ${({ compact }) => (compact ? 0 : 16)}px;
  padding: 0px 8px;
  padding-top: 8px;

  ${SwapHeaderTabButton} {
    ${({ compact }) => compact && 'padding: 8px 12px;'}
  }
`

const PathnameToTab: { [key: string]: SwapTab } = {
  '/swap': SwapTab.Swap,
  '/send': SwapTab.Send,
  '/limit': SwapTab.Limit,
}

export default function SwapHeader({ compact, syncTabToUrl }: { compact: boolean; syncTabToUrl: boolean }) {
  const [openOptions, setOpenOptions] = useState(false)
  const limitsEnabled = useFeatureFlag(FeatureFlags.LimitsEnabled)
  const sendEnabled = useFeatureFlag(FeatureFlags.SendEnabled) && !isIFramed()
  const { chainId, currentTab, setCurrentTab } = useSwapAndLimitContext()
  // const {
  //   derivedSwapInfo: { trade, autoSlippage },
  // } = useSwapContext()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (PathnameToTab[pathname] === SwapTab.Limit && (!limitsEnabled || chainId !== ChainId.MAINNET)) {
      navigate(`/${SwapTab.Swap}`, { replace: true })
      return
    }

    setCurrentTab(PathnameToTab[pathname] ?? SwapTab.Swap)
  }, [chainId, limitsEnabled, navigate, pathname, setCurrentTab])

  // Limits is only available on mainnet for now
  if (chainId !== ChainId.MAINNET && currentTab === SwapTab.Limit) {
    setCurrentTab(SwapTab.Swap)
  }

  const onTab = useCallback(
    (tab: SwapTab) => {
      sendAnalyticsEvent('Swap Tab Clicked', { tab })
      if (syncTabToUrl) {
        navigate(`/${tab}`, { replace: true })
      } else {
        setCurrentTab(tab)
      }
    },
    [navigate, setCurrentTab, syncTabToUrl]
  )

  return (
    <>
      {openOptions ? <OptionModal setOpenOptions={setOpenOptions} /> : null}
      <StyledSwapHeader>
        <HeaderButtonContainer compact={compact}>
          <SwapHeaderTabButton
            as={pathname === '/swap' ? 'h1' : 'button'}
            role="button"
            tabIndex={0}
            $isActive={currentTab === SwapTab.Swap}
            onClick={() => {
              onTab(SwapTab.Swap)
            }}
          >
            <Trans>Swap</Trans>
          </SwapHeaderTabButton>
          {limitsEnabled && chainId === ChainId.MAINNET && (
            <SwapHeaderTabButton
              $isActive={currentTab === SwapTab.Limit}
              onClick={() => {
                onTab(SwapTab.Limit)
              }}
            >
              <Trans>Limit</Trans>
            </SwapHeaderTabButton>
          )}
          {sendEnabled && (
            <SwapHeaderTabButton
              $isActive={currentTab === SwapTab.Send}
              onClick={() => {
                onTab(SwapTab.Send)
              }}
            >
              <Trans>Send</Trans>
            </SwapHeaderTabButton>
          )}
          <SwapBuyFiatButton />
        </HeaderButtonContainer>
        {currentTab === SwapTab.Swap && (
          <RowFixed>
            <img src={OptionsImage} alt="options" style={{ cursor: 'pointer' }} onClick={() => setOpenOptions(true)} />
          </RowFixed>
        )}
      </StyledSwapHeader>
    </>
  )
}
