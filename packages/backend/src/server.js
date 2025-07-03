import app from './app.js';
import { PORT } from './common/constants.js';

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
