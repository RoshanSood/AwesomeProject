import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScoresScreen from './ScoresScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Scores"
          component={ScoresScreen}
          options={{title: 'NBA Scores'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
