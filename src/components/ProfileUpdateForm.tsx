import React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import {Field, Form, Formik} from "formik";
import {object, string} from "yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

interface ProfileUpdateFormProps {
    initialValues: object;
    handleSubmit: (values: any, setSubmitting: any) => void;
    userData: object;
    handleCancelButtonClick: () => void;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
         initialValues,
         handleSubmit,
         userData,
         handleCancelButtonClick }) => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid item xs={12} md={10}>
                    <Typography component="h1" variant="h5">
                        Edit your profile <EditIcon />
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={
                            object({
                                name: string().required("Please enter new name"),
                                oldPassword: string()
                                    .required("Please enter your old password")
                                    .min(8, "Password should be minimum 8 characters long"),
                                password: string()
                                    .required("Please enter your old password")
                                    .min(8, "Password should be minimum 8 characters long"),
                                confirmPassword: string()
                                    .required("Please confirm your password")
                                    .oneOf([Yup.ref('password')], 'Passwords must match'),
                                bio:  string().required("Please enter your new bio")
                            })}
                        onSubmit={handleSubmit}
                    >
                        {({
                              errors,
                              isValid,
                              touched,
                              dirty ,
                              isSubmitting}) => (
                            <Form noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            autoComplete="Email"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            autoFocus
                                            value={userData.email}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            autoComplete="given-name"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label="New name"
                                            autoFocus
                                            error={Boolean(errors.name) && Boolean(touched.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            required
                                            fullWidth
                                            name="oldPassword"
                                            label="Old Password"
                                            type="password"
                                            id="oldPassword"
                                            autoComplete="new-password"
                                            error={Boolean(errors.oldPassword) && Boolean(touched.oldPassword)}
                                            helperText={touched.oldPassword && errors.oldPassword}
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
                                    variant="outlined"
                                    onClick={handleCancelButtonClick}
                                    sx={{ mt: 3, mb: 2, mr: 3 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!isValid || !dirty || isSubmitting}
                                >
                                    Save
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Box>
        </Container>
    );
}

export default ProfileUpdateForm;