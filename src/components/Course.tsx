import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import EditIcon from './EditIcon'
import DeleteIcon from './DeleteIcon'

// Color constants
const PINK = '#e91e63' // Major (Requirement)
const LPINK = '#f06292' // Major (Elective)
const BLUE = '#2196f3' // Hums (Depth)
const PURPLE = '#7c4dff' // Hums (Breadth)
const LPURPLE = '#ba68c8' // Hums (Elective)
const GREEN = '#26a69a' // Core
const GREY = '#455a64' // Undecided
const ORANGE = '#ef5350' // Other (PE)

let theme = createMuiTheme({
  typography: {
    fontSize: 10,
  },
})
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(() => ({
  codeText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  titleText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  creditText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  writText: {
    color: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(1.25),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.spacing(1.4),
    },
  },
  courseButton: {
    alignItems: 'flex-end',
  },
}))

const getCourseColor = (type: string): string => {
  switch (type) {
    case 'major_req': {
      return PINK
    }
    case 'major_elec': {
      return LPINK
    }
    case 'hum_depth': {
      return PURPLE
    }
    case 'hum_breadth': {
      return BLUE
    }
    case 'hum_elec': {
      return LPURPLE
    }
    case 'core_req': {
      return GREEN
    }
    case 'undecided': {
      return GREY
    }
    default: {
      return ORANGE
    }
  }
}

interface courseProps {
  code: string
  title: string
  credits: number
  type: string
  campus: string
  writInten: boolean
  term: string
  showIcons: boolean
}

function Course({
  code,
  title,
  credits,
  type,
  campus,
  writInten,
  term,
  showIcons,
}: courseProps): JSX.Element {
  const classes = useStyles()

  let editIconPlaceholder = (
    <EditIcon
      functional={false}
      code=""
      title=""
      credits={0}
      type=""
      campus=""
      writInten={false}
      term=""
    />
  )
  let deleteIconPlaceholder = (
    <DeleteIcon functional={false} code="" title="" term="" />
  )

  // If false, icons don't have click functionality (for logged out viewers)
  if (showIcons) {
    editIconPlaceholder = (
      <EditIcon
        functional
        code={code}
        title={title}
        credits={credits}
        type={type}
        campus={campus}
        writInten={writInten}
        term={term}
      />
    )
    deleteIconPlaceholder = (
      <DeleteIcon functional term={term} title={title} code={code} />
    )
  }

  // Add M and/or W if Mudd hum/writing intensive course
  let placeholder = ''
  let titleLength = 6
  let codeLength = 1
  let placeholderGrid = <div />

  if (writInten) {
    placeholder = 'W'
    titleLength = 5
  }
  if (campus === 'hmc' && type.slice(0, 3) === 'hum') {
    if (placeholder) {
      placeholder += '|M'
      codeLength = 2
      titleLength = 4
    } else {
      placeholder = 'M'
      titleLength = 5
    }
  }
  if (placeholder) {
    placeholderGrid = (
      <Grid item xs={codeLength as 1 | 2} zeroMinWidth>
        <MuiThemeProvider theme={theme}>
          <Typography variant="h6" className={classes.writText} noWrap>
            <b>{placeholder}</b>
          </Typography>
        </MuiThemeProvider>
      </Grid>
    )
  }

  return (
    <Paper
      style={{
        backgroundColor: getCourseColor(type),
        marginTop: 5,
        marginBottom: 5,
        display: 'flex',
      }}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{
          display: 'flex',
        }}>
        <Grid item xs={3} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.codeText} noWrap>
              <b>{code}</b>
            </Typography>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={titleLength as 4 | 6} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.titleText} noWrap>
              {title}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        {placeholderGrid}
        <Grid item xs={1} zeroMinWidth>
          <MuiThemeProvider theme={theme}>
            <Typography variant="h6" className={classes.creditText} noWrap>
              {credits}
            </Typography>
          </MuiThemeProvider>
        </Grid>
        {editIconPlaceholder}
        {deleteIconPlaceholder}
      </Grid>
    </Paper>
  )
}

export default Course
