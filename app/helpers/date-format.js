import { helper } from '@ember/component/helper';
import { format } from 'date-fns';

export default helper(function dateFormat(
  [date, formatString, noDateMessage, extraOptions] /*, named*/
) {
  if (date) return format(date, formatString, extraOptions);
  else if (noDateMessage) return noDateMessage;
  else return 'Unspecified date';
});
