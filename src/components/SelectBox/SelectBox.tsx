import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Utils from "../../features/Utils";
import {
  selectQuizData,
  setCategory,
  setDifficulty,
} from "../../features/quizSlice/quizSlice";
import { setTimer } from "../../features/timerSlice/timerSlice";
import { seconds } from "../../features/Constants";

import { SelectBoxProps } from "./SelectBox.d";

export default function SelectBox(props: SelectBoxProps) {
  const { width, inputLabel, list, type } = props;

  const dispatch = useDispatch();
  const { difficulty, category } = useSelector(selectQuizData);

  const [selectedItem, setSelectedItem] = useState(
    type === "difficulty" ? Utils.capitalize(difficulty) : category.name || ""
  );

  useEffect(() => {
    dispatch(setTimer(seconds[difficulty] || 90));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;

    if (type === "difficulty") {
      dispatch(setDifficulty(value.toLowerCase()));
    } else {
      dispatch(setCategory(value));
    }

    setSelectedItem(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl style={{ width }}>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItem}
          label={inputLabel}
          onChange={handleChange}
        >
          {list.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
