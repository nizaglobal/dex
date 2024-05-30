import { ChainId } from '@uniswap/sdk-core'
import Column from 'components/Column'
import { QUICK_ROUTE_CONFIG_KEY, useQuickRouteChains } from 'featureFlags/dynamicConfig/quickRouteChains'
import { PropsWithChildren, ReactNode, useState } from 'react'
import { ChevronDown, X } from 'react-feather'
import { useModalIsOpen, useToggleFeatureFlags } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/reducer'
import styled from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { ThemedText } from 'theme/components'
import { Z_INDEX } from 'theme/zIndex'
import { DynamicConfigs, getConfigName } from 'uniswap/src/features/gating/configs'
import { FeatureFlags, getFeatureFlagName } from 'uniswap/src/features/gating/flags'
import { useFeatureFlagWithExposureLoggingDisabled } from 'uniswap/src/features/gating/hooks'
import { Statsig } from 'uniswap/src/features/gating/sdk/statsig'

const StyledModal = styled.div`
  position: fixed;
  display: flex;
  left: 50%;
  top: 50vh;
  transform: translate(-50%, -50%);
  width: 400px;
  height: fit-content;
  color: ${({ theme }) => theme.neutral1};
  font-size: 18px;
  padding: 20px 0px;
  padding-top: 14px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 12px;
  /* border: 1px solid ${({ theme }) => theme.border1}; */
  z-index: ${Z_INDEX.modal};
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.border1};

  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    max-height: 80vh;
  }
`

function Modal({ open, children }: { open: boolean; children: ReactNode }) {
  return open ? <StyledModal>{children}</StyledModal> : null
}

const FlagsColumn = styled(Column)`
  max-height: 600px;
  overflow-y: auto;
  padding: 0px 20px;

  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    max-height: unset;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
`

const CloseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.neutral1};
  margin-top: 4px;
`

const Header = styled(Row)`
  padding: 0px 16px 8px;
  font-weight: 535;
  font-size: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border1};
  justify-content: space-between;
`

const ActionHeader = styled(Row)`
  align-items: center;
  gap: 8px;
`

const FlagName = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.neutral1};
`
const FlagGroupName = styled.span`
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.neutral1};
  font-weight: 535;
`
const FlagDescription = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.placeholder};
  display: flex;
  align-items: center;
`

const FlagInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`

const SaveButton = styled.button`
  border-radius: 12px;
  padding: 8px;
  margin: 0px 20px;
  background: ${({ theme }) => theme.surface3};
  font-weight: 535;
  font-size: 16px;
  border: none;
  color: ${({ theme }) => theme.neutral1};
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.surface3};
  }
`

interface FeatureFlagProps {
  label: string
  flag: FeatureFlags
}

function FeatureFlagGroup({ name, children }: PropsWithChildren<{ name: string }>) {
  return (
    <>
      <Row key={name}>
        <FlagGroupName>{name}</FlagGroupName>
      </Row>
      {children}
    </>
  )
}

const FlagVariantSelection = styled.div`
  position: relative;
  border-radius: 12px;
  padding: 8px;
  background: ${({ theme }) => theme.surface1};
  font-weight: 535;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.neutral1};
  min-width: 100px;
  min-height: 35px;
  cursor: pointer;
  :hover {
    background: ${({ theme }) => theme.surface1};
  }
`

const TextButton = styled(ThemedText.BodySmall)`
  color: ${({ theme }) => theme.accent1};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accent3};
  }
`

const SaveButtonReload = styled(SaveButton)`
  background-color: ${({ theme }) => theme.accent1} !important;
  color: ${({ theme }) => theme.black};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accent3} !important;
  }
`

const OptionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  padding: 8px 0;
  border-radius: 12px;
  z-index: 5;
  left: 0;
  background-color: ${({ theme }) => theme.surface1};
  border: 1px solid ${({ theme }) => theme.border1};
  width: 100%;
  -webkit-box-shadow: 0px 48px 111px -30px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 0px 48px 111px -30px rgba(0, 0, 0, 0.58);
  box-shadow: 0px 48px 111px -30px rgba(0, 0, 0, 0.58);
`

const Option = styled.div`
  font-size: 14px;
  padding: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.surface3};
  }
`

const Chevron = styled.span<{ open: boolean }>`
  display: flex;
  color: ${({ open, theme }) => (open ? theme.neutral1 : theme.neutral2)};
  rotate: ${({ open }) => (open ? '180deg' : '0deg')};
  transition: rotate ${({ theme }) => `${theme.transition.duration.fast} ${theme.transition.timing.inOut}`};
