import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

export const RootStack = createStackNavigator();
export const DemoTabStack = createBottomTabNavigator();
export const DemoModalStack = createStackNavigator();
export const DemoNestedLv1Stack = createStackNavigator();
export const DemoNestedLv2Stack = createStackNavigator();
export const DemoDrawerStack = createDrawerNavigator();
export const DemoTabRNComponentsStack = createBottomTabNavigator();
export const DemoCryptoCurrencyTabStack = createBottomTabNavigator();
export const DemoSocialMediaTabStack = createBottomTabNavigator();
export const AuthTopTabStack = createMaterialTopTabNavigator();
export const DemoHealthTabStack = createBottomTabNavigator();
export const DemoDatingTabStack = createBottomTabNavigator();
export const DemoChatStack = createStackNavigator();
