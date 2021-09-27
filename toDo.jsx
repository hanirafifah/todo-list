import {
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardHeader,
    TextField,
    Button,
    IconButton,
    Typography
    } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import {useEffect, useState} from "react";

export default function Todo() {
    const [formState, setFormState] = useState({
        action: "",
        tanggal: new Date().toISOString().slice(0,19),
    });

    const [toDo, setTodo] = useState([]);

    localStorage.getItem("todo")

    useEffect(()=>{
        const todo= JSON.parse(localStorage.getItem("todo") || "[]");
        setTodo(todo);
    }, [])

    return(
    <div>
        <Container  maxWidth = "md" style={{marginTop: "10rem"}}>
            <Card>
                <CardHeader title="To Do List" style= {{backgroundColor: "#42a5f5"}}></CardHeader>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                value={formState.action}
                                onChange={(e)=> {
                                    setFormState({...formState, action: e.target.value});
                                }}
                                id="filled-basic"
                                label="What to do?"
                                variant="filled"
                                style={{margin:".5rem"}}
                            />
                            <TextField 
                            onChange={(e)=> {
                                setFormState({...formState, tanggal: e.target.value});
                            }}
                            style={{margin: ".5rem"}}
                            variant="filled"
                            id="datetime-local"
                            label="Deadline"
                            type="datetime-local"
                            defaultValue={formState.tanggal}
                            sx={{width: 250}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            <br/>
                        </Grid>
                        <div style={{margin:"auto", alignItems: "center"}}>
                            <Button
                                variant="contained"
                                onClick={()=>{
                                    const arr= toDo;
                                    arr.push(formState);
                                    setFormState({
                                        action: "",
                                        tanggal: new Date().toISOString().slice(0,19), 
                                    });
                                    setTodo(arr);
                                    localStorage.setItem("todo", JSON.stringify(toDo));
                                }}
                            >
                                Submit
                            </Button>
                        </div>    
                    </Grid>
                    <Grid item xs={6}>
                        {toDo.map((value, index)=>{
                            return(
                                <Grid container>
                                    <Grid item xs={8}>
                                        <div><ul>
                                            <li>
                                                <Typography variant="h6">{value.action}</Typography>
                                                <Typography variant="body">
                                                    <div>
                                                        Deadline: 
                                                        {new Date(value.tanggal).getDate()}
                                                        {new Intl.DateTimeFormat("en-US", {
                                                            month: "long",
                                                        }).format(new Date(value.tanggal).getMonth())}
                                                        {new Date(value.tanggal).getFullYear()}
                                                    </div>
                                                </Typography>
                                            </li>
                                        </ul></div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ul><IconButton 
                                        aria-label="delete"
                                        color="primary"
                                        onCLick={()=>{
                                            let arr = toDo;
                                            arr.splice(index, 1);
                                            setTodo(arr.splice(index, 1));
                                            localStorage.setItem("todo", JSON.stringify(arr))}
                                        }>
                                            <CheckIcon />
                                        </IconButton></ul>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    
                </CardContent>
            </Card>
        </Container>
        
    </div>
    );
}