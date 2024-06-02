import { useTranslation } from 'react-i18next'

export interface MenuSection {
  title: string
  items: MenuItem[]
  closeMenu?: () => void
}

export interface MenuItem {
  label: string
  href: string
  internal?: boolean
  overflow?: boolean
  closeMenu?: () => void
}

export const useMenuContent = (): MenuSection[] => {
  const { t } = useTranslation()
  return [
    {
      title: t('Company'),
      items: [
        {
          label: t('Careers'),
          href: 'https://www.linkedin.com/company/niza-global-uab/jobs/',
        },
        { label: t('Blog'), href: 'https://help.niza.io/hc/en-us' },
      ],
    },
    {
      title: t('Need help?'),
      items: [
        {
          label: t('Contact us'),
          href: 'https://www.niza.io/contact',
        },
        {
          label: t('Help Center'),
          href: 'https://help.niza.io/hc/en-us',
        },
      ],
    },
  ]
}
