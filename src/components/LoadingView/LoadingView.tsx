import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const LoadingView = () => {
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
      <CircularProgress />
    </Box>
  );
};

export default LoadingView;
