import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from "next/router";
import {Field, Form, Formik} from "formik";
import {object, string} from "yup";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


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
    email: "",
    password: ""
};

const LogIn = () => {
    const [ showPassword, setShowPassword ] = useState<boolean>();

    const router = useRouter();

    const handleSubmit = (values, { setSubmitting}) => {

        const loginData = {
            email: values.email,
            password: values.password
        }

        fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 404) {
                    throw new Error("User not found");
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .then(data => {
                sessionStorage.setItem("userToken", JSON.stringify(data.user.token));
                router.push("/profile");
            })
            .catch(error => console.error(error));
        setSubmitting(false)
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
                        Sign in
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={
                        object({
                            email: string().required("Please enter your email").email("Invalid email"),
                            password: string()
                                .required("Please enter your password")
                                .min(8, "Password should be minimum 8 characters long"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, isValid, touched, dirty ,isSubmitting}) => (
                            <Form noValidate sx={{ mt: 1 }}>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email Adress"
                                    autoComplete="email"
                                    autoFocus
                                    error={Boolean(errors.email) && Boolean(touched.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={Boolean(errors.password) && Boolean(touched.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!isValid || !dirty || isSubmitting}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/sign-up" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default LogIn;