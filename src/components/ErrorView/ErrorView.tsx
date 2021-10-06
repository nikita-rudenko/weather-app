import { Error } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

type ErrorViewProps = {
  title: string;
};

const ErrorView = ({ title }: ErrorViewProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack alignItems="center">
        <Box>
          <Error fontSize="large" color="error" />
        </Box>
        <Typography variant="h6">{title}</Typography>
      </Stack>
    </Box>
  );
};

export default ErrorView;
