// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, ChangeEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Plus from 'mdi-material-ui/Plus'
import Close from 'mdi-material-ui/Close'
import FloorLampTorchiere from 'mdi-material-ui/FloorLampTorchiere'
import SendOutline from 'mdi-material-ui/SendOutline'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import formatISO from 'date-fns/formatISO'
import axios from 'axios'
import Translations from 'src/layouts/components/Translations'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { InvoiceClientType } from 'src/types/apps/invoiceTypes'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

// ** Styles
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface Props {
  toggleAddCustomerDrawer: () => void
  invoiceNumber: number
}

interface PickerProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      {...props}
    />
  )
})

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

interface FormInputs {
  sim_no: number
  location: string
  notes: string
}

const defaultValues = {
  sim_no: 0,
  location: '',
  notes: ''
}

const EditCard = (props: Props) => {
  // ** Props
  const { invoiceNumber, toggleAddCustomerDrawer } = props

  // ** States
  const [count, setCount] = useState<number>(1)
  const [selected, setSelected] = useState<string>('')
  const [issueDate, setIssueDate] = useState<DateType>(new Date())
  const [dueDate, setDueDate] = useState<DateType>(new Date(tomorrowDate))
  const [loading, setLoading] = useState<boolean>(false)
  // ** Hook
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({ defaultValues })

  const onSubmit = async (data: FormInputs) => {
    setLoading(true)
    const postData = {
      ...data
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/poles`, postData)
    setLoading(false)
    toast.success('Form Submitted')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xl={4} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <FloorLampTorchiere sx={{ width: '60px', height: '60px' }}></FloorLampTorchiere>
                    <Plus sx={{ width: '30px', height: '30px', ml: '-20px', mb: '-20px' }}></Plus>
                    <Typography variant='h5' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                      <Translations text={'Add New Pole'} />
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' sx={{ mb: 1 }}>
                      Enter SSL Pole Data Below
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={8} xs={12} sx={{}}>
                <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}
                  >
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                        SIM Number:
                      </Typography>

                      <FormControl>
                        <Controller
                          name='sim_no'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              size='small'
                              sx={{ width: { sm: '250px', xs: '170px' } }}
                              value={value}
                              label='SIM Number'
                              onChange={onChange}
                              placeholder='201145455454'
                              error={Boolean(errors.sim_no)}
                              aria-describedby='validation-async-first-name'
                            />
                          )}
                        />
                        {errors.sim_no && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-async-first-name'>
                            {errors.sim_no.type}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                        Location:
                      </Typography>
                      <FormControl>
                        <Controller
                          name='location'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              size='small'
                              sx={{ width: { sm: '250px', xs: '170px' } }}
                              value={value}
                              label='Location'
                              onChange={onChange}
                              placeholder='1 2 3'
                              error={Boolean(errors.location)}
                              aria-describedby='validation-async-first-name'
                            />
                          )}
                        />
                        {errors.location && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-async-first-name'>
                            {errors.location.type}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                        Note:
                      </Typography>
                      <FormControl>
                        <Controller
                          name='notes'
                          control={control}
                          rules={{}}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              size='small'
                              sx={{ width: { sm: '250px', xs: '170px' } }}
                              value={value}
                              label='Note'
                              onChange={onChange}
                              placeholder='--'
                              error={Boolean(errors.notes)}
                              aria-describedby='validation-async-first-name'
                            />
                          )}
                        />
                        {errors.notes && (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-async-first-name'>
                            {errors.notes.type}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </DatePickerWrapper>
              </Grid>
            </Grid>
          </CardContent>

          {/* <Divider sx={{ mt: 1, mb: 1 }} />

          <CardContent sx={{ pb: 2 }}></CardContent> */}
        </Card>
        <Box width={'100%'} sx={{ display: 'flex', my: '20px' }}>
          <Button type='submit' sx={{ ml: 'auto' }} variant='contained' startIcon={<SendOutline />}>
            Add Pole
          </Button>
        </Box>
      </form>
    </>
  )
}

export default EditCard
