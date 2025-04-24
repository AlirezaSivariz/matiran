import React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";

export default function About() {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card elevation={3}>
        <CardContent>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Learn more about this project
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            This is a clean and modern cryptocurrency dashboard built using
            React, Redux Toolkit, and Material UI. It shows real-time exchange
            rates for top cryptocurrencies against major world currencies.
          </Typography>

          <Typography variant="body1" paragraph>
            The app updates data every 10 seconds and provides an intuitive UI
            for selecting cryptocurrencies and viewing their latest exchange
            rates. It’s fast, responsive, and optimized for performance.
          </Typography>

          <Typography variant="body1" paragraph>
            Built with ❤️ by a passionate developer who loves clean UIs and
            smart front-end architecture.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
