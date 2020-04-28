import IMask from 'imask/esm';

export const options = {
    "date": {
        mask: Date,
        pattern: 'Y-`m-`d',
        blocks: {
          d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 9999,
          }
        },
        format: function (date) {
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
      
          if (day < 10) day = "0" + day;
          if (month < 10) month = "0" + month;
      
          return [year, month, day].join('-');
        },
        parse: function (str) {
          var yearMonthDay = str.split('-');
          return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
        },
        lazy: false
    },
    "text": {
        mask: String,
        maxLength: 25
    },
    "number": {
        mask: Number,
        pattern: ''
    },
    "currency": {
        mask: 'num zł',
        unmask: true,
        lazy: false,
        blocks: {
            num: {
                mask: Number,
                scale: 2,
                signed: true,
                thousandsSeparator: ' ',
                radix: ',',
                mapToRadix: ['.']
            }
        }
    }
}