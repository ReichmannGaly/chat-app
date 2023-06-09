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
import ProfileUpdateForm from "@/components/ProfileUpdateForm";

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
    currentPassword: "",
    newPassword: "",
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
            oldPassword: values.currentPassword,
            password: values.newPassword,
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
                        <ProfileUpdateForm
                            initialValues={initialValues}
                            handleSubmit={handleSubmit}
                            userData={userData}
                            handleCancelButtonClick={handleCancelButtonClick}/>
                    )}
                </Grid>
            </Box>

        </Box>
    );
}


export default Profile;