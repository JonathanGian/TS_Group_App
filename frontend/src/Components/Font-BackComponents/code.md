  <Container maxWidth="lg">
       <Navigation />

    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Upload Emails
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Single Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <input
                type="file"
                id="file"
                accept=".txt, .csv"
                onChange={handleFileChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ backgroundColor: "#333", color: "#fff", "&:hover": { backgroundColor: "#555" } }}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
      {message && (
        <Typography sx={{ marginTop: 2, color: "red" }}>
          {message}
        </Typography>
      )}
    </Container>
    </Container>