import app from './app';
import 'shared/config/envConfig';

const port = process.env.MEDIA_SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
