import { useWeb3React } from '@web3-react/core'
import Row, { RowFixed } from 'components/Row'
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from 'constants/chains'
import { SubmittableTrade } from 'state/routing/types'
import { isUniswapXTrade } from 'state/routing/utils'
import { ThemedText } from 'theme/components'
import { NumberType, useFormatter } from 'utils/formatNumbers'

export default function GasEstimateTooltip({ trade }: { trade?: SubmittableTrade; loading: boolean }) {
  const { chainId } = useWeb3React()
  const { formatNumber } = useFormatter()

  if (!trade || !chainId || !SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId)) {
    return null
  }

  return (
    <RowFixed gap="xs">
      <ThemedText.BodySmall color="neutral2">
        <Row gap="sm">
          <ThemedText.BodySmall color="accent1" style={{ fontWeight: 535 }}>
            {formatNumber({
              input: trade.totalGasUseEstimateUSD,
              type: NumberType.FiatGasPrice,
            })}
          </ThemedText.BodySmall>

          {isUniswapXTrade(trade) && (trade.classicGasUseEstimateUSD ?? 0) > 0 && (
            <div>
              <s>
                {formatNumber({
                  input: trade.classicGasUseEstimateUSD,
                  type: NumberType.FiatGasPrice,
                })}
              </s>
            </div>
          )}
        </Row>
      </ThemedText.BodySmall>
    </RowFixed>
  )
}
