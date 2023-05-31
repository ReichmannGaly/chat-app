import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {Card, CardContent} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {object, string} from "yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import Container from "@mui/material/Container";

const drawerWidth = 240;

export interface ApiResponse {
    status: boolean
    user: User
}

export interface User {
    id: number
    email: string
    name: string
    googleId: string
    bio: string
    status: number
    createdAt: string
    updatedAt: string
    deletedAt: string
    token: string
}

const initialValues = {
    name: "",
    oldPassword: "",
    password: "",
    bio: ""
}

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        bio: ""
    });

    useEffect(() => {

        fetch("http://localhost:8080/user",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json() as Promise<ApiResponse>;
                } else if (response.status === 404) {
                    throw new Error("User not found");
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .then(data => {
                setUserData({
                    name: data.user.name,
                    email: data.user.email,
                    bio: data.user.bio
                });
            })
            .catch(error => console.log(error))
    },[])

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSubmit = (values, { setSubmitting }) => {

        const requestBody = {
            name: values.name,
            oldPassword: values.oldPassword,
            password: values.password,
            bio: values.bio
        }

        fetch("http://localhost:8080/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if(response.status === 200){
                    return response.json();
                }
                else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .then(() => {
                window.location.reload()
            })

        setSubmitting(false)
    };

    const handleCancelButtonClick = () => {
        setEditMode(false);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                drawerWidth={drawerWidth}
                componentName="Profile"/>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Grid container sx={{marginTop: 2}}>
                    {!editMode && (
                        <Grid item xs={12} md={12}>
                            <Card sx={{ maxWidth: "100%", boxShadow: "0"}}>
                                <Box sx={{
                                    display: 'flex',
                                    position: 'relative',
                                    marginBottom: 5
                                }}>
                                    <Avatar
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            mx: 'auto',
                                            my: 'auto'}}
                                        src="/broken-image.jpg" />
                                </Box>
                                <CardContent>
                                    <Typography variant="h4" sx={{marginBottom: 5}} gutterBottom textAlign="center">
                                        {userData.name}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom textAlign="center">
                                        <strong>Email:</strong> {userData.email}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom textAlign="center">
                                        {userData.bio && <strong>Bio:</strong>} {userData.bio || <strong>No bio available</strong>}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                                <Button variant="outlined" onClick={handleEditClick}>
                                    Edit Personal Information
                                </Button>
                            </Box>
                        </Grid>
                    )}
                    {editMode && (
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
                                        {({ errors, isValid, touched, dirty ,isSubmitting}) => (
                                            <Form noValidate sx={{ mt: 3 }}>
                                                <Grid container spacing={2}>
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
                                                    Sign Up
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Grid>
                            </Box>
                        </Container>
                    )}
                </Grid>
            </Box>

        </Box>
    );
}


export default Profile;