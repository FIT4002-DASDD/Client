/**
 * AdChip.tsx
 * A component for displaying ad tags (as 'chips') on AdCard components
 * @author Xi Zhang
 * @updated 2021-11-18
 */

import React, { useEffect, useState, useContext } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { baseApi } from "../api/api";
import { DataContext } from "../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

type AdChipProp = {
  ad: Ad;
  allTags: Tag[];
  onNewTagCreated?: () => void;
};

/**
 * A component for displaying ad tags (as 'chips') on AdCard components
 */
const AdChip = (props: AdChipProp) => {
  // Context for data source
  const dataSourceContext = useContext(DataContext);
  const source = dataSourceContext.dataSource;

  const classes = useStyles();
  const { allTags, onNewTagCreated } = props;
  const [adOwnTagsId, setAdOwnTags] = useState<number[]>([]);
  /**
   * State for the name of the tags
   */
  const [tagsName, setTagsName] = useState<string[]>([]);
  /**
   * State for storing ad data
   */
  const [adData, setAdData] = useState<Ad>(props.ad);
  /**
   * Open/closed state of dialog for creating a new tag
   */
  const [open, setOpen] = useState(false);
  /**
   * State for inputted name of tag being created
   */
  const [tagInputName, setTagInputName] = useState("");
  /**
   * State for controlling error message display upon creation of an invalid tag
   */
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Update the tags already applied to the ad
   */
  useEffect(() => {
    const tempList = adData.tags.map((tag: Tag) => tag.id);
    setAdOwnTags(tempList);
  }, [adData]);

  /**
   * Update tag names when tags change
   */
  useEffect(() => {
    const tempNameList = allTags.map((tag: Tag) => tag.name.toLowerCase());
    setTagsName(tempNameList);
  }, [allTags]);

  /**
   * Applies or deletes a category/tag from the ad
   * @param categoryIndex The index of the category to be added/removed
   * @param hasTag Whether the category is being added or deleted
   */
  const handleClick = (categoryIndex: number, hasTag: boolean) => {
    if (hasTag) {
      baseApi
        .delete(`/${source}/ads/${adData.id}/tags/${categoryIndex}`)
        .then((res: any) => {
          setAdData(res.data);
        });
    } else {
      baseApi
        .post(`/${source}/ads/${adData.id}/tags/${categoryIndex}`)
        .then((res: any) => {
          setAdData(res.data);
        });
    }
  };

  /**
   * Opens the dialog for creating a new tag
   */
  const handleClickOpen = () => {
    setErrorMessage("");
    setTagInputName("");
    setOpen(true);
  };

  /**
   * Closes the dialog for creating a new tag
   */
  const handleClose = () => {
    setErrorMessage("");
    setTagInputName("");
    setOpen(false);
  };

  /**
   * Handles the creation of a new tag
   */
  const handleAddTag = () => {
    if (tagsName.includes(tagInputName)) {
      setErrorMessage(
        "Same tag name has already been added, please enter another name"
      );
    } else {
      baseApi
        .post(`/${source}/tags`, { name: tagInputName })
        .then((res: any) => {
          if (onNewTagCreated) onNewTagCreated();
        });
      setOpen(false);
    }
  };

  /**
   * Handles the input of a new tag name
   */
  const handleTagNameChange = (e: any) => {
    setTagInputName(e.target.value);
  };

  return (
    <div className={classes.root}>
      {allTags.map((category, i) => (
        <Chip
          variant={adOwnTagsId.includes(category.id) ? "default" : "outlined"}
          label={category.name}
          onClick={() => {
            handleClick(category.id, adOwnTagsId.includes(category.id));
          }}
          key={i}
          data-testid={`chip-${i}`}
          role='tag'
        />
      ))}
      <Chip variant={"outlined"} label='+' onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add tag, please input the tag name and click submit.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Tag name'
            fullWidth
            value={tagInputName}
            onChange={handleTagNameChange}
          />
          <Typography style={{ fontSize: 12, color: "red" }}>
            {errorMessage}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAddTag} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdChip;
