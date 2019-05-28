import React from 'react';
import { createStackNavigator, createAppContainer } from
'react-navigation';
import PlacesPage from './Pages/PlacesPage';
import MapPage from './Pages/MapPage';
import MainPage from './Pages/MainPage';
import CameraPage  from './Pages/CameraPage';
import PushPage  from './Pages/PushPage';

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
    MainPage,
    CameraPage,
    PushPage
  },
  {
    initialRouteName: 'MainPage',
  }
);
export default createAppContainer(AppNavigator);
