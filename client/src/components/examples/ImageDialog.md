```jsx
import Button from "@material-ui/core/Button";

const ImageDialogContainer = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Image Dialog
      </Button>
      <ImageDialog
        image={"http://placekitten.com/200/300"}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

<ImageDialogContainer />;
```
