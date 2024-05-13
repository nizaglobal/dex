import styled from 'styled-components'

interface LightGradientProps {
  left?: string
  top?: string
  size?: string
}

const Light = styled.div<{ left: string; top: string; size: string }>`
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  width: ${(props) => props.size};
  // Adjust as needed
  height: ${(props) => props.size};
  border-radius: 100%;
  background: radial-gradient(
    circle at 50%,
    #f2f23020 0%,
    #f2f23015 15%,
    #f2f23009 40%,
    #f2f23002 50%,
    transparent 55%
  );
  z-index: -4;
  overflow: hidden;
`

const LightGradient = ({ left = '0px', top = '0px', size = '50px' }: LightGradientProps) => {
  return <Light left={left} top={top} size={size} />
}

export default LightGradient