`

function Variant({ options, onInput }: { options: string[]; onInput: (value: string) => void }) {
  return (
    <OptionsWrapper>
      {options.map((option: string, index: number) => (
        <Option key={index} onClick={() => onInput(option)}>
          {option}
        </Option>
      ))}
    </OptionsWrapper>
  )
  // return <option value={option}>{option}</option>;
}

function FeatureFlagOption({ flag, label }: FeatureFlagProps) {
  const [selectOpen, setSelectOpen] = useState(false)
  const enabled = useFeatureFlagWithExposureLoggingDisabled(flag)
  const name = getFeatureFlagName(flag)
  return (
    <Row key={flag}>
      <FlagInfo>
        <FlagName>{name}</FlagName>
        <FlagDescription>{label}</FlagDescription>
      </FlagInfo>

      <FlagVariantSelection onClick={() => setSelectOpen(!selectOpen)}>
        {enabled ? 'Enabled' : 'Disabled'}
        <Chevron open={selectOpen}>
          <ChevronDown width={20} height={20} />
        </Chevron>
        {selectOpen ? (
          <Variant
            options={['Enabled', 'Disabled']}
            onInput={(value: string) => {
              Statsig.overrideGate(name, value === 'Enabled' ? true : false)
            }}
          />
        ) : null}
      </FlagVariantSelection>
    </Row>
  )
}

interface DynamicConfigDropdownProps {
  config: DynamicConfigs
  label: string
  options: any[]
  selected: any[]
  parser: (opt: string) => any
}

function DynamicConfigDropdown({ config, label, options, selected, parser }: DynamicConfigDropdownProps) {
  const configName = getConfigName(config)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(e.target.selectedOptions, (opt) => parser(opt.value))
    Statsig.overrideConfig(configName, {
      [QUICK_ROUTE_CONFIG_KEY]: selectedValues,
    })
  }
  return (
    <Row key={configName}>
      <FlagInfo>
        <FlagName>{configName}</FlagName>
        <FlagDescription>{label}</FlagDescription>
      </FlagInfo>
      <select multiple onChange={handleSelectChange}>
        {options.map((opt) => (
          <option key={opt} value={opt} selected={selected.includes(opt)}>
            {opt}
          </option>
        ))}
      </select>
    </Row>
  )
}

export default function FeatureFlagModal() {
  const open = useModalIsOpen(ApplicationModal.FEATURE_FLAGS)
  const toggleModal = useToggleFeatureFlags()

  return (
    <Modal open={open}>
      <Header>
        <span>Feature Flag Settings</span>
        <ActionHeader>
          <TextButton
            onClick={() => {
              Statsig.removeGateOverride()
              Statsig.removeConfigOverride()
            }}
          >
            Clear Overrides
          </TextButton>
          <CloseButton onClick={toggleModal}>
            <X size={24} />
          </CloseButton>
        </ActionHeader>
      </Header>
      <FlagsColumn>
        <FeatureFlagOption flag={FeatureFlags.SendEnabled} label="Send on swap component" />
        <FeatureFlagOption
          flag={FeatureFlags.Eip6936Enabled}
          label="Enable EIP-6963: Multi Injected Provider Discovery"
        />
        <FeatureFlagOption flag={FeatureFlags.LimitsEnabled} label="Enable Limits" />
        <FeatureFlagOption flag={FeatureFlags.LimitsFees} label="Enable Limits fees" />
        <FeatureFlagOption flag={FeatureFlags.CurrencyConversion} label="Enable currency conversion" />
        <FeatureFlagOption flag={FeatureFlags.UniconsV2} label="Unicon V2" />
        <FeatureFlagOption flag={FeatureFlags.ExitAnimation} label="Landing page exit animation" />
        <FeatureFlagOption flag={FeatureFlags.V2Everywhere} label="Enable V2 Everywhere" />
        <FeatureFlagOption flag={FeatureFlags.V2Explore} label="Enable V2 Explore Data" />
        <FeatureFlagOption flag={FeatureFlags.Realtime} label="Realtime activity updates" />
        <FeatureFlagOption flag={FeatureFlags.MultipleRoutingOptions} label="Enable Multiple Routing Options" />
        <FeatureFlagGroup name="Quick routes">
          <FeatureFlagOption flag={FeatureFlags.QuickRouteMainnet} label="Enable quick routes for Mainnet" />
          <DynamicConfigDropdown
            selected={useQuickRouteChains()}
            options={Object.values(ChainId).filter((v) => !isNaN(Number(v))) as ChainId[]}
            parser={Number.parseInt}
            config={DynamicConfigs.QuickRouteChains}
            label="Enable quick routes for these chains"
          />
        </FeatureFlagGroup>
        {/* <FeatureFlagGroup name="UniswapX Flags">
          <FeatureFlagOption
            flag={FeatureFlags.UniswapXSyntheticQuote}
            label="Force synthetic quotes for UniswapX"
          />
          <FeatureFlagOption
            flag={FeatureFlags.UniswapXv2}
            label="UniswapX v2"
          />
        </FeatureFlagGroup> */}
        <FeatureFlagGroup name="Extension">
          <FeatureFlagOption flag={FeatureFlags.ExtensionBetaLaunch} label="Beta phase of go-to-market campaign" />
          <FeatureFlagOption
            flag={FeatureFlags.ExtensionGeneralLaunch}
            label="General phase of go-to-market campaign"
          />
        </FeatureFlagGroup>
        <FeatureFlagGroup name="Outage Banners">
          <FeatureFlagOption flag={FeatureFlags.OutageBannerArbitrum} label="Outage Banner for Arbitrum" />
          <FeatureFlagOption flag={FeatureFlags.OutageBannerOptimism} label="Outage Banner for Optimism" />
          <FeatureFlagOption flag={FeatureFlags.OutageBannerPolygon} label="Outage Banner for Polygon" />
        </FeatureFlagGroup>
        <FeatureFlagGroup name="Debug">
          <FeatureFlagOption flag={FeatureFlags.TraceJsonRpc} label="Enables JSON-RPC tracing" />
        </FeatureFlagGroup>
      </FlagsColumn>
      <SaveButtonReload onClick={() => window.location.reload()}>Reload</SaveButtonReload>
    </Modal>
  )
}
