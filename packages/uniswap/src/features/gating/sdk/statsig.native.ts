// eslint-disable-next-line no-restricted-imports
import { Statsig, StatsigContext } from 'statsig-react-native'
const statsig = Statsig
const statsigContext: typeof StatsigContext = StatsigContext

// eslint-disable-next-line no-restricted-imports
export {
  DynamicConfig,
  useConfig,
  useExperiment,
  useExperimentWithExposureLoggingDisabled,
  useGate,
  useGateWithExposureLoggingDisabled,
} from 'statsig-react-native'
export { statsig as Statsig, statsigContext as StatsigContext }
