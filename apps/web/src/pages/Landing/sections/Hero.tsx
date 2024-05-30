import { useCurrency } from 'hooks/Tokens'
import { Trans } from 'i18n'
import { Swap } from 'pages/Swap'
import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import LightGradient from 'components/Common/LightGradient'
import { Text } from 'ui/src'
import { Box, H1 } from '../components/Generics'
import { RiseIn, RiseInText } from '../components/animations'

const PrimaryText = styled(H1)`
  color: ${({ theme }) => theme.accent1};
`

const Container = styled(Box)`
  min-width: 100%;
  padding-top: 72px;
`

const StarsContainer = styled.div`
  width: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;

  & img {
    width: 100%;
    object-fit: cover;
  }
`

const LandingSwapContainer = styled(Box)`
  width: 480px;
  padding: 8px;
  border-radius: 24px;
  background: ${({ theme }) => theme.surface1};
`
const LandingSwap = styled(Swap)`
  position: relative;
  width: 100%;

  & > div:first-child {
    padding: 0px;
  }
  & > div:first-child > div:first-child {
    display: none;
  }
`
const StyledH1 = styled(H1)`
  @media (max-width: 768px) {
    font-size: 52px;
  }
  @media (max-width: 464px) {
    font-size: 36px;
  }
  @media (max-height: 668px) {
    font-size: 28px;
  }
`
const shrinkAndFade = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`
const Center = styled(Box)<{ transition?: boolean }>`
  width: unset;
  pointer-events: none;
  padding: 48px 0px;
  @media (max-width: 464px), (max-height: 700px) {
    padding-top: 24px;
  }
  @media (max-width: 464px), (max-height: 668px) {
    padding-top: 8px;
  }
  gap: 24px;
  @media (max-height: 800px) {
    gap: 16px;
  }
  ${({ transition }) =>
    transition &&
    css`
      animation: ${shrinkAndFade} 1s ease-in-out forwards;
    `};
`

interface HeroProps {
  scrollToRef: () => void
  transition?: boolean
}

export function Hero({ transition }: HeroProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }
  const initialInputCurrency = useCurrency('ETH')

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const translateY = -scrollPosition / 7
  const opacityY = 1 - scrollPosition / 1000

  return (
    <Container
      position="relative"
      height="120vh"
      justify="center"
      style={{
        transform: `translate(0px, ${translateY}px)`,
        opacity: opacityY,
        overflowX: 'hidden',
        overflowY: 'clip',
      }}
    >
      <LightGradient size="200px" left="15%" top="22%" />
      <LightGradient size="200px" left="30%" top="40%" />
      <LightGradient size="200px" left="5%" top="70%" />
      <LightGradient size="200px" left="45%" top="80%" />
      <LightGradient size="200px" left="40%" top="15%" />
      <LightGradient size="200px" left="85%" top="15%" />
      <LightGradient size="200px" left="93%" top="90%" />
      <LightGradient size="200px" left="93%" top="50%" />
      <StarsContainer>
        <img src="/images/stars.png" alt="" />
      </StarsContainer>
      <StarsContainer>
        <img src="/images/lights.png" alt="" style={{ opacity: 0.05 }} />
      </StarsContainer>
      <StarsContainer>
        <img src="/images/brighterStars.png" alt="" style={{ opacity: 0.2 }} />
      </StarsContainer>
      <Center
        direction="column"
        align="center"
        maxWidth="85vw"
        transition={transition}
        style={{
          transform: `translate(0px, ${translateY}px)`,
          opacity: opacityY,
        }}
      >
        <Box maxWidth="920px" direction="column" align="center">
          <StyledH1>
            <RiseInText delay={0.0}>
              <Trans>Swap has never</Trans>
            </RiseInText>{' '}
          </StyledH1>
          <RiseIn delay={0.2}>
            <StyledH1>
              <Trans>
                been so <PrimaryText>easy</PrimaryText>
              </Trans>
            </StyledH1>
          </RiseIn>
        </Box>

        <RiseIn delay={0.4}>
          <LandingSwapContainer>
            <LandingSwap
              syncTabToUrl={false}
              initialInputCurrency={initialInputCurrency}
              swapHeaderWithoutOptions={true}
            />
          </LandingSwapContainer>
        </RiseIn>

        <RiseIn delay={0.3}>
          <Text
            variant="body1"
            textAlign="center"
            maxWidth={572}
            color="$neutral2"
            $short={{
              variant: 'body2',
            }}
          >
            <Trans>
              Unlock the world of cryptocurrency trading. Experience the freedom to trade over 400 tokens instantly, no
              registration needed.
            </Trans>
          </Text>
        </RiseIn>
      </Center>
    </Container>
  )
}
