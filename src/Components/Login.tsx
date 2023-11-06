import {Field, Form, Formik} from "formik";
import {useAppDispatch} from "../store/store";
import {loginTC} from "../store/reducers/authReducer";

export const Login = () => {
    const dispatch = useAppDispatch()
    const submit = () => {

    }
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: false,
                }}
                onSubmit={(values, {setSubmitting}) => {
                    dispatch(loginTC(values))
                }}
                validate={values => {
                    const errors: any = {}
                    if (!values.email) {
                        if (!values.email) {
                            errors.email = 'Email required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }
                    if (!values.password) {
                        errors.password = 'Password required'
                    } else if (values.password.length < 8) {
                        errors.password = 'Password should be more 8 symbols'
                    }
                    return errors
                }
                }
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <input
                            name={'email'}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? <div>{errors.email}</div> : ''}
                        <input
                            name={'password'}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? <div>{errors.password}</div> : ''}
                        <Field type={'checkbox'} name={'rememberMe'}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}