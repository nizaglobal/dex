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
          href: 'https://boards.greenhouse.io/uniswaplabs',
        },
        { label: t('Blog'), href: 'https://blog.uniswap.org/' },
      ],
    },
    {
      title: t('Need help?'),
      items: [
        {
          label: t('Contact us'),
          href: 'https://support.uniswap.org/hc/en-us/requests/new',
        },
        {
          label: t('Help Center'),
          href: 'https://support.uniswap.org/hc/en-us',
        },
      ],
    },
  ]
}
