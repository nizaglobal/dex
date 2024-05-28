import { Percent } from '@nizaglobal/sdk-core'
import { AutoColumn } from 'components/Column'
import Modal from 'components/Modal'
import { AutoRow } from 'components/Row'
import { useWindowSize } from 'hooks/useWindowSize'
import { DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE } from 'pages/AddLiquidity'
import { Body1, Body2, Box, H3 } from 'pages/Landing/components/Generics'
import { InfoCircleSVG } from 'pages/Landing/components/Icons'
import type { SetStateAction } from 'react'
import { Dispatch, useEffect, useState } from 'react'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { SlippageTolerance } from 'state/user/types'
import styled from 'styled-components'
import { X } from 'ui/src/components/icons'
import { useFormatter } from 'utils/formatNumbers'
import Switch from './Switch'

function useFormatPercentInput() {
  const { formatPercent } = useFormatter()

  return (slippage: Percent) => formatPercent(slippage).slice(0, -1) // remove % sign
}

interface OptionsModalProps {
  setOpenOptions: Dispatch<SetStateAction<boolean>>
}

const SwitchWrapper = styled.div`
  @media (max-width: 800px) {
    padding-top: 15px;
  }
`

const Card = styled.div`
  background-color: ${({ theme }) => theme.surface1};
  border-radius: 12px;
  padding: 24px 16px;
  @media (max-width: 800px) {
    max-width: 100%;
  }
`

const SlippageWrapper = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border1};
  height: 38px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`

const SlippageBox = styled.div<{ selected: boolean }>`
  background-color: ${({ selected, theme }) => (selected ? theme.accent1 : 'transparent')};
  color: ${({ selected, theme }) => (selected ? 'black' : theme.placeholder)};
  width: 53px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
`

const InputWrapper = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.surface3};
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.placeholder};
  font-weight: 600;
  width: 232px;
  @media (max-width: 800px) {
    width: 132px;
  }
`

const Border = styled.div`
  border-left: 1px solid ${({ theme }) => theme.border1};
  height: 23px;
`

const SlippageInput = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.placeholder};
  font-weight: 600;
  @media (max-width: 800px) {
    width: 90px;
  }
`

const OptionModalWrapper = styled(Modal)`
  width: 500px;
`

const OpionModalInside = styled(AutoColumn)`
  width: 502px;
  @media (max-width: 800px) {
    width: 100%;
    /* max-height: 300px; */
  }
