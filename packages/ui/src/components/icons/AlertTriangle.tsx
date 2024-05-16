import { Path, Svg } from 'react-native-svg'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon'

export const [AlertTriangle, AnimatedAlertTriangle] = createIcon({
  name: 'AlertTriangle',
  getIcon: (props) => (
    <Svg fill="none" height={props.height} viewBox="0 0 24 21" width={props.width}>
      <Path
        d="M11.9998 7.99999V12M11.9998 16H12.0098M10.6151 2.89171L2.39019 17.0983C1.93398 17.8863 1.70588 18.2803 1.73959 18.6037C1.769 18.8857 1.91677 19.142 2.14613 19.3088C2.40908 19.5 2.86435 19.5 3.77487 19.5H20.2246C21.1352 19.5 21.5904 19.5 21.8534 19.3088C22.0827 19.142 22.2305 18.8857 22.2599 18.6037C22.2936 18.2803 22.0655 17.8863 21.6093 17.0983L13.3844 2.89171C12.9299 2.10654 12.7026 1.71396 12.4061 1.58211C12.1474 1.4671 11.8521 1.4671 11.5935 1.58211C11.2969 1.71396 11.0696 2.10655 10.6151 2.89171Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </Svg>
  ),
})
