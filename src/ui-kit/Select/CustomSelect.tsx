/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { ICustomSelect } from './ICustomSelect';
import styles from './CustomSelect.module.css';

// TODO: ещё предусмотреть вариат, что если селект находится внизу экрана - тогда чтобы список открывался вверх. И над управлением с клавиатуры поработай - аутлайны и все дела (чтобы сам селект тоже подсвечивался в закрытом виде, а не только его пункты)

const CustomSelect: FC<ICustomSelect> = ({
  options,
  currentOption,
  setCurrentOption,
  classes,
  placeholder,
  dictionary,
  placeholderColor = '#777',
  required = false,
  isAttemptFormSubmit = false,
  errorColor = '#e15554',
  focusColor = '#2f80ed',
  width = '240px',
  borderStyle = 'solid',
  borderWidth = '2px',
  borderColor = '#000',
  minHeight = '56px',
  boxShadow = '0px 8px 8px rgba(0, 0, 0, 0.25)',
  boxShadowHover = 'none',
  optionsShadow = '0px 8px 8px rgba(0, 0, 0, 0.08)',
}): JSX.Element => {
  const [isShowVariants, setIsShowVariants] = useState(false);
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  const handleClickOutside = () => {
    setIsShowVariants(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const closeByButton = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setIsShowVariants(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByButton, false);
    return () => {
      document.removeEventListener('keydown', closeByButton, false);
    };
  }, []);

  const handleChooseVariant = (variant: string) => {
    setCurrentOption(variant);
    setIsShowVariants(false);
  };

  const [isSendingError, setIsSendingError] = useState(!!currentOption);

  useEffect(() => {
    if (required && isAttemptFormSubmit && !currentOption) {
      setIsSendingError(true);
    } else {
      setIsSendingError(false);
    }
  }, [isAttemptFormSubmit, currentOption]);

  return (
    <div
      className={classes ? `${styles.select} ${classes}` : `${styles.select}`}
      style={{ width: width }}
    >
      <button
        className={`${styles.currentVariant} ${isShowVariants && styles.menuIsOpen}`}
        style={{
          borderStyle: borderStyle,
          borderWidth: borderWidth,
          borderColor: `${isSendingError ? errorColor : borderColor}`,
          outlineColor: focusColor,
          minHeight: minHeight,
          boxShadow: hover ? boxShadowHover : boxShadow,
          width: width,
        }}
        type="button"
        onClick={(evt) => {
          evt.stopPropagation();
          setIsShowVariants(!isShowVariants);
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {currentOption ? (
          <span>{dictionary ? dictionary[currentOption] : currentOption}</span>
        ) : (
          <span style={{ color: `${placeholderColor}` }}>{placeholder}</span>
        )}
      </button>
      {isShowVariants && (
        <ul
          className={styles.variantsList}
          style={{ boxShadow: optionsShadow, width: width }}
          ref={ref}
        >
          {options.map((option) => (
            <li
              className={styles.variantsItem}
              key={option}
            >
              <button
                type="button"
                onClick={() => handleChooseVariant(option)}
                style={{ outlineColor: focusColor }}
              >
                {dictionary ? dictionary[option] : option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
