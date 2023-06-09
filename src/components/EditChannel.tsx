import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";

interface EditChannelProps {
    channelId: string;
}

const EditChannel: React.FC<EditChannelProps> = ({channelId}) => {
    const [existingUsers, setExistingUsers] = useState([]);
    const [members, setMembers] = useState([]);

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
                setExistingUsers(data.users);
            })
            .catch(error => console.log(error))
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
            members: members.map(member => member.id)
        }

        fetch(`http://localhost:8080/channels/${channelId}/members`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("userToken"))}`
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                }
                else {
                    throw new Error(`Unexpected response status: ${response.status}`)
                }
            })
            .then(data => {
                router.push(`/channel/${channelId}`)
            })
            .catch(error => console.log(error))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: "30vh"
                }}>
                <Typography component="h1" variant="h5">
                    Add members  <PersonAddAlt1Icon />
                </Typography>
                <form className="editChannelForm" name="editChannelForm" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mt={3}>
                            <Autocomplete
                                multiple
                                options={existingUsers}
                                getOptionLabel={(user) => user.name}
                                getOptionSelected={(option, value) => option.id === value}
                                value={members}
                                onChange={(event, newValue:any) => setMembers(newValue)}
                                renderInput={(params) => (
                                    <>
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Add members"
                                            placeholder="Add members"
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                className="editChannelButton"
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

export default EditChannel;