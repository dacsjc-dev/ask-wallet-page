import React, { useEffect, useState } from 'react';

import {
  Card,
  Grid,
  Typography,
  TextField,
  Tooltip,
  Box,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
  IconButton
} from '@mui/material';
import {
  CopyAll as CopyAllIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HourglassTopTwoTone as HourglassTopTwoToneIcon,
  QuestionMark as QuestionMarkIcon,
  Search,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

import QRCode from "react-qr-code";
import { getASKTransactions, getASKBalance } from '../../services/moralisAPI';

const AskWalletPageContainer = styled(Card)(({ theme }) => ({
  backgroundColor: '#E3F2FD',
  padding: theme.spacing(2),
}));

const AskWalletPrimaryCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#EDEEF0',
  padding: theme.spacing(2),
}));

const AskWalletSecondaryCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#E5E6EA',
  padding: theme.spacing(2),
}));

const QuestionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#E5E6EA',
  '&:hover': {
    backgroundColor: '#BFC0C2'
  }
}));

const PrimaryTitleHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.titlePrimary.main,
  fontWeight: 'bold',
}));

const SecondaryTitleHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.titleSecondary.main,
}));


const AskWallet = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [receiveAskAddress, setReceiveAskAddress] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');

  const searchASKAddress = async () => {
    try {
      setLoading(true);

      const ASKBalance = await getASKBalance(address);
      const ASKTransaction = await getASKTransactions(address);
      setReceiveAskAddress(address);
      setTotalBalance(ASKBalance.balance);
      setHistory(ASKTransaction);
    } catch (error) {
      // Removing values
      setTotalBalance(0);
      setReceiveAskAddress('');
      setHistory([]);

      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const SearchField = () => {
    return (
      <Grid container spacing={1}>
        <Grid item>
          <TextField
            value={address}
            onChange={(element) => {
              setAddress(element.target.value);
            }}
            label="Please Enter a Wallet Address"
            size="small"
            variant="outlined"
            sx={{ width: { xs: '100%', md: 400 } }}
            disabled={isLoading}
          />
        </Grid>
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          <Button color="secondary" variant="contained" onClick={searchASKAddress} disabled={isLoading}>
            <Search />
          </Button>
        </Grid>
      </Grid>
    )
  };

  const EnterWalletAddress = () => {
    return (
      <Grid container sx={{
        gridTemplateColumns: "repeat(2, 1fr)"
      }}>
        <Grid item md={4} xs={12}>
          <AskWalletPrimaryCard>
            <PrimaryTitleHeader variant="h6" sx={{ mb: 1 }}>
              ASK
            </PrimaryTitleHeader>
            <SecondaryTitleHeader variant="subtitle2" sx={{ mb: 0.5 }} >
              Total Balance
              <Tooltip title="Current ASK Balance" arrow>
                <QuestionButton sx={{ ml: 1 }}>
                  <QuestionMarkIcon sx={{ fontSize: 12 }} />
                </QuestionButton>
              </Tooltip>
            </SecondaryTitleHeader>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {totalBalance}
            </Typography>
          </AskWalletPrimaryCard>
        </Grid>
        <Grid item md={8} xs={12}>
          <AskWalletSecondaryCard>
            <PrimaryTitleHeader variant="h4" sx={{ fontWeight: 'bold', mb: 3.5 }}>
              Welcome to ASK Wallet Page.
            </PrimaryTitleHeader>
            <SearchField />
          </AskWalletSecondaryCard>
        </Grid>
      </Grid>
    )
  };

  const ReceiveAskComponent = () => {
    return (
      <AskWalletSecondaryCard>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <PrimaryTitleHeader variant="h6" sx={{ mb: 1 }}>
              Receive ASK
            </PrimaryTitleHeader>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }} >
              ERC-20
            </Typography>
            <SecondaryTitleHeader variant="subtitle2" sx={{ mb: 2, }}>
              {receiveAskAddress}
            </SecondaryTitleHeader>
            <Button color="secondary" variant="contained" size="small" startIcon={<CopyAllIcon />} onClick={() => navigator.clipboard.writeText(receiveAskAddress)}>
              Copy
            </Button>
          </Grid>
          <Grid item md={8}>
            <Grid container spacing={2}>
              <Grid item xl={5} md={6}>
                <SecondaryTitleHeader variant="subtitle1" sx={{ mb: 2 }}>
                  Share this QR code or public key with whomever is sending you ASK.
                </SecondaryTitleHeader>
              </Grid>
              <Grid item xl={7} md={6}>
                <Box sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'white',
                  p: 1
                }}>
                  <QRCode value={receiveAskAddress} size={100} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </AskWalletSecondaryCard>
    )
  };

  const HistoryAskComponent = () => {
    const columns = [
      {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => (params.row.status === 'received' ? (<><HourglassTopTwoToneIcon /> Sent</>) : (<><CheckCircleOutlineIcon /> Received</>)),
        flex: 1,
      },
      {
        field: 'value',
        headerName: 'Amount (ASK)',
        width: 110,
        flex: 1,
      },
      {
        field: 'block_timestamp',
        headerName: 'Date',
        width: 110,
        flex: 1,
      },
      {
        field: 'from_address',
        headerName: 'From Address',
        width: 110,
        flex: 1,
      },
      {
        field: 'to_address',
        headerName: 'To Address',
        width: 110,
        flex: 1,
      },
      {
        field: 'transaction_hash',
        headerName: 'Transaction ID',
        width: 110,
        flex: 1,
      },
    ];

    return (
      <AskWalletSecondaryCard>
        <PrimaryTitleHeader variant="h6" sx={{ mb: 1 }}>
          History
        </PrimaryTitleHeader>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={history}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
      </AskWalletSecondaryCard>
    );
  };

  const handleError = (errorMessage) => {
    setOpen(true);
    setError(errorMessage);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <AskWalletPageContainer>
      <Grid container spacing={1}>
        <Grid item xs={12}>

          <PrimaryTitleHeader variant="h5" sx={{ mb: 1 }}>
            Wallets with ASK
          </PrimaryTitleHeader>
          <SecondaryTitleHeader variant="subtitle2" sx={{ mb: 2.5, fontWeight: 'bold' }} >
            Track and manage your ASK holdings across all of the wallets that you use.
          </SecondaryTitleHeader>
          <EnterWalletAddress />
        </Grid>
        {
          !!receiveAskAddress && (
            <>
              <Grid item xs={12}>
                <ReceiveAskComponent />
              </Grid>
              <Grid item xs={12}>
                <HistoryAskComponent />
              </Grid></>
          )
        }

      </Grid >

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        sx={{
          backgroundColor: 'pallete.error.main'
        }}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </AskWalletPageContainer >
  )
};

export default AskWallet;