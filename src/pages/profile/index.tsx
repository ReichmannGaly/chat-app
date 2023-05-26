import React, {useState} from 'react';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/AppBarComponent";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {Card, CardContent, CardHeader} from "@mui/material";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

const Profile = () => {
    const [editMode, setEditMode] = useState(false);

    // Mocked user data
    const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSubmit = (values) => {
        // Handle form submission and update user info
        console.log(values);
        // ...
        setEditMode(false);
    };

    const profileSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        bio: Yup.string(),
    });

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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            justifyContent: "center"}}
                                        aria-label="recipe"
                                    >
                                        R
                                    </Avatar>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Typography variant="h4" gutterBottom textAlign="center">
                                    {userData.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom textAlign="center">
                                    <strong>Email:</strong> {userData.email}
                                </Typography>
                                <Typography variant="h6" gutterBottom textAlign="center">
                                    <strong>Bio:</strong> {userData.bio || 'No bio available'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    {!editMode && (
                        <Grid boxShadow={1} item xs={12} md={6}>
                            <Button variant="outlined" onClick={handleEditClick}>
                                Edit Personal Information
                            </Button>
                        </Grid>
                    )}
                    {editMode && (
                        <Grid boxShadow={1} item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                Edit Personal Information
                            </Typography>
                            <Formik
                                initialValues={{
                                    name: userData.name,
                                    email: userData.email,
                                    bio: userData.bio || '',
                                }}
                                validationSchema={profileSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <div>
                                        <label htmlFor="name">Name:</label>
                                        <Field type="text" id="name" name="name" />
                                        <ErrorMessage name="name" component="div" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email:</label>
                                        <Field type="email" id="email" name="email" />
                                        <ErrorMessage name="email" component="div" />
                                    </div>
                                    <div>
                                        <label htmlFor="bio">Bio:</label>
                                        <Field as="textarea" id="bio" name="bio" />
                                        <ErrorMessage name="bio" component="div" />
                                    </div>
                                    <Button type="submit" variant="contained" color="primary">
                                        Save
                                    </Button>
                                </Form>
                            </Formik>
                        </Grid>
                    )}
                </Grid>
            </Box>

        </Box>
    );
}


export default Profile;