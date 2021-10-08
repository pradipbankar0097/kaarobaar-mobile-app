import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Containers
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import ContactUsScreen from "./containers/ContactUsScreen";
import AboutUsScreen from "./containers/AboutUsScreen";
import MyAccountScreen from "./containers/MyAccountScreen";

// for firebase
import firebase from 'firebase/app'
import "firebase/firestore"



// Components
import Logo from "./components/Logo.js";
import GoBack from "./components/GoBack.js";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



// Initialize Firebase
// firebase.initializeApp(firebaseConfig);





export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const getToken = () => {
    if (userToken) {
      return userToken;
    }
    else {
      setToken(null);
      return false;
    }


  }
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp">
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignIn">
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "#F7DB15",
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: () => <Logo size="small" />,
                      }}
                    >
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "My App",
                          headerStyle: { backgroundColor: "white" },
                          headerRight: () => (
                            <Button
                              onPress={() => alert('This is a button!')}
                              title="Free Trail!"
                              color="#f7db15"
                            />
                          ),
                        }}
                      >
                        {(props) => (
                          <HomeScreen {...props} setToken={setToken} />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",

                          headerLeft: () => <GoBack />,
                        }}
                      >
                        {(props) => (
                          <RoomScreen {...props} setToken={setToken} />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* manually added */}
                {/* <Tab.Screen
                  name="Booking"
                  getToken={getToken}
                  options={{
                    tabBarLabel: "Booking",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"bookmark"}
                        size={size}
                        color={color}
                      />

                    ),
                  }}
                >

                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen> */}
                {/* end manually added */}

                {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/* manually added */}
                <Tab.Screen
                  name="temp"
                  options={{
                    tabBarLabel: "Reviews",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person"}
                        size={size}
                        color={color}
                      />

                    ),
                  }}
                >

                  {() => (

                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: () => <Logo size="small" />,
                      }}
                    >
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "My App",
                          headerStyle: { backgroundColor: "white" },
                          headerRight: () => (
                            <Button
                              onPress={() => alert('This is a button!')}
                              title="Free Trail!"
                              color="#f7db15"
                            />
                          ),
                        }}
                      >
                        {(props) => (
                          <SettingsScreen {...props} setToken={setToken} />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",

                          headerLeft: () => <GoBack />,
                        }}
                      >
                        {(props) => (
                          <ContactUsScreen {...props} setToken={setToken} />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="ContactUsScreen"
                        options={{
                          title: "Contact us",
                        }}
                      >
                        {() => <ContactUsScreen />}

                      </Stack.Screen>
                      <Stack.Screen
                        name="AboutUsScreen"
                        options={{
                          title: "About us",
                        }}
                      >
                        {() => <AboutUsScreen />}

                      </Stack.Screen>
                      <Stack.Screen
                        name="MyAccountScreen"
                        options={{
                          title: "My Account",
                        }}
                      >
                        {(props) => (
                          <MyAccountScreen {...props} setToken={setToken} getToken={getToken} />
                        )}
                      </Stack.Screen>
                      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* end manually added */}




                {/* manually added */}
                {/* <Tab.Screen
                  name="Reviews"
                  options={{
                    tabBarLabel: "Reviews",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"star"}
                        size={size}
                        color={color}
                      />

                    ),
                  }}
                >

                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen> */}
                {/* end manually added */}

                {/* <Tab.Screen
                  name="Settings"
                  options={{
                    tabBarLabel: "Account",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"person"}
                        size={size}
                        color={color}
                      />

                    ),
                  }}
                >

                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen> */}

              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
