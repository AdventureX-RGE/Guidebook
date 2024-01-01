import { useRouter } from 'next/router'

export default {
  logo: <span>AdventureX Guidebook</span>,
  project: {
    link: 'https://github.com/AdventureX-RGE/Guidebook'
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – AdventureX'
      }
    }
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true
  },
  // ... other theme options
  navigation: true
}
