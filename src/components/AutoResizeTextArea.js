/**
 * Auto resizing textarea component that adjusts its height based on content.
 * @file AutoResizeTextArea.js
 */
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Auto resizing textarea component that adjusts its height based on content.
 * @param {object} props - Properties passed to the AutoResizeTextArea component.
 * @returns {JSX.Element} JSX representation of the AutoResizeTextArea component.
 */
function AutoResizeTextArea({ id, className, placeholder, currentVal, onChange, ...props }) {
  // State variable for managing textarea value.
  const [value, setValue] = useState(currentVal);

  // Ref for accessing the textarea DOM element.
  const textAreaRef = useRef(null);

  // Effect hook to adjust textarea height based on content.
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

  // Event handler for textarea value change.
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

// Prop types for AutoResizeTextArea component.
AutoResizeTextArea.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  currentVal: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default AutoResizeTextArea;
