import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {View, StyleSheet, Modal} from 'react-native';

import Text from '../Text';
import TextButton from '../TextButton';
import {Colors} from '../../Configs/Colors';

const AlertModal = forwardRef((props, ref) => {
  const [state, setState] = useState({
    title: '',
    description: '',
    buttons: [],
    show: false,
    styleButtons: {},
    onBackdropPress: () => null,
  });

  useImperativeHandle(ref, () => ({
    alert: (title, description, buttons, styleButtons, onBackdropPress) => {
      setState({
        title,
        description,
        buttons,
        show: true,
        styleButtons,
        onBackdropPress,
      });
    },
    hideModal: () => {
      setState(prevState => ({...prevState, show: false}));
    },
  }));
  const renderContent = () => {
    const {description, title} = state;
    return (
      <>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descriptionWrap}>
          {React.isValidElement(description) ? (
            description
          ) : (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      </>
    );
  };

  const renderButtons = () => {
    const justifyContent =
      state.buttons.length === 1 ? 'center' : 'space-between';
    return (
      <View
        key={state.title}
        style={[
          styles.flexRow,
          {
            justifyContent: justifyContent,
          },
          state.styleButtons,
        ]}>
        {state.buttons.map((item, index) => {
          return (
            <TextButton
              key={`item_${index}`}
              primary={item.primary}
              title={item.label}
              onPress={item.onPress}
              wrapStyle={item.style}
            />
          );
        })}
      </View>
    );
  };

  const {buttons, show, onBackdropPress} = state;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        onBackdropPress();
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={[styles.wrap, styles.contentPadding]}>
            {renderContent()}
          </View>
          <View style={[styles.wrap, styles.buttonsPadding]}>
            {!!buttons?.length && renderButtons()}
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    padding: 20,
  },
  wrap: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.Primary,
  },
  descriptionWrap: {
    minHeight: 10,
    paddingVertical: 10,
  },
  description: {
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  contentPadding: {
    paddingBottom: 0,
  },
  buttonsPadding: {
    paddingTop: 0,
    alignItems: 'stretch',
  },
});

export default AlertModal;
