import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

export const {SUCCESS, DANGER, INFO, WARNING} = ALERT_TYPE;

function showAlert(
  status:
    | ALERT_TYPE.SUCCESS
    | ALERT_TYPE.DANGER
    | ALERT_TYPE.INFO
    | ALERT_TYPE.WARNING,
  textBody: string,
) {
  function generateTitleAlert(status: string) {
    return status;
  }

  return Dialog.show({
    type: status,
    title: generateTitleAlert(status),
    textBody: textBody,
  });
}

export default showAlert;
