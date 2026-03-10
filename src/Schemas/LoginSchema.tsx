import * as yup from 'yup';


const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup.string().min(5).required("Required"),
});

export default loginSchema;