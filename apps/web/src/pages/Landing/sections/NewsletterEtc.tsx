import { motion } from 'framer-motion'
import { t, Trans } from 'i18n'
import styled from 'styled-components'

import { PillButton } from '../components/cards/PillButton'
import { Box, H2, H4 } from '../components/Generics'
import { BookOpen, ChatBubbles, HelpCircle } from '../components/Icons'

const SectionLayout = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
  @media (max-width: 768px) {
    padding: 0 48px;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`
const Layout = styled.div`
  width: 100%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  @media (max-width: 768px) {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }
`
const SectionCol = styled(Box)`
  flex-direction: column;
  max-width: 1328px;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 24px;
  }
`
const Card = styled.a<{
  backgroundColor?: string
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  height: 250px;
  border-radius: 20px;
  padding: 32px 28px;
  overflow: hidden;
  text-decoration: none;
  background-color: ${(props) => props.backgroundColor || props.theme.surface2};
  @media (max-width: 1024px) {
    gap: 16px;
    padding: 24px;
  }
  @media (max-width: 768px) {
    gap: 16px;
    padding: 24px;
  }
`
const SquareCard = motion(styled(Card)`
  grid-column: span 1 / span 1;
  grid-row: span 4 / span 4;

  @media (max-width: 768px) {
    grid-column: span 4 / span 4;
    grid-row: span 1 / span 1;
  }
`)
const HelpCenterCard = styled(SquareCard)`
  @media (max-width: 1024px) {
    grid-column: span 2 / span 2;

    grid-row-start: 1;
    grid-row-end: 3;
  }
  @media (max-width: 768px) {
    grid-column: span 4 / span 4;
    grid-row: span 1 / span 1;
  }
`
const BlogCard = styled(SquareCard)`
  @media (max-width: 1024px) {
    grid-column: span 2 / span 2;

    grid-row-start: 3;
    grid-row-end: 5;
  }
  @media (max-width: 768px) {
    grid-column: span 4 / span 4;
    grid-row: span 1 / span 1;
  }
`
const RectCard = motion(styled(Card)`
  grid-column: span 2 / span 2;
  grid-row: span 4 / span 4;

  gap: 32px;

  @media (max-width: 768px) {
    grid-column: span 4 / span 4;
    grid-row: span 1 / span 1;
  }
`)

const helpPrimary = '#F04438'
const helpSecondary = '#B42318'
const blogPrimary = '#ACAC22'
const messagePrimary = '#BA24D5'

export function NewsletterEtc() {
  return (
    <SectionLayout>
      <Box direction="row" maxWidth="1328px" gap="24px" width="100%">
        <SectionCol justify-content="space-between" height="100%">
          <H2>
            <Trans>Connect with us</Trans>
          </H2>
          <Layout>
            <HelpCenterCard
              initial="initial"
              whileHover="hover"
              href="https://help.niza.io/hc/en-us"
              target="_blank"
              rel="noopener noreferrer"
              backgroundColor="#7A271A66"
            >
              <PillButton icon={<HelpCircle fill={helpSecondary} />} color={helpSecondary} label={t`Help Center`} />
              <H4 color={helpPrimary} style={{ fontWeight: '600' }}>
                <Trans>Get support</Trans>
              </H4>
            </HelpCenterCard>
            <BlogCard
              initial="initial"
              whileHover="hover"
              href="https://www.niza.io/"
              target="_blank"
              rel="noopener noreferrer"
              backgroundColor="#66661466"
            >
              <PillButton icon={<BookOpen fill={blogPrimary} />} color={blogPrimary} label={t`Blog`} />
              <H4 color={blogPrimary} style={{ fontWeight: '600' }}>
                <Trans>Insights and news from the team</Trans>
              </H4>
            </BlogCard>
            <RectCard
              backgroundColor="#6F187766"
              initial="initial"
              whileHover="hover"
              href="https://twitter.com/nizacoin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PillButton
                icon={<ChatBubbles fill={messagePrimary} />}
                color={messagePrimary}
                label={t`Stay connected`}
              />
              <H4 color={messagePrimary} style={{ fontWeight: '600' }}>
                <Trans>Follow @Niza on X and Instagram for the latest updates</Trans>
              </H4>
            </RectCard>
          </Layout>
        </SectionCol>
      </Box>
    </SectionLayout>
  )
}
