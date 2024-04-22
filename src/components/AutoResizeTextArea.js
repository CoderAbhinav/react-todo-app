import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function AutoResizeTextArea({ id, className, placeholder, currentVal, onChange, ...props }) {
  const [value, setValue] = useState(currentVal);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value, []]); // Empty dependency array for initial render

  const handleChange = (evt) => {
    const val = evt.target?.value;
    onChange(evt);
    setValue(val);
  };

  return (
    <textarea
      id={id}
      className={className}
      onChange={handleChange}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={1}
      value={currentVal}
    />
  );
}

AutoResizeTextArea.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  currentVal: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default AutoResizeTextArea;
