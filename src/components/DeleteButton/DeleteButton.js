import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const DeleteButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Button);

export default DeleteButton
