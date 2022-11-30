// ** Icon imports

import CarElectricOutline from 'mdi-material-ui/CarElectricOutline'
import EvStation from 'mdi-material-ui/EvStation'
import CarWrench from 'mdi-material-ui/CarWrench'
import Plus from 'mdi-material-ui/Plus'

// ** Type import

import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Admin',
      icon: CarElectricOutline,
      children: [
        {
          title: 'poles database',
          icon: CarElectricOutline,
          path: '/apps/admin/list'
        },
        {
          title: 'add new poles',
          icon: Plus,
          path: '/apps/admin/add'
        }
      ]
    }
  ]
}

export default navigation
