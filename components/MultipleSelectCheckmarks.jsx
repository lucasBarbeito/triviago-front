import React from 'react';
import {FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const MultipleSelectCheckmarks = ({tag, onChange, values, options}) => {
    const ITEM_HEIGHT = 44;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 219,
                margin: 1
            },
        },
    }
    return (
        <FormControl sx={{ m: 0, width: 219 }}>
            <InputLabel id="demo-multiple-checkbox-label">{tag}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={values}
                onChange={onChange}
                input={<OutlinedInput label={tag} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {options.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={values.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default MultipleSelectCheckmarks;