import React, { useEffect, useMemo } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import useThemeColors from 'hooks/useThemeColors';
import { ms, s, vs } from 'react-native-size-matters';
import { HomeStore } from 'shared/store/home';
import { observer } from 'mobx-react-lite';
import NetInfo from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { IColors } from 'shared/interfaces';
import { Vibrate } from 'shared/utils/vibration';
import * as Haptics from 'expo-haptics';

const CustomAlert = observer(() => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (HomeStore.alert.isVisible) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        HomeStore.showAlert('NoInternetConnection', 'CheckYourConnection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Modal
      visible={HomeStore.alert.isVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{t(HomeStore.alert.title)}</Text>
          <Text style={styles.message}>{t(HomeStore.alert.message)}</Text>
          <TouchableOpacity
            onPress={() => {
              HomeStore.hideAlert();
              Vibrate();
            }}
            style={styles.button}
          >
            <Text style={{ color: colors.text }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.overlay,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    title: {
      color: colors.text,
      fontSize: ms(15),
      fontWeight: '700',
    },
    message: {
      color: colors.text,
      fontSize: ms(13),
    },
    alertContainer: {
      width: s(290),
      padding: ms(15),
      borderRadius: ms(10),
      alignItems: 'center',
      gap: ms(15),
      backgroundColor: colors.appBackground,
    },
    button: {
      width: s(50),
      height: vs(30),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.elementBackground,
      borderRadius: ms(10),
    },
  });

export default CustomAlert;
