// Header.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MoreInfoModal from '../Components/MoreInfoModal';

const HeaderWithModal = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToHome = () => {
    navigation.navigate('Home'); // Replace 'Home' with the actual name of your home screen
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={navigateToHome}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.moreInfoButton} onPress={toggleModal}>
          <FontAwesome name="info-circle" size={24} color="#388E3C" />
        </TouchableOpacity>
      </View>

      <MoreInfoModal isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 6,
  },
  logo: {
    width: 130,
    height: 80,
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  moreInfoButton: {
    paddingTop: 20,
    borderRadius: 8,
  },
});

export default HeaderWithModal;
