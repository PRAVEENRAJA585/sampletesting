import _ from '@lodash';

const ContactModel = (data) =>
  _.defaults(data || {}, {
    calenderName: '',
    calenderYear: '',
    description: '',
    holidays: [{ holidayName: '', holidayDate: '' }],

  });

export default ContactModel;
