import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const appointmentTypes = [
  'Routine',
  'Referral',
  'Test Results',
  'Sick/Fit Notes',
  'Wellbeing',
  'One-Off',
  'Other',
];

const RequestScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setDOB(date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const handleAppointmentTypePress = () => {
    Alert.alert(
      'Select Appointment Type',
      '',
      appointmentTypes.map((type) => ({
        text: type,
        onPress: () => {
          setSelectedAppointmentType(type);
        },
      })),
      { cancelable: true }
    );
  };

  const handleSubmit = async () => {
    // Validation
    if (!firstName || !lastName || !dob || !email || !phoneNumber || !selectedAppointmentType || !requestDescription) {
      Alert.alert('Warning', 'All fields are required.');
      return;
    }

    // Additional validation (you can customize as needed)
    if (!email.includes('@')) {
      Alert.alert('Warning', 'Invalid email address.');
      return;
    }

    if (!/^\d{11}$/.test(phoneNumber)) {
      Alert.alert('Warning', 'Invalid phone number. It should be 11 digits.');
      return;
    }

    const dataToSave = `First Name: ${firstName}\nLast Name: ${lastName}\nDate of Birth: ${dob}\nEmail: ${email}\nTelephone Number: ${phoneNumber}\nAppointment Type: ${selectedAppointmentType}\nDescription of Request: ${requestDescription}\n\n`;

    try {
      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}appointmentRequests.txt`,
        dataToSave,
        { encoding: FileSystem.EncodingType.UTF8, append: true }
      );

      console.log('Data saved to file successfully');
      Alert.alert('Success', 'Appointment request submitted successfully.');
    } catch (error) {
      console.error('Error saving data to file:', error);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Appointment Request',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Clear form fields
            setFirstName('');
            setLastName('');
            setDOB('');
            setEmail('');
            setPhoneNumber('');
            setSelectedAppointmentType('');
            setRequestDescription('');

            // Navigate back to the home screen
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.scrollViewContainer}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.box}>
          <Text style={styles.boxTextTitle}>Request An Appointment</Text>
          <Text style={styles.boxText}>To request an appointment, please fill out the form below.
            If you expereince any issues please press the more info button at the top right of your screen!
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="Enter your first name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="Enter your last name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth:</Text>
            <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
              <Text>{dob || 'Select date of birth'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setDOB(date.toISOString().split('T')[0]);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Telephone Number:</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholder="Enter your telephone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Appointment Type:</Text>
            <TouchableOpacity style={styles.dateInput} onPress={handleAppointmentTypePress}>
              <Text>{selectedAppointmentType || 'Select appointment type'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description of Request:</Text>
            <TextInput
              style={styles.textArea}
              value={requestDescription}
              onChangeText={(text) => setRequestDescription(text)}
              placeholder="Please explain why you are making this appointment request"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container1: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: 130,
    marginBottom: 40,
    alignSelf: 'center',
    borderBottomColor: '#388E3C',
    borderBottomWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 10,
  },
  boxTextTitle: {
    fontSize: 17,
    alignSelf: 'center',
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boxText: {
    fontSize: 13,
    alignSelf: 'center',
    padding: 5,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#E0F7E1',
    padding: 16,
    width: '100%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  picker: {
    height: 40,  
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    padding: 10,
    marginLeft: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});

export default RequestScreen;