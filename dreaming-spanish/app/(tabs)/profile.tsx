import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

export default function Settings() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const colors = {
    primary: '#FF7F36',
    bg: '#F4F4F4',
    black: '#27283a',
    white: '#FFFFFF',
  };

  const handleResourcesPress = () => {
    Alert.alert(
      'Leave App',
      'Do you want to leave the app and visit the resources page?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
         
        },
        {
          text: 'Yes',
          onPress: () => Linking.openURL('https://www.dreamingspanish.com/resources'),
        },
      ],
      { cancelable: false }
    );
  };
  
  
  const handleLogout = () => {
    // Perform logout action (front-end only)
    console.log('Logout clicked');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.black }]}>Settings</Text>
        </View>

        <ScrollView>
          <View style={styles.profile}>
            <Text style={[styles.profileName, { color: colors.black }]}>John Doe</Text>

            <Text style={[styles.profileEmail, { color: colors.black }]}>john.doe@mail.com</Text>

            <TouchableOpacity onPress={() => {}}>
              <View style={[styles.profileAction, { backgroundColor: colors.primary }]}>
                <Text style={[styles.profileActionText, { color: colors.white }]}>Edit Profile</Text>

                <Feather color={colors.white} name="edit" size={16} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.black }]}>Preferences</Text>

            <View style={styles.sectionBody}>
              <View style={[styles.rowWrapper, styles.rowFirst]}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: colors.primary }]}>
                    <Feather color={colors.white} name="moon" size={20} />
                  </View>

                  <Text style={[styles.rowLabel, { color: colors.black }]}>Dark Mode</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    onValueChange={darkMode => setForm({ ...form, darkMode })}
                    value={form.darkMode}
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.black }]}>Notifications</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: colors.primary }]}>
                      <Feather color={colors.white} name="at-sign" size={20} />
                    </View>

                    <Text style={[styles.rowLabel, { color: colors.black }]}>Email Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={emailNotifications => setForm({ ...form, emailNotifications })}
                      value={form.emailNotifications}
                    />
                  </View>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: colors.primary }]}>
                      <Feather color={colors.white} name="bell" size={20} />
                    </View>

                    <Text style={[styles.rowLabel, { color: colors.black }]}>Push Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={pushNotifications => setForm({ ...form, pushNotifications })}
                      value={form.pushNotifications}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.black }]}>Resources</Text>

              <View style={styles.sectionBody}>
                <TouchableOpacity onPress={handleResourcesPress}>
                  <View style={[styles.row, styles.rowWrapper, styles.rowFirst]}>
                    <View style={[styles.rowIcon, { backgroundColor: colors.primary }]}>
                      <Feather color={colors.white} name="external-link" size={20} />
                    </View>

                    <Text style={[styles.rowLabel, { color: colors.black }]}>Visit Resources</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.black }]}>Account</Text>

              <View style={styles.sectionBody}>
                <TouchableOpacity onPress={handleLogout}>
                  <View style={[styles.row, styles.rowWrapper, styles.rowFirst]}>
                    <View style={[styles.rowIcon, { backgroundColor: colors.primary }]}>
                      <Feather color={colors.white} name="log-out" size={20} />
                    </View>

                    <Text style={[styles.rowLabel, { color: colors.black }]}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
   paddingVertical: 24,
   paddingHorizontal: 0,
   flexGrow: 1,
   flexShrink: 1,
   flexBasis: 0,
 },
 header: {
   paddingLeft: 24,
   paddingRight: 24,
   marginBottom: 12,
 },
 title: {
   fontSize: 32,
   fontWeight: '700',
   marginBottom: 6,
 },
 profile: {
   padding: 16,
   flexDirection: 'column',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderTopWidth: 1,
   borderBottomWidth: 1,
   borderColor: '#e3e3e3',
 },
 profileName: {
   marginTop: 12,
   fontSize: 20,
   fontWeight: '600',
 },
 profileEmail: {
   marginTop: 6,
   fontSize: 16,
   fontWeight: '400',
 },
 profileAction: {
   marginTop: 12,
   paddingVertical: 10,
   paddingHorizontal: 16,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 12,
 },
 profileActionText: {
   marginRight: 8,
   fontSize: 15,
   fontWeight: '600',
 },
 section: {
   paddingTop: 12,
 },
 sectionTitle: {
   marginVertical: 8,
   marginHorizontal: 24,
   fontSize: 14,
   fontWeight: '600',
   textTransform: 'uppercase',
   letterSpacing: 1.2,
 },
 sectionBody: {
   paddingLeft: 24,
   backgroundColor: '#fff',
   borderTopWidth: 1,
   borderBottomWidth: 1,
   borderColor: '#e3e3e3',
 },
 row: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'flex-start',
   paddingRight: 16,
   height: 50,
 },
 rowWrapper: {
   borderTopWidth: 1,
   borderColor: '#e3e3e3',
 },
 rowFirst: {
   borderTopWidth: 0,
 },
 rowIcon: {
   width: 30,
   height: 30,
   borderRadius: 4,
   alignItems: 'center',
   justifyContent: 'center',
   marginRight: 12,
 },
 rowLabel: {
   fontSize: 17,
   fontWeight: '500',
 },
 rowSpacer: {
   flexGrow: 1,
   flexShrink: 1,
   flexBasis: 0,
 },
});
