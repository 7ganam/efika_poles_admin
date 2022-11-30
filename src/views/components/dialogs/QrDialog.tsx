// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import QrcodeScan from 'mdi-material-ui/QrcodeScan'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Imports
import { QrReader } from 'react-qr-reader'

//** Types
type Props = {
  handleScan: (qr: string) => void
  handleClickOpen: () => void
  handleClose: () => void
  open: boolean
}

const DialogConfirmation = (props: Props) => {
  const [data, setData] = useState('No result')

  return (
    <Fragment>
      <Button variant='contained' onClick={props.handleClickOpen} fullWidth>
        <QrcodeScan fontSize='small' sx={{ mr: 2 }} />
        Scan QR Code
      </Button>

      <Dialog
        open={props.open}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            props.handleClose()
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>Scan the QR Code</DialogTitle>
        {/* TODO: apply typescript when the qr library is out of BETA */}
        <DialogContent sx={{ width: '600px', maxWidth: '90%', margin: 'auto' }}>
          <QrReader
            onResult={(result, error) => {
              // @ts-ignore
              if (!!result?.text) {
                // @ts-ignore
                setData(result?.text)
                // @ts-ignore
                props.handleScan(result?.text)
              }

              if (!!error) {
                // console.info(error)
              }
            }}
            // @ts-ignore
            style={{ width: '100%' }}
          />
          <p>{data}</p>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={props.handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogConfirmation
