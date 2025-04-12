import React from 'react'
import './styles.css'

// 基础Input组件
export const Input = ({
  size = 'default',
  style = {},
  placeholder,
  value,
  onChange,
  ...props
}: {
  size?: 'small' | 'default' | 'large'
  style?: React.CSSProperties
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  [key: string]: any
}) => {
  const sizeClass = size === 'small' ? 'ui-input-sm' : size === 'large' ? 'ui-input-lg' : 'ui-input-default'
  
  return (
    <input
      className={`ui-input ${sizeClass}`}
      style={style}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

// 数字输入框组件
export const InputNumber = ({
  size = 'default',
  style = {},
  placeholder,
  value,
  onBlur,
  ...props
}: {
  size?: 'small' | 'default' | 'large'
  style?: React.CSSProperties
  placeholder?: any
  value?: number
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  [key: string]: any
}) => {
  const sizeClass = size === 'small' ? 'ui-input-sm' : size === 'large' ? 'ui-input-lg' : 'ui-input-default'
  
  return (
    <input
      type="number"
      className={`ui-input ui-input-number ${sizeClass}`}
      style={style}
      placeholder={String(placeholder)}
      value={value}
      onBlur={onBlur}
      {...props}
    />
  )
}

// 选择器组件
export const Select = ({
  size = 'default',
  style = {},
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: {
  size?: 'small' | 'default' | 'large'
  style?: React.CSSProperties
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  children?: React.ReactNode
  [key: string]: any
}) => {
  const sizeClass = size === 'small' ? 'ui-select-sm' : size === 'large' ? 'ui-select-lg' : 'ui-select-default'
  
  return (
    <select
      className={`ui-select ${sizeClass}`}
      style={style}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        if (onChange) {
          // 检查值是否为布尔值字符串，如果是则转换为布尔类型
          const val = e.target.value;
          if (val === 'true' || val === 'false') {
            onChange(val === 'true');
          } else {
            onChange(val);
          }
        }
      }}
      {...props}
    >
      {children}
    </select>
  )
}

// Select.Option 组件
Select.Option = ({
  value,
  label,
  children,
  ...props
}: {
  value: any
  label?: string
  children?: React.ReactNode
  [key: string]: any
}) => {
  return (
    <option value={value} {...props}>
      {children || label}
    </option>
  )
}

// 自动完成组件
export const AutoComplete = ({
  size = 'default',
  style = {},
  options = [],
  value,
  onChange,
  filterOption,
  ...props
}: {
  size?: 'small' | 'default' | 'large'
  style?: React.CSSProperties
  options?: Array<{ value: string; label?: string }>
  value?: string
  onChange?: (value: string) => void
  filterOption?: (inputValue: string, option: { value: string; label?: string }) => boolean
  [key: string]: any
}) => {
  const [inputValue, setInputValue] = React.useState(value || '')
  const [filteredOptions, setFilteredOptions] = React.useState(options)
  const [showDropdown, setShowDropdown] = React.useState(false)
  const sizeClass = size === 'small' ? 'ui-autocomplete-sm' : size === 'large' ? 'ui-autocomplete-lg' : 'ui-autocomplete-default'
  
  React.useEffect(() => {
    setInputValue(value || '')
  }, [value])
  
  React.useEffect(() => {
    if (filterOption) {
      setFilteredOptions(options.filter(option => filterOption(inputValue, option)))
    } else {
      setFilteredOptions(
        options.filter(option => 
          option.value.toLowerCase().includes(inputValue.toLowerCase())
        )
      )
    }
  }, [inputValue, options, filterOption])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setShowDropdown(true)
    if (onChange) {
      onChange(newValue)
    }
  }
  
  const handleOptionClick = (option: { value: string; label?: string }) => {
    setInputValue(option.value)
    setShowDropdown(false)
    if (onChange) {
      onChange(option.value)
    }
  }
  
  return (
    <div className="ui-autocomplete-container" style={style}>
      <input
        className={`ui-input ui-input-sm  ui-autocomplete-input ${sizeClass}`}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        {...props}
      />
      {showDropdown && filteredOptions.length > 0 && (
        <div className="ui-autocomplete-dropdown">
          {filteredOptions.map((option, index) => (
            <div 
              key={index} 
              className="ui-autocomplete-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label || option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 按钮组件
export const Button = ({
  size = 'default',
  style = {},
  children,
  onClick,
  ...props
}: {
  size?: 'small' | 'default' | 'large'
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  [key: string]: any
}) => {
  const sizeClass = size === 'small' ? 'ui-button-sm' : size === 'large' ? 'ui-button-lg' : 'ui-button-default'
  
  return (
    <button
      className={`ui-button ${sizeClass}`}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// 空间组件
export const Space = ({
  children,
  style = {},
  ...props
}: {
  children?: React.ReactNode
  style?: React.CSSProperties
  [key: string]: any
}) => {
  return (
    <div className="ui-space" style={style} {...props}>
      {React.Children.map(children, (child) => (
        <div className="ui-space-item">{child}</div>
      ))}
    </div>
  )
}

// 列组件
export const Col = ({
  children,
  style = {},
  ...props
}: {
  children?: React.ReactNode
  style?: React.CSSProperties
  [key: string]: any
}) => {
  return (
    <div className="ui-col" style={style} {...props}>
      {children}
    </div>
  )
}

// 图标组件
export const Icons = {
  PlusSquareOutlined: (props: any) => (
    <span className="ui-icon ui-icon-plus-square" {...props}>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
        <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
      </svg>
    </span>
  ),
  MinusSquareOutlined: (props: any) => (
    <span className="ui-icon ui-icon-minus-square" {...props}>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
        <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
      </svg>
    </span>
  ),
  CaretDownOutlined: (props: any) => (
    <span className={`ui-icon ui-icon-caret-down ${props.className || ''}`} onClick={props.onClick}>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
      </svg>
    </span>
  )
}