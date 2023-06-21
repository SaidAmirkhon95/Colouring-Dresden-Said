import React, { Fragment } from 'react';
import { BaseDataEntryProps } from './data-entry';
import { DataTitleCopyable } from './data-title';
/* ggf useRef und useState wieder entfernen */

/* const DatePicker = () => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <input
        className="form-control"
        type="date"
        id={slugWithModifier}
        name={slugWithModifier}
        value={props.value == undefined ? '' : props.value}
        max={props.max}
        min={props.min}
        disabled={props.mode === 'view' || props.disabled}
        placeholder={props.placeholder}
        required={props.required}

        onChange={e =>
            props.onChange(
                props.slug,
                e.target.value === '' ? null : parseFloat(e.target.value)
            )
        }        


        onChange={handleChange}
        ref={dateInputRef}
      />
      <p>Selected Date: {date}</p>
    </div>
  );
};
 */

interface TimePickerDataEntryProps extends BaseDataEntryProps {
    value?: string;
    placeholder?: string;
    min?: string;
    max?: string;
}

const TimePickerDataEntry: React.FunctionComponent<TimePickerDataEntryProps> = (props) => {
    const slugWithModifier = props.slug + (props.slugModifier ?? '');

    return (
        <Fragment>
            <DataTitleCopyable
                slug={props.slug}
                slugModifier={props.slugModifier}
                title={props.title}
                tooltip={props.tooltip}
                disabled={props.disabled || props.value == undefined}
                copy={props.copy}
            />
            <input
                className="form-control"
                type="time"
                id={slugWithModifier}
                name={slugWithModifier}
                value={props.value == undefined ? '' : props.value}
                max={props.max}
                min={props.min}
                disabled={props.mode === 'view' || props.disabled}
                placeholder={props.placeholder}
                required={props.required}
                /* ggf onChange anpassen */
                onChange={e =>
                    props.onChange(
                        props.slug,
                        e.target.value === '' ? null : String(e.target.value)
                    )
                }        
/*                 onChange={handleChange}
                ref={dateInputRef} */
            />
        </Fragment>
    );
};

export default TimePickerDataEntry;