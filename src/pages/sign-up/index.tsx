import React from 'react';
import {useRouter} from "next/router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Field, Form, Formik} from "formik";
import {object, string} from "yup";
import * as Yup from 'yup';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    bio: ""
}

const SignUp = () => {

    const router = useRouter();

    const handleSubmit = (values: { email: string; password: string; firstName: string; lastName: string; bio: string; }, { setSubmitting }) => {

        const user = {
            email: values.email,
            password: values.password,
            name: `${values.firstName} ${values.lastName}`,
            bio: values.bio
        }

        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .then(data => {
                sessionStorage.setItem("user", JSON.stringify(data.user));
                router.push("/profile");
            })
            .catch(error => console.error(error));

        setSubmitting(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={
                            object({
                                firstName: string().required("Please enter your first name"),
                                lastName: string().required("Please enter your last name"),
                                email: string().required("Please enter your email").email("Invalid email"),
                                password: string()
                                    .required("Please enter your password")
                                    .min(8, "Password should be minimum 8 characters long"),
                                confirmPassword: string()
                                    .required("Please confirm your password")
                                    .oneOf([Yup.ref('password')], 'Passwords must match'),
                                bio:  string().required("Please enter your bio")
                            })}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, isValid, touched, dirty ,isSubmitting}) => (
                            <Form noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            autoComplete="given-name"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            autoFocus
                                            error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            autoComplete="family-name"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name"
                                            error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            error={Boolean(errors.email) && Boolean(touched.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            error={Boolean(errors.password) && Boolean(touched.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                            error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                                            helperText={touched.confirmPassword && errors.confirmPassword}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            variant="outlined"
                                            multiline
                                            name="bio"
                                            label="Bio"
                                            id="bio"
                                            autoComplete="Bio"
                                            error={Boolean(errors.bio) && Boolean(touched.bio)}
                                            helperText={touched.bio && errors.bio}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!isValid || !dirty || isSubmitting}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;