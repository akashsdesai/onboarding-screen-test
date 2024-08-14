import { TextField } from "@mui/material";

interface NumberInput { width: number, placeholder:string }

export function NumberInput({ width, placeholder }: NumberInput){
    return(
        <TextField style={{ width: width }} type="number" id="outlined-basic" label={placeholder} variant="outlined" />
    )
}