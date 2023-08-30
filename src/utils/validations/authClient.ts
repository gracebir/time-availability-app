import * as yup from 'yup'

export const signinSchema = yup.object().shape({
    email: yup.string().email().required("Required"),
    password: yup.string().min(8).required("Password required"),
})

const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/

export const signupSchemaClient = yup.object().shape({
    name: yup.string().min(3).required("required field"),
    email: yup.string().email().required("required field"),
    password: yup.string()
    .min(8)
    .matches(format, "At least uppcase and one number")
    .required("Password required"),
})