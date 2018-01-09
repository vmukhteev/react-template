
var React = require('react');

var maskedInput = React.createClass({

  handleChange: function (value) {
    this.input.value = this.handleCurrentValue(this.input.value);
    this.mask.innerHTML = this.setValueOfMask(this.input);
    this.props.onChange(this.input.value);
  },
  componentWillReceiveProps(newProps) {
    if(newProps.value !== this.props.value) {
      if(newProps.value === '') {
        this.input.value = newProps.value;
      }
      else {
        this.input.value = this.handleCurrentValue(newProps.value);
      }
      this.props.onChange(this.input.value);
    }
    this.mask.innerHTML = this.setValueOfMask(this.input);
  },
  handleCurrentValue : function (value) {
    let placeholder = isCharsetPresent || this.props.placeholder;
    let newValue = '';

    if(value === '') return '';

    if(!placeholder) {
      let pattern = new RegExp(this.props.pattern);
      for (i = 0; i < value.length; i++) {
        if(pattern.test(value.substr(0, i+1))) {
          newValue += value[i]
        }
        else {
          break;
        }
      }
      return newValue;
    }

    var isCharsetPresent = this.props.dataCharset,
        maskedNumber = 'MDYМГД_',
        maskedLetter = 'Z',
        maskedAny = 'X',
        l = placeholder.length,
        i, j, isInt, isLetter, isAny, strippedValue, matchesNumber, matchesLetter, matchesAny;

    // strip special characters
    strippedValue = isCharsetPresent ? value.replace(/[^A-zА-я0-9_]/g, "") : value.replace(/\D/g, "");

    for (i = 0, j = 0; i < l; i++) {
        isInt = !isNaN(parseInt(strippedValue[j]));
        isLetter = strippedValue[j] ? strippedValue[j].match(/[А-яA-z]/i) : false;

        if(this.props.charset) {
          isAny = (new RegExp(this.props.charset)).test(strippedValue[j]);
        }
        else {
          isAny = isInt || isLetter;
        }
        matchesNumber = (maskedNumber.indexOf(placeholder[i]) >= 0);
        matchesLetter = (maskedLetter.indexOf(placeholder[i]) >= 0);
        matchesAny = (maskedAny.indexOf(placeholder[i]) >= 0);
        if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter) || (isCharsetPresent && matchesAny && isAny)) {
            newValue += strippedValue[j++];
        }
        else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt) || (matchesAny && !isAny)))) {
              //this.options.onError( e ); // write your own error handling function
              return newValue;
        } else {
            newValue += placeholder[i];

        }
        // break if no characters left and the pattern is non-special character
        if (strippedValue[j] == undefined) {
          break;
        }
    }

    if (this.props['data-valid-example']) {
      return this.validateProgress(e, newValue);
    }


    if(placeholder.indexOf(newValue)>=0) return '';
    return newValue;
  },

  setValueOfMask : function (target) {
    var value = target.value,
        placeholder = target.getAttribute('data-placeholder');

    if(!placeholder) return '';

    return "<i>" + value + "</i>" + placeholder.substr(value.length);
  },

  validateProgress : function (e, value) {
      var validExample = this.props['data-valid-example'],
          pattern = new RegExp(this.props.pattern),
          placeholder = e.target.getAttribute('data-placeholder'),
          l = value.length, testValue = '', i;

      //convert to months
      if ((l == 1) && (placeholder.toUpperCase().substr(0,2) == 'MM')) {
        if(value > 1 && value < 10) {
          value = '0' + value;
        }
        return value;
      }

    for ( i = l; i >= 0; i--) {
        testValue = value + validExample.substr(value.length);
        if (pattern.test(testValue)) {
          return value;
        } else {
          value = value.substr(0, value.length-1);
        }
    }

      return value;
    },

  handleBlur: function (e) {
    var currValue = e.target.value,
        pattern;

    // if value is empty, remove label parent class
    if(currValue.length == 0) {

      if(e.target.required) {
        this.updateLabelClass(e, "required", true);
        this.handleError(e, 'required');
      }

    } else {
      pattern = new RegExp('^' + this.props.pattern + '$');

      if(pattern.test(currValue)) {
        this.updateLabelClass(e, "good", true);
      } else {
        this.updateLabelClass(e, "error", true);
        this.handleError(e, 'invalidValue');
      }

    }
    this.props.onBlur && this.props.onBlur(e);
  },

  handleFocus: function (e) {
      this.updateLabelClass(e, 'focus', false);
  },

  updateLabelClass: function (e, className, replaceExistingClass) {
     var parentLI = e.target.parentNode.parentNode,
         pastClasses = ['error', 'required', 'focus', 'good'],
         i;

     if (replaceExistingClass) {
         for(i = 0; i < pastClasses.length; i++) {
              parentLI.classList.remove(pastClasses[i]);
         }
     }

     parentLI.classList.add(className);
  },

  handleError: function (e, errorMsg) {
      // the event and errorMsg name are passed. Label is already handled. What else do we do with error?
      //var possibleErrorMsgs = ['invalidValue', 'required'];
      return true;
  },

  render: function () {
      var value = this.props.value || '',
          props = {
               type: (this.props && this.props.type) || '' ,
               id: this.props.id,
               placeholder: this.props.placeholder,
               className: "masked " + (this.props.className || ''),
               pattern: this.props.pattern,
               maxLength: this.props.pattern.length,
               title: this.props.title,
               label: this.props.label,
               dataCharset: this.props['data-charset'],
               required: this.props.required
           };

      return (
        <span className="maskShell">
             <span className="maskShell_mask"
              aria-hidden="true"
              ref={(ref) => {this.mask = ref}}
              id={props.id + 'Mask'}><i>{value}</i>{props.placeholder}</span>
             <input ref={(ref) => {this.input = ref}}
             id={props.id}
             onChange={(e) => {this.handleChange(e.target.value)}}
             onFocus={this.handleFocus}
             onBlur={this.handleBlur}
             onClick={this.props.onClick}
             name={props.id}
             type={props.type}
             className={props.className}
             data-placeholder={props.placeholder}
             data-pattern={props.pattern}
             data-valid-example={props.example}
             aria-required={props.required}
             data-charset={props.dataCharset}
             required={props.required}
             title={props.title}
             tabIndex={this.props.tabIndex}
             readOnly={this.props.readOnly}
             />
          </span>
      );
  }
});


module.exports = maskedInput;
