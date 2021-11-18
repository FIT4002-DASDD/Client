/**
 * ImageDialog.tsx
 * Popup dialog for ad image (screenshots)
 * @author Andy Zhan
 * @updated 2021-11-18
 */

import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import "./styles/AdCard.css";

interface ImageDialogProps {
  image: string;
  open: boolean;
  handleClose: () => void;
}

/**
 * Popup dialog for ad image (screenshots)
 */
const ImageDialog = (props: ImageDialogProps) => {
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogContent>
        <img
          style={{
            width: "auto",
            height: "100%",
          }}
          src={props.image}
          alt="Ad screenshot full"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
