import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "../api/axiosInstance";
import React, { useEffect, useState, useCallback } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currencies = ["usd", "eur", "jpy", "gbp"];
const cryptoOptions = ["bitcoin", "ethereum", "dogecoin"];

export default function Dashboard() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchRates = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currencies.join(
          ","
        )}`
      );
      setRates(response.data[crypto]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  }, [crypto]);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        💹 Crypto Dashboard
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Crypto</InputLabel>
        <Select
          value={crypto}
          label="Select Crypto"
          onChange={(e) => setCrypto(e.target.value)}
        >
          {cryptoOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Exchange Rates for {crypto.toUpperCase()}:
            </Typography>
            {currencies.map((cur) => {
              const symbols = { usd: "$", eur: "€", jpy: "¥", gbp: "£" };
              const formatter = new Intl.NumberFormat("en-US", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              return (
                <Typography key={cur}>
                  {cur.toUpperCase()}: {symbols[cur]}{" "}
                  {formatter.format(rates[cur])}
                </Typography>
              );
            })}
            {rates && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Price Chart
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={currencies.map((cur) => ({
                      currency: cur.toUpperCase(),
                      price: rates[cur],
                    }))}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="currency" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) =>
                        new Intl.NumberFormat("en-US", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(value)
                      }
                    />
                    <Bar dataKey="price" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
