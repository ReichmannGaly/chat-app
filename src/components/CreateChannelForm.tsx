import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import {Field, Form, Formik} from "formik";
import {object, string} from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import {FormControl} from "@mui/base";
import {useRouter} from "next/router";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const initialValues = {
    channelName: ""
}

const animatedComponents = makeAnimated();

const CreateChannelForm = () => {
    const [channelType, setChannelType] = useState("");
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/users",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            }
        })
            .then(response => {
                if (response.status === 200){
                    return response.json();
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .then(data => {
                setUsers(data.users);
            })
            .catch(error => console.log(error))
    },[])

    const handleChange = (selectedOptions) => {
        setMembers(selectedOptions);
    }

    const handleSubmit = (values) => {
        const requestBody = {
            name: values.channelName,
            type: channelType,
            members: members.map(member => member.id)
        }

        fetch("http://localhost:8080/channel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if(response.status === 201){
                    return response.json();
                }
                else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .then(data => {
                router.push(`/channel/${data.channel.id}`);
        })
            .catch(error => console.log(error))
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8
                }}
            >
                <Typography component="h1" variant="h5">
                    Create a new Channel <CreateIcon />
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={
                        object({
                            channelName: string().required("Please enter the channel name")
                        })
                    }
                    onSubmit={handleSubmit}>
                    {({
                          errors,
                          isValid,
                          touched,
                          dirty ,
                          isSubmitting}) => (
                        <Form noValidate sx={{ mt: 3 }} className="createChannelForm" name="createChannelForm">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        autoComplete="given-name"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="channelName"
                                        name="channelName"
                                        label="Channel name"
                                        autoFocus
                                        error={Boolean(errors.channelName) && Boolean(touched.channelName)}
                                        helperText={touched.channelName && errors.channelName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" margin="normal">
                                        <FormLabel component="legend">Channel Type</FormLabel>
                                        <RadioGroup
                                            name="type"
                                            value={channelType}
                                            onChange={(event) => setChannelType(event.target.value)}
                                            sx={{ml: 2}}
                                        >
                                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {channelType === "private" && (
                                    <Grid item xs={12}>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={users}
                                            placeholder="Add members"
                                            getOptionLabel={(user) => user.name}
                                            getOptionValue={(user) => user.id}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Button
                                className="createChannelButton"
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isValid || !dirty || isSubmitting || !channelType}
                            >
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}

export default CreateChannelForm;