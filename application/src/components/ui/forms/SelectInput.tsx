import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { SpinnerLoading } from '../loadings';

type OptionType = {
  id: string;
  name?: string;
  description?: string;
};

type SelectInputProps = {
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  options?: OptionType[];
  allowBlank?: OptionType;
  loaded?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  notFoundMessage: string;
  onChange?: (valueChanged: string) => void;
  onBlur?: () => void;
  _listbox?: { className?: string; autoFocus?: boolean };
  _listboxButton?: { className?: string; autoFocus?: boolean };
  _listboxOptions?: { className?: string; autoFocus?: boolean };
  _listboxOption?: {
    className?: string;
  };
  renderItem?: (item: OptionType) => React.ReactNode;
  renderButton?: (item: OptionType) => React.ReactNode;
};

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      value,
      options = [],
      allowBlank,
      loaded,
      preventDefault,
      stopPropagation,
      notFoundMessage,
      _listboxButton,
      _listboxOptions,
      _listboxOption,
      renderItem,
      renderButton,
      _listbox,
      ...rest
    },
    ref
  ) => {
    const selectRef = React.useRef<HTMLSelectElement | null>(null);

    const optionsFiltered = options.filter((option) => option.id !== allowBlank?.id);

    if (allowBlank) {
      optionsFiltered.unshift({ id: allowBlank.id, name: allowBlank.name, description: allowBlank.description });
    }

    const selectedOption = optionsFiltered.find((option) => option.id === value) ?? { id: '', name: '' };

    const changeValueHandler = (option: OptionType) => {
      rest.onChange && rest.onChange(option.id);
    };

    const onClickHandler = (event?: React.MouseEvent) => {
      if (!event) return;

      preventDefault && event.preventDefault();
      stopPropagation && event.stopPropagation();
    };

    return (
      <Listbox {..._listbox} {...rest} value={selectedOption} ref={ref} onChange={changeValueHandler} as="div">
        <select style={{ display: 'none' }} ref={selectRef} />
        <div className="relative">
          <Listbox.Button
            {..._listboxButton}
            onClick={onClickHandler}
            className={twMerge(
              'relative w-full cursor-default rounded-md',
              'py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset',
              'text-sm leading-6 focus:outline-none focus:ring-2 disabled:cursor-not-allowed',
              'bg-gray-50 text-gray-900 ring-gray-300 focus:ring-main-500 disabled:bg-gray-100 disabled:text-gray-500',
              'dark:focus:main-gray-400 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:disabled:bg-gray-800',
              _listboxButton?.className
            )}
          >
            <span className="block h-6 truncate">
              {(renderButton && renderButton(selectedOption)) || (selectedOption?.name ?? '\u00A0')}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options
            {..._listboxOptions}
            onClick={onClickHandler}
            className={twMerge(
              'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md',
              'py-1 text-base shadow-lg ring-1 focus:outline-none sm:text-sm',
              'bg-gray-50 ring-black ring-opacity-5',
              'ring-opacity-5 dark:bg-gray-700 dark:ring-gray-600',
              _listboxOptions?.className
            )}
          >
            {!loaded && (
              <div className="relative flex cursor-default select-none justify-center px-4 py-2 text-gray-700">
                <SpinnerLoading className="h-5 w-5" />
              </div>
            )}
            {loaded && optionsFiltered.length === 0 && (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-900 dark:text-white">{notFoundMessage}</div>
            )}
            {loaded &&
              optionsFiltered.map((option) => (
                <Listbox.Option
                  key={`${option.id}_${option.name}`}
                  onClick={onClickHandler}
                  className={({ active }) =>
                    twMerge(
                      active && 'bg-gray-200 dark:bg-gray-600',
                      'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-white',
                      _listboxOption?.className
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={twMerge(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {(renderItem && renderItem(option)) || (option.description ?? option.name)}
                      </span>
                      {selected ? (
                        <span className={twMerge('absolute inset-y-0 right-0 flex items-center pr-4 text-main-500 dark:text-main-400')}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  }
);

SelectInput.displayName = 'SelectInput';
