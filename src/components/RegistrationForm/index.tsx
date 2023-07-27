/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './RegistrationForm.module.css';
import classNames from 'classnames';
import MaskedInput from 'react-input-mask';

// После настройки валидации комитишься. 2 коммита - добавление зависимостей и добавление формы регистрации с валидацией полей

/*
TODO-s:
- на бэке поле lastName сделать необязательным, а contactPhone обязательным (в модели и дто). И ещё аус-дто чекни на всякий случай
- добавить возможность показать скрытые символы пароля (не меняя тип поля)
- затем разгрести ещё всё на подкомпоненты, в этом проекте. Как минимум у двух форм, в этом проекте, стили будут одинаковы.
- ворнинги консоли и знатный рефактор этого компонента
- ещё вот сюда посмотри: https://stackoverflow.com/questions/61839197/trying-to-use-react-hook-form-in-combination-with-react-input-mask
*/

const clearTel = (tel: any) => tel.replace(/[^0-9]/g, '');

const isNotFilledTel = (v: any = '7') => {
  const clearedTel = clearTel(v);
  return clearedTel.length < 11 ? 'Phone number is required.' : undefined;
};

const Input = (props: any) => {
  const { onChange, ...restProps } = props;
  return (
    <input
      {...restProps}
      onChange={onChange}
    />
  );
};

const CustomMaskedInput = (props: any) => {
  const { value, onChange, name } = props;
  return (
    <MaskedInput
      name={name}
      value={value}
      mask="+7 (999) 999-99-99"
      maskPlaceholder={null}
      alwaysShowMask
      onChange={(e) => {
        e.persist();
        onChange(e.target.value);
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {(inputProps: any) => (
        <Input
          {...inputProps}
          type="tel"
          autoComplete="tel-national"
        />
      )}
    </MaskedInput>
  );
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit: handleSubmitWrapper,
    formState: { errors },
    control,
  } = useForm({
    // reValidateMode: 'onSubmit',
    // defaultValues: {
    //   ControlledMaskedInput: '7',
    // },
  });

  const handleSubmit = (data: any) => {
    // TODO
    // Поля очищать и дизаблить, пока статус отправки не вернется. Лучше даже очищать только тогда, если он ок.
    // Формдата мэй би, а может и нет
    // Отправка на бэк, собственно.
    // Телефон разбирай на упрощённый вид, если сервер такой хавать не будет
    /*
    function (value) {
      value = value.replace(/\s/g,"") ///<== Удаляет все пробелы переносы и тд
      return Validator.value(value).required().regex(/\+\d{6,20}/);
    }
    */
    console.log(data);
    alert('Форма успешно отправлена!');
  };

  // console.error(errors);

  return (
    <form onSubmit={handleSubmitWrapper(handleSubmit)}>
      <p className={styles.inputBlock}>
        <label>
          {/* TODO: не забыть добавить этот служебный класс (вижуалли хидден) */}
          <span className="visually-hidden">Почта</span>
          <input
            // TODO: Я ведь правильно тут класснэймз исползовал? Запамятовал уже. А то пустой атрибут класса болтается
            className={classNames(errors?.email && styles.inputError)}
            type="text" // заменил с email, чтобы дефолтная подсказка не вылазила
            placeholder="Почта"
            {...register('email', {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            })}
          />
        </label>
        {errors?.email?.type === 'required' && (
          <span className={styles.validationErrorText}>Поле должно быть заполнено</span>
        )}
        {errors?.email?.type === 'pattern' && (
          <span className={styles.validationErrorText}>Это не похоже на почту</span>
        )}
      </p>

      <p className={styles.inputBlock}>
        <label>
          <span className="visually-hidden">Пароль</span>
          <input
            className={classNames(errors?.password && styles.inputError)}
            type="text"
            placeholder="Пароль"
            {...register('password', {
              required: true,
              minLength: 10,
              maxLength: 30,
            })}
          />
        </label>
        {/* TODO: А ещё нужна проверка на "стронг пассворд" - чтобы содержал символы разного регистра, цифры и буквы, символы... И желательно чтобы на каждый пункт отдельную ошибку сыпал. Сначала поищи средствами реакт-хук-форма, затем сделай самостоятельный разбор строки, если такого там нет */}
        {errors?.password?.type === 'required' && (
          <span className={styles.validationErrorText}>Поле должно быть заполнено</span>
        )}
        {errors?.password?.type === 'minLength' && (
          <span className={styles.validationErrorText}>Слишком короткий пароль</span>
        )}
        {errors?.password?.type === 'maxLength' && (
          <span className={styles.validationErrorText}>Слишком длинный пароль</span>
        )}
      </p>

      <p className={styles.inputBlock}>
        <label>
          <span className="visually-hidden">Повторите пароль</span>
          <input
            className={classNames(errors?.repeatPassword && styles.inputError)}
            type="text"
            placeholder="Повторите пароль"
            {...register('repeatPassword', {
              required: true,
              minLength: 10,
              maxLength: 30,
            })}
          />
        </label>
        {/* TODO: А тут нужна дополнительная проверка, чтобы введенный пароль совпадал со значением поля password */}
        {errors?.repeatPassword?.type === 'required' && (
          <span className={styles.validationErrorText}>Поле должно быть заполнено</span>
        )}
        {errors?.repeatPassword?.type === 'minLength' && (
          <span className={styles.validationErrorText}>Слишком короткий пароль</span>
        )}
        {errors?.repeatPassword?.type === 'maxLength' && (
          <span className={styles.validationErrorText}>Слишком длинный пароль</span>
        )}
      </p>

      <p className={styles.inputBlock}>
        <label>
          <span className="visually-hidden">Имя</span>
          <input
            className={classNames(errors?.firstName && styles.inputError)}
            type="text"
            placeholder="Имя"
            {...register('firstName', {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />
        </label>
        {errors?.firstName?.type === 'required' && (
          <span className={styles.validationErrorText}>Поле должно быть заполнено</span>
        )}
        {errors?.firstName?.type === 'minLength' && (
          <span className={styles.validationErrorText}>Слишком короткое имя</span>
        )}
        {errors?.firstName?.type === 'maxLength' && (
          <span className={styles.validationErrorText}>Слишком длинное имя</span>
        )}
      </p>

      <p className={styles.inputBlock}>
        <label>
          <span className="visually-hidden">Телефон</span>
          {/* TODO: подумать варианты с подсветкой инпута при ошибках */}
          <Controller
            render={({ field }) => <CustomMaskedInput {...field} />}
            rules={{
              validate: {
                inputTelRequired: isNotFilledTel,
              },
            }}
            name="contactPhone"
            control={control}
          />
          {/* Запасной вариант, если маска будет не нужна
          <input
            type="tel"
            placeholder="Телефон"
            {...register('contactPhone', {
              required: true,
              minLength: 6,
              maxLength: 12,
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            })}
          /> */}
        </label>
        {errors?.contactPhone && <span className={styles.validationErrorText}>Неверно введен телефон</span>}
      </p>

      <p className={styles.inputBlock}>
        <input type="submit" />
      </p>
    </form>
  );
};

export default RegistrationForm;
