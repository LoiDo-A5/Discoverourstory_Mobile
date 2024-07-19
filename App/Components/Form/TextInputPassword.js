import React, {useMemo, useState, useCallback} from 'react';
import {View, TouchableOpacity, Image, TextInput} from 'react-native';

import styles from './Styles/TextInputPasswordStyles';
import {Colors} from '../../Configs/Colors';
import Images from '../../Configs/Images';
import Text from '../Text';

const _TextInputPassword = ({
  label,
  placeholder,
  onChange,
  wrapStyle,
  maxLength,
  secureTextEntry,
  textInputStyle,
  labelStyle,
  errorText,
  onBlur,
  defaultValue,
  onSubmitEditing,
  onFocus,
  editable,
  keyboardType,
  value,
  extraText,
  autoFocus,
  multiline,
  testID,
  returnKeyType = 'default',
  eyeColor,
  wrapInputStyle,
  errorStyle,
  accessibilityLabel,
  accessibilityLabelError,
}) => {
  const [visible, setVisibility] = useState(true);

  const onPressEye = useCallback(() => {
    setVisibility(prev => !prev);
  }, []);

  const renderEye = useMemo(() => {
    return (
      <TouchableOpacity onPress={onPressEye} style={styles.icons}>
        {eyeColor ? (
          <Image source={visible ? Images.eyeClosed : Images.greeneye} />
        ) : (
          <Image source={visible ? Images.eyeClosed : Images.eye} />
        )}
      </TouchableOpacity>
    );
  }, [eyeColor, onPressEye, visible]);

  return (
    <View style={[styles.wrap, wrapStyle]}>
      {!!label &&
        (typeof label === 'string' || typeof label === 'number' ? (
          <Text style={labelStyle}>{label}</Text>
        ) : (
          label
        ))}
      <View
        style={[
          styles.wrapInput,
          wrapInputStyle,
          !!errorText && styles.errorWrap,
          !!errorStyle && errorStyle,
        ]}>
        <TextInput
          testID={testID}
          placeholderTextColor={Colors.SwitchButton}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          autoFocus={autoFocus}
          maxLength={maxLength}
          secureTextEntry={visible}
          style={[styles.textInput, textInputStyle]}
          placeholder={placeholder}
          onChangeText={onChange}
          defaultValue={defaultValue}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          multiline={multiline}
          {...(value ? {value} : {})}
          returnKeyType={returnKeyType}
          accessibilityLabel={accessibilityLabel}
        />
        {renderEye}
      </View>
      {extraText && extraText}
      {!!errorText && (
        <Text
          accessibilityLabel={accessibilityLabelError}
          style={styles.errorText}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default _TextInputPassword;
