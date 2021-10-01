```jsx
import Button from "@material-ui/core/Button";

const ListDialogContainer = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open List Dialog
      </Button>
      <ListDialog
        terms={["List Item 1", "List Item 2", "List Item 3"]}
        title={"Title"}
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

<ListDialogContainer />;
```
