import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import useThemeColors from 'hooks/useThemeColors';
import { ms, s, vs } from 'react-native-size-matters';
import { observer } from 'mobx-react-lite';
import NetInfo from '@react-native-community/netinfo';
import { IColors } from 'shared/interfaces';
import { VibrateError } from 'shared/utils/vibration';
import { useAlertStore } from 'shared/store/alert';
import Modal from 'react-native-modal';
import ErrorAlert from './ErrorAlert';
import NoHero from './NoHero';
import NoInternet from './NoInternet';
import NoServerResponse from './NoServerResponse';

const ModalAlert = observer(() => {
  const { showAlert, hideAlert, alert } = useAlertStore();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  if (alert.isVisible) {
    VibrateError();
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        showAlert('noInternet');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Modal
      isVisible={alert.isVisible}
      onSwipeComplete={hideAlert}
      swipeDirection={['down']}
      onBackdropPress={hideAlert}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      statusBarTranslucent={true}
    >
      <View style={styles.alertContainer}>
        {/* Полоса для жеста свайпа */}
        <View style={styles.swipeIndicator} />

        {alert.type == 'error' && <ErrorAlert />}

        {alert.type == 'noHero' && <NoHero />}

        {alert.type == 'noInternet' && <NoInternet />}

        {alert.type == 'noResponse' && <NoServerResponse />}
      </View>
    </Modal>
  );
});

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end', // Модалка появляется снизу
      margin: 0, // Убираем отступы вокруг модалки
    },
    swipeIndicator: {
      width: s(40),
      height: vs(4),
      backgroundColor: colors.elementBackground,
      borderRadius: ms(2),
      alignSelf: 'center',
      marginBottom: vs(10),
    },
    alertContainer: {
      width: '100%',
      paddingTop: ms(10),
      paddingHorizontal: ms(20),
      borderTopLeftRadius: ms(15),
      borderTopRightRadius: ms(15),
      backgroundColor: colors.appBackground,
      alignItems: 'center',
      gap: ms(20),
      paddingBottom: vs(30),
    },
  });

export default ModalAlert;
