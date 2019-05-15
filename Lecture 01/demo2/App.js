import React from 'react';
import { createStackNavigator, createAppContainer } from
'react-navigation';
import PlacesPage from './Pages/PlacesPage';
import MapPage from './Pages/MapPage';

class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    PlacesPage: PlacesPage,
    MapPage,
  },
  {
    initialRouteName: 'MapPage',
  }
);
export default createAppContainer(AppNavigator);
