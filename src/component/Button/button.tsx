import { Button } from "@mui/material";

interface fullWidth{
    fullWidth?:boolean;
    title:string,
    type:"text"|"contained"|"outlined"
}

export function CustomButton({fullWidth,title,type }:fullWidth ){
    return(
        <Button variant={type} fullWidth={fullWidth}>{title}</Button>
    )
}