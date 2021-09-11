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
  /**
   * The ad represented by the containing AdCard
   */
  ad: Ad;
  /**
   * A list of all tags in the system
   */
  allTags: Tag[];
  /**
   * Callback function for handling the creation of a new tag
   */
  onNewTagCreated?: () => void;
};

/**
 * Chip component to represent tags on AdCard components
 */
const AdChip = (props: AdChipProp) => {
  // Context for data source
  const dataSourceContext = useContext(DataContext);
  const source = dataSourceContext.dataSource;

  const classes = useStyles();
  const { allTags, onNewTagCreated } = props;
  /**
   * State for the tags already applied to the ad
   */
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

  useEffect(() => {
    const tempList = adData.tags.map((tag: Tag) => tag.id);
    setAdOwnTags(tempList);
  }, [adData]);

  useEffect(() => {
    const tempNameList = allTags.map((tag: Tag) => tag.name.toLowerCase());
    setTagsName(tempNameList);
  }, [allTags]);

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

  const handleClickOpen = () => {
    setErrorMessage("");
    setTagInputName("");
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setTagInputName("");
    setOpen(false);
  };

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
        />
      ))}
      <Chip variant={"outlined"} label="+" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add tag, please input the tag name and click submit.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag name"
            fullWidth
            value={tagInputName}
            onChange={handleTagNameChange}
          />
          <Typography style={{ fontSize: 12, color: "red" }}>
            {errorMessage}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTag} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdChip;
