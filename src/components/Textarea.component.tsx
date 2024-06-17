import {Input as InputType} from '@/types/input.type'
import React from 'react'

function Input({field, label, notFillable, errors, touched, required, ...rest}: InputType) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xl text-black">
        {label} {required && '*'}
      </label>

      <input
        readOnly={notFillable}
        className={` input ${notFillable ? 'bg-sky-100' : 'bg-white'} py-4 px-6   border-blue-500 `}
        {...rest}
        {...field}
      />
      {errors && touched ? <div className="text-xl font-semibold text-red-500">{errors}</div> : null}
    </div>
  )
}

export default Input
