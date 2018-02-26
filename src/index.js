import consign from 'consign';
import app from './server/app';

consign({ cwd: 'src/app' })
  .include('models')
  .then('controllers')
  .then('middlewares')
  .into(app);

app.listen(5000, () => {
  console.log('App running!');
});