`

const OptionModalHeader = ({ setOpenOptions }: OptionsModalProps) => {
  return (
    <Box paddingBottom="8px">
      <AutoRow justify="space-between" align="start">
        <AutoColumn gap="8px">
          <H3>Settings</H3>
          <Body1>Adjust to your personal preferences</Body1>
        </AutoColumn>
        <div style={{ margin: '10px', cursor: 'pointer' }} onClick={() => setOpenOptions(false)}>
          <X size={24} />
        </div>
      </AutoRow>
    </Box>
  )
}

const OptionModalBody = () => {
  const [slippage, setSlippage] = useState<boolean>(false)
  const [offset, setOffset] = useState<boolean>(false)
  const [swapAPI, setSwapAPI] = useState<boolean>(false)

  const formatPercentInput = useFormatPercentInput()

  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()

  const defaultSlippageInputValue =
    userSlippageTolerance !== SlippageTolerance.Auto &&
    !userSlippageTolerance.equalTo(DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE)
      ? formatPercentInput(userSlippageTolerance)
      : ''

  console.log(
    userSlippageTolerance,
    SlippageTolerance.Auto,
    defaultSlippageInputValue,
    DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE
  )

  const [slippageLevel, setSlippageLevel] = useState<string>(defaultSlippageInputValue)

  useEffect(() => {
    console.log('hi')
  }, [userSlippageTolerance])

  function handleSlippageChange(percentage: string): void {
    setSlippageLevel(percentage === slippageLevel ? ' ' : percentage)
  }

  return (
    <>
      <Card>
        <AutoRow justify="space-between" align="center">
          <AutoColumn gap="8px" style={{ width: '90%' }}>
            <Body2>Automatic Slippage Tolerance</Body2>
            <Body2 color="#D0D5DD">
              Turn off automatic slippage to lerance <br />
              to adjust the value.
            </Body2>
          </AutoColumn>
          <SwitchWrapper>
            <Switch switched={slippage} onSwitchChange={(value) => setSlippage(value)} />
          </SwitchWrapper>
        </AutoRow>
        <hr
          style={{
            borderColor: '#FCFCFD14',
            margin: '24px 0',
            borderWidth: '0.5px',
          }}
        />
        <AutoColumn gap="16px">
          <AutoRow justify="space-between" align="center">
            <div>
              <AutoRow>
                <Body2>Slippage</Body2>
                <InfoCircleSVG fill="#D0D5DD" />
              </AutoRow>
            </div>
            <Body2 color="#D0D5DD">{defaultSlippageInputValue}%</Body2>
          </AutoRow>
          <SlippageWrapper>
            <SlippageBox
              selected={slippageLevel === '0.1'}
              onClick={() => {
                const parsed = Math.floor(0.1 * 100)
                setUserSlippageTolerance(new Percent(parsed, 10_000))
                handleSlippageChange('0.1')
              }}
            >
              0.1%
            </SlippageBox>
            <SlippageBox
              selected={slippageLevel === '0.5'}
              onClick={() => {
                const parsed = Math.floor(0.5 * 100)
                setUserSlippageTolerance(new Percent(parsed, 10_000))
                handleSlippageChange('0.5')
              }}
            >
              0.5%
            </SlippageBox>
            <SlippageBox
              selected={slippageLevel === '1.0'}
              onClick={() => {
                const parsed = Math.floor(1.0 * 100)
                setUserSlippageTolerance(new Percent(parsed, 10_000))
                handleSlippageChange('1.0')
              }}
            >
              1.0%
            </SlippageBox>
            <Border />
            <InputWrapper>
              <SlippageInput
                value={slippageLevel}
                onChange={(e) => {
                  const value = e.target.value
                  const parsed = Math.floor(Number.parseFloat(value) * 100)
                  setUserSlippageTolerance(new Percent(parsed, 10_000))
                  setSlippageLevel(value)
                }}
              />
              %
            </InputWrapper>
          </SlippageWrapper>
        </AutoColumn>
      </Card>
      <Card>
        <AutoRow justify="space-between" align="center">
          <AutoColumn gap="8px" style={{ width: '90%' }}>
            <Body2>Carbon Offset</Body2>
            <Body2 color="#D0D5DD">
              Make transactions climate positive by offsetting them with Klima infinity. The average cost to offset a
              transaction on Polygon is less than $0.01.
            </Body2>
          </AutoColumn>
          <SwitchWrapper>
            <Switch switched={offset} onSwitchChange={(value) => setOffset(value)} />
          </SwitchWrapper>
        </AutoRow>
      </Card>
      <Card>
        <AutoRow justify="space-between" align="center">
          <AutoColumn gap="8px" style={{ width: '90%' }}>
            <Body2>Swap API</Body2>
            <Body2 color="#D0D5DD">Switch to the client for trade discovery by deactivating the SWAP API</Body2>
          </AutoColumn>
          <SwitchWrapper>
            <Switch switched={swapAPI} onSwitchChange={(value) => setSwapAPI(value)} />
          </SwitchWrapper>
        </AutoRow>
      </Card>
    </>
  )
}

const OptionModal = ({ setOpenOptions }: OptionsModalProps) => {
  const { width } = useWindowSize()

  return (
    <OptionModalWrapper
      isOpen
      $scrollOverlay
      onDismiss={() => setOpenOptions(false)}
      maxHeight={90}
      slideIn
      maxWidth={width && width > 800 ? 500 : 450}
    >
      <OpionModalInside gap="16px" style={{ padding: '24px' }}>
        <OptionModalHeader setOpenOptions={setOpenOptions} />
        <OptionModalBody />
      </OpionModalInside>
    </OptionModalWrapper>
  )
}

export default OptionModal
