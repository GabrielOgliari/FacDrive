import 'styled-components'
import { colors } from '../constants/colors'
import { weights } from '../constants/weights'
import { sizes } from '../constants/sizes'
import { spacings } from '../constants/spacings'
import { radius } from '../constants/radius'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors
    weights: typeof weights
    sizes: typeof sizes
    spacings: typeof spacings
    radius: typeof radius
  }
}
