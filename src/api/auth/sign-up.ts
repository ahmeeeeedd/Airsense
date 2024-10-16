import * as Yup from 'yup';



export const SignUpValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
});