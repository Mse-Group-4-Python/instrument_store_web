import { Col, Form, Row } from 'react-bootstrap';
import { Field, FieldAttributes, FormikState, useField } from 'formik';
import React, { Ref } from 'react';

import classNames from 'classnames';
import styles from '../../pages/Organization/Details/Details.module.scss';

export interface FormFieldComponentProps {
  children?: React.ReactNode;
  field: FieldAttributes<any>;
  form: FormikState<any>;
}

const ERROR_RED_COLOR = '#F0395A';

// export const MyInput: React.FunctionComponent<FormFieldComponentProps> = (
//   props
// ) => {
//   const { field, form } = props;
//   const isInvalid =
//     (!!form.touched[field.name] || form.submitCount > 0) &&
//     !!form.errors[field.name];
//   return (
//     <div className="d-flex">
//       <div className="flex-grow-1">
//         <Form.Control
//           type="text"
//           autoComplete="off"
//           isInvalid={isInvalid}
//           {...field}
//         />
//         <Form.Control.Feedback type="invalid">
//           {isInvalid && form.errors[field.name]}
//         </Form.Control.Feedback>
//       </div>
//       <div className={`ps-1 pt-2 ${isInvalid ? '' : 'd-none'}`}>
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           size="lg"
//           color={ERROR_RED_COLOR}
//         />
//       </div>
//     </div>
//   );
// };

// export const MySelect: React.FunctionComponent<FormFieldComponentProps> = (
//   props
// ) => {
//   const { children, field, form } = props;
//   const isInvalid =
//     (!!form.touched[field.name] || form.submitCount > 0) &&
//     !!form.errors[field.name];
//   return (
//     <div className="d-flex">
//       <div className="flex-grow-1">
//         <Form.Control
//           as="select"
//           className="select-option"
//           isInvalid={isInvalid}
//           {...field}>
//           {children}
//         </Form.Control>
//         <Form.Control.Feedback type="invalid">
//           {isInvalid && form.errors[field.name]}
//         </Form.Control.Feedback>
//       </div>
//       <div className={`ps-1 pt-2 ${isInvalid ? '' : 'd-none'}`}>
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           size="lg"
//           color={ERROR_RED_COLOR}
//         />
//       </div>
//     </div>
//   );
// };

// export interface MyFieldProps {
//   children?: React.ReactNode;
//   component?: React.ComponentType<FormFieldComponentProps>;
//   label?: JSX.Element | string;
//   name: string;
//   className?: string;
//   lg?: number;
//   xl?: number;
//   xxl?: number;
// }

// export function MyField({
//   children,
//   component = MyInput,
//   label,
//   name,
//   className = 'mb-3',
//   lg = 5,
//   xl = 4,
//   xxl = 3
// }: MyFieldProps) {
//   return (
//     <Form.Group
//       as={Row}
//       className={classNames('mb-3', styles.rowText)}
//       controlId={`form${capitalize(name)}`}>
//       <Form.Label column lg={lg} xl={xl} xxl={xxl}>
//         {label}
//       </Form.Label>
//       <Col lg={12 - lg} xl={12 - xl} xxl={12 - xxl}>
//         <Field name={name} component={component}>
//           {children}
//         </Field>
//       </Col>
//     </Form.Group>
//   );
// }

export interface FormFieldProps {
  type: string;
  autoComplete?: string;
  name: string;
  label: string;
  isInvalid?: boolean;
  error?: string | false;
  handleChange: any;
  value?: string | number | undefined;
}

export const ControlInput = React.forwardRef(
  (props: FormFieldProps, ref: Ref<HTMLInputElement>) => {
    const { label, handleChange, error, value, isInvalid, ...rest } = props;
    return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <div className="d-flex">
          <div className="flex-grow-1">
            <Form.Control
              ref={ref}
              onChange={handleChange}
              isInvalid={isInvalid}
              value={value}
              {...rest}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </div>
          {/* <div className={`ps-1 pt-2 ${isInvalid ? '' : 'd-none'}`}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              color={ERROR_RED_COLOR}
            />
          </div> */}
        </div>
      </Form.Group>
    );
  }
);

ControlInput.displayName = 'ControlInput';
