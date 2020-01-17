// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';

// import FormGroup from '@material-ui/core/FormGroup';

// import Switch from '@material-ui/core/Switch';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// const IOSSwitch = withStyles(theme => ({
//   root: {
//     width: 42,
//     height: 26,
//     padding: 0,
//     margin: theme.spacing(1),
//   },
//   switchBase: {
//     padding: 1,
//     '&$checked': {
//       transform: 'translateX(16px)',
//       color: theme.palette.common.white,
//       '& + $track': {
//         backgroundColor: '#52d869',
//         opacity: 1,
//         border: 'none',
//       },
//     },
//     '&$focusVisible $thumb': {
//       color: '#52d869',
//       border: '6px solid #fff',
//     },
//   },
//   thumb: {
//     width: 24,
//     height: 24,
//   },
//   track: {
//     borderRadius: 26 / 2,
//     border: `1px solid ${theme.palette.grey[400]}`,
//     backgroundColor: theme.palette.grey[50],
//     opacity: 1,
//     transition: theme.transitions.create(['background-color', 'border']),
//   },
//   checked: {},
//   focusVisible: {},
// }))(({ classes, ...props }) => {
//   return (
//     <Switch
//       focusVisibleClassName={classes.focusVisible}
//       disableRipple
//       classes={{
//         root: classes.root,
//         switchBase: classes.switchBase,
//         thumb: classes.thumb,
//         track: classes.track,
//         checked: classes.checked,
//       }}
//       {...props}
//     />
//   );
// });

// const AntSwitch = withStyles(theme => ({
//   root: {
//     width: 28,
//     height: 16,
//     padding: 0,
//     display: 'flex',
//   },
//   switchBase: {
//     padding: 2,
//     color: theme.palette.grey[500],
//     '&$checked': {
//       transform: 'translateX(12px)',
//       color: theme.palette.common.white,
//       '& + $track': {
//         opacity: 1,
//         backgroundColor: theme.palette.primary.main,
//         borderColor: theme.palette.primary.main,
//       },
//     },
//   },
//   thumb: {
//     width: 12,
//     height: 12,
//     boxShadow: 'none',
//   },
//   track: {
//     border: `1px solid ${theme.palette.grey[500]}`,
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor: theme.palette.common.white,
//   },
//   checked: {},
// }))(Switch);

// export default function CustomizedSwitches() {
// const {onChange, }

//   handleChange = () => {
//     onChange()
//   }

//   return (
//     <FormGroup>
//       <Typography component="div">
//         <Grid component="label" container alignItems="center" spacing={1}>
//           <Grid item>False</Grid>
//           <Grid item>
//             <AntSwitch
//               checked={state.checkedC}
//               onChange={this.handleChange()}
//               value="checkedC"
//             />
//           </Grid>
//           <Grid item>True</Grid>
//         </Grid>
//       </Typography>
//     </FormGroup>
//   );
// }
