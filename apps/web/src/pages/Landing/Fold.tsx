import { forwardRef } from 'react'
import { Footer } from './sections/Footer'
import { NewsletterEtc } from './sections/NewsletterEtc'

const Fold = forwardRef<HTMLDivElement>(function Fold() {
  return (
    <>
      <NewsletterEtc />
      <Footer />
    </>
  )
})

export default Fold
