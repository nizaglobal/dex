import { InterfacePageName } from '@uniswap/analytics-events'
import { ChainId, Currency } from '@uniswap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Trace } from 'analytics'
import { NetworkAlert } from 'components/NetworkAlert/NetworkAlert'
import { SwitchLocaleLink } from 'components/SwitchLocaleLink'
import SwapHeader from 'components/swap/SwapHeader'
import { SwapTab } from 'components/swap/constants'
import { SwapWrapper } from 'components/swap/styled'
import { asSupportedChain } from 'constants/chains'
import { useCurrency } from 'hooks/Tokens'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useScreenSize } from 'hooks/useScreenSize'
import { SendForm } from 'pages/Swap/Send/SendForm'
import { ReactNode, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import { isPreviewTrade } from 'state/routing/utils'
import { SwapAndLimitContextProvider, SwapContextProvider } from 'state/swap/SwapContext'
import { queryParametersToCurrencyState } from 'state/swap/hooks'
import { CurrencyState, SwapAndLimitContext } from 'state/swap/types'
import { LimitFormWrapper } from './Limit/LimitForm'
import { SwapForm } from './SwapForm'

import { Box } from 'pages/Landing/components/Generics'
import styled from 'styled-components'

const Container = styled(Box)`
  background: rgb(14, 20, 28);
  background: linear-gradient(180deg, rgba(14, 20, 28, 1) 0%, rgba(14, 28, 36, 1) 100%);
  min-width: 100%;
  padding-top: 72px;
`

const SwapWrapperContainer = styled(Box)`
  width: 480px;
  padding: 8px;
  border-radius: 24px;
  background: ${({ theme }) => theme.surface1};

  @media (max-width: 800px) {
    width: 90%;
  }
`

export function getIsReviewableQuote(
  trade: InterfaceTrade | undefined,
  tradeState: TradeState,
  swapInputError?: ReactNode
): boolean {
  if (swapInputError) return false
  // if the current quote is a preview quote, allow the user to progress to the Swap review screen
  if (isPreviewTrade(trade)) return true

  return Boolean(trade && tradeState === TradeState.VALID)
}

// * Swap page

export default function SwapPage({ className }: { className?: string }) {
  const location = useLocation()

  const { chainId: connectedChainId } = useWeb3React()
  const supportedChainId = asSupportedChain(connectedChainId)
  const chainId = supportedChainId || ChainId.MAINNET

  const parsedQs = useParsedQueryString()
  const parsedCurrencyState = useMemo(() => {
    return queryParametersToCurrencyState(parsedQs)
  }, [parsedQs])

  const initialInputCurrency = useCurrency(parsedCurrencyState.inputCurrencyId, chainId)
  const initialOutputCurrency = useCurrency(parsedCurrencyState.outputCurrencyId, chainId)

  return (
    <Trace page={InterfacePageName.SWAP_PAGE} shouldLogImpression>
      <Container
        position="relative"
        height="92.2vh"
        justify="center"
        style={{
          overflowX: 'hidden',
          overflowY: 'clip',
        }}
      >
        <SwapWrapperContainer>
          <Swap
            className={className}
            chainId={chainId}
            disableTokenInputs={supportedChainId === undefined}
            initialInputCurrency={initialInputCurrency}
            initialOutputCurrency={initialOutputCurrency}
            syncTabToUrl={true}
          />
        </SwapWrapperContainer>
        <NetworkAlert />
      </Container>
      {location.pathname === '/swap' && <SwitchLocaleLink />}
    </Trace>
  )
}

/**
 * The swap component displays the swap interface, manages state for the swap, and triggers onchain swaps.
 *
 * In most cases, chainId should refer to the connected chain, i.e. `useWeb3React().chainId`.
 * However if this component is being used in a context that displays information from a different, unconnected
 * chain (e.g. the TDP), then chainId should refer to the unconnected chain.
 */
export function Swap({
  className,
  initialInputCurrency,
  initialOutputCurrency,
  chainId,
  onCurrencyChange,
  disableTokenInputs = false,
  compact = false,
  syncTabToUrl,
  swapHeaderWithoutOptions = false,
}: {
  className?: string
  chainId?: ChainId
  onCurrencyChange?: (selected: CurrencyState) => void
  disableTokenInputs?: boolean
  initialInputCurrency?: Currency
  initialOutputCurrency?: Currency
  compact?: boolean
  syncTabToUrl: boolean
  swapHeaderWithoutOptions?: boolean
}) {
  const isDark = true
  const screenSize = useScreenSize()

  return (
    <SwapAndLimitContextProvider
      chainId={chainId}
      initialInputCurrency={initialInputCurrency}
      initialOutputCurrency={initialOutputCurrency}
    >
      {/* TODO: Move SwapContextProvider inside Swap tab ONLY after SwapHeader removes references to trade / autoSlippage */}
      <SwapAndLimitContext.Consumer>
        {({ currentTab }) => (
          <SwapContextProvider>
            <SwapWrapper isDark={isDark} className={className} id="swap-page">
              <SwapHeader compact={compact || !screenSize.sm} syncTabToUrl={syncTabToUrl} />
              {currentTab === SwapTab.Swap && (
                <SwapForm
                  onCurrencyChange={onCurrencyChange}
                  disableTokenInputs={disableTokenInputs}
                  syncTabToUrl={!syncTabToUrl}
                  swapHeaderWithoutOptions={swapHeaderWithoutOptions}
                />
              )}
              {currentTab === SwapTab.Limit && <LimitFormWrapper onCurrencyChange={onCurrencyChange} />}
              {currentTab === SwapTab.Send && (
                <SendForm disableTokenInputs={disableTokenInputs} onCurrencyChange={onCurrencyChange} />
              )}
            </SwapWrapper>
          </SwapContextProvider>
        )}
      </SwapAndLimitContext.Consumer>
    </SwapAndLimitContextProvider>
  )
}
