import app from './app';
import 'shared/config/envConfig';

const port = process.env.AUTH_SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
