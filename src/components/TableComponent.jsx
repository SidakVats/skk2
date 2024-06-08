import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, IconButton, Button, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TAX_RATE = 0.07;

const ccyFormat = (num) => {
  return `${num.toFixed(2)}`;
};

const TableComponent = ({ rows, addRow, deleteRow, handleRowChange }) => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(currentTime);
  }, []);

  const subtotal = rows.reduce((sum, row) => sum + row.price, 0);
  const invoiceTaxes = TAX_RATE * subtotal;
  const invoiceTotal = subtotal + invoiceTaxes;

  return (
    <Paper sx={{ padding: 2, border: '2px solid #f3f4f6'}}>
      <h1 className="my-2 mb-5 text-2xl underline">Invoice:</h1>
      <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">Date:</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width:"450px" }}>
          <Typography variant="h6">Name:</Typography>
          <TextField placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Box>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">Time:</Typography>
          <TextField value={time} InputProps={{ readOnly: true }} />
        </Box> */}
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desc</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sum</TableCell>
              <TableCell align="center">
                <Button onClick={addRow} variant="contained" color="primary">
                  +
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={row.desc}
                    onChange={(e) => handleRowChange(index, "desc", e.target.value)}
                    required
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleRowChange(index, "qty", parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={row.unit}
                    onChange={(e) => handleRowChange(index, "unit", parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => deleteRow(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell align="right">
              <TextField
                    value={0}
                  />
              </TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
