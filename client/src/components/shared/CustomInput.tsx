import { TextField } from "@mui/material";

type Props = {
  label: string;
  name: string;
  type: string;
}

const CustomInput = (props: Props) => {
  return ( 
    <TextField
    InputLabelProps={{style: {color: "white"}}} margin="normal"
    name={props.name} InputProps={{ style: {width: "400px", borderRadius: "10px", fontSize: "20px", color: "white"}}}
    type={props.type} label={props.label} />
   );
}
 
export default CustomInput;