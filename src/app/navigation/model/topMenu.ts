import { TopNavItem } from './topNav-item';

export let topMenu: TopNavItem[] = [
  {
    displayName: 'Transponder',
    iconName: 'sensors',
    children: [
      {
        displayName: 'Add Transponder',
        iconName: 'note_add',
        route: 'addTransponder'
      },
      {
        displayName: 'Update Transponder',
        iconName: 'update',
        route: 'updateTransponder'
      },
      {
        displayName: 'Delete Transponder',
        iconName: 'delete',
        route: 'deleteTransponder'
      },
      {
        displayName: 'View Transponder',
        iconName: 'view_list',
        route: 'addTransponder'
      }
    ]
  },
  {
    displayName: 'Company',
    iconName: 'people',
    children: [
      {
        displayName: 'Add Company',
        iconName: 'note_add',
        route: 'addCompany'
      },
      {
        displayName: 'Update Company',
        iconName: 'update',
        route: 'updateCompany'
      },
      {
        displayName: 'Delete Company',
        iconName: 'delete',
        route: 'deleteCompany'
      },
      {
        displayName: 'View Company',
        iconName: 'view_list',
        route: 'viewCompany'
      }
    ]
  },
  {
    displayName: 'Vehicle',
    iconName: 'commute',
    children: [
      {
        displayName: 'Add Vehicle',
        iconName: 'note_add',
        route: 'addVehicle'
      },
      {
        displayName: 'Update Vehicle',
        iconName: 'update',
        route: 'updateVehicle'
      },
      {
        displayName: 'Delete Vehicle',
        iconName: 'delete',
        route: 'deleteVehicle'
      },
      {
        displayName: 'View Vehicle',
        iconName: 'view_list',
        route: 'vehicleCompanyInfos'
      }
    ]
  }

];
