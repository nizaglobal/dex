import styled from 'styled-components'

interface SwitchProps {
  switched: boolean
  onSwitchChange: (value: boolean) => void
}

const SwitchWrapper = styled.div<{ switched: boolean }>`
  width: 40px;
  height: 22px;
  border: 1px solid ${({ theme, switched }) => (switched ? '#DCDC2C' : theme.border1)};
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  background-color: ${(props) => (props.switched ? '#DCDC2C' : 'transparent')};
`

const SwitchBall = styled.div<{ switched: boolean }>`
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 100px;
  float: ${(props) => (props.switched ? 'right' : 'left')};
  box-shadow: 0px 1px 2px 0px #1018280f;
  box-shadow: 0px 1px 3px 0px #1018281a;
`

const Switch = ({ switched, onSwitchChange }: SwitchProps) => {
  return (
    <SwitchWrapper switched={switched} onClick={() => onSwitchChange(!switched)}>
      <SwitchBall switched={switched} />
    </SwitchWrapper>
  )
}

export default Switch
