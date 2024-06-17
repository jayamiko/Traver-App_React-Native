import React from 'react';
import {Button, View} from 'react-native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

type Props = {
  status:
    | ALERT_TYPE.SUCCESS
    | ALERT_TYPE.DANGER
    | ALERT_TYPE.INFO
    | ALERT_TYPE.WARNING;
  title: string;
  textBody: string;
};

function AlertNotification(props: Props) {
  return (
    <AlertNotificationRoot>
      <View>
        <Button
          title={'dialog box'}
          onPress={() => {
            Dialog.show({
              type: props.status,
              title: props.title,
              textBody: props.textBody,
            });
            Dialog.hide();
          }}
        />
      </View>
    </AlertNotificationRoot>
  );
}

export default AlertNotification;
